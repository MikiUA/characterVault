//here we define all links to backend paths
const base='http://192.168.1.100:8081';

export const galleryApiLinks = {
    get:{
        gallery:`${base}/gallery`,
        collection:`${base}/gallery/collection/`,//:collectionID
        character:`${base}/gallery/character/`,//:charID

        characterListCollection:`${base}/gallery/characterlist/collection/`,//:collectionID

        characterListMy:`${base}/gallery/characterList/my`,
        characterListUser:`${base}/gallery/characterList/`,//:userID
        characterListAll:`${base}/gallery/characterList/all`,
    
        collectionListMy:`${base}/gallery/collectionList/my`,
        collectionListUser:`${base}/gallery/collectionList/user/`,//:userID
        collectionListAll:`${base}/gallery/collectionList/all`,
},
    post:{
        newChar:`${base}/gallery/character/new`,
        newCollection:`${base}/gallery/collection/new`,
        assignCharToCollection:`${base}/gallery/assignToCollection`
    },
    patch:{
        editChar:`${base}/gallery/character/`,//:charID
        editCollection:`${base}/gallery/collection/`//:collectionID
    },
    delete:{
        deleteChar:`${base}/gallery/character/`,//:charID
        deleteCollection:`${base}/gallery/collection/`,//:collectionID
        unassignCharFromCollection:`${base}/unassignFromCollection`
    }
}

export const userApiLink = {
    user:`${base}/user/`,//:userID,
    userListAll:`${base}/user/all`,
}

export const authApiLinks={
    login:`${base}/auth/login`, //using login and password
    checkUser:`${base}/auth/requestCheckUser`,//using both view and edit tokens
    requestNewViewToken:`${base}/auth/requestViewToken`,
    signup:`${base}/auth/signup`,
    logout:`${base}/auth/logout`,
    logoutFromAll:`${base}/auth/logoutFromAllDevices`
}
