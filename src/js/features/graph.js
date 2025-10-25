import { fetchChartData as real } from "../api/api.js";

export const initWeightGraph = async (deps = {}) => {
  const graphElement = document.getElementById("graph");

  if (!graphElement) return;

  const today = new Date();

  // 体重記録の配列
  const { fetchChartData = real } = deps;
  const chartData = await fetchChartData();
  const weightRecords = chartData.chart_arr;
  const idealWeight = chartData.ideal_weight;

  Chart.register(window["chartjs-plugin-annotation"]);

  // レスポンシブサイズの調整
  const mediaQueryChart = window.matchMedia("(max-width: 599px)");

  let weightChart;

  // 呼び出しヘルパ
  const rerender = () => {
    weightChart = applyWeightChart(range, {
      today,
      weightRecords,
      graphElement,
      weightChart,
      mediaQueryChart,
      idealWeight,
    });
  };

  const reSummary = () => {
    const view = deriveSummary(range, { today, weightRecords });
    applySummary(weightSummaryBlocks, view);
  };

  const weightGraphDate = document.querySelector(".weight-graph__date");

  // 体重グラフの初期表示
  let range = "1m";
  rerender();
  applyTitleDate(range, { today, weightGraphDate });

  // メディアクエリの変更を検知して更新
  mediaQueryChart.addEventListener("change", () => rerender());

  // 各期間切り替え要素
  const weightGraphSwitchBtns = document.querySelectorAll(
    ".weight-graph__switch button"
  );
  const weightSummaryBlocks = document.querySelectorAll(
    ".weight-summary__block"
  );

  // 各期間切り替えスイッチが無い場合、ここで処理終了
  if (weightGraphSwitchBtns.length < 1) {
    return;
  }

  // 各期間切り替えスイッチのカラー制御
  weightGraphSwitchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector(".weight-graph__switch .btn--select")
        ?.classList.remove("btn--select");
      btn.classList.add("btn--select");
    });
  });

  // weight-summary データ初期状態
  reSummary();

  // 各期間切り替えボタン
  document
    .getElementById("weight-graph__week")
    .addEventListener("click", () => {
      range = "7d";
      rerender();
      applyTitleDate(range, { today, weightGraphDate });
      reSummary();
    });
  document
    .getElementById("weight-graph__month")
    .addEventListener("click", () => {
      range = "1m";
      rerender();
      applyTitleDate(range, { today, weightGraphDate });
      reSummary();
    });
  document
    .getElementById("weight-graph__three-month")
    .addEventListener("click", () => {
      range = "3m";
      rerender();
      applyTitleDate(range, { today, weightGraphDate });
      reSummary();
    });
  document
    .getElementById("weight-graph__half-year")
    .addEventListener("click", () => {
      range = "6m";
      rerender();
      applyTitleDate(range, { today, weightGraphDate });
      reSummary();
    });
  document
    .getElementById("weight-graph__year")
    .addEventListener("click", () => {
      range = "1y";
      rerender();
      applyTitleDate(range, { today, weightGraphDate });
      reSummary();
    });
};

// 共通ヘルパ
const copy = (d) => new Date(d.getTime());

// derive系
// 指定した範囲の日付リストを作成
const deriveDateRange = (range, { today, isPrev = false }) => {
  const base = copy(today);
  base.setHours(0, 0, 0, 0);
  let end = copy(base);
  end.setDate(base.getDate() + 1);
  let start = copy(end);
  const offsets = {
    "7d": [7, 14],
    "1m": [1, 2],
    "3m": [3, 6],
    "6m": [6, 12],
    "1y": [12, 24],
  };

  if (range === "7d") {
    const curr = offsets[range][0];
    if (isPrev) {
      end.setDate(end.getDate() - curr);
      start = new Date(end.getTime());
      start.setDate(end.getDate() - curr);
    } else {
      start.setDate(end.getDate() - curr);
    }
  } else {
    const curr = offsets[range][0];
    if (isPrev) {
      end.setMonth(end.getMonth() - curr);
      start = new Date(end.getTime());
      start.setMonth(end.getMonth() - curr);
    } else {
      start.setMonth(end.getMonth() - curr);
    }
  }

  const toISODate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  let labelsISO = [];
  let current = copy(start);

  while (current < end) {
    labelsISO.push(toISODate(current));
    current.setDate(current.getDate() + 1);
  }

  return labelsISO;
};

// ラベル作成＆データマッピング
const deriveSeriesFromLabels = (weightRecords, labelsISO) => {
  const dataMapWeight = Object.fromEntries(
    weightRecords.map((record) => [record.date, record.weight])
  );
  const dataMapBmi = Object.fromEntries(
    weightRecords.map((record) => [record.date, record.bmi])
  );
  const dataMapBfp = Object.fromEntries(
    weightRecords.map((record) => [record.date, record.bfp])
  );

  // データが無い日はnullにする
  const dataset = labelsISO.map((date) => dataMapWeight[date] ?? null);
  const bmi = labelsISO.map((date) => dataMapBmi[date] ?? null);
  const bfp = labelsISO.map((date) => dataMapBfp[date] ?? null);

  return { labels: labelsISO, dataset, bmi, bfp };
};

// データポイントの個数制限関数
const deriveDownsampledSeries = (dataset, labels, maxPoints) => {
  if (!labels.length) return dataset.slice();
  const step = Math.ceil(labels.length / maxPoints);
  let beforeIndex = 0;

  return dataset.map((_, index, arr) => {
    const lastIndex = arr.length - 1;
    const distanceFromLast = lastIndex - index;

    if (index === lastIndex || distanceFromLast % step === 0) {
      const group = dataset.slice(beforeIndex, index + 1);
      const groupFilter = group.filter((num) => num);
      const sum = groupFilter.reduce(
        (acc, val) => parseFloat(acc) + parseFloat(val),
        0
      );

      beforeIndex = index + 1;

      if (!sum) return null;

      const avg = (sum / groupFilter.length).toFixed(1);

      return avg;
    } else {
      return null;
    }
  });
};

// 体重グラフカード日付変更
const deriveTitleFromLabels = (range, today) => {
  const dateArr = deriveDateRange(range, { today }).map((date) =>
    date.replaceAll("-", "/")
  );
  if (!dateArr.length) return "--";
  const firstDate = dateArr[0];
  const lastDate = dateArr[dateArr.length - 1];

  return `${firstDate}～${lastDate}`;
};

// weight-summary データ更新用関数
const deriveSummary = (range, { today, weightRecords }) => {
  // ラベル日付
  const labelsISO = deriveDateRange(range, { today, isPrev: false });
  const prevLabelsISO = deriveDateRange(range, { today, isPrev: true });

  // グラフデータ
  const chartData = deriveSeriesFromLabels(weightRecords, labelsISO);
  const nullNotDataset = chartData.dataset.filter((data) => data !== null);
  const nullNotBmi = chartData.bmi.filter((data) => data !== null);
  const nullNotBfp = chartData.bfp.filter((data) => data !== null);

  // 比較用 前グラフデータ
  const prevChartData = deriveSeriesFromLabels(weightRecords, prevLabelsISO);
  const prevNullNotDataset = prevChartData.dataset.filter(
    (data) => data !== null
  );

  // 平均数値取得関数
  const calcAverage = (nullNotArr, fixedNum = 1) => {
    const filteredArr = nullNotArr
      .filter((num) => num !== null && num !== undefined)
      .map((num) => parseFloat(num.replace(/,/g, "")));

    if (!filteredArr.length) return null;

    const arrSum = filteredArr.reduce((acc, cur) => acc + cur, 0);
    return (arrSum / filteredArr.length).toFixed(fixedNum);
  };

  // 前期間比(平均の増減)
  const calcAverageCompare = (nullNotDataset, prevNullNotDataset) => {
    if (nullNotDataset.length && prevNullNotDataset.length) {
      const result = (
        calcAverage(nullNotDataset) - calcAverage(prevNullNotDataset)
      ).toFixed(1);

      return result > 0 ? "+" + result : String(result);
    } else {
      return null;
    }
  };

  // 最高体重取得関数
  const maxWeightFunc = (nullNotDataset) => {
    if (nullNotDataset.length) {
      return Math.max(...nullNotDataset).toFixed(1);
    } else {
      return null;
    }
  };

  // 最低体重取得関数
  const minWeightFunc = (nullNotDataset) => {
    if (nullNotDataset.length) {
      return Math.min(...nullNotDataset).toFixed(1);
    } else {
      return null;
    }
  };

  let rangeText;
  if (range === "7d") rangeText = "1週間";
  if (range === "1m") rangeText = "1ヶ月";
  if (range === "3m") rangeText = "3ヶ月";
  if (range === "6m") rangeText = "半年";
  if (range === "1y") rangeText = "1年";

  return {
    rangeText,
    average: calcAverage(nullNotDataset),
    bfp: calcAverage(nullNotBfp, 2),
    bmi: calcAverage(nullNotBmi, 2),
    in_de: calcAverageCompare(nullNotDataset, prevNullNotDataset),
    best: maxWeightFunc(nullNotDataset),
    lowest: minWeightFunc(nullNotDataset),
  };
};

// apply系
// チャートの更新
const applyWeightChart = (
  range,
  {
    today,
    weightRecords,
    graphElement,
    weightChart,
    mediaQueryChart,
    idealWeight,
  }
) => {
  // ラベル日付
  const labelsISO = deriveDateRange(range, { today, isPrev: false });
  const { labels, dataset } = deriveSeriesFromLabels(weightRecords, labelsISO);

  if (weightChart) weightChart.destroy();
  const existing = Chart.getChart(graphElement);
  if (existing) existing.destroy();

  const maxPoints = mediaQueryChart.matches ? 12 : 31;
  const datasetDown = deriveDownsampledSeries(dataset, labels, maxPoints);

  const labelsReplace = labels.map((label) => label.replaceAll("-", "/"));
  const ctx = graphElement.getContext("2d");

  weightChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labelsReplace,
      datasets: [
        {
          label: "体重（kg）",
          data: datasetDown,
          backgroundColor: "#4a90e2",
          borderColor: "#4a90e2",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#4a90e2",
          pointBorderWidth: 3,
          hoverBorderWidth: 4,
          pointHoverRadius: 6,
          spanGaps: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: mediaQueryChart.matches ? 4 / 3 : 2 / 1,
      animation: { duration: 800 },
      animations: {
        y: {
          from(ctx) {
            if (
              ctx.type === "data" &&
              ctx.mode === "default" &&
              ctx.parsed.y != null
            ) {
              const y = ctx.chart.scales.y;
              return y.getPixelForValue(y.min);
            }
          },
        },
      },
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            callback(value) {
              return labels[value]
                ? `${new Date(labels[value]).getDate()}日`
                : "";
            },
            maxRotation: 0,
            minRotation: 0,
            maxTicksLimit: 15,
          },
        },
        y: {
          suggestedMax:
            Math.max(...dataset.filter((v) => v != null).map(Number)) + 1,
          suggestedMin: idealWeight - 1,
          ticks: {
            maxTicksLimit: mediaQueryChart.matches ? 6 : 8,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          titleFont: {
            size: mediaQueryChart.matches ? 10 : 12,
            family: "Inter, Noto Sans JP, sans-serif",
          },
          bodyFont: {
            size: mediaQueryChart.matches ? 12 : 14,
            family: "Inter, Noto Sans JP, sans-serif",
          },
          callbacks: {
            label(context) {
              let value = context.raw;
              return ` 体重: ${value} kg`;
            },
          },
        },
        annotation: {
          annotations: {
            goalLine: {
              type: "line",
              yMin: idealWeight,
              yMax: idealWeight,
              borderColor: "#e65100",
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                content: "目標体重",
                enabled: true,
                position: "end",
              },
            },
          },
        },
      },
    },
  });

  if (range === "3m" || range === "6m" || range === "1y") {
    let lastMonth = null;

    // x軸の各月を表示
    weightChart.options.scales.x.ticks.callback = (value) => {
      let date = new Date(labels[value]);
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month === lastMonth || day !== 1) {
        return;
      }

      lastMonth = month;

      return `${month}月`;
    };

    weightChart.update();
  }

  return weightChart;
};

const applyTitleDate = (range, { today, weightGraphDate }) => {
  weightGraphDate.textContent = deriveTitleFromLabels(range, today);
};

// weight-summary UI更新
const applySummary = (blockEls, view) => {
  blockEls.forEach((summary) => {
    const periodEl = summary.querySelector(".period");
    if (periodEl) periodEl.textContent = view.rangeText ?? "--";

    const key = summary.dataset.summary;
    const val = view[key];
    const numEl = summary.querySelector(".weight-summary__num");
    if (numEl) numEl.textContent = val ?? "--";
  });
};
