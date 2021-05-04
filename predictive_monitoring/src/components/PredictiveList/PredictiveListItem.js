import React from "react";
import "./PredictiveListItem.scss";

const PredictiveListItem = ({ predictive }) => {
  return (
    <tr className="PredictiveListItem">
      {/* <td className="id">{predictive.id}</td> */}
      <td className="caseID">{predictive.caseID}</td>
      <td>{predictive.prefix}</td>
      <td className="ElapsedAct">{predictive.ElapsedAct}</td>
      <td>{predictive.StartTime}</td>
      <td>{predictive.LastTime}</td>
      <td>{predictive.predictedEndTime}</td>
      <td>{predictive.Duration}</td>
    </tr>
  );
};

export default PredictiveListItem;
