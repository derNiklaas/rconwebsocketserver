const Rcon = require('modern-rcon');
const rcon = new Rcon("IP ADRESS HERE", 25575, "PASSWORD HERE", 5000);


const ws = require('ws');
const webSocketServer = new ws.Server({port: 25576});
webSocketServer.on('connection', (webSocket) => {
    webSocket.on('message', (message) => {
        if (message === "stop") {
            webSocketServer.close();
            rcon.disconnect().then(() => {
                process.exit(0);
            });
        } else {
            if (isReady) {
                rcon.send(message).then((result) => {
                    webSocket.send(result);
                    console.log(result);
                });
            }
        }
    });
});

let isReady = false;

rcon.connect().then(() => {
    isReady = true;
});
