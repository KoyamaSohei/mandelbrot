import { SCALE, DX, DY, WIDTH, HEIGHT} from './constants';

const param = new URLSearchParams(window.location.search);

export const scale = Number(param.get('scale') || undefined) || SCALE;
export const dx = Number(param.get('dx') || undefined) || DX;
export const dy = Number(param.get('dy') || undefined) || DY;
export const width = Number(param.get('width') || undefined) || WIDTH;
export const height = Number(param.get('height') || undefined) || HEIGHT;
