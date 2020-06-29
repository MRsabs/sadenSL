// use chrono::prelude::*;
use neon::prelude::*;
use num_format::{Locale, ToFormattedString};

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("Hello from rust"))
}

fn uuid_v4(mut cx: FunctionContext) -> JsResult<JsString> {
    let x = uuid::Uuid::new_v4().to_simple().to_string();
    Ok(cx.string(x))
}

fn nwc(mut cx: FunctionContext) -> JsResult<JsString> {
    let x = cx.argument::<JsString>(0)?.value();
    let x = x.parse::<u32>().unwrap();
    let x = x.to_formatted_string(&Locale::en);
    Ok(cx.string(x))
}

fn unix_now(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let x = chrono::Utc::now().to_rfc2822().to_string();
    let x = chrono::DateTime::parse_from_rfc2822(x.as_str()).unwrap();
    Ok(cx.number(x.timestamp() as f64))
}

register_module!(mut m, {
    m.export_function("nwc", nwc)?;
    m.export_function("hello", hello)?;
    m.export_function("unixNow", unix_now)?;
    m.export_function("uuidV4", uuid_v4)?;
    Ok(())
});
