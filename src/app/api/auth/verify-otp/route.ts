import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email dan kode OTP wajib diisi.",
        },
        { status: 422 }
      );
    }

    // Demo OTP validation: accepts '123456'
    if (otp === "123456") {
      return NextResponse.json({
        success: true,
        message: "Kode OTP berhasil diverifikasi. Silakan atur kata sandi baru Anda.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Kode OTP tidak valid atau salah. Gunakan kode demo: 123456.",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memverifikasi kode OTP.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
