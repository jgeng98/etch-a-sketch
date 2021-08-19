// UIs
const canvas = document.querySelector("#canvas");
const gridToggleButton = document.querySelector("#toggle");
const clearGridButton = document.querySelector("#clear");

// enums
const Tools = Object.freeze({
  PEN: Symbol("Pen"),
  ERASER: Symbol("Eraser"),
  FILL: Symbol("Fill"),
  EYEDROPPER: Symbol("Eyedropper"),
  RAINBOW: Symbol("Rainbow"),
});

const gridSize = Object.freeze({
  SMALL: Symbol("Small"),
  MEDIUM: Symbol("Medium"),
  LARGE: Symbol("Large"),
});

// event listeners
gridToggleButton.addEventListener("click", toggleGrid);

clearGridButton.addEventListener("click", clearGrid);

// starting values
let showGrid = false;
let pixels;

// etch-a-sketch functionality
function getGridSize(size) {
  // sets the grid size, used in the createGrid function
  let gridCSS;
  switch (size) {
    // small grid size: 16x22
    case 352:
      gridCSS = "repeat(22, auto)";
      break;
    // medium (default) grid size: 32x44
    case 1408:
      gridCSS = "repeat(44, auto)";
      break;
    // large grid size: 64x88
    case 5632:
      gridCSS = "repeat(88, auto)";
      break;
  }

  return gridCSS;
}

function createGrid(size = 32 * 44) {
  // erases current grid and resets the rows and columns
  canvas.textContent = "";

  canvas.style.gridTemplateColumns = getGridSize(size);

  // create pixel in the grid
  const pixelDiv = document.createElement("div");
  pixelDiv.classList.add("pixel");
  pixelDiv.style.backgroundColor = "white";

  // clones the above pixel and adds it to the canvas
  for (let i = 0; i < size; i++) {
    let divClone = pixelDiv.cloneNode(true);
    canvas.append(divClone);
  }

  pixels = document.querySelectorAll(".pixel");
}

function toggleGrid() {
  // if grid is currently showing, get rid of the border on each pixel to toggle it off
  if (showGrid) {
    pixels.forEach((pixel) => {
      pixel.style.border = "";
    });
    showGrid = false;
    // if grid isn't showing, add borders to each pixel to toggle it on
  } else {
    pixels.forEach((pixel) => {
      pixel.style.border = "1px solid rgba(0, 0, 0, 0.25)";
    });
    showGrid = true;
  }
}

function clearGrid() {}

createGrid();
