import { Player, GameInfo } from '../types';
import { LOCATIONS } from '../data/locations';


export const setupGame = (players: Player[]): Map<string, GameInfo> => {
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]!;
    
    const spyIndex = Math.floor(Math.random() * players.length);
    const spyId = players[spyIndex]?.id;

    // implement fisher-yates shuffle
    const availableRoles = [...location.roles].sort(() => Math.random() - 0.5);

    const gameAssignments = new Map<string, GameInfo>();

    players.forEach((player, index) => {
        const isSpy = player.id === spyId;
        
        gameAssignments.set(player.id, {
            location: isSpy ? "???" : location.name,
            role: isSpy ? "Espião" : (availableRoles[index] || "Civil"),
            isSpy: isSpy
        });
    });

    return gameAssignments;
};