import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp, password, password_confirmation } = body;

    if (!email || !otp || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Data reset kata sandi tidak lengkap.",
        },
        { status: 422 }
      );
    }

    if (password !== password_confirmation) {
      return NextResponse.json(
        {
          success: false,
          message: "Konfirmasi kata sandi tidak cocok.",
        },
        { status: 422 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Kata sandi minimal harus 6 karakter.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Kata sandi Anda berhasil diperbarui! Silakan masuk kembali menggunakan kata sandi baru Anda.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat mengatur ulang kata sandi.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
