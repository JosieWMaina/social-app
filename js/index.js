const logoutBtn = document.getElementById("logout-btn");
const followWrapper = document.getElementById("follow");
const postsWrapper = document.getElementById("posts-wrapper");
const currentPostsWrapper = document.getElementById("current-posts-wrapper");
let imgPreview = document.querySelector("#img-preview");
const uploadForm = document.getElementById("upload-form");
const uploadBtn = document.getElementById("submitBtn");
const fileInp = document.getElementById("file");
const uploadError = document.getElementById("upload-error");
const currentUser = localStorage.getItem("current-user");
const parsedUser = JSON.parse(currentUser);
let userName = document.getElementById("user-name");
let uploadImageSrc;

if (!currentUser) {
  let myHref = window.location.href.split("/index.html");
  window.location.href = `${myHref[0]}/login.html`;
}

if (currentUser) userName.innerHTML = parsedUser.firstName;
let userList = data[0].users.map((user, index) => {
  return `<div class="follow-user mb-4">
      <img src="./img/user-${index + 1}.jpg" alt="" class="user-image" />
      <div class="user-details">
        <h4 class="name mb-0">${user.firstName}</h4>
        <p class="mb-0">Add Friend</p>
      </div>
    </div>`;
});

followWrapper.innerHTML = userList.join("");

let postsList = data[0].users.map((user, index) => {
  console.log(user)
  const users = user.posts.map((post, ind) => {
    return `
    <div class="col-12 col-sm-6">
      <div class="card mt-4">
        <img src="./img/${index + 1}.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <div class="top">
            <div class="likes">
              <img src="./img/like.png" alt="" />
              <span>${post.likes}</span>
            </div>
            <div class="dislikes">
              <img src="./img/dislike.png" alt="" />
              <span>${post.dislikes}</span>
            </div>
          </div>
          <div class="inner">
            <img src="${user.userImage ? user.userImage : './img/user-1.jpg'}" alt="" class="user-image" />
            <div class="user-details">
              <h4 class="name mb-0">${user.firstName}</h4>
              <p class="mb-0">Friend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  return users.join("");
});

const currentUserPosts = parsedUser.posts.map((post, index) => {
  return `
    <div class="col-12 col-sm-6">
      <div class="card mt-4">
        <img src="${post.imageID}" class="card-img-top" alt="..." />
        <div class="card-body">
          <div class="top">
            <div class="likes">
              <img src="./img/like.png" alt="" />
              <span>${post.likes}</span>
            </div>
            <div class="dislikes">
              <img src="./img/dislike.png" alt="" />
            </div>
          </div>
          <div class="inner">
            <img src="${parsedUser.userImage}" alt="" class="user-image" />
            <div class="user-details">
              <h4 class="name mb-0">${parsedUser.firstName}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

postsWrapper.innerHTML += currentUserPosts.join("") + postsList.join("");

console.log(currentUserPosts)

const logout = () => {
  localStorage.removeItem("current-user");
  localStorage.removeItem("saved-user");
};

fileInp.addEventListener("change", (event) => {
  uploadError.classList.add('d-none')
  event.preventDefault();
  if (!file.value.length) return;

  let reader = new FileReader();
  reader.onload = logFile;
  reader.readAsDataURL(file.files[0]);
});

function logFile(event) {
  let str = event.target.result;
  let img = document.createElement("img");
  uploadImageSrc = str;
  img.src = str;
  imgPreview.append(img);
}

const addPost = () => {
  const newPost = {
    imageID: uploadImageSrc,
    liked: false,
    likes: 0,
  };
  if (uploadImageSrc) {
    const strSize = new Blob([uploadImageSrc]).size / 1000;
    if(strSize > 400) {
      console.log("Please select an Image size less then 400kb");
      uploadError.classList.remove('d-none');
      uploadError.innerText = "Please select an Image size less then 400kb"
      imgPreview.innerHTML = "";
    } else {

      const posts = [newPost, ...parsedUser.posts];
      const upUser = { ...parsedUser, posts };
      
      localStorage.setItem("current-user", JSON.stringify(upUser));
      console.log(upUser);
      document.location.reload(true)
    }
  } else {
    console.log("Please select an Image");
  }
};

uploadBtn.addEventListener("click", addPost);
logoutBtn.addEventListener("click", logout);
