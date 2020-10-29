const express = require('express');               // imports express framework (like ruby on rails)
const app = express();                            // ?
const request = require("request");               // module to make serverside http requests (OUTDATED)
const port = 5000;                                // express runs on same default port as create-react-app (3000), so change it so there's no conflict
require('dotenv').config();                       // so we don't expose our secret key
const twitchUsersURL = require('./twitchUsers'); 


// get API ACCESS TOKEN from Twitch
const getToken = (url, callback) => {

  // params for https request
  const options = {
    url: url,
    json: true,
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'client_credentials'
    }
  }

  // make post request to twitch api endpoint to get access token
  request.post(options, (err, response, body) => {
    if (err) return console.log(err);
    console.log(`GET TOKEN Status: ${response.statusCode}`);
    callback(response); 
  });
}


let ACCESS_TOKEN = null;
// call get token function, pass in callback
getToken(process.env.GET_TOKEN, (res) => {
  ACCESS_TOKEN = res.body.access_token;
  return ACCESS_TOKEN;
});


// function to get live music streams
const getStreams = (url, accessToken, callback) => {

  // params for get request
  const streamOptions = {
    url: url + twitchUsersURL,      // list of artists are embedded here
    method: 'GET',
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': 'Bearer ' + accessToken
    }
  }
  
  // GET request to twitch API endpoint to get all streams for certain artists
  request.get(streamOptions, (err, res, body) => {
    if (err) return console.log(err);
    console.log(`GET STREAMS Status: ${res.statusCode}`);
    // console.log(JSON.parse(body));
    callback(JSON.parse(body));
  });
}


// wait 4 seconds (so we can get Access Token), then execute callback getStreams
setTimeout( () => {
  getStreams(process.env.GET_STREAMS, ACCESS_TOKEN, (response) => {
    console.log(response);
  });
}, 4000);



// API ENDPOINT- get all current live streams for list of user names




// if client were to send an HTTP GET request to localhost: 5000 /
//   we would get 'Goodbye world' back from server

// const ACCESS_KEY = '309a69b19352d8ec09b559fb679716bb';
// const LOCATION = 'New York';
// const WEATHER_URL = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}`
//   + `&query=${LOCATION}`;


// when client makes HTTP GET request to this URL API ENDPOINT
//    we make HTTPS GET request to TWITCH API ENDPOINT to get all current 
//    live streams for certain artists
// app.get("/getCurrentLiveStreams", (req, res) => {

//   // make GET request to weather API, on response, run call back function 
//   request(WEATHER_URL, (error, response, body) => {
//     if (!error && response.statusCode === 200) {

//       const parsedBody = JSON.parse(body);

//       const temp = parsedBody.current.temperature;

//       // send temperature back to client
//       res.send({ temp });

//       // send body of response back to client
//       // res.send(body);
//     }
//   });
// });

// app.listen(port, () => console.log(`server listening on port ${port}`));







// ***** WEATHER APP TUTORIAL ************************************************
// const express = require('express');               // imports express framework (like ruby on rails)
// const app = express();                            // ?
// const request = require("request");               // module to make serverside http requests (OUTDATED)
// const port = 5000;                                // express runs on same default port as react (3000), so change it so there's no conflict

// // if client were to send an HTTP GET request to localhost:5000/
// //   we would get 'Goodbye world' back from server
// app.get('/', (req, res) => {
//   res.send('Goodbye world');
// });


// app.get("/newEndpoint", (req, res) => {
//   res.send("<div><li>one</li><li>two</li></div>");
// });


// const ACCESS_KEY = '309a69b19352d8ec09b559fb679716bb';
// const LOCATION = 'New York';
// const WEATHER_URL = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}`
//   + `&query=${LOCATION}`;


// app.get("/getWeatherNewYork", (req, res) => {

//   // make GET request to weather API, on response, run call back function 
//   request(WEATHER_URL, (error, response, body) => {
//     if (!error && response.statusCode === 200) {

//       const parsedBody = JSON.parse(body);
      
//       const temp = parsedBody.current.temperature;

//       // send temperature back to client
//       res.send({ temp });

//       // send body of response back to client
//       // res.send(body);
//     }
//   });
// });

// app.listen(port, () => console.log(`example app listening on port ${port}`));
// ***** WEATHER APP TUTORIAL ************************************************

