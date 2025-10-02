// 多重バインド防止
const boundInputs = new WeakSet();
// IME中の要素を覚える
const composingInputs = new WeakSet();

/**
 * 入力フィルタ用バインダー
 * - selectorに input/change を紐づけ
 * - 多重バインド防止
 * - IME中は何もしない、compositionendで1回だけ正規化
 */
const bindInputFilter = (selector, handler) => {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach((input) => {
    if (boundInputs.has(input)) return;
    boundInputs.add(input);

    const onInput = (e) => {
      const el = e.target;
      // IME中はスキップ
      if (composingInputs.has(el) || e.isComposing === true) return;
      handler(el);
    };

    const onCompStart = (e) => {
      composingInputs.add(e.target);
    };

    const onCompEnd = (e) => {
      const el = e.target;
      composingInputs.delete(el);
      handler(el);
    };

    input.addEventListener("input", onInput);
    input.addEventListener("change", onInput);
    input.addEventListener("compositionstart", onCompStart);
    input.addEventListener("compositionend", onCompEnd);
    input.addEventListener("compositioncancel", onCompEnd);
  });
};

/**
 * 値更新ヘルパー
 * - 変更時のみ代入
 * - キャレット位置を維持
 */
const setValuePreserveCaret = (el, next) => {
  const prev = el.value;
  if (next === prev) return;

  const hasSel =
    typeof el.selectionStart === "number" &&
    typeof el.selectionEnd === "number";
  const s = hasSel ? el.selectionStart : null;
  const e = hasSel ? el.selectionEnd : null;
  const atEnd = hasSel && s === prev.length && e === prev.length;

  el.value = next;

  if (!hasSel) return;

  if (atEnd) {
    el.selectionStart = el.selectionEnd = next.length;
    return;
  }

  const diff = next.length - prev.length;
  const ns = Math.max(0, Math.min(next.length, (s ?? 0) + diff));
  const ne = Math.max(0, Math.min(next.length, (e ?? 0) + diff));
  el.selectionStart = ns;
  el.selectionEnd = ne;
};

/**
 * 半角英数字と記号のみ許可（日本語等は除去）
 */
export const initRestrictToAlphanumeric = (selector) => {
  bindInputFilter(selector, (el) => {
    const next = el.value.replace(
      /[^a-zA-Z0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
      ""
    );
    setValuePreserveCaret(el, next);
  });
};

/**
 * 半角数字のみ許可（0-9）
 */
export const initRestrictToNumeric = (selector) => {
  bindInputFilter(selector, (el) => {
    const next = el.value.replace(/[^0-9]/g, "");
    setValuePreserveCaret(el, next);
  });
};

/**
 * 数値入力用リアルタイムフィルター
 * - 整数部 0〜3 桁
 * - 小数部 0〜1 桁（末尾ドットも許容）
 * - 最大 999.9 kg/cm
 *  - 非数字/余分なドット除去
 */
export const initRestrictDecimal = (selector) => {
  bindInputFilter(selector, (el) => {
    let next = el.value;

    // 数字とドット以外を除去
    next = next.replace(/[^0-9.]/g, "");

    // ドットは1個だけ許容（2個目以降を消す）
    const i = next.indexOf(".");
    if (i !== -1) {
      next = next.slice(0, i + 1) + next.slice(i + 1).replace(/\./g, "");
    }

    // 999.9 超えたら強制 999.9 に
    const rawNum = parseFloat(next);
    if (!isNaN(rawNum) && rawNum > 999.9) {
      setValuePreserveCaret(el, "999.9");
      return;
    }

    // 整数部 3桁まで、小数部 1桁までにトリム
    const [intPart = "", decPart = ""] = next.split(".");
    const trimmedInt = intPart.slice(0, 3);
    const trimmedDec = decPart.slice(0, 1);

    next =
      trimmedDec !== "" || next.includes(".")
        ? `${trimmedInt}.${trimmedDec}`
        : trimmedInt;

    setValuePreserveCaret(el, next);
  });
};
