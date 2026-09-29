import { NextRequest, NextResponse } from "next/server";

const LARAVEL_API_URL =
  process.env.NEXT_PUBLIC_LARAVEL_API_URL || "http://127.0.0.1:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email / Username dan kata sandi wajib diisi.",
        },
        { status: 422 }
      );
    }

    // Try connecting to the Laravel REST API backend (endpoint for admin login)
    try {
      const laravelResponse = await fetch(
        `${LARAVEL_API_URL}/api/v1/admin/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            device_name: "talenta_bkk_web",
          }),
          // short timeout so mock fallback responds promptly if backend is offline
          signal: AbortSignal.timeout(3000),
        }
      );

      if (laravelResponse.ok) {
        const laravelData = await laravelResponse.json();
        return NextResponse.json({
          success: true,
          message: "Berhasil masuk ke Dashboard BKK OS.",
          token: laravelData.token,
          user: laravelData.user,
        });
      }

      // If Laravel returned an error (e.g., 401 or 422)
      if (
        laravelResponse.status === 401 ||
        laravelResponse.status === 422 ||
        laravelResponse.status === 403
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "ups email atau kata sandi salah, silahkan coba lagi",
          },
          { status: 401 }
        );
      }
    } catch {
      // Laravel backend is currently not running or unreachable
      // Fallback gracefully so frontend is fully testable out-of-the-box
      console.info(
        "Backend Laravel (127.0.0.1:8000) belum berjalan. Menjalankan fallback handler demo BKK OS."
      );
    }

    // Mock handler fallback for local development & demonstration
    // Valid mock credentials: email 'admin@gmail.com' and password 'admin123'
    if (email === "admin@gmail.com" && password === "admin123") {
      return NextResponse.json({
        success: true,
        message: "Login berhasil! Selamat datang di Dashboard BKK OS.",
        token: "talenta_bkk_token_mock_auth_2026",
        user: {
          id: 1,
          name: "Koordinator BKK Sekolah",
          email: "admin@gmail.com",
          role: "admin",
          is_profile_complete: true,
        },
      });
    }

    // Invalid credentials response matching user's exact specification
    return NextResponse.json(
      {
        success: false,
        message: "ups email atau kata sandi salah, silahkan coba lagi",
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal server.",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
