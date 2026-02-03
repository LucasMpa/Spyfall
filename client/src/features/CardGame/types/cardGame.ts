
import { GameInfo } from '@/global/gameInfo';

interface CardGameProps {
    data: GameInfo,
    onBack: () => void;
    seconds: number;
}

export { CardGameProps }