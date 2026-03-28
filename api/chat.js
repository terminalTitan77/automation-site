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
            thinkingBudget: 0 // Ensures instant response
          }
        })
      }
    );

    const data = await response.json();

    // This helps you see the REAL error in your browser/app
    if (data.error) {
      return res.status(data.error.code || 500).json({ 
        reply: `Google API Error: ${data.error.message}` 
      });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text returned";
    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Server Connection Error" });
  }
}