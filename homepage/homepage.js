import { form, username, email, headerWelcome } from "/js/variables.js";
import {
  setError,
  setSuccess,
  validateEmail,
  changeInputBackgroundVisual,
} from "/js/functions.js";

let usernameValid = false;
let emailValid = false;

const userList = [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const displaySubmitError = () => {
  if (!usernameValid) {
    setError("display-username", "Invalid Username");
    changeInputBackgroundVisual(username, usernameValid);
  }

  if (!emailValid) {
    setError("display-email", "Invalid Email");
    changeInputBackgroundVisual(email, emailValid);
  }
};

const setRegisterSuccess = (elementId, message) => {
  const selectedElement = document.getElementById(elementId);

  selectedElement.innerText = message;

  selectedElement.classList.add("success");
  selectedElement.classList.remove("error");
};

const displayData = (data) => {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = `
    <tr>
      <td>${data[i].username}</td>
      <td>${data[i].email}</td>
      <td>
        <button id="edit-${data[i].username}" class="edit" type='button' onclick="editUser(${i})">Edit</button>
        <button id="delete-${data[i].username}" class="delete" type='button' onclick="deleteUser(${i})">Delete</button>
      </td>
    </tr>
    `;
    tableBody.innerHTML += row;
  }
};

window.onload = () => {
  headerWelcome.innerHTML = `Welcome, ${currentUser.username}!`;

  const getUserList = JSON.parse(
    localStorage.getItem(`dataList-${currentUser.email}`)
  );

  if (getUserList === null) {
    userList.push(currentUser);
    localStorage.setItem(
      `dataList-${currentUser.email}`,
      JSON.stringify(userList[0])
    );
    displayData(userList);
  } else {
    if (!Array.isArray(getUserList)) {
      userList.push(getUserList);
      displayData(userList);
    } else {
      for (let i in getUserList) {
        userList.push(getUserList[i]);
      }
      displayData(userList);
    }
  }
};

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (usernameValid && emailValid) {
    userList.push({
      username: username.value,
      email: email.value,
    });

    localStorage.setItem(
      `dataList-${currentUser.email}`,
      JSON.stringify(userList)
    );
    displayData(userList);

    setRegisterSuccess("display-register", "Account registered successfully");
    setTimeout(() => {
      setSuccess("display-register");
    }, 1500);
  } else {
    setError("display-register", "Invalid input");

    setTimeout(() => {
      setSuccess("display-register");
    }, 1000);

    displaySubmitError();
  }
});
