import React from 'react';
import { useEffect, useState } from 'react';
import styles from './TrainingSession.module.css';
import ExerciseForm from './ExerciseForm';

const TrainingSession = ({ trainingData, isTrainer }) => {
  const [exercises, setExercises] = useState([
    {
      exercise_id: 1,
      name: 'Przysiady',
      description: 'Podstawowe ćwiczenie siłowe angażujące wiele grup mięśniowych.',
      sets: 3,
      weight: '60 kg',
      repetitions: 12,
    },
    {
      exercise_id: 2,
      name: 'Wyciskanie sztangi leżąc',
      description: 'Ćwiczenie rozwoju mięśni klatki piersiowej.',
      sets: 4,
      weight: '80 kg',
      repetitions: 10,
    },
    {
      exercise_id: 3,
      name: 'Martwy ciąg',
      description: 'Skomplikowane ćwiczenie angażujące wiele grup mięśniowych, zwłaszcza plecy i nogi.',
      sets: 3,
      weight: '100 kg',
      repetitions: 8,
    },
    {
      exercise_id: 4,
      name: 'Podciąganie na drążku',
      description: 'Ćwiczenie wzmacniające mięśnie pleców.',
      sets: 3,
      weight: 'Ciążar ciała',
      repetitions: 10,
    },
  ]);
  const [canDelete, setCanDelete] = useState(false);
  const [canComment, setCanComment] = useState(false);
  const [addExercise, setAddExercise] = useState(false);
  const [comment, setComment] = useState(trainingData.comment);

  // Funkcja do pobierania ćwiczeń na podstawie appointment_id (do implementacji)
  const fetchData = async () => {
    try {
      if (trainingData && trainingData.appointment_id) {
        const response = await fetch(`http://localhost:8000/client/exercises_api/${trainingData.appointment_id}`);
        const result = await response.json();
        if (result) {
          setExercises(result);

          const startDate = new Date(trainingData.planned_start);
          const endDate = new Date(trainingData.planned_end);
          const currentDate = new Date();
          setCanDelete(isTrainer && startDate.getTime() > currentDate.getTime());
          setCanComment(isTrainer && endDate.getTime() < currentDate.getTime());          
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteExercise = () => {
    // Implementuj logikę usuwania treningu (do implementacji)
    console.log('Usunięcie treningu');
  };

  const handleCancelTraining = () => {
    console.log('Odwolanie treningu');
  }

  const handleAddComment = () => {
    
  }

  const handleAddExercise = () => {
    setAddExercise(true);
  }

  const handleClose = () => {
    setAddExercise(false);
  }

  useEffect(() => {
    //fetchData();
  }, [trainingData, isTrainer]); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz (po zamontowaniu komponentu)

  return (
    <div>
      <h1>Trening na Siłowni</h1>
      {/* Wywołanie funkcji fetchExercises z appointmentId (do implementacji) */}
      {/* fetchExercises(appointmentId); */}
      {exercises.map((exercise) => (
        <div key={exercise.exercise_id}>
          <h2>{exercise.name}</h2>
          <p><strong>Opis:</strong> {exercise.description}</p>
          <p><strong>Ilość serii:</strong> {exercise.sets}</p>
          <p><strong>Ciężar:</strong> {exercise.weight}</p>
          <p><strong>Ilość powtórzeń:</strong> {exercise.repetitions}</p>
          {canDelete && (
            <button onClick={handleDeleteExercise} className={styles.button}>
              Usuń ćwiczenie
            </button>
          )}
          <hr />
        </div>
      ))}
      {canDelete && (
            <button onClick={handleCancelTraining} className={styles.button}>
              Odwołaj trening
            </button>
          )}
      {canDelete && (
            <button onClick={handleAddExercise} className={styles.button}>
              Dodaj ćwiczenie
            </button>
          )}
      <ExerciseForm onCancel={handleClose} isVisible={addExercise}/>
      {canComment && (
          <div className={styles.flexContainer}>
            <textarea
                placeholder="Dodaj komentarz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={styles.textarea}
            />
            <button onClick={handleAddComment} className={styles.comment}>
                Dodaj komentarz
            </button>
          </div>
      )}
    </div>
  );
};

export default TrainingSession;
