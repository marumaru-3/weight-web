// ボタンクリック時のチェック
export const initCheckBtn = () => {
  const formBoxes = document.querySelectorAll(".basic-info-form__box");
  formBoxes.forEach((formBox) => {
    const input = formBox.querySelector("input");
    const selects = formBox.querySelectorAll("select");

    if (input) inputValidateCheck(input, formBox);
    if (selects.length) {
      selects.forEach((select) => {
        inputValidateCheck(select, formBox);
      });
    }
  });
};

// バリデーションチェック
const inputValidateCheck = (element, form) => {
  let formValidate =
    form.querySelector(".validate-text") || form.nextElementSibling;
  const labelName = form.querySelector(".label-title")
    ? form.querySelector(".label-title").textContent
    : form.querySelector(".label-name").textContent;
  const labelNameSprit = labelName.includes("（")
    ? labelName.substr(0, labelName.indexOf("（"))
    : labelName;

  // パスワードの特別ルール
  if (element.id === "password") {
    if (element.validity.valueMissing) {
      formValidate.textContent = `${labelNameSprit}を入力してください`;
      form.classList.add("no-text");
      return false;
    } else if (element.value.length < 4) {
      formValidate.textContent = `${labelNameSprit}は4文字以上で入力してください`;
      form.classList.add("no-text");
      return false;
    }
  }
  // 共通のバリデーション
  else if (
    (element.tagName === "INPUT" && element.validity.valueMissing) ||
    (element.tagName === "SELECT" && element.value === "")
  ) {
    formValidate.textContent = `${labelNameSprit}を入力してください`;
    form.classList.add("no-text");
    return false;
  }

  formValidate.textContent = "";
  form.classList.remove("no-text");
  return true;
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

const validateFormCheck = (element, form) => {
  if (element.tagName === "SELECT") {
    element.addEventListener("change", () => inputValidateCheck(element, form));
  } else {
    element.addEventListener("input", () => inputValidateCheck(element, form));
  }
};
