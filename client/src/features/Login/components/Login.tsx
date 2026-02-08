import { LoginProps } from "@/features/Login";
import { saveUserNameOnLocalStorage } from "@/utils/storageActions";

export const Login = ({ username, setUsername, roomCode, setRoomCode, createRoom, joinRoom }: LoginProps) => {

  function handleSaveUsername(username: string) {
    saveUserNameOnLocalStorage(username);
    setUsername(username)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-black text-spy-red italic tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(231,76,60,0.4)]">
          Spyfall
        </h1>
        <p className="text-slate-500 font-medium tracking-widest uppercase text-sm mt-2">Secret Agent Game</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <input
          className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl mb-6 text-center text-white outline-none focus:ring-2 focus:ring-spy-red"
          placeholder="SEU CODINOME"
          
          value={username}
          onChange={(e) => handleSaveUsername(e.target.value)}
        />
        <div className="grid gap-4">
          <button onClick={createRoom} className="w-full bg-spy-red hover:bg-red-600 text-white font-bold py-4 rounded-xl">
            CRIAR NOVA SALA
          </button>
          <div className="flex items-center gap-4 my-2">
            <div className="h-1px bg-slate-800 grow"></div>
            <span className="text-slate-600 text-xs font-bold uppercase">Ou</span>
            <div className="h-1px bg-slate-800 grow"></div>
          </div>
          <input
            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-center text-xl font-mono text-spy-red outline-none"
            placeholder="CÓDIGO"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />
          <button onClick={joinRoom} className="w-full bg-white text-slate-950 font-bold py-4 rounded-xl">
            ENTRAR NA SALA
          </button>
        </div>
      </div>
    </div>
  )
};