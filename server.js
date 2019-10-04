const express = require('express');
const helmet = require('helmet');
const server = express();
const actionsRouter = require('./routers/actionRouter');
const projectsRouter = require('./routers/projectRouter');

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
};

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/action', actionsRouter);
server.use('/api/project', projectsRouter);

module.exports = server;
