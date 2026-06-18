import styles from './Onboarding.module.css';
import glass from '../GlassUI.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Onboarding({ setShowOnboarding }) {
  function finish() {
    localStorage.setItem('clustr-onboarding-complete', 'true');

    setShowOnboarding(false);
  }

  return (
    <div className={styles.onboarding}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <div className={styles.slide}>
            <video autoPlay muted loop playsInline>
              <source src='/onboarding/settings.webm' type='video/webm' />
            </video>
            <h2 style={{ color: '#fff' }}>Automatic Bookmark Import</h2>
            <p style={{ color: '#fff' }}>
              Your browser bookmarks are imported automatically when Clustr is
              installed. New bookmarks are added automatically while Clustr is
              open.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide}>
            <video autoPlay muted loop playsInline>
              <source src='/onboarding/Topbar.webm' type='video/webm' />
            </video>

            <h2 style={{ color: '#fff' }}>Quick Access</h2>

            <p style={{ color: '#fff' }}>
              Search bookmarks instantly, create boards, and customize your
              workspace from a single toolbar.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slide}>
            <video autoPlay muted loop playsInline>
              <source src='/onboarding/Boards.webm' type='video/webm' />
            </video>

            <h2 style={{ color: '#fff' }}>Organize Your New Tab</h2>
            <p style={{ color: '#fff' }}>
              Create multiple boards and arrange them across columns to match
              your workflow. <br></br>Esc - cancel <br></br>Enter - confirm
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.slide}>
            <video autoPlay muted loop playsInline>
              <source src='/onboarding/links.webm' type='video/webm' />
            </video>
            <h2 style={{ color: '#fff' }}>Manage Links Easily</h2>

            <p style={{ color: '#fff' }}>
              Add, edit, delete, and drag links between boards without affecting
              your browser bookmarks.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.slide}>
            <button
              onClick={finish}
              className={`${styles.getStarted} ${glass.glass}`}
            >
              Get Started
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
