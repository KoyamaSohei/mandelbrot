import { World, Cell } from "mandelbrot";
import { memory } from "mandelbrot/mandelbrot_bg";

const CELL_SIZE = 1; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";


const world = World.new();
const width = world.width();
const height = world.height();

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("canvas");
canvas.height = (CELL_SIZE) * height + 1;
canvas.width = (CELL_SIZE) * width + 1;

const ctx = canvas.getContext('2d');

const renderLoop = () => {
  world.tick();
  drawCells();
  requestAnimationFrame(renderLoop);
};

const getIndex = (row, column) => {
  return row * width + column;
};

const drawCells = () => {
  const cellsPtr = world.status();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === Cell.Out
        ? DEAD_COLOR
        : ALIVE_COLOR;
      ctx.fillRect(
        col * (CELL_SIZE ) + 1,
        row * (CELL_SIZE) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }
  ctx.stroke();
};

renderLoop();
