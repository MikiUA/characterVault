import { Navigate } from "react-router-dom"

//import a bunch of pages with gallery logic (a table of characters)
import GalleryPage from "./PGallery"
import CollectionPage from "./PGalCharCollection"
import MyCharactersPage from "./PGalCharsMy"
import UserCharactersPage from "./PGalCharsUsr"
//almost same but (a table of collections)
import MyCollectionsPage from "./PGalCollsMy"
import UserCollectionsPage from "./PGalCollsUsr"
//then detailes and edit pages considering gallery
import AddCharacterPage from "./PAddCharacter"
import AddCollectionPage from "./PAddCollection"
import CharacterPage from "./PCharacter"
//finally lesss important stuff
import AuthPage from "./PageAuth" 
import ContactsPage from "./PageContacts"
import ErrorPage from "./PageError"
import UserPage from "./PageUser"

const routes={
    "/":<GalleryPage/>,
    "/gallery":<GalleryPage/>,
    "/error":<ErrorPage/>,
    "/*":<Navigate to="/error?status=404"/>,
    "/contacts":<ContactsPage/>,

    "/auth/*":<AuthPage/>,
    "/login":<Navigate to="/auth/login"/>,
    "/signin":<Navigate to="/auth/login"/>,
    "/register":<Navigate to="/auth/signup"/>,
    "/signup":<Navigate to="/auth/signup"/>,
    
    "/user/:userID":<UserPage/>,

    "/character/new":<AddCharacterPage/>,
    "/character/:charID":<CharacterPage/>,
    
    "/collection/new":<AddCollectionPage/>,
    "/collection/:collectionID":<CollectionPage/>,

    "/mycharacters":<MyCharactersPage/>,
    "/mycollections":<MyCollectionsPage/>,
    "/usercharacters":<UserCharactersPage/>,
    "/userCollections":<UserCollectionsPage/>
    }
export default routes