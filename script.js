// UIs
const canvas = document.querySelector("#canvas");
const gridToggleButton = document.querySelector("#toggle");
const clearGridButton = document.querySelector("#clear");
const gridSizes = document.querySelectorAll("input[name='grid-size']");

// enums
const Tools = Object.freeze({
  PEN: Symbol("Pen"),
  ERASER: Symbol("Eraser"),
  FILL: Symbol("Fill"),
  EYEDROPPER: Symbol("Eyedropper"),
  RAINBOW: Symbol("Rainbow"),
});

const gridSize = Object.freeze({
  SMALL: 16 * 22,
  MEDIUM: 32 * 44,
  LARGE: 64 * 88,
});

// event listeners
gridToggleButton.addEventListener("click", toggleGrid);

clearGridButton.addEventListener("click", clearGrid);

gridSizes.forEach((gridSize) => {
  gridSize.addEventListener("change", (event) => {
    console.log(event.currentTarget.id);
    getSelectedGridSize(event.currentTarget.id);
  });
});

// starting values
let showGrid = false;
let pixels;

// etch-a-sketch functionality
function getSelectedTool() {}

function getSelectedGridSize(currentSizeID) {
  // sets the grid size, used in the createGrid function
  switch (currentSizeID) {
    // small grid size: 16x22
    case "sm-grid":
      createGrid((size = 16 * 22), (gridColumns = "repeat(22, auto)"));
      break;
    // medium (default) grid size: 32x44
    case "med-grid":
      createGrid((size = 32 * 44), (gridColumns = "repeat(44, auto)"));
      break;
    // large grid size: 64x88
    case "lg-grid":
      createGrid((size = 64 * 88), (gridColumns = "repeat(88, auto)"));
      break;
  }
}

function createGrid(size = 32 * 44, gridColumns = "repeat(44, auto)") {
  // erases current grid and resets the rows and columns
  canvas.textContent = "";

  canvas.style.gridTemplateColumns = gridColumns;

  console.log(canvas.style.gridTemplateColumns);

  // create pixel in the grid
  const pixelDiv = document.createElement("div");
  pixelDiv.classList.add("pixel");
  pixelDiv.style.backgroundColor = "white";

  // if grid was already toggled on, keep it showing
  if (showGrid) {
    pixelDiv.style.border = "1px solid rgba(0, 0, 0, 0.25)";
  }

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
