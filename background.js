let searchString;
let xcoord;
let ycoord;

chrome.contextMenus.create({
  title: "Show Fantasy Stats",
  contexts:["selection"],
  onclick: function(e) {
    xcoord = (e.pageX);
    ycoord = (e.pageY);
    console.log(xcoord);
    chrome.tabs.executeScript({
      code: 'something',
      file: 'inject.js'
    });
    chrome.tabs.executeScript({
      file: "jquery.js"
    });
    chrome.tabs.executeScript({
      file: "results.js"
    });
    searchString = (e.selectionText);

    // chrome.tabs.create({url: "results.html"});
    // console.log((e.selectionText));
  }
});



chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  if(request.action === 'getResults'){
    sendResponse({source: searchString});
  }
});


// $(function(fName,lName) {
//   $.get(`http://cors.io/?http://www.nba.com/players/james/harden/`, function(data){
//     let htmlData = data;
//     let feed = $(htmlData).find('.nba-player-stats-traditional');
//     let stats = $(feed).find('tr');
//     $('.main').append(stats);
//   });
// });

// $(function(fName,lName) {
//   // let lastInitial = lName[0];
//   // let lNameUrl = lName.slice(0,4);
//   // let fNameUrl = fName.slice(0,1);
//   // let fNameCaps = fName.toUpperCase();
//   // let lNameCaps = lName.toUpperCase();
//
//   $.get(`http://cors.io/?http://www.basketball-reference.com/players/c/curryst01.html/`, function(data){
//   // $.get(`http://cors.io/?http://www.basketball-reference.com/players/${lastInitial}/${lNameUrl}${fNameUrl}01.html/`, function(data){
//     let htmlData = data;
//     let meta = $(htmlData).find('.players').children()[0];
//     let name = $(meta).find('h1').eq(0);
//     let table = $(htmlData).find('tbody').eq(0);
//     // let season = $(table).find('tr').eq(7); // need to get last season
//     let season = $(table).find('tr:last-child'); // need to get last season
//     let fgp = $(season).children()[10].innerText; //done
//     let ftp = $(season).children()[20].innerText; //done
//     let ppg = $(season).children()[29].innerText; //done
//     let rpg = $(season).children()[23].innerText;
//     let apg = $(season).children()[24].innerText;
//     let spg = $(season).children()[25].innerText;
//     let bpg = $(season).children()[26].innerText; //done
//     let tpg = $(season).children()[27].innerText; //done
//     let tre = $(season).children()[11].innerText; //done
//
//     // let listItem = newListItem("initial");
//
//
//     // let gp = $(season).children()[5].innerText; //done
//     // let threepg = tre/gp;
//
//
//     // $('.main').append(fNameCaps);
//     // $('.main').append(lNameCaps);
//
//     $('.main').append(name);
//     // $('.main').append(season);
//     $('.main').append(fgp);
//     $('.main').append(ftp);
//     $('.main').append(ppg);
//     $('.main').append(tre);
//     $('.main').append(rpg);
//     $('.main').append(apg);
//     $('.main').append(spg);
//     $('.main').append(bpg);
//     $('.main').append(tpg);
//     // console.log(stats);
//     console.log(name);
//     console.log("FG%:" + fgp);
//     console.log("FT%:" + ftp);
//     console.log("PPG:" + ppg);
//     console.log("3PG:" + tre);
//     console.log("RPG:" + rpg);
//     console.log("APG:" + apg);
//     console.log("SPG:" + spg);
//     console.log("BPG:" + bpg);
//     console.log("TPG:" + tpg);
//   });
// });
// need to extract from input
// first letter of last name
// first 5 letters of last name
// first two letters of first name
// let name = $(htmlData).find('.players').children()[0].children()[1].children()[0].innerText;
