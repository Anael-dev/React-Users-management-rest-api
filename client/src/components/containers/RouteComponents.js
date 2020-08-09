import React from "react";
import { Route, Switch } from "react-router-dom";
import UserData from "../tab/UserData";

const RouteComponents = () => {
  return (
    <div className='container-right'>
      <Switch>
        <Route exact path='/users/:id' component={UserData} />
      </Switch>
    </div>
  );
};

export default RouteComponents;
