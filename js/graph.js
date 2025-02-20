// 日付設定
const startDate = new Date(2024, 11, 6); // 月は0始まり
const days = 33; // 期間の日数

const labels = Array.from({ length: days }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i);

  // 前日の日付を取得（初日は考慮不要なので startDate のまま）
  const prevDate = new Date(date);
  prevDate.setDate(date.getDate() - 1);

  // 月が変わったら "M月D日" 形式、そうでなければ日付のみ
  return date.getMonth() !== prevDate.getMonth()
    ? `${date.getMonth() + 1}月${date.getDate()}日`
    : `${date.getDate()}日`;
});

// 体重記録
const weights = [
  69.2,
  68.9,
  69.1,
  68.9,
  68.7,
  68.5,
  68.5,
  68.1,
  68.2,
  68.2,
  null,
  68.0,
  68.0,
  66.4,
];

// レスポンシブサイズの調整
const ctx = document.getElementById("graph").getContext("2d");
const mediaQueryChart = window.matchMedia("(max-width: 599px)");

function applyResponsChart(chart) {
  // レスポンシブ比率
  chart.options.aspectRatio = mediaQueryChart.matches ? 4 / 3 : 2 / 1;
  chart.resize();

  // レスポンシブy軸個数
  chart.options.scales.y.ticks.maxTicksLimit = mediaQueryChart.matches ? 6 : 8;

  // レスポンシブ点の数調整
  const weightLength = weights.length;
  const labels = chart.data.labels;
  chart.data.datasets[0].pointRadius = labels.map((_, i) =>
    mediaQueryChart.matches
      ? i === 0 || i === weightLength - 1 || i % 2 === 0
        ? 4
        : 0
      : 5
  );
  chart.update();
}

const data = {
  labels: labels,
  datasets: [
    {
      label: "体重（kg）",
      data: weights,
      backgroundColor: "#4a90e2",
      borderColor: "#4a90e2",
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#4a90e2",
      pointBorderWidth: 3,
      hoverBorderWidth: 4,
      spanGaps: true,
    },
  ],
};

const config = {
  type: "line",
  data: data,
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

let weightChart = new Chart(document.getElementById("graph"), config);

// 初回適用
applyResponsChart(weightChart);

// メディアクエリの変更を検知して更新
mediaQueryChart.addEventListener("change", () =>
  applyResponsChart(weightChart)
);
