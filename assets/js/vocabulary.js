const words = [
  { word: "Inspire 🌟", def: "To fill someone with a good idea or feeling" },
  { word: "Serenity 🌿", def: "A feeling of calm and peace" },
  { word: "Eloquent 🗣️", def: "Speaking in a clear and beautiful way" },
  { word: "Curiosity 🧐", def: "Wanting to learn or know more" },
  { word: "Momentum 🔁", def: "The power of moving forward" }
];

let index = 0;

function cycleWords() {
  const wordEl = document.getElementById("carousel-word");
  const defEl = document.getElementById("carousel-definition");

  const next = words[index];
  wordEl.textContent = next.word;
  defEl.textContent = next.def;

  index = (index + 1) % words.length;
}

setInterval(cycleWords, 3000); // change every 3 seconds

let wordData = [];

fetch('../data/vocab.json')
  .then(response => response.json())
  .then(data => {
    wordData = data;
  })
  .catch(error => {
    console.error('Error loading vocabulary:', error);
  });


function showModal(category) {
  const modal = document.getElementById('vocabModal');
  const header = document.getElementById('modalHeader');
  const container = document.getElementById('wordCardsContainer');

  const filtered = wordData.filter(item => item.category.toLowerCase() === category.toLowerCase());

  header.innerHTML = `<h2>${category} Words</h2>`;
  container.innerHTML = '';

  filtered.forEach(word => {
    const card = document.createElement('div');
    card.classList.add('flashcard');
    card.innerHTML = `
      <div class="word-title">${word.word}</div>
      <div class="word-definition">${word.definition}</div>
      <div class="word-example">${word.example}</div>
    `;
    container.appendChild(card);
  });

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('vocabModal').classList.add('hidden');
}

function viewMore() {
  // future redirect
  alert("This will take you to a full category page soon!");
}
