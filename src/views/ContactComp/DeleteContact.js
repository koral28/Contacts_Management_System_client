import { useEffect } from "react";
import ContactsModel from "../../models/ContactsModel";

const DeleteContact = (props) => {
  useEffect(() => {
    function fetchData() {
      ContactsModel.deleteContactsData(props.location.state.firstName).then(
        (resp) => {
          if (resp.data === "deleted!") {
            props.history.push("/contactTable");
          } else {
            console.log(resp.data);
            props.history.push("/");
          }
        }
      );
    }
    fetchData();
  }, []);

  return <div className="App"></div>;
};

export default DeleteContact;
