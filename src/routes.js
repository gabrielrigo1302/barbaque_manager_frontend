import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Barbeque from './pages/Barbeque';
import NewBarbeque from './pages/NewBarbeque';
import UpdateBarbeque from './pages/UpdateBarbeque';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/barbeques/new" component={NewBarbeque} />
        <Route path="/barbeques/update" component={UpdateBarbeque} />
        <Route path="/barbeques" component={Barbeque} />
      </Switch>
    </BrowserRouter>
  );
}