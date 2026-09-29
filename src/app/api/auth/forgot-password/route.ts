import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau Username akun admin wajib diisi.",
        },
        { status: 422 }
      );
    }

    // In demo mode: simulate generating OTP code
    // Standard mock OTP is '123456'
    return NextResponse.json({
      success: true,
      otp: "123456",
      message: `Kode verifikasi OTP 6-digit telah dikirimkan ke ${email}. Gunakan kode demo: 123456.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memproses permintaan pemulihan.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
