const Rcon = require('modern-rcon');
const rcon = new Rcon("IP ADDRESS HERE", 25575, "PASSWORD HERE", 5000);


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
            queue.push(message);
        }
    });
});

const queue = [];

async function startQueue() {
    while (true) {
        if (queue.length !== 0) {
            const command = queue.shift();
            sendCommand(command);
        }
        await sleep(25);
    }
}

async function sendCommand(command) {
    if (isReady) {
        rcon.send(command).then((result) => {
            webSocketServer.clients.forEach(webSocket => webSocket.send(result));
            console.log(result);
        }).catch((error) => {
            console.log("There was an error. " + error);
            isReady = false;
        });
    }
}

/**
 * Just a sleep method.
 * @param ms the amount of milliseconds that the program should wait.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let isReady = false;

rcon.connect().then(() => {
    isReady = true;
    startQueue();
});
