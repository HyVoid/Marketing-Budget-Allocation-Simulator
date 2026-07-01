import { Channel, HistoricalRow, ConstraintRow, MarginalCurveRow, GlobalSettings, BenchmarkMetrics, PortfolioSummary, SimulationResult } from './types';

// Standard Deviation of sample
export function calculateStdev(values: number[]): number {
  if (values.length <= 1) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((sum, v) => sum + v, 0);
  return Math.sqrt(sumSquaredDiffs / (values.length - 1));
}

// Calculate benchmarks from historical ledger (Sheet 06_Benchmark_Engine & 07_Risk_Engine)
export function calculateHistoricalBenchmarks(
  historicalData: HistoricalRow[]
): BenchmarkMetrics[] {
  const channels: Channel[] = ['Google Ads', 'SEO', 'Facebook', 'Referral', 'Email', 'Offline'];
  
  return channels.map(channel => {
    const channelLogs = historicalData.filter(log => log.channel === channel);
    
    const totalSpend = channelLogs.reduce((sum, log) => sum + log.spend, 0);
    const totalRevenue = channelLogs.reduce((sum, log) => sum + log.revenue, 0);
    const totalLeads = channelLogs.reduce((sum, log) => sum + log.leads, 0);
    const totalBookedJobs = channelLogs.reduce((sum, log) => sum + log.bookedJobs, 0);
    
    const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
    const cac = totalBookedJobs > 0 ? totalSpend / totalBookedJobs : 0;

    // Monthly historical ROAS to calculate Volatility
    const monthlyRoas = channelLogs
      .filter(log => log.spend > 0)
      .map(log => log.revenue / log.spend);
    
    const volatility = monthlyRoas.length > 1 ? calculateStdev(monthlyRoas) : 0.15; // default fallback if data sparse

    // Markowitz Asset Classification (Sheet 12_Portfolio_Report)
    // Thresholds: ROAS target = 3.0, Volatility target = 0.20
    let classification: BenchmarkMetrics['classification'] = 'Cash Cow';
    let tacticalRecommendation = '';

    if (roas >= 3.0 && volatility < 0.20) {
      classification = 'Star';
      tacticalRecommendation = 'Robust performer with high return and low risk. Aggressively scale budget.';
    } else if (roas >= 3.0 && volatility >= 0.20) {
      classification = 'Gamble';
      tacticalRecommendation = 'High potential returns but extremely unstable. Strictly cap budget and hedge risk.';
    } else if (roas < 3.0 && volatility < 0.20) {
      classification = 'Cash Cow';
      tacticalRecommendation = 'Stable capture rate with lower returns. Maintain steady baseline funding for liquidity.';
    } else {
      classification = 'Exit';
      tacticalRecommendation = 'Inefficient, high-cost and volatile channel. Systematically phase out and reallocate funds.';
    }

    return {
      channel,
      totalSpend,
      totalRevenue,
      totalLeads,
      totalBookedJobs,
      roas,
      cac,
      volatility,
      classification,
      tacticalRecommendation
    };
  });
}

// Calculate expected revenue based on Marginal Curves (Sheet 08_Optimization_Solver)
export function calculateExpectedRevenueForChannel(
  spend: number,
  channel: Channel,
  curves: MarginalCurveRow[]
): number {
  const channelCurves = curves
    .filter(row => row.channel === channel)
    .sort((a, b) => a.start - b.start);

  let expectedRevenue = 0;
  
  for (const tier of channelCurves) {
    if (spend <= tier.start) {
      break;
    }
    const effectiveSpendInTier = Math.min(spend - tier.start, tier.end - tier.start);
    expectedRevenue += effectiveSpendInTier * tier.roas;
  }

  return expectedRevenue;
}

// Calculate expected leads and booked jobs based on historical benchmarks and allocation
export function calculateExpectedMetrics(
  allocations: Record<Channel, number>,
  benchmarks: BenchmarkMetrics[],
  curves: MarginalCurveRow[]
) {
  let totalSpend = 0;
  let totalRevenue = 0;
  let totalLeads = 0;
  let totalBookedJobs = 0;

  const channelMetrics = (Object.keys(allocations) as Channel[]).map(channel => {
    const spend = allocations[channel];
    const bench = benchmarks.find(b => b.channel === channel);
    
    const revenue = calculateExpectedRevenueForChannel(spend, channel, curves);
    
    // Extrapolate leads and booked jobs
    const avgLeadCost = bench && bench.totalSpend > 0 ? bench.totalSpend / bench.totalLeads : 120;
    const conversionRate = bench && bench.totalLeads > 0 ? bench.totalBookedJobs / bench.totalLeads : 0.35;
    
    const leads = avgLeadCost > 0 ? spend / avgLeadCost : 0;
    const bookedJobs = leads * conversionRate;

    totalSpend += spend;
    totalRevenue += revenue;
    totalLeads += leads;
    totalBookedJobs += bookedJobs;

    return {
      channel,
      spend,
      revenue,
      leads,
      bookedJobs,
      roas: spend > 0 ? revenue / spend : 0,
      cac: bookedJobs > 0 ? spend / bookedJobs : 0
    };
  });

  return {
    totalSpend,
    totalRevenue,
    totalLeads,
    totalBookedJobs,
    roas: totalSpend > 0 ? totalRevenue / totalSpend : 0,
    cac: totalBookedJobs > 0 ? totalSpend / totalBookedJobs : 0,
    channels: channelMetrics
  };
}

// Coordinate Descent Solver to maximize expected revenue subject to constraints and total budget
export function solveOptimalBudget(
  totalBudget: number,
  constraints: ConstraintRow[],
  curves: MarginalCurveRow[]
): Record<Channel, number> {
  const channels: Channel[] = ['Google Ads', 'SEO', 'Facebook', 'Referral', 'Email', 'Offline'];
  
  // Step 1: Initialize allocations to their minimum spends
  const allocations: Record<Channel, number> = {} as any;
  channels.forEach(ch => {
    const cons = constraints.find(c => c.channel === ch);
    allocations[ch] = cons ? cons.minSpend : 0;
  });

  // Verify if sum of minimum spend exceeds budget
  const sumMinSpend = Object.values(allocations).reduce((sum, v) => sum + v, 0);
  if (sumMinSpend >= totalBudget) {
    // Pro-rata reduction
    const scale = totalBudget / sumMinSpend;
    channels.forEach(ch => {
      allocations[ch] = Math.max(0, allocations[ch] * scale);
    });
    return allocations;
  }

  // Step 2: Greedily allocate the remaining budget in tiny increments
  let remainingBudget = totalBudget - sumMinSpend;
  const step = 20; // smaller step size = higher precision

  while (remainingBudget > 0) {
    let bestChannel: Channel | null = null;
    let highestMarginalRoas = -1;

    for (const ch of channels) {
      const cons = constraints.find(c => c.channel === ch);
      const currentSpend = allocations[ch];
      const maxLimit = cons ? cons.maxSpend : 100000;

      if (currentSpend < maxLimit) {
        // Find marginal ROAS for next dollar
        const mc = curves
          .filter(row => row.channel === ch)
          .find(row => currentSpend >= row.start && currentSpend < row.end);
        
        const marginalRoas = mc ? mc.roas : 0;
        
        if (marginalRoas > highestMarginalRoas) {
          highestMarginalRoas = marginalRoas;
          bestChannel = ch;
        }
      }
    }

    // If no channel can take more budget, we break
    if (!bestChannel || highestMarginalRoas <= 0) {
      break;
    }

    const cons = constraints.find(c => c.channel === bestChannel);
    const maxLimit = cons ? cons.maxSpend : 100000;
    const currentSpend = allocations[bestChannel];
    
    const allocationStep = Math.min(step, remainingBudget, maxLimit - currentSpend);
    allocations[bestChannel] += allocationStep;
    remainingBudget -= allocationStep;

    if (allocationStep <= 0) {
      break; // Safe exit
    }
  }

  // Round values for business-ready numbers
  channels.forEach(ch => {
    allocations[ch] = Math.round(allocations[ch] * 100) / 100;
  });

  return allocations;
}

// Calculate Herfindahl-Hirschman Index (Concentration Matrix)
export function calculateHHI(allocations: Record<Channel, number>): number {
  const total = Object.values(allocations).reduce((sum, v) => sum + v, 0);
  if (total <= 0) return 0;

  let sumSquares = 0;
  (Object.keys(allocations) as Channel[]).forEach(ch => {
    const share = allocations[ch] / total;
    sumSquares += Math.pow(share, 2);
  });

  return sumSquares;
}

// Box-Muller transform for normal random variables
export function randomNormal(mean: number, stdDev: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * stdDev + mean;
}

// Monte Carlo Simulator (1,000 runs) (Sheet 09_Simulation_Engine)
export function runMonteCarloSimulation(
  allocations: Record<Channel, number>,
  benchmarks: BenchmarkMetrics[],
  curves: MarginalCurveRow[],
  settings: GlobalSettings
): SimulationResult {
  const runsCount = settings.simulationRuns || 1000;
  const revenues: number[] = [];

  const channels = Object.keys(allocations) as Channel[];

  for (let i = 0; i < runsCount; i++) {
    let simRevenue = 0;

    channels.forEach(ch => {
      const spend = allocations[ch];
      if (spend <= 0) return;

      const bench = benchmarks.find(b => b.channel === ch);
      const expectedRev = calculateExpectedRevenueForChannel(spend, ch, curves);
      const expectedRoas = expectedRev / spend;
      const volatility = bench ? bench.volatility : 0.20;

      // Simulate random ROAS based on normal distribution
      const simRoas = Math.max(0, randomNormal(expectedRoas, volatility));
      simRevenue += spend * simRoas;
    });

    revenues.push(simRevenue);
  }

  const sumRevenue = revenues.reduce((sum, v) => sum + v, 0);
  const meanRevenue = sumRevenue / runsCount;

  const squaredDiffs = revenues.map(v => Math.pow(v - meanRevenue, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((sum, v) => sum + v, 0);
  const stdDevRevenue = Math.sqrt(sumSquaredDiffs / (runsCount - 1));

  const targetGoal = settings.targetRevenueGoal || 110000;
  const downsideThreshold = settings.downsideRevenueThreshold || 70000;

  const successRuns = revenues.filter(v => v >= targetGoal).length;
  const downsideRuns = revenues.filter(v => v < downsideThreshold).length;

  return {
    meanRevenue,
    stdDevRevenue,
    probabilityOfTarget: successRuns / runsCount,
    probabilityOfDownside: downsideRuns / runsCount,
    runs: revenues
  };
}
