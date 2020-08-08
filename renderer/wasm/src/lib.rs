mod utils;
use num_format::{Locale, ToFormattedString};
use wasm_bindgen::prelude::*;

// // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// // allocator.
// #[cfg(feature = "wee_alloc")]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

#[wasm_bindgen]
pub fn nwc(number: i32) -> String {
    let number = number.to_formatted_string(&Locale::en);
    return number;
}

// #[wasm_bindgen]
// pub fn greet() -> f64 {
//     return 10 as f64;
// }
