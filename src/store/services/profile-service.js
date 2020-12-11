import axios from 'axios';
import Jsona from 'jsona';

const url = process.env.VUE_APP_API_BASE_URL;
const jsona = new Jsona();

function getMe() {
  return axios.get(`${url}/me`)
    .then(response => {
      return {
        me: response.data,
      };
    });
}

function getMyPermissions() {
  return axios.get(`${url}/signinpermissions`)
    .then(response => {
      return {
        list: response.data.data,
        currentPermissions: response.data.data[0],
      };
    });
}


function update(profile) {

  const payload = jsona.serialize({
    stuff: profile,
    includeNames: []
  });

  const options = {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    }
  };

  return axios.patch(`${url}/me`, payload, options)
    .then(response => {
      return jsona.deserialize(response.data);
    });
}

export default {
  getMe,
  getMyPermissions,
  update
};
