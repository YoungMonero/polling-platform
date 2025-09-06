import React from "react";
import styles from "./Banner.module.css"


const Banner = () => {
    return (
        <div className={styles.heaade}>
            <div className={styles.line}>
<img width="50" height="50" src="https://img.icons8.com/sf-black-filled/64/poll-topic.png" alt="poll-topic"/>
            </div>
            <div className={styles.heaad}>
  <a href="https://www.facebook.com/YourPage" target="_blank" rel="noopener noreferrer">
    <img
      width="40"
      height="40"
      src="https://img.icons8.com/ios-glyphs/30/facebook-new.png"
      alt="facebook-new"
    />
  </a>

  <a href="https://twitter.com/YourHandle" target="_blank" rel="noopener noreferrer">
    <img
      width="40"
      height="40"
      src="https://img.icons8.com/color/48/twitterx--v1.png"
      alt="twitterx--v1"
    />
  </a>

  <a href="https://www.youtube.com/@YourChannel" target="_blank" rel="noopener noreferrer">
    <img
      width="40"
      height="40"
      src="https://img.icons8.com/ios-filled/50/youtube-play.png"
      alt="youtube-play"
    />
  </a>
</div>

        </div>
    )
}

export default Banner;