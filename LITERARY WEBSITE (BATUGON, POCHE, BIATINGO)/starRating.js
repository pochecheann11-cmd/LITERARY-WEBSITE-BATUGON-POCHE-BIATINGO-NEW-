
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const starContainer = modal.querySelector(".star-rating");
  const avgRatingDisplay = modal.querySelector(".avg-rating");

  // Store ratings for each work (using title as key for simplicity)
  const ratings = {};

  // Function to render stars
  function renderStars(currentRating = 0) {
    starContainer.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      star.innerHTML = "&#9733;"; // ★
      star.style.cursor = "pointer";
      star.style.fontSize = "24px";
      star.style.color = i <= currentRating ? "#ffc107" : "#ccc";

      // Add click event to set rating
      star.addEventListener("click", () => {
        ratings[modal.querySelector(".work-title").innerText] = i;
        updateStars();
      });

      starContainer.appendChild(star);
    }
  }

  // Function to update stars based on saved rating
  function updateStars() {
    const currentWork = modal.querySelector(".work-title").innerText;
    const rating = ratings[currentWork] || 0;
    renderStars(rating);
    avgRatingDisplay.innerText = rating > 0 ? `Rating: ${rating}/5` : "";
  }

  // Update stars whenever modal opens
  const observer = new MutationObserver(() => {
    if (modal.style.display === "block") {
      updateStars();
    }
  });

  observer.observe(modal, { attributes: true, attributeFilter: ["style"] });

  // Initialize stars
  renderStars();
});
