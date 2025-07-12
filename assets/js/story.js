// assets/js/story.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('id');
    if (!storyId) throw new Error("ID داستان وجود ندارد");

    const response = await fetch('../data/readings.json'); 
    if (!response.ok) throw new Error("خطا در دریافت داستان‌ها");
    const data = await response.json();

    const story = data.readings.find(item => item.id === storyId);
    if (!story) throw new Error("داستان یافت نشد");

    document.getElementById("story-title").textContent = story.title;
    document.getElementById("story-level").textContent = `level: ${story.level} | estimated time : ${story.estimatedTime}`;
    
    const storyBody = document.getElementById("story-body");
    storyBody.innerHTML = story.paragraphs.map(p => `<p>${p}</p>`).join('');

    const questionsSection = document.getElementById("story-questions");
    questionsSection.innerHTML = '<h2>Comprehension Questions</h2>';

    story.questions.forEach((q, i) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      const questionTitle = document.createElement("h3");
      questionTitle.textContent = `${i + 1}. ${q.q}`;

      const ul = document.createElement("ul");
      q.options.forEach(opt => {
        const li = document.createElement("li");
        li.textContent = opt;
        li.addEventListener("click", () => {
          if (questionDiv.classList.contains("answered")) return;
          questionDiv.classList.add("answered");

          const isCorrect = li.textContent.trim() === q.a.trim();
          li.classList.add(isCorrect ? "correct" : "wrong");

          ul.querySelectorAll("li").forEach(o => {
            o.style.pointerEvents = "none";
            if (o.textContent.trim() === q.a.trim()) {
              o.classList.add("correct");
            } else {
              o.classList.add("disabled");
            }
          });
        });
        ul.appendChild(li);
      });

      questionDiv.appendChild(questionTitle);
      questionDiv.appendChild(ul);
      questionsSection.appendChild(questionDiv);
    });

  } catch (error) {
    console.error(error);
    document.getElementById("story-title").textContent = "خطا: " + error.message;
  }
});
