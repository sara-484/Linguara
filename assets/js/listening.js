document.addEventListener("DOMContentLoaded", () => {
  // پخش/توقف صوت
  document.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const audioId = this.getAttribute("data-audio");
      const audio = document.getElementById(audioId);
      const progress = this.parentElement.querySelector(".progress");
      
      if (audio.paused) {
        audio.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
        
        // آپدیت پیشرفت
        audio.addEventListener("timeupdate", () => {
          const percent = (audio.currentTime / audio.duration) * 100;
          progress.style.width = percent + "%";
        });
      } else {
        audio.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  });

  // نمایش ترانسکریپت
  document.querySelectorAll(".show-transcript").forEach(btn => {
    btn.addEventListener("click", function() {
      const transcript = this.closest(".lesson-card").querySelector(".transcript");
      transcript.classList.toggle("show");
      this.textContent = transcript.classList.contains("show") ? "Hide Transcript" : "Show Transcript";
    });
  });

  // کلیک روی نوار پیشرفت
  document.querySelectorAll(".progress-bar").forEach(bar => {
    bar.addEventListener("click", function(e) {
      const audio = this.closest(".audio-player").querySelector("audio");
      const percent = e.offsetX / this.offsetWidth;
      audio.currentTime = percent * audio.duration;
    });
  });
});