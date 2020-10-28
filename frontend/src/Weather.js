// import React, { Component } from 'react';
import React from 'react';
import axios from "axios";
// FROM TUTORIAL: https://www.youtube.com/playlist?list=PLQg6GaokU5Cytkk1SXh8eYL9gBMKxh8rq


class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null
    };
  }


  // componentDidMount = () => {
  //   // make HTTP request to Node backend
  //   axios.get("/getWeatherNewYork").then((response) => {
  //     // console.log(response.data);   //=> { temp: 12 }
  //     // console.log(response);
  //     this.setState({
  //       weather: response.data.temp
  //     });
  //   });
  // }


  // NOTE* you shouldn't normally put API requests here bec it could take awhile?
  // usually put them in Redux Thunk/Middleware?
  handleButtonClick = () => {

    // make HTTP request to Node backend
    axios.get("/getWeatherNewYork").then((response) => {
      // console.log(response.data);   //=> { temp: 12 }
      // console.log(response);
      this.setState({
        weather: response.data.temp
      });
    });
  }


  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Get weather in NYC</button>
        <h1>The weather in NYC is: {this.state.weather}</h1>
      </div>
    );
  }
}

export default Weather;