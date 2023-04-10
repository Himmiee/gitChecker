const btn = document.getElementById("gitFieldBtn")
const input = document.getElementById("gitfield")
const data = document.getElementById("gitdata")

const getUser = () => {
    let name = input.value
    const uri   = `https://api.github.com/users/${name}`;
    const reposUri = `https://api.github.com/users/${name}/repos`;
    const info = input.addEventListener("change", (e) => {
        e.preventDefault();
        console.log(e.target.value)
        btn.addEventListener("click",getUser);
    })
    if (!info) {
        btn.removeEventListener("click", getUser);
    }
    fetch(uri, {method: "GET"}).then(response => response.json())
    .then( response => {
        if (response.status == "Not Found"  || response.username == "") {
         data.innerHTML=`<h2>Not Found</h2>`
        } else {
              const gitFull = response.login
              const gitName = response.name;
              const gitFollowers = response.followers;
              const gitFollowing = response.following;
              const avatar = response.avatar_url;
              const repos = response.public_repos;
              const profileUrl = response.html_url;

              data.innerHTML=`<div class="user">
              <span class="git" id="uname">${gitName || "User Not Found"} <a href=${profileUrl} target="_blank">@${gitFull || "Nil"}</a></span>
              <span class="git"><a href=${profileUrl} target="_blank"><img src=${avatar} width=90" height=90" id="avatar"></a></span>
              <div class="sect">
              <p id="info">Followers: ${gitFollowers || "0"}  Following: ${gitFollowing || "0"}  <br> Repos: ${repos || "0"} </p>
              ${repos >= 0  ? "<h2>Repos List: </h2>" : ""}
              </div>
              </div>`
  
          
        }
      }

        )

        fetch(reposUri,{method: "GET"}).then(response => response.json())
        .then(response => {
            if (response.length == 0 ) {
             data.innerHTML=`<h2>No Repos</h2>`
            } else {
        `${response.map((dat) => {
            data.insertAdjacentHTML("afterend",` 
            <ul>
            <li><a href=${dat.html_url} target="_blank">${dat.name}</a></li>
        </ul>`)
        }
                    ).join('')}`
             }
              
            }

        )
    
}

btn.addEventListener("click", getUser)



   


