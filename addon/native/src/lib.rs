use neon::prelude::*;
use num_format::{Locale, ToFormattedString};

fn nwc(mut cx: FunctionContext) -> JsResult<JsString> {
    let x = cx.argument::<JsString>(0)?.value();
    let x = x.parse::<u32>().unwrap();
    let x = x.to_formatted_string(&Locale::en);
    Ok(cx.string(x))
}

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("from rust"))
}

register_module!(mut m, {
    m.export_function("nwc", nwc)?;
    m.export_function("hello", hello)?;
    Ok(())
});
