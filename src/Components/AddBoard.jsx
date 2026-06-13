import { useState } from 'react';
import styles from './AddBoard.module.css';

export default function AddBoard({ addboard, setAddBoardButton }) {
  const [boardTitle, setBoardTitle] = useState('');
  const [columnNum, setColumnNum] = useState('col1');

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
            className={columnNum === 'col2' ? styles.active : styles.default}
          >
            Col2
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col3');
            }}
            className={columnNum === 'col3' ? styles.active : styles.default}
          >
            Col3
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col4');
            }}
            className={columnNum === 'col4' ? styles.active : styles.default}
          >
            Col4
          </button>
        </div>
        <input
          type='text'
          placeholder={boardTitle ? '' : 'Enter board name...'}
          className={styles.boardTitleInput}
          value={boardTitle}
          onChange={(e) => {
            setBoardTitle(e.target.value);
          }}
        />
        <div className={styles.buttons}>
          <button
            className={styles.cancelAddBoard}
            onClick={(e) => {
              e.preventDefault();
              setAddBoardButton(false);
            }}
            style={{ backgroundColor: '#61390064' }}
          >
            Cancel
          </button>
          <button
            style={{ backgroundColor: '#fca935' }}
            className={styles.addBoardButton}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(boardTitle, columnNum);
            }}
          >
            Add Board
          </button>
        </div>
      </form>
    </div>
  );
}
