import "./styles.css";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import TrainingCreator from "./TrainingCreator";
import TrainingSession from "./TrainingSession";

/**
 * Komponent reprezentujący plan treningowy użytkownika.
 *
 * @component
 * @returns {JSX.Element} - Zwraca element JSX reprezentujący plan treningowy.
 */
const Plan = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [date, setData] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState({
    appointment_id: null,
    planned_start: null,
    planned_end: null,
    comment: '',
    trainer: null,
    client: null,
    gym: null,
    training: null,
  });
  /**
   * Obsługuje wywołanie wyświetlenia szczegółów treningu dla wybranego dnia.
   *
   * @param {string} dayStr - Data w formacie stringa.
   * @returns {void}
   */
  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    fetchData();
    setShowDetails(true);
  };
  /**
   * Formatuje aktualną datę do postaci używanej w zapytaniach do API.
   *
   * @returns {string} - Sformatowana data.
   */
  const formatDate = () => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Miesiące są numerowane od 0, dlatego dodajemy 1
    const year = dateObject.getFullYear();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;  
  }
  /**
   * Pobiera dane dotyczące treningu dla aktualnej daty.
   *
   * @returns {void}
   */
  const fetchData = async () => {
    const formattedDate = formatDate();
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      if (user && user.user_id) {
        const response = await fetch(`http://localhost:8000/trainer/get_appointment_client?client=${user.user_id}&date=${formattedDate}`);
        const result = await response.json();
        console.log(result);
        
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
      {showDetails && isTraining && <TrainingSession gotTrainingData={trainingData} isTrainer={false}/>}
    </div>
  );
}

export default Plan;