import styles from './AddBoard.module.css';

export default function AddBoard() {
  return (
    <>
      <h3 className={styles.addBoardTitle}>Add new Board</h3>
      <div className={styles.columns}>
        <button>Col1</button>
        <button>Col2</button>
        <button>Col3</button>
        <button>Col4</button>
      </div>
      <input type='text' className={styles.boardTitleInput} />
      <div className={styles.buttons}>
        <button className={styles.addBoardButton}>Add Board</button>
        <button>Cancel</button>
      </div>
    </>
  );
}
