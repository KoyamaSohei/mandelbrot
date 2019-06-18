import { width, height, dx, dy, scale } from './param';

const plus = document.querySelector('button.plus');
const minus = document.querySelector('button.minus');
const up = document.querySelector('button.up');
const down = document.querySelector('button.down');
const left = document.querySelector('button.left');
const right = document.querySelector('button.right');

console.log(plus);

plus.addEventListener('click',() => {
  reload(width,height,dx,dy,scale*2);
});
minus.addEventListener('click',() => {
  reload(width,height,dx,dy,scale/2);
});
up.addEventListener('click',() => {
  reload(width,height,dx,dy+1,scale);
});
down.addEventListener('click',() => {
  reload(width,height,dx,dy-1,scale);
});
left.addEventListener('click',() => {
  reload(width,height,dx-1,dy,scale);
});
right.addEventListener('click',() => {
  reload(width,height,dx+1,dy,scale);
});


const reload = (w,h,x,y,s) => {
  const p = new URLSearchParams();
  p.set('width',w);
  p.set('height',h);
  p.set('dx',x);
  p.set('dy',y);
  p.set('scale',s);
  window.location = `${window.location.href}/?${p.toString()}`;
}