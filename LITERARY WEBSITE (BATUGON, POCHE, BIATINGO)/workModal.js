// workModal.js
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modal");
  const modalCloseBtns = modal.querySelectorAll(".modal-close");

  const workTitleEl = modal.querySelector(".work-title");
  const workAuthorEl = modal.querySelector(".work-author");
  const workCoverEl = modal.querySelector(".work-cover");
  const workContentEl = modal.querySelector(".work-content");

  /* ============================
      CLOSE WORK MODAL
  ============================ */
  function closeModal() {
    modal.classList.remove("active");
  }

  modalCloseBtns.forEach(btn => btn.addEventListener("click", closeModal));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });


  /* ============================
       OPEN WORK MODAL
  ============================ */
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".work-card");
    if (!card) return;

    const title = card.querySelector(".card-title").innerText;
    const author = card.querySelector(".card-author").innerText.trim();
    const cover = card.querySelector("img")?.src || "";
    const content = card.querySelector(".card-excerpt").innerText;

    workTitleEl.innerText = title;

    // MAKE AUTHOR NAME CLICKABLE
    workAuthorEl.innerHTML = `
      <span class="author-link"
      style="cursor:pointer; color:#007bff; font-weight:600;">
        ${author}
      </span>
    `;

    workCoverEl.src = cover;
    workContentEl.innerText = content;

    modal.classList.add("active");
  });


  /* ============================================
        AUTHOR CLICK → OPEN PUBLIC PROFILE MODAL
  ============================================ */

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("author-link")) return;

    const authorName = e.target.innerText.trim();
    openPublicProfile(authorName);
  });


  /* ============================================
        PUBLIC PROFILE MODAL VIEW
  ============================================ */

  function openPublicProfile(authorName) {
    const publicModal = document.getElementById("public-profile-modal");
    const publicBody = document.getElementById("public-profile-body");

    // LOAD ALL SAVED USERS
    const users = JSON.parse(localStorage.getItem("aspirewrite_users") || "{}");
    const user = users[authorName] || {};

    // LOAD WORKS
    const works = JSON.parse(localStorage.getItem("aspire_works") || "[]");
    const userWorks = works.filter(w => w.author === authorName);

    // PRIVACY FILTERING
    const bio = user.bioVisibility === "private" ? "(Private Bio)" : (user.bio || "—");
    const birthday = user.birthdayVisibility === "public" ? (user.birthday || "—") : "(Private)";
    const location = user.locationVisibility === "public" ? (user.location || "—") : "(Private)";
    const genres = user.favoriteGenresVisibility === "public" ? (user.favoriteGenres || "—") : "(Private)";
    const social = user.socialVisibility === "public" ? (user.social || "—") : "(Private)";

    publicBody.innerHTML = `
      <div class="public-profile">

        <div class="public-avatar">
          <img src="${user.avatar || "default-avatar.png"}" />
        </div>

        <h2>${authorName}</h2>
        <p><strong>Bio:</strong> ${bio}</p>

        <div class="public-info">
          <p><strong>Birthday:</strong> ${birthday}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Favorite Genres:</strong> ${genres}</p>
          <p><strong>Social:</strong> ${social}</p>
        </div>

        <hr>

        <h3>Uploaded Works</h3>
        <div class="public-user-works">
          ${
            userWorks.length
              ? userWorks.map(w => `
                  <div class="pub-work-card">
                    <strong>${w.title}</strong>
                    <p>${w.category}</p>
                  </div>
                `).join("")
              : "<p>No works uploaded yet.</p>"
          }
        </div>

      </div>
    `;

    publicModal.classList.add("active");
  }


  /* ============================
      CLOSE PUBLIC PROFILE MODAL
  ============================ */

  const publicProfileModal = document.getElementById("public-profile-modal");

  publicProfileModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-close") || e.target.id === "public-profile-modal") {
      publicProfileModal.classList.remove("active");
    }
  });

});
