import { HistoricalRow, ConstraintRow, MarginalCurveRow, GlobalSettings, Scenario, Channel } from './types';

// Global parameters
export const DEFAULT_SETTINGS: GlobalSettings = {
  totalBudget: 100000,
  minLeadsTarget: 350,
  bookedJobsCapacity: 120,
  simulationRuns: 1000,
  targetRevenueGoal: 110000,
  downsideRevenueThreshold: 70000,
};

// Preset hard limits
export const DEFAULT_CONSTRAINTS: ConstraintRow[] = [
  { channel: 'Google Ads', minSpend: 0, maxSpend: 80000 },
  { channel: 'SEO', minSpend: 1000, maxSpend: 40000 },
  { channel: 'Facebook', minSpend: 0, maxSpend: 30000 },
  { channel: 'Referral', minSpend: 0, maxSpend: 15000 },
  { channel: 'Email', minSpend: 500, maxSpend: 20000 },
  { channel: 'Offline', minSpend: 0, maxSpend: 25000 },
];

// Marginal ROAS curves (decreasing marginal returns)
export const DEFAULT_MARGINAL_CURVES: MarginalCurveRow[] = [
  // Google Ads Tiers
  { id: 'mc_g1', channel: 'Google Ads', start: 0, end: 15000, roas: 4.2 },
  { id: 'mc_g2', channel: 'Google Ads', start: 15000, end: 35000, roas: 3.2 },
  { id: 'mc_g3', channel: 'Google Ads', start: 35000, end: 60000, roas: 2.2 },
  { id: 'mc_g4', channel: 'Google Ads', start: 60000, end: 120000, roas: 1.2 },

  // SEO Tiers
  { id: 'mc_s1', channel: 'SEO', start: 0, end: 10000, roas: 4.8 },
  { id: 'mc_s2', channel: 'SEO', start: 10000, end: 25000, roas: 3.8 },
  { id: 'mc_s3', channel: 'SEO', start: 25000, end: 45000, roas: 2.8 },
  { id: 'mc_s4', channel: 'SEO', start: 45000, end: 100000, roas: 1.5 },

  // Facebook Tiers
  { id: 'mc_f1', channel: 'Facebook', start: 0, end: 12000, roas: 3.6 },
  { id: 'mc_f2', channel: 'Facebook', start: 12000, end: 25000, roas: 2.6 },
  { id: 'mc_f3', channel: 'Facebook', start: 25000, end: 50000, roas: 1.6 },
  { id: 'mc_f4', channel: 'Facebook', start: 50000, end: 100000, roas: 0.9 },

  // Referral Tiers
  { id: 'mc_r1', channel: 'Referral', start: 0, end: 5000, roas: 5.8 },
  { id: 'mc_r2', channel: 'Referral', start: 5000, end: 12000, roas: 4.3 },
  { id: 'mc_r3', channel: 'Referral', start: 12000, end: 25000, roas: 2.2 },
  { id: 'mc_r4', channel: 'Referral', start: 25000, end: 60000, roas: 0.8 },

  // Email Tiers
  { id: 'mc_e1', channel: 'Email', start: 0, end: 8000, roas: 5.2 },
  { id: 'mc_e2', channel: 'Email', start: 8000, end: 18000, roas: 3.9 },
  { id: 'mc_e3', channel: 'Email', start: 18000, end: 30000, roas: 2.4 },
  { id: 'mc_e4', channel: 'Email', start: 30000, end: 80000, roas: 1.1 },

  // Offline Tiers
  { id: 'mc_o1', channel: 'Offline', start: 0, end: 15000, roas: 2.2 },
  { id: 'mc_o2', channel: 'Offline', start: 15000, end: 40000, roas: 1.4 },
  { id: 'mc_o3', channel: 'Offline', start: 40000, end: 100000, roas: 0.7 },
];

// Presets
export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: 'sc_current',
    name: 'Current Spend Pattern',
    isCustom: false,
    allocations: {
      'Google Ads': 60000,
      'SEO': 20000,
      'Facebook': 20000,
      'Referral': 0,
      'Email': 0,
      'Offline': 0,
    },
  },
  {
    id: 'sc_conservative',
    name: 'Conservative Balanced',
    isCustom: false,
    allocations: {
      'Google Ads': 25000,
      'SEO': 30000,
      'Facebook': 10000,
      'Referral': 5000,
      'Email': 15000,
      'Offline': 15000,
    },
  },
  {
    id: 'sc_aggressive',
    name: 'Aggressive Digital Growth',
    isCustom: false,
    allocations: {
      'Google Ads': 40000,
      'SEO': 20000,
      'Facebook': 25000,
      'Referral': 8000,
      'Email': 2000,
      'Offline': 5000,
    },
  },
  {
    id: 'sc_digital_first',
    name: 'Pure Online Direct',
    isCustom: false,
    allocations: {
      'Google Ads': 45000,
      'SEO': 25000,
      'Facebook': 20000,
      'Referral': 5000,
      'Email': 5000,
      'Offline': 0,
    },
  },
];

// Procedural generation of historical records to keep code clean and comprehensive
export const generateDefaultHistoricalData = (): HistoricalRow[] => {
  const channels: Channel[] = ['Google Ads', 'SEO', 'Facebook', 'Referral', 'Email', 'Offline'];
  const months = [
    '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
    '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
  ];

  // Deterministic coefficients for generating high fidelity data
  const profiles: Record<Channel, { spendBase: number, roasBase: number, leadCost: number, closeRate: number, volatility: number }> = {
    'Google Ads': { spendBase: 10000, roasBase: 3.68, leadCost: 150, closeRate: 0.35, volatility: 0.12 },
    'SEO': { spendBase: 4000, roasBase: 4.10, leadCost: 120, closeRate: 0.40, volatility: 0.08 },
    'Facebook': { spendBase: 5000, roasBase: 2.10, leadCost: 180, closeRate: 0.25, volatility: 0.45 },
    'Referral': { spendBase: 1200, roasBase: 5.50, leadCost: 90, closeRate: 0.55, volatility: 0.60 },
    'Email': { spendBase: 1500, roasBase: 4.80, leadCost: 80, closeRate: 0.42, volatility: 0.15 },
    'Offline': { spendBase: 6000, roasBase: 1.85, leadCost: 250, closeRate: 0.30, volatility: 0.22 },
  };

  const rows: HistoricalRow[] = [];

  months.forEach((m, mIdx) => {
    // Generate slight seasonality swing
    const seasonalFactor = 1 + 0.15 * Math.sin((mIdx / 11) * Math.PI * 2);

    channels.forEach((c) => {
      const p = profiles[c];
      
      // Deterministic variations based on month index and channel name length to avoid global Math.random on startup
      const hash = (mIdx * 7 + c.length * 13) % 100;
      const noise = (hash - 50) / 100; // between -0.5 and 0.5
      
      const spend = Math.round(p.spendBase * (1 + noise * 0.15) * seasonalFactor);
      
      // Actual ROAS includes volatility noise
      const actualRoas = Math.max(0.5, p.roasBase * (1 + noise * p.volatility) * (0.95 + 0.1 * Math.cos(mIdx)));
      const revenue = Math.round(spend * actualRoas);
      
      // Calculate leads and booked jobs
      const leads = Math.max(1, Math.round(spend / (p.leadCost * (1 + noise * 0.1))));
      const bookedJobs = Math.max(0, Math.min(leads, Math.round(leads * p.closeRate * (1 + noise * 0.05))));

      rows.push({
        id: `hist_${m}_${c.replace(/\s+/g, '_')}`,
        month: m,
        channel: c,
        spend,
        leads,
        bookedJobs,
        revenue,
      });
    });
  });

  return rows;
};
