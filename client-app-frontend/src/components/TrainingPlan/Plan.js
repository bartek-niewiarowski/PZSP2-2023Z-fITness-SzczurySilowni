import "./styles.css";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import TrainingCreator from "./TrainingCreator";
import TrainingSession from "./TrainingSession";

const Plan = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [date, setData] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState(null);

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
      if(user && user.user_id)
      {
        const response = await fetch(`http://localhost:8000/client/training_api?start=${formattedDate}&client=${user.user_id}`);
        const result = await response.json();
        if (result && result.length > 0) {setIsTraining(true)}
        else {setIsTraining(false)}
        setTrainingData(result[0]); 
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
      {showDetails && <div>{date}</div>}
      {showDetails && !isTraining && <TrainingCreator fortmatDate={formatDate}/>}
      {showDetails && isTraining && <TrainingSession trainingData={trainingData}/>}
    </div>
  );
}

export default Plan;