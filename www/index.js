import { World, Cell } from "mandelbrot";
import { memory } from "mandelbrot/mandelbrot_bg";

const CELL_SIZE = 1; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

let scale = 1;
let dx = 0;
let dy = 0;
let width = 500;
let height = 500;

const s = prompt("scale(default=1)");
const x = prompt("dx(default=0)");
const y = prompt("dy(default=0)");
const w = prompt("width(default=500)");
const h = prompt("height(default=500)");
if(s != "" && Number(s) != NaN) scale = Number(s);
if(x != "" && Number(x) != NaN) dx = Number(x);
if(y != "" && Number(y) != NaN) dy = Number(y);
if(w != "" && Number(w) != NaN) width = Number(w);
if(h != "" && Number(h) != NaN) height = Number(w);

const world = World.new(width,height);

const canvas = document.getElementById("canvas");
canvas.height = (CELL_SIZE) * height + 1;
canvas.width = (CELL_SIZE) * width + 1;

const ctx = canvas.getContext('2d');

const renderLoop = () => {
  world.tick(scale,dx,dy);
  drawCells();
  requestAnimationFrame(renderLoop);
};

const getIndex = (row, column) => {
  return row * width + column;
};

let cnt = 1;

const drawCells = () => {
  const cellsPtr = world.status();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = `rgba(${Math.min(255,cnt)},0,0,0.1)`
      if(cells[idx] == Cell.Out) {
        ctx.fillRect(
          col * (CELL_SIZE ) + 1,
          row * (CELL_SIZE) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
      
    }
  }
  ctx.stroke();
  cnt = cnt * 2;
};

renderLoop();