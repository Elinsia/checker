import React from 'react';
import {Redirect} from 'react-router-dom';

const Logout = () => {
  return (
      <Redirect to="/login" />
  )
}

export default Logout;