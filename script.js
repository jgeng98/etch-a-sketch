function getGridSize(size) {
  let gridCSS;
  switch (size) {
    case 352:
      gridCSS = "repeat(22, auto)";
      break;
    case 1408:
      gridCSS = "repeat(44, auto)";
      break;
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
}

const canvas = document.querySelector("#canvas");

createGrid();
