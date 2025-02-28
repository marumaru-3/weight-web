const dateContents = document.getElementById("date-contents");
const datePrev = document.getElementById("date-prev");
const dateNext = document.getElementById("date-next");

// 今日の日付を取得
const today = new Date();
today.setHours(0, 0, 0, 0);
let selectedDate = new Date(today);

// 日付を表示する関数
const updateDateDisplay = () => {
  dateContents.textContent = selectedDate.toISOString().split("T")[0];
  // 次の日が今日を超えたら無効化
  dateNext.disabled = selectedDate.getTime() >= today.getTime();
};

// 初期表示
updateDateDisplay();
