"use client";
import React from "react";

import SidebarUser from "@/components/sidebar-user";
import { SessionProvider } from "next-auth/react";

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <div className="flex">
        <SidebarUser />
        <div className="my-10 mx-8 flex-1">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default PublicLayout;
