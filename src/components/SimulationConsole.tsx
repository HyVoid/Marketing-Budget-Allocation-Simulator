import React from 'react';
import { GlobalSettings, SimulationResult } from '../types';
import { ShieldCheck, HelpCircle, Activity, Award, ArrowUpRight, Percent } from 'lucide-react';

interface SimulationConsoleProps {
  settings: GlobalSettings;
  simulation: SimulationResult;
}

export default function SimulationConsole({ settings, simulation }: SimulationConsoleProps) {
  const { meanRevenue, stdDevRevenue, probabilityOfTarget, probabilityOfDownside, runs } = simulation;

  // Sorting outcomes to find exact percentiles
  const sortedRuns = [...runs].sort((a, b) => a - b);
  const p10 = sortedRuns[Math.floor(sortedRuns.length * 0.1)] || 0;
  const p25 = sortedRuns[Math.floor(sortedRuns.length * 0.25)] || 0;
  const p50 = sortedRuns[Math.floor(sortedRuns.length * 0.5)] || 0;
  const p75 = sortedRuns[Math.floor(sortedRuns.length * 0.75)] || 0;
  const p90 = sortedRuns[Math.floor(sortedRuns.length * 0.9)] || 0;

  // Formatting utilities
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  // Build Histogram Bins (20 Bins)
  const binCount = 20;
  const minVal = sortedRuns[0] || 0;
  const maxVal = sortedRuns[sortedRuns.length - 1] || 150000;
  const binWidth = (maxVal - minVal) / binCount;

  const bins = Array.from({ length: binCount }, (_, idx) => {
    const start = minVal + idx * binWidth;
    const end = start + binWidth;
    const count = runs.filter(v => v >= start && v < end).length;
    return { start, end, count };
  });

  const maxBinCount = Math.max(...bins.map(b => b.count), 1);

  // Plot variables
  const getXOfValue = (val: number) => {
    const padding = 50;
    const width = 400; // 450 - 50
    return padding + ((val - minVal) / (maxVal - minVal)) * width;
  };

  return (
    <div className="space-y-8 animate-fade-up">

      {/* MC High Level Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Average Expected Outcome */}
        <div className="bg-white rounded-[14px] card-shadow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Simulated Average (μ)</span>
              <div className="p-2 bg-[#2251FF]/5 text-[#2251FF] rounded-[8px]">
                <Activity size={15} />
              </div>
            </div>
            <div className="text-2xl font-garamond font-bold text-[#051C2C] tracking-tight">
              {formatCurrency(meanRevenue)}
            </div>
          </div>
          <p className="text-[11px] text-[#888888] mt-2">Average result over {runs.length} randomized market trials.</p>
        </div>

        {/* Portfolio Volatility standard deviation */}
        <div className="bg-white rounded-[14px] card-shadow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Outcome Dispersion (σ)</span>
              <div className="p-2 bg-[#051C2C]/5 text-[#051C2C] rounded-[8px]">
                <Percent size={15} />
              </div>
            </div>
            <div className="text-2xl font-garamond font-bold text-[#051C2C] tracking-tight">
              {formatCurrency(stdDevRevenue)}
            </div>
          </div>
          <p className="text-[11px] text-[#888888] mt-2">Standard deviation. Measures the absolute swing risk.</p>
        </div>

        {/* Success Goal Prob */}
        <div className="bg-white rounded-[14px] card-shadow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Probability to Meet Goal</span>
              <div className="p-2 bg-[#2251FF]/5 text-[#2251FF] rounded-[8px]">
                <ArrowUpRight size={15} />
              </div>
            </div>
            <div className="text-2xl font-garamond font-bold text-[#2251FF] tracking-tight">
              {(probabilityOfTarget * 100).toFixed(1)}%
            </div>
          </div>
          <p className="text-[11px] text-[#888888] mt-2">Chance of hitting target of <strong className="text-[#051C2C]">{formatCurrency(settings.targetRevenueGoal)}</strong>.</p>
        </div>

        {/* Downside Safety Rate */}
        <div className="bg-white rounded-[14px] card-shadow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Downside Safety Ratio</span>
              <div className="p-2 bg-[#00C853]/10 text-[#00C853] rounded-[8px]">
                <ShieldCheck size={15} />
              </div>
            </div>
            <div className="text-2xl font-garamond font-bold text-[#00C853] tracking-tight">
              {((1 - probabilityOfDownside) * 100).toFixed(1)}%
            </div>
          </div>
          <p className="text-[11px] text-[#888888] mt-2">Chance of staying above threat cap of <strong className="text-[#051C2C]">{formatCurrency(settings.downsideRevenueThreshold)}</strong>.</p>
        </div>

      </div>

      {/* Main Grid: Left Histogram, Right Percentiles list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SVG Histogram simulated bell curve (Left panel 7/12) */}
        <div className="lg:col-span-7 bg-white rounded-[14px] card-shadow p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-1">
              Monte Carlo Outcome Distribution
            </h3>
            <p className="text-[12px] text-[#888888] mb-4">
              Revenue distribution histogram. Vertical lines delineate downside threshold (Red) and target revenue goal (Blue).
            </p>
          </div>

          <div className="relative w-full aspect-[16/9] bg-[#F5F5F2]/40 rounded-[10px] p-4 border border-[#E8E8E6]/60">
            <svg viewBox="0 0 500 240" className="w-full h-full">
              {/* Plot grid base */}
              <line x1="50" y1="200" x2="450" y2="200" stroke="#E8E8E6" strokeWidth="1.5" />
              <line x1="50" y1="30" x2="50" y2="200" stroke="#E8E8E6" strokeWidth="1.5" />

              {/* Bins Rendering */}
              {bins.map((b, idx) => {
                const x = 50 + idx * 20; // 20px width per bar in 400px width limit
                const barHeight = (b.count / maxBinCount) * 140;
                const y = 200 - barHeight;

                const midValue = (b.start + b.end) / 2;
                const isDownside = midValue < settings.downsideRevenueThreshold;
                const isSuccess = midValue >= settings.targetRevenueGoal;

                // Color code the simulated distribution segments
                let barColor = 'rgba(5, 28, 44, 0.25)'; // standard gray
                if (isDownside) barColor = 'rgba(211, 47, 47, 0.35)'; // red downside
                if (isSuccess) barColor = 'rgba(34, 81, 255, 0.45)'; // blue target

                return (
                  <g key={idx}>
                    <rect 
                      x={x + 1} 
                      y={y} 
                      width="18" 
                      height={barHeight} 
                      fill={barColor}
                      className="transition-all duration-200 hover:fill-opacity-100"
                    />
                    <title>{`Range: ${formatCurrency(b.start)} - ${formatCurrency(b.end)}\nFrequency: ${b.count} trials`}</title>
                  </g>
                );
              })}

              {/* Downside Threshold Indicator vertical line */}
              <line 
                x1={getXOfValue(settings.downsideRevenueThreshold)} 
                y1="30" 
                x2={getXOfValue(settings.downsideRevenueThreshold)} 
                y2="200" 
                stroke="#D32F2F" 
                strokeWidth="1.5" 
                strokeDasharray="4,3" 
              />
              <text 
                x={getXOfValue(settings.downsideRevenueThreshold) - 5} 
                y="45" 
                className="text-[9px] font-bold fill-[#D32F2F]" 
                textAnchor="end"
              >
                DOWNSIDE (${Math.round(settings.downsideRevenueThreshold / 1000)}k)
              </text>

              {/* Target Revenue Goal vertical line */}
              <line 
                x1={getXOfValue(settings.targetRevenueGoal)} 
                y1="30" 
                x2={getXOfValue(settings.targetRevenueGoal)} 
                y2="200" 
                stroke="#2251FF" 
                strokeWidth="1.5" 
                strokeDasharray="4,3" 
              />
              <text 
                x={getXOfValue(settings.targetRevenueGoal) + 5} 
                y="45" 
                className="text-[9px] font-bold fill-[#2251FF]" 
                textAnchor="start"
              >
                GOAL (${Math.round(settings.targetRevenueGoal / 1000)}k)
              </text>

              {/* Scale Tick Labels */}
              <text x="50" y="215" className="text-[10px] font-mono fill-[#888888]" textAnchor="middle">
                ${Math.round(minVal / 1000)}k
              </text>
              <text x="250" y="215" className="text-[10px] font-mono fill-[#888888]" textAnchor="middle">
                ${Math.round((minVal + maxVal) / 2000)}k
              </text>
              <text x="450" y="215" className="text-[10px] font-mono fill-[#888888]" textAnchor="middle">
                ${Math.round(maxVal / 1000)}k
              </text>

            </svg>
          </div>
        </div>

        {/* Quantile Percentile outcomes List (Right column 5/12) */}
        <div className="lg:col-span-5 bg-white rounded-[14px] card-shadow p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-1">
              Safety Outcome Percentiles
            </h3>
            <p className="text-[12px] text-[#888888] mb-4">
              Sorted market projection confidence markers based on statistical probability quantiles.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* P10 Downside */}
            <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-[10px] border border-red-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-red-700">P10 Critical Downside</span>
                <span className="text-[11px] text-[#888888] block">10% chance of falling below this</span>
              </div>
              <span className="text-base font-mono font-bold text-red-600">{formatCurrency(p10)}</span>
            </div>

            {/* P25 Conservative */}
            <div className="flex items-center justify-between p-3 bg-[#F5F5F2] rounded-[10px]">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#051C2C]">P25 Conservative Estimate</span>
                <span className="text-[11px] text-[#888888] block">25% chance of falling below this</span>
              </div>
              <span className="text-base font-mono font-bold text-[#051C2C]">{formatCurrency(p25)}</span>
            </div>

            {/* P50 Median */}
            <div className="flex items-center justify-between p-3 bg-white rounded-[10px] border border-[#E8E8E6]">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#2251FF] font-bold">P50 Median Expectation</span>
                <span className="text-[11px] text-[#888888] block">50% chance of exceeding/falling</span>
              </div>
              <span className="text-base font-mono font-bold text-[#2251FF]">{formatCurrency(p50)}</span>
            </div>

            {/* P75 Optimistic */}
            <div className="flex items-center justify-between p-3 bg-[#F5F5F2] rounded-[10px]">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#051C2C]">P75 Growth Expectation</span>
                <span className="text-[11px] text-[#888888] block">25% chance of exceeding this</span>
              </div>
              <span className="text-base font-mono font-bold text-[#051C2C]">{formatCurrency(p75)}</span>
            </div>

            {/* P90 Best Case */}
            <div className="flex items-center justify-between p-3 bg-[#00C853]/5 rounded-[10px] border border-[#00C853]/20">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#00C853] font-bold">P90 Outstanding Ceiling</span>
                <span className="text-[11px] text-[#888888] block">10% chance of exceeding this</span>
              </div>
              <span className="text-base font-mono font-bold text-[#00C853]">{formatCurrency(p90)}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
