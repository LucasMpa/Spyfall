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
        try {
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
        } catch (error) {
            console.error('Erro no join_room', error)
            socket.emit("error_message", "Dados inválidos enviados.")
        }

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

    socket.on("leave_room", (roomCode: string) => {
        const code = roomCode.toUpperCase();
        const room = rooms.get(code);

        if (room) {
            room.players = room.players.filter(p => p.id !== socket.id);
            socket.leave(code);

            if (room.players.length === 0) {
                if (room.timer) clearInterval(room.timer);
                rooms.delete(code);
            } else {
                if (room.hostId === socket.id) {
                    const nextPlayer = room.players[0];

                    if (nextPlayer) {
                        room.hostId = nextPlayer.id;
                        io.to(code).emit("new_host", room.hostId);
                    }
                }
                io.to(code).emit("update_players", room.players);
            }
        }
    });

    socket.on("start_game", (roomCode: string) => {
        const room = rooms.get(roomCode);

        if (!room) return;
        if (room.hostId !== socket.id) {
            socket.emit("error_message", "Apenas o dono da sala pode iniciar o jogo.");
            return;
        }

        if (room.players.length < 3) {
            socket.emit("error_message", "Mínimo de 3 jogadores necessário.");
            return;
        }

        room.isStarted = true;
        room.timeLeft = 480;

        const assignments = setupGame(room.players);

        room.players.forEach((player) => {
            const info = assignments.get(player.id);
            if (info) {
                io.to(player.id).emit("game_info", info);
            }
        });

        io.to(roomCode).emit("game_state_changed", { isStarted: true });

        if (room.timer) {
            clearInterval(room.timer);
        }

        room.timer = setInterval(() => {
            if (room.timeLeft !== undefined) {
                room.timeLeft--;

                io.to(roomCode).emit("timer_update", room.timeLeft);

                if (room.timeLeft <= 0) {
                    if (room.timer) clearInterval(room.timer);
                    room.isStarted = false;
                    io.to(roomCode).emit("game_over", "O tempo acabou! O espião venceu ou deve ser revelado.");
                }
            }
        }, 1000);

        console.log(`Missão iniciada na sala: ${roomCode}`);
    });

    socket.on("disconnect", () => {
        rooms.forEach((room, roomCode) => {
            const index = room.players.findIndex(p => p.id === socket.id);

            if (index !== -1) {
                room.players.splice(index, 1);
                io.to(roomCode).emit("update_players", room.players);

                if (room.players.length === 0) {
                    if (room.timer) clearInterval(room.timer);
                    rooms.delete(roomCode);
                    console.log(`Sala ${roomCode} removida e timer limpo.`);
                }
            }
        });
    });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});