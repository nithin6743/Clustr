import styles from './Board.module.css';
function Link() {
  return (
    <div className={styles.links}>
      <a href='https://google.com' className={styles.linkContent}>
        <img src='/icons/youtube.png' />
        <span className={styles.linkText}>
          figma freelancinf ideasgndfxgndg dgf ndf gn dg
        </span>
      </a>
      <button
        className={styles.deleteLink}
        onClick={(e) => {
          e.stopPropagation();
          alert('Delete ah deyyyyyyyy');
        }}
      >
        <img src='/icons/delete.svg' />
      </button>
    </div>
  );
}

export default Link;
