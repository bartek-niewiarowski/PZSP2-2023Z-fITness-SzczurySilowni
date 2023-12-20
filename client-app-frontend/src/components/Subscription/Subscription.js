import { useState } from "react";
import styles from "./Subscription.module.css";

export default function Subsription() {

const [activeSub, setActiveSub] = useState("Open");
const options = ["Open", "Week", "Student", "Senior"];
const Informations = {"Open": {price: 22, avability: "every time", lenght: "1 month"}, "Week": {price: 62, avability: "every time", lenght: "1 month"},
"Student": {price: 52, avability: "every time", lenght: "1 month"}, "Senior": {price: 12, avability: "every time", lenght: "12 month"}}
  
  const handleSubChange = (sub) => {
    setActiveSub(sub)
  };

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
    <div className={styles.chosed}>{activeSub}</div>
    <div className={styles.info}>
        <div>Price: {Informations[activeSub].price}</div>
        <div>Avability: {Informations[activeSub].avability}</div>
        <div>Lenght: {Informations[activeSub].lenght}</div>
    </div>
    </div>
  );
}