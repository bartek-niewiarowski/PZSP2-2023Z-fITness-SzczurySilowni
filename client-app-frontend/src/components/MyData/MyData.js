import { useState } from "react"
import styles from "./MyData.module.css"

export default function MyData() {
    const [name, setName] = useState('Jan');
    const [surname, setSurname] = useState('Kowalski');
    const [birthdate, setBirthdate] = useState("07.05.2002");
    const plan = "Open"
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Tutaj możesz obsłużyć zatwierdzenie zmian, na przykład wysłać dane na serwer
        console.log('Zatwierdzono zmiany:', { name, birthdate });
      };
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                Imie:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Nazwisko:
                <input type="text" value={surname} onChange={(event) => setSurname(event.target.value)} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Data urodzenia:
                <input type="text" value={birthdate} onChange={(event) => setBirthdate(event.target.value)} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Aktywny pakiet:
                <input type="text" value={plan} disabled className={styles.input}/>
            </label>
            <button type="submit" onClick = {handleFormSubmit} className={styles.button}>Zatwierdź zmiany</button>
        </div>
    )
}