import { useState } from "react";
import styles from '../Register/Register.module.css';

/**
 * Komponent formularza do dodawania nowego ćwiczenia do planu treningowego.
 *
 * @component
 * @param {Object} props - Właściwości komponentu.
 * @param {boolean} props.isVisible - Flaga określająca widoczność formularza.
 * @param {Function} props.onCancel - Funkcja obsługująca anulowanie dodawania ćwiczenia.
 * @param {number} props.trainingId - Identyfikator treningu, do którego dodawane jest ćwiczenie.
 * @returns {JSX.Element} - Zwraca element JSX reprezentujący formularz dodawania ćwiczenia.
 */
const ExerciseForm = ({ isVisible, onCancel, trainingId }) => {
  const [exerciseName, setExerciseName] = useState(null);
  const [exerciseEquipment, setExerciseEquipment] = useState(null);
  /**
   * Generuje unikalny identyfikator ćwiczenia składający się z sześciu cyfr.
   *
   * @returns {number} - Unikalny identyfikator ćwiczenia.
   */
  const generateSixDigitId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Losowa liczba od 100000 do 999999
  };
  /**
   * Obsługuje przesłanie formularza do dodania nowego ćwiczenia.
   *
   * @param {Event} e - Obiekt zdarzenia formularza.
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Walidacja pól formularza, możesz dostosować do własnych potrzeb
    if (!exerciseName || !exerciseEquipment) {
      alert('Proszę wypełnić wszystkie pola formularza.');
      return;
    }

    try{
      const newExercise = {
        exercise_id: generateSixDigitId(),
        name: exerciseName,
        training: trainingId,
        equipment: exerciseEquipment
      };
      console.log(JSON.stringify(newExercise));
     newExercise.equipment = parseInt(newExercise.equipment, 10);
     newExercise.training = parseInt(newExercise.training, 10);
      const response = await fetch('http://localhost:8000/trainer/get_exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExercise),
      });
      if (response.ok) {
        // Spotkanie zostało dodane pomyślnie
        const result = await response.json();
        console.log(result);
      } else {
        // Obsługa błędu, jeśli wystąpił
        console.error('Błąd podczas dodawania spotkania');
      }
    } catch (error) {
      console.error('Error adding Appointment:', error);
    }
    onCancel();

    // Zresetowanie stanu formularza po dodaniu ćwiczenia
    setExerciseName('');
    setExerciseEquipment(null);
  };

  return (
    <div className={isVisible ? styles.loginContainer : styles.hidden}>
      <div className= {styles.loginBox}>
        <span className={styles.closeButton} onClick={onCancel}>&times;</span>
        <h1 className={styles.title}>Dodaj Ćwiczenie</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <label className={styles.label}/>
            Nazwa ćwiczenia:
            <input
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className={styles.input}
            />
          <label className={styles.label}/>
            Id maszyny:
            <input
              type="number"
              value={exerciseEquipment}
              onChange={(e) => setExerciseEquipment(e.target.value)}
              className={styles.input}
            />
          <button type="submit" className={styles.button}>
            Dodaj Ćwiczenie
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseForm;
