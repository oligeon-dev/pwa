import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.container}>
        <p>version1</p>
        <input type="number" />
        <div className={styles.footer}>footer</div>
      </div>
    </>
  );
}

export default App;
