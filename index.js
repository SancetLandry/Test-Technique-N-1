const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let startX;
let startY;
let rectangles = []; // tableau pour stocker les rectangles

canvas.addEventListener("mousedown", (e) => {
  startX = e.offsetX;
  startY = e.offsetY;
  isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const currentX = e.offsetX;
  const currentY = e.offsetY;
  const width = currentX - startX;
  const height = currentY - startY;
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red},${green},${blue})`;
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, width, height);

  // ajouter le rectangle au tableau des rectangles
  rectangles.push({x: startX, y: startY, width: width, height: height, color: color});
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("dblclick", (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  rotateRectangle(x, y);

  // boucle à travers tous les rectangles pour vérifier si le clic est à l'intérieur d'un rectangle
  for (let i = 0; i < rectangles.length; i++) {
    const rect = rectangles[i];
    if (x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height) {
      // si le clic est à l'intérieur d'un rectangle, rotate de 360°
      ctx.translate(rect.x + rect.width/2, rect.y + rect.height/2);
      ctx.rotate(2*Math.PI);
      ctx.translate(-(rect.x + rect.width/2), -(rect.y + rect.height/2));
      rectangles.splice(i, 1); // supprimer le rectangle tourné du tableau des rectangles
    }
  }
});

function rotateRectangle(x, y) {
    // boucle à travers tous les rectangles pour vérifier si le clic est à l'intérieur d'un rectangle
    for (let i = 0; i < rectangles.length; i++) {
      const rect = rectangles[i];
      if (x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height) {
        // si le clic est à l'intérieur d'un rectangle, rotate de 360°
        const centerX = rect.x + rect.width/2;
        const centerY = rect.y + rect.height/2;
        const startAngle = 0;
        const endAngle = Math.PI * 2;
        const rotationSpeed = Math.PI / 120; // 1 degré par frame
        let currentAngle = startAngle;
  
        ctx.fillStyle = rect.color; // définir la couleur de remplissage avant d'entrer dans la boucle animate()
  
        function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // effacer tout le canvas
  ctx.save(); // sauvegarder l'état du contexte
  ctx.translate(centerX, centerY);
  ctx.rotate(currentAngle);
  ctx.translate(-centerX, -centerY);
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  ctx.restore(); // restaurer l'état du contexte
  currentAngle += rotationSpeed;

  if (currentAngle < endAngle) {
    requestAnimationFrame(animate);
  } else {
    // Supprimer le rectangle tourné du tableau des rectangles
    const index = rectangles.findIndex(r => r === rect);
    if (index !== -1) rectangles.splice(index, 1);

    // réinitialiser le canvas avec tous les rectangles restants
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < rectangles.length; j++) {
      const rect = rectangles[j];
      ctx.fillStyle = rect.color;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
  }
}
  
        animate(); // lancer l'animation
      }
    }
  };