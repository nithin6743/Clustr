import styles from './Board.module.css';

function DeleteWarning({ children, modal, setModal, deleteLink, deleteBoard }) {
  return (
    <>
      <h3>{children}</h3>
      <p>This action cannot be undone.</p>
      <div className={styles.deleteButtons}>
        <button className={styles.redButton} onClick={() => setModal(null)}>
          Cancel
        </button>

        {modal.type === 'deleteLink' && (
          <button
            onClick={() => {
              deleteLink(modal.data.boardId, modal.data.linkId);
              setModal(null);
            }}
          >
            Delete
          </button>
        )}
        {modal.type === 'deleteBoard' && (
          <button
            onClick={() => {
              deleteBoard(modal.data.boardId);
              setModal(null);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
}

export default DeleteWarning;
