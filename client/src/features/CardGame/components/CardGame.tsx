import React from 'react';
import { CardGameProps } from '@/features/CardGame';

const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const CardGame: React.FC<CardGameProps> = ({ data, onBack, seconds }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in zoom-in duration-500">
      <div className={`w-full max-w-lg p-12 rounded-[40px] shadow-2xl border-b-8 text-center ${data.isSpy ? 'bg-red-950/30 border-spy-red' : 'bg-blue-950/30 border-blue-500'}`}>
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

        <button onClick={onBack} className="mt-12 text-slate-500 hover:text-white uppercase text-xs font-bold underline underline-offset-8 transition-colors">
          Encerrar Partida
        </button>
      </div>
    </div>
  );
};

export { CardGame };