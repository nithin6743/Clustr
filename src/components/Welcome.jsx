import styles from './Board.module.css';

function Welcome({ setModal }) {
  return (
    <div className={styles.welcomeCard}>
      <h3 className={styles.welcomeTitle}>Welcome</h3>
      <p className={styles.welcomeContent}>Your bookmarks have been imported.</p>
      <button onClick={() => setModal(null)}>Continue</button>
    </div>
  );
}

export default Welcome;
