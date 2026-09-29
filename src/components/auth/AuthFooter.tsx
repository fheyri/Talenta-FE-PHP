import React from "react";
import Link from "next/link";

export const AuthFooter: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-auto z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between text-[#6B7280] text-xs sm:text-[13px] font-medium gap-3 md:gap-4 text-center md:text-left transition-colors duration-200">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F62FE]/70"></span>
          <span>Portal Khusus Pengelola BKK Sekolah</span>
        </div>

        {/* Center Section */}
        <div className="tracking-tight">
          © 2026 TALENTA BKK OS. Seluruh hak cipta dilindungi.
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center gap-1.5">
          <Link
            href="#"
            className="hover:text-slate-900 transition-colors duration-150"
          >
            Privasi
          </Link>
          <span className="text-slate-400">•</span>
          <Link
            href="#"
            className="hover:text-slate-900 transition-colors duration-150"
          >
            Ketentuan
          </Link>
        </div>
      </div>
    </footer>
  );
};
