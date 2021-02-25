import React from 'react';
import styles from '../styles/components/Profile.module.css';

export const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://picsum.photos/200" alt="Random Image" />
      <div>
        <strong>Bruno Souza</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1</p>
      </div>
    </div>
  )
}
