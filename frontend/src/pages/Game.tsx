import { ChangeEvent, useState, useEffect } from "react";
import { useSocket } from "../services/SocketContext";

export default function Game() {
  const socket = useSocket();

  return (
    <div className="flex align-center text-center items-center w-full h-full bg-red-400">
      <div className="w-full h-full">
        <input
          className="text-snow bg-black w-1/2 h-1/3"
          value={"game starteedddd"}
        />
        ;
      </div>
    </div>
  );
}
