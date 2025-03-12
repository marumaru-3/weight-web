userPopup();
function userPopup() {
  const headerInfo = document.getElementById("header__info");
  const headerProfile = document.getElementById("header__profile");
  const userPopup = document.getElementById("user-popup");

  if (!headerInfo) return;

  headerProfile.addEventListener("click", (e) => {
    if (headerInfo.classList.contains("click")) {
      headerInfo.classList.remove("click");
    } else {
      headerInfo.classList.add("click");
    }

    // 親要素へのイベント伝播を防ぐ
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!userPopup.contains(e.target) && e.target !== headerInfo) {
      headerInfo.classList.remove("click");
    }
  });
}
