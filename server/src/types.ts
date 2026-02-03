export interface Player {
    id: string;
    username: string;
    role?: string;
    isSpy: boolean;
}

export interface Room {
    code: string;
    players: Player[];
    isStarted: boolean;
    location?: string;
    hostId: string;
    timer?: NodeJS.Timeout;
    timeLeft?: number;
}

export interface GameInfo {
    location: string;
    role: string;
    isSpy: boolean;
}