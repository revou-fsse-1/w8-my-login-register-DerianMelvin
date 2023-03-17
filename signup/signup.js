import {
  form,
  username,
  email,
  password,
  confirmPassword,
} from "/js/variables.js";
import {
  setError,
  setSuccess,
  validateEmail,
  changeInputBackgroundVisual,
} from "/js/functions.js";

let usernameValid = false;
let emailValid = false;
let passwordValid = false;
let confirmPasswordValid = false;

/* 
  -----------------------------------------------------------------------------
    FUNCTIONS
  -----------------------------------------------------------------------------
*/

const displaySubmitError = () => {
  if (!usernameValid) {
    setError("display-username", "Invalid Username");
    changeInputBackgroundVisual(username, usernameValid);
  }

  if (!emailValid) {
    setError("display-email", "Invalid Email");
    changeInputBackgroundVisual(email, emailValid);
  }

  if (!passwordValid) {
    setError("display-password", "Please confirm your password");
    changeInputBackgroundVisual(password, passwordValid);
  }

  if (!confirmPasswordValid) {
    setError("display-confirmPassword", "Password doesn't match");
    changeInputBackgroundVisual(confirmPassword, confirmPasswordValid);
  }
};

/* 
  -----------------------------------------------------------------------------
    EVENT LISTENERS
  -----------------------------------------------------------------------------
*/

username.addEventListener("input", () => {
  const value = username.value;

  if (value === "") {
    setError("display-username", "username is required");
    usernameValid = false;
    changeInputBackgroundVisual(username, usernameValid);
  } else if (value.length < 3) {
    setError("display-username", "Username too short");
    usernameValid = false;
    changeInputBackgroundVisual(username, usernameValid);
  } else {
    setSuccess("display-username");
    usernameValid = true;
    changeInputBackgroundVisual(username, usernameValid);
  }
});

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
  } else if (value !== confirmPassword.value) {
    setError("display-password", "Please confirm your password");
    setError("display-confirmPassword", "Password doesn't match");
    passwordValid = false;
    confirmPasswordValid = false;
    changeInputBackgroundVisual(password, passwordValid);
    changeInputBackgroundVisual(confirmPassword, confirmPasswordValid);
  } else {
    setSuccess("display-password");
    setSuccess("display-confirmPassword");
    passwordValid = true;
    confirmPasswordValid = true;
    changeInputBackgroundVisual(password, passwordValid);
    changeInputBackgroundVisual(confirmPassword, confirmPasswordValid);
  }
});

confirmPassword.addEventListener("input", () => {
  const value = confirmPassword.value;

  if (value === "") {
    setError("display-confirmPassword", "Password is required");
    confirmPasswordValid = false;
    changeInputBackgroundVisual(confirmPassword, confirmPasswordValid);
  } else if (value !== password.value) {
    setError("display-confirmPassword", "Password doesn't match");
    passwordValid = false;
    confirmPasswordValid = false;
    changeInputBackgroundVisual(password, passwordValid);
    changeInputBackgroundVisual(confirmPassword, confirmPasswordValid);
  } else {
    setSuccess("display-password");
    setSuccess("display-confirmPassword");
    passwordValid = true;
    confirmPasswordValid = true;
    changeInputBackgroundVisual(password, passwordValid);
    changeInputBackgroundVisual(confirmPassword, confirmPasswordValid);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (usernameValid && emailValid && passwordValid && confirmPasswordValid) {
    localStorage.setItem(
      `user-${email.value}`,
      JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      })
    );
    alert("Account successfully created");
    window.location.href = "/index.html";
  } else {
    displaySubmitError();
  }
});
