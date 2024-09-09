//create Routing, documentation and Testing in single loop over the js object
const router = require('express').Router();
const handled = require('../middleware/errorHandler');
const validateBody = require('../middleware/validateBody');
const swagger = require('./routes/swaggerOptions');
const fs = require('fs');


const documentateMethod = (parentTag, summary, parameters, security, requestBody) => {
    const obj = {
        "tags": [parentTag],
        summary,
        responses: {}
    }
    if (parameters) obj["parameters"] = parameters;
    if (security) obj["security"] = security;
    if (requestBody) obj["requestBody"] = {
        content: {
            'application/json': {
                schema: {
                    type: "object",
                    properties: requestBody.properties,
                    required: requestBody.required
                }
            }
        }
    }
    return obj;
}
const documentateResponse = (description, content) => {
    return {
        description: description || "no decsription",
        content: {
            'application/json': {
                schema: {
                    type: "object",
                    properties: {
                        "message": { "type": "string" },
                        ...content
                    }
                }
            }
        }
    }
}

function resolveReference(reference, swagger) {
    const parts = reference.split('/').filter(part => part !== ''); // Split the reference string

    if (parts.length < 3 || parts[0] !== '#' || parts[1] !== 'components') {
        throw new Error('Invalid reference format');
    }

    let current = swagger;

    for (let i = 1; i < parts.length; i++) {
        current = current[parts[i]]; // Traverse through the reference path
        if (!current) {
            throw new Error(`Reference path not found: ${reference}`);
        }
    }
    return current;
}

function createRoute(method, path, middleware, controller, responses, requestBody) {
    if (path.includes("/{")) {
        path = path.replace("{", ":").replace("}", "");
    }

    function prepareAdditionalMiddleware(somethingToUse) {
        if (typeof (somethingToUse) === 'function') return [somethingToUse];
        if (Array.isArray(somethingToUse)) {
            let array = [];
            for (const something in somethingToUse) {
                if (typeof (somethingToUse) === 'function') array.push(something);
            }
            return array;
        }
        return [];
    }
    const allMiddleware = [...prepareAdditionalMiddleware(middleware)]
    if (requestBody && requestBody.properties) {
        allMiddleware.unshift(handled(validateBody(requestBody), responses));
    }
    router[method](path, ...allMiddleware, handled(controller, responses));
}
function createTest(path, method, response, parentPath, description, test, content) {
    return
    return fs.appendFileSync('./devtest/test.js', `
        describe('${path} ${method} ${response}', () => {
            it('${description}', async () => {
                const res = await request(app)
                    .post("${parentPath + path}")
                    .send(${JSON.stringify(test.send)});

                expect(res.statusCode).toBe(${response});
                expect(res.body).toMatchObject(${JSON.stringify(content)});
            });
        });
    `)
}

function handlePaths(paths, parentPath, parentTag) {
    ////// for (const path in paths) {
    //     for (const method in paths[path]) {
    //         const { analogues, controller, middleware, examples,
    //             summary, security, parameters, requestBody, responses } = paths[path][method];
    //         for (const response in responses) {
    //             const { description, content = {} } = paths[path][method].responses[response];
    //         }
    //     }
    // }
    const docs = {};
    for (const path in paths) {
        docs[parentPath + path] = {};
        for (const method in paths[path]) {
            const { analogues, controller, middleware, examples,
                summary, security, parameters, responses } = paths[path][method];
            let { requestBody } = paths[path][method];
            if (requestBody && requestBody["$ref"]) requestBody = resolveReference(requestBody["$ref"], swagger)
            createRoute(method, parentPath + path, middleware, controller, responses, requestBody);
            docs[parentPath + path][method] = documentateMethod(parentTag, summary, parameters, security, requestBody);
            for (const response in responses) {
                const { content = {}, test, description } = paths[path][method].responses[response];
                if (process.env.DEVMODE && test) createTest(path, method, response, parentPath, description, test, content);
                docs[parentPath + path][method]["responses"][response] = documentateResponse(description, content);
            }
        }
    }
    swagger.paths = { ...swagger.paths, ...docs };
}

module.exports = { docs: swagger, router, handlePaths }