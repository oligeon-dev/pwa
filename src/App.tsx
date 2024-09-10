import { useEffect } from "react";
import styles from "./App.module.css";

function App() {
  useEffect(() => {
    const handleResize = () => {
      const inputFocused =
        document.activeElement instanceof HTMLElement &&
        document.activeElement.tagName === "INPUT";
      const footer = document.querySelector(
        `.${styles.footer}`
      ) as HTMLElement | null;

      if (footer) {
        if (inputFocused) {
          footer.style.position = "static"; // キーボード表示中は通常フローに戻す
        } else {
          footer.style.position = "fixed"; // キーボードが隠れたら再び固定
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className={styles.container}>
        <p>version: 2</p>
        <input type="number" />
        <div className={styles.footer}>footer</div>
      </div>
    </>
  );
}

export default App;
