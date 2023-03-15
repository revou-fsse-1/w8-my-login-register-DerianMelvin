const setError = (elementId, errorMsg) => {
  const selectedElement = document.getElementById(elementId);

  selectedElement.innerText = errorMsg;

  selectedElement.classList.add("error");
  selectedElement.classList.remove("success");
};

const setSuccess = (elementId) => {
  const selectedElement = document.getElementById(elementId);

  selectedElement.innerText = "";

  selectedElement.classList.add("success");
  selectedElement.classList.remove("error");
};

const validateEmail = (email) => {
  const emailValue = email.trim();
  const reg = /[\w\d]+@[\w\d]{2,}[.][\w\d]{1,}[.]?[\w]{2,}/g;

  return reg.test(emailValue);
};

export { setError, setSuccess, validateEmail };
