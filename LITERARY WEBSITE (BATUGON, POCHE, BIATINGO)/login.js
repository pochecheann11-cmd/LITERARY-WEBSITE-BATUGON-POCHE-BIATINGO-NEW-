// login.js
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const loginModal = document.getElementById("login-modal");
  const closeBtns = loginModal.querySelectorAll(".modal-close");
  const loginForm = document.getElementById("login-form");

  loginBtn.addEventListener("click", () => loginModal.style.display = "block");

  closeBtns.forEach(btn => btn.addEventListener("click", () => loginModal.style.display = "none"));

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Simple login simulation
    if(email && password){
      alert(`Logged in as ${email}`);
      loginModal.style.display = "none";
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("register-btn").style.display = "none";
      document.getElementById("profile-btn").style.display = "inline-block";
    }
  });
});

