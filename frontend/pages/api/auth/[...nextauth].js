import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  //configuration of auth providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});
