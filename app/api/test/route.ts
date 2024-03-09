import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = {
    message: 'Hello from the /test endpoint!',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}