import { describe, it, expect, afterEach } from "vitest";

import { initPwdClick } from "../../../components/buttons/pwd-btn";

// 共通フィクスチャ関数
const renderPwdBtn = ({ hidden = true } = {}) => {
  document.body.innerHTML = `
    <input id="password" type="${hidden ? "password" : "text"}">
    <button class="pwd-btn" data-hidden="${hidden}">
      <span class="icon" data-icon="${
        hidden ? "visibility" : "visibility_off"
      }"></span>
    </button>
  `;

  const pwdBtn = document.querySelector(".pwd-btn");
  const pwdText = pwdBtn.previousElementSibling;
  const icon = pwdBtn.firstElementChild;

  return {
    pwdBtn,
    pwdText,
    icon,
  };
};

describe("pwd-btn.js", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("初期同期: data-hidden=true の場合", () => {
    // Arrange
    const { pwdBtn, pwdText, icon } = renderPwdBtn({ hidden: true });

    // Act
    initPwdClick();

    // Assert
    // dataset
    expect(pwdBtn.dataset.inited).toBe("1");
    expect(pwdBtn.dataset.hidden).toBe("true");

    // DOM type
    expect(pwdText.type).toBe("password");

    // アイコン
    expect(icon.dataset.icon).toBe("visibility");

    // A11y属性
    expect(pwdBtn.getAttribute("aria-controls")).toBe("password");
    expect(pwdBtn.getAttribute("aria-pressed")).toBe("false");
    expect(pwdBtn.getAttribute("aria-label")).toBe("パスワードを表示");
  });

  it("初期同期: data-hidden=false の場合", () => {
    // Arrange
    const { pwdBtn, pwdText, icon } = renderPwdBtn({ hidden: false });

    // Act
    initPwdClick();

    // Assert
    // dataset
    expect(pwdBtn.dataset.inited).toBe("1");
    expect(pwdBtn.dataset.hidden).toBe("false");

    // DOM type
    expect(pwdText.type).toBe("text");

    // アイコン
    expect(icon.dataset.icon).toBe("visibility_off");

    // A11y属性
    expect(pwdBtn.getAttribute("aria-controls")).toBe("password");
    expect(pwdBtn.getAttribute("aria-pressed")).toBe("true");
    expect(pwdBtn.getAttribute("aria-label")).toBe("パスワードを非表示");
  });

  it("クリックでトグル", () => {
    // Arrange
    const { pwdBtn, pwdText, icon } = renderPwdBtn({ hidden: true });

    // Act
    initPwdClick();
    pwdBtn.click();

    // Assert
    // dataset
    expect(pwdBtn.dataset.inited).toBe("1");
    expect(pwdBtn.dataset.hidden).toBe("false");

    // DOM type
    expect(pwdText.type).toBe("text");

    // アイコン
    expect(icon.dataset.icon).toBe("visibility_off");

    // A11y属性
    expect(pwdBtn.getAttribute("aria-controls")).toBe("password");
    expect(pwdBtn.getAttribute("aria-pressed")).toBe("true");
    expect(pwdBtn.getAttribute("aria-label")).toBe("パスワードを非表示");
  });

  it("クリック2回で元に戻る", () => {
    // Arrange
    const { pwdBtn, pwdText, icon } = renderPwdBtn({ hidden: true });

    // Act
    initPwdClick();
    pwdBtn.click();
    pwdBtn.click();

    // Assert
    // dataset
    expect(pwdBtn.dataset.inited).toBe("1");
    expect(pwdBtn.dataset.hidden).toBe("true");

    // DOM type
    expect(pwdText.type).toBe("password");

    // アイコン
    expect(icon.dataset.icon).toBe("visibility");

    // A11y属性
    expect(pwdBtn.getAttribute("aria-controls")).toBe("password");
    expect(pwdBtn.getAttribute("aria-pressed")).toBe("false");
    expect(pwdBtn.getAttribute("aria-label")).toBe("パスワードを表示");
  });

  it("再初期化しても多重バインドされない", () => {
    // Arrange
    const { pwdBtn, pwdText, icon } = renderPwdBtn({ hidden: true });

    // Act
    initPwdClick();
    initPwdClick();
    pwdBtn.click();

    // Assert
    // dataset
    expect(pwdBtn.dataset.inited).toBe("1");
    expect(pwdBtn.dataset.hidden).toBe("false");

    // DOM type
    expect(pwdText.type).toBe("text");

    // アイコン
    expect(icon.dataset.icon).toBe("visibility_off");

    // A11y属性
    expect(pwdBtn.getAttribute("aria-controls")).toBe("password");
    expect(pwdBtn.getAttribute("aria-pressed")).toBe("true");
    expect(pwdBtn.getAttribute("aria-label")).toBe("パスワードを非表示");
  });
});
