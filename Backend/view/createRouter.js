const express = require('express');
const useDB = require('../middleware/useDB');
const router = express.Router();

class routeHandler{
  handledErrors={};
  function=async (req)=>{};
  middleware=[];
  response={
    status:200,
    message:'Success',
    fields:[]
  }
  constructor(newHandler={
    handledErrors:{},
    function:async (req)=>{},
    middleware:[],
    response:{
      status:200,
      message:'Success',
      fields:[]
    }
  }){
    for (const field in newHandler){
      this[field]=newHandler[field]
    }
  }
}

function createRoute(route, handler,additionalMiddleware) {
  const { function: routeHandlerFunction=()=>{}, handledErrors={},middleware:middlewareHandler=[], response={} } = (
    (handler instanceof routeHandler && handler)||new routeHandler(handler)
    );

  // console.log(`${route.method} ${route.path} , `,[...additionalMiddleware,...middlewareHandler]);   
  router[route.method](route.path,...additionalMiddleware,...((Array.isArray(middlewareHandler) && middlewareHandler)||[]), async (req, res) => {
    try { 
      const result = await routeHandlerFunction(req);
      const { status = 200, message = 'ok', fields = [] } = response;
      const responseData = fields.reduce((data, field) => {
        if (result[field] !== undefined) {
          data[field] = result[field];
        }
        return data;
      }, {});

      return res.status(status).send({ message, ...responseData });
    } catch (err) {
        try {
            //this block goes for errors handled by devs
            if (err.status && err.message) {
                return res.status(err.status).send({message:err.message});
            }//if a developer is confident enough to throw both status and message i think he know what he does

            const errorStatus=(typeof(err)==='number' && err)||err.status||500;

            if (Array.isArray(handledErrors) && handledErrors.includes(errorStatus)) return res.sendStatus(err);
            if (Object.keys(handledErrors).includes(String(errorStatus))) return res.status(errorStatus).send({message:handledErrors[err]});
            throw err;
        }
        catch (err) {
            //this block goes for unhandled errors
            console.error({'Unhandled Error':err});
            return res.status(500).send({message:'Internal server error. Sorry for inconvenience.'});
        }
    }
  });
}

const createRouter=({routes,additionalMiddleware=[],parentPath=''})=>{
  function prepareAdditionalMiddleware(somethingToUse){
    if (!somethingToUse) return null;
    if (typeof(somethingToUse)==='function') return [somethingToUse];
    if (Array.isArray(somethingToUse)) {
      let array=[];
      for (const something in somethingToUse) {
        if (typeof(somethingToUse)==='function') array.push(something);
      }
      return array;
    }
  }
  const additionalMiddlewareArray=[useDB,...prepareAdditionalMiddleware(additionalMiddleware)];
  
  for (const method in routes) {
    const routesObj = routes[method];
    for (const path in routesObj) {
      const handler = routesObj[path];
      // const middleware=handler.middleware;
      // handler.middleware=middleware;
      createRoute({ method, path:parentPath+path }, handler,additionalMiddlewareArray);
    }
  }
  return router
}
module.exports={createRouter,routeHandler}