import { fetchUpdateRecord, fetchDeleteRecord } from "../api/fetch_data.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelClick,
  initRestrictToFloat,
} from "../features/forms/form-validate.js";

export const init = (recordData) => {
  // テキストラベルクリック判定
  initTextLabelClick();
  initRestrictToFloat("input[data-float]");

  const modal = document.querySelector(".modal-record-admin");

  // モーダルに取得した要素を表示
  if (recordData) {
    const formattedDate = recordData.date.replace(/-/g, "/");

    modal.querySelector(".date__contents").textContent = formattedDate;
    modal.querySelector("#recorded_at").value = formattedDate;
    modal.querySelector("#weight").value = recordData.weight;
    modal.querySelector("#memo").value = recordData.memo || "";
  }

  // バリデーションボタン制御
  initValidateBtn();
  document.addEventListener("input", initValidateBtn);
  document.addEventListener("change", initValidateBtn);

  // フォームの送信処理
  const recordForm = document.getElementById("record-form");
  if (recordForm) {
    recordForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn();
      const isValid = initValidateForm(recordForm);

      if (!isValid) {
        console.log("バリデーションエラー： フォーム送信をキャンセル");
        return;
      }

      const formData = new FormData(recordForm);
      const result = await fetchUpdateRecord(formData);

      window.history.scrollRestoration = "manual";
      window.location.reload();
      if (!result.success) {
        alert(result.message);
      }
    });

    const deleteBtn = document.getElementById("delete-btn");
    deleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const formData = new FormData(recordForm);
      const result = await fetchDeleteRecord(formData);

      window.history.scrollRestoration = "manual";
      window.location.reload();
      if (!result.success) {
        alert(result.message);
      }
    });
  }
};
