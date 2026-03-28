export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            // This is key: it stops the AI from 'overthinking' and just answers
            thinkingBudget: 0 
          }
        })
      }
    );

    const data = await response.json();

    // 1. Check for API-level errors (Quota, Key issues, etc.)
    if (data.error) {
      console.error("GOOGLE ERROR:", data.error.message);
      return res.status(400).json({ reply: `Error: ${data.error.message}` });
    }

    // 2. Advanced extraction (Gemini 2.5 can have multiple 'parts')
    const parts = data?.candidates?.[0]?.content?.parts || [];
    
    // We look for the part that actually contains 'text'
    const textPart = parts.find(p => p.text);
    const reply = textPart ? textPart.text : "AI returned an empty response.";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("VERCEL ERROR:", error);
    res.status(500).json({ reply: "Connection failed. Check Vercel logs." });
  }
}