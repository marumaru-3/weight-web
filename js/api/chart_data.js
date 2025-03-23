fetch(getUrl("/api/chart_data.php"), {
  method: "GET",
})
  // .then((response) => response.text())
  // .then((text) => console.log(JSON.parse(text)));
  .then((response) => response.json())
  .then((data) => {
    const formMessage = document.querySelector(".form-message");

    if (data.success) {
      window.location.href = getUrl("/home");
    } else {
      formMessage.classList.add("error");
      formMessage.innerHTML = `ログインに失敗しました。<br>${data.errorMessage}`;
      formMessage.style.display = "block";
    }
  })
  .catch((error) => console.log("エラー：", error));
