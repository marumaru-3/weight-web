import { fetchInsertRecord } from "../../api/api.js";
import { initRecordDateSelect } from "../../features/records/record-date.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelUI,
  initRealtimeOnClick,
} from "../../features/forms/field-validate.js";
import { initRestrictDecimal } from "../../features/forms/input-filters.js";

export const init = async () => {
  const recordForm = document.getElementById("record-form");

  // 日付選択処理
  initRecordDateSelect();

  // テキストラベルクリック判定
  initTextLabelUI(recordForm);
  initRealtimeOnClick(recordForm);
  initRestrictDecimal("input[data-weight-input]");

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
      const result = await fetchInsertRecord(formData);

      window.history.scrollRestoration = "manual";
      window.location.reload();
      if (!result.success) {
        alert(result.message);
      }
    });
  }
};
