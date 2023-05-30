exports.usernameToUserID = (username) =>{
    return username.toLowerCase().replace(/\s/g,'')
}