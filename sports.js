var async = require("async");

var conf = require("../../conf/conf.json");
var oauth = require("./oauth.js");

document.addEventListener('DOMContentLoaded',() => {

});



exports.getPlayers = function(keys, cb) {
  console.log("http://fantasysports.yahooapis.com/fantasy/v2/players;player_keys=" + keys.join(",") + "?format=json");
  oauth.get(
    "http://fantasysports.yahooapis.com/fantasy/v2/player/364.p.4563/stats" + "?format=json",

    // "http://fantasysports.yahooapis.com/fantasy/v2/players;player_keys=" + keys.join(",") + "?format=json",
    null,
    null,
    function(e, data, resp) {
      data = JSON.parse(data);
      cb(data);
  });
};

`http://fantasysports.yahooapis.com/fantasy/v2/player/364.p.${player_id}/stats`


// YQL
// select * from fantasysports.players.stats where league_key='364.l.167407' and player_key='364.p.4563'
// 364 refers to 2016 NBA season
// 167407 is empty league so i can access YQL

//need additional YQL query to find out number of games played. YQL returns totals, not averages

// stat_id 5 FG%
// stat_id 8 FT%
// stat_id 10 3P
// stat_id 12 total points
// stat_id 15 total rebounds
// stat_id 16 total assists
// stat_id 17 total steals
// stat_id 18 total blocks
// stat_id 19 total turnovers
