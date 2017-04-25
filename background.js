let searchString;
let xcoord;
let ycoord;
let coords;

chrome.contextMenus.create({
  title: "Show Fantasy Stats",
  contexts:["selection"],
  onclick: function(e) {
    chrome.tabs.executeScript({
        file: 'inject.js'
    });
    chrome.tabs.executeScript({
      file: "jquery.js"
    });
    chrome.tabs.executeScript({
      file: "results.js"
    });
    coords = {xcoord,ycoord};
    searchString = (e.selectionText);
  }
});



chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  if(request.action === 'getResults'){
    sendResponse({source: searchString});
  }


});
