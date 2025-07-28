//const {isLoading,error,response,sendRequest}=useFetch(apiHandlers.login);
//function onSubmitLoginForm(){
//  sendRequest(body={email,username,password});
// }
//const {isLoading,error,response,sendRequest}=useFetch(apiHandlers.logout);
//function onSubmitLoginForm(){
//  sendRequest(queryparams{device});//device in query params
// }

//const {isLoading,error,response,sendRequest}=useFetch(apiHandlers.getGallery);
//useEffect(()=>{
//  sendRequest(query={page=2,items_per_page=10,onlyDnD=true,group=includes.mus});//
//})

//const {isLoading,error,response,sendRequest}=useFetch(apiHandlers.deleteChar);
//useEffect(()=>{
//  sendRequest(urlparams={charID=someObjectID});//url should include the /id
//})


const routes={
    post:{
        '/login':(body)=>fetch('url_login','POST',body),
        '/signin':loginHandler,
        '/signup':registerHandler,
        '/register':registerHandler,
    },
    get:{
        '/requestCheckUser':checkUserHandler,
        '/signout':signoutHandler(),
        '/logout':signoutHandler(),
        '/signout/:device':notImplementedHandler,
        '/logout/:device':notImplementedHandler,
        '/signoutFromAll':signoutHandler(true),
        '/logoutFromAll':signoutHandler(true),
    }
}