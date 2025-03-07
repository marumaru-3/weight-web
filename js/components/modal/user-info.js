import { userDateForm } from "../../features/user-date.js";

export const init = () => {
  // 日付選択処理
  userDateForm();

  // テキストラベルクリック判定
  textLabelClick();
};

// テキストラベル判定関数
const textLabelClick = () => {
  const basicInfoForms = document.querySelectorAll(".basic-info-form__input");

  basicInfoForms.forEach((basicInfoForm) => {
    const input = basicInfoForm.querySelector("input");
    const select = basicInfoForm.querySelector("select");

    // クリック時にクラスを追加
    basicInfoForm.addEventListener("click", (e) => {
      if (e.target === input) {
        basicInfoForm.classList.add("click");
        basicInfoForm.classList.add("text-on");
      } else if (e.target === select) {
        basicInfoForm.classList.add("click");
      }
    });

    // フォーカスが外れたときにクラスを削除
    document.addEventListener("click", (e) => {
      if (input && e.target !== input) {
        basicInfoForm.classList.remove("click");

        if (input.value.trim() === "") {
          basicInfoForm.classList.remove("text-on");
        }
      } else if (select && e.target !== select) {
        basicInfoForm.classList.remove("click");
      }
    });
  });
};
