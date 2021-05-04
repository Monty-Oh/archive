import React, { useCallback, useState } from "react";
import "./SelectHowMany.scss";
const SelectHowMany = ({ changeHowManyWantToSee }) => {
  const [selected, setSelected] = useState(10);
  const onChange = useCallback(
    (e) => {
      setSelected(e.target.value);
      changeHowManyWantToSee(e.target.value);
    },
    [changeHowManyWantToSee]
  );

  return (
    <div className="SelectHowMany">
      <label>
        count
        <div className="select">
          <select value={selected} onChange={onChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </label>
    </div>
  );
};

export default SelectHowMany;
