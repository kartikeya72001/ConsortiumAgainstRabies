import { NextResponse } from 'next/server';
import { getLeadership, addLeader, updateLeader, removeLeader } from '@/lib/db';

function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.ADMIN_SECRET_KEY || 'car_admin_2026_secure';
  if (authHeader && authHeader.replace('Bearer ', '') === secret) {
    return true;
  }
  return false;
}

export async function GET() {
  try {
    const data = await getLeadership();
    return NextResponse.json(data);
  } catch (err) {
    console.error('API GET /api/leadership error:', err);
    return NextResponse.json({ error: 'Failed to retrieve leadership data' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.role) {
      return NextResponse.json({ error: 'Name and Role are required' }, { status: 400 });
    }

    const result = await addLeader({ name: body.name, role: body.role });
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error('API POST /api/leadership error:', err);
    return NextResponse.json({ error: 'Failed to add leader' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id || !body.name || !body.role) {
      return NextResponse.json({ error: 'ID, Name, and Role are required' }, { status: 400 });
    }

    const result = await updateLeader(body.id, { name: body.name, role: body.role });
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to update leader' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error('API PUT /api/leadership error:', err);
    return NextResponse.json({ error: 'Failed to update leader' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Leader ID is required' }, { status: 400 });
    }

    const result = await removeLeader(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to remove leader' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error('API DELETE /api/leadership error:', err);
    return NextResponse.json({ error: 'Failed to remove leader' }, { status: 500 });
  }
}
