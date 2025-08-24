"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function LitecoinPage() {
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

        const data = [85, 86, 87, 86.5, 88];
        const width = canvas.width;
        const height = canvas.height;
        const step = width / (data.length - 1);
        const maxValue = 88;

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
      <h1 className="text-3xl font-bold text-teal-300 mb-6 animate-bounce">Litecoin Trading Chart</h1>
      <canvas ref={canvasRef} width={600} height={300} className="border border-teal-700 rounded-lg mb-6"></canvas>
      <p className="text-teal-300 mb-4">Litecoin has shown resilience, rising to $88 on August 23, 2025, with a 3% uptick over the past 48 hours. Trading volume rose by 8% as miners adjusted strategies post-halving effects. The asset's stability has attracted smaller investors, with analysts noting a potential consolidation phase ahead.</p>
      <Link href="/" className="inline-block bg-teal-500 text-gray-900 py-2 px-4 rounded-lg hover:bg-teal-600">
        Back to Dashboard
      </Link>
    </div>
  );
}