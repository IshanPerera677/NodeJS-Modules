//=: Cluster Module
const cluster = require("node:cluster");
const http = require("node:http");
const dotnev = require("dotenv");
dotnev.config();

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork as many workers as there are CPU cores
    const numCPUs = require("os").cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    console.log(`Worker process ${process.pid} is running`);

    const server = http.createServer((req, res) => {
        if (req.url === "/") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Home page");
        } else if (req.url === "/slow-page") {
            // Simulate CPU work without blocking the event loop
            setImmediate(() => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Slow page");
            });
        }
    });

    const port = process.env.PORT || 8000;

    server.listen(port, () => console.log(`Server is running on port ${port}`));
}
