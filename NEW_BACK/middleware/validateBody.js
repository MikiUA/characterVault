const { ValidationError } = require("../entities/ERROR");
const handled = require("./errorHandler");

function isEmpty(value) {
    if (typeof (value) === 'object') return (!Object.keys(value).length > 0);
    if (typeof (value) === 'string') return (value.replace(/\s/g, '') === '');
    return (["undefined", "null"].includes(typeof (value)))
    //this should TRUE if value is NULL, UNDEFINED, EMPTY ARRAY, EMPTY OBJECT or EMPTY STRING, but retun FALSE if value is 0 or FALSE
}

const validateBody = (expextedBody = { properties: {}, required: [] }) => {
    if (!expextedBody.properties) expextedBody = { properties: expextedBody, required: [] }
    function validateBody(req, res, next) {
        for (const prop of expextedBody.required) {
            if (isEmpty(req.body[prop])) return new ValidationError(prop, 'is required but empty');
        }
        for (const [key, value] of Object.entries(expextedBody.properties)) {
            // console.log(typeof (req.body[key]), value.type, typeof (req.body[key]) !== value.type)
            if (![undefined, null, value.type].includes(typeof (req.body[key]))) return new ValidationError(key, "should be ", value.type, ' but it is ', typeof (req.body[key]));
            //undefined  means PARAMETER should remain UNCHANGED in db
            //null       means PARAMETER should be DELETED from db
            //value.type means PARAMETER should be CHANGED to provided
        }
        return next;
    }
    return validateBody;
}


module.exports = validateBody;