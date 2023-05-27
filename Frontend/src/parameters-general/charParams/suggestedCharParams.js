export const suggestedCharParams={
    "Sex":{
        inputType:"select",
        "options":["male","female","none","other"]
    },
    "Habits":{
        inputType:"array",
        'arrayOptions':{
            "inputType":"autocomplete",
            filter:true,
            "options":["smoking","listening to music","chewing gum","other"]
        }
    },
    "Age":{
        inputType:["measureable,input"],
    },
    "Birthday":{
        inputType:["date","input"]
    },
    "Favourite food":{
    },
    "Background":{
        "valueType":"input"
    },
    "Hair color":{
        "inputType":"autocomplete",
        "options":["white","blond","orange","red","brown","dark"]
    }
}