import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Player, GameInfo } from '@/global/gameInfo';
import { Login } from '@/features/Login';
import { Lobby } from '@/features/Lobby';
import { CardGame } from '@/features/CardGame';

const serverIP = window.location.hostname;
const socket: Socket = io(`http://${serverIP}:3001`);

function App() {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameData, setGameData] = useState<GameInfo | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [seconds, setSeconds] = useState(480);

  useEffect(() => {
    socket.on("room_created", (code: string) => {
      setRoomCode(code);
      setIsJoined(true);
      setIsHost(true);
    });

    socket.on("room_joined", (code: string) => {
      setRoomCode(code);
      setIsJoined(true);
      setIsHost(false);
    });

    socket.on("update_players", (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    });

    socket.on("game_info", (data: GameInfo) => {
      setGameData(data);
    });

    socket.on("error_message", (msg: string) => {
      toast.error(msg);
    });

    socket.on("timer_update", (time: number) => {
      setSeconds(time);
    });

    return () => {
      socket.off("room_created");
      socket.off("room_joined");
      socket.off("update_players");
      socket.off("game_info");
      socket.off("error_message");
      socket.off("timer_update");
    };
  }, []);

  const createRoom = () => {
    if (!username.trim()) return toast.error("Digite seu nome!");
    socket.emit("create_room", { username });
  };

  const joinRoom = () => {
    if (!username.trim() || !roomCode.trim()) return toast.error('Preencha codinome e código!');
    socket.emit("join_room", { roomCode, username });
  };

  const startGame = () => {
    socket.emit("start_game", roomCode);
  };

const copyCode = () => {
  navigator.clipboard.writeText(roomCode)
    .then(() => toast.success("Código copiado!"))
    .catch(() => {
      const input = document.createElement("input");
      input.value = roomCode;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      toast.success("Código copiado!");
    });
};

 return (
    <>
      <ToastContainer position="top-right" theme="dark" transition={Bounce} />
      {!isJoined ? (
        <Login 
          username={username} setUsername={setUsername}
          roomCode={roomCode} setRoomCode={setRoomCode}
          createRoom={createRoom} joinRoom={joinRoom}
        />
      ) : gameData ? (
        <CardGame 
          data={gameData} 
          onBack={() => setGameData(null)} 
          seconds={seconds}
        />
      ) : (
        <Lobby 
          roomCode={roomCode} 
          copyCode={copyCode} 
          players={players} 
          isHost={isHost} 
          startGame={startGame}
          socketId={socket.id}
        />
      )}
    </>
  );
}

export default App;