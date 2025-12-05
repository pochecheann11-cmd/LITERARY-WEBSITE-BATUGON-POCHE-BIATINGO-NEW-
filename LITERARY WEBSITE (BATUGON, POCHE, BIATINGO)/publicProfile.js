// publicProfile.js
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("public-profile-modal");
  const body = document.getElementById("public-profile-body");

  window.openPublicProfile = function(authorName) {

    const user = JSON.parse(localStorage.getItem("aspirewrite_user"));

    if (!user || user.name !== authorName) {
      body.innerHTML = `<h2>${authorName}</h2><p>No public profile available.</p>`;
    } else {
      body.innerHTML = `
        <div class="public-profile">

          <div class="avatar">
            <img src="${user.avatar}" />
          </div>

          <h2>${user.name}</h2>
          <p>${user.bio || ""}</p>

          <hr>

          ${user.birthday && user.birthdayVisible === "public" ? `<p><b>Birthday:</b> ${user.birthday}</p>` : ""}

          ${user.location && user.locationVisible === "public" ? `<p><b>Location:</b> ${user.location}</p>` : ""}

          ${user.favoriteGenres && user.favoriteGenresVisible === "public" ? `<p><b>Favorite Genres:</b> ${user.favoriteGenres}</p>` : ""}

          ${user.social && user.socialVisible === "public" ? `<p><b>Social:</b> <a href="${user.social}" target="_blank">${user.social}</a></p>` : ""}

          <hr>

          <h3>Uploaded Works</h3>
          <div id="user-works"></div>

        </div>
      `;
    }

    // load works by this author
    const works = DB.loadWorks();
    const list = works.filter(w => w.author === authorName);

    const container = document.getElementById("user-works");
    container.innerHTML = list.length
      ? list.map(w => `<p class="user-work-item" data-id="${w.id}">${w.title}</p>`).join("")
      : "<p>No works yet.</p>";

    modal.classList.add("active");
  };

  modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

