import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    full_name: string | null;
    address: string | null;
  }
  interface Session {
    user: User & {
      id: string;
      username: string;
      email: string;
      password: string;
      full_name: string | null;
      address: string | null;
    };
    token: {
      id: string;
      username: string;
      email: string;
      password: string;
      full_name: string | null;
      address: string | null;
    };
  }
}
