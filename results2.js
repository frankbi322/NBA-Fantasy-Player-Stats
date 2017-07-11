chrome.runtime.sendMessage({action: 'getResults'},function(response) {
  searchPlayer(response.source);
});



function searchPlayer (searchString) {

  const players = {
    'alex abrines': '203518',
    'quincy acy': '203112',
    'steven adams': '203500',
    'bam adebayo' : '1628389',
    'lamarcus aldridge': '200746',
    'ryan anderson': '',
    'giannis antetokounmpo': '',
    'carmelo anthony': '2546',
    'Trevor Ariza': '',
    'lonzo ball': '1628366',
    'nicolas batum': '201587',
    'bradley beal': '',
    'patrick beverley': '',
    'eric bledsoe': '',
    'devin booker': '1626164',
    'avery bradley': '',
    'jimmy butler': '202710',
    'Clint Capela':'',
    'demarre carroll': '',
    'mike conley': '',
    'demarcus cousins': '',
    'jae crowder': '',
    'seth curry': '203552',
    'stephen curry': '201939',
    'anthony davis': '203076',
    'luol deng': '',
    'demar derozan': '',
    'goran dragic': '',
    'andre drummond': '',
    'kevin durant': '201142',
    'joel embiid': '203954',
    'derrick favors': '',
    'danilo gallinari': '',
    'marc gasol': '',
    'pau gasol': '',
    'Rudy Gay': '',
    'paul george': '202331',
    'manu ginobili': '',
    'rudy gobert': '',
    'aaron gordon': '',
    'marcin gortat': '',
    'danny green': '',
    'draymond green':'203110',

    'blake griffin': '',
    'Tobias Harris': '',
    'gordon hayward': '202330',
    'al horford': '',
    'dwight howard': '2730',
    'andre iguodala': '2738',
    'reggie jackson': '',
    'lebron james':'2544',
    'deandre jordan': '',
    'james harden': '201935',
    'george hill': '',
    'serge ibaka': '',
    'brandon ingram': '1627742',
    'kyrie irving': '202681',
    'Nikola Jokic': '',
    'brandon knight': '',
    'kyle korver': '2594',
    'kawhi leonard': '202695',
    'damian lillard': '203081',
    'brook lopez': '201572',
    'kyle lowry': '',
    'kevin love': '201567',
    'ian mahinmi': '',
    'cj mccollum': '203468',
    'khris middleton': '',
    'paul millsap': '200794',
    'greg monroe': '',
    'dirk nowitzki': '1717',
    'victor oladipo': '',
    'chandler parsons': '',
    'chris paul': '101108',
    'zaza pachulia': '2585',
    'kristaps porzingis': '204001',
    'zach randolph': '',
    'jj reddick': '',
    'andre roberson': '203460',
    'brian roberts': '203148',
    'ricky rubio': '',
    'jr smith': '',
    'lance stephenson': '202362',
    'jeff teague': '',
    'klay thompson': '202691',
    'isaiah thomas': '202738',
    'karl-anthony towns': '1626157',
    'jonas valanciunas': '',
    'nikola vucevic': '',
    'dwayne wade': '2548',
    'dion waiters': '203079',
    'kemba walker': '',
    'john wall': '',
    'russell westbrook': '201566',
    'hassan whiteside': '',
    'andrew wiggins': '',
    'marvin williams': '',
    'thaddeus young': '',
    'cody zeller': '',
    'tyler zeller': '203092',
    'paul zipser': '1627835',
    'ivica zubac': '1627826'
  }

  let fName = searchString.split(" ")[0].toLowerCase();
  fName = fName.replace('.','').replace("'","");
  let lName = searchString.split(" ")[1].toLowerCase();
  lName = lName.replace('.','').replace("'","");
  let fullName = fName + " " + lName;
  let nameString = fName.toUpperCase() + lName.toUpperCase();
  let url = "https://data.nba.net/10s/prod/v1/2017/players/" + players[fullName] + "_profile.json";

  // console.log(players[fullName]);

  if (players[fullName] !== undefined) {
  fetch(url)
  .then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    const season = json.league.standard.stats.regularSeason.season[0].total;
    const seasonYear = json.league.standard.stats.regularSeason.season[0].seasonYear;
    const assists = ("Assists: " + season.apg);
    const blocks = ("Blocks: " + season.bpg);
    const fieldgoal = ("Field Goal %: " + season.fgp);
    const freethrow = ("Free Throw%: " + season.ftp);
    const points = ("Points: " + season.ppg);
    const rebounds = ("Rebounds: " + season.rpg);
    const steals = ("Steals: " +season.spg);
    const threes = ("3-Point%: " + season.tpp);
    const turnovers = ("Turnovers: " + season.topg);

    let stats = [nameString, fieldgoal,freethrow,threes,points,rebounds,assists,steals,blocks,turnovers];
    displayPlayerDetail(seasonYear, stats, url);
  });
} else {
  handleError();
}



function addName(name){
  const playerName = document.createElement('h3');
  playerName.textContent = name;
  playerName.style.textAlign = 'center';
  playerName.style.padding = '5px';
  playerName.style.fontSize = '18px';
  const results = document.getElementById('chrome-results');
  results.appendChild(playerName);
}

function displayPlayerDetail(year,stats,link) {
  addHeader(year);
  stats.forEach(stat => {
    addStat(stat);
  });
  addSource(link);
  addClose();
}

function addSource(link){
  const playerlink = document.createElement('a');
  playerlink.href = link;
  playerlink.textContent = "Source";
  playerlink.style.fontColor="blue";
  playerlink.style.textDecoration="underline";
  const results = document.getElementById('chrome-results');
  results.appendChild(playerlink);
}

function newListItem(){
  const li = document.createElement('span');
  li.className = "player-detail";
  return li;
}

function addHeader(seasonYear){
  const header = document.createElement('h3');
  header.textContent = seasonYear + "-" + (seasonYear + 1) + " Season Stats (Per Game):";
  header.style.fontSize = '16px';
  header.style.textAlign = 'center';
  const results = document.getElementById('chrome-results');
  results.appendChild(header);
}

function addStat(stat) {
  const li = newListItem();
  li.textContent = stat;
  li.style.fontSize = 14;
  const list = document.getElementById('chrome-results');
  list.appendChild(li);
}

function handleClose(){
  var prevDiv = document.getElementById("chrome-results");
  prevDiv.parentNode.removeChild(prevDiv);
}

function handleError() {
  const error = document.createElement('h3');
  error.textContent = "No player found!";
  error.style.textAlign = 'center';
  const results = document.getElementById('chrome-results');
  results.appendChild(error);
  addClose();
}

function addClose(){
  const close = document.createElement('button');
  close.textContent = "CLOSE";
  close.onclick = handleClose;
  close.style.backgroundColor="#147cd1";
  close.style.color="#fff";
  close.style.fontWeight=400;
  close.style.borderRadius="2px";
  close.style.cursor="pointer";
  close.style.textAlign="center";
  close.style.width="auto";
  close.style.letterSpacing="1px";
  const results = document.getElementById('chrome-results');
  results.appendChild(close);
}
}
