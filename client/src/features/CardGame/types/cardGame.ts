
import { GameInfo, Player } from '@/global/gameInfo';

interface VoteResult {
    votedUsername: string;
    spyUsername: string;
    playersWin: boolean;
}

interface SpyGuessResult {
    spyWins: boolean;
    guessedLocation: string;
    actualLocation: string;
    spyUsername: string;
}

interface CardGameProps {
    data: GameInfo,
    onBack: () => void;
    onReturnToLobby: () => void;
    seconds: number;
    players: Player[];
    socketId: string;
    spyUsername?: string;
    votes: Record<string, number>;
    onVote: (playerId: string) => void;
    voteResult?: VoteResult;
    spyGuessResult?: SpyGuessResult;
    onSpyGuess: (location: string) => void;
}

export { CardGameProps, VoteResult, SpyGuessResult }