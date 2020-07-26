import React, { useContext, useEffect, useState, useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import UsersContext from "../../context/UsersContext";
import "../../styles/UserData.css";
import Tab from "../containers/Tab";

const UserData = (props) => {
  let { params } = useRouteMatch();
  const { state } = useContext(UsersContext);

  const [userExists, setUserExists] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userExists) {
      const user = state.users.find((user) => user.id === Number(params.id));
      setUserName(user.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userExists, params.id]);

  const checkUser = useCallback(() => {
    const selectedId = Number(params.id);
    if (
      !state.users.some((user) => user.id === selectedId) ||
      state.users.length === 0
    ) {
      setUserExists(false);
      props.history.push("/");
    } else {
      setUserExists(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, state.users]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <>
      {userExists && (
        <div className='user-data'>
          <div className='user-title'>
            <h2>
              User<span className='blue-num'>{params.id}</span> - {userName}
            </h2>
          </div>
          <Tab id={params.id} type={"todos"} />
          <div className='underline'></div>
          <Tab id={params.id} type={"posts"} />
        </div>
      )}
    </>
  );
};
export default UserData;
