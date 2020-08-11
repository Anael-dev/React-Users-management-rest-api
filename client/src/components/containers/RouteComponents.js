import React from "react";
import { Route, Switch } from "react-router-dom";
import TodosTab from "../todos/TodosTab";

const RouteComponents = () => {
  return (
    <div className='container-right'>
      <Switch>
        <Route exact path='/users/:id' component={TodosTab} />
        <Route exact path='/projects/user/:id' component={TodosTab} />
      </Switch>
    </div>
  );
};

export default RouteComponents;
