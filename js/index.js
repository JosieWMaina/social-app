const logoutBtn = document.getElementById("logout-btn");
const followWrapper = document.getElementById("follow");
const postsWrapper = document.getElementById("posts-wrapper");
const imagesBaseUrl = "https://unsplash.com/photos/";
let imgPreview = document.querySelector("#img-preview");
const uploadForm = document.getElementById("upload-form");
const uploadBtn = document.getElementById("submitBtn");
const fileInp = document.getElementById("file");

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
  return user.posts.map((post, ind) => {
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
            <img src="./img/user-${index + 1}.jpg" alt="" class="user-image" />
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
});

postsWrapper.innerHTML = postsList.join("");

const logout = () => {
  localStorage.removeItem("current-user");
};

fileInp.addEventListener("change", (event) => {
  //prevent redirect
  event.preventDefault();

  //get file
  let uplImg = uploadForm.file.files[0];

  console.log(uplImg);

  //check for file type
  if (uplImg.type.substr(0, 5) !== "image") {
    console.error("Only images");
    return;
  }

  img = document.createElement("img");

  //convert uploaded image to base 64 and append it to Div
  getBase64(uplImg).then((data) => {
    console.log(data);
    img.src = data;
    imgPreview.appendChild(img);
  });
});

//convert image to base 64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

logoutBtn.addEventListener("click", logout);
