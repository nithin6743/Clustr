import styles from './Board.module.css';

function Link({ link, boardId, setModal }) {
  return (
    <div className={styles.links}>
      <a href={link.url} className={styles.linkContent}>
        <img src={link.favicon} />
        <span className={styles.linkText}>{link.title}</span>
      </a>
      <button
        className={styles.deleteLink}
        onClick={(e) => {
          e.stopPropagation();
          setModal({
            type: 'deleteLink',
            data: { boardId, linkId: link.id },
          });
        }}
      >
        <img src='/icons/delete.svg' />
      </button>
    </div>
  );
}

export default Link;
