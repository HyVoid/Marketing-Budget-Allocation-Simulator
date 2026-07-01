export type Channel = 'Google Ads' | 'SEO' | 'Facebook' | 'Referral' | 'Email' | 'Offline';

export const CHANNELS: Channel[] = ['Google Ads', 'SEO', 'Facebook', 'Referral', 'Email', 'Offline'];

export interface HistoricalRow {
  id: string;
  month: string; // YYYY-MM
  channel: Channel;
  spend: number;
  leads: number;
  bookedJobs: number;
  revenue: number;
}

export interface ConstraintRow {
  channel: Channel;
  minSpend: number;
  maxSpend: number;
}

export interface MarginalCurveRow {
  id: string;
  channel: Channel;
  start: number; // Tier Start
  end: number;   // Tier End
  roas: number;  // Expected Marginal ROAS
}

export interface GlobalSettings {
  totalBudget: number;
  minLeadsTarget: number;
  bookedJobsCapacity: number;
  simulationRuns: number;
  targetRevenueGoal: number;
  downsideRevenueThreshold: number;
}

export interface Scenario {
  id: string;
  name: string;
  isCustom: boolean;
  allocations: Record<Channel, number>;
}

export interface BenchmarkMetrics {
  channel: Channel;
  totalSpend: number;
  totalRevenue: number;
  totalLeads: number;
  totalBookedJobs: number;
  roas: number;
  cac: number;
  volatility: number;
  classification: 'Star' | 'Gamble' | 'Cash Cow' | 'Exit';
  tacticalRecommendation: string;
}

export interface PortfolioSummary {
  hhi: number;
  concentrationRisk: 'Low' | 'Moderate' | 'High';
  totalSpend: number;
  expectedRevenue: number;
  expectedRoas: number;
}

export interface SimulationResult {
  meanRevenue: number;
  stdDevRevenue: number;
  probabilityOfTarget: number;
  probabilityOfDownside: number;
  runs: number[];
}
