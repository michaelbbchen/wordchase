import React, { ChangeEvent, useState, useEffect } from 'react';
import { useSocket } from "../services/SocketContext";

interface PlayerInfo {
    name: string,
    isReady: boolean
}

interface PlayerListProps {
    playerId: string,
    playerInfoDictionary: { [key: string]: PlayerInfo }
}

const PlayerList: React.FC<PlayerListProps> = ({playerId, playerInfoDictionary}) => { 
    const socket = useSocket();

    const [nameValue, setNameValue] = useState(playerInfoDictionary[playerId].name);

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        let regex = /^[0-9a-zA-Z]+$/;
        if(val.match(regex) || val === ""){
            socket.emit("room:playerUpdate", {name:val, isReady: false});
            setNameValue(val);
        }
    }

    return (
        <div>
            <input value={nameValue}
                maxLength={15}
                onChange = {onTextChange}/>
            {Object.entries(playerInfoDictionary).map(([key, value]) => (
                <div> 
                    <div> {value.name} </div>
                    <div> {value.isReady ? 'R' : 'N'} </div>
                </div>
            ))}
        </div>
    )
}

export default PlayerList;