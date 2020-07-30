import React, { useReducer } from "react";
import GlobalContext from "./GlobalContext";
// import usersInitialState from "./initialStates/usersInitialState";
// import todosInitialState from "./initialStates/todosInitialState";
// import postsInitialState from "./initialStates/postsInitialState";
// import layoutInitialState from "./initialStates/layoutInitialState";
// import layout from "./reducers/layout";
// import users from "./reducers/users";
// import todos from "./reducers/todos";
// import posts from "./reducers/posts";

import { reducer, initialState } from "./reducer";

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [layoutState, layoutDispatch] = useReducer(layout, layoutInitialState);
  // const [usersState, usersDispatch] = useReducer(users, usersInitialState);
  // const [todosState, todosDispatch] = useReducer(todos, todosInitialState);
  // const [postsState, postsDispatch] = useReducer(posts, postsInitialState);

  // const dispatch = (action) =>
  //   [
  //     layoutDispatch,
  //     usersDispatch,
  //     todosDispatch,
  //     postsDispatch,
  //   ].forEach((fn) => fn(action));

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        // state: {
        //   ...layoutState,
        //   ...usersState,
        //   ...todosState,
        //   ...postsState,
        // },
        // dispatch,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
