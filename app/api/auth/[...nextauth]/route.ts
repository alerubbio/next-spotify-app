import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_C
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: 'user-read-email user-read-private', // Specify the scopes you need
      authorizationUrl: 'https://accounts.spotify.com/authorize?response_type=code',
      accessTokenUrl: 'https://accounts.spotify.com/api/token',
      profileUrl: 'https://api.spotify.com/v1/me',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images[0]?.url,
        };
      },
      async authorizationParams({ state }) {
        // Generate a state value to prevent CSRF attacks
        const stateValue = generateRandomString(16);
        return {
          state: stateValue,
        };
      },
      async token({ code, state }) {
        // Exchange the code for an access token
        const params = new URLSearchParams({
          client_id: process.env.SPOTIFY_CLIENT_ID,
          client_secret: process.env.SPOTIFY_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.REDIRECT_URI,
          state,
        }).toString();

        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params,
        });

        const data = await response.json();
        return data;
      },
    }),
 ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }