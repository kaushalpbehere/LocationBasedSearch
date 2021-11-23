const express = require('express');
const yargs = require('yargs');

var search=require('../src/search');
var data1=require('../src/data');

// initializing the express.
const app = express();

// Make this variable configurable
const port = process.env.PORT || 3003

// Call this Node Application as -> nodemon src/index.js --m 50 --l "london" 
const parameters =
    //Parameter miles
    yargs.command('miles', 'Input number, specifies miles as unit of distance as radius to look for in the location.', 
    {
        year: {
            description: 'Distance of radius in terms of Miles.',
            alias: 'm',
            type: 'number',
        }

    // Parameter Location
    }).command('location', 'Input location.', 
    {
        year: {
            description: 'Location in which we can search for User.',
            alias: 'l',
            type: 'string',
        }
    }).help().alias('help', 'h').argv;

// Starting the web server to listen to the server on port 3000
app.listen(port, () => { 
    console.log('Server Application is up and running on port : 3002 !!!');    
    var miles = (parameters.m===undefined)?50:parameters.m;
    var location = (parameters.l === undefined) ? "London" : parameters.l;
   search.findUsersWithinSpecifiedRange(miles, location);
})