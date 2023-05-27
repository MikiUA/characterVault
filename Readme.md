
# MikiUA's Character/Personage sharing website
<h4>
This is the application for character creation and showcasing.
<br>It is intended to be a convenient environment for storing (and sharing) elaborate fictional character ideas.
<br><br>
<i>Features</i> of application include creating and changing any character feature, sorting character by unions/collections (created by users), color separation, sorting by features, and more.
<br><br>
<i>Target audience: </i>It might be useful for book/script/film writers, game designers, DnD players or other aspiring creators that want to have quick access to many characters and recall any of their features on a whim.
</h4>
<b>Note: </b> This application is <i>work in progress</i>. A lot of code hangs up on loose ends and is never reached, but is meant to be a base for future updates.
<br><br>

![Gallery](./Screenshots/0.Gallery.jpg "Gallery, Main Application Page")

other <b>screenshots</b> can be found in the corresponding subfolder.

## Features v0.3

* User authentification to access creating and editing characters.
* Responsive design that looks nice on any device (<b>screenshots</b> provided in corresponding folder). Partly used Material UI.
* Change theme at any time based on personal preference.
* Quick and easy navigation through the top panel.
* Access to the nice card-based view of character list, with the ability to click any of the cards to get advanced information on the needed character. No need to go to the different page or reload the list.
* Intuitive interface for updating characters.
* REST API, with a server that can be accessed through any third-party software.

## Licence
There is no licence to this project yet. This means the work is under exclusive copyright by default. Nobody else can copy, distribute, or modify this work without being at risk of take-downs, shake-downs, or litigation. 
<br>This project is planned to be released with an opensource licence once it is finished. Until then, only review of the code is allowed.
<br>The idea as well as design fully belong to the creator of this application.
  
  
## Architecture Details
The application runs three separate instances: 
* MongoDB database server (default:localhost/27017). This contains table of users, table of collections, table of characters.
* Node.js backend server (works as an api) (default: localhost/8081). Uses Express. Opens a new database connection on every request, and closes it when request is resolved. Has a custom logger as well as error handler
* React frontend application. Mostly functional components. Navigation is done with react-router-dom.
API and Database documentation will be released with later versions, as those may change. Architecture documentation is currently being worked on.

## Future plans for developement are:
1.  Group characters you need in a collection, however you want - by the world they are from, by favourites or even by their eye color 
2. Make the search/sort menu, where you could find characters by name, identifier or other features
3. Add an ability to create and modify collections/workflows.
4. Add a suggestion list for any character parameters
5. ???
6. HOST IT!
<i><b>Note:</b> There are a lot more plans an exiting ideas I want to make true, be ready for updates in future versions.</i>
  
## Frameworks and libraries used
Node.js and MongoDB are required to run this application.<br>
For the backend folder i used: `express, mongodb, jsonwebtoken` as well as `nodemon ` and `dotenv` for `dev` dependencies
<br>For the frontend folder:  `react-router-dom` and 
[Material UI](https://mui.com/material-ui/getting-started/installation/)

## Feedback and Contributing
For any changes, please open an issue first to discuss what you would like to change.
