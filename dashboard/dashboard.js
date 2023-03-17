import { form, username, email, headerWelcome } from "/js/variables.js";
import {
  setError,
  setSuccess,
  validateEmail,
  changeInputBackgroundVisual,
} from "/js/functions.js";

let usernameValid = false;
let emailValid = false;

const userLogOut = document.getElementById("user-logout");

// Stores data from local storage
const userList = [];

// get currently logged in user from local storage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
};

const setRegisterSuccess = (elementId, message) => {
  const selectedElement = document.getElementById(elementId);

  selectedElement.innerText = message;

  selectedElement.classList.add("success");
  selectedElement.classList.remove("error");
};

// Display each data by adding HTML as table row
const displayData = (data) => {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = `
    <tr>
      <td>${data[i].username}</td>
      <td>${data[i].email}</td>
      <td>
        <button id="edit-${data[i].username}" class="edit" type="button">Edit</button>
        <button id="delete-${data[i].username}" class="delete" type="button">Delete</button>
      </td>
    </tr>
    `;
    tableBody.innerHTML += row;
  }

  // Add event listeners to each edit & delete buttons
  for (let i = 0; i < data.length; i++) {
    const editData = document.getElementById(`edit-${data[i].username}`);
    const deleteData = document.getElementById(`delete-${data[i].username}`);

    editData.addEventListener("click", editUser(i));
    deleteData.addEventListener("click", deleteUser(i));
  }
};

const editUser = (index) => {
  return () => {
    const editName = prompt("Username:", userList[index].username);
    const editEmail = prompt("Email:", userList[index].email);
    userList[index] = { username: editName, email: editEmail };
    localStorage.setItem(
      `dataList-${currentUser.email}`,
      JSON.stringify(userList)
    );
    displayData(userList);
  };
};

const deleteUser = (index) => {
  return () => {
    userList.splice(index, 1);
    localStorage.setItem(
      `dataList-${currentUser.email}`,
      JSON.stringify(userList)
    );
    displayData(userList);
  };
};

/* 
  -----------------------------------------------------------------------------
    EVENT LISTENERS
  -----------------------------------------------------------------------------
*/

window.onload = () => {
  // Set welcome text with current username
  headerWelcome.innerHTML = `Welcome, ${currentUser.username}!`;

  // Get local storage data of currently logged in user
  const getUserList = JSON.parse(
    localStorage.getItem(`dataList-${currentUser.email}`)
  );

  // Use current user as initial data if local storage doesn't exist
  if (getUserList === null) {
    userList.push(currentUser);
    localStorage.setItem(
      `dataList-${currentUser.email}`,
      JSON.stringify(userList[0])
    );
    displayData(userList);
  } else {
    // Checks if local storage data is an array or not
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
    setError("display-username", "Username is required");
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
    // Add inputed values into userList as object
    userList.push({
      username: username.value,
      email: email.value,
    });

    // Update local storage with current userList data
    localStorage.setItem(
      `dataList-${currentUser.email}`,
      JSON.stringify(userList)
    );
    displayData(userList);

    // Reset input values
    username.value = username.defaultValue;
    email.value = email.defaultValue;

    setRegisterSuccess("display-register", "Account added successfully");
    setTimeout(() => {
      setSuccess("display-register");
    }, 1800);
  } else {
    setError("display-register", "Invalid data");
    setTimeout(() => {
      setSuccess("display-register");
    }, 1000);
    displaySubmitError();
  }
});

// Removes data of current user when logged out
userLogOut.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
});
