import { useState } from 'react';
import styles from './AddBoard.module.css';

export default function AddBoard({ addboard, setAddBoardButton }) {
  const [boardTitle, setBoardTitle] = useState('');
  const [columnNum, setColumnNum] = useState('');

  function handleSubmit(boardTitle, columnNum) {
    if (!boardTitle || !columnNum) {
      alert('Select Column and Fill board name');
      return;
    }

    addboard(boardTitle, columnNum);
    setBoardTitle('');
    setAddBoardButton(false);
  }

  return (
    <div className={styles.addboardDiv}>
      <h3 className={styles.addBoardTitle}>Add new Board</h3>
      <form
        onSubmit={() => {
          handleSubmit(boardTitle, columnNum);
        }}
      >
        <input
          type='text'
          className={styles.boardTitleInput}
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <div className={styles.columns}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col1');
            }}
            className={columnNum === 'col1' ? styles.active : styles.default}
          >
            Col1
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col2');
            }}
          >
            Col2
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col3');
            }}
          >
            Col3
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col4');
            }}
          >
            Col4
          </button>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.addBoardButton}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(boardTitle, columnNum);
            }}
          >
            Add Board
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAddBoardButton(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
