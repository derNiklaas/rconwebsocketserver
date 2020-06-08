# rconwebsocketserver
This is a websocketserver that sends every input to a server via rcon.

# How to install
Please make sure you have [nodejs](https://nodejs.org/en/download/) installed.

1. Download this repository. You can clone the repository via git or just download a .zip file from [here](https://github.com/derNiklaas/rconwebsocketserver/archive/master.zip)
2. Run ``npm install`` to install all dependencies.
3. Open the ``index.js`` file and change the **IP ADDRESS HERE** and **PASSWORD HERE** to the IP Address of your server and the password for the rcon server. You may have to change the port if your rcon server isn't running on 25575.
4. Run ``node index.js`` to run the Server. You should now be able to ping the websocket server and send commands to your rcon server.
