const init = () => {
  const input = document.querySelector(".validate-target");
  input.addEventListener("input", (e) => {
    const target = e.currentTarget;
    if (target.validity.valueMissing) {
      console.log("名前を入力してください。");
    }
  });
};
