import React, { useState } from "react";
const useStoryboardGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const generateStoryboard = async (prompt) => {
    setIsGenerating(true);
    try {
      const llmResponse = await websim.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a highly creative and visionary film director for a short video platform. A user will give you a prompt, and your job is to turn it into a compelling, visually stunning short video storyboard.

Think about pacing, visual storytelling, and emotional impact. You can decide the number of scenes (between 2 and 5) that best serves the story.

For each scene, you must provide:
1.  A short, evocative line of text for narration.
2.  A detailed, artistic image prompt for an AI image generator. The prompt should aim for a photorealistic or cinematic style.
3.  Creative positioning for the text on the screen.

Your response must be a JSON object containing an array of scenes. Each scene object must have:
-   \`text\`: The narration text (string).
-   \`imagePrompt\`: The image generation prompt (string).
-   \`textPosition\`: An object specifying the text's alignment on the screen. It must have two properties:
    -   \`vertical\`: can be one of 'top', 'middle', 'bottom'.
    -   \`horizontal\`: can be one of 'left', 'center', 'right'.

Example format for a prompt "a story about a lonely robot finding a friend":
{
  "scenes": [
    {
      "text": "In a world of rust and steel, one heart ticked alone.",
      "imagePrompt": "cinematic, photorealistic shot of a small, sad robot sitting alone on a pile of scrap metal, looking at a grey, overcast sky. Moody, atmospheric lighting.",
      "textPosition": { "vertical": "bottom", "horizontal": "center" }
    },
    {
      "text": "Until a flicker of warmth appeared.",
      "imagePrompt": "photorealistic close-up on the robot's metallic hand as a small, glowing butterfly lands on its finger. Shallow depth of field, focus on the butterfly.",
      "textPosition": { "vertical": "top", "horizontal": "right" }
    },
    {
      "text": "A new connection sparked to life.",
      "imagePrompt": "photorealistic wide shot of the robot and the glowing butterfly, now friends, watching a vibrant sunset together from a hilltop overlooking a futuristic city.",
      "textPosition": { "vertical": "middle", "horizontal": "center" }
    }
  ]
}`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        json: true
      });
      const storyboard = JSON.parse(llmResponse.content);
      const scenesWithAssets = await Promise.all(
        storyboard.scenes.map(async (scene) => {
          const [imageResult, audioResult] = await Promise.all([
            websim.imageGen({
              prompt: scene.imagePrompt,
              aspect_ratio: "9:16"
            }),
            websim.textToSpeech({
              text: scene.text,
              voice: "en-female"
            })
          ]);
          return {
            ...scene,
            imageUrl: imageResult.url,
            audioUrl: audioResult.url
          };
        })
      );
      return { scenes: scenesWithAssets };
    } catch (error) {
      console.error("Error generating storyboard:", error);
      alert("Sorry, something went wrong while creating the reel. Please try again.");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };
  return { isGenerating, generateStoryboard };
};
export {
  useStoryboardGenerator
};
