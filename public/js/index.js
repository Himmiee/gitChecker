const btn = document.getElementById("gitFieldBtn");
const input = document.getElementById("gitfield");
const data = document.getElementById("gitdata");
const list = document.getElementById("el");



const getUser = () => {
  let name = input.value;
  const uri = `https://api.github.com/users/${name}`;
  const reposUri = `https://api.github.com/users/${name}/repos`;
  const info = input.addEventListener("change", (e) => {
    e.preventDefault();
    // load()
    console.log(e.target.value);  
    data.innerText = " "
    document.getElementById("loader").style.display = "flex";
    btn.addEventListener("click", getUser);
  });
  if (!info) {
    btn.removeEventListener("click", getUser);
  }
//   const load = () => {
//   document.location.rel
// }

  fetch(uri, { method: "GET" })
    .then((response) => response.json())
    .then((response) => {
      document.getElementById("loader").style.display = "none";
      if (response.message == "Not Found" || name == "") {
        data.innerHTML = `<h2>Not Found</h2>`;
      } else {
        const gitFull = response.login;
        const gitName = response.name;
        const gitFollowers = response.followers;
        const gitFollowing = response.following;
        const avatar = response.avatar_url;
        const repos = response.public_repos;
        const profileUrl = response.html_url;


              if (gitName == undefined) {gitName == gitFull}


        data.innerHTML = `<div class="user">
              <span class="git" id="uname">${
                gitName 
              } <a href=${profileUrl} target="_blank">@${
          gitFull
        }</a></span>
              <span class="git"><a href=${profileUrl} target="_blank"><img src=${avatar} width=90" height=90" id="avatar"></a></span>
              <div class="sect">
              <p id="info">Followers: ${gitFollowers}  Following: ${
          gitFollowing
        }  <br> Repos: ${repos} </p>
              ${repos >= 0 ? "<h2>Repos List: </h2>" : ""}
              </div>
              </div>`;
      }
    });

  fetch(reposUri, { method: "GET" })
    .then((itx) => itx.json())
    .then((itx) => {

      // console.log(res)
      if (itx.length == 0) {
        data.innerHTML = `<h2>No Repos</h2>`;
      } else {
        //  data.innerHTML= " "

        `${itx
          .map((dat) => {
            let newMessage = ` 
            <div class="info">
            <ul>
            <li><a id="el" href=${dat.html_url}  target="_blank">${dat.name}</a></li>
            </ul></div>`
            if (dat.name != "") {
              data.insertAdjacentHTML("beforeend",newMessage)
            }
            
          })
          .join("")}`;
      }

  
    });
};

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("gitFieldBtn").click(getUser);
  }
});

btn.addEventListener("click", getUser);
