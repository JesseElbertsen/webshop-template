import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../lib/prisma";
import type { SessionStrategy } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async signIn({ user }: { user: { email?: string | null } }) {
      return user.email === "maarssen616@gmail.com";
    },
    // Of, als je alle params wilt ondersteunen:
    // async signIn({ user }: { user: { email?: string | null } } & Record<string, unknown>) {
    //   return user.email === "maarssen616@gmail.com";
    // },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
