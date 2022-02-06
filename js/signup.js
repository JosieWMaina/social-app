const signUpBtn = document.getElementById("signup-btn");
const firstNameInp = document.getElementById("first-name-inp");
const lastNameInp = document.getElementById("last-name-inp");
const emailInp = document.getElementById("email-inp");
const passwordInp = document.getElementById("password-inp");
const confirmPasswordInp = document.getElementById("confirm-password-inp");
const currentUser = localStorage.getItem("current-user");
const errorWrapper = document.getElementById("error");
let error = { message: "" };

if (currentUser) {
  let myHref = window.location.href.split("/signup.html");
  window.location.href = `${myHref[0]}/index.html`;
}

const signup = () => {
  const user = {
    id: 11,
    firstName: firstNameInp.value,
    lastName: lastNameInp.value,
    email: emailInp.value,
    password: passwordInp.value,
    confirmPassword: confirmPasswordInp.value,
  };
  if (
    firstNameInp.value &&
    lastNameInp.value &&
    emailInp.value &&
    passwordInp.value &&
    confirmPasswordInp.value
  ) {
    if (passwordInp.value === confirmPasswordInp.value) {
      localStorage.setItem("saved-user", JSON.stringify(user));
      let myHref = window.location.href.split("/signup.html");
      window.location.href = `${myHref[0]}/login.html`;
    } else {
      error.message = "Passwords not matched!";
      if (error.message) {
        errorWrapper.classList.toggle("d-none");
        errorWrapper.innerText = error.message;
      }
    }
  } else {
    error.message = "Fields are required";
    if (error.message) {
      errorWrapper.classList.toggle("d-none");
      errorWrapper.innerText = error.message;
    }
  }
};

signUpBtn.addEventListener("click", signup);
