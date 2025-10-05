import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import {
  AbsoluteFill,
  Img,
  Audio,
  Series,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig
} from "remotion";
import {
  linearTiming,
  TransitionSeries
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
const MyComposition = ({ scenes }) => {
  if (!scenes || scenes.length === 0) {
    return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#111", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV("p", { style: { color: "white", fontSize: 40, textAlign: "center", padding: 20 }, children: "Invalid reel data. Please generate a new one." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 22,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 21,
      columnNumber: 7
    });
  }
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "black" }, children: [
    /* @__PURE__ */ jsxDEV(TransitionSeries, { children: scenes.map((scene, index) => /* @__PURE__ */ jsxDEV(React.Fragment, { children: [
      /* @__PURE__ */ jsxDEV(TransitionSeries.Sequence, { durationInFrames: 90, children: /* @__PURE__ */ jsxDEV(Scene, { ...scene }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 33,
        columnNumber: 15
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 32,
        columnNumber: 13
      }),
      index < scenes.length - 1 && /* @__PURE__ */ jsxDEV(
        TransitionSeries.Transition,
        {
          timing: linearTiming({ durationInFrames: 15 }),
          presentation: fade()
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 36,
          columnNumber: 15
        }
      )
    ] }, index, true, {
      fileName: "<stdin>",
      lineNumber: 31,
      columnNumber: 11
    })) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Series, { children: scenes.map((scene, index) => /* @__PURE__ */ jsxDEV(Series.Sequence, { durationInFrames: 105, children: scene.audioUrl && /* @__PURE__ */ jsxDEV(Audio, { src: scene.audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 47,
      columnNumber: 34
    }) }, index, false, {
      fileName: "<stdin>",
      lineNumber: 46,
      columnNumber: 12
    })) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 44,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 28,
    columnNumber: 5
  });
};
const Scene = ({ imageUrl, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imageScale = spring({
    frame,
    fps,
    from: 1,
    to: 1.1,
    durationInFrames: 90
  });
  const textOpacity = interpolate(frame, [0, 20, 70, 90], [0, 1, 1, 0]);
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: [
    /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: imageUrl,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${imageScale})`
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 71,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)"
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 80,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 40px"
        },
        children: /* @__PURE__ */ jsxDEV(
          "p",
          {
            style: {
              color: "white",
              fontSize: 48,
              fontWeight: "bold",
              textAlign: "center",
              opacity: textOpacity,
              textShadow: "0px 0px 10px rgba(0,0,0,0.8)"
            },
            children: text
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 92,
            columnNumber: 9
          }
        )
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 85,
        columnNumber: 7
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 70,
    columnNumber: 5
  });
};
export {
  MyComposition
};
