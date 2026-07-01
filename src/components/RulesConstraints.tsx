import React, { useState } from 'react';
import { Channel, GlobalSettings, ConstraintRow, MarginalCurveRow, CHANNELS } from '../types';
import { Save, AlertTriangle, Play, HelpCircle, Layers, Sliders } from 'lucide-react';

interface RulesConstraintsProps {
  settings: GlobalSettings;
  onUpdateSettings: (settings: GlobalSettings) => void;
  constraints: ConstraintRow[];
  onUpdateConstraints: (constraints: ConstraintRow[]) => void;
  curves: MarginalCurveRow[];
  onUpdateCurves: (curves: MarginalCurveRow[]) => void;
}

export default function RulesConstraints({
  settings,
  onUpdateSettings,
  constraints,
  onUpdateConstraints,
  curves,
  onUpdateCurves,
}: RulesConstraintsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'SETTINGS' | 'LIMITS' | 'CURVES'>('SETTINGS');

  // Local settings states
  const [totalBudget, setTotalBudget] = useState(settings.totalBudget);
  const [minLeadsTarget, setMinLeadsTarget] = useState(settings.minLeadsTarget);
  const [bookedJobsCapacity, setBookedJobsCapacity] = useState(settings.bookedJobsCapacity);
  const [simulationRuns, setSimulationRuns] = useState(settings.simulationRuns);
  const [targetRevenueGoal, setTargetRevenueGoal] = useState(settings.targetRevenueGoal);
  const [downsideRevenueThreshold, setDownsideRevenueThreshold] = useState(settings.downsideRevenueThreshold);

  // Local constraints states
  const [localConstraints, setLocalConstraints] = useState<ConstraintRow[]>([...constraints]);

  // Local curves state
  const [localCurves, setLocalCurves] = useState<MarginalCurveRow[]>([...curves]);

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      totalBudget,
      minLeadsTarget,
      bookedJobsCapacity,
      simulationRuns,
      targetRevenueGoal,
      downsideRevenueThreshold,
    });
    alert('Global settings updated and synchronized!');
  };

  const handleConstraintChange = (channel: Channel, field: 'minSpend' | 'maxSpend', value: number) => {
    const updated = localConstraints.map(c => {
      if (c.channel === channel) {
        return { ...c, [field]: value };
      }
      return c;
    });
    setLocalConstraints(updated);
  };

  const handleConstraintsSave = () => {
    // Validate bounds
    for (const c of localConstraints) {
      if (c.minSpend > c.maxSpend) {
        alert(`Validation Error: ${c.channel} Minimum Spend exceeds Maximum Spend!`);
        return;
      }
    }
    onUpdateConstraints(localConstraints);
    alert('Hard constraints updated and verified!');
  };

  const handleCurveChange = (id: string, value: number) => {
    const updated = localCurves.map(row => {
      if (row.id === id) {
        return { ...row, roas: value };
      }
      return row;
    });
    setLocalCurves(updated);
  };

  const handleCurvesSave = () => {
    onUpdateCurves(localCurves);
    alert('Marginal curves and non-linear diminishing tiers updated successfully!');
  };

  return (
    <div className="space-y-8 animate-fade-up">

      {/* Sub tabs to split constraints view logically */}
      <div className="flex border-b border-[#E8E8E6]">
        <button
          onClick={() => setActiveSubTab('SETTINGS')}
          className={`py-3 px-6 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
            activeSubTab === 'SETTINGS'
              ? 'border-[#2251FF] text-[#2251FF]'
              : 'border-transparent text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <Sliders size={14} />
          01_Global Settings
        </button>
        <button
          onClick={() => setActiveSubTab('LIMITS')}
          className={`py-3 px-6 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
            activeSubTab === 'LIMITS'
              ? 'border-[#2251FF] text-[#2251FF]'
              : 'border-transparent text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <AlertTriangle size={14} />
          03_Spend Limits
        </button>
        <button
          onClick={() => setActiveSubTab('CURVES')}
          className={`py-3 px-6 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
            activeSubTab === 'CURVES'
              ? 'border-[#2251FF] text-[#2251FF]'
              : 'border-transparent text-[#888888] hover:text-[#051C2C]'
          }`}
        >
          <Layers size={14} />
          04_Marginal ROAS Curves
        </button>
      </div>

      {/* 01_Global Settings view */}
      {activeSubTab === 'SETTINGS' && (
        <div className="bg-white rounded-[14px] card-shadow p-6">
          <div className="mb-6">
            <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">SaaS Business Strategy Variables</h3>
            <p className="text-[12px] text-[#888888] mt-1">Configure baseline parameters governing total spend boundaries and mathematical target goals.</p>
          </div>

          <form onSubmit={handleSettingsSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Total Budget */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Total Portfolio Budget Cap ($)</label>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                  required
                />
              </div>

              {/* Min Leads Target */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Minimum Leads Target (Count)</label>
                <input
                  type="number"
                  value={minLeadsTarget}
                  onChange={(e) => setMinLeadsTarget(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                  required
                />
              </div>

              {/* Booked Jobs Capacity */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Max Booking Fulfillment Capacity</label>
                <input
                  type="number"
                  value={bookedJobsCapacity}
                  onChange={(e) => setBookedJobsCapacity(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                  required
                />
              </div>

              {/* MC Target Goal */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Target Revenue Goal ($)</label>
                <input
                  type="number"
                  value={targetRevenueGoal}
                  onChange={(e) => setTargetRevenueGoal(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                  required
                />
              </div>

              {/* MC Downside Threshold */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Downside Safety Threshold ($)</label>
                <input
                  type="number"
                  value={downsideRevenueThreshold}
                  onChange={(e) => setDownsideRevenueThreshold(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                  required
                />
              </div>

              {/* Simulation Runs */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Monte Carlo Sample Iterations</label>
                <input
                  type="number"
                  value={simulationRuns}
                  onChange={(e) => setSimulationRuns(parseInt(e.target.value) || 1000)}
                  className="w-full px-4 py-2.5 text-[12px] font-semibold text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                  required
                  min={100}
                  max={5000}
                />
              </div>

            </div>

            <div className="flex justify-end pt-4 border-t border-[#E8E8E6]">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-[#2251FF] hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
              >
                <Save size={14} />
                Save Strategy Variables
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 03_Constraints view */}
      {activeSubTab === 'LIMITS' && (
        <div className="bg-white rounded-[14px] card-shadow overflow-hidden">
          <div className="p-6 border-b border-[#E8E8E6] bg-[rgba(5,28,44,0.01)] flex items-center justify-between">
            <div>
              <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">Spend Boundaries per Marketing Channel</h3>
              <p className="text-[12px] text-[#888888] mt-1">
                Edit physical floors and ceilings. The budget solver strictly respects these constraints.
              </p>
            </div>
            <button
              onClick={handleConstraintsSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2251FF] hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
            >
              <Save size={14} />
              Save Spend Limits
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[rgba(5,28,44,0.08)]">
                  <th className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C]">Channel</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Floor (Min Spend)</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Ceiling (Max Spend)</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-center">Safety Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
                {localConstraints.map(c => (
                  <tr key={c.channel} className="hover:bg-[#F5F5F2]/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#051C2C]">{c.channel}</td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[#888888] font-mono">$</span>
                        <input
                          type="number"
                          value={c.minSpend}
                          onChange={(e) => handleConstraintChange(c.channel, 'minSpend', parseFloat(e.target.value) || 0)}
                          className="w-28 px-2 py-1 text-right font-mono text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[#888888] font-mono">$</span>
                        <input
                          type="number"
                          value={c.maxSpend}
                          onChange={(e) => handleConstraintChange(c.channel, 'maxSpend', parseFloat(e.target.value) || 0)}
                          className="w-28 px-2 py-1 text-right font-mono text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      {c.minSpend <= c.maxSpend ? (
                        <span className="text-[10px] font-semibold text-[#00C853] bg-[#00C853]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Verified ✓</span>
                      ) : (
                        <span className="text-[10px] font-semibold text-[#D32F2F] bg-[#D32F2F]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Crossed Error ⚠️</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 04_Marginal_Curves view */}
      {activeSubTab === 'CURVES' && (
        <div className="bg-white rounded-[14px] card-shadow overflow-hidden">
          <div className="p-6 border-b border-[#E8E8E6] bg-[rgba(5,28,44,0.01)] flex items-center justify-between">
            <div>
              <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">Diminishing Marginal Return Tiers</h3>
              <p className="text-[12px] text-[#888888] mt-1">
                Alter the expected marginal ROAS for each incremental budget bucket per channel.
              </p>
            </div>
            <button
              onClick={handleCurvesSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2251FF] hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
            >
              <Save size={14} />
              Save Marginal Curves
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[rgba(5,28,44,0.08)]">
                  <th className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C]">Channel Name</th>
                  <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Tier Start</th>
                  <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Tier End</th>
                  <th className="py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right w-[150px]">Marginal ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
                {localCurves.map((row, index) => {
                  return (
                    <tr key={row.id} className="hover:bg-[#F5F5F2]/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-[#051C2C]">{row.channel}</td>
                      <td className="py-3.5 px-3 text-right font-mono text-[#888888]">${row.start.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-right font-mono text-[#888888]">
                        {row.end >= 100000 ? 'No Limit ($100k+)' : `$${row.end.toLocaleString()}`}
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <input
                            type="number"
                            step="0.1"
                            value={row.roas}
                            onChange={(e) => handleCurveChange(row.id, parseFloat(e.target.value) || 0)}
                            className="w-20 px-2 py-0.5 text-right font-mono font-bold text-[#2251FF] bg-[#F5F5F2] border border-[#E8E8E6] rounded focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                          />
                          <span className="text-xs text-[#888888] font-semibold">x</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
