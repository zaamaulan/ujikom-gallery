"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

const LogoutButton = ({ ...props }) => {
  return (
    <div className="flex gap-2">
      {" "}
      <Image
        src={"/assets/icons/logout.svg"}
        width={24}
        height={24}
        alt="logout icon"
      />
      <button onClick={() => signOut()} {...props}>
        Sign out
      </button>
    </div>
  );
};

export default LogoutButton;
