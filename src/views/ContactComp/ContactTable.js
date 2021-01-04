import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ContactsModel from "../../models/ContactsModel";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";

const ContactTable = () => {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth0();

  const { handleSubmit } = useForm();
  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [searchIsOn, setSearchIsOn] = useState("");

  let useLocalState = (localItem) => {
    const [loc, setState] = useState(localStorage.getItem(localItem));
    let setLoc = (newItem) => {
      if (typeof localStorage.getItem("changes") === "string") {
        localStorage.setItem(localItem, newItem);
        setState(newItem);
      } else {
        localStorage.setItem(localItem, 1);
        setState(1);
      }
    };

    return [loc, setLoc];
  };

  const [change, setChange] = useLocalState("changes");

  const [time, setTime] = useLocalState("time");

  useEffect(() => {
    async function fetchData() {
      let res = await ContactsModel.getContactsData();
      setContacts(res.data);
    }
    fetchData();
  }, []);

  const deleteContact = (firstName) => {
    setChange(parseInt(change) + 1);
    setTime(moment().format("DD/MM/YYYY HH:mm:ss"));
    history.push({
      pathname: "/deleteContact",
      state: { firstName: firstName },
    });
  };

  const updateContact = (contact) => {
    setChange(parseInt(change) + 1);
    setTime(moment().format("DD/MM/YYYY HH:mm:ss"));
    history.push({
      pathname: "/updateContact",
      state: { contact: contact },
    });
  };

  const addContact = () => {
    setChange(parseInt(change) + 1);
    setTime(moment().format("DD/MM/YYYY HH:mm:ss"));
    history.push("/addContact");
  };

  const search = (e) => {
    setSearchValue(e.target.value);
    setSearchIsOn(true);
  };

  let contactsTable = contacts.map((contact, index) => {
    if (searchIsOn && contact.firstName.includes(searchValue)) {
      return (
        <tr key={index} style={{ color: "black", fontWeight: "bold" }}>
          <td>{contact.firstName}</td>
          <td>{contact.lastName}</td>
          <td>{contact.phone}</td>
          <td>{contact.email}</td>
          <td>{contact.street}</td>
          <td>{contact.city}</td>
          <td>{contact.state}</td>
          <td>{contact.postalCode}</td>
          <td>
            <button
              style={{ background: "none", border: "none" }}
              onClick={() => deleteContact(contact.firstName)}
            >
              <i className="material-icons">delete</i>
            </button>
            <button
              style={{ background: "none", border: "none" }}
              onClick={() => updateContact(contact)}
            >
              {" "}
              <i className="material-icons">create</i>
            </button>
          </td>
        </tr>
      );
    } else if (!searchIsOn) {
      return (
        <tr key={index} style={{ color: "black", fontWeight: "bold" }}>
          <td>{contact.firstName}</td>
          <td>{contact.lastName}</td>
          <td>{contact.phone}</td>
          <td>{contact.email}</td>
          <td>{contact.street}</td>
          <td>{contact.city}</td>
          <td>{contact.state}</td>
          <td>{contact.postalCode}</td>
          <td>
            <div style={{ display: "inline-flex" }}>
              <button
                style={{ background: "none", border: "none" }}
                onClick={() => deleteContact(contact.firstName)}
              >
                <i className="material-icons">delete</i>
              </button>
              <button
                style={{ background: "none", border: "none" }}
                onClick={() => updateContact(contact)}
              >
                {" "}
                <i className="material-icons">create</i>
              </button>
            </div>
          </td>
        </tr>
      );
    } else {
      return "";
    }
  });

  return (
    <div className="container">
      <label
        style={{
          fontSize: "15px",
          fontWeight: "bold",
          color: "black",
          background: "white",
          float: "right",
          padding: "5px",
        }}
      >
        Table changed {change} times, last change occurred at {time}
      </label>
      <form onSubmit={handleSubmit()}>
        <div className="input-field" style={{ width: "50%" }}>
          <label style={{ fontWeight: "bold" }}>Search By Name</label>
          <input name="search" type="text" id="search" onChange={search} />
        </div>
        <input
          type="button"
          value="Add"
          style={{ marginRight: "600px" }}
          className="waves-effect waves-light blue-grey btn-small"
          onClick={addContact}
        ></input>
        <br />
        <br />

        <table className="striped">
          <thead>
            <tr style={{ color: "black", fontWeight: "bold" }}>
              <th style={{ width: "10%" }}>First Name</th>
              <th style={{ width: "10%" }}>Last Name</th>
              <th style={{ width: "10%" }}>Phone</th>
              <th style={{ width: "10%" }}>Email</th>
              <th style={{ width: "10%" }}>Street</th>
              <th style={{ width: "10%" }}>City</th>
              <th style={{ width: "10%" }}>State</th>
              <th style={{ width: "10%" }}>Postal Code</th>
            </tr>
          </thead>
          <tbody>{contactsTable}</tbody>
        </table>
      </form>
    </div>
  );
};

export default ContactTable;
