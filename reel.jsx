import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Player } from "@websim/remotion/player";
import { MyComposition } from "./composition.jsx";
const DURATION_IN_FRAMES = 300;
const FPS = 30;
const COMPOSITION_WIDTH = 540;
const COMPOSITION_HEIGHT = 960;
const Reel = ({ reelData }) => {
  if (!reelData) {
    return /* @__PURE__ */ jsxDEV("div", { children: "Loading reel..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 12,
      columnNumber: 16
    });
  }
  return /* @__PURE__ */ jsxDEV(
    Player,
    {
      component: MyComposition,
      durationInFrames: DURATION_IN_FRAMES,
      fps: FPS,
      compositionWidth: COMPOSITION_WIDTH,
      compositionHeight: COMPOSITION_HEIGHT,
      loop: true,
      autoplay: true,
      controls: true,
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
      lineNumber: 16,
      columnNumber: 9
    }
  );
};
export {
  Reel
};
