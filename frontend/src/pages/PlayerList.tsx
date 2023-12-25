import React, { ChangeEvent, useState, useEffect } from 'react';
import { useSocket } from "../services/SocketContext";
import { PlayerInfo } from '../services/util';

interface PlayerListProps {
    playerId: string,
    playerInfoDictionary: { [key: string]: PlayerInfo }
}

const PlayerList: React.FC<PlayerListProps> = ({playerId, playerInfoDictionary}) => { 
    return (
        <div>
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