import { form, email, password } from "/js/variables.js";
import {
  setError,
  setSuccess,
  validateEmail,
  changeInputBackgroundVisual,
} from "/js/functions.js";

let emailValid = false;
let passwordValid = false;

const displaySubmitError = () => {
  if (!emailValid) {
    setError("display-email", "Invalid Email");
    changeInputBackgroundVisual(email, emailValid);
  }

  if (!passwordValid) {
    setError("display-password", "Invalid Password");
    changeInputBackgroundVisual(password, passwordValid);
  }
};

email.addEventListener("input", () => {
  const value = email.value;

  if (value === "") {
    setError("display-email", "Email is required");
    emailValid = false;
    changeInputBackgroundVisual(email, emailValid);
  } else if (!validateEmail(value)) {
    setError("display-email", "Invalid Email");
    emailValid = false;
    changeInputBackgroundVisual(email, emailValid);
  } else {
    setSuccess("display-email");
    emailValid = true;
    changeInputBackgroundVisual(email, emailValid);
  }
});

password.addEventListener("input", () => {
  const value = password.value;

  if (value === "") {
    setError("display-password", "Password is required");
    passwordValid = false;
    changeInputBackgroundVisual(password, passwordValid);
  } else {
    setSuccess("display-password");
    passwordValid = true;
    changeInputBackgroundVisual(password, passwordValid);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userData = JSON.parse(localStorage.getItem(`user-${email.value}`));

  if (emailValid && passwordValid) {
    if (userData === null) {
      setError("display-signin", "Invalid account");
    } else {
      if (
        email.value === userData.email &&
        password.value === userData.password
      ) {
        setSuccess("display-signin");
        alert("Log In Successful");
        window.location.href = "/homepage/index.html";
      } else {
        setError("display-signin", "Incorrect email / password");
      }
    }
  } else {
    displaySubmitError();
  }
});
