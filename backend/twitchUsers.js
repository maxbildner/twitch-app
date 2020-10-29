const twitchUsers = [
  "gabrielanddresden",
  "insomniac",
  "itsgoodtv",
  "paxahau",
  "djjazzyjeff",
  "elseworldtv",
  "chris_liebing_official",
  "beatportofficial",
  "maryle_mar",
];

// create string of twitch users separated by "&user_login="
const twitchUsersURL = "?user_login=" + twitchUsers.join("&user_login=");


module.exports = twitchUsersURL;