import * as React from "react";
import { auth } from "../../firebase";

const signout = () => {
  auth.doSignOut()
  window.location.href = '/'
}

export const SignOutButton = () => (
  <button type="button" onClick={signout}>
    Sign Out
  </button>
);
