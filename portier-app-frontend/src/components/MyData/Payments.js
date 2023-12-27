import styles from './MyData.module.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ConfirmBox from '../ConfirmBox/ConfirmBox';

export default function Payments() {
    const [saldo, setSaldo] = useState(-100);
    const [pay, setPay] = useState("");
    const { userId } = useParams();
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const openConfirmationDialog = () => {
        setIsConfirmationOpen(true);
    }

    const closeConfirmationDialog = () => {
        setIsConfirmationOpen(false);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Tutaj możesz obsłużyć zatwierdzenie zmian, na przykład wysłać dane na serwer
        setSaldo((prevSaldo) => prevSaldo + Number(pay));
        setPay("");
        closeConfirmationDialog()
      };
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Płatności</h2>
            <label className={styles.label}>
                Saldo konta:
                <input type="text" value={saldo}  disabled onChange={(event) => setSaldo(event.target.value)} className={styles.input}/>
            </label>
            <h2 className={styles.header}>Zarejestruj płatność</h2>
            <label className={styles.label}>
                Wpłata:
                <input type="text" value={pay} onChange={(event) => setPay(event.target.value)} className={styles.input}/>
            </label>
            <button type="submit" onClick = {openConfirmationDialog} className={styles.button}>Zatwierdź zmiany</button>
            {isConfirmationOpen && <ConfirmBox message="Czy potwierdzasz dokonanie płatności?" onConfirm={handleFormSubmit} onClose={closeConfirmationDialog}/>}
        </div>
    );
}