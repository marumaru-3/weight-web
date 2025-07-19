// ボタン制御バリデーション
export const initValidateBtn = () => {
  initValidateForm(document.querySelector(".validate-form"));
  document.addEventListener("input", () =>
    initValidateForm(document.querySelector(".validate-form"))
  );
  document.addEventListener("change", () =>
    initValidateForm(document.querySelector(".validate-form"))
  );

  // ステップがある場合のバリデーション更新
  document.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      initValidateForm(document.querySelector(".validate-form"));
    });
  });
};

export const initValidateForm = (form) => {
  if (!form) return false;

  // '.step'がある場合は、現在アクティブな'.step'を対象にする
  const activeStep = form.querySelector(".step.visible");
  const target = activeStep || form;

  // required なフィールドをすべて取得
  const requiredFields = [...target.querySelectorAll("[required]")];

  // すべての必須項目が入力済みか判定
  const isValid = requiredFields.every((field) => {
    if (field.type === "radio" || field.type === "checkbox") {
      // ラジオボタンは同じ name のどれかが選択されていればOK
      return form.querySelector(`input[name="${field.name}"]:checked`);
    } else if (field.id === "password") {
      // パスワードは4文字以上でOK
      return field.value.length > 3;
    } else {
      // input や select は value が空でなければOK
      return field.value.trim() !== "";
    }
  });

  const submitButtons = document.querySelectorAll(".submit-btn");
  submitButtons.forEach((btn) => {
    if (isValid) {
      btn.classList.remove("disabled");
    } else {
      btn.classList.add("disabled");
    }
    btn.disabled = !isValid;
  });

  return isValid;
};

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

const validateFormCheck = (element, form) => {
  if (element.tagName === "SELECT") {
    element.addEventListener("change", () => inputValidateCheck(element, form));
  } else {
    element.addEventListener("input", () => inputValidateCheck(element, form));
  }
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

// 半角英数字の入力制御
export const initRestrictToAlphanumeric = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(
        /[^a-zA-Z0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
        ""
      );
    });
  });
};

// 半角数字の入力制御
export const initRestrictToNumeric = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
  });
};

// 半角数字(小数点あり)の入力制御
export const initRestrictToFloat = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
    });
  });
};

/**
 * 数値入力用リアルタイムフィルター
 * - 整数部 0〜3 桁
 * - 小数部 0〜1 桁（末尾ドットも許容）
 * - 最大 999.9 kg
 * initRestrictWeight
 */
export const initRestrictDecimal = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", () => {
      let newValue = input.value;

      // 数字とドット以外を除去
      newValue = newValue.replace(/[^0-9.]/g, "");

      // ドットは1個だけ許容（2個目以降を消す）
      newValue = newValue.replace(/(\..*)\./g, "$1");

      // 整数部 3桁まで、小数部 1桁までにトリム
      const [intPart = "", decPart = ""] = newValue.split(".");
      const trimmedInt = intPart.slice(0, 3);
      const trimmedDec = decPart.slice(0, 1);

      newValue =
        trimmedDec !== "" || newValue.includes(".")
          ? `${trimmedInt}.${trimmedDec}`
          : trimmedInt;

      // 999.9 超えたら強制 999.9 に
      const num = parseFloat(newValue);
      if (!isNaN(num) && num > 999.9) {
        newValue = "999.9";
      }

      input.value = newValue;
    });
  });
};
