import "./styles.css";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import TrainingCreator from "./TrainingCreator";
import TrainingSession from "./TrainingSession";

const Plan = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [date, setData] = useState(null);
  const [isTraining, setIsTraining] = useState(true);
  const [trainingData, setTrainingData] = useState({
    appointment_id: 1,
    planned_start: new Date('2024-01-15T10:00:00Z'),
    planned_end: new Date('2024-01-15T12:00:00Z'),
    comment: 'Spotkanie treningowe',
    trainer: 2,
    client: 3,
    gym: 4,
    training: 5,
  });

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    fetchData();
    setShowDetails(true);
  };

  const formatDate = () => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Miesiące są numerowane od 0, dlatego dodajemy 1
    const year = dateObject.getFullYear();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;  
  }

  const fetchData = async () => {
    const formattedDate = formatDate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      if (user && user.user_id) {
        const response = await fetch(`http://localhost:8000/client/appointments_api?date=${formattedDate}&client=${user.user_id}`);
        const result = await response.json();
        
        if (result && result.length > 0) {
          setIsTraining(true);
          setTrainingData(result[0]);
        } else {
          setIsTraining(false);
          setTrainingData(null);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    //fetchData();
  }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz (po zamontowaniu komponentu)

  return (
    <div className="App">
      <h1>Twój Kalendarz</h1>
      <br />
      <h2>Sprawdź plan na ten tydzień</h2>
      <Calendar showDetailsHandle={showDetailsHandle} />
      <br />
      {showDetails && <div>{date}</div>}
      {showDetails && !isTraining && <TrainingCreator fortmatDate={formatDate}/>}
      {showDetails && isTraining && <TrainingSession trainingData={trainingData} isTrainer={true}/>}
    </div>
  );
}

export default Plan;