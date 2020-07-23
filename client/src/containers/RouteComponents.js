import React from "react";
import { Route, Switch } from "react-router-dom";
import UserData from "../components/user-profile/UserData";
import AddUser from "../components/AddUser";

const RouteComponents = () => {
  return (
    <div className='container-right'>
      <Switch>
        <Route exact path='/users/user/:id' component={UserData} />
        <Route exact path='/users/add_user' component={AddUser} />
      </Switch>
    </div>
  );
};

export default RouteComponents;
