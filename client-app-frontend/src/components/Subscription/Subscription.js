import { useState } from "react";
import styles from "./Subscription.module.css";

export default function Subsription() {

const [activeSub, setActiveSub] = useState("Open");
const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
const options = ["Open", "Week", "Student", "Senior"];
const Informations = {"Open": {price: 22, avability: "every time", lenght: "1 month"}, "Week": {price: 62, avability: "every time", lenght: "1 month"},
"Student": {price: 52, avability: "every time", lenght: "1 month"}, "Senior": {price: 12, avability: "every time", lenght: "12 month"}}
  
  const handleSubChange = (sub) => {
    setActiveSub(sub)
  };

  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  }

  const handleClose = () => {
    setIsConfirmationOpen(false);
  }

  const handleConfirm = () => {
    setIsConfirmationOpen(false);
  }

  return (
    <div>
    <div className={styles.viewList}>
      {options.map((opt) => (
        <div
          key={opt}
          className={`${styles.view} ${
            activeSub === opt ? styles.active : ""
          }`}W
          onClick={() => handleSubChange(opt)}
        >
          <div className={styles.text}>{opt}</div>
        </div>
      ))}
    </div>
    <div className={styles.info}>
        <div>{activeSub}</div>
        <div>Price: {Informations[activeSub].price}</div>
        <div>Avability: {Informations[activeSub].avability}</div>
        <div>Lenght: {Informations[activeSub].lenght}</div>
        <button className={styles.button} onClick={openConfirmationDialog}>Wybieram ten pakiet</button>
    </div>
    {isConfirmationOpen && (
      <div className={styles.confirmContainer}>
        <div className={styles.confirmBox}>
          <span className={styles.closeButton} onClick={handleClose}>
            &times;
          </span>
          <div className={styles.question}> Czy jesteś pewien że chcesz zmienić pakiet na: {activeSub}?</div>
          <button className={styles.confirmButton} onClick={handleConfirm}>Tak</button>
        </div>
      </div>
    )}
    </div>
  );
}
