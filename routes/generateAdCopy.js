import express from "express";
import { getOpenAIClient } from "../utils/openaiClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { product, audience, tone, n = 3 } = req.body;

  const openai = getOpenAIClient(); // ✅ now dotenv is already loaded

  const prompt = `
You are an ad copywriter.
Generate ${n} headlines and ${n} descriptions for
Product: "${product}", Audience: "${audience}", Tone: "${tone}".
Output JSON: {"headlines": [...], "descriptions": [...]}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    let parsed;
    try {
      parsed = JSON.parse(completion.choices[0].message.content);
    } catch {
      parsed = { headlines: ["Example headline"], descriptions: ["Example description"] };
    }

    res.json({ status: "success", ...parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

export default router;
