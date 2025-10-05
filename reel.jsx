import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useEffect } from "react";
import { Player } from "@websim/remotion/player";
import { MyComposition } from "./composition.jsx";
const DURATION_IN_FRAMES = 300;
const FPS = 30;
const COMPOSITION_WIDTH = 540;
const COMPOSITION_HEIGHT = 960;
const Reel = ({ reelData, isActive }) => {
  const playerRef = useRef(null);
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isActive) {
      player.play();
    } else {
      player.pause();
      player.seekTo(0);
    }
  }, [isActive]);
  if (!reelData) {
    return /* @__PURE__ */ jsxDEV("div", { children: "Loading reel..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 26,
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
      lineNumber: 30,
      columnNumber: 9
    }
  );
};
export {
  Reel
};
