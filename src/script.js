document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("calc-display");
  const btns = document.getElementsByClassName("btn");

  let currentValue = "";

  function solve() {
    const convert = currentValue
      .replace("×", "*")
      .replace("÷", "/")
      .replace("%", "*0.01");
    const result = eval(convert);
    currentValue = result.toString();
    display.value = currentValue;
  }

  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener("click", function () {
      const value = btn.innerText;

      if (value == "AC") {
        currentValue = "";
        display.value = currentValue;
      } else if (value == "=") {
        solve();
      } else {
        currentValue += value;
        display.value = currentValue;
      }
    });
  }
});
