const loginBtn = document.getElementById("login-btn");
const emailInp = document.getElementById("email-inp");
const passwordInp = document.getElementById("password-inp");

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
  const getUser = localStorage.getItem("current-user");
  const parsedUser = JSON.parse(getUser);
  const {email, password} = parsedUser || {};
  if (
    (email === emailInp.value && password === passwordInp.value) ||
    checkUserInData({ email: emailInp.value, password: passwordInp.value })
  ) {
    const loginUser = {
      email: emailInp.value,
      password: passwordInp.value,
    };
    localStorage.setItem("current-user", JSON.stringify(loginUser));
    let myHref = window.location.href.split("/login.html");
    window.location.href = `${myHref[0]}/index.html`;
  } else {
      console.log("Crediantials not matched!")
  }
};

loginBtn.addEventListener("click", login);
