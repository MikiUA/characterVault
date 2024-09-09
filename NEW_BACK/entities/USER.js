const usernameToUserid = require("../helpers/usernameToUserID");
const { ValidationError } = require("./ERROR");
const userGenerationError = new ValidationError('An error occured while generating a character. Missing or invalid requred fields')

class USER {
    _id;
    username;
    password;
    email;
    verified;
    date_created;
    date_changed;
    description;
    img_url;
    isAdmin = false;
    availible_collections;
    constructor(newUser) {
        if (typeof (newUser) !== 'object') throw userGenerationError;
        try {
            for (const [key, value] of Object.entries({ "username": { type: "string" }, "password": { type: "string" }, "email": { type: "string" } })) {
                if (typeof (newUser[key]) !== value.type) throw userGenerationError;
            }
            this._id = newUser._id || usernameToUserid(newUser.username);
            this.username = newUser.username;
            this.email = newUser.email;
            this.password = newUser.password;//TODO comment this line and check that everything should still work
            this.verified = (newUser.verified === "true" || newUser.verified === true) ? true : false;
            this.date_created = (typeof (newUser.date_created) === 'number' && newUser.date_created) || Date.now();
            this.date_modified = Date.now();
            this.img_url = newUser.img_url || null;
            this.isAdmin = newUser.isAdmin || false;
            this.availible_collections = newUser.availible_collections || [];
            this.description = newUser.description || null
        }
        catch (err) {
            // console.log(err)
            throw userGenerationError;
        }
    }
    static getReturnable(user, getSelf = false) {
        const returnable = {
            _id: user._id,
            username: user.username,
            date_created: user.date_created,
            img_url: user.img_url,
            description: user.description
        }
        if (getSelf) {
            returnable.date_modified = user.date_modified;
            returnable.email = user.email;
            returnable.verified = user.verified
            returnable.availible_collections = user.availible_collections;
            returnable.isAdmin = (user.isAdmin === "true" || user.isAdmin === true);
        }
        return returnable;
    }
}
module.exports = USER