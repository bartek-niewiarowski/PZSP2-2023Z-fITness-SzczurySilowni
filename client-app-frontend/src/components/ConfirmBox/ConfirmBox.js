import styles from "./ConfirmBox.module.css";

// Komponent implementujacy uniwersalny komunikat do uzytkownika, zatwierdzenie moze wywolywac wybrane akcje
export default function ConfirmBox({message, onConfirm, onClose}) {
    return (
    <div className={styles.confirmContainer}>
        <div className={styles.confirmBox}>
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
          <div className={styles.question}> {message}</div>
          <button className={styles.confirmButton} onClick={onConfirm}>Tak</button>
        </div>
    </div>
    );
}
