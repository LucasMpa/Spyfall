import { Player } from '@/global/gameInfo';

interface LobbyProps {
  roomCode: string;
  copyCode: () => void;
  players: Player[];
  isHost: boolean;
  startGame: () => void;
  socketId: string | undefined;
}

export { LobbyProps }