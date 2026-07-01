import React, { useState } from 'react';
import { Channel, BenchmarkMetrics } from '../types';
import { ShieldCheck, Target, Trash2, Zap, HelpCircle } from 'lucide-react';

interface PortfolioReportProps {
  benchmarks: BenchmarkMetrics[];
  customAllocations: Record<Channel, number>;
}

export default function PortfolioReport({ benchmarks, customAllocations }: PortfolioReportProps) {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // Calculate percentage share of allocation
  const totalAllocated = Object.values(customAllocations).reduce((sum, v) => sum + v, 0);

  // Formatting helpers
  const formatPercent = (val: number) => {
    return `${(val * 100).toFixed(1)}%`;
  };

  const getPillStyles = (classification: BenchmarkMetrics['classification']) => {
    switch (classification) {
      case 'Star':
        return 'bg-[#2251FF]/8 text-[#2251FF] border border-[#2251FF]/20';
      case 'Gamble':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Cash Cow':
        return 'bg-slate-100 text-[#051C2C] border border-slate-200';
      case 'Exit':
        return 'bg-[#D32F2F]/8 text-[#D32F2F] border border-[#D32F2F]/20';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getCategoryIcon = (classification: BenchmarkMetrics['classification']) => {
    switch (classification) {
      case 'Star':
        return <Zap size={14} className="shrink-0" />;
      case 'Gamble':
        return <HelpCircle size={14} className="shrink-0" />;
      case 'Cash Cow':
        return <Target size={14} className="shrink-0" />;
      case 'Exit':
        return <Trash2 size={14} className="shrink-0" />;
      default:
        return null;
    }
  };

  // Coordinates for the Risk-Return Frontier SVG Scatter Chart
  // Volatility maps to X (range roughly 0.0 to 0.7) -> SVG space 60 to 440
  // Mean ROAS maps to Y (range roughly 0.0 to 6.0) -> SVG space 280 to 40
  const getXCoord = (vol: number) => {
    const minVol = 0;
    const maxVol = 0.7;
    const padding = 60;
    const width = 380; // 440 - 60
    return padding + ((vol - minVol) / (maxVol - minVol)) * width;
  };

  const getYCoord = (roas: number) => {
    const minRoas = 1.0;
    const maxRoas = 6.0;
    const paddingBottom = 280;
    const height = 240; // 280 - 40
    return paddingBottom - ((roas - minRoas) / (maxRoas - minRoas)) * height;
  };

  const getBubbleRadius = (channel: Channel) => {
    const alloc = customAllocations[channel] || 0;
    if (totalAllocated <= 0) return 10;
    // Base radius 8px, scaling up to 28px depending on budget size
    return 8 + (alloc / totalAllocated) * 20;
  };

  return (
    <div className="space-y-8 animate-fade-up">

      {/* Asset Classification Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Risk-Return Frontier interactive SVG Chart (Left column, 6/12) */}
        <div className="lg:col-span-5 bg-white rounded-[14px] card-shadow p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-2">
              Markowitz Efficiency Frontier
            </h3>
            <p className="text-[12px] text-[#888888] mb-4">
              Interactive portfolio frontier. Volatility represents channel risk; Return matches historical ROAS. Bubble size corresponds to current budget share.
            </p>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[4/3] bg-[#F5F5F2]/40 rounded-[10px] p-3 border border-[#E8E8E6]/60">
            <svg viewBox="0 0 500 320" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="60" y1="280" x2="460" y2="280" stroke="#E8E8E6" strokeWidth="1.5" />
              <line x1="60" y1="40" x2="60" y2="280" stroke="#E8E8E6" strokeWidth="1.5" />
              
              {/* Horizontal Reference Lines (Y axis milestones) */}
              {[2.0, 3.0, 4.0, 5.0].map(val => (
                <g key={val}>
                  <line 
                    x1="60" 
                    y1={getYCoord(val)} 
                    x2="460" 
                    y2={getYCoord(val)} 
                    stroke="#E8E8E6" 
                    strokeWidth="1" 
                    strokeDasharray="4,4" 
                  />
                  <text 
                    x="50" 
                    y={getYCoord(val) + 4} 
                    className="text-[10px] font-mono text-[#888888] text-right" 
                    textAnchor="end"
                  >
                    {val.toFixed(1)}
                  </text>
                </g>
              ))}

              {/* Threshold Lines for Matrix Quadrant Splitting */}
              {/* Volatility Threshold at X = 0.20 */}
              <line 
                x1={getXCoord(0.20)} 
                y1="40" 
                x2={getXCoord(0.20)} 
                y2="280" 
                stroke="#D32F2F" 
                strokeWidth="1.2" 
                strokeDasharray="3,3" 
                opacity="0.6"
              />
              {/* ROAS Threshold at Y = 3.0 */}
              <line 
                x1="60" 
                y1={getYCoord(3.0)} 
                x2="460" 
                y2={getYCoord(3.0)} 
                stroke="#D32F2F" 
                strokeWidth="1.2" 
                strokeDasharray="3,3" 
                opacity="0.6"
              />

              {/* Quadrant Labels */}
              <text x="70" y="55" className="text-[10px] font-garamond font-bold text-[#00C853] opacity-80">STAR</text>
              <text x="450" y="55" className="text-[10px] font-garamond font-bold text-amber-700 opacity-80" textAnchor="end">GAMBLE</text>
              <text x="70" y="270" className="text-[10px] font-garamond font-bold text-[#051C2C] opacity-70">CASH COW</text>
              <text x="450" y="270" className="text-[10px] font-garamond font-bold text-red-600 opacity-80" textAnchor="end">EXIT</text>

              {/* X axis milestones */}
              {[0.10, 0.20, 0.30, 0.40, 0.50, 0.60].map(val => (
                <g key={val}>
                  <line 
                    x1={getXCoord(val)} 
                    y1="280" 
                    x2={getXCoord(val)} 
                    y2="285" 
                    stroke="#E8E8E6" 
                    strokeWidth="1.5" 
                  />
                  <text 
                    x={getXCoord(val)} 
                    y="298" 
                    className="text-[10px] font-mono text-[#888888]" 
                    textAnchor="middle"
                  >
                    {val.toFixed(2)}
                  </text>
                </g>
              ))}

              {/* Axis Titles */}
              <text x="260" y="315" className="text-[11px] font-semibold text-[#051C2C] tracking-wide" textAnchor="middle">
                Monthly Volatility (Risk Standard Deviation σ)
              </text>
              <text x="18" y="160" className="text-[11px] font-semibold text-[#051C2C] tracking-wide" textAnchor="middle" transform="rotate(-90 18 160)">
                Expected ROAS (Mean Outcome)
              </text>

              {/* Plot Bubbles */}
              {benchmarks.map(b => {
                const cx = getXCoord(b.volatility);
                const cy = getYCoord(b.roas);
                const r = getBubbleRadius(b.channel);
                const isSelected = selectedChannel === b.channel;
                const share = totalAllocated > 0 ? (customAllocations[b.channel] || 0) / totalAllocated : 0;

                // Color mappings
                const bubbleColor = b.classification.includes('Star') 
                  ? '#2251FF' 
                  : b.classification.includes('Gamble') 
                  ? '#D97706' 
                  : b.classification.includes('Cash Cow') 
                  ? '#051C2C' 
                  : '#D32F2F';

                return (
                  <g 
                    key={b.channel} 
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedChannel(isSelected ? null : b.channel)}
                  >
                    {/* Pulsing selection highlight */}
                    {isSelected && (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={r + 8} 
                        fill="none" 
                        stroke={bubbleColor} 
                        strokeWidth="1.5" 
                        strokeDasharray="4,2"
                        className="animate-spin"
                        style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: '6s' }}
                      />
                    )}
                    {/* Bubble Fill */}
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={r} 
                      fill={bubbleColor} 
                      fillOpacity={isSelected ? 0.85 : 0.4} 
                      stroke={bubbleColor} 
                      strokeWidth={isSelected ? 3 : 1.5} 
                      className="transition-all duration-300 hover:scale-[1.05]"
                    />
                    {/* Short Label */}
                    <text 
                      x={cx} 
                      y={cy - r - 4} 
                      className="text-[9px] font-sans font-bold fill-[#051C2C] select-none" 
                      textAnchor="middle"
                    >
                      {b.channel.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Assets classification detail table (Right column, 7/12) */}
        <div className="lg:col-span-7 bg-white rounded-[14px] card-shadow overflow-hidden flex flex-col justify-between">
          <div className="p-6 border-b border-[#E8E8E6] bg-[rgba(5,28,44,0.01)]">
            <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">Channel Portfolio Allocator Classifier</h3>
            <p className="text-[12px] text-[#888888] mt-1">
              Historical performance benchmarks vs risk categorizations. Select rows to inspect details.
            </p>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[rgba(5,28,44,0.08)]">
                  <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C]">Channel</th>
                  <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Mean ROAS</th>
                  <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Volatility (σ)</th>
                  <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Budget Share</th>
                  <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C]">Asset Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
                {benchmarks.map(b => {
                  const isSelected = selectedChannel === b.channel;
                  const share = totalAllocated > 0 ? (customAllocations[b.channel] || 0) / totalAllocated : 0;

                  return (
                    <tr 
                      key={b.channel} 
                      onClick={() => setSelectedChannel(isSelected ? null : b.channel)}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isSelected ? 'bg-[#2251FF]/5' : 'hover:bg-[#F5F5F2]/50'
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-[#051C2C]">{b.channel}</td>
                      <td className="py-3 px-3 text-right font-semibold text-[#051C2C] font-mono">{b.roas.toFixed(2)}x</td>
                      <td className="py-3 px-3 text-right text-[#888888] font-mono">{b.volatility.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-mono text-[#051C2C]">
                        {share > 0 ? formatPercent(share) : '—'}
                      </td>
                      <td className="py-3 px-4">
                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide capitalize ${getPillStyles(b.classification)}`}>
                          {getCategoryIcon(b.classification)}
                          <span>{b.classification.split(' ')[0]}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Selected Channel Focus Detail Card & Tactical Action Cards Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles border-b border-[#E8E8E6] pb-2">
          {selectedChannel ? `Portfolio Detail Focus: ${selectedChannel}` : 'Tactical Allocation Recommendations'}
        </h3>

        {selectedChannel ? (
          // Highlighted detail box when channel is selected
          (() => {
            const b = benchmarks.find(item => item.channel === selectedChannel)!;
            const alloc = customAllocations[selectedChannel] || 0;
            const share = totalAllocated > 0 ? (alloc / totalAllocated) * 100 : 0;

            return (
              <div className="bg-white rounded-[14px] card-shadow p-6 border-l-4 border-[#2251FF] animate-fade-up">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-2xl font-garamond font-bold text-[#051C2C] tracking-tight">{b.channel}</h4>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mt-2 ${getPillStyles(b.classification)}`}>
                      {getCategoryIcon(b.classification)}
                      <span>Asset Class: {b.classification}</span>
                    </span>
                  </div>
                  <div className="flex gap-6 text-right">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888] block">Configured Budget</span>
                      <span className="text-xl font-garamond font-bold text-[#2251FF]">${alloc.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888] block">Portfolio Weight</span>
                      <span className="text-xl font-garamond font-bold text-[#051C2C]">{share.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E8E8E6] text-[12px] text-[#1A1A2E]">
                  <div>
                    <strong>Historical Cost per Lead (CPL):</strong>
                    <div className="text-lg font-garamond font-bold text-[#051C2C] mt-1">
                      ${b.totalLeads > 0 ? (b.totalSpend / b.totalLeads).toFixed(2) : '0.00'}
                    </div>
                  </div>
                  <div>
                    <strong>Avg Sales Conversion:</strong>
                    <div className="text-lg font-garamond font-bold text-[#051C2C] mt-1">
                      {b.totalLeads > 0 ? ((b.totalBookedJobs / b.totalLeads) * 100).toFixed(1) : '0.0'}%
                    </div>
                  </div>
                  <div>
                    <strong>Total Revenue Contribution:</strong>
                    <div className="text-lg font-garamond font-bold text-[#2251FF] mt-1">
                      ${b.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-[rgba(34,81,255,0.02)] rounded-[10px] border border-[#2251FF]/10 text-[12px]">
                  <strong>Recommended Tactical Playbook:</strong> {b.tacticalRecommendation}
                </div>
              </div>
            );
          })()
        ) : (
          // Default grid showing brief playbooks for all channels
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benchmarks.map(b => (
              <div 
                key={b.channel}
                onClick={() => setSelectedChannel(b.channel)}
                className="bg-white rounded-[14px] card-shadow p-5 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-garamond font-bold text-[#051C2C]">{b.channel}</span>
                    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${getPillStyles(b.classification)}`}>
                      {getCategoryIcon(b.classification)}
                      <span>{b.classification.split(' ')[0]}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#888888] line-clamp-3 leading-relaxed">
                    {b.tacticalRecommendation}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8E8E6] flex justify-between text-[11px] font-mono text-[#888888]">
                  <span>Mean ROAS: <strong className="text-[#051C2C]">{b.roas.toFixed(2)}x</strong></span>
                  <span>Volatility: <strong className="text-[#051C2C]">{b.volatility.toFixed(2)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
