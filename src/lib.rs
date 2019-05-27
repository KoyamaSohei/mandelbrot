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
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();
        let mut nxts = self.status.clone();
        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.getindex(row, col);
                let (re,im) = self.cells[idx];
                let stat = self.status[idx];
                if stat == Cell::In {
                    let real = re * re - im * im + (((col * 4) as f64 / self.width as f64) as f64 - 2.0);
                    let image = (2 as f64) * re * im + (((row * 4) as f64 / self.height as f64) as f64 - 2.0);
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

    pub fn new() -> World {
        let width : u32 = 1000;
        let height : u32 = 1000;
        let mut cells: Vec<(f64,f64)> = vec![(0 as f64,0 as f64);(width*height) as usize];
        let mut status: Vec<Cell> = vec![Cell::In;(width*height) as usize];
        
        World {
            width,
            height,
            cells,
            status
        }
    }
    pub fn render(&self) -> String {
        self.to_string()
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

impl fmt::Display for World {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for line in self.status.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Out { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}
