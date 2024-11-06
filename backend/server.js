import { Server } from "socket.io";

const io = new Server(process.env.SOCKET_IO_PORT, {
    cors: {
        origin: "*"
    }
});

const clipboards = new Map();
const clipboardClientMap = new Map();

io.on('connection', (socket) => {

    socket.on('join-clipboard', (clipboardID) => {
        socket.join(clipboardID);
        if (!clipboards.has(clipboardID)) {
            clipboards.set(clipboardID, {
                id: clipboardID,
                text: '',
                clients: new Set()
            });
        } else {
            socket.emit('update-clipboard', clipboards.get(clipboardID).text);
        }
        clipboards.get(clipboardID).clients.add(socket.id);
        clipboardClientMap.set(socket.id, clipboardID);
        io.sockets.in(clipboardID).emit('connected-clients', clipboards.get(clipboardID).clients.size);
    });

    socket.on('update-clipboard', ({ clipboardText, clipboardID }) => {
        io.sockets.in(clipboardID).emit('update-clipboard', clipboardText);
        clipboards.get(clipboardID).text = clipboardText;
    });

    socket.on('disconnect', () => {
        const disconnectedId = socket.id;
        if (disconnectedId) {
            const clipboard = clipboardClientMap.get(disconnectedId);
            if (clipboard) {
                clipboards.get(clipboard).clients.delete(disconnectedId);
                const connectedClients = clipboards.get(clipboard).clients.size;
                if (connectedClients === 0) {
                    clipboards.delete(clipboard);
                } else {
                    io.sockets.in(clipboard).emit('connected-clients', connectedClients);
                }
                clipboardClientMap.delete(disconnectedId);
            }
        }
    });

});
