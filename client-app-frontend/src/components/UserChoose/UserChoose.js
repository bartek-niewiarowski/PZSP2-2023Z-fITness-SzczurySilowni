import { useState } from "react";
import styles from "./UserChoose.module.css";

export default function UserChoose({ options, onChangeView, activeView }) {
  
  const handleViewClick = (view) => {
    onChangeview(view);
  };

  return (
    <div>
    <div className={styles.viewList}>
      {options.map((view) => (
        <div
          key={view}
          className={`${styles.view} ${
            activeView === view ? styles.active : ""
          }`}W
          onClick={() => handleviewClick(view)}
        >
          <div className={styles.text}>{view}</div>
        </div>
      ))}
    </div>
    <div className={styles.chosed}>{activeView}</div>
    </div>
  );
}