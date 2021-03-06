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
    'ryan anderson': '201583',
    'giannis antetokounmpo': '203507',
    'carmelo anthony': '2546',
    'trevor ariza': '2772',
    'lonzo ball': '1628366',
    'harrison barnes' : '203084',
    'nicolas batum': '201587',
    'bradley beal': '203078',
    'patrick beverley': '201976',
    'eric bledsoe': '202339',
    'devin booker': '1626164',
    'avery bradley': '202340',
    'jimmy butler': '202710',
    'clint capela':'203991',
    'demarre carroll': '201960',
    'mike conley': '201144',
    'demarcus cousins': '202326',
    'jae crowder': '203109',
    'seth curry': '203552',
    'stephen curry': '201939',
    'anthony davis': '203076',
    'luol deng': '2736',
    'demar derozan': '201942',
    'goran dragic': '201609',
    'andre drummond': '203083',
    'kevin durant': '201142',
    'joel embiid': '203954',
    'derrick favors': '202324',
    'danilo gallinari': '201568',
    'marc gasol': '201188',
    'pau gasol': '2200',
    'rudy gay': '200752',
    'paul george': '202331',
    'manu ginobili': '1938',
    'rudy gobert': '203497',
    'aaron gordon': '203932',
    'marcin gortat': '101162',
    'danny green': '201980',
    'draymond green':'203110',
    'blake griffin': '201933',
    'tobias harris': '202699',
    'gordon hayward': '202330',
    'al horford': '201143',
    'dwight howard': '2730',
    'andre iguodala': '2738',
    'reggie jackson': '202704',
    'lebron james':'2544',
    'deandre jordan': '201599',
    'james harden': '201935',
    'george hill': '201588',
    'serge ibaka': '201586',
    'brandon ingram': '1627742',
    'kyrie irving': '202681',
    'nikola jokic': '203999',
    'brandon knight': '202688',
    'kyle korver': '2594',
    'kawhi leonard': '202695',
    'damian lillard': '203081',
    'jeremy lin' : '202391',
    'brook lopez': '201572',
    'kyle lowry': '200768',
    'kevin love': '201567',
    'ian mahinmi': '101133',
    'cj mccollum': '203468',
    'khris middleton': '203114',
    'paul millsap': '200794',
    'greg monroe': '202328',
    'dirk nowitzki': '1717',
    'victor oladipo': '203506',
    'chandler parsons': '202718',
    'chris paul': '101108',
    'zaza pachulia': '2585',
    'jabari parker': '203953',
    'tony parker': '2225',
    'kristaps porzingis': '204001',
    'zach randolph': '2216',
    'jj redick': '200755',
    'andre roberson': '203460',
    'brian roberts': '203148',
    'ricky rubio': '201937',
    'jr smith': '2747',
    'lance stephenson': '202362',
    'jeff teague': '201952',
    'klay thompson': '202691',
    'isaiah thomas': '202738',
    'karl-anthony towns': '1626157',
    'jonas valanciunas': '202685',
    'nikola vucevic': '202696',
    'dwayne wade': '2548',
    'dion waiters': '203079',
    'kemba walker': '202689',
    'john wall': '202322',
    'russell westbrook': '201566',
    'hassan whiteside': '202355',
    'andrew wiggins': '203952',
    'marvin williams': '101107',
    'thaddeus young': '201152',
    'cody zeller': '203469',
    'tyler zeller': '203092',
    'paul zipser': '1627835',
    'ivica zubac': '1627826'
  }

  let fName = searchString.split(" ")[0].toLowerCase();
  fName = fName.replace('.','').replace("'","");
  let lName = searchString.split(" ")[1].toLowerCase();
  lName = lName.replace('.','').replace("'","");
  let fullName = fName + " " + lName;
  let nameString = fName.toUpperCase() + " " +  lName.toUpperCase();
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
