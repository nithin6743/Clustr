import { useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './SearchModal.module.css';

export default function SearchModal({
  searchQuery,
  setSearchQuery,
  setSearchOpen,
  results,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);
  return (
    <>
      <div className={styles.backDrop} onClick={() => setSearchOpen(false)}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.125,
          }}
          className={styles.searchModal}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            //   className={`${styles.searchBar} ${glass.glass}`}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type='text'
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder='Search Bookmarks... '
              className={styles.searchInput}
            />
            <svg
              className={styles.icon}
              xmlns='http://www.w3.org/2000/svg'
              width='24px'
              height='24px'
              viewBox='0 0 12 12'
            >
              <path d='M0 0h12v12H0z' fill='none' />
              <path
                fill='rgba(255, 255, 255, 0.5)'
                d='M5 1a4 4 0 1 0 2.452 7.16l2.694 2.693a.5.5 0 1 0 .707-.707L8.16 7.453A4 4 0 0 0 5 1M2 5a3 3 0 1 1 6 0a3 3 0 0 1-6 0'
              />
            </svg>
          </form>
          <div className={styles.results}>
            {results.map((result) => {
              console.log(result);
              return (
                <a
                  href={result.url}
                  className={styles.indieResult}
                  key={result.Id}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${result.url}`}
                    alt=''
                  />
                  <span className={styles.linkText}>{result.title}</span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}
