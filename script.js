// UIs
const canvas = document.querySelector("#canvas");
const gridToggleButton = document.querySelector("#toggle");
const clearGridButton = document.querySelector("#clear");
const gridSizes = document.querySelectorAll("input[name='grid-size']");

// enums
const Tools = Object.freeze({
  PEN: Symbol("Pen"),
  ERASER: Symbol("Eraser"),
  RAINBOW: Symbol("Rainbow"),
});

// starting values
let showGrid = false;
let mouseDown;
let pixels;

// etch-a-sketch functionality
function getSelectedTool() {
  // determines which tool is currently selected
  let selectedTool = document.querySelector("input[name='tool']:checked");

  // returns the selected tool based on ID name
  switch (selectedTool.id) {
    case "draw":
      return Tools.PEN;
    case "erase":
      return Tools.ERASER;
    case "rainbow":
      return Tools.RAINBOW;
  }
}

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

  // select all the newly created pixels to use later
  pixels = document.querySelectorAll(".pixel");
}

function useTool() {
  // determines which tool is currently selected
  let currentTool = getSelectedTool();

  // calls the appropriate function depending on the selected tool
  switch (currentTool) {
    case Tools.PEN:
      drawPixel();
      break;
    case Tool.ERASER:
      erasePixel();
      break;
    case Tool.RAINBOW:
      drawRainbowPixel();
      break;
  }
}

function drawPixel() {}

function erasePixel() {}

function drawRainbowPixel() {}

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

// event listeners
// determines if the mouse is currently "clicked" down
document.addEventListener("mousedown", () => {
  mouseDown = false;
});

// determines if the mouse has been "unclicked"
document.addEventListener("mouseup", () => {
  mouseDown = true;
});

// event listeners for grid toggle and clear grid buttons
gridToggleButton.addEventListener("click", toggleGrid);
clearGridButton.addEventListener("click", clearGrid);

// event listener for the selected grid size
gridSizes.forEach((gridSize) => {
  gridSize.addEventListener("change", (event) => {
    getSelectedGridSize(event.currentTarget.id);
  });
});

// event listeners for each pixel in the grid
pixels.forEach((pixel) => {
  pixel.addEventListener("mousedown", (e) => {
    useTool(e.currentTarget);
  });
  pixel.addEventListener("mouseenter", (e) => {
    if (mouseDown) {
      useTool(e.currentTarget);
    }
  });
});
