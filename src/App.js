import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./views/DashboardComp/Dashboard";
import Navbar from "./views/LayoutComp/Navbar";
import Login from "./views/AuthenticationComp/Login";
import Logout from "./views/AuthenticationComp/Logout";
import ContactTable from "./views/ContactComp/ContactTable";
import AddContact from "./views/ContactComp/AddContact";
import UpdateContact from "./views/ContactComp/UpdateContact";
import DeleteContact from "./views/ContactComp/DeleteContact";

const App = () => {
  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          backgroundImage:
            "url(emma-matthews-digital-content-production-vKM1ZdtoBL4-unsplash.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: " bottom right",
          backgroundSize: "cover",
          width: "100%",
          height: "1000px",
        }}
      >
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signIn" component={Login} />
          <Route path="/signOut" component={Logout} />
          <Route path="/contactTable" component={ContactTable} />
          <Route path="/addContact" component={AddContact} />
          <Route path="/updateContact" component={UpdateContact} />
          <Route path="/deleteContact" component={DeleteContact} />
        </Switch>
        <Dashboard />
      </div>
    </BrowserRouter>
  );
};

export default App;
