const Response = require('../models/response.js');
describe('response.js tests', function () {
        it('Response() creates the desired response object', () => {
                    var oracle = {
                                    "status": 404,
                                    "errorMessage": "Could not find the user in the database.",
                                    "responseData": ""
                                };
                    let testResponse = new Response(404, "Could not find the user in the database.", "");
                    expect(testResponse).toEqual(oracle);
                })
    });
