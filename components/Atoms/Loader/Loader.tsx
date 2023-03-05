import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.pl}>
      <div className={styles.plOuterRing}></div>
      <div className={styles.plInnerRing}></div>
      <div className={styles.plTrackCover}></div>
      <div className={styles.plBall}>
        <div className={styles.plBallTexture}></div>
        <div className={styles.plBallOuterShadow}></div>
        <div className={styles.plBallInnerShadow}></div>
        <div className={styles.plBallSideShadow}></div>
      </div>
    </div>
  );
};

export default Loader;
