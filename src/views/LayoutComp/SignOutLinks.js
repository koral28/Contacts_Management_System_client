import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const SignOutLinks = () => {
  // const { loginWithRedirect } = useAuth0();
  const { isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <ul className="right">
        <li>
          <NavLink to="/signIn">Log In</NavLink>
        </li>
      </ul>
    )
  );
};

export default SignOutLinks;
