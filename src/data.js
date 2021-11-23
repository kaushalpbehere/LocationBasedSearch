const axios = require('axios');

axios.defaults.adapter = require('axios/lib/adapters/http');

const baseURL = 'https://bpdts-test-app.herokuapp.com';

exports.fetchUsersByLocation = location => {
    return axios.get(`${baseURL}/city/london/users`).then(({ data }) => {
      //console.log(data);
      return data;
    });
  };
  
exports.fetchAllUsers = () => {
  return axios.get(`${baseURL}/users`).then(({ data }) => {
      //console.log(data);
      return data;
  });
};