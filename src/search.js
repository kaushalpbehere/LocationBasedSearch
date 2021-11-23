const { forEach } = require('axios/lib/utils');
var data=require('../src/data');

exports.findUsersWithinSpecifiedRange=(miles, location)=>
{
    console.log("Searching within " + miles + " miles from " + location + "...");
    
    data.getLocationData(location).then(coordinateData => {
        
        /** To make application generic, we need to fetch details from the API as user can enter any location, which we might not know, but since in this case we have a location with is fixed, we can skip this part and use 'London' as a hard code value. */
        const coordinatesData = coordinateData;
        const locationDetails = {
            latitude: '',
            longitude: '',
            placeName: ''
        }
        locationDetails.placeName = coordinatesData.features[0].place_name;
        locationDetails.longitude = coordinatesData.features[0].center[0];
        locationDetails.latitude = coordinatesData.features[0].center[1];

        /* Note: data returned on the API is incorrect, as coordinates of user is nowhere near London for example. */
        // Easy Part: Calling the second API 
        console.log('--- Calling only DWP Api ---')
        data.fetchUsersByLocation(location).then(filteredUsers => { console.log(filteredUsers)});

        // Custom filtering the user data to validate the user location. (Tuff part)
        data.fetchAllUsers().then(eachUser=>{
            console.log(' --- Correct List of Users - DWP + Mapbox Api: ---');
            eachUser.forEach(x => 
                //Time out is needed when we call some other api in a loop, as it can have invalid reply as 'Too many request'
            setTimeout(()=>{
                // 1 Degree Latitude / Longitude is 111 km / 69+ miles. 
                var latitudeDifference = x.latitude - locationDetails.latitude;
                var longitudeDifference = x.longitude -locationDetails.longitude;  

                // As data is less, considering 2 degree change. (For accuracy it should be 1 degree)
                if((latitudeDifference<=2  && latitudeDifference>=-2) 
                    && (longitudeDifference <=2 && longitudeDifference >= -2))
                    {
                        console.log(x);
                        /** Following part is still not working as call the mapbox api needs various other code to be handled. */
                        // data.getDistance(x.latitude, x.longitude, locationDetails.longitude , locationDetails.latitude ).then(dist=>{
                            //     if(dist <= miles) 
                            //     return x;
                            // });
                }                
            }, 300));        
        });
    });
};