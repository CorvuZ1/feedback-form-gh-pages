const form = document.querySelector("form");
const submitBtn = document.querySelector(".form__submit");

const inputData = {
  formName: {
    errors: [],
    DOM: document.getElementById("form-name")
  },
  
  formPhone: {
    errors: [],
    DOM: document.getElementById("form-phone")
  },

  formEmail: {
    errors: [],
    DOM: document.getElementById("form-email")
  }
};

submitBtn.addEventListener("click", formValidate);

function formValidate(event) {
  event.preventDefault();
  reset();

  let valid = true;

    if (inputData.formPhone.DOM.value.trim() === "") {
        inputData.formPhone.errors.push("Обязательно для заполнения");
        valid = false;
    } else if (!phoneRegexp(inputData.formPhone.DOM.value)) {
        inputData.formPhone.errors.push("Проверьте введённый телефон");
        valid = false;
    }

    if (!emailRegexp(inputData.formEmail.DOM.value) && inputData.formEmail.DOM.value.trim() !== "") {
      inputData.formEmail.errors.push("Проверьте введённый email");
      valid = false;
    }

    if (inputData.formName.DOM.value.trim() === "" ) {
      inputData.formName.errors.push("Обязательно для заполнения");
      valid = false;
    }
  
  errorStyles();
  errorRender();
  sendForm(valid);
}

function reset() {
  for (const item in inputData) {
    inputData[item].errors = [];
  }
}

function errorRender() {
  const errorText = document.querySelectorAll(".form__error");
  errorText[0].textContent = inputData.formName.errors;
  errorText[1].textContent = inputData.formPhone.errors;
  errorText[2].textContent = inputData.formEmail.errors;
}

function phoneRegexp(value) {
  return /[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}/.test(value);
}

function emailRegexp(value) {
  return /[а-яА-Яa-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z]+\.[a-zA-Z]\w{2,3}/.test(value);
}

function errorStyles() {
  for (const item in inputData) {
    if (inputData[item].errors.length != 0) {
      inputData[item].DOM.classList.add("form__input--invalid");
      inputData[item].DOM.nextSibling.nextSibling.classList.add("form__label--error");
    } else {
      inputData[item].DOM.classList.remove("form__input--invalid");
      inputData[item].DOM.nextSibling.nextSibling.classList.remove("form__label--error");
    }
  }
}


function sendForm(valid) {
  if (valid) {
    fetch("sendForm.php", { 
      method: "POST",
      body: new FormData(form)
    })
    .then(response => {
      form.reset();
      if (response.ok) {
        alert("Сообщение успешно отправлено.");
        form.classList.add("form--valid");
      } else {
        alert("Сообщение не отправлено. Попробуйте перезагрузить страницу.");
        form.classList.add("form--invalid");
      }
    })
    .catch(e => console.log(e))
  }
}