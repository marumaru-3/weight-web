import "@testing-library/jest-dom";

import { describe, it, expect, beforeEach } from "vitest";

import { initStepBtn } from "../../../features/forms/form-step";

const expectVisible = (el) => {
  expect(el).toHaveClass("visible");
  expect(el).not.toHaveClass("hidden");
};
const expectHidden = (el) => {
  expect(el).not.toHaveClass("visible");
  expect(el).toHaveClass("hidden");
};

describe("form-step.js", () => {
  let step1;
  let step2;
  let nextBtn;
  let prevBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="step1" class="step visible">
        <button type="button" id="btn--go-to-step2">次へ</button>
      </div>
      <div id="step2" class="step hidden">
        <button type="button" id="btn--back-to-step1">戻る</button>
      </div>
    `;

    step1 = document.getElementById("step1");
    step2 = document.getElementById("step2");
    nextBtn = document.getElementById("btn--go-to-step2");
    prevBtn = document.getElementById("btn--back-to-step1");
  });

  describe("initStepBtn", () => {
    it("初期化しても状態は変わらない", () => {
      // Act
      initStepBtn();

      // Assert
      expectVisible(step1);
      expectHidden(step2);
    });

    it("次へ（単一ボタン）：step1→step2 に切り替わる", () => {
      // Act
      initStepBtn();
      nextBtn.click();

      // Assert
      expectVisible(step2);
      expectHidden(step1);
    });

    it("次へ（複数ボタン）：どの次へでも step1→step2 に切り替わる", () => {
      // Arrange
      step1.innerHTML = `
        <div class="btn--go-to-step2"></div>
        <div class="btn--go-to-step2"></div>
        <div class="btn--go-to-step2"></div>
      `;
      let nextButtons = document.querySelectorAll(".btn--go-to-step2");

      // Act
      initStepBtn();

      // Assert
      // 1つ目の次へボタンクリック
      nextButtons[0].click();
      expectVisible(step2);
      expectHidden(step1);

      // 戻るボタンクリック
      prevBtn.click();
      expectVisible(step1);
      expectHidden(step2);

      // 2つ目の次へボタンクリック
      nextButtons[1].click();
      expectVisible(step2);
      expectHidden(step1);

      // 戻るボタンクリック
      prevBtn.click();
      expectVisible(step1);
      expectHidden(step2);

      // 3つ目の次へボタンクリック
      nextButtons[2].click();
      expectVisible(step2);
      expectHidden(step1);
    });

    it("戻る：step2→step1 に切り替わる", () => {
      // Act
      initStepBtn();

      // Assert
      // 1つ目の次へボタンクリック
      nextBtn.click();
      expectVisible(step2);
      expectHidden(step1);

      // 戻るボタンクリック
      prevBtn.click();
      expectVisible(step1);
      expectHidden(step2);
    });

    it("step1/step2 が無い場合は何もしない（return）", () => {
      // Arrange
      document.body.innerHTML = ``;

      // Act Assert
      expect(() => initStepBtn()).not.toThrow();
    });
  });
});
