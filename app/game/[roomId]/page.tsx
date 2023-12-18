import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";

export default function Room({ params }: { params: { roomId: string } }) {
  // have to do this so next.js does not prerender the Ably connection code
  const ClientGame = dynamic(() => import("./game"), {
    loading: () => (
      <div className="flex flex-row justify-center align-middle items-center m-3">
        <div className="w-4 h-4 mx-2">
        <Image src={"/yellow.svg"} alt="" width={50} height={50} />
        </div>
        Connecting to Server...
      </div>
    ),
    ssr: false,
  });

  return (
    <div className="flex flex-col text-center h-screen">
      <ClientGame roomId={params.roomId}/>
    </div>
  );
}
