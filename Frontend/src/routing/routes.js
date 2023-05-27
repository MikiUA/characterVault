import AddCharacterPage from "pages-gallery/AddCharacterPage"
import AddCollectionPage from "pages-gallery/AddCollectionPage"
import CharacterPage from "pages-gallery/CharacterPage"
import CollectionPage from "pages-gallery/CollectionPage"
import GalleryPage from "pages-gallery/GalleryPage"
import MyCharactersPage from "pages-gallery/MyCharactersPage"
import MyCollectionsPage from "pages-gallery/MyCollectionsPage"
import UserCharactersPage from "pages-gallery/UserCharactersPage"
import UserCollectionsPage from "pages-gallery/UserCollectionsPage"
import AuthPage from "pages-other/AuthPage"
import ContactsPage from "pages-other/ContactsPage"
import ErrorPage from "pages-other/ErrorPage"
import UserPage from "pages-other/UserPage"
import { Navigate } from "react-router-dom"

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