import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { initRecordDateSelect } from "../../../features/records/record-date";

const text = (el) => el?.textContent;
const val = (el) => el?.value;
const click = (el) => el && el.click();

describe("record-date.js", () => {
  let dateContents;
  let datePrevBtn;
  let dateNextBtn;
  let inputRecordedAt;
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="modal-record__date">
        <button id="date-prev" class="date-prev">前へ</button>
        <p id="date-contents" class="date__contents"></p>
        <button id="date-next" class="date-next">次へ</button>
      </div>
      <input type="hidden" id="recorded_at" name="recorded_at" value="">
    `;
    dateContents = document.getElementById("date-contents");
    datePrevBtn = document.getElementById("date-prev");
    dateNextBtn = document.getElementById("date-next");
    inputRecordedAt = document.getElementById("recorded_at");

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-10-11T00:00:00+09:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("initRecordDateSelect", () => {
    it("初期化時：今日の日付がラベル/hiddenに反映されているか", () => {
      // Act
      initRecordDateSelect();

      // Assert
      expect(text(dateContents)).toBe("2025/10/11");
      expect(val(inputRecordedAt)).toBe("2025/10/11");
    });

    it("prevボタンクリック：前の日付になっているか", () => {
      // Act
      initRecordDateSelect();

      // Assert
      click(datePrevBtn);
      expect(dateNextBtn.disabled).toBe(false);
      expect(text(dateContents)).toBe("2025/10/10");
      expect(val(inputRecordedAt)).toBe("2025/10/10");
    });

    it("nextボタンクリック：次の日付になっているか", () => {
      // Act
      initRecordDateSelect();

      // Assert
      // 前日に戻す
      click(datePrevBtn);
      expect(text(dateContents)).toBe("2025/10/10");
      expect(val(inputRecordedAt)).toBe("2025/10/10");

      // Assert
      // 次の日にする
      click(dateNextBtn);
      expect(text(dateContents)).toBe("2025/10/11");
      expect(val(inputRecordedAt)).toBe("2025/10/11");
    });

    it("nextボタンクリック：今日の日付の時は disabled", () => {
      // Act
      initRecordDateSelect();

      // Assert
      click(dateNextBtn);
      expect(dateNextBtn.disabled).toBe(true);
      expect(text(dateContents)).toBe("2025/10/11");
      expect(val(inputRecordedAt)).toBe("2025/10/11");
    });

    it("必要な要素が無い場合は何もしない", () => {
      // Arrange
      document.body.innerHTML = ``;

      // Assert
      expect(() => initRecordDateSelect()).not.toThrow();
      expect(initRecordDateSelect()).toBeUndefined();
    });
  });
});
