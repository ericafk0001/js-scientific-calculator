document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("calc-display");
  const btns = document.getElementsByClassName("btn");

  let currentValue = "";

  function solve() {
    try {
      // standard js syntax
      const sanitized = currentValue
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "*0.01")
        .replace(/π/g, "Math.PI")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/ln/g, "Math.log")
        .replace(/log/g, "Math.log10")
        .replace(/√/g, "Math.sqrt")
        .replace(/e/g, "Math.E")
        .replace(/tan/g, "Math.tan");

      // function constructor to evaluate the sanitized input safely
      const result = new Function(`return ${sanitized}`)();
      currentValue = result.toString();
      display.value = currentValue;
    } catch (error) {
      currentValue = "Error";
      display.value = currentValue;
      console.error("Invalid Expression", error);
    }
  }

  // attach event listeners
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener("click", function () {
      const value = btn.innerText;

      try {
        if (value === "AC") {
          currentValue = "";
          display.value = currentValue;
        } else if (value === "=") {
          solve();
        } else {
          currentValue += value;
          display.value = currentValue;
        }
      } catch (error) {
        currentValue = "Error";
        display.value = currentValue;
        console.error("Button click error", error);
      }
    });
  }
});
