import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom, requestRoom } from "../services/socket";
import { useSocket } from "../services/SocketContext";
import { isValidRoomId } from "../services/util";

export default function Home() {
  const navigate = useNavigate();
  const socket = useSocket();

  const gotoRoom = () => {
    requestRoom(socket).then((roomId) => {
      createRoom(socket, roomId);
      navigate(`room/${roomId}`);
    });
  };

  const joinRoom = () => {
    if (isValidRoomId(joinValue)) {
      navigate(`room/${joinValue.toUpperCase()}`);
    }
  };

  const [joinValue, setJoinValue] = useState("");
  const changeJoinValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[a-zA-Z]*$/.test(newValue) && newValue.length <= 4) {
      setJoinValue(newValue);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <div>
      <button onClick={gotoRoom}>Create Room</button>
      <input
        type="text"
        value={joinValue}
        onChange={changeJoinValue}
        onKeyDown={handleKeyPress}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}
