"use client";

import Menu from "@/components/menu/menu";

export default function Home() {
  return (
    <div className="flex flex-col text-center h-screen">
      <span className="m-5 text-4xl font-bold">wordchase</span>
      <Menu />
    </div>
  );
}
