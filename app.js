import { form, email, password } from "/js/variables.js";
import { setError, setSuccess, validateEmail } from "/js/functions.js";

let emailValid = false;
let passwordValid = false;

const displayInputError = () => {
  if (!emailValid) {
    setError("display-email", "Invalid Email");
  }

  if (!passwordValid) {
    setError("display-password", "Invalid Password");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emailValid && passwordValid) {
    alert("Form Filled Successfully");
  } else {
    displayInputError();
    alert("Form Not Valid");
  }
});
