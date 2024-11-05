import { Server } from "socket.io";

const io = new Server(process.env.SOCKET_IO_PORT, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {

    console.log('a user connected!');

    socket.on('join-clipboard', (clipboardID) => {
        console.log(`join-clipboard: ${clipboardID}`);
        socket.join(clipboardID);
    });

    socket.on('update-clipboard', ({ clipboardText, clipboardID }) => {
        console.log(`update-clipboard: ${clipboardText}`);
        io.sockets.in(clipboardID).emit('update-clipboard', clipboardText);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnect!');
    });

});
