weightGraph();
function weightGraph() {
  const graphElement = document.getElementById("graph");

  if (!graphElement) {
    return;
  }

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
    { date: "2025-02-05", weight: 68.5 },
    { date: "2025-02-15", weight: 68.8 },
    { date: "2025-02-28", weight: 69.1 },
    { date: "2025-03-03", weight: 67.8 },
    { date: "2025-03-04", weight: 68.1 },
    { date: "2025-03-05", weight: 67.6 },
  ];

  // 指定した範囲の日付リストを作成
  const getDateRange = (range) => {
    const now = new Date();
    let startDate = new Date();

    if (range === "7d") startDate.setDate(now.getDate() - 7);
    if (range === "1m") startDate.setMonth(now.getMonth() - 1);
    if (range === "3m") startDate.setMonth(now.getMonth() - 3);
    if (range === "6m") startDate.setMonth(now.getMonth() - 6);
    if (range === "1y") startDate.setFullYear(now.getFullYear() - 1);

    let dates = [];
    let current = new Date(startDate);
    while (current <= now) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // ラベル作成＆データマッピング
  const processChartData = (range) => {
    const labels = getDateRange(range);
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

  // 体重グラフカードの初期表示
  let chartPeriod = "1m";
  updateChart(chartPeriod);
  weightGraphDate.innerHTML = titleDate(chartPeriod);

  const weightGraphSwitchBtns = document.querySelectorAll(
    ".weight-graph__switch button"
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

  // 体重グラフ下カード表示変更

  // 各期間切り替えボタン
  document
    .getElementById("weight-graph__week")
    .addEventListener("click", () => {
      chartPeriod = "7d";
      updateChart(chartPeriod);
      weightGraphDate.innerHTML = titleDate(chartPeriod);
    });
  document
    .getElementById("weight-graph__month")
    .addEventListener("click", () => {
      chartPeriod = "1m";
      updateChart(chartPeriod);
      weightGraphDate.innerHTML = titleDate(chartPeriod);
    });
  document
    .getElementById("weight-graph__three-month")
    .addEventListener("click", () => {
      chartPeriod = "3m";
      updateChart(chartPeriod);
      weightGraphDate.innerHTML = titleDate(chartPeriod);
    });
  document
    .getElementById("weight-graph__half-year")
    .addEventListener("click", () => {
      chartPeriod = "6m";
      updateChart(chartPeriod);
      weightGraphDate.innerHTML = titleDate(chartPeriod);
    });
  document
    .getElementById("weight-graph__year")
    .addEventListener("click", () => {
      chartPeriod = "1y";
      updateChart(chartPeriod);
      weightGraphDate.innerHTML = titleDate(chartPeriod);
    });

  // // メディアクエリの変更を検知して更新
  mediaQueryChart.addEventListener("change", () => updateChart(chartPeriod));
}
