import React, { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchCaseID.scss";

const SearchCaseID = ({ searchInCaseID }) => {
  const [search, setSearch] = useState("");

  const onChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      searchInCaseID(search);
      setSearch("");
      e.preventDefault();
    },
    [searchInCaseID, search]
  );
  return (
    <div className="SearchCaseID">
      <form onSubmit={onSubmit}>
        <input
          className="SearchBox"
          value={search}
          onChange={onChange}
          placeholder="CaseID"
        />
        <button type="submit">
          <FaSearch className="MdSearch" />
        </button>
      </form>
    </div>
  );
};

export default SearchCaseID;
