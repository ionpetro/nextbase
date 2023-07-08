import { NextResponse } from 'next/server';

// uncomment this to test async errors
// const doAsyncWork = () => Promise.reject(new Error('API Test 1'));
// doAsyncWork();

export function GET() {
  return NextResponse.json({ name: 'John Doe' });
}
