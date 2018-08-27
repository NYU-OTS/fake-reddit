import * as React from "react";
import { Link } from 'react-router-dom';
import { auth } from "../../firebase";

const signout = () => {
  auth.doSignOut()
  window.location.href = '/'
}

export const SignOutButton = () => (
  <Link to={'#'} className='nav-link' onClick={signout}>
    Sign Out
  </Link>
);
