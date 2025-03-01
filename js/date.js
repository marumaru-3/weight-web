// 体重を記録モーダル用
function recordDateDisplay(date) {
  const pad = (str) => ("0" + str).slice(-2);

  const year = date.getFullYear().toString();
  const month = pad(date.getMonth() + 1).toString();
  const day = pad(date.getDate()).toString();

  return `${year}/${month}/${day}`;
}

function recordDateSelect() {
  const dateContents = document.getElementById("date-contents");
  const datePrevBtn = document.getElementById("date-prev");
  const dateNextBtn = document.getElementById("date-next");

  if (!dateContents) {
    return;
  }

  // 今日の日付を取得
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let selectedDate = new Date(today);

  // 日付を表示する関数
  const updateDateDisplay = () => {
    dateContents.textContent = recordDateDisplay(selectedDate);
    // 次の日が今日を超えたら無効化
    dateNextBtn.disabled = selectedDate.getTime() >= today.getTime();
  };

  // 初期表示
  updateDateDisplay();

  // 「前の日」ボタンの処理
  datePrevBtn.addEventListener("click", () => {
    selectedDate.setDate(selectedDate.getDate() - 1);
    updateDateDisplay();
  });

  // 「次の日」ボタンの処理
  dateNextBtn.addEventListener("click", () => {
    if (selectedDate.getTime() < today.getTime()) {
      selectedDate.setDate(selectedDate.getDate() + 1);
      updateDateDisplay();
    }
  });
}

// ユーザー生年月日用
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

// 現在の年を取得
const currentYear = new Date().getFullYear();
