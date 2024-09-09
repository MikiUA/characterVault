class HttpError extends Error {
    name; status; message;

    constructor(props) {
        super(props);
        this.name = "HttpError"
        const defaultMsg = "We have encountered an error on our side. Sorry for inconvenience.";
        switch (typeof (props)) {
            case 'number': {
                this.status = props;
                this.message = defaultMsg;
                break;
            }
            case 'object': {
                this.status = props.status || 500;
                this.message = props.message || defaultMsg;
                break;
            }
            case 'string': {
                this.status = 500;
                this.message = props;
                break;
            }
            default: {
                this.status = 500;
                this.message = defaultMsg;
                break;
            }
        }
        if (this.status === 501) this.message = "Function not yet implemented. Sorry for inconvenience"
    }
}

class ValidationError extends Error {
    constructor(props) {
        super(props)
        this.name = 'ValidationError'
        this.status = 400;
        this.message = this.message || 'Error validating request parmeters'
    }
}

module.exports = { HttpError, ValidationError }