import { io } from "socket.io-client";

export default function Home() {
    const socket = io("http://localhost:3001")
    return (
        <div>
            <p>Room!</p>
        </div>
    )
}