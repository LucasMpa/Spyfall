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
        name: "Avião",
        roles: ["Piloto", "Comissário de Bordo", "Passageiro", "Copiloto", "Marechal do Ar", "Mecânico"]
    },
    {
        name: "Delegacia",
        roles: ["Delegado", "Investigador", "Escrivão", "Policial Militar", "Detento", "Advogado"]
    },
    {
        name: "Praia",
        roles: ["Garçom de Praia", "Surfista", "Salva-vidas", "Trombadinha", "Banhista", "Fotográfo", "Sorveteiro"]
    },
    {
        name: "Teatro",
        roles: ["Recepcionista", "Assistente de Palco", "Caixa", "Espectador", "Diretor", "Ator", "Figurante"]
    },
    {
        name: "Faculdade",
        roles: ["Veterano", "Professor", "Reitor", "Psicólogo", "Zelador", "Calouro", "Faxineiro"]
    },
    {
        name: "Cassino",
        roles: ["Bartender", "Chefe da Segurança", "Segurança", "Gerente", "Malandro", "Mesário", "Apostador"]
    },
    {
        name: "Circo",
        roles: ["Acrobata", "Domador", "Mágico", "Espectador", "Engolidor de Espadas", "Palhaço", "Malabarista"]
    },
];