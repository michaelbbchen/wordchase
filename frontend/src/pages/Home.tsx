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
    <div className="flex flex-col text-center">
      <div className="text-6xl my-6">wordchase</div>
      <div className="flex flex-col justify-center items-center my-32 space-y-10">
        <button
          onClick={gotoRoom}
          className="h-full w-1/4 py-2 px-4 rounded-xl bg-columbia_blue-300 hover:bg-columbia_blue-200"
        >
          Create Room
        </button>

        <hr className="border-1 border-y-sandy_brown-900 w-1/3"></hr>

        <div className="flex flex-row space-x-3 w-1/4">
          <input
            className="rounded-xl p-2 w-1/3 text-center uppercase text-night"
            type="text"
            value={joinValue}
            onChange={changeJoinValue}
            onKeyDown={handleKeyPress}
          />
          <button
            className="bg-columbia_blue-300 rounded-xl w-2/3 hover:bg-columbia_blue-200"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
