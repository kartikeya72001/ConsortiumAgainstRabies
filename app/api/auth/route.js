import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { key } = await request.json();
    const correctKey = process.env.ADMIN_SECRET_KEY || 'car_admin_2026_secure';

    if (key === correctKey) {
      return NextResponse.json({ 
        success: true, 
        token: correctKey,
        user: { role: 'admin', name: 'CAR Secretariat' } 
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid secret key' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Auth server error' }, { status: 500 });
  }
}
