function encrypt(password) {
    if (typeof (password) !== 'string') throw new TypeError("Expected string to encrypt, but got: " + typeof (password));
    return `encrypted ${password} lol`
}
module.exports = encrypt