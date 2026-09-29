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

    // Mock handler response: Ready for connection to Laravel Mailer / Password Reset Token
    return NextResponse.json({
      success: true,
      message: `Kode pemulihan akses telah dikirimkan ke ${email}. Silakan periksa kotak masuk atau spam email Anda.`,
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
