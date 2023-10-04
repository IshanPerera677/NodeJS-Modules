const http = require("node:http");

const server = http.createServer((req, res) =>{
    if(req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home page");
    } 
});

server.listen(8000, () => console.log("Server is running on port 8000"));
