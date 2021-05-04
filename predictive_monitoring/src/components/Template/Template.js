import React, { useCallback } from "react";
import "./Template.scss";

const Template = ({ children, title, changePredictive }) => {
  const onChange = useCallback(
    (e) => {
      changePredictive(e.target.value);
    },
    [changePredictive]
  );
  return (
    <div className="Template">
      <div className="app-title">
        {title}
        <div className="inputDate">
          <input type="datetime-local" onChange={onChange} />
        </div>
        
      </div>
      <div className="content">{children}</div>
      
    </div>
  );
};

export default Template;
