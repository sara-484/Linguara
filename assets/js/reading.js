// reading/js/reading.js
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".story-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `story.html?id=${id}`;
    });
  });
});
