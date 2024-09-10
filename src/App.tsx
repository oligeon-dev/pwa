import { useEffect } from "react";
import styles from "./App.module.css";

function App() {
  useEffect(() => {
    // ビューポートの高さを設定する関数
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // 初回ロード時とリサイズ時にビューポートの高さを調整
    window.addEventListener("resize", adjustHeight);
    adjustHeight();

    // クリーンアップ: イベントリスナーを削除
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);
  return (
    <>
      <div
        className={styles.container}
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <input type="number" />
        <div className={styles.footer}>footer</div>
      </div>
    </>
  );
}

export default App;
