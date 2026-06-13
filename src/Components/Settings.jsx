import styles from './Settings.module.css';

export default function Settings({ settings, setSettings }) {
  return (
    <div className={styles.settings}>
      <h3>Settings</h3>
      <div className={styles.settingsMenu}>
        <div className={styles.themeSettings}>
          <p>Theme</p>
          <div>
            <span className={styles.settingName}>Dark mode</span>
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
              <span className={styles.settingName}>Search Bar</span>
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
              <span className={styles.settingName}>Quicklinks</span>
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
            <span className={styles.settingName}>Animated background</span>
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
    </div>
  );
}
