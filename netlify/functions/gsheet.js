exports.handler = async (event) => {
  const GAS_BASE =
    "https://script.google.com/macros/s/AKfycbwMtciGVBDO8N7bcT03wJFW4Jb8NDVlW2omC9coa9t6Im8zSri5haEzWjmJaBulela8/exec";

  const qs = event.rawQuery || "";
  const target = qs ? `${GAS_BASE}?${qs}` : GAS_BASE;

  try {
    const r = await fetch(target);
    const text = await r.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300"
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: "Proxy fetch failed", details: String(err) })
    };
  }
};

