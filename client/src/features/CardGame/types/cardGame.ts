
import { GameInfo, Player } from '@/global/gameInfo';

interface VoteResult {
    votedUsername: string;
    spyUsername: string;
    playersWin: boolean;
}

interface CardGameProps {
    data: GameInfo,
    onBack: () => void;
    seconds: number;
    players: Player[];
    socketId: string;
    spyUsername?: string;
    votes: Record<string, number>;
    onVote: (playerId: string) => void;
    voteResult?: VoteResult;
}

export { CardGameProps, VoteResult }