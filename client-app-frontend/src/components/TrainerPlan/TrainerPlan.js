import "../TrainingPlan/styles.css";
import { useEffect, useState } from "react";
import Calendar from "../TrainingPlan/Calendar";
import Training from "./Training";

const TrainerPlan = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [date, setData] = useState(null);
  const [trainingData, setTrainingData] = useState([]);

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
        const response = await fetch(`http://localhost:8000/trainer/get_appointment_trainer?trainer=${user.user_id}&date=${formattedDate}`);
        const result = await response.json();
        
        if (result && result.length > 0) {
          setTrainingData(result);
        } else {
          setTrainingData([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz (po zamontowaniu komponentu)

  return (
    <div className="App">
      <h1>Twój Kalendarz</h1>
      <br />
      <h2>Sprawdź plan na ten tydzień</h2>
      <Calendar showDetailsHandle={showDetailsHandle} />
      <br />
      <div>{date}</div>
      <div>
        {trainingData && trainingData.map((training) => (
          <Training key={training.appointment_id} training={training} />
        ))}
      </div>
    </div>
  );
}

export default TrainerPlan;