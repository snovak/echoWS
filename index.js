const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    console.log("Broadcast to all: " + data);
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function connection(ws, req) {
    var ip = req.connection.remoteAddress;
    console.log(ip + " connected");
    ws.on('message', function incoming(data) {
        console.log("Broadcasting: " + data);
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
            //if (client !== ws && client.readyState === WebSocket.OPEN) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
                //console.log(client);
            }
        });
    });
  
});