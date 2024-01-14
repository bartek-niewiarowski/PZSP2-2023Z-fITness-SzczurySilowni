import React from 'react';
import { useEffect, useState } from 'react';
import styles from './TrainingSession.module.css';
import ExerciseForm from './ExerciseForm';

const TrainingSession = ({ gotTrainingData, isTrainer }) => {
  const [exercises, setExercises] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [canComment, setCanComment] = useState(false);
  const [addExercise, setAddExercise] = useState(false);
  const [trainingData, setTrainingData] = useState(gotTrainingData);

  // Funkcja do pobierania ćwiczeń na podstawie appointment_id (do implementacji)
  const fetchData = async () => {
    try {
      if (trainingData && trainingData.appointment_id) {
        const response = await fetch(`http://localhost:8000/trainer/get_exercises?training_id=${trainingData.appointment_id}`);
        const result = await response.json();
        if (result) {
          setExercises(result);
        }
        const startDate = new Date(trainingData.planned_start);
        const endDate = new Date(trainingData.planned_end);
        const currentDate = new Date();
        setCanDelete(isTrainer && startDate.getTime() > currentDate.getTime());
        setCanComment(isTrainer && endDate.getTime() < currentDate.getTime());          
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteExercise = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/trainer/get_exercises?exercise_id=${id}`, {
          method: 'DELETE',
      });
      if (response.ok) {
        console.log('Rekord został usunięty');
        window.location.reload();
      } else {
        console.error('Błąd podczas usuwania rekordu');
      }
      } catch (error) {
      console.error('Błąd delete:', error);
      }
  };

  const handleCancelTraining = async () => {
    try {
      const response = await fetch(`http://localhost:8000/trainer/delete_appointment/${trainingData.appointment_id}`, {
          method: 'DELETE',
      });
      if (response.ok) {
        console.log('Rekord został usunięty');
        window.location.reload();
      } else {
        console.error('Błąd podczas usuwania rekordu');
      }
      } catch (error) {
      console.error('Błąd delete:', error);
      }
  }

  const handleAddComment = async () => {
    try {
      console.log("Tutaj");
      console.log(trainingData);
      const response = await fetch(`http://localhost:8000/trainer/update_appointment/${trainingData.appointment_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainingData),
      })
      const result = await response.json();
      console.log(result);
    } catch(error)
    {
      console.error('Error fetching data:', error);
    }
  };

  
  const handleAddExercise = () => {
    setAddExercise(true);
  }

  const handleClose = () => {
    setAddExercise(false);
  }

  const handleChangeComment = (e) => {
    setTrainingData({
      ...trainingData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    fetchData();
  }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz (po zamontowaniu komponentu)

  return (
    <div>
      <h1>Trening na Siłowni</h1>
      {/* Wywołanie funkcji fetchExercises z appointmentId (do implementacji) */}
      {/* fetchExercises(appointmentId); */}
      {exercises.map((exercise) => (
        <div key={exercise.exercise_id}>
          <h2>{exercise.name}</h2>
          <p><strong>Id maszyny:</strong> {exercise.equipment}</p>
          {canDelete && (
            <button onClick={() => handleDeleteExercise(exercise.exercise_id)} className={styles.button}>
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
      <ExerciseForm onCancel={handleClose} isVisible={addExercise} trainingId={trainingData.appointment_id}/>
      {canComment && (
          <div className={styles.flexContainer}>
            <textarea
                placeholder="Dodaj komentarz..."
                value={trainingData.comment}
                onChange={handleChangeComment}
                className={styles.textarea}
                name="comment"
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
