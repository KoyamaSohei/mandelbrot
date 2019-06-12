import { CELL_SIZE } from './constants';
import { width, height } from './param';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.height = (CELL_SIZE) * height + 1;
canvas.width = (CELL_SIZE) * width + 1;

const getIndex = (row, column) => {
  return row * width + column;
};

let cnt = 1;

export const drawCells = ({world,Cell,memory}) => {
  const cellsPtr = world.status();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = `rgba(${Math.min(255,cnt)},0,0,0.01)`
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