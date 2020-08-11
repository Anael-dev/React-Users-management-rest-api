import React, { useReducer } from "react";
import GlobalContext from "./GlobalContext";

import { reducer, initialState } from "./reducer";

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
