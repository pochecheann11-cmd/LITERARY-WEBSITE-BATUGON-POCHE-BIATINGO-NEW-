// register.js
document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("register-btn");
  const registerModal = document.getElementById("register-modal");
  const closeBtns = registerModal.querySelectorAll(".modal-close");
  const registerForm = document.getElementById("register-form");

  registerBtn.addEventListener("click", () => registerModal.style.display = "block");

  closeBtns.forEach(btn => btn.addEventListener("click", () => registerModal.style.display = "none"));

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if(name && email && password){
      alert(`Account created for ${name}`);
      registerModal.style.display = "none";
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("register-btn").style.display = "none";
      document.getElementById("profile-btn").style.display = "inline-block";
    }
  });
});

