async function getHandledResult(UnhandledFunction,response,errorObject={500:"Unhandled Server Error"}){
    try {
        const result = await UnhandledFunction();
        return result
    }
    catch (error){
        if (error.message) console.log({error:error.message});
        if (error.status && error.message) {
            response.status(error.status).send({message:error.message});
            return null
        }
        for (const handledError in errorObject){
            if (error===handledError||(error.status && error.status===handledError)) {
                response.status(handledError).send({message:errorObject.handledError})
                return null
            }
        }
        response.status(500).send({message:"Internal server error. Sorry for inconvenience"});
        return null
    }
}

module.exports={getHandledResult}