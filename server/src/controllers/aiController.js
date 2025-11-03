import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askAI = async (text, res = null) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: text }],
    });

    const reply = response.choices[0].message.content;

    // لو الطلب جاي من API HTTP
    if (res) {
      return res.status(200).json({ reply });
    }

    // لو الطلب جاي من تلغرام
    return reply;
  } catch (err) {
    console.error("AI Error:", err);

    if (res) {
      return res.status(500).json({ error: "AI request failed" });
    }

    return "⚠️ حدث خطأ في الذكاء الاصطناعي";
  }
};
