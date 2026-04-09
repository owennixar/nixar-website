"use client";

import dynamic from "next/dynamic";

const AnimatedOrbs = dynamic(() => import("@/components/ui/AnimatedOrbs"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), { ssr: false });

export default function BackgroundEffects() {
  return (
    <>
      <AnimatedOrbs />
      <ParticleField />
    </>
  );
}
