# LocationBasedSearch 

This project call a Api hosted on Heroku to get users list and its details. Then identifies whether User falls in the a '50 mile radius of the given location'. 

Third Party Application used: Mapbox API. 

Using following packages : 

[Axios] : Used for Api requests to mapbox api and DWP Api.

[Express] : As middleware.

[yargs] : To have a command line call with location and miles data. 

**Logic**

	_Using Mapbox + DWP Api: _
		Step 1: To get the User input, location as text and radius for the search location as integrer value. 
		Step 2: Get the coordinates for the location entered by the user, using MapBox Api. 
		Step 3: Get all Users from DWP Api. 
		Step 4: Calculate the difference in latitude and longiude, based on the fact that, 1 degree latitude / longitude change is 111 Km or 69 miles. 
		Step 5: Sort the user list, recieved from DWP Api, for users having Latitude and Longitude differences less than 2 degree (As data for 1 degree is very less). 
		Step 6: Ideally call another MapBox Api to get the exact distance between to endpoints, and check whether it is less than 'radius' length. - If yes, thats out user. 

Alternative apporach (Easier)
	_Using Only DWP API: _
		Step 1: Call the Location-Based DWP Api, for the location London. 
		Step 2: Print the list. 


Pending Item: conver the application to a API. as that was expected, but short of time.
