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

// バリデーション結果をUIに反映（エラーメッセージ表示・スタイル切り替え）
export const bindValidationUI = (container, result) => {
  if (!container || !result) return;

  // .validate-form__input を採用
  const uiClassName = "validate-form__input";
  let uiBox = null;
  if (container.classList && container.classList.contains(uiClassName)) {
    uiBox = container;
  }
  if (!uiBox && container.closest) {
    const anc = container.querySelector(`.${uiClassName}`);
    if (anc) uiBox = anc;
  }
  if (!uiBox && container.querySelector) {
    const child = container.querySelector(`.${uiClassName}`);
    if (child) uiBox = child;
  }
  if (!uiBox) uiBox = container;

  const fieldBox = uiBox.closest(".basic-info-form__box") || null;
  const msgEl = fieldBox.querySelector(".validate-text") || null;
  if (!msgEl) return;
  const label = getLabelText(fieldBox);

  if (!result.ok) {
    const fn = MESSAGES[result.code] || (() => "");
    const text = fn(label, result.payload);
    msgEl.textContent = text;
    uiBox.classList.add("no-text");
    uiBox.setAttribute("aria-invalid", "true");
  } else {
    msgEl.textContent = "";
    uiBox.classList.remove("no-text");
    uiBox.setAttribute("aria-invalid", "false");
  }
};

// root要素ごとの「バインド済み状態」と解除関数を記録するWeakMap
const textLabelRegistry = new WeakMap();

// テキストラベルの見た目制御（クリックでON、外側クリックでOFF）
export const bindTextLabelUI = (root = document) => {
  if (textLabelRegistry.has(root)) {
    return textLabelRegistry.get(root);
  }

  const onRootClick = (e) => {
    const el = e.target.closest("input, select, textarea");
    if (!el || !root.contains(el)) return;
    const box = el.closest(".validate-form__input");
    if (!box) return;
    box.classList.add("click");
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
      box.classList.add("text-on");
    }
  };

  const onDocClick = (e) => {
    if (e.target.closest("input, select, textarea, .pwd-btn")) return;

    // いまアクティブなものだけ解除（通常0～1個）
    root.querySelectorAll(".validate-form__input.click").forEach((box) => {
      const el = box.querySelector("input, textarea, select");
      box.classList.remove("click");
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
        const v = (el.value ?? "").trim();
        if (v === "") box.classList.remove("text-on");
      }
    });
  };

  root.addEventListener("click", onRootClick);
  document.addEventListener("click", onDocClick);

  const unbind = () => {
    root.removeEventListener("click", onRootClick);
    document.removeEventListener("click", onDocClick);
    textLabelRegistry.delete(root);
  };

  textLabelRegistry.set(root, unbind);
  return unbind;
};
