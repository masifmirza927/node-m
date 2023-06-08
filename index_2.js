const http = require("http");

const server = http.createServer( (request, response) => {
       // content type
    response.setHeader("Content-Type", "application/json");
    const obj = {
        name: "ali",
        className: "FSc",
        city: "lodhran"
    }

    const objStr = JSON.stringify(obj);

    if(request.url == "/about") {
        response.write("this is about page");
    }else if(request.url == "/") {
        response.write(objStr);
    }
    // status 
    // response.writeHead(404);



    response.end();

});

// http://localhost:3002
server.listen(3002, () => {
    console.log("server is running...")
});