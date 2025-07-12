async function loadQuizData(jsonPath) {
  const res = await fetch(jsonPath);
  if (!res.ok) throw new Error("Failed to load quiz data");
  return await res.json();
}

function createQuizCard(question, index) {
  const questionDiv = document.createElement("div");
  questionDiv.className = "question";

  const title = document.createElement("h3");
  title.textContent = `${index + 1}. ${question.q}`;
  questionDiv.appendChild(title);

  const ul = document.createElement("ul");

  question.options.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt;

    li.addEventListener("click", () => {
      if (questionDiv.classList.contains("answered")) return;
      questionDiv.classList.add("answered");

      const isCorrect = opt.trim() === question.a.trim();
      li.classList.add(isCorrect ? "correct" : "wrong");

      ul.querySelectorAll("li").forEach((o) => {
        o.classList.add("disabled");
        if (o.textContent.trim() === question.a.trim()) {
          o.classList.add("correct");
        }
      });
    });

    ul.appendChild(li);
  });

  questionDiv.appendChild(ul);
  return questionDiv;
}

async function renderInlineQuizzes(jsonPath) {
  const quizData = await loadQuizData(jsonPath);

  document.querySelectorAll(".quiz-container").forEach((container) => {
    const id = container.dataset.quizId;
    const questions = quizData[id];

    if (!questions) {
      container.innerHTML = "<p>No questions available for this lesson.</p>";
      return;
    }

    // 🎯 Create clickable toggle button
    const toggle = document.createElement("h3");
    toggle.textContent = "🎯 Quick Quiz";
    toggle.className = "quiz-toggle";
    toggle.style.cursor = "pointer";
    toggle.style.marginTop = "2rem";

    // 📦 Create quiz content wrapper
    const content = document.createElement("div");
    content.className = "quiz-content";
    content.style.display = "none";

    // Add each question to the wrapper
    questions.forEach((q, i) => {
      content.appendChild(createQuizCard(q, i));
    });

    // Toggle behavior
    toggle.addEventListener("click", () => {
      content.style.display = content.style.display === "none" ? "block" : "none";
    });

    container.appendChild(toggle);
    container.appendChild(content);
  });
}



export { renderInlineQuizzes };
