import styles from './Settings.module.css';
import { motion } from 'motion/react';

export default function Settings({ settings, setSettings }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.125,
      }}
      className={styles.settings}
    >
      <h3 style={{ color: settings.darkMode ? '#fff' : '#000' }}>Settings</h3>
      <div
        className={styles.settingsMenu}
        style={{ color: settings.darkMode ? '#fff' : '#000' }}
      >
        <div className={styles.themeSettings}>
          <p>Theme</p>
          <div>
            <span
              className={styles.settingName}
              style={{ color: settings.darkMode ? '#ffffffda' : '#000000c6' }}
            >
              Dark mode
            </span>
            <label className={styles.switch}>
              <input
                type='checkbox'
                checked={settings.darkMode}
                onChange={(e) => {
                  setSettings((prev) => ({
                    ...prev,
                    darkMode: e.target.checked,
                  }));
                }}
              />
              <span className={`${styles.slider} ${styles.round}`} round></span>
            </label>
          </div>
        </div>
        <div className={styles.layoutSettings}>
          <p>Layout</p>
          <div className={styles.layout}>
            <div>
              <span
                className={styles.settingName}
                style={{ color: settings.darkMode ? '#ffffffda' : '#000000c6' }}
              >
                Search Bar
              </span>
              <label className={styles.switch}>
                <input
                  type='checkbox'
                  checked={settings.showSearchBar}
                  onChange={(e) => {
                    setSettings((prev) => ({
                      ...prev,
                      showSearchBar: e.target.checked,
                    }));
                  }}
                />
                <span
                  className={`${styles.slider} ${styles.round}`}
                  round
                ></span>
              </label>
            </div>
            <div>
              <span
                className={styles.settingName}
                style={{ color: settings.darkMode ? '#ffffffda' : '#000000c6' }}
              >
                Quicklinks
              </span>
              <label className={styles.switch}>
                <input
                  type='checkbox'
                  checked={settings.showQuickLinks}
                  onChange={(e) => {
                    setSettings((prev) => ({
                      ...prev,
                      showQuickLinks: e.target.checked,
                    }));
                  }}
                />
                <span
                  className={`${styles.slider} ${styles.round}`}
                  round
                ></span>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.backgroundSettings}>
          <p>Visuals</p>
          <div>
            <span
              className={styles.settingName}
              style={{ color: settings.darkMode ? '#ffffffda' : '#000000c6' }}
            >
              Animated background
            </span>
            <label className={styles.switch}>
              <input
                type='checkbox'
                checked={settings.animatedBackground}
                onChange={(e) => {
                  setSettings((prev) => ({
                    ...prev,
                    animatedBackground: e.target.checked,
                  }));
                }}
              />
              <span className={`${styles.slider} ${styles.round}`} round></span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
