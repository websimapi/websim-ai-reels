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
            content: `You are a creative assistant for a short video platform. Based on the user's prompt, create a storyboard for a 10-second video. The video should have 3 scenes. For each scene, provide a short, punchy line of text for narration, and a detailed image prompt for an AI image generator. The image prompt should be photorealistic. Respond with a JSON object containing an array of scenes, where each scene has a 'text' and 'imagePrompt' property.
                        Example format:
                        {
                          "scenes": [
                            {"text": "A new day begins.", "imagePrompt": "photorealistic close up of a cat yawning, stretching in a sunbeam, warm lighting"},
                            {"text": "Adventure is calling.", "imagePrompt": "photorealistic shot of the same cat looking out a window at a bird, curious expression"},
                            {"text": "The world is its playground.", "imagePrompt": "photorealistic wide shot of the cat playfully pouncing on a toy mouse in a living room"}
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
