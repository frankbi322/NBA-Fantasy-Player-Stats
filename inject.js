(function(xcoord,ycoord) {
	var x = xcoord + 'px';
	var y = ycoord + 'px';
	console.log(x);
	// just place a div at top right
	var div = document.createElement('div');
  div.id="results";
	div.className="results";
  div.style.display = 'flex';
	// div.style.flex-direction = 'column';
	div.style.position = 'absolute';
	div.style.left = x;
	div.style.top = y;
	// div.style.top = '50%';
	// div.style.right = 0;
  div.style.backgroundColor = "yellow";
  div.style.zIndex = 1000;
  div.style.border = '1px solid-black';
	// div.textContent = 'Injected!';
  var ul = document.createElement('ul');
  ul.id = "player-detail-list";
  // console.log(results);
  div.appendChild(ul);
	document.body.appendChild(div);

	// alert('inserted self... giggity');

})();
