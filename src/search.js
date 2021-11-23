const requests = require('requests')
const geoDistance = require('geo-distance-helper');

const data=require('../src/data');

const mapBoxUrl1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapBoxUrl2 = '.json?access_token=pk.eyJ1Ijoia2F1c2hhbHBiZWhlcmUiLCJhIjoiY2tuZWhza3pnMjY0czJ2dGFkb3FobGthcCJ9.PXoQLcnWXa8fyOWQ1i0PTg'

exports.findUsersWithinSpecifiedRange=( distanceInKms, location)=>
{
    console.log("Searching within " + distanceInKms + " miles from " + location + "...");

    // Step 2: Get Latitude and Longitude for Location. 
    getLocationData(location, (locationData) => {
        // Location which was entered and Coordinated found for location:         
        console.log("Entered Location: " + location) 
        console.log("Found location: "+ locationData.placeName );
        console.log("Latitude: "+ locationData.latitude);
        console.log("Longitude: "+ locationData.longitude);

        var userData = data.fetchAllUsers().then(user => {
            
            const userLocation = {
                lat: user.latitude,
                lng: user.longitude
              };
          
              const geoLocation = {
                lat:  locationData.latitude,
                lng: locationData.longitude
              };
          
            const distanceInKms = geoDistance(userLocation, geoLocation, 'K');
            
            const miles = distanceInKms /  1.61; //1 Mile = 1.61 Kms 
          
            return miles <= distanceInKms;
        });
    });
};

// 1 : Get Coordinates
const getLocationData = (address, callback) => {
    requests(mapBoxUrl1 + address + mapBoxUrl2)
        .on('data', (response) => {
            const locationDetails = {
                latitude: '',
                longitude: '',
                placeName: ''
            }
            try {
                const coordinatesData = JSON.parse(response)
                locationDetails.placeName = coordinatesData.features[0].place_name
                locationDetails.longitude = coordinatesData.features[0].center[0]
                locationDetails.latitude = coordinatesData.features[0].center[1]
            } catch (exception) {
                console.log('Exception encountered while retrieving coordinate data !!!')
            }
            callback(locationDetails);
        })
        .on('end', (error) => {
            if (error)
                return console.log('No internet or some network issue, please check whether you are connected to internet.', error);
        });
};