import { useEffect, useRef, useState } from "react";
// import styles from "./App.module.css";

function App() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [bottom, setBottom] = useState<string>("0px");

  useEffect(() => {
    const registerPushupEvent = () => {
      // if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) return;

      const handleResize = (event: Event) => {
        const target = event.target as VisualViewport;
        const keyboardHeight = window.innerHeight - target.height;
        const bottomValue =
          keyboardHeight === 0 ? "0px" : `${keyboardHeight}px`;
        setBottom(bottomValue);
      };

      const visualViewport = window.visualViewport;
      if (visualViewport) {
        visualViewport.addEventListener("resize", handleResize);
      }

      return () => {
        if (visualViewport) {
          visualViewport.removeEventListener("resize", handleResize);
        }
      };
    };

    registerPushupEvent();
    console.info("bottom", bottom);
  }, []);

  return (
    <div>
      <input
        type="text"
        // style={{ backgroundColor: "" }}
        placeholder="test"
      />
      <button
        ref={buttonRef}
        style={{
          width: "100vw",
          position: "fixed",
          bottom: bottom,
          left: "0",
          backgroundColor: "black",
          color: "#fff",
          textAlign: "center",
          lineHeight: "50px",
          fontWeight: "bold",
          transition: "bottom 0.3s",
        }}
      >
        sample button
      </button>
    </div>
  );
}

export default App;
