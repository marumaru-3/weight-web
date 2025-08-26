import "@testing-library/jest-dom";

import { describe, it, expect, beforeEach, vi } from "vitest";

import { initUserPopup } from "../../components/user-popup";

describe("user-popup.js", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="header__info">
      <button id="header__profile">ボタン</button>
      <div id="user-popup">ポップアップ</div>
    </div>
    `;
    initUserPopup();
  });

  it("初期化時にA11y属性が正しく設定される", () => {
    // Arrange
    const btn = document.getElementById("header__profile");
    const panel = document.getElementById("user-popup");

    // Assert
    expect(btn.getAttribute("aria-controls")).toBe(panel.id);
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("ボタン1回クリックでポップアップ表示", () => {
    // Arrange
    const wrapper = document.getElementById("header__info");
    const btn = document.getElementById("header__profile");

    // Act
    btn.click();

    // Assert
    expect(wrapper).toHaveClass("click");
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("ボタン2回クリックでポップアップ非表示", () => {
    // Arrange
    const wrapper = document.getElementById("header__info");
    const btn = document.getElementById("header__profile");

    // Act
    btn.click();
    btn.click();

    // Assert
    expect(wrapper).not.toHaveClass("click");
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("ポップアップ表示時に外側をクリックすると非表示", () => {
    // Arrange
    const wrapper = document.getElementById("header__info");
    const btn = document.getElementById("header__profile");

    // Act
    btn.click();
    document.body.click();

    // Assert
    expect(wrapper).not.toHaveClass("click");
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("ボタンクリック時にイベントが伝播しない", () => {
    // Arrange
    const btn = document.getElementById("header__profile");
    const mockHandler = vi.fn();
    document.addEventListener("click", mockHandler);

    // Act
    btn.click();

    // Assert
    expect(mockHandler).not.toHaveBeenCalled();

    // Cleanup
    document.removeEventListener("click", mockHandler);
  });
});
