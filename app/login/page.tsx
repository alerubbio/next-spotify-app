// app/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn('spotify', { callbackUrl: '/' })}>
        Sign in with Spotify
      </button>
    </div>
  );
}