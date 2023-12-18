"use client";

import Menu from "@/components/menu/menu";
import * as Ably from "ably";
import { AblyProvider, useChannel } from "ably/react";
import dynamic from "next/dynamic.js";

export default function Home() {
  // const PubSubClient = dynamic<typeof AblyClient>(() => import("./ably-client"), {
  //   ssr: false,
  // });

  return (
    <div className="flex flex-col text-center h-screen">
      <span className="m-5 text-4xl font-bold">wordchase</span>
      <Menu />
    </div>
  );
}
