import * as React from 'react';
import { Redirect, Route, RouteProps} from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  
  const isLoggin = Boolean(localStorage.getItem('accesstoken'))
  if(!isLoggin) return <Redirect to="/login" />
  return <Route {...props} />
}
