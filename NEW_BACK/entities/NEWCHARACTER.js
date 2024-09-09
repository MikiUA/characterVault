class CHARACTER {
    constructor({
        _id,
        shname,
        host = 'defaultHost',
        date_created = new Date(),
        date_modified = new Date(),
        view_access = 'private',
        edit_access = [],
        is_DnD = false,
        display_level = 0,
        levels = []
    }) {
        this.errors = [];

        // Validate and initialize properties
        this.shname = this.validateShname(shname) || this.setDefault('shname', this.generateUUID());
        this.host = this.validateHost(host) || this.setDefault('host', 'defaultHost');
        this._id = `${this.host}_${this.shname}`;
        this.date_created = this.validateDate(date_created) || this.setDefault('date_created', new Date());
        this.date_modified = this.validateDate(date_modified) || this.setDefault('date_modified', new Date());
        this.view_access = this.validateViewAccess(view_access) || this.setDefault('view_access', 'private');
        this.edit_access = this.validateEditAccess(edit_access) || this.setDefault('edit_access', []);
        this.is_DnD = this.validateBoolean(is_DnD) || this.setDefault('is_DnD', false);
        this.display_level = this.validateDisplayLevel(display_level, levels.length) || this.setDefault('display_level', 0);

        // Ensure at least one level exists
        if (levels.length === 0) {
            levels.push(this.createDefaultLevel());
        }

        // Fill in missing parameters in the first level by checking subsequent levels
        this.levels = this.fillMissingParams(levels);
    }

    // Validation methods
    validateShname(shname) {
        const regex = /^[\w-]{1,15}$/;
        if (regex.test(shname)) return shname;
        this.errors.push('Invalid shname');
        return null;
    }

    validateHost(host) {
        // Assuming host should be a non-empty string
        if (typeof host === 'string' && host.length > 0) return host;
        this.errors.push('Invalid host');
        return null;
    }

    validateDate(date) {
        if (date instanceof Date && !isNaN(date)) return date;
        this.errors.push('Invalid date');
        return null;
    }

    validateViewAccess(view_access) {
        const validOptions = ['public', 'private'];
        if (validOptions.includes(view_access)) return view_access;
        this.errors.push('Invalid view_access');
        return null;
    }

    validateEditAccess(edit_access) {
        if (Array.isArray(edit_access)) return edit_access;
        this.errors.push('Invalid edit_access');
        return null;
    }

    validateBoolean(value) {
        if (typeof value === 'boolean') return value;
        this.errors.push('Invalid boolean value');
        return null;
    }

    validateDisplayLevel(display_level, levelsCount) {
        if (Number.isInteger(display_level) && display_level >= 0 && display_level < levelsCount) return display_level;
        this.errors.push('Invalid display_level');
        return null;
    }

    // Create a default level if no levels are provided
    createDefaultLevel() {
        return {
            lvl_name: this.generateUUID(),
            fname: this.shname,
            img_url: null,
            main_color: '#ffffff',
            description: '',
            sex: '-',
            DND_params: {},
            additional_params: {}
        };
    }

    // Fill missing parameters in the first level by checking subsequent levels
    fillMissingParams(levels) {
        const requiredParams = ['lvl_name', 'fname', 'img_url', 'main_color', 'description', 'sex', 'DND_params', 'additional_params'];
        const firstLevel = levels[0];

        requiredParams.forEach(param => {
            if (firstLevel[param] === undefined || firstLevel[param] === null) {
                firstLevel[param] = this.findParamInLevels(param, levels, 0) || this.createDefaultLevel()[param];
            } else if (!this.validateLevelParam(param, firstLevel[param])) {
                firstLevel[param] = this.createDefaultLevel()[param];
            }
        });

        levels[0] = firstLevel;
        return levels;
    }

    // Validate individual level parameters
    validateLevelParam(param, value) {
        switch (param) {
            case 'lvl_name':
            case 'fname':
                if (typeof value === 'string' && value.length > 0) return true;
                break;
            case 'img_url':
                if (value === null || typeof value === 'string') return true;
                break;
            case 'main_color':
                const colorRegex = /^#[0-9A-Fa-f]{6}$/;
                if (colorRegex.test(value)) return true;
                break;
            case 'description':
                if (typeof value === 'string' && value.length <= 255) return true;
                break;
            case 'sex':
                const validSex = ['-', 'male', 'female', 'other'];
                if (validSex.includes(value)) return true;
                break;
            case 'DND_params':
            case 'additional_params':
                if (typeof value === 'object' && value !== null) return true;
                break;
        }
        this.errors.push(`Invalid value for ${param}`);
        return false;
    }

    // Find a parameter in subsequent levels if missing in the current level
    findParamInLevels(param, levels, startIndex) {
        for (let i = startIndex + 1; i < levels.length; i++) {
            if (levels[i][param] !== undefined && levels[i][param] !== null) {
                return levels[i][param];
            }
        }
        return null;
    }

    // Utility method to generate a UUID
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Set default values and log errors
    setDefault(param, defaultValue) {
        this.errors.push(`Setting default value for ${param}`);
        return defaultValue;
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
            errors: this.errors,  // Include errors in the returned data
        };
    }
}
