### NBA Fantasy Sports Summary

## Background

As an avid fantasy basketball player, I would often read news articles about the NBA during breaks at work. Most of these articles would simply summarize a player's most recent game performance. Some would provide barebones season stats, such as points, rebounds, and assists. However, fantasy basketball players are usually interested in the whole package of statistics, and would usually have to switch over to a new tab to look up that player's statistics on a dedicated fantasy website.

And so, I decided to create an extension that would help bridge this gap. This extension should scan a web page for all instances of the 400+ current NBA players in a string format, and run scripts that, when hovering over a player's name, shows a popup on the page with all their pertinent stats for the season.

### Functionality & MVP

With this extension, users will be able to:

- [ ] Go to any web page that mentions a  current NBA player
- [ ] Stats provided by Yahoo Fantasy Sports API should match
- [ ] The popup should have a link that redirects the user to the player's fantasy page or NBA page.

### Wireframes

![wireframes](https://github.com/frankbi322/nba-fantasy-chrome-extension/blob/master/Wireframe.png)

### Technologies and Technical challenges

This extension will be implemented using the standard Chrome extension technology: Javascript, HTML, and CSS. In addition to the manifest.json and package.json files, there will be a script:

player.js: will contain the logic for finding players and generating elements in the DOM
There will also be an HTML file to display the content:

player.html: the file containing the player popup to be displayed
The primary technical challenge are:

Pulling a player's data from the Yahoo Fantasy Sports API.
Since Yahoo refers to players by an arbitrary ID, setting up a translation database to connect all 400+ current NBA players to their respective IDs to set up their individual queries.

### Implementation Timeline

**Day 1**: Get started on the infrastructure of the extension, following this guide from Chrome. By the end of the day, I will have:

- A completed package.json
- A completed manifest.json
- The ability to locate and alter a DOM element by class

**Day 2-3**: Read through the Yahoo Fantasy Sports API documentation and set up the framework to make requests to the API. Write the HTML for the popups. By the end of these two days, I will have:

- The ability to generate the desired popup for one test NBA player (James Harden)
- Popups being generated on multiple news sources

**Day 4**: By now I should be able to have a working extension for one NBA player. I will flesh out the rest of my framework to include the other 400+ players. By the end of the day I should have:

- An extension that does the same for every current NBA player
