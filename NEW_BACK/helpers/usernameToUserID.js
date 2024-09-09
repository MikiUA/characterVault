const usernameToUserID = (username) => {
    return username.toLowerCase().replace(/\s/g, '')
}
module.exports = usernameToUserID