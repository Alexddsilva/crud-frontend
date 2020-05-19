import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from '../pages/List';
import Register from '../pages/Register';
import Edit from '../pages/Edit';

const Routes= () => (
  <Switch>
    <Route path="/" exact component={List} />
    <Route path="/register" component={Register} />
    <Route path="/edit/:id" component={Edit} />
  </Switch>
);

export default Routes;
