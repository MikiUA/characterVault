export class param{
    inputType='input';
    disabled=false;
    required=false;
    checkValueType=()=>{
        return false
    }

    constructor(new_parameter){
        if (typeof(new_parameter)!=='object') return this.inputType="input"
        const defaultInputType='input'

        this.inputType=new_parameter.inputType||defaultInputType;
        this.disabled=new_parameter.disabled||false;
        this.required=new_parameter.required||false;

        try {
            if (Array.isArray(this.inputType)) return
            else switch (this.inputType) {
                case "combined": 
                    if (typeof(new_parameter.values)!=='object') return this.inputType=defaultInputType
                    this.values=new_parameter.values;
                    for (let value in this.values){
                        throw value;
                    }
                    break;
                case "array": return this.inputType=defaultInputType;
                case "autocomplete": 
                    // this['options']={}   
                    console.log ({this:this})
                    return 
                case "radio": return
                case "select": 
                    // this['options']={}   
                    // console.log ({this:this,opts:new_parameter.options})
                    this.options=new_parameter.options||{};
                    // console.log ({this:this,opts:new_parameter.options})
                    return
                    // return this.options=new_parameter.options
                case "checkbox": return
                case "color": 
                    this.options=new_parameter.options||null;
                    return
                case "date": throw new Error()
                case "number": throw new Error()
                case "measureable": throw new Error()
                default: return 
            }
        }
        catch (err) {
            return this.inputType=null;
        }
    }
}