export const fetchUserData = async () => {
  try {
    const response = await fetch(getUrl("/php/api/user_data.php"), {
      method: "GET",
    });

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

export const fetchUpdateUser = async (formData) => {
  try {
    const response = await fetch(getUrl("/index.php?modal=adminUser"), {
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

export const fetchUpdateAccount = async (formData) => {
  try {
    const response = await fetch(getUrl("/index.php?modal=adminAccount"), {
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

// export const fetchInsertUser = async (formData) => {
//   try {
//     const response = await fetch(getUrl("/index.php?modal=record"), {
//       method: "POST",
//       body: formData,
//     });

//     const contentType = response.headers.get("Content-Type");
//     if (contentType && contentType.includes("application/json")) {
//       return await response.json();
//     } else {
//       return await response.text();
//     }
//   } catch (error) {
//     return { success: false, message: "通信エラーが発生しました。" };
//   }
// };

// export const fetchDeleteUser = async (formData) => {
//   try {
//     const response = await fetch(getUrl("/index.php?modal=recordDelete"), {
//       method: "POST",
//       body: formData,
//     });

//     const contentType = response.headers.get("Content-Type");
//     if (contentType && contentType.includes("application/json")) {
//       return await response.json();
//     } else {
//       return await response.text();
//     }
//   } catch (error) {
//     return { success: false, message: "通信エラーが発生しました。" };
//   }
// };
