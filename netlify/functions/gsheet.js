exports.handler = async (event) => {
  const GAS_BASE = "https://script.google.com/macros/s/AKfycbxAm7OgFyiJ46qOt97XLEQ2BcUef2lsQ58YSuF6YVL3PsuO5cCQtDHOxLvVtN6nM0SF/exec";

  // إعداد خيارات الطلب
  const options = {
    method: event.httpMethod, // سيأخذ POST أو GET حسب ما نرسله من الموقع
    headers: { "Content-Type": "application/json" }
  };

  // إذا كان الطلب POST (تحديث)، نرسل البيانات (Body)
  if (event.httpMethod === "POST") {
    options.body = event.body;
  }

  const qs = event.rawQuery || "";
  const target = qs ? `${GAS_BASE}?${qs}` : GAS_BASE;

  try {
    const r = await fetch(target, options);
    const text = await r.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Fetch failed", details: String(err) })
    };
  }
};
