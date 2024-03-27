// app/page.tsx
'use client';

import { useSession, signOut, signIn } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      <h1>Home Page</h1>
      {session ? (
        <>
          <p>You are logged in as {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <div>
            <button onClick={() => signIn('spotify')}>Log in with Spotify</button>
          </div>
        </>
        
      )}
    </div>
  );
}