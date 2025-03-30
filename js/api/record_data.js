export const fetchRecordData = async (clickElem) => {
  try {
    const date = clickElem.target.parentNode.dataset.date;

    const response = await fetch(
      getUrl(`/php/api/record_data.php?date=${date}`),
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        alert("ログインが必要です。");
        window.location.href = getUrl("/welcome");
      }
      throw new Error("APIエラー");
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.log("エラー：", await response.text());
    throw error;
  }
};

export const fetchUpdateRecord = async (formData) => {
  try {
    const response = await fetch(getUrl("/index.php?modal=recordAdmin"), {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("エラー", error);
    return { success: false, message: "通信エラーが発生しました。" };
  }
};

export const fetchInsertRecord = async (formData) => {
  try {
    const response = await fetch(getUrl("/index.php?modal=record"), {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    // const response = await fetch(getUrl("/index.php?modal=record"), {
    //   method: "POST",
    //   body: formData,
    //   credentials: "include",
    // });
    // console.error("エラー", await response.text());
    return { success: false, message: "通信エラーが発生しました。" };
  }
};

export const fetchDeleteRecord = async (formData) => {
  try {
    const response = await fetch(getUrl("/index.php?modal=recordDelete"), {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    // const response = await fetch(getUrl("/index.php?modal=record"), {
    //   method: "POST",
    //   body: formData,
    //   credentials: "include",
    // });
    // console.error("エラー", await response.text());
    return { success: false, message: "通信エラーが発生しました。" };
  }
};
