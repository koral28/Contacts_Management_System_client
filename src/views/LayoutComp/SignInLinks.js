import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SignInLinks = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <ul className="right">
        <li>
          <NavLink to="/contactTable">Contacts</NavLink>
        </li>
        <li>
          <NavLink to="/signOut">Log Out</NavLink>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating red lighten-3">
            {user.given_name}
          </NavLink>
        </li>
      </ul>
    )
  );
};

export default SignInLinks;
