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
        <div key={key}>
          <div> {value.name} </div>
          <div> {value.isReady ? "R" : "N"} </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
