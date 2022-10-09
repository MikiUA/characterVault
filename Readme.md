# MikiUA's Character/Personage sharing website
<h4>
This is the application for character creation and showcasing.<br>
It is intended to be a convenient environment for storing (and sharing) elaborate fictional character ideas.
<br><br><i>Features</i> of application include creating and changing any character feature, sorting character by unions/collections (created by users), color separation, sorting by features, and more.
<br><br><i>Target audience: </i>It might be useful for book/script/film writers, game designers, DnD players or other aspiring creators that want to have quick access to many characters and recall any of their features on a whim.
</h4>
Currently only user interface template is availible. Rest of app is in work and may require some more revision before sharing it.
<br><br>
<b>Screenshots </b> can be found in the screenshots folder.

## Architecture Details
The application runs three separate instances: 
* MongoDB database server (default:localhost/27017). This contains table of users, table of collections, table of characters.
* Node.js backend server (works as an api) (default: localhost/8081). Uses Express. Currently it is permanently connected to database, and is only able to respond with full table data on 'get' requests.
* React frontend application. No class components, only functional. Navigation is done with react-router-dom.
Database tables are storing all specific data in json format, and React application is hardcoded to handle this data with the full files it gets. Links to api are hardcoded in `<GalleryPage>` and `<CollectionsPage>` components.
<br><i>Documentation on table templates as well as backend api will be released with the backend source code later in the future.</i>

## Features
version 0.1 frontend features (no characters availible until you have some backend api)
* Responsive design that looks nice on any device (<b>screenshots</b> provided in corresponding folder)
* Quick and easy navigation through the top panel
* Access to the nice card-based view of character list, with the ability to click any of the cards to get advanced information on the needed character. No need to go to the different page or reload the list.
* Group characters you need in a collection, however you want - by the world they are from, by favourites or even by their eye color

## Licence
There is no licence to this project yet. This means the work is under exclusive copyright by default. Nobody else can copy, distribute, or modify your work without being at risk of take-downs, shake-downs, or litigation. 
<br>This project is planned to be released with an opensource licence once it is finished. Until then, only review of the code is allowed.
<br>The idea as well as design fully belong to the creator of this application.
  
## Future plans for developement are:
1. Implement a user authentification system on a backend server. This is the main point of considaration upon revising database tables, so may requre a lot of preparation.
2. Add the ability to create and modify characters, as well as full single character pages (more comfortable than only sidebar view).
3. Add an ability to create and modify workflows.
  4. Make the search menu, where you could find characters by name, identifier or other features
  5. Add a sorting feature based on user requests.
  6. Add a character card coloring based on creator's wish (obviously modifyable).
<br> There are a lot more plans an exiting ideas i want to make true, but these changes will bring the product close to commercially useful, as i will be thinking what to do with it, or maybe move on.
  
## Frameworks and libraries used
Node.js and MongoDB are required to run this application.<br>
For the backend folder i used: ``` npm install express mongodb cors ```
<br>For the frontend folder: ``` create-react-app ``` and ``` npm-i-react-router-dom```

## Feedback and Contributing
For any changes, please open an issue first to discuss what you would like to change.
