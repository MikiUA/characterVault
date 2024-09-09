module.exports = {
    "openapi": "3.0.0",
    "info": {
        "title": "Character Vault API",
        "description": "Designed specifically for web application",
        "version": "0.5"
    },
    "tags": [
        {
            "name": "Authentification",
            "description": "Login/Register/Logout/CheckUser"
        },
    ],
    "paths": {},
    "components": {
        "securitySchemes": {
            "viewAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            },
            "editAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            },
            "adminAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            },
        },
        "schemas": {
            "User, public (Response)": {
                "type": "object",
                "properties": {
                    "_id": {
                        "type": "string",
                        "pattern": "^[a-z0-9]*$",
                        "minLength": 1,
                        "description": "Lowercase, no space unique identifier created from username"
                    },
                    "username": {
                        "type": "string",
                        "description": "users display name, simplifying it must result in unique identifier"
                    },
                    "img_url": {
                        "type": "string",
                        "description": "URL to the user's profile picture"
                    },
                    "description": {
                        "type": "string",
                        "description": "A field here user can put whatever he wants to be seen"
                    },
                    "availible_collections": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "description": "Array of unique identifiers (ObjectIDs) for available collections"
                        },
                        "description": "Array of ObjectIDs representing the available collections for the user"
                    },
                },
                // "required": ["username", "email", "verified", "date_created", "profile_picture", "isAdmin", "available_collections"]
            },
            "User, private (Response)": {
                allOf: [
                    { "$ref": "#/components/schemas/User, public (Response)" },
                    {
                        "type": "object",
                        "properties": {
                            "email": {
                                "type": "string",
                                "format": "email",
                                "description": "Email address of the user"
                            },
                            "verified": {
                                "type": "boolean",
                                "description": "Boolean indicating whether the user's email is verified or not"
                            },
                            "date_created": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Timestamp indicating when the user was created"
                            },

                            "isAdmin": {
                                "type": "boolean",
                                "description": "Boolean indicating whether the user is an administrator or not"
                            }
                        }

                    }
                ]
            },
            "User (request)": "",
            "Character": {
                "type": "object",
                "required": [
                    "shname"
                ],
                "properties": {
                    "shname": {
                        "type": "string",
                        "description": "Short name, unique to this account. Used in web links and MongoDB _id field.",
                        "maxLength": 15,
                        "minLength": 1,
                        "pattern": "^[\\w-]{1,15}$",
                        "example": "char-name"
                    },
                    "_id": {
                        "type": "string",
                        "description": "Defaults to 'host_shname', uneditable by user.",
                        "readOnly": true,
                        "example": "host_char-name"
                    },
                    "host": {
                        "type": "string",
                        "description": "Defaults to the user who created the character, uneditable by user.",
                        "readOnly": true,
                        "example": "user123"
                    },
                    "date_created": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Defaults to Date(now), uneditable.",
                        "readOnly": true,
                        "example": "2024-09-08T12:34:56Z"
                    },
                    "date_modified": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Defaults to Date(now), uneditable by user.",
                        "readOnly": true,
                        "example": "2024-09-08T12:34:56Z"
                    },
                    "view_access": {
                        "type": "string",
                        "description": "Access level, either 'public' or 'private'. Defaults to 'private'.",
                        "enum": [
                            "public",
                            "private"
                        ],
                        "default": "private"
                    },
                    "edit_access": {
                        "oneOf": [
                            {
                                "type": "string",
                                "description": "Default 'private', can be 'private'.",
                                "enum": ["private"],
                                "example": "private"
                            },
                            {
                                "type": "array",
                                "description": "Array of hosts who have access.",
                                "items": {
                                    "type": "string"
                                },
                                "example": []
                            }
                        ]
                    },
                    "is_DnD": {
                        "type": "boolean",
                        "description": "Indicates if the character is for DnD. Defaults to false.",
                        "default": false
                    },
                    "display_level": {
                        "type": "integer",
                        "description": "Default 0, index of the level in the 'levels' array to display client-side by default.",
                        "default": 0
                    },
                    "levels": {
                        "type": "array",
                        "description": "Array of level objects. At least one level is required on existing characters.",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "required": [
                                "lvl_name",
                                "fname",
                                "img_url",
                                "main_color",
                                "description",
                                "sex",
                                "DND_params",
                                "additional_params"
                            ],
                            "properties": {
                                "lvl_name": {
                                    "type": "string",
                                    "description": "Unique identifier for the level.",
                                    "example": "level-uuid"
                                },
                                "fname": {
                                    "type": "string",
                                    "description": "Full Name, defaults to 'shname'.",
                                    "example": "Character Name"
                                },
                                "img_url": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "URL to the character's image. Defaults to null.",
                                    "nullable": true,
                                    "example": "https://example.com/image.png"
                                },
                                "main_color": {
                                    "type": "string",
                                    "description": "Main color in hex format. Defaults to '#ffffff'.",
                                    "pattern": "^#[0-9A-Fa-f]{6}$",
                                    "example": "#ffffff"
                                },
                                "description": {
                                    "type": "string",
                                    "description": "Character description, up to 255 UTF-8 characters.",
                                    "maxLength": 255,
                                    "example": "This is a character description."
                                },
                                "sex": {
                                    "type": "string",
                                    "description": "Character's sex. Defaults to '-'.",
                                    "enum": [
                                        "-",
                                        "male",
                                        "female",
                                        "other"
                                    ],
                                    "default": "-"
                                },
                                "DND_params": {
                                    "type": "object",
                                    "description": "Object containing DnD-specific parameters.",
                                    "additionalProperties": true,
                                    "example": {}
                                },
                                "additional_params": {
                                    "type": "object",
                                    "description": "Object containing additional fields and parameters, uncontrolled.",
                                    "additionalProperties": true,
                                    "example": {}
                                }
                            }
                        }
                    }
                }
            },
            "Collection (response)": {
                "type": "object",
                "properties": {
                    "_id": {
                        "type": "string",
                        "format": "objectid",
                        "description": "ObjectID for the collection"
                    },
                    "name": {
                        "type": "string",
                        "description": "Name of the collection"
                    },
                    "img_url": {
                        "type": "string",
                        "description": "URL or file path to the image associated with the collection"
                    },
                    "description": {
                        "type": "string",
                        "description": "Description of the collection"
                    },
                    "isWorkflow": {
                        "type": "boolean",
                        "description": "Boolean indicating whether the collection is a workflow or not"
                    },
                    "host": {
                        "type": "string",
                        "description": "String reference to the user ID who is the host of the collection"
                    },
                    "view_access": {
                        "oneOf": [
                            {
                                "type": "string",
                                "enum": ["public", "private"],
                                "description": "String indicating whether the collection has public or private view access"
                            },
                            {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Array of user IDs with view access to the collection"
                            }
                        ]
                    },
                    "edit_access": {
                        "oneOf": [
                            {
                                "type": "string",
                                "enum": ["private"],
                                "description": "String indicating that the collection has private edit access"
                            },
                            {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Array of user IDs with edit access to the collection"
                            }
                        ]
                    },
                    "char_list": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "description": "Array of CHARACTERIDs associated with the collection"
                        }
                    },
                    "additional_char_params": {
                        "type": "object",
                        "description": "Object with unlimited potential fields for additional character parameters"
                    }
                },
                "required": []
            },
            "Collection (request)": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Name of the collection"
                    },
                    "img_url": {
                        "type": "string",
                        "description": "URL or file path to the image associated with the collection"
                    },
                    "description": {
                        "type": "string",
                        "description": "Description of the collection"
                    },
                    "isWorkflow": {
                        "type": "boolean",
                        "description": "Boolean indicating whether the collection is a workflow or not"
                    },
                    "view_access": {
                        "oneOf": [
                            {
                                "type": "string",
                                "enum": ["public", "private"],
                                "description": "String indicating whether the collection has public or private view access"
                            },
                            {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Array of user IDs with view access to the collection"
                            }
                        ]
                    },
                    "edit_access": {
                        "oneOf": [
                            {
                                "type": "string",
                                "enum": ["private"],
                                "description": "String indicating that the collection has private edit access"
                            },
                            {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                },
                                "description": "Array of user IDs with edit access to the collection"
                            }
                        ]
                    },
                    "additional_char_params": {
                        "type": "object",
                        "description": "Object with unlimited potential fields for additional character parameters"
                    }
                },
                "required": []
            }

        }
    }
}
// const extract = (source,...props) => {
//     props.reduce((result,field)=>{

//     });
//     Object.entries(this).reduce(
//         (obj, [key, val]) => (
//             props.includes(key) && (obj[key] = val),
//             obj
//         ), {})
// }