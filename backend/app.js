const express = require('express');               // imports express framework (like ruby on rails)
const app = express();                            // ?
const request = require("request");
const port = 5000;                                // express runs on same default port as react (3000), so change it so there's no conflict



// if client were to send an HTTP GET request to localhost:5000/
//   we would get 'Goodbye world' back from server
app.get('/', (req, res) => {
  res.send('Goodbye world');
});


app.get("/newEndpoint", (req, res) => {
  res.send("<div><li>one</li><li>two</li></div>");
});


const ACCESS_KEY = '309a69b19352d8ec09b559fb679716bb';
const LOCATION = 'New York';
const WEATHER_URL = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}`
  + `&query=${LOCATION}`;


app.get("/getWeatherNewYork", (req, res) => {

  // make GET request to weather API, on response, run call back function 
  request(WEATHER_URL, (error, response, body) => {
    if (!error && response.statusCode === 200) {

      const parsedBody = JSON.parse(body);
      
      const temp = parsedBody.current.temperature;

      // send temperature back to client
      res.send({ temp });

      // send body of response back to client
      // res.send(body);
    }
  });
});

app.listen(port, () => console.log(`example app listening on port ${port}`));


