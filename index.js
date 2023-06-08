const http = require("http");

const server = http.createServer( (request, response) => {
   
    if(request.url == "/about") {
        response.write("this is about page");
    }else if(request.url == "/") {
        response.write("this is home page");
    }

    response.end();

});

// http://localhost:3002
server.listen(3002, () => {
    console.log("server is running...")
});