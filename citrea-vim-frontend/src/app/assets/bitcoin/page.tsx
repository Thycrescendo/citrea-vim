"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BitcoinPage() {
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

        const data = [62000, 62500, 63000, 62800, 63500];
        const width = canvas.width;
        const height = canvas.height;
        const step = width / (data.length - 1);
        const maxValue = 63500; // Max price for scaling

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
      <h1 className="text-3xl font-bold text-teal-300 mb-6 animate-bounce">Bitcoin Trading Chart</h1>
      <canvas ref={canvasRef} width={600} height={300} className="border border-teal-700 rounded-lg mb-6"></canvas>
      <p className="text-teal-300 mb-4">Bitcoin has seen a robust performance in the past week, with trading volume surging by 15% as institutional investors continue to enter the market. On August 23, 2025, the price peaked at $63,500 during a midday rally, driven by positive sentiment around upcoming regulatory clarity in the U.S. Analysts predict a potential break above $64,000 if the momentum holds through the weekend.</p>
      <Link href="/" className="inline-block bg-teal-500 text-gray-900 py-2 px-4 rounded-lg hover:bg-teal-600">
        Back to Dashboard
      </Link>
    </div>
  );
}