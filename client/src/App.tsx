import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Player, GameInfo } from '../../server/src/types';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const socket: Socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameData, setGameData] = useState<GameInfo | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);

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

    return () => {
      socket.off("room_created");
      socket.off("room_joined");
      socket.off("update_players");
      socket.off("game_info");
      socket.off("error_message");
    };
  }, []);

  const createRoom = () => {
    if (!username.trim()) return toast.error("Digite seu nome!");
    socket.emit("create_room", { username });
  };

  const joinRoom = () => {
    // toast('🦄 Wow so easy!', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: false,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    //   transition: Bounce,
    // });
    if (!username.trim() || !roomCode.trim()) return toast.error('Preencha codinome e código!');
    socket.emit("join_room", { roomCode, username });
  };

  const startGame = () => {
    socket.emit("start_game", roomCode);
  };


  if (!isJoined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black text-spy-red italic tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(231,76,60,0.4)]">
            Spyfall
          </h1>
          <p className="text-slate-500 font-medium tracking-widest uppercase text-sm mt-2">Secret Agent Game</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <input
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl mb-6 text-white placeholder-slate-500 focus:ring-2 focus:ring-spy-red outline-none transition-all"
            placeholder="Seu codinome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="grid gap-4">
            <button
              onClick={createRoom}
              className="w-full bg-spy-red hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-900/20"
            >
              CRIAR NOVA SALA
            </button>

            <div className="flex items-center gap-4 my-2">
              <div className="h-[1px] bg-slate-800 flex-grow"></div>
              <span className="text-slate-600 text-xs font-bold uppercase">Ou</span>
              <div className="h-[1px] bg-slate-800 flex-grow"></div>
            </div>

            <input
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-center text-xl font-mono tracking-widest text-spy-red placeholder-slate-700 outline-none focus:border-spy-red transition-all"
              placeholder="CÓDIGO"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            />
            <button
              onClick={joinRoom}
              className="w-full bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all active:scale-95"
            >
              ENTRAR NA SALA
            </button>
          </div>
        </div>
      </div>
    );
  }


  if (gameData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-500">
        <div className={`w-full max-w-lg p-12 rounded-[40px] shadow-2xl border-b-8 text-center ${gameData.isSpy ? 'bg-red-950/30 border-spy-red' : 'bg-blue-950/30 border-blue-500'}`}>
          <p className="text-slate-400 uppercase tracking-[0.3em] text-sm mb-4">Sua Identidade</p>
          <h1 className={`text-6xl font-black uppercase mb-8 ${gameData.isSpy ? 'text-spy-red' : 'text-blue-400'}`}>
            {gameData.isSpy ? "Espião" : gameData.role}
          </h1>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
            <p className="text-xs text-slate-500 uppercase mb-1">Local da Missão</p>
            <h3 className="text-2xl font-bold">
              {gameData.isSpy ? "???" : gameData.location}
            </h3>
          </div>

          <button
            onClick={() => setGameData(null)}
            className="mt-12 text-slate-500 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest underline underline-offset-8"
          >
            Voltar ao Lobby
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center p-6 min-h-screen max-w-2xl mx-auto">
      <header className="w-full flex justify-between items-center mt-4 mb-12">
        <h1 className="text-2xl font-black text-spy-red italic uppercase">Spyfall</h1>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
          <span className="text-slate-500 text-xs font-bold mr-2 uppercase tracking-tighter">Sala</span>
          <span className="font-mono text-lg font-bold text-white">{roomCode}</span>
        </div>
      </header>

      <main className="w-full flex-grow">
        <div className="flex justify-between items-end mb-4 px-2">
          <h3 className="text-xl font-bold">Agentes Conectados</h3>
          <span className="text-spy-red font-mono bg-spy-red/10 px-3 py-1 rounded-lg text-sm">
            {players.length} / 12
          </span>
        </div>

        <div className="grid gap-3">
          {players.map((p) => (
            <div
              key={p.id}
              className={`flex items-center p-4 rounded-2xl border transition-all ${p.id === socket.id ? 'bg-slate-900 border-spy-red/50 shadow-lg shadow-spy-red/5' : 'bg-slate-900/50 border-slate-800 opacity-80'}`}
            >
              <div className={`w-2 h-2 rounded-full mr-4 ${p.id === socket.id ? 'bg-spy-red' : 'bg-slate-600'}`}></div>
              <span className={`text-lg ${p.id === socket.id ? 'font-bold text-white' : 'text-slate-300'}`}>
                {p.username}
              </span>
              {p.id === socket.id && <span className="ml-auto text-[10px] bg-white/10 px-2 py-1 rounded-md text-slate-400 uppercase font-bold">Você</span>}
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full pb-8 mt-10">
        {isHost ? (
          <div className="space-y-4">
            <button
              disabled={players.length < 3}
              onClick={startGame}
              className="w-full bg-spy-red hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-600 transition-all py-5 rounded-2xl font-black text-xl uppercase tracking-tighter shadow-xl shadow-spy-red/20"
            >
              {players.length < 3 ? 'Aguardando Jogadores...' : '🚀 Iniciar Missão'}
            </button>
            <p className="text-center text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em]">
              Somente o host pode iniciar
            </p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-center flex items-center justify-center gap-4">
            <div className="w-2 h-2 bg-spy-red rounded-full animate-ping"></div>
            <p className="text-slate-400 font-medium italic">Aguardando o host iniciar a partida...</p>
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;