import { fetchUpdateAccount, fetchUpdateUser } from "../api/user_data.js";
import { initUserDateForm } from "../features/forms/form-date.js";
import {
  initValidateForm,
  initValidateBtn,
  initCheckBtn,
  initTextLabelClick,
  initRestrictToAlphanumeric,
  initRestrictToFloat,
} from "../features/forms/form-validate.js";

export const init = (userData) => {
  // 日付選択処理
  initUserDateForm();

  // テキストラベルクリック判定
  initTextLabelClick();
  initRestrictToAlphanumeric("input[data-alphanumeric]");
  initRestrictToFloat("input[data-float]");

  const userInfoForm = document.querySelector("#user-info-form");
  const adminAccFrom = document.querySelector(".admin-account-form");
  const adminUserFrom = document.querySelector(".admin-user-form");

  // モーダルに取得した要素を表示
  if (userData) {
    modal.querySelector("#username").value = userData.username;
    modal.querySelector("#birth-year").value = userData.birth_year;
    modal.querySelector("#birth-month").value = userData.birth_month;
    requestAnimationFrame(() => {
      modal.querySelector("#birth-day").value = userData.birth_day;
    });

    const genderRadio = document.querySelector(
      `input[name="gender"][value="${userData.gender}`
    );
    genderRadio.checked = true;

    modal.querySelector("#height").value = userData.height;
    modal.querySelector("#ideal-weight").value = userData.ideal_weight;
  }

  // バリデーションボタン制御
  initValidateBtn();
  document.addEventListener("input", initValidateBtn);
  document.addEventListener("change", initValidateBtn);

  // フォームの送信処理
  if (userInfoForm) {
    userInfoForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // バリデーションチェックを実行
      initCheckBtn();
      const isValid = initValidateForm(userInfoForm);

      if (!isValid) {
        console.log("バリデーションエラー： フォーム送信をキャンセル");
        return;
      }

      const formData = new FormData(userInfoForm);

      let result;
      if (adminAccFrom) {
        result = await fetchUpdateAccount(formData);
      }
      if (adminUserFrom) {
        result = await fetchUpdateUser(formData);
      }

      window.history.scrollRestoration = "manual";
      window.location.reload();
      if (!result.success) {
        alert(result.message);
      }
    });
  }
};
