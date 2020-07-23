import React, { useReducer } from "react";
import UsersContext from "./UsersContext";
import { reducer, initialState } from "./reducer";

const UsersContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
