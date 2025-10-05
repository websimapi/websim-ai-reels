import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useSyncExternalStore, useRef, useCallback } from "react";
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
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      { root: container, threshold: 0.8 }
    );
    const reelElements = Array.from(
      container.querySelectorAll(".reel-container")
    );
    reelElements.forEach((el) => observer.observe(el));
    return () => {
      reelElements.forEach((el) => observer.unobserve(el));
    };
  }, [reels.length]);
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    const storyboard = await generateStoryboard(prompt);
    if (storyboard) {
      const newReel = await room.collection("reels_v1").create({ storyboard });
      setPrompt("");
      setTimeout(() => {
        if (containerRef.current) {
          const newReelIndex = reels.length;
          const newReelElement = containerRef.current.querySelector(`[data-index="${newReelIndex}"]`);
          if (newReelElement) {
            newReelElement.scrollIntoView({ behavior: "smooth" });
            setActiveIndex(newReelIndex);
          }
        }
      }, 200);
    }
  };
  const onScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop < 5;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5;
    if (reels.length > 0) {
      if (isAtTop) {
        const generatorElement = container.children[0];
        generatorElement.scrollIntoView({ behavior: "smooth" });
      } else if (isAtBottom) {
        const generatorElement = container.children[container.children.length - 1];
        generatorElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  useEffect(() => {
    lucide.createIcons();
  });
  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("div", { className: "app-container", ref: containerRef, onScroll, children: [
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
          lineNumber: 101,
          columnNumber: 11
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 100,
        columnNumber: 9
      }),
      reels.map((reel, index) => /* @__PURE__ */ jsxDEV("div", { className: "reel-container", "data-index": index, children: /* @__PURE__ */ jsxDEV(
        Reel,
        {
          reelData: reel.storyboard,
          isActive: index === activeIndex,
          isMuted
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 116,
          columnNumber: 13
        }
      ) }, reel.id, false, {
        fileName: "<stdin>",
        lineNumber: 115,
        columnNumber: 11
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
          lineNumber: 126,
          columnNumber: 13
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 125,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 99,
      columnNumber: 7
    }),
    reels.length > 0 && /* @__PURE__ */ jsxDEV("button", { className: "unmute-button", onClick: toggleMute, children: isMuted ? /* @__PURE__ */ jsxDEV("i", { "data-lucide": "volume-x" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 138,
      columnNumber: 24
    }) : /* @__PURE__ */ jsxDEV("i", { "data-lucide": "volume-2" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 138,
      columnNumber: 57
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 137,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 98,
    columnNumber: 5
  });
};
const GeneratorView = ({ prompt, setPrompt, handleGenerate, isGenerating, message }) => {
  if (isGenerating) {
    return /* @__PURE__ */ jsxDEV("div", { className: "loading-container", children: [
      /* @__PURE__ */ jsxDEV(LoadingSpinner, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 150,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "loading-message", children: "Generating your masterpiece..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 151,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 149,
      columnNumber: 13
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "generator-ui", children: [
    /* @__PURE__ */ jsxDEV("h1", { children: "AI Reels" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 158,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("p", { children: message }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 159,
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
        lineNumber: 160,
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
        lineNumber: 167,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 157,
    columnNumber: 9
  });
};
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 180,
  columnNumber: 13
}));
