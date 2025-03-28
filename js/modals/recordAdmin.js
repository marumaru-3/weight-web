import {
  initValidateBtn,
  initTextLabelClick,
} from "../features/forms/form-validate.js";

export const init = async (recordData) => {
  // テキストラベルクリック判定
  initTextLabelClick();

  const modal = document.querySelector(".modal-record-admin");

  // モーダルに取得した要素を表示
  if (recordData) {
    modal.querySelector(".date__contents").textContent = recordData.date;
    modal.querySelector("#weight").value = recordData.weight || "";
    modal.querySelector("#memo").value = recordData.memo || "";
  }

  // バリデーションボタン制御
  initValidateBtn();
  document.addEventListener("input", initValidateBtn);
  document.addEventListener("change", initValidateBtn);

  // フォームの送信処理
  const recordForm = document.getElementById("record-form");
  if (recordForm) {
    recordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("記録フォーム送信");
    });
  }
};
