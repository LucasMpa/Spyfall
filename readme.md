# 🕵️ Spyfall Online - Real-Time Multiplayer
A modern web implementation of the popular party game Spyfall. This project leverages WebSocket communication to provide a seamless, instant gaming experience across multiple devices.

# 🛠️ Tech Stack
Built using a simple distributed architecture (Client-Server):

## Frontend

React (Vite): Framework for a fast, reactive UI.

Tailwind CSS v4: Next-gen utility-first styling for a sleek "Dark Mode" design.

Socket.io-client: Real-time bidirectional communication.

TypeScript: Type safety and predictable code behavior.

## Backend

Node.js & Express: Robust server for route management.

Socket.io: Core engine for room management and real-time events.

TypeScript: Shared types across client and server.

# 🎮 How the Game Works
Objective
For Civilians: Unmask the spy through questions and answers before time runs out.

For the Spy: Blend in with the civilians and figure out the secret Location.

Rules & Flow
The Lobby: A player creates a room and receives a unique code. Others join using that code.

The Start: When the Host starts the match, the system randomly picks a Location (e.g., Submarine, Space Station) and a Spy.

Roles: * All civilians receive the Location name and a Specific Role (e.g., in the Submarine, one might be the Captain, another the Cook).

The spy doesn't know the location; they only know they are the spy.

The Dynamic: Players take turns asking each other questions.

Example: "Captain, how is the view from the window?"

The spy must answer carefully to avoid detection while fishing for clues about the location.

# ⚙️ System Architecture
The system manages the game state entirely in the server's memory. This ensures that no player can "hack" the location by inspecting the browser's source code (Client-side protection).

Key Socket Events:
create_room: Generates a unique ID and sets the socket as the Host.

join_room: Validates the room's existence and adds the player to the array.

start_game: The server runs the randomization algorithm and broadcasts private game_info to each individual socket.

## 🚀 Installation
### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## 🚀 Execution
### Server
```
cd server
npm install
npm run dev
```

### Client
```
cd client
npm install
```
npm run dev (Open at http://localhost:3000)