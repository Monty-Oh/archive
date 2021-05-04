import React, { useCallback, useState, useEffect } from "react";
import Template from "./components/Template/Template";
import MenuBar from "./components/MenuBar/MenuBar";
import PredictiveList from "./components/PredictiveList/PredictiveList";
import Pages from "./components/Template/Pages";
import TestFile from './components/Template/TestFile';

import ReactLogo from "./logo.svg";
import "./App.scss";

function App() {
  const [title, setTitle] = useState("please upload CSV file");
  const [predictives, setPredictive] = useState([]);
  const [copyPredictives, setCopyPredictive] = useState([]);
  const [backupPredictives, setBackupPredictives] = useState([]);
  const [current, setCurrent] = useState([]);

  // 검색하려는 CaseID
  const [search, setSearch] = useState("");

  // 페이지가 총 몇개?
  const [howManyPages, setHowManyPages] = useState(0);

  // 현재 페이지가 어디?
  const [page, setPage] = useState(1);

  //얼마나 많은 예측들을 보고싶어?
  const [howManyWantToSee, setHowManyWantToSee] = useState(10);

  //predictives, page, howManyWantToSee 값이 변결될 때 마다 실행된다.
  useEffect(() => {
    const nextCurrent = predictives.slice(
      (page - 1) * howManyWantToSee,
      page * howManyWantToSee
    );
    setCurrent(nextCurrent);
  }, [predictives, page, howManyWantToSee]);

  // 얼마나 많은 예측들이 출력될지 정함, 변경이 감지되면 호출됨
  useEffect(() => {
    setHowManyPages(Math.ceil(predictives.length / howManyWantToSee));
  }, [predictives, howManyWantToSee]);

  // 검색 부분, 검색단어 변경이 감지되면 호출, '' 빈 상태이면 전체 출력
  useEffect(() => {
    if (search === "") {
      setPredictive(copyPredictives);
      setPage(1);
    } else {
      const nextPredictive = copyPredictives.filter((value) =>
        value.caseID.includes(search)
      );
      setPredictive(nextPredictive);
      setPage(1);
    }
  }, [search, copyPredictives]);

  // 리셋 호출, predictivs를 미리 복사해둔 backupPredictives로 교체한다.
  const resetAll = useCallback(() => {
    setPredictive(backupPredictives);
    setPage(1);
  }, [backupPredictives])


  // 각 Check에 따라 계속해서 filter를 한다.
  const searchByFilter = useCallback(
    (check, startTime, caseID, prefix) => {
      let newPredictives = [...copyPredictives];
      if (check.startTimeCheck) {
        const startDate = new Date(startTime.startTimeStart);
        const endDate = new Date(startTime.startTimeEnd);
        const Error = "Invalid Date";

        if (startDate.toString() !== Error && endDate.toString() !== Error)
          newPredictives = newPredictives.filter((value) => 
            startDate <= new Date(value.StartTime) && new Date(value.StartTime) <= endDate);
        else if(startDate.toString() !== Error && endDate.toString() === Error)
          newPredictives = newPredictives.filter((value) => startDate <= new Date(value.StartTime));
        else if(startDate.toString() === Error && endDate.toString() !== Error)
          newPredictives = newPredictives.filter((value) => endDate >= new Date(value.StartTime));
      }

      if (check.caseIDCheck) {
        const startID = parseInt(caseID.caseIDStart);
        const endID = parseInt(caseID.caseIDEnd);
        if (!isNaN(startID) && !isNaN(endID))
          newPredictives = newPredictives.filter((value) => value.caseID >= startID && value.caseID <= endID)
        else if(!isNaN(startID) && isNaN(endID))
          newPredictives = newPredictives.filter((value) => value.caseID >= startID);
        else if(isNaN(startID) && !isNaN(endID))
          newPredictives = newPredictives.filter((value) => value.caseID <= endID);
      }

      if (check.prefixCheck) {
        const startPrefix = parseInt(prefix.prefixStart);
        const endPrefix = parseInt(prefix.prefixEnd);
        if (!isNaN(startPrefix) && !isNaN(endPrefix))
          newPredictives = newPredictives.filter((value) => value.prefix >= startPrefix && value.prefix <= endPrefix);
        else if(!isNaN(startPrefix) && isNaN(endPrefix))
          newPredictives = newPredictives.filter((value) => value.prefix >= startPrefix);
        else if(isNaN(startPrefix) && !isNaN(endPrefix))
          newPredictives = newPredictives.filter((value) => value.prefix <= endPrefix);
      }
      setPredictive(newPredictives);
      setPage(1);
    },
    [copyPredictives]
  );

  // CaseID 검색, Menubar로 넘김
  const searchInCaseID = useCallback((value) => {
    setSearch(value);
  }, []);

  // 한페이지에 나타낼 예측 수 변경 MenuBar로 넘김
  const changeHowManyWantToSee = useCallback((value) => {
    setHowManyWantToSee(value);
    setPage(1);
  }, []);

  // 현재 보고 있는 페이지 이동 Pages로 넘김
  const changePage = useCallback((cur) => {
    setPage(cur);
    window.scrollTo(0, 0);
  }, []);

  const changePredictive = useCallback(
    (date) => {
      const selectDate = new Date(date);
      if (!isNaN(selectDate)) {
        const nextPredictive = backupPredictives.filter((value) => {
          const start = new Date(value.LastTime);
          const end = new Date(value.NextTime);
          return start <= selectDate && selectDate <= end ? true : false;
        });
        setPredictive(nextPredictive);
        setCopyPredictive(nextPredictive);
      }
    },
    [backupPredictives]
  );

  /*
   * 파일 업로드시 실행, 파일명을 제목으로 바꾸고, 파일을 분해해서 predictives에 넣는다.
   * 넣은 파일은 다시 필요한 개수만큼 current에 넣는다.
   * MenuBar로 넘김
   */
  const onInsert = useCallback((e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let nextPredictive = [];
      fileReader.result.split("\n").forEach((value, index) => {
        if (index > 0 && value !== "") {
          const properties = value.split(",");
          const predictiveInput = {
            id: index,
            caseID: properties[0],
            prefix: properties[1],
            ElapsedAct: properties[2].split("-").join("->"),
            StartTime: properties[3],
            LastTime: properties[4],
            NextTime: properties[5],
            predictedEndTime: properties[6],
            Duration: properties[7],
          };
          nextPredictive = nextPredictive.concat(predictiveInput);
        }
      });
      setPage(1);
      setPredictive(nextPredictive);
      setCopyPredictive(nextPredictive);
      setBackupPredictives(nextPredictive);
      setTitle("process: " + file.name.split(/(.csv)|(.CSV)/)[0]);
    };
    fileReader.readAsText(file);
  }, []);

  return (
    <div className="App">
      <Template title={title} changePredictive={changePredictive}>
        <Pages
          key={1}
          page={page}
          howManyPages={howManyPages}
          changePage={changePage}
        />
        <MenuBar
          onInsert={onInsert}
          changeHowManyWantToSee={changeHowManyWantToSee}
          searchInCaseID={searchInCaseID}
          searchByFilter={searchByFilter}
          resetAll={resetAll}
        />
        <PredictiveList predictives={current} />
        <Pages
          key={2}
          page={page}
          howManyPages={howManyPages}
          changePage={changePage}
        />
        {backupPredictives.length === 0 && <TestFile />}
      </Template>
      <img src={ReactLogo} alt=""></img>
    </div>
  );
}

export default App;
