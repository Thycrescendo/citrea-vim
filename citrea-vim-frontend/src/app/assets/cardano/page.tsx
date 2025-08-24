"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CardanoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = '#5eead4';
        ctx.lineWidth = 2;

        const data = [0.45, 0.46, 0.47, 0.46, 0.48];
        const width = canvas.width;
        const height = canvas.height;
        const step = width / (data.length - 1);
        const maxValue = 0.48;

        ctx.moveTo(0, height - (data[0] / maxValue) * height);
        for (let i = 1; i < data.length; i++) {
          ctx.lineTo(i * step, height - (data[i] / maxValue) * height);
        }
        ctx.stroke();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-teal-300 mb-6 animate-bounce">Cardano Trading Chart</h1>
      <canvas ref={canvasRef} width={600} height={300} className="border border-teal-700 rounded-lg mb-6"></canvas>
      <p className="text-teal-300 mb-4">Cardano reached $0.48 on August 23, 2025, marking a 4% increase this week, driven by progress in its smart contract ecosystem. Trading activity peaked on Thursday with a 10% volume surge, reflecting optimism around new dApp launches. The trend suggests sustained growth into the next quarter.</p>
      <Link href="/" className="inline-block bg-teal-500 text-gray-900 py-2 px-4 rounded-lg hover:bg-teal-600">
        Back to Dashboard
      </Link>
    </div>
  );
}