import { Link } from "react-router-dom";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";

const Navbar = () => {
  return (
    <nav className="nav-wrapper grey darken-0">
      <div className="container">
        <Link to="/" className="brand-logo">
          Contact Management System
        </Link>
        <SignInLinks />
        <SignOutLinks />
      </div>
    </nav>
  );
};

export default Navbar;
