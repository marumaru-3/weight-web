weightGraph();
function weightGraph() {
  const graphElement = document.getElementById("graph");

  if (!graphElement) return;

  // 体重記録の配列
  const weightRecords = [
    { date: "2024-12-06", weight: 69.2 },
    { date: "2024-12-07", weight: 68.2 },
    { date: "2024-12-08", weight: 67.2 },
    { date: "2024-12-09", weight: 67.5 },
    { date: "2024-12-10", weight: 67.8 },
    { date: "2024-12-11", weight: 67.2 },
    { date: "2024-12-12", weight: 67.7 },
    { date: "2024-12-13", weight: 67.9 },
    { date: "2024-12-14", weight: 68.2 },
    { date: "2024-12-15", weight: 68.1 },
    { date: "2024-12-16", weight: 68.2 },
    { date: "2024-12-17", weight: 68.6 },
    { date: "2024-12-18", weight: 68.4 },
    { date: "2024-12-19", weight: 68.2 },
    { date: "2024-12-20", weight: 68.5 },
    { date: "2024-12-21", weight: 68.2 },
    { date: "2024-12-22", weight: 68.2 },
    { date: "2024-12-25", weight: 70.2 },
    { date: "2024-12-26", weight: 69.8 },
    { date: "2024-12-27", weight: 69.2 },
    { date: "2024-12-28", weight: 69.1 },
    { date: "2024-12-29", weight: 69.0 },
    { date: "2024-12-30", weight: 68.8 },
    { date: "2024-12-31", weight: 68.5 },
    { date: "2025-01-03", weight: 69.2 },
    { date: "2025-01-04", weight: 69.0 },
    { date: "2025-01-05", weight: 68.5 },
    { date: "2025-02-26", weight: 61.5 },
    { date: "2025-03-01", weight: 68.5 },
    { date: "2025-03-02", weight: 70.5 },
    { date: "2025-03-03", weight: 68.5 },
    { date: "2025-03-04", weight: 68.5 },
    { date: "2025-03-06", weight: 66.5 },
    { date: "2025-03-07", weight: 68.0 },
  ];

  // 指定した範囲の日付リストを作成
  const getDateRange = (range, isPrev = false) => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date(now);

    const offsets = {
      "7d": [7, 14],
      "1m": [1, 2],
      "3m": [3, 6],
      "6m": [6, 12],
      "1y": [12, 24],
    };

    if (range === "7d") {
      startDate.setDate(
        now.getDate() - (isPrev ? offsets[range][1] : offsets[range][0])
      );
      if (isPrev) endDate.setDate(now.getDate() - offsets[range][0]);
    } else {
      startDate.setMonth(
        now.getMonth() - (isPrev ? offsets[range][1] : offsets[range][0])
      );
      if (isPrev) endDate.setMonth(now.getMonth() - offsets[range][0]);
    }

    let dates = [];
    let current = new Date(startDate);
    while (current <= endDate) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // ラベル作成＆データマッピング
  const processChartData = (range, isPrev = false) => {
    const labels = getDateRange(range, isPrev);
    const dataMap = Object.fromEntries(
      weightRecords.map((r) => [r.date, r.weight])
    );

    // データが無い日はnullにする
    const dataset = labels.map((date) => dataMap[date] ?? null);

    return { labels, dataset };
  };

  // レスポンシブサイズの調整
  const mediaQueryChart = window.matchMedia("(max-width: 599px)");

  let weightChart;

  const updateChart = (range) => {
    const { labels, dataset } = processChartData(range);
    const labelsReplace = labels.map((label) => label.replaceAll("-", "/"));
    const ctx = graphElement.getContext("2d");

    if (weightChart) weightChart.destroy();

    weightChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labelsReplace,
        datasets: [
          {
            label: "体重（kg）",
            data: dataset,
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
            callbacks: {
              label(context) {
                let value = context.raw;
                return ` 体重: ${value.toFixed(1)} kg`;
              },
            },
          },
        },
      },
    });

    // データポイントの個数制限関数
    const dataPointNum = (num) => {
      const maxPoints = num;
      const step = Math.ceil(labels.length / maxPoints);
      weightChart.data.datasets[0].data = dataset.map((_, index, arr) => {
        const lastIndex = arr.length - 1;
        const distanceFromLast = lastIndex - index;

        if (index === lastIndex || distanceFromLast % step === 0) {
          return dataset[index];
        } else {
          return null;
        }
      });
    };

    // レスポンシブポイント表示数変更
    if (mediaQueryChart.matches) {
      dataPointNum(12);
      weightChart.update();
    } else {
      dataPointNum(31);
      weightChart.update();
    }

    if (range === "3m" || range === "6m" || range === "1y") {
      let lastMonth = null;

      // x軸の各月を表示
      weightChart.options.scales.x.ticks.callback = (value, i) => {
        let date = new Date(labels[value]);
        let month = date.getMonth() + 1;

        if (month === lastMonth) {
          return;
        }

        lastMonth = month;

        return `${month}月`;
      };

      weightChart.update();
    }
  };

  // 体重グラフカード日付変更
  const titleDate = (range) => {
    const dateArr = getDateRange(range).map((date) =>
      date.replaceAll("-", "/")
    );
    const firstDate = dateArr[0];
    const lastDate = dateArr[dateArr.length - 1];

    return `${firstDate}～${lastDate}`;
  };
  const weightGraphDate = document.querySelector(".weight-graph__date");

  // 体重グラフの初期表示
  let range = "1m";
  updateChart(range);
  weightGraphDate.innerHTML = titleDate(range);

  // メディアクエリの変更を検知して更新
  mediaQueryChart.addEventListener("change", () => updateChart(range));

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

  // ユーザー登録データ取得
  const stature = 1.685;
  const age = 25;
  const isWomen = false;

  // 各期間切り替えスイッチのカラー制御
  weightGraphSwitchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector(".weight-graph__switch .btn--select")
        ?.classList.remove("btn--select");
      btn.classList.add("btn--select");
    });
  });

  // weight-summary データ更新用関数
  const weightSummaryUpdate = (range) => {
    // グラフデータ
    const chartData = processChartData(range);
    const nullNotDataset = chartData.dataset.filter((data) => data !== null);

    // 比較用 前グラフデータ
    const prevChartData = processChartData(range, true);
    const prevNullNotDataset = prevChartData.dataset.filter(
      (data) => data !== null
    );

    // 平均体重取得関数
    const calcWeightAverage = (nullNotDataset) => {
      if (nullNotDataset.length) {
        const datasetSum = nullNotDataset.reduce((arr, cur) => arr + cur);

        return (datasetSum / nullNotDataset.length).toFixed(1);
      } else {
        return null;
      }
    };

    // BMI配列取得関数
    const calcBMIArr = (nullNotDataset) => {
      if (nullNotDataset.length) {
        return nullNotDataset.map((data) =>
          Number((data / Math.pow(stature, 2)).toFixed(2))
        );
      } else {
        return null;
      }
    };

    // 平均BMI取得関数
    const calcBMIAverage = (nullNotDataset) => {
      if (nullNotDataset.length) {
        const BMIArr = calcBMIArr(nullNotDataset);
        const arrSum = BMIArr.reduce((arr, cur) => arr + cur);

        return (arrSum / BMIArr.length).toFixed(2);
      } else {
        return null;
      }
    };

    // 平均体脂肪率（推定）取得関数
    const calcBFPAverage = (nullNotDataset) => {
      if (nullNotDataset.length) {
        const averageBMI = calcBMIAverage(nullNotDataset);

        return (averageBMI * 1.2 + age * 0.23 - (isWomen ? 5.4 : 16.2)).toFixed(
          2
        );
      } else {
        return null;
      }
    };

    // 平均の増減
    const calcAverageCompare = (nullNotDataset, prevNullNotDataset) => {
      if (nullNotDataset.length && prevNullNotDataset.length) {
        const result = (
          calcWeightAverage(nullNotDataset) -
          calcWeightAverage(prevNullNotDataset)
        ).toFixed(1);

        return result > 0 ? "+" + result : String(result);
      } else {
        return null;
      }
    };

    // 最高体重取得関数
    const maxWeightFunc = (nullNotDataset) => {
      if (nullNotDataset.length) {
        return Math.max(...nullNotDataset);
      } else {
        return null;
      }
    };

    // 最低体重取得関数
    const minWeightFunc = (nullNotDataset) => {
      if (nullNotDataset.length) {
        return Math.min(...nullNotDataset);
      } else {
        return null;
      }
    };

    const summaryOffsets = {
      average: calcWeightAverage(nullNotDataset),
      bfp: calcBFPAverage(nullNotDataset),
      bmi: calcBMIAverage(nullNotDataset),
      in_de: calcAverageCompare(nullNotDataset, prevNullNotDataset),
      best: maxWeightFunc(nullNotDataset),
      lowest: minWeightFunc(nullNotDataset),
    };

    let rangeText;
    if (range === "7d") rangeText = "1週間";
    if (range === "1m") rangeText = "1ヶ月";
    if (range === "3m") rangeText = "3ヶ月";
    if (range === "6m") rangeText = "半年";
    if (range === "1y") rangeText = "1年";

    // weight-summary データ更新
    weightSummaryBlocks.forEach((summary) => {
      summary.querySelector(".period").innerHTML = rangeText;
      const summaryOffset = summaryOffsets[summary.dataset.summary];
      if (summaryOffset) {
        summary.querySelector(".weight-summary__num").innerHTML = summaryOffset;
      } else {
        summary.querySelector(".weight-summary__num").innerHTML = "--";
      }
    });
  };

  // weight-summary データ初期状態
  weightSummaryUpdate(range);

  // 各期間切り替えボタン
  document
    .getElementById("weight-graph__week")
    .addEventListener("click", () => {
      range = "7d";
      updateChart(range);
      weightGraphDate.innerHTML = titleDate(range);
      weightSummaryUpdate(range);
    });
  document
    .getElementById("weight-graph__month")
    .addEventListener("click", () => {
      range = "1m";
      updateChart(range);
      weightGraphDate.innerHTML = titleDate(range);
      weightSummaryUpdate(range);
    });
  document
    .getElementById("weight-graph__three-month")
    .addEventListener("click", () => {
      range = "3m";
      updateChart(range);
      weightGraphDate.innerHTML = titleDate(range);
      weightSummaryUpdate(range);
    });
  document
    .getElementById("weight-graph__half-year")
    .addEventListener("click", () => {
      range = "6m";
      updateChart(range);
      weightGraphDate.innerHTML = titleDate(range);
      weightSummaryUpdate(range);
    });
  document
    .getElementById("weight-graph__year")
    .addEventListener("click", () => {
      range = "1y";
      updateChart(range);
      weightGraphDate.innerHTML = titleDate(range);
      weightSummaryUpdate(range);
    });
}
