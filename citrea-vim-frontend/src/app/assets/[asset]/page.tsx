"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

// Interface for the asset parameter
interface AssetPageProps {
  params: {
    asset: string;
  };
}

export default function AssetPage({ params }: AssetPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Historical price data for each asset (in USD, based on plausible 2025 trends)
  const assetData = {
    bitcoin: [62000, 62500, 63000, 62800, 63500], // Recent upward trend
    ethereum: [2700, 2720, 2750, 2730, 2780],    // Steady growth
    xrp: [0.65, 0.66, 0.67, 0.66, 0.68],          // Minor fluctuations
    litecoin: [85, 86, 87, 86.5, 88],             // Gradual increase
    cardano: [0.45, 0.46, 0.47, 0.46, 0.48],      // Consistent rise
  };

  // Write-ups for each asset
  const assetWriteups = {
    bitcoin: `Bitcoin has seen a robust performance in the past week, with trading volume surging by 15% as institutional investors continue to enter the market. On August 23, 2025, the price peaked at $63,500 during a midday rally, driven by positive sentiment around upcoming regulatory clarity in the U.S. Analysts predict a potential break above $64,000 if the momentum holds through the weekend.`,
    ethereum: `Ethereum's price has climbed steadily, reaching $2,780 on August 23, 2025, fueled by increased adoption of its Layer 2 solutions. Trading activity spiked by 12% yesterday, with significant buys from decentralized finance (DeFi) protocols. The network's recent upgrade has bolstered confidence, with experts eyeing a possible $2,900 target by early September.`,
    xrp: `XRP experienced moderate trading activity this week, closing at $0.68 on August 23, 2025, after a 2% gain. The asset saw a brief dip to $0.65 mid-week due to profit-taking, but a recovery followed with a 5% increase in volume on Friday, hinting at renewed interest from cross-border payment platforms.`,
    litecoin: `Litecoin has shown resilience, rising to $88 on August 23, 2025, with a 3% uptick over the past 48 hours. Trading volume rose by 8% as miners adjusted strategies post-halving effects. The asset's stability has attracted smaller investors, with analysts noting a potential consolidation phase ahead.`,
    cardano: `Cardano reached $0.48 on August 23, 2025, marking a 4% increase this week, driven by progress in its smart contract ecosystem. Trading activity peaked on Thursday with a 10% volume surge, reflecting optimism around new dApp launches. The trend suggests sustained growth into the next quarter.`,
  };

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = '#5eead4'; // Teal line to match theme
        ctx.lineWidth = 2;

        const data = assetData[params.asset.toLowerCase()] || [0, 0, 0, 0, 0];
        const width = canvas.width;
        const height = canvas.height;
        const step = width / (data.length - 1);
        const maxValue = Math.max(...Object.values(assetData).flat()); // Dynamic max for scaling

        ctx.moveTo(0, height - (data[0] / maxValue) * height);
        for (let i = 1; i < data.length; i++) {
          ctx.lineTo(i * step, height - (data[i] / maxValue) * height);
        }
        ctx.stroke();
      }
    }
  }, [params.asset]);

  // Capitalize asset name for display
  const displayAsset = params.asset.charAt(0).toUpperCase() + params.asset.slice(1).toLowerCase();
  const writeup = assetWriteups[params.asset.toLowerCase()] || 'No recent trading data available.';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-teal-300 mb-6 animate-bounce">{displayAsset} Trading Chart</h1>
      <canvas ref={canvasRef} width={600} height={300} className="border border-teal-700 rounded-lg mb-6"></canvas>
      <p className="text-teal-300 mb-4">{writeup}</p>
      <Link href="/" className="inline-block bg-teal-500 text-gray-900 py-2 px-4 rounded-lg hover:bg-teal-600">
        Back to Dashboard
      </Link>
    </div>
  );
}