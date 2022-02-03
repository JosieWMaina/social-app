const signUpBtn = document.getElementById("signup-btn");
const firstNameInp = document.getElementById("first-name-inp");
const lastNameInp = document.getElementById("last-name-inp");
const emailInp = document.getElementById("email-inp");
const passwordInp = document.getElementById("password-inp");
const confirmPasswordInp = document.getElementById("confirm-password-inp");

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
      localStorage.setItem("current-user", JSON.stringify(user));
      let myHref = window.location.href.split("/signup.html");
      window.location.href = `${myHref[0]}/login.html`;
    } else {
      console.log("Passwords not matched!");
    }
  } else {
    console.log("Fields are required!");
  }
};

signUpBtn.addEventListener("click", signup);
