import React from 'react';
import axios from "axios";


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      name: '',
      streamData: null,
    };
  }


  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }


  handleAddUser = (e) => {
    let newUsers = this.state.artists.slice();
    newUsers.push(this.state.name);
    this.setState({ artists: newUsers, name: ''});
    e.preventDefault();
  }


  // NOTE* you shouldn't normally put API requests here bec it could take awhile?
  // usually put them in Redux Thunk/Middleware?
  handleSubmit = (e) => {
    e.preventDefault();

    // make HTTP request to Node backend
    axios.get("/getLiveStreams").then((response) => {
      // console.log(response.data);   //=> 
      // console.log(response);
      this.setState({
        streamData: response.data
      });
    });
  }


  renderArtists = () => {
    const { artists } = this.state;

    let artistsLi = artists.map((artist, idx) => {
      return (
        <li key={idx}>
          {artist}
        </li>
      );
    });

    // return null if no artists
    return (artistsLi.length) ? artistsLi : null;
  }


  renderStreams = () => {
    return null;
  }


  render() {
    // debugger
    console.log(this.state);
    

    return (
      <div>
        <h1>Find Who is Live Streaming on TWITCH</h1>

        <div className="artists-wrap">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input 
                type="text" 
                value={this.state.name} 
                onChange={this.handleChange}
              />
            </label>
            <button onClick={this.handleAddUser}>Add User</button>
            <div>
              <input type="submit" value="Search"/>
            </div>
          </form>
        </div>

        <div className="artists-list">
          <ul>
            {this.renderArtists()}
          </ul>
        </div>

        <div className="live-streams">
          <ul>
            {this.renderStreams()}
          </ul>
        </div>

        {/* <button onClick={this.handleButtonClick}>Get weather in NYC</button> */}
      </div>
    );
  }
}

export default Main;





// // FROM TUTORIAL: https://www.youtube.com/playlist?list=PLQg6GaokU5Cytkk1SXh8eYL9gBMKxh8rq
// class Weather extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       weather: null
//     };
//   }


//   // componentDidMount = () => {
//   //   // make HTTP request to Node backend
//   //   axios.get("/getWeatherNewYork").then((response) => {
//   //     // console.log(response.data);   //=> { temp: 12 }
//   //     // console.log(response);
//   //     this.setState({
//   //       weather: response.data.temp
//   //     });
//   //   });
//   // }


//   // NOTE* you shouldn't normally put API requests here bec it could take awhile?
//   // usually put them in Redux Thunk/Middleware?
//   handleButtonClick = () => {

//     // make HTTP request to Node backend
//     axios.get("/getWeatherNewYork").then((response) => {
//       // console.log(response.data);   //=> { temp: 12 }
//       // console.log(response);
//       this.setState({
//         weather: response.data.temp
//       });
//     });
//   }


//   render() {
//     return (
//       <div>
//         <button onClick={this.handleButtonClick}>Get weather in NYC</button>
//         <h1>The weather in NYC is: {this.state.weather}</h1>
//       </div>
//     );
//   }
// }

// export default Weather;