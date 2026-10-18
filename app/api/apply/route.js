import { NextResponse } from 'next/server';
import { getApplications, addApplication, updateApplication, approveApplication } from '@/lib/db';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'car_admin_2026_secure';

function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  return token === ADMIN_SECRET;
}

// POST: Public submission of a new membership application
export async function POST(request) {
  try {
    const body = await request.json();

    const { fullName, email, phone, qualification, designation, institution, city, state, registrationNumber } = body;

    if (!fullName || !email || !phone || !registrationNumber) {
      return NextResponse.json(
        { error: 'Missing required fields (Full Name, Email, Phone, Council Registration Number)' },
        { status: 400 }
      );
    }

    const result = await addApplication({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      qualification: (qualification || '').trim(),
      speciality: (body.speciality || 'Community Medicine').trim(),
      designation: (designation || '').trim(),
      institution: (institution || '').trim(),
      city: (city || '').trim(),
      state: (state || 'Delhi').trim(),
      registrationNumber: registrationNumber.trim(),
    });

    return NextResponse.json({
      success: true,
      reference: result.application.reference,
      application: result.application,
      message: 'Application recorded successfully in Consortium registry',
    });
  } catch (err) {
    console.error('Error submitting application:', err);
    return NextResponse.json(
      { error: 'Failed to submit application. Please contact secretariat.' },
      { status: 500 }
    );
  }
}

// GET: Admin retrieves all pending and processed applications
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const result = await getApplications();
    return NextResponse.json({
      success: true,
      applications: result.applications,
      source: result.source,
    });
  } catch (err) {
    console.error('Error fetching applications:', err);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// PATCH: Admin approves or updates application
export async function PATCH(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, action, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    if (action === 'approve') {
      const approveRes = await approveApplication(id);
      if (!approveRes.success) {
        return NextResponse.json({ error: approveRes.error || 'Approval failed' }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: `Applicant approved as Life Member with ID ${approveRes.membershipId}`,
        member: approveRes.member,
      });
    }

    if (status) {
      const updateRes = await updateApplication(id, { status });
      return NextResponse.json({ success: true, application: updateRes.application });
    }

    return NextResponse.json({ error: 'Invalid action or status' }, { status: 400 });
  } catch (err) {
    console.error('Error processing application update:', err);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}
