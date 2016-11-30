document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var div = document.createElement( 'div' );


//append all elements
document.body.appendChild( div );
//set attributes for div
div.id = 'player-info';
div.style.position = 'fixed';
div.style.top = '50%';
div.style.left = '50%';
div.style.width = '150px';
div.style.height = '150px';
div.style.hidden = 'true';
div.style.backgroundColor = 'yellow';
div.url = 'results.html';
