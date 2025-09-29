import { NextResponse } from 'next/server';
import packageJson from '../../../../package.json';

export async function GET() {
  return NextResponse.json(
    {
      version: packageJson.version,
      name: packageJson.name,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
