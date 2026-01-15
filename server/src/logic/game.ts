// src/logic/game.ts
import { Player, GameInfo } from '../types';
import { LOCATIONS } from '../data/locations';

/**
 * Lógica principal para configurar uma nova rodada.
 * Escolhe um local, define o espião e atribui papéis únicos aos jogadores.
 */
export const setupGame = (players: Player[]): Map<string, GameInfo> => {
    // 1. Seleciona um local aleatório da nossa lista
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]!;
    
    // 2. Define aleatoriamente quem será o espião (usando o índice do array)
    const spyIndex = Math.floor(Math.random() * players.length);
    const spyId = players[spyIndex]?.id;

    // 3. Cria uma cópia dos papéis do local e embaralha (Fisher-Yates shuffle simplificado)
    const availableRoles = [...location.roles].sort(() => Math.random() - 0.5);

    const gameAssignments = new Map<string, GameInfo>();

    players.forEach((player, index) => {
        const isSpy = player.id === spyId;
        
        // Atribui as informações de jogo
        // Se não houver papéis suficientes para todos os jogadores, define como "Civil"
        gameAssignments.set(player.id, {
            location: isSpy ? "???" : location.name,
            role: isSpy ? "Espião" : (availableRoles[index] || "Civil"),
            isSpy: isSpy
        });
    });

    return gameAssignments;
};