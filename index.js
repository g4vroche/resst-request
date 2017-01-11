var request = require("request");

module.exports = {

    "handle": function(parameters, assigner){

        return new Promise(function(resolve, reject){

            request(parameters, function(err, response, body){
                if(err){
                    reject(assigner(formatError(err)));
                } else {
                    resolve(assigner(formatResponse(response)));
                }
            });
        });
    }
};


function formatError(error, response) {
    return {
        error: error,
        response: response,
    };
}

function formatResponse(response){
    return {
        "headers": response.headers,
        "status": {
            "code": response.statusCode,
            "message": response.statusMessage
        },
        "body": response.body,
        "data": formatBody(response)
    };
}

function formatBody(response){
    if (response.headers["content-type"] && response.headers["content-type"].split(";")[0] === "application/json") {
        return JSON.parse(response.body);
    }
}

