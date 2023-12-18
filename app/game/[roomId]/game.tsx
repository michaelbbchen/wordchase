"use client";

import React from "react";
import * as Ably from "ably";
import { AblyProvider, useChannel } from "ably/react";

const client = new Ably.Realtime.Promise({
  authUrl: process.env.NEXT_PUBLIC_HOSTNAME + "/token",
  authMethod: "POST",
});

export default function AblyClient(props: {
	roomId: string
}) {
  return (
    <AblyProvider client={client}>
      <Game roomId={props.roomId}></Game>
    </AblyProvider>
  );
}

function Game(props: {
	roomId: string
}) {
  const { channel } = useChannel(props.roomId, (message: Ably.Types.Message) => {
    console.log(message);
  });
  return (
    <button
      onClick={() => {
        if (channel === null) return;
        channel.publish(props.roomId, { text: `connected` });
      }}
    >
      asdflkjasdflkajsdlfkj
    </button>
  );
}
