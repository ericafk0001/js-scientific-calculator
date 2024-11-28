document.addEventListener("DOMContentLoaded", function () {
  let previousResult = 0;
  const display = document.getElementById("calc-display");
  const btns = document.getElementsByClassName("btn");
  const btnradio1 = document.getElementById("btnradio1");
  const btnradio2 = document.getElementById("btnradio2");
  const scientificFunctions = document.querySelector(".scientific-functions");

  scientificFunctions.style.position = "absolute";
  scientificFunctions.style.top = "-9999px";

  btnradio1.addEventListener("change", () => {
    if (btnradio1.checked) {
      scientificFunctions.style.position = "absolute";
      scientificFunctions.style.top = "-9999px";
    }
  });

  btnradio2.addEventListener("change", () => {
    if (btnradio2.checked) {
      scientificFunctions.style.position = "relative";
      scientificFunctions.style.top = "0";
    }
  });

  let currentValue = "";

  function factorial(n) {
    if (n < 0) return NaN; // Factorial is undefined for negative numbers
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  function solve() {
    try {
      let sanitized = currentValue
        .replace(/\u00D7/g, "*") // × (multiplication) → *
        .replace(/\u00F7/g, "/") // ÷ (division) → /
        .replace(/%/g, "*0.01") // % (percentage) → *0.01
        .replace(/\u03C0/g, "Math.PI") // π (pi) → Math.PI
        .replace(/sin/g, "Math.sin") // sin (sine) → Math.sin
        .replace(/cos/g, "Math.cos") // cos (cosine) → Math.cos
        .replace(/tan/g, "Math.tan") // tan (tangent) → Math.tan
        .replace(/log/g, "Math.log10") // log (logarithm base 10) → Math.log10
        .replace(/ln/g, "Math.log") // ln (natural log) → Math.log
        .replace(/\u221A/g, "Math.sqrt") // √ (square root) → Math.sqrt
        .replace(/e/g, "Math.E"); // e (Euler's number) → Math.E

      // handle factorial
      if (sanitized.includes("!")) {
        sanitized = sanitized.replace(/(\d+)!/g, (_, n) =>
          factorial(parseInt(n))
        );
      }

      // handle exponent
      sanitized = sanitized.replace(/\^/g, "**");

      console.log("Sanitized input:", sanitized);

      // Evaluate the sanitized expression
      const result = new Function(`return ${sanitized}`)();
      currentValue = result.toString();

      const prevResultDisplay = document.getElementById("prev-result");
      prevResultDisplay.textContent = `${previousResult}`;
      display.value = currentValue;
      previousResult = result;
    } catch (error) {
      currentValue = "Error";
      display.value = currentValue;
      console.error("Invalid Expression", error);
    }
  }

  // Event listener for each button
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i];
    btn.addEventListener("click", function () {
      const value = btn.innerText;

      try {
        if (value === "AC") {
          currentValue = "";
          display.value = currentValue;
          const prevResultDisplay = document.getElementById("prev-result");
          prevResultDisplay.textContent = "0";
          previousResult = 0; // Reset previous result
        } else if (value === "=") {
          solve();
        } else if (["sin", "cos", "tan", "log", "ln"].includes(value)) {
          // Check if there's a number in the display
          const numberInDisplay = currentValue.trim();
          if (numberInDisplay) {
            // Remove the previous value and insert the function with that number inside parentheses
            currentValue = `${value}(${numberInDisplay})`;
          } else {
            // Add an opening parenthesis for the function
            currentValue += value + "(";
          }
          display.value = currentValue;
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

  const htmlElement = document.documentElement;
  const switchElement = document.getElementById("darkModeSwitch");
  const currentTheme = localStorage.getItem("bsTheme") || "light";
  htmlElement.setAttribute("data-bs-theme", currentTheme);
  switchElement.checked = currentTheme === "dark";

  switchElement.addEventListener("change", function () {
    if (this.checked) {
      htmlElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("bsTheme", "dark");
    } else {
      htmlElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("bsTheme", "light");
    }
  });
});
