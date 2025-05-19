const socket = io();
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

let otherPlayers = {};

// Send input every frame
function sendInput() {
  socket.emit('playerInput', { keys });
}

socket.on('playerInput', ({ id, input }) => {
  otherPlayers[id] = input;
});

socket.on('playerLeft', (id) => {
  delete otherPlayers[id];
});

// Game loop
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Your player
  ctx.fillStyle = 'white';
  ctx.fillRect(400, 300, 20, 20);

  // Other players (as static squares for now)
  ctx.fillStyle = 'red';
  for (let id in otherPlayers) {
    ctx.fillRect(Math.random() * 800, Math.random() * 600, 20, 20);
  }

  sendInput();
  requestAnimationFrame(loop);
}
loop();
