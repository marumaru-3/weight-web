const MESSAGES = {
  required: (label) => `${label}を入力してください`,
  too_short: (label) => `${label}は4文字以上で入力してください`,
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
  const label = getLabelText(container);

  if (!result.ok) {
    const fn = MESSAGES[result.code] || (() => "");
    const text = fn(label);
    msgEl.textContent = text;
    container.classList.add("no-text");
    container.setAttribute("aria-invalid", "true");
  } else {
    msgEl.textContent = "";
    container.classList.remove("no-text");
    container.removeAttribute("aria-invalid");
  }
};
