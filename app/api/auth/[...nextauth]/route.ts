import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();

        const user = result.user;

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
