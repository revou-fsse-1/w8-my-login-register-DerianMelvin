import { form, email, password, confirmPassword } from "/js/variables.js";
import { setError, setSuccess, validateEmail } from "/js/functions.js";

let emailValid = false;
let passwordValid = false;
let confirmPasswordValid = false;

const displayInputError = () => {
  if (!emailValid) {
    setError("display-email", "Invalid Email");
  }

  if (!passwordValid) {
    setError("display-password", "Invalid Password");
  }

  if (!confirmPasswordValid) {
    setError("display-confirmPassword", "Password doesn't match");
  }
};

email.addEventListener("input", () => {
  const value = email.value;

  if (value === "") {
    setError("display-email", "Email is required");
    emailValid = false;
  } else if (!validateEmail(value)) {
    setError("display-email", "Invalid Email");
    emailValid = false;
  } else {
    setSuccess("display-email");
    emailValid = true;
  }
});

password.addEventListener("input", () => {
  const value = password.value;

  if (value === "") {
    setError("display-password", "Password is required");
    passwordValid = false;
  } else {
    setSuccess("display-password");
    passwordValid = true;
  }
});

confirmPassword.addEventListener("input", () => {
  const value = confirmPassword.value;

  if (value === "") {
    setError("display-confirmPassword", "Password is required");
    confirmPasswordValid = false;
  } else if (value !== password.value) {
    setError("display-confirmPassword", "Password doesn't match");
    confirmPasswordValid = false;
  } else {
    setSuccess("display-confirmPassword");
    confirmPasswordValid = true;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emailValid && passwordValid && confirmPasswordValid) {
    alert("Form Filled Successfully");
  } else {
    displayInputError();
    alert("Form Not Valid");
  }
});
