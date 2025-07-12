// BOTÓN DE SONIDO
const toggleSound = document.getElementById("toggleSound");
const bgMusic = document.getElementById("bgMusic");

let soundEnabled = true;

toggleSound.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  bgMusic.volume = soundEnabled ? 1 : 0;
  toggleSound.textContent = soundEnabled ? "🔊" : "🔇";
});

// BOTÓN DE COMPARTIR
document.getElementById("shareBtn").addEventListener("click", async () => {
  const url = window.location.href;
  const shareText = "🔥 ¡Prueba este juego extremo de reflejos! Toca la bolita si puedes: " + url;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Juego Toque",
        text: shareText,
        url: url
      });
    } catch (err) {
      console.error("No se pudo compartir:", err);
    }
  } else {
    prompt("Copia y comparte este enlace:", url);
  }
});
