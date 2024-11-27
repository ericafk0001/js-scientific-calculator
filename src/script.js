document.addEventListener("DOMContentLoaded", function () {
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
        .replace(/ln/g, "Math.log") // ln (natural logarithm) → Math.log
        .replace(/log/g, "Math.log10") // log (logarithm base 10) → Math.log10
        .replace(/\u221A/g, "Math.sqrt") // √ (square root) → Math.sqrt
        .replace(/e/g, "Math.E") // e (Euler's number) → Math.E
        .replace(/10\^/g, "Math.pow(10,"); // For 10^x

      // handle factorial
      if (sanitized.includes("!")) {
        sanitized = sanitized.replace(/(\d+)!/g, (_, n) =>
          factorial(parseInt(n))
        );
      }

      // exponent
      const parsed = sanitized.replace(/\^/g, "**");

      //eval
      const result = new Function(`return ${parsed}`)();
      currentValue = result.toString();
      display.value = currentValue;
    } catch (error) {
      currentValue = "Error";
      display.value = currentValue;
      console.error("Invalid Expression", error);
    }
  }

  // event listener foreach button
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
        } else if (
          ["sin", "cos", "tan", "log", "ln", "√", "e", "π"].includes(value)
        ) {
          // is there an existing num?
          const numberInDisplay = currentValue.trim();
          if (numberInDisplay) {
            // remove previous value insert the function with that number inside the parentheses
            currentValue = `${value}(${numberInDisplay})`;
          } else {
            // else just add one bracket
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
});
