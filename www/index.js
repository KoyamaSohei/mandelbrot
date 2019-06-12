import { World, Cell } from "mandelbrot";
import { memory } from 'mandelbrot/mandelbrot_bg';
import { dx, dy, width, height, scale } from './param';
import { drawCells } from './draw';
import './panel';

const world = World.new(width,height);

const renderLoop = () => {
  world.tick(scale,dx,dy);
  drawCells({world,Cell,memory});
  requestAnimationFrame(renderLoop);
};


renderLoop();