import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/app/lib/actions";
import { compare } from "bcryptjs";

export const authOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await getUserByEmail(credentials.email);
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Tentukan role berdasarkan id_role
        const roleMap: Record<number, string> = {
          1: "admin",
          2: "siswa",
          3: "petugas",
        };

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          id_role: user.id_role,
          role: roleMap[user.id_role] ?? "unknown",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.id_role = user.id_role;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.id_role = token.id_role as number;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
