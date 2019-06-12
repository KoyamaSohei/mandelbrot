mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

use std::fmt;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    In = 0,
    Out = 1,
}

#[wasm_bindgen]
pub struct World {
    width: u32,
    height: u32,
    cells: Vec<(f64,f64)>,
    status: Vec<Cell>
}

#[wasm_bindgen]
impl World {
    pub fn tick(&mut self,scale: f64,dx: f64,dy: f64) {
        let mut next = self.cells.clone();
        let mut nxts = self.status.clone();
        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.getindex(row, col);
                let (re,im) = self.cells[idx];
                let stat = self.status[idx];
                if stat == Cell::In {
                    let real = re * re - im * im + (((col) as f64  * 4.0 / (scale * self.width as f64)) as f64 - 2.0/ scale) + dx / scale;
                    let image = 2.0 * re * im + (((row) as f64 * 4.0 / (scale * self.height as f64)) as f64 - 2.0/ scale) - dy / scale;
                    let mut isin = Cell::In;
                    if  real * real + image * image > 2 as f64 {
                        isin = Cell::Out;
                    }
                    next[idx] = (real,image);
                    nxts[idx] = isin;
                }
            }
        }
        self.cells = next;
        self.status = nxts;
    }
    fn getindex(&self,row: u32,colmun: u32) -> usize {
        (row * self.width + colmun) as usize
    }

    pub fn new(w: u32,h: u32) -> World {
        let width : u32 = w;
        let height : u32 = h;
        let mut cells: Vec<(f64,f64)> = vec![(0 as f64,0 as f64);(width*height) as usize];
        let mut status: Vec<Cell> = vec![Cell::In;(width*height) as usize];
        
        World {
            width,
            height,
            cells,
            status
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn status(&self) -> *const Cell {
        self.status.as_ptr()
    }
}

