let moleTileCurrent;
let plantTileCurrent;
let currentScore = 0;
let isGameOver = false;

window.onload = function () {
  initializeGame();
};

function initializeGame() {
  // Set up the grid in HTML
  for (let i = 0; i < 9; i++) { 
    // i goes from 0 to 8, stops at 9
    // <div id="0-8"></div>
    let gridTile = document.createElement("div");
    gridTile.id = i.toString();
    gridTile.addEventListener("click", handleTileSelection);
    document.getElementById("board").appendChild(gridTile);
  }

  setInterval(displayMole, 1000); // Call displayMole every second
  setInterval(displayPlant, 2000); // Call displayPlant every 2 seconds
}

function getRandomTileIndex() {
  // Math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
  let randomIndex = Math.floor(Math.random() * 9);
  return randomIndex.toString();
}

function displayMole() {
  if (isGameOver) return;

  if (moleTileCurrent) {
    moleTileCurrent.innerHTML = "";
  }

  let moleImage = document.createElement("img");
  moleImage.src = "images/monty-mole.png";

  let randomIndex = getRandomTileIndex();

  if (plantTileCurrent && plantTileCurrent.id == randomIndex) {
    return; // Avoid placing mole where plant is
  }

  moleTileCurrent = document.getElementById(randomIndex);
  moleTileCurrent.appendChild(moleImage);
}

function displayPlant() {
  if (isGameOver) return;

  if (plantTileCurrent) {
    plantTileCurrent.innerHTML = "";
  }

  let plantImage = document.createElement("img");
  plantImage.src = "images/piranha-plant.png";

  let randomIndex = getRandomTileIndex();

  if (moleTileCurrent && moleTileCurrent.id == randomIndex) {
    return; // Avoid placing plant where mole is
  }

  plantTileCurrent = document.getElementById(randomIndex);
  plantTileCurrent.appendChild(plantImage);
}

function handleTileSelection() {
  if (isGameOver) return;

  // Handle scoring and game over logic
  if (this == moleTileCurrent) {
    currentScore += 10;
    document.getElementById("score").innerText = currentScore.toString(); // Update score
  } else if (this == plantTileCurrent) {
    document.getElementById("score").innerText = "GAME OVER: " + currentScore.toString(); // Display game over
    isGameOver = true;
    return; // Stop further processing after game over
  }

  // Swap positions of mole and plant if both exist
  if (moleTileCurrent && plantTileCurrent) {
    let moleImage = moleTileCurrent.firstChild;
    let plantImage = plantTileCurrent.firstChild;

    // Clear existing images
    moleTileCurrent.innerHTML = "";
    plantTileCurrent.innerHTML = "";

    // Swap images
    moleTileCurrent.appendChild(plantImage);
    plantTileCurrent.appendChild(moleImage);

    // Update references to swapped tiles
    let tempTile = moleTileCurrent;
    moleTileCurrent = plantTileCurrent;
    plantTileCurrent = tempTile;
  }
}
