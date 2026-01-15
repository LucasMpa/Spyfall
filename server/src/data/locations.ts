export interface Location {
    name: string;
    roles: string[];
}

export const LOCATIONS: Location[] = [
    {
        name: "Hospital",
        roles: ["Médico", "Enfermeiro", "Paciente", "Zelador", "Cirurgião", "Recepcionista", "Anestesista"]
    },
    {
        name: "Submarino",
        roles: ["Capitão", "Cozinheiro", "Engenheiro", "Sonarista", "Oficial de Armas", "Marinheiro"]
    },
    {
        name: "Escola",
        roles: ["Professor", "Diretor", "Aluno", "Zelador", "Merendeira", "Segurança", "Psicólogo"]
    },
    {
        name: "Estação Espacial",
        roles: ["Astronauta", "Cientista", "Engenheiro", "Comandante", "Turista Espacial", "Botânico"]
    },
    {
        name: "Restaurante",
        roles: ["Chef", "Garçom", "Hostess", "Sommelier", "Lavadore de Pratos", "Cliente VIP"]
    },
    {
        name: "Circo",
        roles: ["Palhaço", "Acrobata", "Domador", "Mágico", "Vendedor de Pipoca", "Malabarista"]
    },
    {
        name: "Avião",
        roles: ["Piloto", "Comissário de Bordo", "Passageiro", "Copiloto", "Marechal do Ar", "Mecânico"]
    },
    {
        name: "Delegacia",
        roles: ["Delegado", "Investigador", "Escrivão", "Policial Militar", "Detento", "Advogado"]
    }
];