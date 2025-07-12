
 const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
  });

  // === DARK MODE LOCALSTORAGE SCRIPT ===

// 1. Grab elements
const body = document.body;

// 2. Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  if (themeToggle) themeToggle.checked = true;
}

// 3. Update theme on toggle
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}
