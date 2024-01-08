import styles from "./UserChoose.module.css";

// Komponent implementujacy przechodzenie miedzy widokami w sekcji Klienta
export default function UserChoose({ options, onChangeView, activeView }) {
  
  const handleViewClick = (view) => {
    onChangeView(view);
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
          onClick={() => handleViewClick(view)}
        >
          <div className={styles.text}>{view}</div>
        </div>
      ))}
    </div>
    <div className={styles.chosed}>{activeView}</div>
    </div>
  );
}