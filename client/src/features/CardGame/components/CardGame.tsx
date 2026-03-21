import React, { useState } from 'react';
import { CardGameProps } from '@/features/CardGame';
import { LOCATIONS } from '@/global/locations';

const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const CardGame: React.FC<CardGameProps> = ({ data, onBack, onReturnToLobby, seconds, players, socketId, spyUsername, votes, onVote, voteResult, spyGuessResult, onSpyGuess }) => {
  const [eliminatedLocations, setEliminatedLocations] = useState<string[]>([]);
  const [showPlayers, setShowPlayers] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const allLocations = LOCATIONS.map((location) => location.name);

  const toggleLocation = (loc: string) => {
    const newEliminated = eliminatedLocations.includes(loc)
      ? eliminatedLocations.filter(l => l !== loc)
      : [...eliminatedLocations, loc];

    setEliminatedLocations(newEliminated);

    const remaining = allLocations.filter(l => !newEliminated.includes(l));
    if (data.isSpy && remaining.length === 1) {
      onSpyGuess(remaining[0]!);
    }
  };

  const handleVote = (playerId: string) => {
    if (hasVoted || playerId === socketId) return;
    setHasVoted(true);
    onVote(playerId);
  };

  if (spyGuessResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-500">
        <div className={`w-full max-w-lg px-4 py-12 rounded-[40px] shadow-2xl border-b-8 text-center ${spyGuessResult.spyWins ? 'bg-red-950/30 border-spy-red' : 'bg-blue-950/30 border-blue-500'}`}>
          <p className="text-slate-400 uppercase tracking-[0.3em] text-sm mb-4">Partida Encerrada</p>
          <h1 className={`text-5xl font-black uppercase mb-8 ${spyGuessResult.spyWins ? 'text-spy-red' : 'text-blue-400'}`}>
            {spyGuessResult.spyWins ? 'Espião vence!' : 'Funcionários vencem!'}
          </h1>
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 mb-3">
            <p className="text-xs text-slate-500 uppercase mb-1">Palpite do espião</p>
            <h3 className={`text-2xl font-bold ${spyGuessResult.spyWins ? 'text-spy-red' : 'text-slate-300'}`}>{spyGuessResult.guessedLocation}</h3>
          </div>
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 mb-3">
            <p className="text-xs text-slate-500 uppercase mb-1">Local verdadeiro</p>
            <h3 className="text-2xl font-bold text-blue-400">{spyGuessResult.actualLocation}</h3>
          </div>
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 mb-3">
            <p className="text-xs text-slate-500 uppercase mb-1">O espião era</p>
            <h3 className="text-2xl font-bold text-spy-red">{spyGuessResult.spyUsername}</h3>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3">
            <button onClick={onReturnToLobby} className="px-6 py-2 rounded-2xl bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-slate-400 active:scale-95 transition-all cursor-pointer text-sm font-bold text-slate-200 hover:text-white">
              Continuar no lobby
            </button>
            <button onClick={onBack} className="text-slate-500 hover:text-white uppercase text-xs font-bold underline underline-offset-8 transition-colors cursor-pointer">
              Encerrar Partida
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (voteResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-500">
        <div className={`w-full max-w-lg px-4 py-12 rounded-[40px] shadow-2xl border-b-8 text-center ${voteResult.playersWin ? 'bg-blue-950/30 border-blue-500' : 'bg-red-950/30 border-spy-red'}`}>
          <p className="text-slate-400 uppercase tracking-[0.3em] text-sm mb-4">Partida Encerrada</p>
          <h1 className={`text-5xl font-black uppercase mb-8 ${voteResult.playersWin ? 'text-blue-400' : 'text-spy-red'}`}>
            {voteResult.playersWin ? 'Funcionários vencem!' : 'Espião vence!'}
          </h1>
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 mb-3">
            <p className="text-xs text-slate-500 uppercase mb-1">Jogador votado</p>
            <h3 className="text-2xl font-bold">{voteResult.votedUsername}</h3>
          </div>
          {!voteResult.playersWin && (
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5 mb-3">
              <p className="text-xs text-slate-500 uppercase mb-1">Espião verdadeiro</p>
              <h3 className="text-2xl font-bold text-spy-red">{voteResult.spyUsername}</h3>
            </div>
          )}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button onClick={onReturnToLobby} className="px-6 py-2 rounded-2xl bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-slate-400 active:scale-95 transition-all cursor-pointer text-sm font-bold text-slate-200 hover:text-white">
              Continuar no lobby
            </button>
            <button onClick={onBack} className="text-slate-500 hover:text-white uppercase text-xs font-bold underline underline-offset-8 transition-colors cursor-pointer">
              Encerrar Partida
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (spyUsername) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-500">
        <div className="w-full max-w-lg px-4 py-12 rounded-[40px] shadow-2xl border-b-8 text-center bg-red-950/30 border-spy-red">
          <p className="text-slate-400 uppercase tracking-[0.3em] text-sm mb-4">Tempo Esgotado</p>
          <p className="text-slate-500 uppercase tracking-[0.2em] text-xs mb-2">O espião era</p>
          <h1 className="text-6xl font-black uppercase text-spy-red mb-2 break-all">{spyUsername}</h1>
          <p className="text-slate-500 text-sm mb-12">O espião venceu!</p>
          <div className="flex flex-col items-center gap-3">
            <button onClick={onReturnToLobby} className="px-6 py-2 rounded-2xl bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-slate-400 active:scale-95 transition-all cursor-pointer text-sm font-bold text-slate-200 hover:text-white">
              Continuar no lobby
            </button>
            <button onClick={onBack} className="text-slate-500 hover:text-white uppercase text-xs font-bold underline underline-offset-8 transition-colors cursor-pointer">
              Encerrar Partida
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-500">

      {/* Players button */}
      <button
        onClick={() => setShowPlayers(true)}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer shadow-lg"
        aria-label="Ver jogadores"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-spy-red text-white text-[10px] font-bold flex items-center justify-center">
          {players.length}
        </span>
      </button>

      {/* Players modal */}
      {showPlayers && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPlayers(false)}
        >
          <div
            className="w-full max-w-sm mx-4 bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Jogadores na Partida</h2>
              <span className="text-xs font-bold text-spy-red bg-red-950/40 border border-spy-red/30 rounded-full px-2 py-0.5">
                {players.length}
              </span>
            </div>
            <ul className="space-y-2">
              {players.map((player) => {
                const voteCount = votes[player.id] || 0;
                const isSelf = player.id === socketId;
                return (
                  <li key={player.id} className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-slate-200 text-sm font-medium truncate flex-1">{player.username}</span>
                    {voteCount > 0 && (
                      <span className="text-xs font-bold text-spy-red bg-red-950/40 border border-spy-red/30 rounded-full px-2 py-0.5 shrink-0">
                        {voteCount}
                      </span>
                    )}
                    {!isSelf && (
                      <button
                        onClick={() => handleVote(player.id)}
                        disabled={hasVoted}
                        className="shrink-0 px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-spy-red/20 border border-spy-red/40 text-spy-red hover:bg-spy-red/40"
                      >
                        Votar
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
            {hasVoted && (
              <p className="text-center text-xs text-slate-500 mt-4">Você já votou nesta rodada.</p>
            )}
            <button
              onClick={() => setShowPlayers(false)}
              className="mt-6 w-full py-3 rounded-2xl bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-500 active:scale-95 transition-all cursor-pointer text-sm font-bold text-slate-300 hover:text-white"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <div className={`w-full max-w-lg px-4 py-8 rounded-[40px] shadow-2xl border-b-8 text-center ${data.isSpy ? 'bg-red-950/30 border-spy-red' : 'bg-blue-950/30 border-blue-500'}`}>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-sm mb-2">Sua Identidade</p>
        <h1 className={`text-6xl font-black uppercase mb-8 ${data.isSpy ? 'text-spy-red' : 'text-blue-400'}`}>
          {data.isSpy ? "Espião" : data.role}
        </h1>
        <div className="mb-8">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-1">Tempo de Missão</p>
          <div className={`text-5xl font-mono font-black tracking-tighter ${seconds <= 5 ? 'text-spy-red animate-pulse' : 'text-white'}`}>
            {formatTime(seconds)}
          </div>
        </div>
        <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
          <p className="text-xs text-slate-500 uppercase mb-1">Local da Missão</p>
          <h3 className="text-2xl font-bold">{data.isSpy ? "???" : data.location}</h3>
        </div>
        {data.isSpy && <div className="w-full max-w-lg bg-slate-900/50 border border-slate-800 rounded-3xl p-6 mt-4">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-spy-red rounded-full"></span>
            Checklist de Localizações
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {allLocations.map((loc) => {
              const isEliminated = eliminatedLocations.includes(loc);
              return (
                <button
                  key={loc}
                  onClick={() => toggleLocation(loc)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all cursor-pointer flex justify-center items-center ${isEliminated
                    ? 'bg-slate-950 border-slate-800 text-slate-700 line-through opacity-50'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-spy-red'
                    }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-slate-600 mt-4 text-center italic">
            Toque em um local para eliminá-lo. O último restante será seu palpite final.
          </p>
        </div>
        }

        <button onClick={onBack} className="mt-12 text-slate-500 hover:text-white uppercase text-xs font-bold underline underline-offset-8 transition-colors cursor-pointer">
          Encerrar Partida
        </button>
      </div>
    </div>
  );
};

export { CardGame };
