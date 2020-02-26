import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookie from 'cookie';

const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  console.log(cookies, 'cookies');
  if (cookies.Authproject) {
    return true;
  }
  return false;
};

const Privateroute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        checkAuth() === true ? <Component /> : <Redirect to='/' />
      }
    />
  );
};

export default Privateroute;
