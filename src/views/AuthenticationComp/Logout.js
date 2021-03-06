import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Logout = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    logout();
  });

  return <div className="App"></div>;
};

export default Logout;
