const express = require('express');
const useDB = require('../middleware/useDB');
const router = express.Router();

exports.routeHandler=class{
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
    for (field in newHandler){
      this[field]=newHandler[field]
    }
  }
}

function createRoute(route, handler) {
  const { function: routeHandler=()=>{}, handledErrors={},middleware:middlewareHandler=[], response={} } = handler;

  router[route.method](route.path,useDB,...middlewareHandler, async (req, res) => {
    try {
      const result = await routeHandler(req);
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
                return res.status(err.status).send({message:er.message});
            }//if a developer is confident enough to throw both status and message i think he know what he does

             const errorStatus=(typeof(err)==='number' && err)||err.status||500;

            if (Array.isArray(handledErrors) && handledErrors.includes(errorStatus)) return res.sendStatus(err);
            if (Object.keys(handledErrors).includes(errorStatus)) return res.status(errorStatus).send({message:handledErrors[err]});
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

exports.createRouter=(routes,somethingToUse=[])=>{
  if(somethingToUse){
    if (Array.isArray(somethingToUse)) {
      for (const something in somethingToUse) {
        if (typeof(somethingToUse)!=='function') continue
        router.use(something);
      }
    }
    if (typeof(somethingToUse)==='function') router.use(somethingToUse);
  }

  for (const method in routes) {
    const routesObj = routes[method];
    for (const path in routesObj) {
      const handler = routesObj[path];
      createRoute({ method, path }, handler);
    }
  }
  return router
}
// module.exports={createRouter,routeHandler}