import { FaRegCopy, FaCrown, FaUserSecret } from 'react-icons/fa';
import { LobbyProps } from '@/features/Lobby';

export const Lobby = ({ 
  roomCode, 
  copyCode, 
  players, 
  isHost, 
  startGame, 
  socketId 
}: LobbyProps) => {
  return (
    <div className="flex flex-col items-center p-6 min-h-screen max-w-2xl mx-auto animate-in fade-in duration-500">
      <header className="w-full flex justify-between items-center mt-4 mb-12">
        <h1 className="text-2xl font-black text-spy-red italic uppercase tracking-tighter">
          Spyfall
        </h1>
        <div 
          onClick={copyCode}
          className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full flex items-center gap-3 cursor-pointer hover:border-spy-red transition-colors group"
        >
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">Sala</span>
          <span className="font-mono text-lg font-bold text-white">{roomCode}</span>
          <FaRegCopy size={16} className="text-slate-500 group-hover:text-spy-red transition-colors" />
        </div>
      </header>

      {/* Lista de Jogadores */}
      <main className="w-full flex-grow">
        <div className="flex justify-between items-end mb-6 px-2">
          <div className="flex items-center gap-2">
            <FaUserSecret className="text-spy-red" />
            <h3 className="text-xl font-bold text-white">Agentes na Escuta</h3>
          </div>
          <span className="text-spy-red font-mono bg-spy-red/10 px-3 py-1 rounded-lg text-xs font-bold">
            {players.length} / 12
          </span>
        </div>

        <div className="grid gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {players.map((p, index) => (
            <div
              key={p.id}
              className={`flex items-center p-4 rounded-2xl border transition-all duration-300 ${
                p.id === socketId 
                  ? 'bg-slate-900 border-spy-red/50 shadow-lg shadow-spy-red/5 translate-x-1' 
                  : 'bg-slate-900/40 border-slate-800/50'
              }`}
            >
              <div className="relative mr-4">
                <div className={`w-3 h-3 rounded-full ${p.id === socketId ? 'bg-spy-red animate-pulse' : 'bg-slate-700'}`}></div>
              </div>

              <span className={`text-lg tracking-tight ${p.id === socketId ? 'font-bold text-white' : 'text-slate-400'}`}>
                {p.username}
              </span>

              <div className="ml-auto flex gap-2">
                {index === 0 && (
                  <span className="flex items-center gap-1 bg-amber-500/10 text-amber-500 text-[10px] px-2 py-1 rounded-md font-black uppercase">
                    <FaCrown size={10} /> Host
                  </span>
                )}
                {p.id === socketId && (
                  <span className="bg-white/5 text-slate-500 text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-widest">
                    Você
                  </span>
                )}
              </div>
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
              className="w-full bg-spy-red hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition-all py-5 rounded-2xl font-black text-xl uppercase tracking-tighter shadow-xl shadow-spy-red/20 active:scale-95"
            >
              {players.length < 3 ? 'Aguardando Agentes...' : '🚀 Iniciar Missão'}
            </button>
            <p className="text-center text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em] animate-pulse">
              Você tem o controle da operação
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-3xl text-center flex flex-col items-center justify-center gap-3">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-spy-red rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-spy-red rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-spy-red rounded-full animate-bounce"></div>
            </div>
            <p className="text-slate-400 font-medium text-sm italic">
              Aguardando o Host iniciar a transmissão...
            </p>
          </div>
        )}
      </footer>
    </div>
  );
};