import { ChangeEvent, useState, useEffect } from "react";
import { useSocket } from "../services/SocketContext";

export default function Game() {
    const socket = useSocket();

    return (
        <input
        value = {"game starteedddd"}
        />
    )
}