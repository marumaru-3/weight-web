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
const data = {
  labels: labels,
  datasets: [
    {
      label: "体重",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [
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
      ],
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

let myChart = new Chart(document.getElementById("graph"), config);
