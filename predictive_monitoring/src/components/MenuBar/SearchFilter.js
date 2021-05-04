import React, { useCallback, useState } from "react";
import {
  MdFilterList,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";
import { GrPowerReset } from 'react-icons/gr'
import { FaSearch } from "react-icons/fa";
import "./SearchFilter.scss";

const SearchFilter = ({ searchByFilter, resetAll }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [check, setCheck] = useState({
    startTimeCheck: false,
    caseIDCheck: false,
    prefixCheck: false,
  });
  const [startTime, setStartTime] = useState({
    startTimeStart: "",
    startTimeEnd: "",
  });
  const [caseID, setCaseID] = useState({
    caseIDStart: "",
    caseIDEnd: "",
  });
  const [prefix, setPrefix] = useState({
    prefixStart: "",
    prefixEnd: "",
  });

  const onClickReset = useCallback(() => {
    setCheck({
      startTimeCheck: false,
      caseIDCheck: false,
      prefixCheck: false,
    });
    setStartTime({
      startTimeStart: "",
      startTimeEnd: "",
    });
    setCaseID({
      caseIDStart: '',
      caseIDEnd: "",
    });
    setPrefix({
      prefixStart: '',
      prefixEnd: '',
    });
    resetAll();
  }, [resetAll]);

  const onClickFilter = useCallback(
    (e) => {
      if (showFilter === true) {
        searchByFilter(check, startTime, caseID, prefix);
      }
      setShowFilter(!showFilter);
      e.preventDefault();
    },
    [check, showFilter, searchByFilter, startTime, caseID, prefix]
  );

  const onChangePrefix = useCallback(
    (e) => {
      setPrefix({
        ...prefix,
        [e.target.id]: e.target.value,
      });
    },
    [prefix]
  );

  const onChangeCaseID = useCallback(
    (e) => {
      setCaseID({
        ...caseID,
        [e.target.id]: e.target.value,
      });
    },
    [caseID]
  );

  const onChangeStartTime = useCallback(
    (e) => {
      setStartTime({
        ...startTime,
        [e.target.id]: e.target.value,
      });
    },
    [startTime]
  );

  const onClickRadio = useCallback(
    (target, e) => {
      setCheck({
        ...check,
        [target]: !check[target],
      });
      e.preventDefault();
    },
    [check]
  );

  return (
    <div className="SearchFilter">
      <button className="RenewButton" onClick={onClickReset}><GrPowerReset /></button>
      <button className="SearchButton" onClick={onClickFilter}>
        {showFilter === false ? <MdFilterList /> : <FaSearch />}
      </button>
      {showFilter === true && (
        <form className="Radios">
          <div className="CheckBoxs">
            <div className="Radio">
              <button onClick={(e) => onClickRadio("startTimeCheck", e)}>
                {check.startTimeCheck === false ? (
                  <MdCheckBoxOutlineBlank />
                ) : (
                  <MdCheckBox />
                )}
              </button>
              <div className="text">startTime</div>
              <input
                id="startTimeStart"
                type="datetime-local"
                value={startTime.startTimeStart}
                onChange={onChangeStartTime}
              />
              <div className="text">to</div>
              <input
                id="startTimeEnd"
                type="datetime-local"
                value={startTime.startTimeEnd}
                onChange={onChangeStartTime}
              />
            </div>

            <div className="Radio">
              <button onClick={(e) => onClickRadio("caseIDCheck", e)}>
                {check.caseIDCheck === false ? (
                  <MdCheckBoxOutlineBlank />
                ) : (
                  <MdCheckBox />
                )}
              </button>
              <div className="text">caseID</div>
              <input
                className="caseIdCheckInput"
                type="text"
                id="caseIDStart"
                value={caseID.caseIDStart}
                onChange={onChangeCaseID}
              />
              <div className="text">to</div>
              <input
                className="caseIdCheckInput"
                type="text"
                id="caseIDEnd"
                value={caseID.caseIDEnd}
                onChange={onChangeCaseID}
              />
            </div>

            <div className="Radio">
              <button onClick={(e) => onClickRadio("prefixCheck", e)}>
                {check.prefixCheck === false ? (
                  <MdCheckBoxOutlineBlank />
                ) : (
                  <MdCheckBox />
                )}
              </button>
              <div className="text">prefix</div>
              <input
                className="prefixCheckInput"
                type="text"
                id="prefixStart"
                value={prefix.prefixStart}
                onChange={onChangePrefix}
              />
              <div className="text">to</div>
              <input
                className="prefixCheckInput"
                type="text"
                id="prefixEnd"
                value={prefix.prefixEnd}
                onChange={onChangePrefix}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchFilter;
