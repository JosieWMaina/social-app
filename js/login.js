const loginBtn = document.getElementById("login-btn");
const emailInp = document.getElementById("email-inp");
const passwordInp = document.getElementById("password-inp");
const currentUser = localStorage.getItem("current-user");
const errorWrapper = document.getElementById("error");
let error = {message: ''};


if (currentUser) {
  let myHref = window.location.href.split("/login.html");
  window.location.href = `${myHref[0]}/index.html`;
}

const checkUserInData = (currentUser) => {
  const filteredUser = data[0].users.filter(
    (user) =>
      user.email === currentUser.email && user.password === currentUser.password
  );
  if(filteredUser.length > 0) {
      return true
    } else {
      return false
  }
};

const login = () => {
  const getUser = localStorage.getItem("saved-user");
  const parsedUser = JSON.parse(getUser);
  const {email, password, firstName, userImage} = parsedUser || {};
  if (
    (email === emailInp.value && password === passwordInp.value) ||
    checkUserInData({ email: emailInp.value, password: passwordInp.value })
  ) {
    const filteredU = data[0].users.filter(
      (user) =>
        user.email === emailInp.value && user.password === passwordInp.value
    );
    console.log(filteredU)
    const loginUser = {
      email: emailInp.value,
      password: passwordInp.value,
      firstName: filteredU.length > 0 ? filteredU[0].firstName : firstName,
      posts: filteredU.length > 0 ? filteredU[0].posts : [],
      userImage: filteredU.length > 0 ? filteredU[0].userImage : userImage
    };
    localStorage.setItem("current-user", JSON.stringify(loginUser));
    let myHref = window.location.href.split("/login.html");
    window.location.href = `${myHref[0]}/index.html`;
  } else {
      error.message = "Email or password is invilid!"
      if(error.message) {
        errorWrapper.classList.toggle('d-none')
        errorWrapper.innerText = error.message
      }
  }
};

loginBtn.addEventListener("click", login);
