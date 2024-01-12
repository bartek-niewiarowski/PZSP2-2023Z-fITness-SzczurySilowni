import { useState } from "react";
import styles from '../Register/Register.module.css';

const ExerciseForm = ({ isVisible, onCancel }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exerciseSets, setExerciseSets] = useState(1);
  const [exerciseWeight, setExerciseWeight] = useState('');
  const [exerciseRepetitions, setExerciseRepetitions] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Walidacja pól formularza, możesz dostosować do własnych potrzeb
    if (!exerciseName || !exerciseDescription || !exerciseWeight) {
      alert('Proszę wypełnić wszystkie pola formularza.');
      return;
    }

    // Tworzenie obiektu ćwiczenia
    const newExercise = {
      name: exerciseName,
      description: exerciseDescription,
      sets: exerciseSets,
      weight: exerciseWeight,
      repetitions: exerciseRepetitions,
    };

    // Przekazanie nowego ćwiczenia do funkcji nadrzędnej
    onCancel();

    // Zresetowanie stanu formularza po dodaniu ćwiczenia
    setExerciseName('');
    setExerciseDescription('');
    setExerciseSets(1);
    setExerciseWeight('');
    setExerciseRepetitions(1);
  };

  return (
    <div className={isVisible ? styles.loginContainer : styles.hidden}>
      <div className={`${styles.formContainer} ${styles.loginBox}`}>
        <span className={styles.closeButton} onClick={onCancel}>&times;</span>
        <h1 className={styles.title}>Dodaj Ćwiczenie</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Nazwa ćwiczenia:
            <input
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className={`${styles.textBox} ${styles.input}`}
            />
          </label>

          <label className={styles.label}>
            Opis ćwiczenia:
            <textarea
              value={exerciseDescription}
              onChange={(e) => setExerciseDescription(e.target.value)}
              className={`${styles.textBox} ${styles.input}`}
            />
          </label>

          <label className={styles.label}>
            Ilość serii:
            <input
              type="number"
              value={exerciseSets}
              onChange={(e) => setExerciseSets(parseInt(e.target.value, 10))}
              className={`${styles.textBox} ${styles.input}`}
            />
          </label>

          <label className={styles.label}>
            Ciężar:
            <input
              type="text"
              value={exerciseWeight}
              onChange={(e) => setExerciseWeight(e.target.value)}
              className={`${styles.textBox} ${styles.input}`}
            />
          </label>

          <label className={styles.label}>
            Ilość powtórzeń:
            <input
              type="number"
              value={exerciseRepetitions}
              onChange={(e) => setExerciseRepetitions(parseInt(e.target.value, 10))}
              className={`${styles.textBox} ${styles.input}`}
            />
          </label>

          <button type="submit" className={`${styles.button} ${styles.input}`}>
            Dodaj Ćwiczenie
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseForm;
