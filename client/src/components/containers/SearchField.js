import React, { useState, useEffect, useContext, useCallback } from "react";
import UsersContext from "../../context/UsersContext";
import "../../styles/SearchField.css";

const SearchField = () => {
  const { dispatch } = useContext(UsersContext);
  const [input, setInput] = useState("");

  const filterInput = useCallback(() => {
    dispatch({
      type: "FILTER_USERS",
      payload: input,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    filterInput();
  }, [filterInput]);

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className='container-search'>
      <label className='search-label' htmlFor='search'>
        Search
        <span className='search-icon'>
          <i className='fas fa-search-plus'></i>
        </span>
      </label>
      <input
        className='search-input text-input'
        id='search'
        type='text'
        placeholder='by name/email'
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default SearchField;
