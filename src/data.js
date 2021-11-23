const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const baseURL = 'https://bpdts-test-app.herokuapp.com';
var token = 'pk.eyJ1Ijoia2F1c2hhbHBiZWhlcmUiLCJhIjoiY2tuZWhza3pnMjY0czJ2dGFkb3FobGthcCJ9.PXoQLcnWXa8fyOWQ1i0PTg';
const mapBoxUrl1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapBoxUrl2 = '.json?access_token='+token;
const mapBoxUrl3="https://api.mapbox.com/directions/v5/mapbox/walking/"
const mapBoxUrl4 ="?alternatives=false&annotations=distance&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token="+ token;

exports.fetchUsersByLocation = location => {
  //Algorithm implemented in this API is wrong.
  //`${baseURL}/city/${location}/users`
    return axios.get("https://bpdts-test-app.herokuapp.com/city/London/users").then(({ data }) => {return data;});};
  
exports.fetchAllUsers = () => {
  return axios.get(`${baseURL}/users`).then(({ data }) => {
    return data;
  });
};

exports.getDistance = (userLat, userLong, locationLong, locationLat) =>{
  // console.log(mapBoxUrl3 + userLong + ","+ userLat+";"+locationLong + ","+locationLat  + mapBoxUrl4)
  return axios(mapBoxUrl3 +locationLong + ","+locationLat +";"+ userLong + ","+ userLat + mapBoxUrl4)
    .then(({data})=>{ 
      const distanceData = JSON.parse(data);
            var distance = (distanceData.code !=='InvalidInput') ? (distanceData.routes.distance)/1000 : 2999;
      return ;
    });
};

exports.getLocationData = (address) =>{
  return axios(`${mapBoxUrl1}+ ${address} + ${mapBoxUrl2}`). then(({data}) =>{
  return data;
  });  
};