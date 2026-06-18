import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import styles from './AddBoard.module.css';

export default function AddBoard({
  addboard,
  setAddBoardButton,
  setToast,
  settings,
}) {
  const [boardTitle, setBoardTitle] = useState('');
  const [columnNum, setColumnNum] = useState('col1');

  function handleSubmit(boardTitle, columnNum) {
    if (!boardTitle || !columnNum) {
      setTimeout(() => {
        setToast({
          id: crypto.randomUUID(),
          type: 'error',
          message: 'Failed to create board (empty title)',
        });
      }, 150);
      return;
    }

    addboard(boardTitle, columnNum);
    setBoardTitle('');
    setAddBoardButton(false);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setAddBoardButton(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div
      className={styles.addboardDiv}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.125,
      }}
    >
      <h3
        className={styles.addBoardTitle}
        style={{ color: settings.darkMode ? '#ffffffda' : '#00000092' }}
      >
        Add new Board
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(boardTitle, columnNum);
        }}
      >
        <div className={styles.columns}>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col1');
            }}
            style={{ color: settings.darkMode ? '#ffffffda' : '#00000092' }}
            className={columnNum === 'col1' ? styles.active : styles.default}
          >
            Col1
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col2');
            }}
            style={{ color: settings.darkMode ? '#ffffffda' : '#00000092' }}
            className={columnNum === 'col2' ? styles.active : styles.default}
          >
            Col2
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col3');
            }}
            style={{ color: settings.darkMode ? '#ffffffda' : '#00000092' }}
            className={columnNum === 'col3' ? styles.active : styles.default}
          >
            Col3
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setColumnNum('col4');
            }}
            style={{ color: settings.darkMode ? '#ffffffda' : '#00000092' }}
            className={columnNum === 'col4' ? styles.active : styles.default}
          >
            Col4
          </button>
        </div>
        <input
          type='text'
          autoFocus
          placeholder={boardTitle ? '' : 'Enter board name...'}
          className={styles.boardTitleInput}
          value={boardTitle}
          onChange={(e) => {
            setBoardTitle(e.target.value);
          }}
          style={{ color: settings.darkMode ? '#ffffffda' : '#00000092' }}
        />
        <div className={styles.buttons}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            className={styles.cancelAddBoard}
            onClick={(e) => {
              e.preventDefault();
              setAddBoardButton(false);
            }}
            style={{ color: settings.darkMode ? '#fca935' : '#fff' }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={styles.addBoardButton}
            type='submit'
          >
            Add Board
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
