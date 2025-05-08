import Chat from "./components/Chat";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.gettingStarted}>
        <Chat />
      </section>
    </div>
  );
}
