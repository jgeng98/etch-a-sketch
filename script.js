function createGrid(length) {
  // erases current grid and resets the rows and columns
  canvas.textContent = "";

  canvas.style.gridTemplateColumns = `repeat(${length}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${length}, 1fr)`;

  // create pixel in the grid
  const pixelDiv = document.createElement("div");
  pixelDiv.classList.add("pixel");
  pixelDiv.style.backgroundColor = "white";

  // clones the above pixel and adds it to the canvas
  for (let i = 0; i < length ** 2; i++) {
    let divClone = pixelDiv.cloneNode(true);
    canvas.append(divClone);
  }
}

const canvas = document.querySelector("#canvas");

createGrid(10);
