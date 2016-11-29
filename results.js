chrome.runtime.sendMessage({action: 'getResults'},function(response) {
  console.log("Response.source:" + response.source);
  searchPlayer(response.source);
});

function searchPlayer (searchString) {
  let fName = searchString.split(" ")[0];
  let lName = searchString.split(" ")[1];
  console.log(fName);
  console.log(lName);
  let lastInitial = lName[0].toLowerCase();
  console.log(lastInitial);
  let lNameUrl = lName.slice(0,5).toLowerCase();
  let fNameUrl = fName.slice(0,2).toLowerCase();
  console.log(lNameUrl);
  console.log(fNameUrl);
  let fNameCaps = fName.toUpperCase();
  let lNameCaps = lName.toUpperCase();
  let url = `http://cors.io/?http://www.basketball-reference.com/players/${lastInitial}/${lNameUrl}${fNameUrl}01.html/`;

  $.get(url, function(data){

    let htmlData = data;
    let meta = $(htmlData).find('.players').children()[0];
    let name = $(meta).find('h1').eq(0);
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
    let link = url;

    let stats = [name,fgp,ftp,ppg,rpg,apg,spg,bpg,tpg,tre,link];
    displayPlayerDetail(stats);

  });
}

function displayPlayerDetail(stats) {
  stats.forEach(stat => {
    addStat(stat);
  });
}

function newListItem(){
  const li = document.createElement('li');
  li.className = "player-detail";
  return li;
}

function addStat(stat) {
  const li = newListItem();
  li.textContent = stat;
  const list = document.getElementById('player-detail-list');
  list.appendChild(li);
}
