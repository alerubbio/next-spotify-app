export async function GET(request: Request) {
    console.log('Test route called');
    return new Response('Hello, World!');
  }