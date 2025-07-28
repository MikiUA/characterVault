const TODOctrl = (req, res, next) => (typeof (next) === 'function') ? next : { "Unfinished Responce": "TODO" };

const TODOpath = {
    controller: TODOctrl,
    summary: "not implemented yet",
    "responses": {
        200: { description: "OK" }
    }
};
module.exports = { TODOctrl, TODOpath }