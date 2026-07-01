import React, { useState, useEffect } from 'react';
import { 
  Channel, 
  GlobalSettings, 
  HistoricalRow, 
  ConstraintRow, 
  MarginalCurveRow, 
  Scenario, 
  BenchmarkMetrics 
} from './types';
import { 
  DEFAULT_SETTINGS, 
  DEFAULT_CONSTRAINTS, 
  DEFAULT_MARGINAL_CURVES, 
  DEFAULT_SCENARIOS, 
  generateDefaultHistoricalData 
} from './data';
import { 
  calculateHistoricalBenchmarks, 
  calculateExpectedMetrics, 
  solveOptimalBudget, 
  runMonteCarloSimulation 
} from './utils';

// Icons
import { 
  LayoutDashboard, 
  Layers, 
  BarChart2, 
  ShieldAlert, 
  History, 
  Settings, 
  CloudRain, 
  FileCheck, 
  Download, 
  Upload, 
  RotateCcw,
  CheckCircle
} from 'lucide-react';

// Components
import ExecutiveDashboard from './components/ExecutiveDashboard';
import ScenarioMatrix from './components/ScenarioMatrix';
import PortfolioReport from './components/PortfolioReport';
import HistoricalLedger from './components/HistoricalLedger';
import RulesConstraints from './components/RulesConstraints';
import SimulationConsole from './components/SimulationConsole';

export default function App() {
  // Tabs State
  const [activeTab, setActiveTab] = useState<
    'EXECUTIVE' | 'SCENARIOS' | 'PORTFOLIO' | 'LEDGER' | 'RULES' | 'SIMULATION'
  >('EXECUTIVE');

  // Workbook Core States
  const [settings, setSettings] = useState<GlobalSettings>(DEFAULT_SETTINGS);
  const [historicalData, setHistoricalData] = useState<HistoricalRow[]>([]);
  const [constraints, setConstraints] = useState<ConstraintRow[]>(DEFAULT_CONSTRAINTS);
  const [marginalCurves, setMarginalCurves] = useState<MarginalCurveRow[]>(DEFAULT_MARGINAL_CURVES);
  const [scenarios, setScenarios] = useState<Scenario[]>(DEFAULT_SCENARIOS);
  const [customAllocations, setCustomAllocations] = useState<Record<Channel, number>>({} as any);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc_current');
  const [lastSaved, setLastSaved] = useState<string>('');

  // Initial Seed Load
  useEffect(() => {
    // 1. Settings
    const cachedSettings = localStorage.getItem('mbas_settings_v1');
    if (cachedSettings) {
      setSettings(JSON.parse(cachedSettings));
    } else {
      setSettings(DEFAULT_SETTINGS);
    }

    // 2. Historical Ledger
    const cachedHistorical = localStorage.getItem('mbas_historical_v1');
    if (cachedHistorical) {
      setHistoricalData(JSON.parse(cachedHistorical));
    } else {
      setHistoricalData(generateDefaultHistoricalData());
    }

    // 3. Constraints
    const cachedConstraints = localStorage.getItem('mbas_constraints_v1');
    if (cachedConstraints) {
      setConstraints(JSON.parse(cachedConstraints));
    } else {
      setConstraints(DEFAULT_CONSTRAINTS);
    }

    // 4. Marginal Curves
    const cachedCurves = localStorage.getItem('mbas_curves_v1');
    if (cachedCurves) {
      setMarginalCurves(JSON.parse(cachedCurves));
    } else {
      setMarginalCurves(DEFAULT_MARGINAL_CURVES);
    }

    // 5. Scenarios
    const cachedScenarios = localStorage.getItem('mbas_scenarios_v1');
    if (cachedScenarios) {
      setScenarios(JSON.parse(cachedScenarios));
    } else {
      setScenarios(DEFAULT_SCENARIOS);
    }

    // 6. Custom Allocation
    const cachedAllocations = localStorage.getItem('mbas_allocations_v1');
    if (cachedAllocations) {
      setCustomAllocations(JSON.parse(cachedAllocations));
    } else {
      setCustomAllocations(DEFAULT_SCENARIOS[0].allocations);
    }

    // 7. Selected Scenario ID
    const cachedSelectedId = localStorage.getItem('mbas_selected_id_v1');
    if (cachedSelectedId) {
      setSelectedScenarioId(cachedSelectedId);
    }

    // 8. Last Saved timestamp
    const cachedLastSaved = localStorage.getItem('mbas_last_saved_v1');
    if (cachedLastSaved) {
      setLastSaved(cachedLastSaved);
    } else {
      const currentStamp = new Date().toLocaleString('en-US');
      setLastSaved(currentStamp);
      localStorage.setItem('mbas_last_saved_v1', currentStamp);
    }
  }, []);

  // Sync to local storage wrapper
  const triggerAutoSave = (
    updatedSettings: GlobalSettings,
    updatedHistorical: HistoricalRow[],
    updatedConstraints: ConstraintRow[],
    updatedCurves: MarginalCurveRow[],
    updatedScenarios: Scenario[],
    updatedAllocations: Record<Channel, number>,
    updatedSelectedId: string
  ) => {
    const currentStamp = new Date().toLocaleString('en-US');
    setLastSaved(currentStamp);

    localStorage.setItem('mbas_settings_v1', JSON.stringify(updatedSettings));
    localStorage.setItem('mbas_historical_v1', JSON.stringify(updatedHistorical));
    localStorage.setItem('mbas_constraints_v1', JSON.stringify(updatedConstraints));
    localStorage.setItem('mbas_curves_v1', JSON.stringify(updatedCurves));
    localStorage.setItem('mbas_scenarios_v1', JSON.stringify(updatedScenarios));
    localStorage.setItem('mbas_allocations_v1', JSON.stringify(updatedAllocations));
    localStorage.setItem('mbas_selected_id_v1', updatedSelectedId);
    localStorage.setItem('mbas_last_saved_v1', currentStamp);
  };

  // State modification handlers
  const handleUpdateSettings = (updated: GlobalSettings) => {
    setSettings(updated);
    triggerAutoSave(updated, historicalData, constraints, marginalCurves, scenarios, customAllocations, selectedScenarioId);
  };

  const handleUpdateConstraints = (updated: ConstraintRow[]) => {
    setConstraints(updated);
    triggerAutoSave(settings, historicalData, updated, marginalCurves, scenarios, customAllocations, selectedScenarioId);
  };

  const handleUpdateCurves = (updated: MarginalCurveRow[]) => {
    setMarginalCurves(updated);
    triggerAutoSave(settings, historicalData, constraints, updated, scenarios, customAllocations, selectedScenarioId);
  };

  const handleUpdateAllocations = (updatedAllocations: Record<Channel, number>) => {
    setCustomAllocations(updatedAllocations);
    setSelectedScenarioId('custom');
    triggerAutoSave(settings, historicalData, constraints, marginalCurves, scenarios, updatedAllocations, 'custom');
  };

  // Ledger CRUD functions
  const handleAddHistoricalRow = (newRow: Omit<HistoricalRow, 'id'>) => {
    const added: HistoricalRow = {
      ...newRow,
      id: `hist_added_${Date.now()}`
    };
    const updated = [added, ...historicalData];
    setHistoricalData(updated);
    triggerAutoSave(settings, updated, constraints, marginalCurves, scenarios, customAllocations, selectedScenarioId);
  };

  const handleUpdateHistoricalRow = (updatedRow: HistoricalRow) => {
    const updated = historicalData.map(row => (row.id === updatedRow.id ? updatedRow : row));
    setHistoricalData(updated);
    triggerAutoSave(settings, updated, constraints, marginalCurves, scenarios, customAllocations, selectedScenarioId);
  };

  const handleDeleteHistoricalRow = (id: string) => {
    const updated = historicalData.filter(row => row.id !== id);
    setHistoricalData(updated);
    triggerAutoSave(settings, updated, constraints, marginalCurves, scenarios, customAllocations, selectedScenarioId);
  };

  // Switch active scenario profile
  const handleLoadScenario = (allocations: Record<Channel, number>, scenarioId: string) => {
    setCustomAllocations(allocations);
    setSelectedScenarioId(scenarioId);
    triggerAutoSave(settings, historicalData, constraints, marginalCurves, scenarios, allocations, scenarioId);
  };

  // Create new custom scenario static profile
  const handleSaveCurrentAsScenario = (name: string) => {
    const newScen: Scenario = {
      id: `sc_custom_${Date.now()}`,
      name: `${name} (User Profile)`,
      isCustom: true,
      allocations: { ...customAllocations }
    };
    const updated = [...scenarios, newScen];
    setScenarios(updated);
    triggerAutoSave(settings, historicalData, constraints, marginalCurves, updated, customAllocations, selectedScenarioId);
  };

  // Reset core workbook values back to defaults
  const handleResetData = () => {
    if (confirm('Are you absolutely sure you want to reset all data and configurations? Your custom inputs and logs will be lost.')) {
      const defaultHistorical = generateDefaultHistoricalData();
      setSettings(DEFAULT_SETTINGS);
      setHistoricalData(defaultHistorical);
      setConstraints(DEFAULT_CONSTRAINTS);
      setMarginalCurves(DEFAULT_MARGINAL_CURVES);
      setScenarios(DEFAULT_SCENARIOS);
      setCustomAllocations(DEFAULT_SCENARIOS[0].allocations);
      setSelectedScenarioId('sc_current');

      const currentStamp = new Date().toLocaleString('en-US');
      setLastSaved(currentStamp);

      localStorage.removeItem('mbas_settings_v1');
      localStorage.removeItem('mbas_historical_v1');
      localStorage.removeItem('mbas_constraints_v1');
      localStorage.removeItem('mbas_curves_v1');
      localStorage.removeItem('mbas_scenarios_v1');
      localStorage.removeItem('mbas_allocations_v1');
      localStorage.removeItem('mbas_selected_id_v1');
      localStorage.setItem('mbas_last_saved_v1', currentStamp);
      
      alert('Simulation workbook successfully reset to baseline seed data!');
    }
  };

  // Export full workbook parameters as serialized JSON
  const handleExportBackup = () => {
    const backupState = {
      settings,
      historicalData,
      constraints,
      marginalCurves,
      scenarios,
      customAllocations,
      selectedScenarioId,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget_allocator_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Restore state from uploaded JSON
  const handleImportBackup = (parsedState: any) => {
    setSettings(parsedState.settings);
    setHistoricalData(parsedState.historicalData);
    setConstraints(parsedState.constraints);
    setMarginalCurves(parsedState.marginalCurves);
    setScenarios(parsedState.scenarios);
    setCustomAllocations(parsedState.customAllocations);
    setSelectedScenarioId(parsedState.selectedScenarioId || 'custom');

    triggerAutoSave(
      parsedState.settings,
      parsedState.historicalData,
      parsedState.constraints,
      parsedState.marginalCurves,
      parsedState.scenarios,
      parsedState.customAllocations,
      parsedState.selectedScenarioId || 'custom'
    );
  };

  // Trigger optimal coordinate solver in real-time
  const handleApplyOptimal = () => {
    const optimalAllocations = solveOptimalBudget(settings.totalBudget, constraints, marginalCurves);
    setCustomAllocations(optimalAllocations);
    setSelectedScenarioId('sc_optimal');
    triggerAutoSave(settings, historicalData, constraints, marginalCurves, scenarios, optimalAllocations, 'sc_optimal');
  };

  // Fallback in case of empty states during initialization
  if (historicalData.length === 0 || Object.keys(customAllocations).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F2] font-sans">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2251FF] mb-4"></div>
        <p className="text-sm text-[#051C2C] font-semibold">Booting marketing simulator engine...</p>
      </div>
    );
  }

  // CORE MATHEMATICAL DERIVATIONS (Fully client-side, recalculated instantly upon any parameter change)
  const benchmarks = calculateHistoricalBenchmarks(historicalData);
  const optimalAllocs = solveOptimalBudget(settings.totalBudget, constraints, marginalCurves);

  // Compute metrics for three vectors: current, optimized, and custom (active)
  const currentMetrics = calculateExpectedMetrics(scenarios[0].allocations, benchmarks, marginalCurves);
  const optimizedMetrics = calculateExpectedMetrics(optimalAllocs, benchmarks, marginalCurves);
  const customMetrics = calculateExpectedMetrics(customAllocations, benchmarks, marginalCurves);

  // Run Monte Carlo simulation in browser (1,000 iterations computed in ~5ms)
  const simulation = runMonteCarloSimulation(customAllocations, benchmarks, marginalCurves, settings);

  // MC runner wrapper for other tabs to poll dynamically
  const runMCSimulationForScenario = (allocs: Record<Channel, number>) => {
    return runMonteCarloSimulation(allocs, benchmarks, marginalCurves, settings);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex flex-col justify-between select-none font-sans text-[13px] antialiased">
      
      {/* 56px sticky White Navigation Bar */}
      <nav className="sticky top-0 z-50 h-[56px] bg-white border-b border-[#E8E8E6] shadow-sm">
        <div className="max-w-[1400px] h-full mx-auto px-10 flex items-center justify-between">
          
          {/* Brand Logo Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#051C2C] flex items-center justify-center rounded-lg">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <span className="font-garamond text-xl font-bold brand-text uppercase tracking-wider">
              Allocator.saas
            </span>
            <span className="text-[10px] font-mono text-[#888888] px-2 py-0.5 bg-[#051C2C]/5 rounded-full uppercase tracking-wide">
              V2.0 Solver
            </span>
          </div>

          {/* Navigation Tabs for switching strategic views */}
          <div className="flex h-full items-center gap-1">
            
            <button
              onClick={() => setActiveTab('EXECUTIVE')}
              className={`h-full px-3 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
                activeTab === 'EXECUTIVE'
                  ? 'border-[#2251FF] text-[#051C2C] font-semibold'
                  : 'border-transparent text-[#888888] hover:text-[#051C2C]'
              }`}
            >
              <LayoutDashboard size={13} />
              Executive Dashboard
            </button>

            <button
              onClick={() => setActiveTab('SCENARIOS')}
              className={`h-full px-3 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
                activeTab === 'SCENARIOS'
                  ? 'border-[#2251FF] text-[#051C2C] font-semibold'
                  : 'border-transparent text-[#888888] hover:text-[#051C2C]'
              }`}
            >
              <Layers size={13} />
              Scenario Comparison
            </button>

            <button
              onClick={() => setActiveTab('PORTFOLIO')}
              className={`h-full px-3 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
                activeTab === 'PORTFOLIO'
                  ? 'border-[#2251FF] text-[#051C2C] font-semibold'
                  : 'border-transparent text-[#888888] hover:text-[#051C2C]'
              }`}
            >
              <BarChart2 size={13} />
              Portfolio Risk
            </button>

            <button
              onClick={() => setActiveTab('LEDGER')}
              className={`h-full px-3 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
                activeTab === 'LEDGER'
                  ? 'border-[#2251FF] text-[#051C2C] font-semibold'
                  : 'border-transparent text-[#888888] hover:text-[#051C2C]'
              }`}
            >
              <History size={13} />
              Historical Ledger
            </button>

            <button
              onClick={() => setActiveTab('RULES')}
              className={`h-full px-3 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
                activeTab === 'RULES'
                  ? 'border-[#2251FF] text-[#051C2C] font-semibold'
                  : 'border-transparent text-[#888888] hover:text-[#051C2C]'
              }`}
            >
              <Settings size={13} />
              Solver Rules
            </button>

            <button
              onClick={() => setActiveTab('SIMULATION')}
              className={`h-full px-3 text-xs font-semibold uppercase tracking-[0.06em] flex items-center gap-1.5 transition-all duration-150 border-b-2 ${
                activeTab === 'SIMULATION'
                  ? 'border-[#2251FF] text-[#051C2C] font-semibold'
                  : 'border-transparent text-[#888888] hover:text-[#051C2C]'
              }`}
            >
              <CloudRain size={13} />
              Monte Carlo
            </button>

          </div>
        </div>
      </nav>

      {/* Main Container Area with maximum 1400px width layout, with 40px left/right padding */}
      <main className="max-w-[1400px] w-full mx-auto px-10 py-10 flex-1 flex flex-col gap-8">
        
        {/* Header Block with title in EB Garamond font with negative tracking */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-[28px] font-garamond font-bold brand-text tracking-tight-titles leading-tight">
              Marketing Budget Allocation Simulator
            </h1>
            <p className="text-[13px] text-[#888888] mt-1">
              Analyze non-linear diminishing returns, simulate with Monte Carlo, and optimize budgets in real-time.
            </p>
          </div>

          {/* Last Saved indicator in status panel */}
          <div className="text-right flex items-center gap-2 px-3 py-1.5 bg-white card-shadow rounded-[14px] text-xs font-mono text-[#888888]">
            <CheckCircle size={14} className="text-[#00C853]" />
            <span>Last saved: {lastSaved || 'Auto-Syncing'}</span>
          </div>
        </div>

        {/* Dynamic view router */}
        <div className="space-y-6">
          {activeTab === 'EXECUTIVE' && (
            <ExecutiveDashboard
              settings={settings}
              historicalDataLength={historicalData.length}
              benchmarks={benchmarks}
              curves={marginalCurves}
              constraints={constraints}
              customAllocations={customAllocations}
              onUpdateAllocations={handleUpdateAllocations}
              onApplyOptimal={handleApplyOptimal}
              simulation={simulation}
              currentMetrics={currentMetrics}
              optimizedMetrics={optimizedMetrics}
              customMetrics={customMetrics}
            />
          )}

          {activeTab === 'SCENARIOS' && (
            <ScenarioMatrix
              settings={settings}
              benchmarks={benchmarks}
              curves={marginalCurves}
              constraints={constraints}
              scenarios={scenarios}
              customAllocations={customAllocations}
              onLoadScenario={handleLoadScenario}
              onSaveCurrentAsScenario={handleSaveCurrentAsScenario}
              onExportBackup={handleExportBackup}
              onImportBackup={handleImportBackup}
              onResetData={handleResetData}
              currentMetrics={currentMetrics}
              optimizedMetrics={optimizedMetrics}
              customMetrics={customMetrics}
              onRunMC={runMCSimulationForScenario}
            />
          )}

          {activeTab === 'PORTFOLIO' && (
            <PortfolioReport
              benchmarks={benchmarks}
              customAllocations={customAllocations}
            />
          )}

          {activeTab === 'LEDGER' && (
            <HistoricalLedger
              historicalData={historicalData}
              onAddRow={handleAddHistoricalRow}
              onDeleteRow={handleDeleteHistoricalRow}
              onUpdateRow={handleUpdateHistoricalRow}
            />
          )}

          {activeTab === 'RULES' && (
            <RulesConstraints
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              constraints={constraints}
              onUpdateConstraints={handleUpdateConstraints}
              curves={marginalCurves}
              onUpdateCurves={handleUpdateCurves}
            />
          )}

          {activeTab === 'SIMULATION' && (
            <SimulationConsole
              settings={settings}
              simulation={simulation}
            />
          )}
        </div>

      </main>

      {/* Corporate Dashboard Footer */}
      <footer className="py-6 border-t border-[#E8E8E6] bg-white text-center text-xs font-mono text-[#888888]">
        <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center">
          <span>&copy; 2026 Marketing Portfolio Optimization Group. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-[#051C2C] cursor-pointer">Security Terms</span>
            <span className="hover:text-[#051C2C] cursor-pointer">Solver API</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
