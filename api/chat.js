export default async function handler(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { prompt } = req.body;

    // 1. Added the missing comma after the URL
    // 2. Switched to v1beta to ensure all Gemini 2.5 features work
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          // 3. Added thinkingBudget to prevent "hanging" or slow responses
          generationConfig: {
            thinkingBudget: 0 
          }
        })
      }
    );

    const data = await response.json();

    // Log the full data to your Vercel logs for debugging
    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text)
        .join("\n") || "No response from AI";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ reply: "Server error - check Vercel logs" });
  }
}