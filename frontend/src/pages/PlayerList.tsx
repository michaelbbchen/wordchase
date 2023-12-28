import React from "react";

export interface PlayerInfo {
  name: string;
  isReady: boolean;
}

interface PlayerListProps {
  playerInfoDictionary: { [key: string]: PlayerInfo };
}

const PlayerList: React.FC<PlayerListProps> = ({ playerInfoDictionary }) => {
  return (
    <div>
      {Object.entries(playerInfoDictionary).map(([key, value]) => (
        <div
          key={key}
          className={
            (value.isReady ? "text-green-400" : "text-red-400") + " font-bold"
          }
        >
          <div> {value.name} </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
