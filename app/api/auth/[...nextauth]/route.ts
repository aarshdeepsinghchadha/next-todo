import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            const user = await prisma.user.findUnique({
              where: { email: credentials?.email },
            });
    
            if (user && bcrypt.compareSync(credentials?.password || "", user.password)) {
              return { id: user.id, name: user.name, email: user.email };
            }
            return null;
          },
        }),
      ],
      session: {
        strategy: "jwt",
      },
      callbacks: {
        jwt: async ({ token, user }) => {
          if (user) token.id = user.id;
          return token;
        },
        session: async ({ session, token }) => {
            if (token) {
              session.user = { ...session.user, id: token.id };
            }
            return session;
          },
      },
});