exports.user=class{
    _id;
    username;
    password;
    email;
    verified;
    date_created;
    profile_picture;
    isAdmin=false;
    availible_collections=undefined;
    constructor (newUser){
        return newUser;
    }
    static getReturnable(user,getSelf=false){
        const returnable= {
            _id:user._id,
            username:user.username,
            date_created:user.date_created,
            profile_picture:user.profile_picture,
        }
        if (getSelf) {
            returnable.email=user.email;
            returnable.verified=user.verified
            returnable.availible_collections=user.availible_collections;
            if (user.isAdmin==="true"||user.isAdmin===true) returnable.isAdmin=true;
        }
        return returnable;
    }
}