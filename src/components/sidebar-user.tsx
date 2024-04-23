"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import LogoutButton from "./logout";
import { useSession } from "next-auth/react";

const SidebarUser = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div className="w-72 border-r pr-5 pl-7 py-10 flex flex-col h-screen justify-between sticky top-0">
      <div>
        <h4 className="text-2xl font-bold">OpticOpus</h4>
        <p className="text-gray-600">Gallery Photo Website</p>
        <nav className="mt-10 font-medium transition-all">
          <ul className="space-y-4">
            <li className={cn("flex gap-2  transition-all", pathname === "/" && "bg-gray-200 p-2 rounded-lg")}>
              <Image src={"/assets/icons/photo.svg"} width={24} height={24} alt="photo icon" />
              <Link href={"/"}>Gallery</Link>
            </li>
            <li className={cn("flex gap-2  transition-all", pathname === "/profile" && "bg-gray-200 p-2 rounded-lg")}>
              <Image src={"/assets/icons/profile.svg"} width={24} height={24} alt="profile icon" />
              <Link href={"/profile"}>Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
      {session ? (
        <LogoutButton className="w-fit font-medium relative bottom-0" />
      ) : (
        <Link href={"/auth/login"} className="flex gap-2">
          <Image src={"/assets/icons/login.svg"} width={24} height={24} alt="login icon" />
          <p>Login</p>
        </Link>
      )}
    </div>
  );
};

export default SidebarUser;
