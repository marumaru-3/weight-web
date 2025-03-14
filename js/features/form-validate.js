// バリデーション
export const initValidateBtn = () => {
  validateBtn();
  document.addEventListener("input", validateBtn);
  document.addEventListener("change", validateBtn);
};

const validateBtn = () => {
  const form = document.querySelector(".validate-form");
  const submitButton = document.querySelector(".submit-btn");

  // required なフィールドをすべて取得
  const requiredFields = [...form.querySelectorAll("[required]")];

  // すべての必須項目が入力済みか判定
  const isValid = requiredFields.every((field) => {
    if (field.type === "radio" || field.type === "checkbox") {
      // ラジオボタンは同じ name のどれかが選択されていればOK
      return form.querySelector(`input[name="${field.name}"]:checked`);
    } else {
      // input や select は value が空でなければOK
      return field.value.trim() !== "";
    }
  });

  if (isValid) {
    submitButton.classList.remove("disabled");
  } else {
    submitButton.classList.add("disabled");
  }
  submitButton.disabled = !isValid;
};

const validateFormCheck = (input, form) => {
  input.addEventListener("input", () => inputValidateCheck(input, form));
};

const inputValidateCheck = (input, form) => {
  let formValidate;
  if (form.querySelector(".validate-text")) {
    formValidate = form.querySelector(".validate-text");
  } else {
    formValidate = form.nextElementSibling;
  }
  const labelName = form.querySelector(".label-name").textContent;
  const labelNameSprit = labelName.substr(0, labelName.indexOf("（"));
  if (input.validity.valueMissing) {
    if (labelNameSprit.length) {
      formValidate.textContent = `${labelNameSprit}を入力してください`;
    } else {
      formValidate.textContent = `${labelName}を入力してください`;
    }
    form.classList.add("no-text");
  } else {
    formValidate.textContent = "";
    form.classList.remove("no-text");
  }
};

// テキストラベル判定関数
export const initTextLabelClick = () => {
  const validateForms = document.querySelectorAll(".validate-form__input");

  validateForms.forEach((validateForm) => {
    const input = validateForm.querySelector("input");
    const select = validateForm.querySelector("select");
    const button = validateForm.querySelector("button");

    // クリック時にクラスを追加
    validateForm.addEventListener("click", (e) => {
      if (e.target === input) {
        validateForm.classList.add("click");
        validateForm.classList.add("text-on");

        // バリデーション
        validateFormCheck(input, validateForm);
      } else if (e.target === select) {
        validateForm.classList.add("click");
      }
    });

    // フォーカスが外れたときにクラスを削除
    document.addEventListener("click", (e) => {
      if (input && e.target !== input && e.target !== button) {
        validateForm.classList.remove("click");

        if (input.value.trim() === "") {
          validateForm.classList.remove("text-on");
        }
      } else if (select && e.target !== select) {
        validateForm.classList.remove("click");
      }
    });
  });
};

// 半角英数字の入力制御
export const initRestrictToAlphanumeric = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    });
  });
};
