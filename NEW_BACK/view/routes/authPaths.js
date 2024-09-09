const { login, signup, signout, requestCheckUser } = require("../../controllers/auth");
const { authoriseEdit } = require("../../middleware/authorise");

const authPaths = {
    "/login": {
        "post": {
            "controller": login,
            "summary": "Login to the system",
            "requestBody": {
                "properties": {
                    "username": { "type": "string" },
                    "password": { "type": "string" },
                },
                "required": ["username", "password"]
            },
            "responses": {
                "200": {
                    test: {
                        send: { username: "", password: "" },
                    },
                    "description": "Successful login",
                    "content": {
                        "viewToken": {
                            "type": "string"
                        },
                        "editToken": {
                            "type": "string"
                        },
                        "user": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                },
                "400": {
                    "description": "Please provide valid 'username' and 'password'"
                },
                "404": {
                    "description": "User not found"
                }
            }
        }
    },
    "/register": {
        "post": {
            "controller": signup,
            "summary": "Login to the system",
            "requestBody": {
                "properties": {
                    "username": { "type": "string" },
                    "password": { "type": "string" },
                    "email": { "type": "string" },
                },
                "required": ["username", "password", "email"]
            },
            "responses": {
                "201": {
                    "description": "Successful signup",
                    "content": {
                        "viewToken": {
                            "type": "string"
                        },
                        "editToken": {
                            "type": "string"
                        },
                        "user": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                },

                "400": {
                    "description": "Please provide valid 'username', 'password' and 'email'"
                },
                "403": {
                    "description": "Username or email provided are already taken"
                }
            }
        }
    },
    "/requestCheckUser": {
        get: {
            middleware: authoriseEdit,
            controller: requestCheckUser,
            summary: "get current user using the valid editToken",
            security: [
                {
                    "editAuth": []
                }
            ],
            "responses": {
                "200": {
                    "description": "Check complete, created new viewToken",
                    "content": {
                        "viewToken": {
                            "type": "string"
                        },
                        "user": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                },
                "401": {
                    "description": "Unauthorised, invalid or expired Token"
                }
            }
        }
    },
    "/logout": {
        get: {
            middleware: authoriseEdit,
            controller: async (req) => { return await signout(req) },
            security: [
                {
                    "editAuth": []
                }
            ],
            summary: "remove editing capabilities from current device until relogin",
            responses: {
                "204": { description: "logout success" },
                "404": { description: "device not found" }
            }
        },
    },
    "/logout/all": {
        get: {
            middleware: authoriseEdit,
            controller: async (req) => { return await signout(req, true) },
            security: [
                {
                    "editAuth": []
                }
            ],
            summary: "remove editing capabilities from all devices until relogin",
            responses: {
                "204": { description: "logout success" },
                "404": { description: "Current device not found" }
            }
        },
    },
    "/logout/{device}": {
        get: {
            middleware: authoriseEdit,
            controller: async (req) => { return await signout(req) },
            //TODO PARAMS {DEVICE}
            security: [
                {
                    "editAuth": []
                }
            ],
            summary: "remove editing capabilities from current device until relogin",
            responses: {
                "204": { description: "logout success" },
                "404": { description: "device not found" }
            }
        },
    }
};
module.exports = authPaths