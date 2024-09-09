const TODOctrl = () => {
    (req, res, next) => { return (typeof (next) === 'function') ? next() : { "hi": "hi" } };
}

const TODOpath = {
    controller: TODOctrl,
    summary: "not implemented yet",
    "responses": {
        200: { description: "OK" }
    }
};
module.exports = { TODOctrl, TODOpath }