import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { SignOutButton } from "../SignOut";

const NavigationComponent = ({ authUser }: any) => (
  <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <div className="container">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">Nothing to see here</span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </div>
    </div>
  </nav>
);

const NavigationAuth = () => (
  <ul className='navbar-nav mr-auto'>
    <li className='nav-item active'>
      <Link className='nav-link' to={routes.LANDING}>Browse Forums</Link>
    </li>
    <li className='nav-item'>
      <Link className='nav-link' to={routes.HOME}>Home</Link>
    </li>
    <li className='nav-item'>
      <Link className='nav-link' to={routes.ACCOUNT}>Account</Link>
    </li>
    <li className='nav-item'>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className='navbar-nav mr-auto'>
    <li className='nav-item'>
      <Link className='nav-link' to={routes.LANDING}>Landing</Link>
    </li>
    <li className='nav-item'>
      <Link className='nav-link' to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

const mapStateToProps = (state: any) => ({
  authUser: state.userState.authUser
});

export const Navigation = connect(mapStateToProps)(NavigationComponent);