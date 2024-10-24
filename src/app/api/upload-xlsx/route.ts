import { NextResponse } from 'next/server';
import { exportUsers } from '@/actions';

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const parsedData = await exportUsers(file);
  return NextResponse.json({ data: parsedData });
}
