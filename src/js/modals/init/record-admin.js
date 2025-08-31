import { fetchUpdateRecord, fetchDeleteRecord } from "../../api/api.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelUI,
} from "../../features/forms/field-validate.js";
import { initRestrictDecimal } from "../../features/forms/input-filters.js";

export const init = (recordData) => {
  const modal = document.querySelector(".modal-record-admin");
  const recordForm = document.getElementById("record-form");

  // テキストラベルクリック判定
  initTextLabelUI(recordForm);
  initRestrictDecimal("input[data-weight-input]");

  // モーダルに取得した要素を表示
  if (recordData) {
    const formattedDate = recordData.date.replace(/-/g, "/");

    modal.querySelector(".date__contents").textContent = formattedDate;
    modal.querySelector("#recorded_at").value = formattedDate;
    modal.querySelector("#weight").value = recordData.weight;
    modal.querySelector("#memo").value = recordData.memo || "";
  }

  // バリデーションボタン制御
  initValidateBtn(recordForm);
  document.addEventListener("input", initValidateBtn(recordForm));
  document.addEventListener("change", initValidateBtn(recordForm));

  // フォームの送信処理
  if (recordForm) {
    recordForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn(recordForm);
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
