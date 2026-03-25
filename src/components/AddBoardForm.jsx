import styles from './Board.module.css';

function AddBoardForm({ addBoard, setModal }) {
  return (
    <form
      className={styles.addBoardForm}
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        addBoard(title);
        setModal(null);
      }}
    >
      <input
        className={styles.inputTitle}
        name='title'
        placeholder='Board name'
      />
      <div className={styles.addBoardButtons}>
        <button
          type='button'
          className={styles.redButton}
          onClick={() => setModal(null)}
        >
          Cancel
        </button>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
}

export default AddBoardForm;
