const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const levelDisplay = document.getElementById('level');
const medalDisplay = document.getElementById('medal');
const startBtn = document.getElementById('startBtn');
const difficultySelect = document.getElementById('difficulty');
const menu = document.getElementById('menu');
const gameUI = document.getElementById('gameUI');
const clickSound = document.getElementById('clickSound');
const failSound = document.getElementById('failSound');
const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.3;

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let level = 1;
let timeLimit = 1500;
let circle;
let timeout;
let dificultad = 'normal';

highScoreDisplay.textContent = `🏆 Récord: ${highScore}`;

function getMedal(score) {
  if (score >= 30) return "🏅 Platino";
  if (score >= 20) return "🥇 Oro";
  if (score >= 10) return "🥈 Plata";
  return "🥉 Bronce";
}

function updateStats() {
  const oldLevel = level;
  level = Math.floor(score / 10) + 1;

  let baseSpeed = dificultad === 'facil' ? 1800 : dificultad === 'dificil' ? 1000 : 1500;
  timeLimit = Math.max(500, baseSpeed - (level - 1) * 100);

  scoreDisplay.textContent = `Puntos: ${score}`;
  levelDisplay.textContent = `Nivel: ${level}`;
  medalDisplay.textContent = `Medalla: ${getMedal(score)}`;

  if (level > oldLevel) {
    levelDisplay.style.color = '#00ff00';
    levelDisplay.style.fontSize = '30px';
    setTimeout(() => {
      levelDisplay.style.color = '#fff';
      levelDisplay.style.fontSize = '22px';
    }, 600);
  }
}

function createSpark(x, y) {
  const spark = document.createElement('div');
  spark.classList.add('spark');
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  gameArea.appendChild(spark);
  setTimeout(() => gameArea.removeChild(spark), 500);
}

function createCircle() {
  circle = document.createElement('div');
  circle.classList.add('circle');

  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  circle.addEventListener('click', (e) => {
    clearTimeout(timeout);
    score++;
    clickSound.play();
    updateStats();
    createSpark(e.clientX - gameArea.offsetLeft, e.clientY - gameArea.offsetTop);
    gameArea.removeChild(circle);
    showCircle();
  });

  gameArea.appendChild(circle);

  timeout = setTimeout(() => {
    failSound.play();
    alert(`💥 ¡Perdiste! Puntaje: ${score}`);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
    }
    resetGame();
  }, timeLimit);
}

function showCircle() {
  createCircle();
}

function resetGame() {
  score = 0;
  level = 1;
  timeLimit = 1500;
  scoreDisplay.textContent = "Puntos: 0";
  levelDisplay.textContent = "Nivel: 1";
  medalDisplay.textContent = "Medalla: 🥉";
  highScoreDisplay.textContent = `🏆 Récord: ${highScore}`;
  startBtn.style.display = 'inline-block';
  gameUI.style.display = 'none';
  menu.style.display = 'block';
  if (circle && gameArea.contains(circle)) {
    gameArea.removeChild(circle);
  }
}

startBtn.addEventListener('click', () => {
  dificultad = difficultySelect.value;
  bgMusic.play();
  startBtn.style.display = 'none';
  menu.style.display = 'none';
  gameUI.style.display = 'block';
  showCircle();
});
