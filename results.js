chrome.runtime.sendMessage({action: 'getResults'},function(response) {
  searchPlayer(response.source);
});



function searchPlayer (searchString) {
  let fName = searchString.split(" ")[0];
  fName = fName.replace('.','');
  let lName = searchString.split(" ")[1];
  let index = indexNum(searchString.toLowerCase());
  // console.log(fName);
  // console.log(lName);
  let lastInitial = lName[0].toLowerCase();
  // console.log(lastInitial);
  let lNameUrl = lName.slice(0,5).toLowerCase();
  let fNameUrl = fName.slice(0,2).toLowerCase();
  // console.log(lNameUrl);
  // console.log(fNameUrl);
  let fNameCaps = fName.toUpperCase();
  let lNameCaps = lName.toUpperCase();
  let url = `http://cors.io/?http://www.basketball-reference.com/players/${lastInitial}/${lNameUrl}${fNameUrl}${index}.html/`;
  let link = url.slice(16); //remove the cors from it
  let prefix = document.URL.substring(0,5);


  // if (prefix==='https'){
  //   console.log("alert!");
  //   alert("This extension does not support HTTPS addresses.");
  // }

  if (prefix!=='https'){


  $.get(url, function(data){

    let htmlData = data;
    let meta = $(htmlData).find('.players').children()[0];

    if (meta) {

    let name = $(meta).find('h1').eq(0)[0].innerText;
    let pictureSrc = $(meta).find('img')[0].src;
    let table = $(htmlData).find('tbody').eq(0);
    let season = $(table).find('tr:last-child'); // need to get last season
    let seasonId = season[0].innerText.substring(0,4);
    console.log(season[0].innerText.substring(0,4));
    let fgp = ("Field Goal %: " + $(season).children()[10].innerText); //done
    let ftp = ("Free Throw%: " + $(season).children()[20].innerText); //done
    let ppg = ("Points: " + $(season).children()[29].innerText); //done
    let rpg = ("Rebounds: " + $(season).children()[23].innerText);
    let apg = ("Assists: " + $(season).children()[24].innerText);
    let spg = ("Steals: " + $(season).children()[25].innerText);
    let bpg = ("Blocks: " + $(season).children()[26].innerText); //done
    let tpg = ("Turnovers: " + $(season).children()[27].innerText); //done
    let tre = ("3-Pointers: " + $(season).children()[11].innerText); //done

    if (seasonId==='2016') {
    let stats = [fgp,ftp,ppg,rpg,apg,spg,bpg,tpg,tre];
    addPicture(pictureSrc);
    addName(name);
    displayPlayerDetail(stats,link);
  } else {
    handleNotInNBA();
  }
  } else {
    handleError();
  }

  });
} else {
  console.log("handling error");
  const httpsError = document.createElement('h3');
  httpsError.textContent = "This extension currently does not support HTTPS websites";
  httpsError.style.textAlign = 'center';
  const results = document.getElementById('chrome-results');
  results.appendChild(httpsError);
  addClose();
}
}

function addName(name){
  const playerName = document.createElement('h3');
  playerName.textContent = name;
  playerName.style.textAlign = 'center';
  playerName.style.padding = '5px';
  const results = document.getElementById('chrome-results');
  results.appendChild(playerName);
}


function addPicture(imgSrc) {
  const img = document.createElement('img');
  img.src = imgSrc;
  img.style.width = '92px';
  img.style.height = '142px';
  img.style.alignSelf = 'center';
  const results = document.getElementById('chrome-results');
  results.appendChild(img);
}

function displayPlayerDetail(stats,link) {
  addHeader();
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

function addHeader(){
  const header = document.createElement('h3');
  header.textContent = "Season Stats (Per Game):";
  header.style.textAlign = 'center';
  const results = document.getElementById('chrome-results');
  results.appendChild(header);
}

function addStat(stat) {
  const li = newListItem();
  li.textContent = stat;
  const list = document.getElementById('chrome-results');
  list.appendChild(li);
}

function handleError() {
  const error = document.createElement('h3');
  error.textContent = "No player found!";
  error.style.textAlign = 'center';
  const results = document.getElementById('chrome-results');
  results.appendChild(error);
  addClose();
}

function handleNotInNBA(){
  const error = document.createElement('h3');
  error.textContent = "Error: This Player Has Not Played in 2016-17 Season";
  error.style.textAlign = 'center';
  const results = document.getElementById('chrome-results');
  results.appendChild(error);
  addClose();
}

function handleClose(){
  var prevDiv = document.getElementById("chrome-results");
  prevDiv.parentNode.removeChild(prevDiv);
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


function indexNum(searchString) {

  let twos = [
    'danny green',
    'anthony davis',
    'markieff morris',
    'kevin martin',
    'harrison barnes',
    'isaiah thomas',
    'bobby brown',
    'anthony brown',
    'tim hardaway',
    'larry nance',
    'marshall plumlee'

  ];

  let threes = [
    'marcus morris'
  ];

  if (threes.includes(searchString)){
    return '03';
  } else if (twos.includes(searchString)) {
    return '02';
  }
  else {
    return '01';
  }
}
