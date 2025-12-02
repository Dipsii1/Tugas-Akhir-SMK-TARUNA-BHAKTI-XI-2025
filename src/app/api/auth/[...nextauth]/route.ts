import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, createUserFromGoogle } from "@/app/lib/actions";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    
    // User/Siswa Login
    CredentialsProvider({
      id: "user-login",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);

        if (!user) return null;

        // Cek apakah user adalah siswa (id_role = 2)
        if (user.id_role !== 2) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          id_role: user.id_role,
        };
      },
    }),
    
    // Admin Login
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await getUserByEmail(credentials.email);

        if (!admin) return null;

        // Cek apakah user adalah admin (id_role = 1)
        if (admin.id_role !== 1) return null;

        const isValid = await compare(credentials.password, admin.password);
        if (!isValid) return null;

        return {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
          id_role: admin.id_role,
        };
      },
    }),

    // Petugas Login
    CredentialsProvider({
      id: "petugas-login",
      name: "Petugas Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const petugas = await getUserByEmail(credentials.email);

        if (!petugas) return null;

        // Cek apakah user adalah petugas (id_role = 3)
        if (petugas.id_role !== 3) return null;

        const isValid = await compare(credentials.password, petugas.password);
        if (!isValid) return null;

        return {
          id: String(petugas.id),
          name: petugas.name,
          email: petugas.email,
          id_role: petugas.id_role,
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
        
        // Set role name berdasarkan id_role
        if (user.id_role === 1) {
          token.role = "admin";
        } else if (user.id_role === 2) {
          token.role = "siswa";
        } else if (user.id_role === 3) {
          token.role = "petugas";
        }
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };