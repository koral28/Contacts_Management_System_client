import { useForm } from "react-hook-form";
import { useState } from "react";
import ContactsModel from "../../models/ContactsModel";
import PlacesAutoComplete from "react-places-autocomplete";

const UpdateContact = (props) => {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    let originalName = props.location.state.contact.firstName;
    let contactObj = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      street: data.street,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
    };

    ContactsModel.updateContactsData(contactObj, originalName).then((resp) => {
      if (resp.data === "Updated!") {
        props.history.push("/contactTable");
      } else {
        props.history.push("/");
      }
    });
  };

  const handleChangeCity = (value) => {
    setCity(value);
  };
  const handleSelectCity = (value) => {
    setCity(value);
  };
  const handleChangeStreet = (value) => {
    setStreet(value);
  };

  const handleSelectStreet = (value) => {
    setStreet(value);
  };

  return (
    <div className="container" style={{ padding: "50px", width: "50%" }}>
      <div>
        <label style={{ fontSize: "25px", fontWeight: "bold", color: "black" }}>
          Edit :{" "}
          {props.location.state.contact.firstName +
            " " +
            props.location.state.contact.lastName}
        </label>
        <br />
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>First Name</label> <br />
          <input
            type="text"
            name="firstName"
            defaultValue={props.location.state.contact.firstName}
            ref={register({
              required: "First Name is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
          />
        </div>
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>Last Name</label> <br />
          <input
            type="text"
            name="lastName"
            defaultValue={props.location.state.contact.lastName}
            ref={register({
              required: "Last Name is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
          />
        </div>
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>Phone</label> <br />
          <input
            type="text"
            name="phone"
            defaultValue={props.location.state.contact.phone}
            ref={register({
              required: "Phone is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
          />
        </div>
        {errors.phone && <p>{errors.phone.message}</p>}
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>Email</label>
          <br />
          <input
            type="text"
            name="email"
            defaultValue={props.location.state.contact.email}
            ref={register({
              required: "Email is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
          />
        </div>
        {errors.email && <p>{errors.email.message}</p>}
        <div className="input-field">
          <PlacesAutoComplete
            value={street}
            onChange={handleChangeStreet}
            onSelect={handleSelectStreet}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  name="street"
                  ref={register({
                    required: "Street is required!",
                  })}
                  {...getInputProps({
                    placeholder: "Enter Street",
                  })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: "#E9967A", cursor: "pointer" }
                      : { backgroundColor: "white", cursor: "pointer" };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutoComplete>
        </div>
        <div className="input-field">
          <PlacesAutoComplete
            value={city}
            onChange={handleChangeCity}
            onSelect={handleSelectCity}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  name="city"
                  ref={register({
                    required: "City is required!",
                  })}
                  {...getInputProps({
                    placeholder: "Enter City",
                  })}
                />
                <div>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: "#E9967A", cursor: "pointer" }
                      : { backgroundColor: "white", cursor: "pointer" };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutoComplete>
        </div>
        {errors.street && <p>{errors.street.message}</p>}
        {errors.city && <p>{errors.city.message}</p>}
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>State</label> <br />
          <input
            type="text"
            name="state"
            defaultValue={props.location.state.contact.state}
            ref={register({
              required: "State is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
          />
        </div>
        {errors.state && <p>{errors.state.message}</p>}
        <div className="input-field">
          <label style={{ fontWeight: "bold" }}>Postal Code</label> <br />
          <input
            type="text"
            name="postalCode"
            defaultValue={props.location.state.contact.postalCode}
            ref={register({
              required: "Postal Code is required!",
              minLength: { value: 2, message: "Too Short.." },
            })}
          />
        </div>
        {errors.postalCode && <p>{errors.postalCode.message}</p>}
        <button
          className="waves-effect waves-light blue-grey btn-small"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateContact;
