import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useSyncExternalStore, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Reel } from "./reel.jsx";
import { useStoryboardGenerator } from "./use-storyboard-generator.jsx";
import { LoadingSpinner } from "./loading-spinner.jsx";
const room = new WebsimSocket();
const App = () => {
  const reels = useSyncExternalStore(
    room.collection("reels_v1").subscribe,
    room.collection("reels_v1").getList
  );
  const [prompt, setPrompt] = useState("");
  const { isGenerating, generateStoryboard } = useStoryboardGenerator();
  const [showGenerator, setShowGenerator] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    if (!isGenerating && reels.length === 0) {
      setShowGenerator(true);
    } else {
      setShowGenerator(false);
    }
  }, [reels, isGenerating]);
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    const storyboard = await generateStoryboard(prompt);
    if (storyboard) {
      await room.collection("reels_v1").create({ storyboard });
      setPrompt("");
      if (containerRef.current) {
        setTimeout(() => {
          containerRef.current.children[0]?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };
  const onScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop === 0;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (reels.length > 0 && (isAtTop || isAtBottom)) {
      const generatorElement = isAtTop ? container.children[0] : container.children[container.children.length - 1];
      generatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "app-container", ref: containerRef, onScroll, children: [
    /* @__PURE__ */ jsxDEV("div", { id: "generator-top", className: "generator-container", children: /* @__PURE__ */ jsxDEV(
      GeneratorView,
      {
        prompt,
        setPrompt,
        handleGenerate,
        isGenerating,
        message: reels.length > 0 ? "Scroll up to create a new reel" : "Create the first reel!"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 60,
        columnNumber: 13
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 9
    }),
    reels.map((reel) => /* @__PURE__ */ jsxDEV("div", { className: "reel-container", children: /* @__PURE__ */ jsxDEV(Reel, { reelData: reel.storyboard }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 71,
      columnNumber: 13
    }) }, reel.id, false, {
      fileName: "<stdin>",
      lineNumber: 70,
      columnNumber: 13
    })),
    reels.length > 0 && /* @__PURE__ */ jsxDEV("div", { id: "generator-bottom", className: "generator-container", children: /* @__PURE__ */ jsxDEV(
      GeneratorView,
      {
        prompt,
        setPrompt,
        handleGenerate,
        isGenerating,
        message: "You've reached the end. Create a new reel!"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 77,
        columnNumber: 17
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 76,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 58,
    columnNumber: 5
  });
};
const GeneratorView = ({ prompt, setPrompt, handleGenerate, isGenerating, message }) => {
  if (isGenerating) {
    return /* @__PURE__ */ jsxDEV("div", { className: "loading-container", children: [
      /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 95,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "loading-message", children: "Generating your masterpiece..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 96,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 94,
      columnNumber: 13
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "generator-ui", children: [
    /* @__PURE__ */ jsxDEV("h1", { children: "AI Reels" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 103,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("p", { children: message }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 104,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      "textarea",
      {
        className: "prompt-input",
        rows: "3",
        value: prompt,
        onChange: (e) => setPrompt(e.target.value),
        placeholder: "e.g., A dog learning to surf"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        className: "generate-button",
        onClick: handleGenerate,
        disabled: isGenerating,
        children: "Generate"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 112,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 102,
    columnNumber: 9
  });
};
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 125,
  columnNumber: 13
}));
