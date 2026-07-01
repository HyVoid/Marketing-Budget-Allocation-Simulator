import React from 'react';
import { Channel, GlobalSettings, BenchmarkMetrics, MarginalCurveRow, ConstraintRow, SimulationResult } from '../types';
import { calculateExpectedMetrics, calculateHHI, solveOptimalBudget } from '../utils';
import { TrendingUp, AlertTriangle, Lightbulb, RefreshCw, BarChart2, ShieldCheck, Users, Briefcase } from 'lucide-react';

interface ExecutiveDashboardProps {
  settings: GlobalSettings;
  historicalDataLength: number;
  benchmarks: BenchmarkMetrics[];
  curves: MarginalCurveRow[];
  constraints: ConstraintRow[];
  customAllocations: Record<Channel, number>;
  onUpdateAllocations: (allocations: Record<Channel, number>) => void;
  onApplyOptimal: () => void;
  simulation: SimulationResult;
  currentMetrics: any;
  optimizedMetrics: any;
  customMetrics: any;
}

export default function ExecutiveDashboard({
  settings,
  historicalDataLength,
  benchmarks,
  curves,
  constraints,
  customAllocations,
  onUpdateAllocations,
  onApplyOptimal,
  simulation,
  currentMetrics,
  optimizedMetrics,
  customMetrics,
}: ExecutiveDashboardProps) {

  const totalCustomSpend = Object.values(customAllocations).reduce((sum, v) => sum + v, 0);
  const hhi = calculateHHI(customAllocations);

  const handleSliderChange = (channel: Channel, value: number) => {
    const updated = { ...customAllocations, [channel]: value };
    onUpdateAllocations(updated);
  };

  const handleInputChange = (channel: Channel, valueString: string) => {
    let value = parseFloat(valueString) || 0;
    const cons = constraints.find(c => c.channel === channel);
    const maxVal = cons ? cons.maxSpend : 150000;
    if (value > maxVal) value = maxVal;
    if (value < 0) value = 0;
    
    const updated = { ...customAllocations, [channel]: Math.round(value) };
    onUpdateAllocations(updated);
  };

  // Safe probability calculations
  const safetyRate = Math.round((1 - simulation.probabilityOfDownside) * 100);
  const targetReachProbability = Math.round(simulation.probabilityOfTarget * 100);

  // Formatting utils
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const formatPercent = (val: number) => {
    return `${(val * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-8 animate-fade-up" id="executive-summary-view">
      
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Budget Status */}
        <div className="bg-white p-5 rounded-[14px] card-shadow flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#888888] uppercase text-[10px] font-bold tracking-widest">Allocated Spend</span>
              <div className="p-1.5 bg-[#051C2C]/5 rounded-lg text-[#051C2C]">
                <Briefcase size={14} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-garamond text-3xl font-extrabold brand-text tracking-tight-titles">
                {formatCurrency(totalCustomSpend)}
              </span>
              {totalCustomSpend > settings.totalBudget && (
                <span className="text-red-500 text-xs font-bold font-sans">Over Limit</span>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[11px] text-[#888888] flex justify-between">
              <span>Target Limit: <strong>{formatCurrency(settings.totalBudget)}</strong></span>
              <span className="font-semibold">{((totalCustomSpend / settings.totalBudget) * 100).toFixed(0)}%</span>
            </div>
            <div className="bar-track mt-2">
              <div 
                className="bar-fill transition-all duration-500" 
                style={{ width: `${Math.min(100, (totalCustomSpend / settings.totalBudget) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Expected Revenue Outcome */}
        <div className="bg-white p-5 rounded-[14px] card-shadow flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#888888] uppercase text-[10px] font-bold tracking-widest">Projected Revenue</span>
              <div className="p-1.5 bg-[#2251FF]/5 rounded-lg text-[#2251FF]">
                <TrendingUp size={14} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-garamond text-3xl font-extrabold accent-text tracking-tight-titles">
                {formatCurrency(customMetrics.totalRevenue)}
              </span>
              <span className="text-[#00C853] text-xs font-bold">+{customMetrics.roas.toFixed(1)}x ROAS</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[11px] text-[#888888] flex justify-between">
              <span>Goal: <strong>{formatCurrency(settings.targetRevenueGoal)}</strong></span>
              <span className="font-semibold">{((customMetrics.totalRevenue / settings.targetRevenueGoal) * 100).toFixed(0)}%</span>
            </div>
            <div className="bar-track mt-2">
              <div 
                className="bar-fill transition-all duration-500" 
                style={{ width: `${Math.min(100, (customMetrics.totalRevenue / settings.targetRevenueGoal) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Portfolio Lead Capacity */}
        <div className="bg-white p-5 rounded-[14px] card-shadow flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#888888] uppercase text-[10px] font-bold tracking-widest">Expected Leads</span>
              <div className="p-1.5 bg-[#051C2C]/5 rounded-lg text-[#051C2C]">
                <Users size={14} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-garamond text-3xl font-extrabold brand-text tracking-tight-titles">
                {Math.round(customMetrics.totalLeads)}
              </span>
              {customMetrics.totalLeads >= settings.minLeadsTarget ? (
                <span className="text-[#00C853] text-xs font-bold">Target Met ✓</span>
              ) : (
                <span className="text-red-500 text-xs font-bold">Short</span>
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[11px] text-[#888888] flex justify-between">
              <span>Min Target: <strong>{settings.minLeadsTarget}</strong></span>
              <span className="font-semibold">{((customMetrics.totalLeads / settings.minLeadsTarget) * 100).toFixed(0)}%</span>
            </div>
            <div className="bar-track mt-2">
              <div 
                className="bar-fill transition-all duration-500" 
                style={{ width: `${Math.min(100, (customMetrics.totalLeads / settings.minLeadsTarget) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Monte Carlo Safety Score */}
        <div className="bg-white p-5 rounded-[14px] card-shadow flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[#888888] uppercase text-[10px] font-bold tracking-widest">Downside Safety Rate</span>
              <div className="p-1.5 bg-[#00C853]/10 rounded-lg text-[#00C853]">
                <ShieldCheck size={14} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-garamond text-3xl font-extrabold brand-text tracking-tight-titles">
                {safetyRate}%
              </span>
              <span className="text-xs text-[#888888] uppercase font-mono">Confidence</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[11px] text-[#888888] flex justify-between">
              <span>Goal Reach Probability:</span>
              <span className="font-semibold">{targetReachProbability}%</span>
            </div>
            <div className="bar-track mt-2">
              <div 
                className="bar-fill bg-[#00C853] transition-all duration-500" 
                style={{ width: `${safetyRate}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Primary Grid Layout: Left Table & Right Dynamic Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Budget Strategy Slider Panel (Right panel in wireframe, here 5/12 columns for beautiful symmetry) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[14px] card-shadow p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">Interactive Allocation Control</h3>
                <p className="text-[12px] text-[#888888] mt-1">Adjust channel spends to simulate returns immediately.</p>
              </div>
              <button 
                onClick={onApplyOptimal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2251FF] hover:bg-[#2251FF]/90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
              >
                <RefreshCw size={12} />
                Optimize
              </button>
            </div>

            <div className="space-y-4">
              {(Object.keys(customAllocations) as Channel[]).map(channel => {
                const spend = customAllocations[channel];
                const cons = constraints.find(c => c.channel === channel);
                const min = cons ? cons.minSpend : 0;
                const max = cons ? cons.maxSpend : 100000;
                const percentOfTotal = totalCustomSpend > 0 ? (spend / totalCustomSpend) * 100 : 0;

                return (
                  <div key={channel} className="space-y-2 p-3 bg-[#F5F5F2]/50 hover:bg-[#F5F5F2] rounded-[10px] transition-all duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#051C2C]">{channel}</span>
                        <span className="text-[10px] font-mono text-[#888888] bg-[#051C2C]/5 px-1.5 py-0.5 rounded-full">
                          {percentOfTotal.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#888888]">$</span>
                        <input
                          type="number"
                          value={spend === 0 ? '' : spend}
                          onChange={(e) => handleInputChange(channel, e.target.value)}
                          placeholder="0"
                          className="w-20 px-2 py-0.5 text-right text-[12px] font-bold text-[#051C2C] bg-[#FFFDE7] focus:outline-none focus:ring-1 focus:ring-[#2251FF] rounded border border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#888888] font-mono w-10">${min}</span>
                      <input
                        type="range"
                        min={min}
                        max={max}
                        step={100}
                        value={spend}
                        onChange={(e) => handleSliderChange(channel, parseFloat(e.target.value))}
                        className="flex-1 h-1 bg-[#051C2C]/10 rounded-lg appearance-none cursor-pointer accent-[#2251FF]"
                      />
                      <span className="text-[10px] text-[#888888] font-mono w-12 text-right">${max}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Allocation Total Indicator */}
            <div className="mt-2 pt-4 border-t border-[#E8E8E6] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#051C2C]">Total Configured Budget:</span>
              <div className="text-right">
                <span className="text-lg font-garamond font-bold text-[#051C2C]">{formatCurrency(totalCustomSpend)}</span>
                <span className="text-[10px] text-[#888888] block">of {formatCurrency(settings.totalBudget)} limit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Allocation Comparison matrix (Left panel, 7/12 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[14px] card-shadow overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#E8E8E6] flex items-center justify-between bg-[#051C2C]/2">
              <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">Strategic Budget Comparative Matrix</h3>
              <span className="text-[11px] font-mono text-[#888888] bg-[#051C2C]/5 px-2 py-0.5 rounded-full">{historicalDataLength} Monthly Logs Checked</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[rgba(5,28,44,0.08)]">
                    <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] w-[130px]">Channel</th>
                    <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Current Spend</th>
                    <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Optimal Spend</th>
                    <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Custom Spend</th>
                    <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Custom Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
                  {customMetrics.channels.map((chan: any) => {
                    const currentChan = currentMetrics.channels.find((c: any) => c.channel === chan.channel);
                    const optimalChan = optimizedMetrics.channels.find((c: any) => c.channel === chan.channel);
                    const customShare = totalCustomSpend > 0 ? (chan.spend / totalCustomSpend) : 0;

                    return (
                      <tr key={chan.channel} className="hover:bg-[#F5F5F2]/50 transition-colors duration-150">
                        <td className="py-3 px-4 font-semibold text-[#051C2C]">{chan.channel}</td>
                        <td className="py-3 px-3 text-right text-[#888888] font-mono">{formatCurrency(currentChan?.spend || 0)}</td>
                        <td className="py-3 px-3 text-right text-[#2251FF] font-semibold font-mono">{formatCurrency(optimalChan?.spend || 0)}</td>
                        <td className="py-3 px-3 text-right font-bold text-[#051C2C] font-mono">
                          {chan.spend > 0 ? formatCurrency(chan.spend) : '—'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-3">
                            <span className="font-mono text-[10px] w-8 text-right">{(customShare * 100).toFixed(0)}%</span>
                            <div className="w-16 bar-track">
                              <div 
                                className="bar-fill" 
                                style={{ width: `${customShare * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-[#051C2C]/5 font-bold border-t-2 border-[#051C2C]/10 text-[12px]">
                    <td className="py-3.5 px-4 text-[#051C2C] font-bold">Total Portfolio</td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#888888]">{formatCurrency(currentMetrics.totalSpend)}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#2251FF]">{formatCurrency(optimizedMetrics.totalSpend)}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#051C2C]">{formatCurrency(totalCustomSpend)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono text-[11px]">100%</span>
                    </td>
                  </tr>
                  <tr className="bg-white font-bold text-[12px] border-t border-[#E8E8E6]">
                    <td className="py-3.5 px-4 text-[#051C2C]">Projected Revenue</td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#888888]">{formatCurrency(currentMetrics.totalRevenue)}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#2251FF]">{formatCurrency(optimizedMetrics.totalRevenue)}</td>
                    <td className="py-3.5 px-3 text-right font-mono text-[#2251FF] font-garamond text-base">{formatCurrency(customMetrics.totalRevenue)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] text-[#888888] font-normal">ROAS: </span>
                      <span className="text-[#2251FF] font-bold">{customMetrics.roas.toFixed(2)}x</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Insight Section (CEO / Executive Summary blocks) */}
      <div className="bg-white rounded-[14px] card-shadow p-6">
        <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-4 flex items-center gap-2">
          <Lightbulb className="text-[#2251FF]" size={18} />
          Strategic Executive Insights
        </h3>

        <div className="space-y-4">
          
          {/* Revenue Improvement Insight */}
          {customMetrics.totalRevenue > currentMetrics.totalRevenue ? (
            <div className="accent-border-box p-4 rounded-r-lg">
              <p className="text-[13px] text-[#1A1A2E] leading-relaxed">
                💡 <strong>Revenue Lift Opportunity:</strong> Your current budget allocation projections generate <strong>{formatCurrency(customMetrics.totalRevenue)}</strong>. By adopting the system-recommended optimized allocation, expected revenue climbs to <strong>{formatCurrency(optimizedMetrics.totalRevenue)}</strong>, yielding an additional **{formatCurrency(optimizedMetrics.totalRevenue - customMetrics.totalRevenue)}** in margin (⬆️ {((optimizedMetrics.totalRevenue - customMetrics.totalRevenue) / customMetrics.totalRevenue * 100).toFixed(1)}% improvement).
              </p>
            </div>
          ) : (
            <div className="accent-border-box p-4 rounded-r-lg">
              <p className="text-[13px] text-[#1A1A2E] leading-relaxed">
                💡 <strong>Optimized Efficiency Achieved:</strong> The selected allocation yields <strong>{formatCurrency(customMetrics.totalRevenue)}</strong>. All non-linear diminishing returns are mathematically minimized.
              </p>
            </div>
          )}

          {/* HHI Concentration Risk Alert */}
          {hhi > 0.40 ? (
            <div className="p-4 bg-[rgba(211,47,47,0.04)] border-l-3 border-[#D32F2F] rounded-r-lg">
              <p className="text-[13px] text-[#1A1A2E] leading-relaxed">
                ⚠️ <strong>Severe Channel Concentration Risk:</strong> The Herfindahl-Hirschman Concentration Index is currently at <strong className="text-red-700">{hhi.toFixed(2)}</strong> (critical threshold: 0.40). You are heavily dependent on a single marketing channel. This leaves your client acquisition highly vulnerable to platform policy swings, ad account suspension, or pricing shifts. Diverting 15% - 20% to highly stable alternative channels like <strong>SEO</strong> or <strong>Referral</strong> is recommended.
              </p>
            </div>
          ) : (
            <div className="accent-border-box p-4 rounded-r-lg">
              <p className="text-[13px] text-[#1A1A2E] leading-relaxed">
                ✓ <strong>Healthy Channel Diversification:</strong> Your concentration score (HHI: <strong>{hhi.toFixed(2)}</strong>) indicates a balanced multi-channel portfolio, dampening volatility risk by over <strong>20%</strong>.
              </p>
            </div>
          )}

          {/* Operational Capacity / Bottleneck Warning */}
          {customMetrics.totalBookedJobs > settings.bookedJobsCapacity ? (
            <div className="p-4 bg-[rgba(211,47,47,0.04)] border-l-3 border-[#D32F2F] rounded-r-lg">
              <p className="text-[13px] text-[#1A1A2E] leading-relaxed">
                ⚠️ <strong>Capacity Bottleneck Risk:</strong> Under the current spending plan, the projected booked jobs of <strong>{Math.round(customMetrics.totalBookedJobs)}</strong> exceed your organizational fulfillment capacity of <strong>{settings.bookedJobsCapacity}</strong> jobs. Additional spending will lead to customer service decline, operational backlog, or lead waste. System-wide efficiency caps suggest keeping total spend constrained or upgrading production throughput.
              </p>
            </div>
          ) : customMetrics.totalBookedJobs > settings.bookedJobsCapacity * 0.9 ? (
            <div className="accent-border-box p-4 rounded-r-lg">
              <p className="text-[13px] text-[#1A1A2E] leading-relaxed">
                ℹ+ <strong>Operational Capacity Warning:</strong> Projected booked jobs of <strong>{Math.round(customMetrics.totalBookedJobs)}</strong> are approaching the capacity threshold (<strong>{settings.bookedJobsCapacity}</strong>). Keep a close watch on operational backlogs.
              </p>
            </div>
          ) : null}

        </div>
      </div>

    </div>
  );
}
