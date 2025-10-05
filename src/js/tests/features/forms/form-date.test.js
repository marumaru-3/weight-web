import { describe, it, expect, beforeEach } from "vitest";

import { initUserDateForm } from "../../../features/forms/form-date";

// 共通ヘルパ
// rAF 1フレーム待つ（init 内の requestAnimationFrame(update) を消化）
const waitForRaf = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

// セレクト要素の更新
const selectAndWait = async (el, value) => {
  el.value = String(value);
  el.dispatchEvent(new Event("change"));
  await waitForRaf();
};

describe("form-date.js", () => {
  let yearSelect;
  let monthSelect;
  let daySelect;

  beforeEach(() => {
    document.body.innerHTML = `
      <select name="birth-year"
        id="birth-year"
        class="label-input"
        required>
        <option value
          disabled
          selected></option>
      </select>
      <select name="birth-month"
        id="birth-month"
        class="label-input"
        required>
          <option value
            disabled
            selected></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
      </select>
      <select name="birth-day"
        id="birth-day"
        class="label-input"
        required>
        <option value
          disabled
          selected></option>
      </select>
    `;
    yearSelect = document.getElementById("birth-year");
    monthSelect = document.getElementById("birth-month");
    daySelect = document.getElementById("birth-day");
  });

  describe("initUserDateForm", () => {
    it("初期化時：年の選択肢（現在の年から100年前まで）追加", async () => {
      // Act
      initUserDateForm();

      await waitForRaf();

      // Assert
      const currentYear = new Date().getFullYear();
      // 例：空のプレースホルダ + 2025年～1925年
      const expected = 1 + (currentYear - (currentYear - 100) + 1);
      expect(yearSelect.options.length).toBe(expected);
    });

    it("初期化時：月と日のセレクトの disabled が true のまま", async () => {
      // Act
      initUserDateForm();
      await waitForRaf();

      // Assert
      expect(monthSelect.disabled).toBe(true);
      expect(daySelect.disabled).toBe(true);
    });

    it("年を選択したとき、月の disabled が false になる", async () => {
      // Act
      initUserDateForm();

      const currentYear = new Date().getFullYear();
      await selectAndWait(yearSelect, currentYear);

      // Assert
      expect(monthSelect.disabled).toBe(false);
    });

    it("年と月を選択したとき、日の disabled が false になる", async () => {
      // Act
      initUserDateForm();

      const currentYear = new Date().getFullYear();
      await selectAndWait(yearSelect, currentYear);

      const currentMonth = new Date().getMonth() + 1;
      await selectAndWait(monthSelect, currentMonth);

      // Assert
      expect(daySelect.disabled).toBe(false);
    });

    it("3/31 を選択中に 4月へ変更すると30日にクランプ", async () => {
      // Act
      initUserDateForm();

      const currentYear = new Date().getFullYear();
      await selectAndWait(yearSelect, currentYear);
      await selectAndWait(monthSelect, 3);
      await selectAndWait(daySelect, 31);

      // Assert
      expect(daySelect.value).toBe("31");

      await selectAndWait(monthSelect, String(4));

      expect(daySelect.value).toBe("30");
    });

    it("2024/2/29 を選択中に 年を2025へ変更すると28日にクランプ", async () => {
      // Act
      initUserDateForm();

      await selectAndWait(yearSelect, 2024);
      await selectAndWait(monthSelect, 2);
      await selectAndWait(daySelect, 29);

      // Assert
      expect(daySelect.value).toBe("29");

      await selectAndWait(yearSelect, 2025);

      expect(daySelect.value).toBe("28");
    });
  });
});
