weightGraph();
function weightGraph() {
  const graph = document.getElementById("graph");

  if (!graph) {
    return;
  }

  // 日付設定
  // const startDate = new Date(2024, 11, 6); // 月は0始まり
  // const days = 33; // 期間の日数

  // const labels = Array.from({ length: days }, (_, i) => {
  //   const date = new Date(startDate);
  //   date.setDate(startDate.getDate() + i);

  //   // 前日の日付を取得（初日は考慮不要なので startDate のまま）
  //   const prevDate = new Date(date);
  //   prevDate.setDate(date.getDate() - 1);

  //   // 月が変わったら "M月D日" 形式、そうでなければ日付のみ
  //   return date.getMonth() !== prevDate.getMonth()
  //     ? `${date.getMonth() + 1}月${date.getDate()}日`
  //     : `${date.getDate()}日`;
  // });

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
    { date: "2024-12-23", weight: null },
    { date: "2024-12-24", weight: null },
    { date: "2024-12-25", weight: 70.2 },
    { date: "2024-12-26", weight: 69.8 },
    { date: "2024-12-27", weight: 69.2 },
    { date: "2024-12-28", weight: 69.1 },
    { date: "2024-12-29", weight: 69.0 },
    { date: "2024-12-30", weight: 68.8 },
    { date: "2024-12-31", weight: 68.5 },
    { date: "2024-01-01", weight: null },
    { date: "2024-01-02", weight: null },
    { date: "2024-01-03", weight: 69.2 },
    { date: "2024-01-04", weight: 69.0 },
    { date: "2024-01-05", weight: 68.5 },
  ];

  // Chart.js用のデータに変換
  const weightLabels = weightRecords.map((record) => record.date);
  const weightData = weightRecords.map((record) => record.weight);

  // レスポンシブサイズの調整
  const mediaQueryChart = window.matchMedia("(max-width: 599px)");

  function applyResponsChart(chart) {
    // レスポンシブ比率
    chart.options.aspectRatio = mediaQueryChart.matches ? 4 / 3 : 2 / 1;
    chart.resize();

    // レスポンシブy軸個数
    chart.options.scales.y.ticks.maxTicksLimit = mediaQueryChart.matches
      ? 6
      : 8;

    // レスポンシブ点の数調整
    const weightRecordsLength = weightRecords.length;
    const labels = chart.data.labels;
    chart.data.datasets[0].pointRadius = labels.map((_, i) =>
      mediaQueryChart.matches
        ? i === 0 || i === weightRecordsLength - 1 || i % 2 === 0
          ? 4
          : 0
        : 5
    );
    chart.update();
  }

  const configData = {
    labels: labels,
    datasets: [
      {
        label: "体重（kg）",
        data: weightData,
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
  };

  const config = {
    type: "line",
    data: configData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: mediaQueryChart.matches ? 4 / 3 : 2 / 1,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
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
  };

  let weightChart = new Chart(graph, config);

  const filterDataByPeriod = (days) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);

    return weightRecords.filter((record) => new Date(record.date) >= pastDate);
  };

  // const filterDataByPeriod = (days) => {
  //   const today = new Date();
  //   const pastDate = new Date();
  //   pastDate.setDate(today.getDate() - days);

  //   const filterDate = weightRecords.filter((record) => {
  //     const recordDate = new Date(record.date) >= pastDate;

  //     const prevDate = new Date(recordDate);
  //     prevDate.setDate(recordDate.getDate() - 1);

  //     return recordDate.getMonth() !== prevDate.getMonth()
  //       ? `${recordDate.getMonth() + 1}月${recordDate.getDate()}日`
  //       : `${recordDate.getDate()}日`;
  //   });

  //   console.log(filterDate);
  // };

  document
    .getElementById("weight-graph__week")
    .addEventListener("click", () => {
      const filteredData = filterDataByPeriod(7);
      updateChart(filteredData);
    });
  document
    .getElementById("weight-graph__month")
    .addEventListener("click", () => {
      const filteredData = filterDataByPeriod(30);
      updateChart(filteredData);
    });
  document
    .getElementById("weight-graph__three-month")
    .addEventListener("click", () => {
      const filteredData = filterDataByPeriod(90);
      updateChart(filteredData);
    });
  document
    .getElementById("weight-graph__half-year")
    .addEventListener("click", () => {
      const filteredData = filterDataByPeriod(182);
      updateChart(filteredData);
    });
  document
    .getElementById("weight-graph__year")
    .addEventListener("click", () => {
      const filteredData = filterDataByPeriod(365);
      updateChart(filteredData);
    });

  const updateChart = (filteredData) => {
    const labels = filteredData.map((record, i) => record.date);
    const data = filteredData.map((record) => record.weight);

    weightChart.data.labels = labels;
    weightChart.data.datasets[0].data = data;
    weightChart.update();
  };

  // 初回適用
  // applyResponsChart(weightChart);

  // // メディアクエリの変更を検知して更新
  // mediaQueryChart.addEventListener("change", () =>
  //   applyResponsChart(weightChart)
  // );
}
