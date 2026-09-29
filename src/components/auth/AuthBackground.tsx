import React from "react";

// Pre-defined static particles with random distribution, sizes, opacities, and animation timings
const PARTICLES = [
  { id: 1, left: "12%", top: "68%", size: 6, opacity: 0.35, duration: "14s", delay: "-2s", color: "#6E97F2" },
  { id: 2, left: "24%", top: "82%", size: 8, opacity: 0.25, duration: "18s", delay: "-7s", color: "#0F62FE" },
  { id: 3, left: "38%", top: "74%", size: 5, opacity: 0.3, duration: "12s", delay: "-11s", color: "#A9C1F8" },
  { id: 4, left: "52%", top: "88%", size: 10, opacity: 0.2, duration: "19s", delay: "-4s", color: "#6E97F2" },
  { id: 5, left: "67%", top: "70%", size: 7, opacity: 0.35, duration: "15s", delay: "-9s", color: "#0F62FE" },
  { id: 6, left: "78%", top: "85%", size: 4, opacity: 0.4, duration: "11s", delay: "-13s", color: "#6E97F2" },
  { id: 7, left: "89%", top: "65%", size: 9, opacity: 0.25, duration: "17s", delay: "-5s", color: "#A9C1F8" },
  { id: 8, left: "18%", top: "45%", size: 5, opacity: 0.3, duration: "16s", delay: "-8s", color: "#0F62FE" },
  { id: 9, left: "82%", top: "40%", size: 7, opacity: 0.25, duration: "13s", delay: "-3s", color: "#6E97F2" },
  { id: 10, left: "45%", top: "55%", size: 6, opacity: 0.2, duration: "20s", delay: "-12s", color: "#A9C1F8" },
];

export const AuthBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FDFDFD]"
    >
      {/* ================= LAYER 1: AURORA BLOBS (BERGERAK PELAN) ================= */}
      {/* Blob A: Biru pekat (#6E97F2, opacity ~50%) di kanan atas, sebagian keluar layar */}
      <div
        className="absolute -top-[18%] -right-[12%] w-[58vmax] h-[58vmax] rounded-full bg-[#6E97F2] opacity-50 blur-2xl sm:blur-3xl animate-aurora-a"
        style={{ willChange: "transform" }}
      />

      {/* Blob B: Biru muda (#DCE6FD, opacity ~70%) di kiri atas */}
      <div
        className="absolute -top-[16%] -left-[14%] w-[60vmax] h-[60vmax] rounded-full bg-[#DCE6FD] opacity-70 blur-2xl sm:blur-3xl animate-aurora-b"
        style={{ willChange: "transform" }}
      />

      {/* Blob C: Biru sedang (#A9C1F8, opacity ~35%) di kiri bawah, ukuran lebih kecil */}
      <div
        className="absolute -bottom-[12%] -left-[8%] w-[42vmax] h-[42vmax] rounded-full bg-[#A9C1F8] opacity-35 blur-2xl sm:blur-3xl animate-aurora-c"
        style={{ willChange: "transform" }}
      />

      {/* ================= LAYER 2: DOT GRID (MEMUDAR KE TEPI) ================= */}
      {/* Pola titik 1px, jarak 24px, warna #94A3B8 opacity ~25%, mask radial ellipse */}
      <div
        className="absolute inset-0 opacity-25 animate-dot-grid"
        style={{
          backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* ================= LAYER 3: PARTIKEL KECIL MELAYANG ================= */}
      {/* 8-12 lingkaran kecil (4-12px) warna biru dengan opacity 20-40%, naik pelan */}
      <div className="absolute inset-0">
        {PARTICLES.map((particle, index) => (
          <div
            key={particle.id}
            className={`absolute rounded-full pointer-events-none ${
              index > 6 ? "hidden sm:block" : "block"
            }`}
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animation: `floatParticleY ${particle.duration} ease-in-out infinite`,
              animationDelay: particle.delay,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* Subtle smooth overlay for optimum contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFDFD]/20 to-[#FDFDFD]/60 pointer-events-none" />
    </div>
  );
};
