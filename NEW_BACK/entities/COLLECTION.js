const { ValidationError } = require("./ERROR");

class COLLECTION {
    _id; host; name; view_access; edit_access; date_created; date_modified; description; img_url; is_workflow; char_list; additional_col_params;

    constructor(col) {
        if (typeof (col) !== 'object') throw new ValidationError();
        if ([typeof (col.host), typeof (col.name)] != ['string', 'string']) throw new ValidationError();
        const defaults = {
            _id: col.host + col.name,
            view_access: "private",
            edit_access: "private",
            date_created: Date.now(),

            is_workflow: false,
            levels: [{ "level_name": 0, "dnd_params": {}, "other": {} }],
            char_list: [],
            additional_col_params: {}
        };
        for (const param in this) {
            this[param] = col[param] || defaults[param];
            this.date_modified = Date.now();
        }
    }
}
module.exports = COLLECTION