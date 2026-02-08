import React, { useState } from 'react';
import { CardGameProps } from '@/features/CardGame';
import { LOCATIONS } from '@/global/locations';

const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const CardGame: React.FC<CardGameProps> = ({ data, onBack, seconds }) => {
  const [eliminatedLocations, setEliminatedLocations] = useState<string[]>([]);

  const toggleLocation = (loc: string) => {
    setEliminatedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const allLocations = LOCATIONS.map((location) => location.name)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-500">
      <div className={`w-full max-w-lg px-4 py-8 rounded-[40px] shadow-2xl border-b-8 text-center ${data.isSpy ? 'bg-red-950/30 border-spy-red' : 'bg-blue-950/30 border-blue-500'}`}>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-sm mb-2">Sua Identidade</p>
        <h1 className={`text-6xl font-black uppercase mb-8 ${data.isSpy ? 'text-spy-red' : 'text-blue-400'}`}>
          {data.isSpy ? "Espião" : data.role}
        </h1>
        <div className="mb-8">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-1">Tempo de Missão</p>
          <div className={`text-5xl font-mono font-black tracking-tighter ${seconds < 60 ? 'text-spy-red animate-pulse' : 'text-white'}`}>
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
            Toque em um local para eliminá-lo das suas suspeitas.
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