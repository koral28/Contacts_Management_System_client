const axios = require("axios");

exports.getContactsData = function () {
  return axios.get("http://localhost:3000/api/contacts");
};

exports.saveContactsData = function (contactObj) {
  return axios.post("http://localhost:3000/api/contacts", contactObj);
};

exports.updateContactsData = function (contactObj, originalName) {
  return axios.put(
    "http://localhost:3000/api/contacts/" + originalName,
    contactObj
  );
};

exports.deleteContactsData = function (firstName) {
  return axios.delete("http://localhost:3000/api/contacts/" + firstName);
};
