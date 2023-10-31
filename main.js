const colors = ['#7C0056', '#B2069A', '#600DC1', '#0E1EC9', '#001777', '#ACFFFF', '#FFC6FF'];

let currentIndex = 0;

function changeColor() {
    document.querySelector('.h1cartel').style.color = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeColor, 200); // Cambia de color cada segundo


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 5;
const characterSize = 20;
let characterX = 0;
let characterY = 0;


//funcion de mapa 

window.addEventListener("keydown", function(event) {
    event.preventDefault();
    let newCharacterX = characterX;
    let newCharacterY = characterY;

    switch(event.key) {
        case "ArrowUp":
            newCharacterY = Math.max(0, characterY - tileSize);
            break;
        case "ArrowDown":
            newCharacterY = Math.min(canvas.height - characterSize, characterY + tileSize);
            break;
        case "ArrowLeft":
            newCharacterX = Math.max(0, characterX - tileSize);
            break;
        case "ArrowRight":
            newCharacterX = Math.min(canvas.width - characterSize, characterX + tileSize);
            break;
    }
    zombiePoints.forEach(point => {
        if (
            characterX < point.x + 5 &&
            characterX + characterSize > point.x &&
            characterY < point.y + 5 &&
            characterY + characterSize > point.y
        ) {
            alert("¡Un zombie ha aparecido!");
            // Remover el punto de zombies para que no se muestre de nuevo
            zombiePoints.splice(zombiePoints.indexOf(point), 1);
        }
    });
    healingPoints.forEach(point => {
        if (
            characterX < point.x + 5 &&
            characterX + characterSize > point.x &&
            characterY < point.y + 5 &&
            characterY + characterSize > point.y
        ) {
            alert("¡Encontraste un punto de curación!");
            // Remover el punto de curación para que no se muestre de nuevo
            healingPoints.splice(healingPoints.indexOf(point), 1);
        }
    });
    

    // Solo actualiza las coordenadas del personaje si no se pasa de los límites
    if (newCharacterX !== characterX || newCharacterY !== characterY) {
        characterX = newCharacterX;
        characterY = newCharacterY;
        drawMap();
    }
});


const grassImage = new Image();
grassImage.src = './assets/img/ruta.png'; // Ruta a la imagen del pasto

const characterImage = new Image();
characterImage.src = './assets/img/knight.png'; // Ruta a la imagen del personaje


const zombiePoints = [];
const healingPoints = [];
const numberOfZombies = 7;
const numberOfHealingPoints = 4;

// Función para generar coordenadas aleatorias
function generateRandomCoordinates() {
    const x = Math.floor(Math.random() * (canvas.width - 5)); // 5 es el tamaño del punto
    const y = Math.floor(Math.random() * (canvas.height - 5)); // 5 es el tamaño del punto
    return { x, y };
}

// Llena el array de puntos de zombies
for (let i = 0; i < numberOfZombies; i++) {
    zombiePoints.push(generateRandomCoordinates());
}

// Llena el array de puntos de curación
for (let i = 0; i < numberOfHealingPoints; i++) {
    healingPoints.push(generateRandomCoordinates());
}


function drawMap() {
    // Dibujar el pasto usando la imagen con un ancho y alto de 500px x 500px
    for (let x = 0; x < canvas.width; x += 300) {
        for (let y = 0; y < canvas.height; y += 200) {
            ctx.drawImage(grassImage, x, y, 300, 200);
        }
    }
    ctx.fillStyle = 'black';
    zombiePoints.forEach(point => {
        ctx.fillRect(point.x, point.y, 5, 5); // Tamaño del punto
    });

    // Dibujar los puntos de curación
    ctx.fillStyle = 'green';
    healingPoints.forEach(point => {
        ctx.fillRect(point.x, point.y, 5, 5); // Tamaño del punto
    });
    // Dibujar el personaje usando la imagen con un ancho y alto de characterSize x characterSize
    ctx.drawImage(characterImage, characterX, characterY, characterSize, characterSize);
}

// Espera a que las imágenes se carguen antes de llamar a drawMap
grassImage.onload = function() {
    characterImage.onload = function() {
        drawMap();
    };
};

