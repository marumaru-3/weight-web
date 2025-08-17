import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../api/fetch.js", () => ({
  fetchData: vi.fn(),
}));

vi.mock("../../helper.js", () => ({
  initGetUrl: (p) => p,
}));

describe("api.js", () => {
  let api;
  let fetchData;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    api = await import("../../api/api.js");
    fetchData = (await import("../../api/fetch.js")).fetchData;
  });

  describe("Modal html", () => {
    it("fetchModalHtml: modalTypeに応じたURLでfetchDataを呼ぶ", async () => {
      fetchData.mockResolvedValue("HTML");
      const res = await api.fetchModalHtml("login");
      expect(fetchData).toHaveBeenCalledWith("/index.php?modal=login");
      expect(res).toBe("HTML");
    });
  });

  describe("Login/Register", () => {
    it("fetchLogin: login用URLでPOSTを呼ぶ", async () => {
      const formData = {};
      await api.fetchLogin(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=login",
        "POST",
        formData
      );
    });

    it("fetchRegister: register用URLでPOSTを呼ぶ", async () => {
      const formData = {};
      await api.fetchRegister(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=register",
        "POST",
        formData
      );
    });
  });

  describe("Chart data", () => {
    it("fetchChartData: chart_data.phpを呼ぶ", async () => {
      await api.fetchChartData();
      expect(fetchData).toHaveBeenCalledWith("/api/chart_data.php");
    });
  });

  describe("Record data", () => {
    it("getDateFromClick: data-date属性を取得する", () => {
      const elem = {
        closest: () => ({ dataset: { date: "2025-01-01" } }),
      };
      expect(api.getDateFromClick(elem)).toBe("2025-01-01");
    });

    it("fetchRecordData: date無しならnull", async () => {
      const elem = {
        closest: () => null,
      };
      const res = await api.fetchRecordData(elem);
      expect(res).toBeNull();
    });

    it("fetchRecordData: 初回はfetchDataを呼び、2回目はキャッシュを返す", async () => {
      const elem = {
        closest: () => ({ dataset: { date: "2025-01-01" } }),
      };
      fetchData.mockResolvedValue({ date: "2025-01-01" });

      const res1 = await api.fetchRecordData(elem);
      const res2 = await api.fetchRecordData(elem);

      expect(fetchData).toHaveBeenCalledTimes(1);
      expect(res1).toEqual({ date: "2025-01-01" });
      expect(res2).toEqual(res1);
    });

    it("fetchUpdateRecord: recordAdminにPOSTする", async () => {
      const formData = {};
      await api.fetchUpdateRecord(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=recordAdmin",
        "POST",
        formData
      );
    });

    it("fetchInsertRecord: recordにPOSTする", async () => {
      const formData = {};
      await api.fetchInsertRecord(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=record",
        "POST",
        formData
      );
    });

    it("fetchDeleteRecord: recordDeleteにPOSTする", async () => {
      const formData = {};
      await api.fetchDeleteRecord(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=recordDelete",
        "POST",
        formData
      );
    });

    it("fetchResetRecord: recordResetにPOSTする", async () => {
      const formData = {};
      await api.fetchResetRecord(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=recordReset",
        "POST",
        formData
      );
    });
  });

  describe("User data", () => {
    it("fetchUserData: 初回はfetchDataを呼び、2回目はキャッシュを返す", async () => {
      fetchData.mockResolvedValue({ username: "testuser" });

      const res1 = await api.fetchUserData();
      const res2 = await api.fetchUserData();

      expect(fetchData).toHaveBeenCalledTimes(1);
      expect(res1).toEqual({ username: "testuser" });
      expect(res2).toEqual(res1);
    });

    it("fetchUpdateUser: adminUserにPOSTする", async () => {
      const formData = {};
      await api.fetchUpdateUser(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=adminUser",
        "POST",
        formData
      );
    });

    it("fetchUpdateAccount: adminAccountにPOSTする", async () => {
      const formData = {};
      await api.fetchUpdateAccount(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=adminAccount",
        "POST",
        formData
      );
    });

    it("fetchDeleteAccount: accountDeleteにPOSTする", async () => {
      const formData = {};
      await api.fetchDeleteAccount(formData);
      expect(fetchData).toHaveBeenCalledWith(
        "/index.php?modal=accountDelete",
        "POST",
        formData
      );
    });
  });
});
