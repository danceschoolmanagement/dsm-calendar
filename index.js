const repl = require('repl');
const vm = require('vm');
const net = require('net');

const dsmCalendarApp = require('./source/dsm-calendar.app');
const logger = require('./source/utils/logger');

const port = process.env.PORT || 3000;
const replPort = port + 1;

const initializeReplServerContext = replServer => {
    replServer.context = vm.createContext({
        app: dsmCalendarApp
    });
};

net
    .createServer(socket => {
        let replServer = repl
            .start({
                input: socket,
                output: socket
            })
            .on('reset', () => initializeReplServerContext(replServer))
            .on('exit', () => {
                logger.info(`Terminal ended from ${socket.remoteAddress}`);
                socket.end();
            });
        
        initializeReplServerContext(replServer);
        logger.info(`New terminal opened from ${socket.remoteAddress}`);
    })
    .listen(replPort);

dsmCalendarApp.listen(port, () => logger.info(`Server started on port ${port}`));