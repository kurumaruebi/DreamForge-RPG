require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 共通のアニメスタイルプロンプト (ご提示いただいた画像のテイストを維持)
const ANIME_STYLE = "Vibrant anime style, delicate lines, ethereal atmosphere, high quality, soft cinematic lighting, 9:16 vertical aspect ratio. (Character should NOT hold a sword, modern/dreamy outfit).";

app.post('/api/forge', async (req, res) => {
  const { prompt, style } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // 1. RPGのストーリーと画像プロンプトを生成
    const systemInstruction = `
      You are an expert RPG Game Master. Create a Dreamcore/Liminal Space RPG stage based on the user's prompt.
      Return the response EXCLUSIVELY in JSON format:
      {
        "title": "Stage Title",
        "story": "Atmospheric scene description (short, mysterious)",
        "character_dialogue": "AI companion Luna's first message to the player",
        "choices": [
          {"id": "1", "text": "Choice A text", "result_hint": "Hint for next scene"},
          {"id": "2", "text": "Choice B text", "result_hint": "Hint for next scene"}
        ],
        "image_prompt": "Specific visual prompt for Nano Banana (describe environment and Luna's pose/outfit)",
        "ambient_sound": "Description of foley sound (e.g., distant humming, wind, chime)"
      }
      User's Dream: ${prompt}
      Style: ${style}
    `;

    const result = await model.generateContent(systemInstruction);
    const responseText = result.response.text();
    // JSON部分だけを抽出 (バッククォート等が含まれる場合があるため)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to parse JSON from Gemini");
    
    const stageData = JSON.parse(jsonMatch[0]);

    // 2. Nano Banana で画像を生成 (プロンプトの連結)
    const finalImagePrompt = `${stageData.image_prompt}. Style: ${ANIME_STYLE}`;
    console.log("Generating image with prompt:", finalImagePrompt);

    // TODO: ここで Nano Banana API (Google Cloud Vertex AI 等) を呼び出す
    // ハッカソンデモ用に、現在は生成されたプロンプトとデータを返却
    // ※実際の Nano Banana API 呼び出しコードを追加可能
    
    res.json({
      ...stageData,
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error forging dream:", error);
    res.status(500).json({ error: "Failed to forge dream: " + error.message });
  }
});

app.listen(port, () => {
  console.log(`DreamForge Backend listening at http://localhost:${port}`);
});
