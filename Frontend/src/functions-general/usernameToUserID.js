export default function usernameToUserID(username){
    return username.toLowerCase().replace(/\s/g,'')
}