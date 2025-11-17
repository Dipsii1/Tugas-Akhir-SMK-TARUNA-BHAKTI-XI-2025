import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, createUserFromGoogle, getAdminByName } from "@/app/lib/actions";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: "user-login",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        const user = await getUserByEmail(email);

        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    // Admin Credentials Provider
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Credentials",
      credentials: {
        name: { label: "name", type: "name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { name, password } = credentials as { name: string; password: string };

        const admin = await getAdminByName(name);

        if (!admin) return null;

        const isValid = await compare(password, admin.password);
        if (!isValid) return null;

        return {
          id: String(admin.id),
          name: admin.name,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await getUserByEmail(user.email!)
        if (!existingUser) {
          await createUserFromGoogle(user)
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.role = user.role
        token.type = user.role === "admin" ? "admin" : "user"  
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.role = token.role
        session.user.type = token.type
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
