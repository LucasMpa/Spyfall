
import { GameInfo, Player } from '@/global/gameInfo';

interface CardGameProps {
    data: GameInfo,
    onBack: () => void;
    seconds: number;
    players: Player[];
}

export { CardGameProps }