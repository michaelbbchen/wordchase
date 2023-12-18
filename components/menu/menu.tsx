import Link from "next/link";
import { useState } from "react";

export default function Menu() {
	const [name, setName] = useState<string>("");

  return (
    <div className="flex flex-col w-full h-3/5 text-center justify-center align-middle">
      <div>
        <input
          className="border-2 bg-transparent rounded-lg p-2 w-64"
          placeholder="Name"
        ></input>
      </div>
      <div className="flex flex-row justify-center w-full my-5">
        <Link href="" className="bg-transparent border-2 rounded-lg p-1 w-32 m-1"> Create Room </Link>
      </div>
    </div>
  );
}
