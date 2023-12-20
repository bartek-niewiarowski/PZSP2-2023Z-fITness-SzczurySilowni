import { useState } from "react";
import styles from "./UserChoose.module.css";

export default function UserChoose({ categories, onChangeCategory, activeView }) {
  
  const handleCategoryClick = (category) => {
    onChangeCategory(category);
  };

  return (
    <div>
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <div
          key={category}
          className={`${styles.category} ${
            activeView === category ? styles.active : ""
          }`}W
          onClick={() => handleCategoryClick(category)}
        >
          <div className={styles.text}>{category}</div>
        </div>
      ))}
    </div>
    <div className={styles.chosed}>{activeView}</div>
    </div>
  );
}