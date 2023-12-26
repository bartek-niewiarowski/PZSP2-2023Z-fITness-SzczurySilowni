import styles from "./ConfirmBox.module.css";

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
