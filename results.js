chrome.runtime.sendMessage({action: 'getResults'},function(response) {
  console.log("Response.source:" + response.source);
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

  $.get(url, function(data){

    let htmlData = data;
    let meta = $(htmlData).find('.players').children()[0];

    if (meta) {

    let name = $(meta).find('h1').eq(0)[0].innerText;
    let table = $(htmlData).find('tbody').eq(0);
    let season = $(table).find('tr:last-child'); // need to get last season
    let fgp = ("FG%: " + $(season).children()[10].innerText); //done
    let ftp = ("FT%: " + $(season).children()[20].innerText); //done
    let ppg = ("PPG: " + $(season).children()[29].innerText); //done
    let rpg = ("RPG: " + $(season).children()[23].innerText);
    let apg = ("APG: " + $(season).children()[24].innerText);
    let spg = ("SPG: " + $(season).children()[25].innerText);
    let bpg = ("BPG: " + $(season).children()[26].innerText); //done
    let tpg = ("TPG: " + $(season).children()[27].innerText); //done
    let tre = ("3PG: " + $(season).children()[11].innerText); //done
    let link = url.slice(16); //remove the cors from it

    let stats = [name,fgp,ftp,ppg,rpg,apg,spg,bpg,tpg,tre,link];

    displayPlayerDetail(stats);
  } else {
    handleError();
  }

  });
}

function displayPlayerDetail(stats) {
  stats.forEach(stat => {
    addStat(stat);
  });
}

function newListItem(){
  const li = document.createElement('h3');
  li.className = "player-detail";
  return li;
}

function addStat(stat) {
  const li = newListItem();
  li.textContent = stat;
  const list = document.getElementById('results');
  list.appendChild(li);
}

function handleError() {
  const error = document.createElement('h2');
  error.textContent = "No player found!";
  const results = document.getElementById('results');
  results.appendChild(error);
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
    'larry nance'

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
