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
          contents: [{ 
            role: "user", 
            parts: [{ text: prompt }] 
          }],
          generationConfig: {
            // "thinkingBudget" MUST be inside "thinkingConfig"
            thinkingConfig: {
              thinkingBudget: 0 
            },
            temperature: 1.0,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();

    // Log this so you can see the error in Vercel if it fails again
    if (data.error) {
      console.error("API Error:", data.error.message);
      return res.status(400).json({ reply: `Error: ${data.error.message}` });
    }

    // Extracting the text (skipping any 'thought' parts)
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const textPart = parts.find(p => p.text);
    const reply = textPart ? textPart.text : "No response text found.";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "Connection Error" });
  }
}