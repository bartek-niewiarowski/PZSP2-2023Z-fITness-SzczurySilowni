import React, { useState } from 'react';
import TrainingSession from '../TrainingPlan/TrainingSession';
import styles from './Training.module.css';

const Training = ({ training }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <h2>Trening ID: {training.appointment_id}</h2>
      <p>Start: {formatTime(training.planned_start)}</p>
      <p>Koniec: {formatTime(training.planned_end)}</p>
      <p>Komentarz: {training.comment}</p>
      <button onClick={handleExpandClick} className={styles.button}>
        {isExpanded ? 'Zwiń' : 'Rozwiń'}
      </button>
      {isExpanded && <TrainingSession trainingData={training} isTrainer={true} />}
      <hr />
    </div>
  );
};

export default Training;