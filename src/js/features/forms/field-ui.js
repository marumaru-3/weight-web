const MESSAGES = {
  required: (label) => `${label}を入力してください`,
  too_short: (label, p) => `${label}は${p?.min ?? 4}文字以上で入力してください`,
};

const getLabelText = (container) => {
  const labelEl = container.querySelector(".label-title, .label-name");
  const raw = labelEl?.textContent.trim() ?? "";
  const labelElSprit = raw.includes("（")
    ? raw.substring(0, raw.indexOf("（"))
    : raw;
  return labelElSprit;
};

export const applyValidation = (container, result) => {
  const msgEl =
    container.querySelector(".validate-text") || container.nextElementSibling;
  if (!msgEl) return;
  const label = getLabelText(container);

  if (!result.ok) {
    const fn = MESSAGES[result.code] || (() => "");
    const text = fn(label, result.payload);
    msgEl.textContent = text;
    container.classList.add("no-text");
    container.setAttribute("aria-invalid", "true");
  } else {
    msgEl.textContent = "";
    container.classList.remove("no-text");
    container.removeAttribute("aria-invalid");
  }
};

// テキストラベル判定関数
export const initTextLabelClick = (root = document, onValidate) => {
  const validateForms = root.querySelectorAll(".validate-form__input");

  validateForms.forEach((validateForm) => {
    const input = validateForm.querySelector("input");
    const select = validateForm.querySelector("select");
    const button = validateForm.querySelector("button");

    // クリック時にクラスを追加
    validateForm.addEventListener("click", (e) => {
      if (e.target === input) {
        validateForm.classList.add("click", "text-on");
        if (onValidate) onValidate(input, validateForm);
      } else if (e.target === select) {
        validateForm.classList.add("click");
        if (onValidate) onValidate(select, validateForm);
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
