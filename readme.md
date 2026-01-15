# 🕵️ Spyfall Online - Real-Time Multiplayer

Uma implementação moderna e web do popular jogo de tabuleiro **Spyfall**. Este projeto utiliza comunicação via WebSockets para proporcionar uma experiência de jogo fluida e instantânea entre múltiplos dispositivos.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura de sistemas distribuídos simples (Cliente-Servidor):

* **Frontend:**
    * **React (Vite):** Framework para uma interface reativa e rápida.
    * **Tailwind CSS v4:** Estilização utilitária de última geração para um design "Dark Mode".
    * **Socket.io-client:** Comunicação bidirecional com o servidor.
    * **TypeScript:** Garantia de tipos e segurança no código.

* **Backend:**
    * **Node.js & Express:** Servidor robusto para gerenciamento de rotas.
    * **Socket.io:** Engine principal para gerenciamento de salas e eventos em tempo real.
    * **TypeScript:** Tipagem compartilhada entre cliente e servidor.

---

## 🎮 Como o Jogo Funciona

### Objetivo
* **Para os Civis:** Descobrir quem é o espião através de perguntas e respostas antes que o tempo acabe.
* **Para o Espião:** Tentar se misturar aos civis e descobrir em qual **Localização** o grupo está.

### Regras & Fluxo
1.  **A Sala:** Um jogador cria uma sala e recebe um código único. Outros jogadores entram usando esse código.
2.  **Início:** Quando o Host inicia a partida, o sistema sorteia aleatoriamente um **Local** (ex: Submarino, Estação Espacial) e um **Espião**.
3.  **Papéis:** * Todos os civis recebem o nome do Local e um **Papel específico** (ex: no Submarino, um pode ser o Capitão, outro o Cozinheiro).
    * O espião não sabe onde está, ele apenas sabe que é o espião.
4.  **A Dinâmica:** Os jogadores fazem perguntas uns aos outros. 
    * *Exemplo:* "Capitão, como está a vista da janela?"
    * O espião deve responder com cuidado para não ser descoberto, enquanto tenta pescar pistas sobre o local.

---

## ⚙️ Arquitetura do Sistema

O sistema gerencia o estado do jogo inteiramente na memória do servidor para garantir que nenhum jogador consiga "hackear" a localização inspecionando o código do navegador (Client-side).



### Principais Eventos Socket:
* `create_room`: Gera um ID único e define o socket como Host.
* `join_room`: Valida a existência da sala e adiciona o jogador ao array.
* `start_game`: O servidor executa o algoritmo de sorteio e distribui `game_info` individuais e privados para cada socket.

---

## 🚀 Instalação

### Pré-requisitos
* Node.js (v18 ou superior)
* npm ou yarn


## 🚀 Execução

### Servidor
1. `cd server`
2. `npm install`
3. `npm run dev`

### Cliente
1. `cd client`
2. `npm install`
3. `npm run dev` (Abra em http://localhost:3000)