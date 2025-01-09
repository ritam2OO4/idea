import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // Callback triggered when a user signs in
    async signIn({ user: { name, email, image }, profile: { id, login, bio } }) {
      // Check if the user already exists in the database
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
      // console.log(existingUser,"dahjadskhdjkasdhsjkdshajk")
      // If the user doesn't exist, create a new record
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
        // console.log("hello")
      }

      return true; // Proceed with the sign-in
    },

    // Callback triggered during the JWT creation
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Fetch user data by GitHub ID and assign it to the token
        const { id } = profile
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
          console.log(token.id,"&&" ,token)
          token.id = user?._id; // Attach the user ID to the JWT token
          console.log(token.id,)
        // console.log(token.id,)
      }
      // console.log(token.id,"sdfhjk") 
      return token;
    },

    // Callback triggered when a session is created
    async session({ session, token }: { session: any, token: any }) {
      // Assign the user ID from the token to the session
      session.id = token.id;
      return session;
    },
  },
});
