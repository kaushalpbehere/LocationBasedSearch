# LocationBasedSearch 

This project call a Api hosted on Heroku to get users list and its details. Then identifies whether User falls in the a '50 mile radius of the given location'. 

## Instructions 

“Build an API which calls this API, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London. Push the answer to Github, and send us a link.”


# Third Party Application used: 

-[x] Mapbox API. 
-[x] Node Package - [Axios] : Used for Api requests to mapbox api and DWP Api.
-[x] Node Package - [Express] : As middleware.
-[x] Node Package - [yargs] : To have a command line call with location and miles data. 


# Logic for the Application

 There are 2 approaches for which the code is built for. 
 
## Using Mapbox + DWP Api:
- [x] Step 1: To get the User input, location as text and radius for the search location as integrer value. 
- [x] Step 2: Get the coordinates for the location entered by the user, using MapBox Api. 
- [x] Step 3: Get all Users from DWP Api. 
- [x] Step 4: Calculate the difference in latitude and longiude, based on the fact that, 1 degree latitude / longitude change is 111 Km or 69 miles. 
- [x] Step 5: Sort the user list, recieved from DWP Api, for users having Latitude and Longitude differences less than 2 degree (As data for 1 degree is very less). 
- [x] Step 6: Ideally call another MapBox Api to get the exact distance between to endpoints, and check whether it is less than 'radius' length. - If yes, thats out user. 

## Using Only DWP API: 
Alternative apporach (Easier)

- [x] Step 1: Call the Location-Based DWP Api, for the location London. 
- [x] Step 2: Print the list. 

Pending Item: conver the application to a API. as that was expected, but short of time.
