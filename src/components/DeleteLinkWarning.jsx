import styles from './Board.module.css';

function DeleteLinkWarning({ modal, setModal, deleteLink }) {
  return (
    <>
      <h3>Delete Link?</h3>
      <p>This action cannot be undone.</p>
      <div className={styles.deleteLinksButtons}>
        <button className={styles.redButton} onClick={() => setModal(null)}>
          Cancel
        </button>

        <button
          onClick={() => {
            deleteLink(modal.data.boardId, modal.data.linkId);
            setModal(null);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default DeleteLinkWarning;
