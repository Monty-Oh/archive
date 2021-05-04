import React, { useCallback } from "react";
import { MdFileUpload } from "react-icons/md";
import "./InsertFile.scss";

const InsertFile = ({ onInsert, onChangeCurrent }) => {
  const onChange = useCallback(
    (e) => {
      onInsert(e);
    },
    [onInsert]
  );
  return (
    <div className="InsertFile">
      <label htmlFor="upload">
        <MdFileUpload />
      </label>
      <input type="file" id="upload" onChange={onChange} />
    </div>
  );
};

export default InsertFile;
