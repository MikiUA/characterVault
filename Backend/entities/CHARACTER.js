const usernameToUserID = require("../helpers/usernameToUserID");
const { ValidationError } = require("./ERROR");

class CHARACTER {
    constructor(char) {
        let { shname = this.generateUUID(), host = "defaultHostName" } = char;
        if (typeof (!shname) !== 'string' || typeof (host) !== 'string') throw new ValidationError('some sneaky bullshit going on, shname or host are not string');

        this.errors = [];
        const addErr = this.addErr;

        const defaultValues = {
            shname, host,
            _id: `${host}_${usernameToUserID(shname)}`,
            date_created: new Date(),
            date_modified: new Date(),
            view_access: 'private',
            edit_access: 'private',
            is_DnD: false,
            display_level: 0,
            levels: [{
                lvl_name: this.generateUUID(),
                fname: shname,
                img_url: null,
                main_color: '#ffffff',
                description: '',
                sex: '-',
                DND_params: {},
                additional_params: {}
            }]
        }

        function validateInside(param, value, levelsCount = 0) {
            switch (param) {
                case 'shname': {
                    if (!value || typeof (value) !== 'string') return null;
                    const regex = /^[\w-]{1,15}$/;
                    if (regex.test(value)) return value;
                    return null;
                }
                case '_id':
                case 'host': {
                    if (typeof value === 'string' && value.length > 0) return value;
                    return null;
                }
                case 'date_created':
                case 'date_modified': {
                    const date = new Date(value);
                    if (date instanceof Date && !isNaN(date)) return date;
                    return null;
                }
                case 'view_access': {
                    const validOptions = ['public', 'private'];
                    if (validOptions.includes(value)) return value;
                    return null;
                }
                case 'edit_access': {
                    if (Array.isArray(value) || value === 'private') return value;
                    return null;
                }
                case 'is_DnD':
                case 'boolean': {
                    if (typeof value === 'boolean') return value;
                    if (value === 'true') return true;
                    if (value === 'false') return false;
                    return null;
                }
                case 'display_level': {
                    if (Number.isInteger(value) && value >= 0 && value < levelsCount) return value;
                    return null;
                }
                case 'lvl_name':
                case 'fname': {
                    if (typeof value === 'string' && value.length > 0) return value;
                    return null;
                }
                case 'img_url': {
                    if (value === null || typeof value === 'string') return value;
                    return null;
                }
                case 'main_color': {
                    const colorRegex = /^#[0-9A-Fa-f]{6}$/;
                    if (colorRegex.test(value)) return value;
                    return null;
                }
                case 'description': {
                    if (typeof value === 'string' && value.length <= 255) return value;
                    return null;
                }
                case 'sex': {
                    const validSex = ['-', 'male', 'female', 'other'];
                    if (validSex.includes(value)) return value;
                    return null;
                }
                case 'DND_params':
                case 'additional_params': {
                    if (typeof value === 'object' && value !== null) return value;
                    return null;
                }
                default: {
                    return null;
                }
            }
        }
        function validate(param, value, levelsCount = 0) {
            if (value === null || value === undefined) return value;
            const v = validateInside(param, value, levelsCount);
            if (!v) addErr(`validation failed for parameter: "${param}"`)
        }

        function setVal(param) {
            const val = validate(param, char[param])
            if (val !== null) return val;
            addErr(`Setting default value for ${param}`);
            return defaultValues[param];
        }
        function setLvl0(levels) {
            function find(param) {
                for (let i = 0; i < levels.length; i++) {
                    if (validate(param, levels[i][param])) return levels[i][param];
                }
                return null;
            }
            const requiredParams = ['lvl_name', 'fname', 'img_url', 'main_color', 'description', 'sex', 'DND_params', 'additional_params'];
            const lvl0 = {};
            requiredParams.forEach(param => {
                lvl0[param] = find(param) || defaultValues.levels[0][param];
            })
            levels[0] = lvl0;
            return levels;
        }

        // Validate and initialize properties
        this.shname = setVal("shname");
        this.host = setVal("host")
        this._id = setVal("_id");
        this.date_created = setVal("date_created")
        this.date_modified = setVal("date_modified");
        this.view_access = setVal("view_access");
        this.edit_access = setVal("edit_access");
        this.is_DnD = setVal("is_DnD");
        this.levels = (
            (Array.isArray(char.levels) && char.levels.length > 0) ?
                char.levels.filter(lvl => typeof (lvl) === 'object' && lvl !== null) :
                [defaultValues.levels[0]]
        )
        this.display_level = validate("display_level", char.display_level, this.levels.length);
        this.levels = setLvl0(this.levels);
        // Fill in missing parameters in the first level by checking subsequent levels
        this.levels = this.fillMissingParams(char.levels);
    }

    addErr(msg) {
        this.errors.push(msg);
    }

    // Utility method to generate a UUID
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Method to get the full character data
    getCharacterData() {
        return {
            shname: this.shname,
            _id: this._id,
            host: this.host,
            date_created: this.date_created,
            date_modified: this.date_modified,
            view_access: this.view_access,
            edit_access: this.edit_access,
            is_DnD: this.is_DnD,
            display_level: this.display_level,
            levels: this.levels,
        };
    }
    getDisplayData() {
        const data = {
            shname: this.shname,
            _id: this._id,
            host: this.host,
            date_created: this.date_created,
            date_modified: this.date_modified,
            display_level: this.display_level,
            view_access: this.view_access,
            edit_access: this.edit_access,
            is_DnD: this.is_DnD,
        };
        const lvl_params = ['lvl_name', 'fname', 'img_url', 'main_color', 'description', 'sex', 'DND_params', 'additional_params'];
        lvl_params.forEach((param) => {
            for (let i = this.display_level; i >= 0; i--) {
                if (this.levels[i][param]) { data[param] = this.levels[i][param]; break; }
            }
        })
        return data;
    }
}

module.exports = CHARACTER
