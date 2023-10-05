//=: Cluster Module
const cluster = require("node:cluster");
const http = require("node:http");

if(cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    cluster.fork();
    cluster.fork();
}
