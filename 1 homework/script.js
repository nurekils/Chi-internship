const calcData = {
  num1: "",
  num2: "",
  op: "",
};

const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const opEl = document.getElementById("op");
const calcBtn = document.getElementById("calcBtn");
const keysEl = document.getElementById("keys");

let activeInput = num1El;

num1El.addEventListener("blur", () => {
  calcData.num1 = num1El.value.trim();
});

num2El.addEventListener("blur", () => {
  calcData.num2 = num2El.value.trim();
});

opEl.addEventListener("blur", () => {
  calcData.op = opEl.value.trim();
});

[num1El, num2El, opEl].forEach((el) => {
  el.addEventListener("focus", () => {
    activeInput = el;
  });
});

opEl.addEventListener("input", () => {
  const v = opEl.value.trim();
  if (v === "") return;

  const last = v[v.length - 1];
  if (!["+", "-", "*", "/"].includes(last)) {
    opEl.value = "";
    return;
  }
  opEl.value = last; 
});

calcBtn.addEventListener("click", () => {

  const aRaw = num1El.value.trim();
  const bRaw = num2El.value.trim();
  const opRaw = opEl.value.trim();

  calcData.num1 = aRaw;
  calcData.num2 = bRaw;
  calcData.op = opRaw;

  if (aRaw === "") {
    alert("Введіть перше число (Число 1).");
    return;
  }
  if (bRaw === "") {
    alert("Введіть друге число (Число 2).");
    return;
  }
  if (opRaw === "") {
    alert("Введіть операцію (+, -, *, /).");
    return;
  }

  const a = Number(aRaw.replace(",", "."));
  const b = Number(bRaw.replace(",", "."));

  if (Number.isNaN(a) || Number.isNaN(b)) {
    alert("Перевірте, що обидва значення — це числа.");
    return;
  }

  if (!["+", "-", "*", "/"].includes(opRaw)) {
    alert("Операція має бути тільки: +, -, *, /");
    return;
  }

  if (opRaw === "/" && b === 0) {
    alert("Ділення на нуль неможливе.");
    return;
  }

  let result;
  switch (opRaw) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
  }

  alert(`Результат: ${a} ${opRaw} ${b} = ${result}`);
});


keysEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const kind = btn.dataset.kind;
  const value = btn.dataset.value;

  if (kind === "clear") {
    num1El.value = "";
    num2El.value = "";
    opEl.value = "";

    calcData.num1 = "";
    calcData.num2 = "";
    calcData.op = "";

    num1El.focus();
    return;
  }

  if (activeInput === opEl) {
    if (kind === "op") {
      opEl.value = value;
    }
    return;
  }

  if (kind === "digit") {
    activeInput.value += value;
    return;
  }

  if (kind === "dot") {
    const v = activeInput.value;
    if (!v.includes(".")) {
      activeInput.value += ".";
    }
    return;
  }

  if (kind === "op") {
    opEl.value = value;
    opEl.focus();
  }
});
