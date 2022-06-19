const form = document.forms["form"]; // attribute - name = form
const submitBtn = form.elements["button"];

const inputArr = Array.from(form);
const validFormArr = [];

inputArr.forEach((elem) => {
  if (elem.hasAttribute("data-reg")) {
    elem.setAttribute("is-valid", "0");
    validFormArr.push(elem);
  }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck);

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(elem) {
  const inputValue = elem.value;
  const inputReg = elem.getAttribute("data-reg");
  const reg = new RegExp(inputReg);

  if (reg.test(inputValue)) {
    elem.style.border = "2px solid rgb(0, 196, 0)";
    elem.setAttribute("is-valid", "1");
  } else {
    elem.style.border = "2px solid rgb(255, 0, 0)";
    elem.setAttribute("is-valid", "0");
  }
}

function formCheck(e) {
  e.preventDefault();
  const isAllValid = [];
  validFormArr.forEach((elem) => {
    isAllValid.push(elem.getAttribute("is-valid"));
  });
  const isValid = isAllValid.reduce((acc, current) => {
    return acc && current;
  });
  if (!Boolean(Number(isValid))) {
    alert("Заповніть поля правильно!");
    return;
  }
  formSubmit();
}

async function formSubmit() {
  const data = serializeForm(form);
  const response = await sendData(data);
  if (response.ok) {
    let result = await response.json();
    alert(result.message);
    formReset();
  } else {
    alert("Код помилки: " + response.status);
  }
}

function serializeForm(formNode) {
  return new FormData(form);
}

async function sendData(data) {
  return await fetch("mail.php", {
    method: "POST",
    body: data,
  });
}

function formReset() {
  form.reset();
  validFormArr.forEach((elem) => {
    elem.setAttribute("is-valid", 0);
    elem.style.border = "none";
  });
}
