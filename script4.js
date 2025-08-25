// Handle dropdown toggle
document.querySelectorAll(".dot-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const dropdown = e.target.nextElementSibling;
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";

    // Close all others
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
      if (menu !== dropdown) menu.style.display = "none";
    });
  });
});

// Close dropdowns if click outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown-menu").forEach(menu => menu.style.display = "none");
  }
});

// Make text editable
function editReview(cardId) {
  const card = document.getElementById(cardId);
  const text = card.querySelector(".text");
  const saveBtn = card.querySelector(".save-btn");

  text.contentEditable = true;
  text.focus();
  saveBtn.style.display = "inline-block";

  saveBtn.onclick = function () {
    text.contentEditable = false;
    saveBtn.style.display = "none";
    alert("Review updated.");
  };
}

// Toggle text visibility
function hideReview(cardId) {
  const card = document.getElementById(cardId);
  const text = card.querySelector(".text");

  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

// Delete card
function deleteReview(cardId) {
  const card = document.getElementById(cardId);
  if (confirm("Are you sure you want to delete this review?")) {
    card.remove();
  }
}
