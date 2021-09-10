import { NotFound, PrivateRoute } from 'components/Common';
import AdminLayout from 'components/Layouts/Admin';
import LoginPage from 'features/auth/pages/LoginPage';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
function App() {
  return (
    <div>
      <Switch>
        <Redirect exact from="/" to="/admin" />
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
