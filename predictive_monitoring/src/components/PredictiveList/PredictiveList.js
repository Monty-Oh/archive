import React from "react";
import PredictiveListItem from "./PredictiveListItem";
// import PredictiveProperty from "./PredictiveList/PredictiveProperty";
import "./PredictiveList.scss";

const PredictiveList = ({ predictives }) => {
  return (
    <div className="PredictiveList">
      <table>
        <thead>
          <tr>
            {/* <th>Index</th> */}
            <th>CaseID</th>
            <th>Prefix</th>
            <th>ElapsedAct</th>
            <th>StartTime</th>
            <th>LastTime</th>
            <th>PredictedCompletionTime</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {predictives.map((predictive) => (
            <PredictiveListItem key={predictive.id} predictive={predictive} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictiveList;
