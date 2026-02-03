import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { Room, Player } from './types';
import { setupGame } from './logic/game';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const rooms = new Map<string, Room>();
let timeLeft = 480;
let timerInterval: NodeJS.Timeout;

io.on("connection", (socket: Socket) => {
    socket.on("join_room", ({ roomCode, username }: { roomCode: string, username: string }) => {
    const code = roomCode.toUpperCase();
    const room = rooms.get(code);

    if (!room) {
        return socket.emit("error_message", "Sala não encontrada.");
    }

    if (room.isStarted) {
        return socket.emit("error_message", "O jogo já começou nesta sala.");
    }

    socket.join(code);
    const newPlayer: Player = { id: socket.id, username, isSpy: false };
    room.players.push(newPlayer);

    socket.emit("room_joined", code);

    io.to(code).emit("update_players", room.players);
});

    socket.on("create_room", ({ username }: { username: string }) => {
        const roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        socket.join(roomCode);

        const newPlayer: Player = { id: socket.id, username, isSpy: false };

        rooms.set(roomCode, {
            code: roomCode,
            players: [newPlayer],
            isStarted: false,
            hostId: socket.id
        });

        socket.emit("room_created", roomCode);
        io.to(roomCode).emit("update_players", [newPlayer]);
    });

    socket.on("start_game", (roomCode: string) => {
        const room = rooms.get(roomCode);

        if (!room) return;
        if (room.hostId !== socket.id) {
            socket.emit("error_message", "Apenas o dono da sala pode iniciar o jogo.");
            return;
        }

        if (room.players.length >= 3) {
            room.isStarted = true;
            const assignments = setupGame(room.players);

            room.players.forEach((player) => {
                const info = assignments.get(player.id);
                if (info) {
                    io.to(player.id).emit("game_info", info);
                }
            });
            io.to(roomCode).emit("game_state_changed", { isStarted: true });
        } else {
            socket.emit("error_message", "Mínimo de 3 jogadores necessário.");
        }

        timeLeft = 480; 
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            timeLeft--;
            io.to(roomCode).emit("timer_update", timeLeft);

            if (timeLeft <= 0) {
            clearInterval(timerInterval);
            io.to(roomCode).emit("game_over", "O tempo acabou!");
            }
        }, 1000);
    });

    socket.on("disconnect", () => {
        rooms.forEach((room, roomCode) => {
            const index = room.players.findIndex(p => p.id === socket.id);
            if (index !== -1) {
                room.players.splice(index, 1);
                io.to(roomCode).emit("update_players", room.players);
                if (room.players.length === 0) rooms.delete(roomCode);
            }
        });
    });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});