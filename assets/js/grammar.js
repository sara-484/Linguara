fetch('../data/grammar.json')
  .then((response) => response.json())
  .then((data) => {
    const accordionContainer = document.getElementById('accordion');

    data.grammarTopics.forEach((topic, index) => {
      const item = document.createElement('div');
      item.className = 'accordion-item';

      const header = document.createElement('div');
      header.className = 'accordion-header';
      header.innerHTML = `${topic.title} <span>➕</span>`;
      header.addEventListener('click', () => toggleAccordion(content, header));

      const content = document.createElement('div');
      content.className = 'accordion-content';

      content.innerHTML = `
        <p><strong>Description:</strong> ${topic.description}</p>
        <p><strong>Tip:</strong> ${topic.tip}</p>
        <p><strong>Example Sentences:</strong></p>
        <ul>${topic.examples.sentences.map(e => `<li>${e}</li>`).join('')}</ul>
        <p><strong>Real-world Examples:</strong></p>
        <ul>${topic.examples.realWorld.map(e => `<li>${e}</li>`).join('')}</ul>
      `;

      item.appendChild(header);
      item.appendChild(content);
      accordionContainer.appendChild(item);
    });

    function toggleAccordion(content, header) {
      const isOpen = content.classList.contains('open');
      document.querySelectorAll('.accordion-content').forEach((el) => {
        el.classList.remove('open');
        el.style.maxHeight = null;
        el.previousElementSibling.querySelector('span').textContent = '➕';
      });

      if (!isOpen) {
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        header.querySelector('span').textContent = '➖';
      }
    }
  })
  .catch((error) => {
    console.error('Failed to load grammar data:', error);
  });
