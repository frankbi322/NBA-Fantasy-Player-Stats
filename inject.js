// chrome.runtime.sendMessage({action: 'getCoords'},function(response) {
//   console.log("Response.source:" + response.source);
//   createDiv(response.source);
// });


// function createDiv(coords) {

(function (){

	// console.log(coords);
	// just place a div at top right
  var prevDiv = document.getElementById("chrome-results");
  if (prevDiv) {
  prevDiv.parentNode.removeChild(prevDiv);
  }

  var div = document.createElement('div');
  div.id="chrome-results";
	div.className="results";
  div.style.display = 'flex';
	div.style.flexDirection = 'column';
	div.style.position = 'fixed';
	div.style.width = '180px';
	div.style.height = '500px';
  div.style.fontWeight = 700;
  div.style.padding = '10px';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'space-between';
	// div.style.left = x;
	// div.style.top = y;
	div.style.top = '100px';
	div.style.right = '125px';
  div.style.backgroundColor = "#f2f4f7";
  div.style.fontSize = '14px';
  div.style.boxShadow = '5px 5px 5px 0px rgba(0,0,0,0.75';
  div.style.zIndex = "10000000";
  div.style.border = '1px solid gray';
  div.style.borderRadius = '5px';

	// div.textContent = 'Injected!';
  var ul = document.createElement('ul');
  ul.id = "player-detail-list";
  // console.log(results);
  div.appendChild(ul);
	document.body.appendChild(div);

	// alert('inserted self... giggity');

})();
