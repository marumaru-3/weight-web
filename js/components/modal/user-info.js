import { userDateForm } from "../../features/form-date.js";

export const init = () => {
  // 日付選択処理
  userDateForm();

  // テキストラベルクリック判定
  textLabelClick();

  validateForm();

  document.addEventListener("input", validateForm);
  document.addEventListener("change", validateForm);
  function validateForm() {
    const form = document.querySelector("#basic-info-form");
    const submitButton = document.querySelector("#btn--user-admin");

    // required なフィールドをすべて取得
    const requiredFields = [...form.querySelectorAll("[required]")];

    // すべての必須項目が入力済みか判定
    const isValid = requiredFields.every((field) => {
      if (field.type === "radio") {
        // ラジオボタンは同じ name のどれかが選択されていればOK
        return form.querySelector(`input[name="${field.name}"]:checked`);
      } else {
        // input や select は value が空でなければOK
        return field.value.trim() !== "";
      }
    });

    if (isValid) submitButton.classList.remove("disabled");
    submitButton.disabled = !isValid;
  }
  console.log("test");

  // フォームの送信処理
  const userInfoForm = document.getElementById("basic-info-form");
  if (userInfoForm) {
    userInfoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // inputValidateCheck();
    });
  }
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

        validateForm(input, basicInfoForm);
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

// バリデーション
const validateForm = (input, form) => {
  input.addEventListener("input", () => inputValidateCheck(input, form));
};

const inputValidateCheck = (input, form) => {
  const formValidate = form.nextElementSibling;
  const labelName = form.querySelector(".label-name").textContent;
  const labelNameSprit = labelName.substr(0, labelName.indexOf("（"));
  if (input.validity.valueMissing) {
    if (labelNameSprit.length) {
      formValidate.textContent = `${labelNameSprit}を入力してください`;
    } else {
      formValidate.textContent = `${labelName}を入力してください`;
    }
  } else {
    formValidate.textContent = "";
  }
};
