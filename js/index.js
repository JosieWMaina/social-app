const logoutBtn = document.getElementById("logout-btn");
const followWrapper = document.getElementById("follow");
const postsWrapper = document.getElementById("posts-wrapper");
const currentPostsWrapper = document.getElementById("current-posts-wrapper");
let imgPreview = document.querySelector("#img-preview");
const uploadProfile = document.getElementById("profile-upload-btn");
const uploadBtn = document.getElementById("submitBtn");
const fileInp = document.getElementById("file");
const uploadError = document.getElementById("upload-error");
const likeBtn = document.getElementById("likedBtn");
const currentUser = localStorage.getItem("current-user");
const parsedUser = JSON.parse(currentUser);
const userImage = document.getElementById("preview-user-image");
const userImageNav = document.getElementById("user-nav-img");
const userImageSidebar = document.getElementById("user-image-sidebar");
const userImageInp = document.getElementById("file2");
let profileImageUpload = document.getElementById("profile-image");
let userName = document.getElementById("user-name");
let uploadImageSrc;
let updatedProfileSrc;

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

if(parsedUser.userImage) {
  userImage.src = parsedUser.userImage;
  userImageNav.src = parsedUser.userImage;
  userImageSidebar.src = parsedUser.userImage;
}

followWrapper.innerHTML = userList.join("");

userImageInp.addEventListener("change", (event) => {
  event.preventDefault();
  uploadError.classList.add("d-none");
  if (!file2.value.length) return;

  let reader = new FileReader();
  reader.onload = profileLog;
  reader.readAsDataURL(file2.files[0]);
});

function profileLog(event) {
  let str = event.target.result;
  if (str) {
    userImage.src = str;
    updatedProfileSrc = str;
    uploadProfile.innerHTML = `<a href="#" id="profile-image" onclick="updateCurrentUserImage()" class="btn btn-global px-2 py-2 rounded-pill ms-2 d-hide">
    <img src="./img/upload.svg" alt="">
  </a>`;
  }
}

const updateCurrentUserImage = () => {
  if (updatedProfileSrc) {
    const strSize = new Blob([updatedProfileSrc]).size / 1000;
    if (strSize > 400) {
      uploadError.classList.remove("d-none");
      uploadError.innerText = "Please select an Image size less then 400kb";
      userImage.innerHTML = "";
    } else {
      const userImage = updatedProfileSrc;
      const upUser = {...parsedUser, userImage}
      localStorage.setItem("current-user", JSON.stringify(upUser));
      document.location.reload(true);
    }
  } else {
    console.log("Please select an Image");
  }
};

const likePost = (ind) => {
  let likeIcon = document.getElementById(`likeIcon${ind}`);
  let url = window.location.href.split("/index.html");
  if (likeIcon.src === `${url[0]}/img/unlike.svg`) {
    likeIcon.src = "./../img/like.svg";
  } else {
    likeIcon.src = "./../img/unlike.svg";
  }
};

let postsList = data[0].users.map((user, index) => {
  const users = user.posts.map((post, ind) => {
    return `
    <div class="col-12 col-sm-6">
      <div class="card mt-4">
        <img src="./img/${index + 1}.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <div class="top">
            <div class="likes" id="likedBtn" onclick="likePost(${index})">
              <img id="likeIcon${index}" src="./img/unlike.svg" alt="" />
            </div>
          </div>
          <div class="inner">
            <img src="${
              user.userImage ? user.userImage : "./img/user-1.jpg"
            }" alt="" class="user-image" />
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
    <div class="col-12 col-sm-6" id="myDiv${index}">
      <div class="card mt-4">
        <img src="${post.imageID}" class="card-img-top" alt="..." />
        <div class="card-body">
          <div class="top">
            <div class="likes" id="likedBtn" onclick="likePost(${index + 100})">
              <img id="likeIcon${index + 100}" src="./img/unlike.svg" alt="" />
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

const logout = () => {
  localStorage.removeItem("current-user");
  localStorage.removeItem("saved-user");
};

fileInp.addEventListener("change", (event) => {
  uploadError.classList.add("d-none");
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
    if (strSize > 400) {
      uploadError.classList.remove("d-none");
      uploadError.innerText = "Please select an Image size less then 400kb";
      imgPreview.innerHTML = "";
    } else {
      const posts = [newPost, ...parsedUser.posts];
      const upUser = { ...parsedUser, posts };

      localStorage.setItem("current-user", JSON.stringify(upUser));
      document.location.reload(true);
    }
  } else {
    console.log("Please select an Image");
  }
};

// likeBtn.addEventListener('click', likePost);

uploadBtn.addEventListener("click", addPost);
logoutBtn.addEventListener("click", logout);
