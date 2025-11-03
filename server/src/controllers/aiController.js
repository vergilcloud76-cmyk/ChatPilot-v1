import OpenAI from "openai";

const client = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
});

export const askAI = async (req, res) => {
 try {
   const { message } = req.body;

   const response = await client.chat.completions.create({
     model: "gpt-4.1-mini",
     messages: [
       { role: "system", content: "You are an assistant helping a social media automation bot." },
       { role: "user", content: message }
     ]
   });

   res.json({ reply: response.choices[0].message.content });
 } catch (error) {
   console.error("AI Error:", error);
   res.status(500).json({ error: "AI request failed" });
 }
};
