"use client";

import Navbar from "@/components/Navbar";
import Tabs from "@/components/AnalyzerTools";
import Particles from "@/components/Particles";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-r from-blue-50 via-gray-50 to-blue-100">

      <Image src="/images/back.png" alt="Logo" fill />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <Particles className="z-0"
          particleColors={['black', '#ffffff']}
          particleCount={400}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={true}
        />
        <Tabs />
      </div>
    </main>
  );
}
