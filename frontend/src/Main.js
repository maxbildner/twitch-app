import React from 'react';
import axios from "axios";


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // artists: [],
      artists: [
        "gabrielanddresden",
        "insomniac",
        "itsgoodtv",
        "paxahau",
        "djjazzyjeff",
        "elseworldtv",
        "chris_liebing_official",
        "beatportofficial",
        "maryle_mar"],
      name: '',
      streamData: [],
    };
  }


  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }


  handleAddUser = (e) => {
    e.preventDefault();

    let newUsers = this.state.artists.slice();

    if (this.state.name.trim() !== "") {
      newUsers.push(this.state.name);
      this.setState({ artists: newUsers, name: ''});

    } else {
      alert("Form can't be blank!");
    }
  }


  // NOTE* you shouldn't normally put API requests here bec it could take awhile?
  // usually put them in Redux Thunk/Middleware?
  handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      params: { users: this.state.artists }
    };

    // make HTTP request to Node backend (send list of artists to backend)
    axios.get("/getLiveStreams", options).then((response) => {
      // console.log(response);
      // console.log(response.data);   //=> 

      if (response.status === 200) {
        this.setState({
          streamData: response.data.data    // array of objects
        });

      } else {
        console.log(response.status);
      }
    });
  }


  renderArtists = () => {
    const { artists } = this.state;

    let artistsLi = artists.map((artist, idx) => {
      return (
        <li key={idx} className="artists-li">
          {artist}
        </li>
      );
    });

    // return null if no artists
    return (artistsLi.length) ? artistsLi : null;
  }


  renderStreams = () => {
    const { streamData } = this.state;

    let liveStreamers = streamData.map((artistObj, idx) => {
      let thumbnailImgUrl = artistObj.thumbnail_url;

      // replace "width" and "height" with actual numbers (100 px)
      thumbnailImgUrl = thumbnailImgUrl.split("{width}").join("100");   
      thumbnailImgUrl = thumbnailImgUrl.split("{height}").join("100");

      let thumbnailImg = <img src={thumbnailImgUrl}/>;
      let liveUrl = `https://www.twitch.tv/${artistObj.user_name}`;

      return (
        <li key={idx} className="streams-li">
          <a href={liveUrl} target="_blank" className="stream-url">
            <span className="thumbnail-img">{thumbnailImg}</span> 
            <span className="streams-user_name">{artistObj.user_name}</span> 
            {/* <iframe src={`https://player.twitch.tv/?channel=${artistObj.user_name}&parent=http://34.205.63.217`} frameBorder="0" allowFullScreen="true" scrolling="no" height="378" width="620"></iframe> */}
          </a>
        </li>
      );
    })

    return (liveStreamers.length) ? liveStreamers : null;
  }


  render() {
    console.log("STATE:", this.state);
    

    return (
      <div className="main-wrap">
        <header className="App-header">
          <h1>Find Who's Live Streaming on Twitch.tv</h1>
        </header>

        <div className="artists-wrap">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input 
                type="text" 
                value={this.state.name} 
                onChange={this.handleChange}
                className="input-field-adduser"
              />
            </label>
            <button onClick={this.handleAddUser}>Add User</button>
            <div>
              <input type="submit" value="Search" className="input-button"/>
            </div>
          </form>
        </div>

        <div className="artists-list">
          <ul>
            {this.renderArtists()}
          </ul>
        </div>

        <h2 className="results">Results: </h2>

        <div className="live-streams">
          <ul>
            {this.renderStreams()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Main;


// TO DO

// DONE
// - width for iphone vertical
// - styling input fields
// - git repo link

// TWITCH JS EMBED
// {/* !-- Add a placeholder for the Twitch embed -->
//             // <div id="twitch-embed"></div>

//             {/* <!-- Load the Twitch embed script --> */}
// <script src="https://player.twitch.tv/js/embed/v1.js"></script>

// {/* <!-- Create a Twitch.Player object. This will render within the placeholder div --> */ }
// <script type="text/javascript">{
//   new Twitch.Player("twitch-embed", {
//     channel: artistObj.user_name
//   })}
// </script>



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


// 0: { id: "39815181116", user_id: "456427110", user_name: "BeatportOfficial", game_id: "26936", type: "live", … }
// 1: { id: "39611456029", user_id: "232672264", user_name: "Insomniac", game_id: "26936", type: "live", … }
// 2: { id: "40268717694", user_id: "12543514", user_name: "paxahau", game_id: "26936", type: "live", … }