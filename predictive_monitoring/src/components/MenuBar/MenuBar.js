import React from "react";
import InsertFile from "./InsertFile";
import SelectHowMany from "./SelectHowMany";
import SearchCaseID from "./SearchCaseID";
import SearchFilter from "./SearchFilter";
import "./MenuBar.scss";

const MenuBar = ({
  onInsert,
  changeHowManyWantToSee,
  searchInCaseID,
  searchByFilter,
  resetAll,
}) => {
  return (
    <div className="MenuBar">
      <InsertFile onInsert={onInsert} />
      <SelectHowMany changeHowManyWantToSee={changeHowManyWantToSee} />
      <SearchCaseID searchInCaseID={searchInCaseID} />
      <SearchFilter searchByFilter={searchByFilter} resetAll={resetAll}/>
      <div className="github">
        <a href="https://github.com/ASSSSN/predictive_monitoring"><img src="/github.png" alt=""/></a>
      </div>
    </div>
  );
};

export default MenuBar;
