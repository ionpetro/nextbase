import { NextResponse } from 'next/server';

function work() {
  throw new Error('API Test 2');
}

work();

export function GET() {
  return NextResponse.json({ name: 'John Doe' });
}
