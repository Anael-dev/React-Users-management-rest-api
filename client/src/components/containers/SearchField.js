import React, { useState, useEffect, useContext, useCallback } from "react";
import GlobalContext from "../../context/GlobalContext";
import "../../styles/SearchField.css";

const SearchField = () => {
  const { dispatch } = useContext(GlobalContext);
  const [input, setInput] = useState("");

  const filterInput = useCallback(() => {
    dispatch({
      type: "FILTER_USERS",
      payload: input,
    });
    if (input === "") {
      dispatch({
        type: "HIDE_WELCOME_SECTION",
        payload: false,
      });
    } else {
      dispatch({
        type: "HIDE_WELCOME_SECTION",
        payload: true,
      });
    }
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
