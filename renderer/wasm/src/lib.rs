use num_format::{Locale, ToFormattedString};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn nwc(number: JsValue) -> JsValue {
    let number = number.as_f64();
    match number {
        None => JsValue::from_bool(false),
        Some(quotient) => {
            let tmp = quotient as i64;
            let x = tmp.to_formatted_string(&Locale::en);
            let x = JsValue::from(x);
            return x;
        }
    }
}
