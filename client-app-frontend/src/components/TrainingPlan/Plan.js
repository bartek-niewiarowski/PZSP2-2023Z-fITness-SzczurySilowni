import "./styles.css";
import { useState } from "react";
import Calendar from "./Calendar";
import Details from "./Details";
import TrainingCreator from "./TrainingCreator";

const Plan = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [isTraining, setIsTraining] = useState(false);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <div className="App">
      <h1>Your Week Calendar</h1>
      <br />
      <h2>Check out this week's training</h2>
      <Calendar showDetailsHandle={showDetailsHandle} />
      <br />
      {showDetails && <Details data={data} />}
      {showDetails && !isTraining && <TrainingCreator/>}
    </div>
  );
}

export default Plan;