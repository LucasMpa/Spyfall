interface LoginProps {
  username: string;
  setUsername: (val: string) => void;
  roomCode: string;
  setRoomCode: (val: string) => void;
  createRoom: () => void;
  joinRoom: () => void;
}
export { LoginProps }