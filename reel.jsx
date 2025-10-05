import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useEffect } from "react";
import { Player } from "@websim/remotion/player";
import { MyComposition } from "./composition.jsx";
const DURATION_IN_FRAMES = 300;
const FPS = 30;
const COMPOSITION_WIDTH = 540;
const COMPOSITION_HEIGHT = 960;
const Reel = ({ reelData, isActive, isMuted }) => {
  const playerRef = useRef(null);
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.mute();
    } else {
      player.unmute();
    }
  }, [isMuted]);
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isActive) {
      const playPromise = player.play();
      if (playPromise !== void 0) {
        playPromise.catch((error) => {
          console.error("Autoplay was prevented: ", error);
          player.mute();
          player.play();
        });
      }
    } else {
      player.pause();
      player.seekTo(0);
    }
  }, [isActive]);
  if (!reelData) {
    return /* @__PURE__ */ jsxDEV("div", { children: "Loading reel..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 48,
      columnNumber: 16
    });
  }
  return /* @__PURE__ */ jsxDEV(
    Player,
    {
      ref: playerRef,
      component: MyComposition,
      durationInFrames: DURATION_IN_FRAMES,
      fps: FPS,
      compositionWidth: COMPOSITION_WIDTH,
      compositionHeight: COMPOSITION_HEIGHT,
      loop: true,
      autoPlay: true,
      muted: true,
      style: {
        width: "100%",
        height: "100%",
        maxWidth: `${COMPOSITION_WIDTH}px`,
        maxHeight: `${COMPOSITION_HEIGHT}px`
      },
      inputProps: reelData
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 52,
      columnNumber: 9
    }
  );
};
export {
  Reel
};
