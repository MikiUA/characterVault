const { HttpError } = require("../entities/ERROR");

function middlewareHandler(middlewareFn, responses) {
  return async function (req, res, next) {
    try {
      const result = await middlewareFn(req, res, next);
      // console.log("handled ", middlewareFn, " returned: ", typeof (result) === 'object' && 'object' || result);
      if (typeof (result) === 'function' && result.name === 'next') return result();
      if (result instanceof Error) throw result;
      if (typeof (result) !== 'object') throw new Error('Middleware should return an object but returned', typeof (result))

      else {
        const successStatus = Number(Object.keys(responses).filter((key) => (Number(key) >= 200 && Number(key) < 300) ? true : false)[0])
        result.message = result.message || responses[successStatus].description || "description error"
        if (responses[successStatus].content) for (prop in responses[successStatus].content) result[prop] = result[prop] || responses[successStatus].content[prop];
        return res.status(successStatus).send(result);
      }
    }
    catch (err) {
      const msg = responses && responses[err.status] && responses[err.status].description;
      if (err.name !== 'HttpError' && err.name !== 'ValidationError') {
        console.log("Unhandled err in ", middlewareFn, ": ", err);
        err = new HttpError();
      }
      return res.status(err.status).send({ message: /*TODO REMOVE COMMENTS msg ||*/ err.message });
    }
  }
}

module.exports = middlewareHandler;