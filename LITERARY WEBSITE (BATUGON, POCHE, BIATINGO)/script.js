// --- SAMPLE WORKS DATA ---
const works = {
  poetry: [
    {
      title: "Echoes of the Soul",
      author: "Luna Rivera",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      content: "In the quiet of the night, the soul whispers untold dreams that float like fireflies in the dark..."
    },
    {
      title: "Sea of Words",
      author: "Miguel Soriano",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      content: "A tide of words crashes upon the shore of my mind, bringing fragments of forgotten feelings..."
    },
    {
      title: "Moonlight Soliloquy",
      author: "Aria Domingo",
      image: "https://images.unsplash.com/photo-1526403224057-1d3c190e9f47?auto=format&fit=crop&w=600&q=80",
      content: "The moon listens to the heart’s quiet songs, unspoken yet heard by the stars above..."
    }
  ],
  fiction: [
    {
      title: "The Clockmaker's Secret",
      author: "J. M. De Luna",
      image: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?auto=format&fit=crop&w=600&q=80",
      content: "In a small town where time stood still, a clockmaker hides a secret that could change eternity itself..."
    },
    {
      title: "The Mirror Town",
      author: "Rico Alonzo",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      content: "A young woman discovers a world inside mirrors, where her reflection has a life of its own..."
    }
  ],
  "non-fiction": [
    {
      title: "Letters from the Mountains",
      author: "Carlos Marquez",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
      content: "Reflections on solitude, resilience, and the enduring beauty of the mountains that shaped my youth..."
    },
    {
      title: "Steps Beyond Comfort",
      author: "Isabel Ramos",
      image: "https://images.unsplash.com/photo-1484981184820-2e84ea0a7c2f?auto=format&fit=crop&w=600&q=80",
      content: "A journey through the challenges of living abroad and rediscovering identity away from home..."
    }
  ],
  essays: [
    {
      title: "The Art of Being Still",
      author: "E. Santos",
      image: "https://images.unsplash.com/photo-1526481280691-3d71e36a6979?auto=format&fit=crop&w=600&q=80",
      content: "Modern life praises motion, yet stillness teaches us what true presence means..."
    },
    {
      title: "Of Books and Becoming",
      author: "Clarisse Tan",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
      content: "Books are not just words on paper — they are mirrors that show us who we might become..."
    }
  ],
  "short-story": [
    {
      title: "The Last Train Home",
      author: "A. Castillo",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      content: "He missed the train — or perhaps, the train missed him. In that moment, fate rewrote itself..."
    },
    {
      title: "Paper Wings",
      author: "Lara Dizon",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      content: "A little girl sends messages on paper planes, hoping they’ll find her lost brother..."
    }
  ],
  fable: [
    {
      title: "The Sparrow and the Storm",
      author: "F. Dela Cruz",
      image: "https://images.unsplash.com/photo-1496497243327-4f4ee9c6d408?auto=format&fit=crop&w=600&q=80",
      content: "A small sparrow learns that even the fiercest storm bows to persistence and courage..."
    },
    {
      title: "The Fox and the Firefly",
      author: "R. Bautista",
      image: "https://images.unsplash.com/photo-1528839953259-3a0b1c9e4d54?auto=format&fit=crop&w=600&q=80",
      content: "A clever fox learns the value of humility after chasing a light he could never catch..."
    }
  ]
};

// --- CATEGORY SWITCHING ELEMENTS ---
const tabButtons = document.querySelectorAll(".tab-button");
const categorySections = document.querySelectorAll(".category-content");
const exploreBtn = document.getElementById("explore-btn");
const modal = document.getElementById("work-modal");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.querySelector(".close");

// --- LOAD WORKS ---
function loadWorks(category) {
  const container = document.getElementById(category);
  container.innerHTML = "";
  works[category].forEach((work, index) => {
    const div = document.createElement("div");
    div.classList.add("work-card");
    div.innerHTML = `
      <img src="${work.image}" alt="${work.title}">
      <h3>${work.title}</h3>
      <p><em>by ${work.author}</em></p>
      <div class="rating" data-category="${category}" data-index="${index}">
        ${renderStars(category, index)}
      </div>
    `;
    div.addEventListener("click", () => openModal(category, index));
    container.appendChild(div);
  });
}

// Load initial category (Poetry)
Object.keys(works).forEach(category => loadWorks(category));
document.getElementById("poetry").classList.add("active");

// --- TAB BUTTON FUNCTIONALITY ---
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    categorySections.forEach(sec => sec.classList.remove("active"));
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    document.getElementById(category).classList.add("active");
  });
});

// --- SMOOTH SCROLL ---
exploreBtn.addEventListener("click", () => {
  document.getElementById("categories").scrollIntoView({ behavior: "smooth" });
});

// --- MODAL HANDLING ---
function openModal(category, index) {
  const work = works[category][index];
  modal.style.display = "flex";
  modalDetails.innerHTML = `
    <h2>${work.title}</h2>
    <p><em>by ${work.author}</em></p>
    <p>${work.content}</p>
    <h3>Your Rating:</h3>
    <div class="rating" data-category="${category}" data-index="${index}">
      ${renderStars(category, index)}
    </div>
    <div class="comment-section">
      <h3>Comments:</h3>
      <div id="comments-${category}-${index}" class="comments-list">
        ${renderComments(category, index)}
      </div>
      <textarea id="comment-input-${category}-${index}" rows="2" placeholder="Write a comment..."></textarea>
      <button onclick="addComment('${category}', ${index})">Post Comment</button>
    </div>
  `;
}

closeModal.onclick = () => (modal.style.display = "none");
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// --- RATING SYSTEM ---
function renderStars(category, index) {
  const key = `${category}-${index}`;
  const rating = localStorage.getItem(`rating-${key}`) || 0;
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star" data-value="${i}" onclick="setRating('${category}', ${index}, ${i})">
      ${i <= rating ? "★" : "☆"}
    </span>`;
  }
  return stars;
}

function setRating(category, index, value) {
  const key = `${category}-${index}`;
  localStorage.setItem(`rating-${key}`, value);
  openModal(category, index);
}

// --- COMMENTS SYSTEM ---
function renderComments(category, index) {
  const key = `${category}-${index}`;
  const comments = JSON.parse(localStorage.getItem(`comments-${key}`) || "[]");
  return comments.map(c => `<p>💬 ${c}</p>`).join("");
}

function addComment(category, index) {
  const key = `${category}-${index}`;
  const input = document.getElementById(`comment-input-${category}-${index}`);
  if (!input.value.trim()) return;
  const comments = JSON.parse(localStorage.getItem(`comments-${key}`) || "[]");
  comments.push(input.value.trim());
  localStorage.setItem(`comments-${key}`, JSON.stringify(comments));
  openModal(category, index);
}
