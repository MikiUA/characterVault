export const requiredCharParams = {
    _id: {
        inputType: "input",
        "required": true,
    },
    host: {
        inputType: "input",
        'disabled': true,
    },
    is_DnD: {
        inputType: "checkbox",
        'required': true,
        default: false
    },
    view_access: {
        inputType: 'select',
        required: true,
        'options': ['public', 'private'],
        default: 'private'
        // options: { 'public': 'public', 'private': 'private' },
    },
    img_url: {
        inputType: 'input',
        pattern: "",
    },
    refname: {
        inputType: 'input',
        'required': true,
        'pattern': ""
    },
    shname: {
        inputType: "input",
        "required": true,
        'pattern': ""
    },
    fname: {
        inputType: "input",
        'pattern': ""
    },
    description: {
        inputType: 'input',
        'pattern': "",
        'required': true
    },
    main_color: {
        inputType: 'color',
        required: true,
        'options': {
            other: '',
            standart: '#f0f0f0',
            red: '#ff9999',
            orange: '#fdac4e',
            yellow: '#ffff00',
            green: '#7aff7a',
            'greenish blue': '#70ffdd',
            cyan: '#70fdff',
            blue: '#94c2ff',
            purple: '#e1a8ff',
            pink: '#ffa3e7',
        }
    },
    date_created: {
        inputType: 'date',
        'disabled': true,
    },
    date_modified: {
        inputType: 'date',
        'disabled': true,
    }
};
