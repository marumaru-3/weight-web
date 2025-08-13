import { fetchInsertRecord } from "../../api/fetch-data.js";
import { initRecordDateSelect } from "../../features/records/record-date.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelClick,
  initRestrictDecimal,
} from "../../features/forms/form-validate.js";

export const init = async () => {
  // 日付選択処理
  initRecordDateSelect();

  // テキストラベルクリック判定
  initTextLabelClick();
  initRestrictDecimal("input[data-weight-input]");

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
      const result = await fetchInsertRecord(formData);

      window.history.scrollRestoration = "manual";
      window.location.reload();
      if (!result.success) {
        alert(result.message);
      }
    });
  }
};
