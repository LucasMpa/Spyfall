
import { GameInfo } from '@/globalTypes/gameInfo';

interface CardGameProps {
    data: GameInfo,
    onBack: () => void;
    seconds: number;
}

export { CardGameProps }