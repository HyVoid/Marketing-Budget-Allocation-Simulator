import React, { useRef, useState } from 'react';
import { Channel, Scenario, GlobalSettings, BenchmarkMetrics, MarginalCurveRow, ConstraintRow } from '../types';
import { calculateExpectedMetrics, calculateHHI, runMonteCarloSimulation, solveOptimalBudget } from '../utils';
import { Download, Upload, RotateCcw, Copy, FolderPlus, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ScenarioMatrixProps {
  settings: GlobalSettings;
  benchmarks: BenchmarkMetrics[];
  curves: MarginalCurveRow[];
  constraints: ConstraintRow[];
  scenarios: Scenario[];
  customAllocations: Record<Channel, number>;
  onLoadScenario: (allocations: Record<Channel, number>, scenarioId: string) => void;
  onSaveCurrentAsScenario: (name: string) => void;
  onExportBackup: () => void;
  onImportBackup: (importedState: any) => void;
  onResetData: () => void;
  currentMetrics: any;
  optimizedMetrics: any;
  customMetrics: any;
  onRunMC: (allocs: Record<Channel, number>) => any;
}

export default function ScenarioMatrix({
  settings,
  benchmarks,
  curves,
  constraints,
  scenarios,
  customAllocations,
  onLoadScenario,
  onSaveCurrentAsScenario,
  onExportBackup,
  onImportBackup,
  onResetData,
  currentMetrics,
  optimizedMetrics,
  customMetrics,
  onRunMC,
}: ScenarioMatrixProps) {
  const [newScenarioName, setNewScenarioName] = useState('');
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatter helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const handleSaveScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScenarioName.trim()) return;
    onSaveCurrentAsScenario(newScenarioName.trim());
    setNewScenarioName('');
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  // Trigger local file upload for importing backup JSON
  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        // Basic validation
        if (parsed.settings && parsed.constraints && parsed.marginalCurves) {
          onImportBackup(parsed);
          setImportError(null);
          alert('Backup uploaded and successfully synced!');
        } else {
          setImportError('Invalid JSON scheme. Ensure it is a valid simulator backup.');
        }
      } catch (err) {
        setImportError('Could not parse JSON file. Ensure it is not corrupted.');
      }
    };
    reader.readAsText(file);
  };

  // Compile full cross-scenario metrics
  const compileScenarioMetrics = (allocs: Record<Channel, number>) => {
    const metrics = calculateExpectedMetrics(allocs, benchmarks, curves);
    const hhi = calculateHHI(allocs);
    const mc = onRunMC(allocs);
    return {
      totalSpend: metrics.totalSpend,
      totalRevenue: metrics.totalRevenue,
      roas: metrics.roas,
      leads: metrics.totalLeads,
      bookedJobs: metrics.totalBookedJobs,
      hhi,
      mc_exceed: mc.probabilityOfTarget,
      mc_downside: mc.probabilityOfDownside,
    };
  };

  // Gather results for all scenarios to compare side-by-side
  const scenarioMatrixData = scenarios.map(sc => ({
    id: sc.id,
    name: sc.name,
    isCustom: sc.isCustom,
    allocations: sc.allocations,
    metrics: compileScenarioMetrics(sc.allocations),
  }));

  // Append System Optimal to the compare matrix
  const optimalAllocs = solveOptimalBudget(settings.totalBudget, constraints, curves);
  const optimalMetricsData = {
    id: 'sc_optimal',
    name: 'Optimal Configuration',
    isCustom: false,
    allocations: optimalAllocs,
    metrics: {
      totalSpend: optimizedMetrics.totalSpend,
      totalRevenue: optimizedMetrics.totalRevenue,
      roas: optimizedMetrics.roas,
      leads: optimizedMetrics.totalLeads,
      bookedJobs: optimizedMetrics.totalBookedJobs,
      hhi: calculateHHI(optimalAllocs),
      ...(() => {
        const mc = onRunMC(optimalAllocs);
        return { mc_exceed: mc.probabilityOfTarget, mc_downside: mc.probabilityOfDownside };
      })()
    }
  };

  // Append User Tweak as well
  const customMetricsData = {
    id: 'sc_custom_active',
    name: 'Active Custom',
    isCustom: true,
    allocations: customAllocations,
    metrics: {
      totalSpend: customMetrics.totalSpend,
      totalRevenue: customMetrics.totalRevenue,
      roas: customMetrics.roas,
      leads: customMetrics.totalLeads,
      bookedJobs: customMetrics.totalBookedJobs,
      hhi: calculateHHI(customAllocations),
      ...(() => {
        const mc = onRunMC(customAllocations);
        return { mc_exceed: mc.probabilityOfTarget, mc_downside: mc.probabilityOfDownside };
      })()
    }
  };

  const allScenariosToCompare = [...scenarioMatrixData, optimalMetricsData, customMetricsData];

  return (
    <div className="space-y-8 animate-fade-up">
      
      {/* Click-to-load Quick Presets */}
      <div className="bg-white rounded-[14px] card-shadow p-6">
        <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-2">
          Select Preset Strategic Scenario
        </h3>
        <p className="text-[12px] text-[#888888] mb-6">
          Click any strategic profile below to immediately apply its budget to your active canvas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarios.map(sc => {
            const sumBudget = Object.values(sc.allocations).reduce((sum, v) => sum + v, 0);
            const isSelected = JSON.stringify(sc.allocations) === JSON.stringify(customAllocations);

            return (
              <div 
                key={sc.id}
                onClick={() => onLoadScenario(sc.allocations, sc.id)}
                className={`cursor-pointer p-4 rounded-[10px] transition-all duration-200 hover:scale-[1.02] border ${
                  isSelected 
                    ? 'bg-[#051C2C]/5 border-[#2251FF] shadow-sm' 
                    : 'bg-[#F5F5F2]/40 border-[#E8E8E6] hover:bg-[#F5F5F2]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-bold text-[#051C2C] truncate pr-2">{sc.name}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#2251FF] shrink-0" />}
                </div>
                <div className="text-lg font-garamond font-bold text-[#2251FF]">
                  {formatCurrency(sumBudget)}
                </div>
                <div className="text-[10px] text-[#888888] mt-1.5 flex justify-between font-mono">
                  <span>Google Ads: {Math.round((sc.allocations['Google Ads'] / sumBudget) * 100 || 0)}%</span>
                  <span>SEO: {Math.round((sc.allocations['SEO'] / sumBudget) * 100 || 0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cross-scenario matrix comparison */}
      <div className="bg-white rounded-[14px] card-shadow overflow-hidden">
        <div className="p-6 border-b border-[#E8E8E6] bg-[rgba(5,28,44,0.01)]">
          <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">Cross-Scenario Performance Matrix</h3>
          <p className="text-[12px] text-[#888888] mt-1">Horizontal scorecard comparing budget configuration limits and statistical risk forecasts.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[rgba(5,28,44,0.08)]">
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] w-[200px]">Strategic Metric</th>
                {allScenariosToCompare.map(sc => {
                  const isCurrentActive = sc.id === 'sc_custom_active';
                  const isOptimal = sc.id === 'sc_optimal';
                  return (
                    <th 
                      key={sc.id} 
                      className={`py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-right ${
                        isCurrentActive ? 'text-[#2251FF]' : isOptimal ? 'text-[#051C2C]' : 'text-[#888888]'
                      }`}
                    >
                      <div className="truncate max-w-[140px] inline-block">{sc.name}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
              
              {/* Total Spend */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#051C2C]">Total Configured Budget</td>
                {allScenariosToCompare.map(sc => (
                  <td key={sc.id} className="py-3 px-3 text-right font-mono text-[#051C2C]">
                    {formatCurrency(sc.metrics.totalSpend)}
                  </td>
                ))}
              </tr>

              {/* Expected Revenue */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors font-bold bg-[rgba(34,81,255,0.02)]">
                <td className="py-3 px-4 text-[#051C2C]">Projected Revenue (E(R))</td>
                {allScenariosToCompare.map(sc => (
                  <td key={sc.id} className="py-3 px-3 text-right font-garamond text-base text-[#2251FF]">
                    {formatCurrency(sc.metrics.totalRevenue)}
                  </td>
                ))}
              </tr>

              {/* Expected ROAS */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#051C2C]">Portfolio ROAS</td>
                {allScenariosToCompare.map(sc => (
                  <td key={sc.id} className="py-3 px-3 text-right font-semibold text-[#051C2C]">
                    {sc.metrics.roas.toFixed(2)}x
                  </td>
                ))}
              </tr>

              {/* Expected Leads */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#051C2C]">Estimated Leads Volume</td>
                {allScenariosToCompare.map(sc => (
                  <td key={sc.id} className="py-3 px-3 text-right font-mono text-[#888888]">
                    {Math.round(sc.metrics.leads)}
                  </td>
                ))}
              </tr>

              {/* Projected Booked Jobs */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#051C2C]">Projected Booked Jobs</td>
                {allScenariosToCompare.map(sc => {
                  const overCapacity = sc.metrics.bookedJobs > settings.bookedJobsCapacity;
                  return (
                    <td 
                      key={sc.id} 
                      className={`py-3 px-3 text-right font-mono ${
                        overCapacity ? 'text-red-500 font-bold' : 'text-[#051C2C]'
                      }`}
                    >
                      {Math.round(sc.metrics.bookedJobs)}
                      {overCapacity && <span className="text-[9px] block text-red-400">⚠️ Over capacity</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Portfolio Concentration HHI */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#051C2C]">Concentration Index (HHI)</td>
                {allScenariosToCompare.map(sc => {
                  const isHighRisk = sc.metrics.hhi > 0.40;
                  return (
                    <td 
                      key={sc.id} 
                      className={`py-3 px-3 text-right font-semibold ${
                        isHighRisk ? 'text-[#D32F2F]' : 'text-[#00C853]'
                      }`}
                    >
                      {sc.metrics.hhi.toFixed(2)}
                      <span className="text-[9px] block font-normal">
                        {isHighRisk ? 'Critical Risk' : 'Healthy Diverse'}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Monte Carlo Exceed probability */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#051C2C]">Probability of Exceeding Goal</td>
                {allScenariosToCompare.map(sc => (
                  <td key={sc.id} className="py-3 px-3 text-right text-[#2251FF] font-semibold font-mono">
                    {Math.round(sc.metrics.mc_exceed * 100)}%
                  </td>
                ))}
              </tr>

              {/* Monte Carlo Downside Risk */}
              <tr className="hover:bg-[#F5F5F2]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#051C2C]">Downside Risk Probability</td>
                {allScenariosToCompare.map(sc => {
                  const hasHighRisk = sc.metrics.mc_downside > 0.30;
                  return (
                    <td 
                      key={sc.id} 
                      className={`py-3 px-3 text-right font-mono ${
                        hasHighRisk ? 'text-red-500 font-bold' : 'text-[#888888]'
                      }`}
                    >
                      {Math.round(sc.metrics.mc_downside * 100)}%
                    </td>
                  );
                })}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Save current adjustment as static scenario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Save Scenario Form */}
        <div className="bg-white rounded-[14px] card-shadow p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-2">
              Record Custom Scenario Configuration
            </h3>
            <p className="text-[12px] text-[#888888] mb-4">
              Freeze and archive your current dynamic slider adjustments into a static profile.
            </p>
          </div>

          <form onSubmit={handleSaveScenario} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Scenario Identifier Name</label>
              <input
                type="text"
                value={newScenarioName}
                onChange={(e) => setNewScenarioName(e.target.value)}
                placeholder="e.g. Q3 Optimistic Reallocation"
                className="w-full px-4 py-2 text-[12px] text-[#051C2C] bg-[#FFFDE7] focus:outline-none focus:ring-1 focus:ring-[#2251FF] rounded-[8px] border border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#051C2C] hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
            >
              <FolderPlus size={14} />
              Save Scenario Profile
            </button>

            {isSavedAlert && (
              <div className="flex items-center gap-2 text-xs text-[#00C853] font-semibold animate-fade-up">
                <CheckCircle2 size={14} />
                Successfully saved scenario to portfolio report logs!
              </div>
            )}
          </form>
        </div>

        {/* Data Administration & Backup Controls (Backup, Restore, Reset) */}
        <div className="bg-white rounded-[14px] card-shadow p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-2">
              SaaS Workbook Administration
            </h3>
            <p className="text-[12px] text-[#888888] mb-4">
              Download and restore entire simulation datasets. This saves all configurations, constraints, curves, and historical ledgers.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {/* Export Backup Button */}
              <button
                onClick={onExportBackup}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2251FF] hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
              >
                <Download size={14} />
                Export Backup
              </button>

              {/* Import Backup Trigger */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#051C2C] hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
              >
                <Upload size={14} />
                Import Backup
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportFileChange}
                accept=".json"
                className="hidden"
              />

              {/* Reset State Button */}
              <button
                onClick={onResetData}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#D32F2F] hover:bg-red-50 text-[#D32F2F] rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
              >
                <RotateCcw size={14} />
                Reset Baseline Data
              </button>
            </div>

            {importError && (
              <p className="text-xs font-semibold text-red-500 animate-fade-up">
                ⚠️ {importError}
              </p>
            )}

            <p className="text-[10px] text-[#888888] leading-relaxed">
              * Restoring will completely overwrite the local storage state. All backups are parsed locally with no remote network transmission.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
