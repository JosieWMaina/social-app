const loginBtn = document.getElementById("login-btn");
const emailInp = document.getElementById("email-inp");
const passwordInp = document.getElementById("password-inp");
fetch("./data.json")
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));


const login = () => {
    const getUser = localStorage.getItem('current-user');
    const parsedUser = JSON.parse(getUser);
    if(parsedUser.email === emailInp.value && parsedUser.password === passwordInp) {
        console.log("please login")
    }
}

loginBtn.addEventListener('click', login)