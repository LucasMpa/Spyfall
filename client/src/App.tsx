import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Player, GameInfo } from '@/global/gameInfo';
import { Login } from '@/features/Login';
import { Lobby } from '@/features/Lobby';
import { CardGame } from '@/features/CardGame';
import { useNavigate, useParams } from 'react-router-dom';
import { getPersistedNameOnLocalStorage } from './utils/storageActions';

const serverURL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`;
const socket: Socket = io(serverURL);

function App() {
  const [username, setUsername] = useState(getPersistedNameOnLocalStorage() || '');
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameData, setGameData] = useState<GameInfo | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [seconds, setSeconds] = useState(480);
  const { urlRoomCode } = useParams();
  const navigate = useNavigate();
  const hasJoined = useRef(false)

  const createRoom = () => {
    if (!username.trim()) return toast.error("Digite seu nome!");
    socket.emit("create_room", { username });
  };

  const joinRoom = () => {
    if (!username.trim() || !roomCode.trim()) return toast.error('Preencha codinome e código!');
    socket.emit("join_room", { roomCode, username });
  };

  const autoJoin = (user?: string | null, code?: string) => {
    console.log(user)
    console.log(code)
    if(user && code){
      console.log('entrou')
      return  socket.emit("join_room", { roomCode: code, username: user });
    }
     return toast.error('Deu ruim pae!')
  }

  const startGame = () => {
    socket.emit("start_game", roomCode);
  };

 const copyGameLink = () => {
    const fullLink = window.location.href;
    navigator.clipboard.writeText(fullLink)
      .then(() => toast.success("Link de convite copiado!"));
  };

const onBack = () => {
  setGameData(null);
  setIsJoined(false);
  setIsHost(false);
  setPlayers([]);
  socket.emit("leave_room", roomCode);
  navigate("/");
};

   useEffect(() => {
    if (urlRoomCode) {
      setRoomCode(urlRoomCode.toUpperCase());
    }
    socket.on("room_created", (code: string) => {
      setRoomCode(code);
      setIsJoined(true);
      setIsHost(true);
      navigate(`/${code}`)
    });

    socket.on("room_joined", (code: string) => {
      setRoomCode(code);
      setIsJoined(true);
      setIsHost(false);
      navigate(`/${code}`)
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

useEffect(() => {
    const savedName = getPersistedNameOnLocalStorage();
    
    if (urlRoomCode && savedName && !isJoined && !hasJoined.current) {
      const tryJoin = () => {
        if (socket.connected) {
          hasJoined.current = true;
          autoJoin(savedName, urlRoomCode);
        } else {
          socket.once("connect", () => {
            if (!hasJoined.current) {
              hasJoined.current = true;
              autoJoin(savedName, urlRoomCode);
            }
          });
        }
      };
      tryJoin();
    }
  }, [urlRoomCode, isJoined]); 

  return (
    <>
      <ToastContainer position="top-right" theme="dark" transition={Bounce} />
      {!isJoined ? (
        <Login
          username={username}
          setUsername={setUsername}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          createRoom={createRoom}
          joinRoom={joinRoom}
        />
      ) : gameData ? (
        <CardGame
          data={gameData}
          onBack={onBack}
          seconds={seconds}
        />
      ) : (
        <Lobby
          roomCode={roomCode}
          copyCode={copyGameLink}
          players={players}
          isHost={isHost}
          onBack={onBack}
          startGame={startGame}
          socketId={socket.id}
        />
      )}
    </>
  );
}

export default App;