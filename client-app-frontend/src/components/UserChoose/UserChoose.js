import styles from "./UserChoose.module.css";

/**
 * Komponent implementujący przechodzenie między widokami w sekcji Klienta.
 * 
 * @component
 * @param {Object} props - Właściwości komponentu.
 * @param {Array} props.options - Dostępne opcje widoków.
 * @param {Function} props.onChangeView - Funkcja do zmiany aktywnego widoku.
 * @param {string} props.activeView - Aktualnie aktywny widok.
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący interfejs wyboru widoków.
 */
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
