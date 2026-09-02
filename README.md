# Marketing Budget Allocation Simulator & Spend Optimization Tool

![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform: Browser + Excel](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool Type: Decision Support](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Optimize your cross-channel marketing budget allocation using portfolio theory, marginal return curves (ROAS decay), and Monte Carlo simulation. This free digital marketing spend planner and Excel template helps CMOs, marketing directors, and media buyers forecast ROI and eliminate ad spend waste.**

**No signup. No installation. Free in your browser.**

Test your scenarios using our free web app. For teams needing recurring quarterly planning and customized historical data inputs, the unlocked Excel version is available with a 30-day, no-questions-asked money-back guarantee.

> 🌐 **Test Scenarios in Browser** → [*Launch Free Marketing Budget Simulator*](https://hyvoid.github.io/Marketing-Budget-Allocation-Simulator/)
>
> 📥 **Get the Reusable Template** → [*Download Excel Marketing Budget Allocation Model*](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation)

---

## 🎯 Overcome Marketing Spend Pain Points (What This Tool Solves)

Stop relying on basic averages. This budget optimization framework maps common digital marketing pain points directly to data-driven solutions:

* **Pain Point: Wasted ad spend on maxed-out channels.** 
  * **Solution:** Identifies **budget saturation points** where additional ad spend stops producing efficient marginal returns (ROAS decay tracking).
* **Pain Point: Guessing cross-channel budget shifts.** 
  * **Solution:** Forecasts the **expected revenue impact** of reallocating marketing spend across Paid Search, SEO, and Social Media channels.
* **Pain Point: Sudden revenue drops due to platform algorithm changes.** 
  * **Solution:** Quantifies **concentration risk** using the HHI index to prevent overdependence on a single customer acquisition channel.
* **Pain Point: Unpredictable B2B or B2C sales cycles.** 
  * **Solution:** Runs **Monte Carlo simulations** to calculate the exact probability of achieving your quarterly revenue targets under uncertain market conditions.
* **Pain Point: Generating leads the sales team can't handle.** 
  * **Solution:** Maps **operational capacity constraints** against demand generation investment to ensure sustainable scaling.

---

## ⚙️ Quick Start Workflow: How to Optimize Your Budget Today

Transform your budget planning from guesswork to a predictable revenue engine in four steps:

1. **Input Baseline Metrics:** Enter your historical channel performance (e.g., Google Ads, SEO, Meta Ads) including Current Ad Spend and Average ROAS into the dashboard.
2. **Define Constraints & Capacity:** Set your total marketing budget cap and internal operational limits (e.g., maximum monthly leads or booked jobs).
3. **Run the Simulation Engine:** Let the tool calculate your marginal return curves and generate Monte Carlo downside risk probabilities.
4. **Export & Standardize (CTA):** Review the optimized budget mix in the browser. For recurring monthly adjustments and saving complex historical datasets, [**download the permanent Excel Allocation Template**](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation) to build a repeatable financial forecasting workflow.

---

## 💡 Why I Built This Capital Allocation Framework

Most marketing budget decisions are still made using flawed historical averages. 

Growth teams examine historical ROAS reports, identify the digital marketing channels with the highest apparent returns, and blindly allocate more budget accordingly. Unfortunately, this naive approach fails precisely when scaling campaigns.

The core issue: **Digital customer acquisition channels rarely behave linearly.**

For example, look at this flawed standard allocation approach:

| Digital Marketing Channel | Historical Average ROAS (Baseline) | Current Ad Spend Allocation | Recommended Action (Flawed Average Method) |
| ------------------------- | ---------------------------------: | --------------------------: | -----------------------------------------: |
| Google Search Ads         |                                4.0 |                     $60,000 |                  Scale Up (Max Investment) |
| Organic SEO               |                                3.8 |                     $20,000 |                       Maintain Current Run |
| Partner Referral          |                                5.5 |                          $0 |                      Ignore (No past data) |

This recommendation appears rational on a standard marketing dashboard. 

However, after running the data through our **Marginal Return Decay Engine**, factoring in **Channel Volatility (Risk)**, and calculating **Portfolio Concentration**, the reality shifts:

| Digital Marketing Channel | True Marginal ROAS (Next Dollar) | Optimized Spend Recommendation |
| ------------------------- | -------------------------------: | -----------------------------: |
| Google Search Ads         |                              3.2 |        $45,000 (Reduce Spend)  |
| Organic SEO               |                              4.1 |        $35,000 (Scale Spend)   |
| Partner Referral          |                              5.5 |        $10,000 (Test Budget)   |

The optimal marketing portfolio changes entirely. 

The analytical failure is not a lack of marketing attribution reporting. The failure is treating capital allocation as a reporting exercise rather than an **investment portfolio problem**.

I built this software to productize a repeatable financial decision framework:
* Historical performance establishes baseline expectations.
* Marginal return curves model diminishing ad efficiency (ROAS decay).
* Portfolio analysis quantifies platform concentration risk.
* Monte Carlo simulation estimates downside revenue probability.
* Linear optimization identifies the highest expected return within operational constraints.

> **Given limited marketing capital, where should the next dollar actually go?** This tool provides the mathematical answer.

---

## 👥 Who This Is For (Use Cases & Scenarios)

This decision-support tool is specifically designed for distinct marketing and finance roles:

* **CMOs & VP of Marketing:** Need a high-level *marketing budget forecasting template* to defend quarterly budget requests to the board using probability mathematics rather than gut feelings.
* **Performance Marketing Directors:** Seeking *paid media allocation software* to balance customer acquisition cost (CAC) across Google, Meta, and TikTok ad portfolios.
* **B2B Growth Marketers & Demand Gen Leads:** Looking for an *ROI forecasting calculator* to balance lead generation velocity against sales team operational capacity.
* **Fractional CMOs & Marketing Agencies:** Need a repeatable *cross-channel budget auditing framework* to quickly show new clients where their current budget is bleeding efficiency.
* **FP&A / Finance Teams:** Evaluating *marketing capital efficiency* to ensure demand generation investments align with corporate risk profiles.

**Who it is NOT for:**
* Enterprise marketing automation replacements (e.g., HubSpot, Marketo).
* Multi-touch attribution tracking software (e.g., Northbeam, TripleWhale).
* Real-time programmatic ad bidding execution.

No advanced spreadsheet or coding expertise is required.

---

# About

I build lightweight decision-support tools for situations where there are too many interacting variables to reliably manage mentally.

The question behind most of these tools is simple:

> **What information needs to exist in one place to make the next decision confidently?**

The Marketing Budget Allocation Simulator is one example of this approach: converting marketing budget allocation from intuition and reporting into a repeatable analytical framework.

---

# Technical Details

<details>
<summary>For technical reviewers, Excel practitioners, and collaborators</summary>

## ### Workbook Architecture

| Layer  | Worksheet              | Purpose                                       |
| ------ | ---------------------- | --------------------------------------------- |
| Input  | 01_Settings            | Global simulation and optimization parameters |
| Input  | 02_Historical_Data     | Historical channel performance                |
| Input  | 03_Constraints         | Budget and operational constraints            |
| Input  | 04_Marginal_Curves     | Diminishing return functions                  |
| Input  | 05_Scenario_Inputs     | Alternative scenario definitions              |
| Engine | 06_Benchmark_Engine    | Baseline performance metrics                  |
| Engine | 07_Risk_Engine         | Volatility and concentration analysis         |
| Engine | 08_Optimization_Solver | Portfolio optimization                        |
| Engine | 09_Simulation_Engine   | Monte Carlo simulation                        |
| Output | 10_Executive_Summary   | Executive recommendations                     |
| Output | 11_Scenario_Comparison | Scenario comparison                           |
| Output | 12_Portfolio_Report    | Portfolio classification                      |

### Data Flow

```text
Settings
    ↓
Historical Data
    ↓
Benchmark Engine
    ↓
Risk Engine
    ↓
Marginal Curves
    ↓
Optimization Solver
    ↓
Monte Carlo Simulation
    ↓
Executive Dashboard
```

---

## ### Three Traps That Catch Even Experienced Marketing Teams

### Trap 1 — Assuming ROAS Is Constant

A decision was made:

```text
Google Ads ROAS = 4.0
Increase budget from $60k to $100k
```

The unnoticed assumption:

```text
ROAS remains constant regardless of spend level.
```

#### Result

| Spend | Assumed Revenue | Actual Marginal Revenue |
| ----- | --------------: | ----------------------: |
| $60k  |           $240k |                   $240k |
| $100k |           $400k |                   $320k |

The recommendation becomes incorrect because marginal efficiency declines.

Correct approach:

* model budget ranges,
* estimate marginal ROAS,
* optimize against piecewise returns.

<details>
<summary>Formula implementation</summary>

```excel
=LET(
target_channel,A2,
allocated_budget,B2,
tier_starts,FILTER(...),
tier_ends,FILTER(...),
m_roas,FILTER(...),
segments,
MAP(
tier_starts,
tier_ends,
m_roas,
LAMBDA(s,e,r,
MIN(MAX(allocated_budget-s,0),e-s)*r
)),
SUM(segments))
```

</details>

---

### Trap 2 — Ignoring Portfolio Concentration Risk

A decision was made:

```text
Allocate 60% of budget to Google Ads.
```

The unnoticed metric:

```text
HHI concentration index.
```

| Allocation  |  HHI |
| ----------- | ---: |
| 60/20/20    | 0.44 |
| 45/35/10/10 | 0.34 |

The first portfolio produces substantially greater platform dependency risk.

Correct approach:

```excel
=SUMSQ(Allocation_Range)
```

When:

```text
HHI > 0.30
```

risk alerts activate.

<details>
<summary>Formula implementation</summary>

```excel
=SUMSQ(Recommended_Allocation_Pct_Range)
```

</details>

---

### Trap 3 — Treating Forecasts As Certainties

A decision was made:

```text
Expected revenue = $368,000
```

The unnoticed assumption:

```text
Future performance equals average historical performance.
```

Monte Carlo simulation revealed:

| Metric             | Value |
| ------------------ | ----: |
| Mean               | $368k |
| Std Dev            |  $82k |
| P(Revenue > $400k) |   37% |
| P(Revenue < $250k) |   18% |

The recommendation changed from:

```text
"Expected revenue is $368k."
```

to:

```text
"There is an 18% probability of severe underperformance."
```

<details>
<summary>Formula implementation</summary>

```excel
=NORM.INV(
RAND(),
Mean_ROAS,
Volatility
)
```

</details>

---

## ### Example Scenario

A B2B service company allocates:

| Channel    | Current Budget |
| ---------- | -------------: |
| Google Ads |        $60,000 |
| SEO        |        $20,000 |
| Facebook   |        $20,000 |
| Referral   |             $0 |

Historical analysis indicates:

| Channel    | Mean ROAS | Volatility |
| ---------- | --------: | ---------: |
| Google Ads |      3.68 |       0.12 |
| SEO        |      4.10 |       0.08 |
| Facebook   |      2.10 |       0.45 |
| Referral   |      5.50 |       0.60 |

Operational constraints:

* total budget: $100,000,
* maximum booked jobs: 120,
* minimum lead target: 350.

Optimization results:

| Channel    | Recommended Budget |
| ---------- | -----------------: |
| Google Ads |            $45,000 |
| SEO        |            $35,000 |
| Facebook   |            $10,000 |
| Referral   |            $10,000 |

Results:

* expected revenue increases from $320k to $368k,
* portfolio concentration decreases by 22%,
* expected booked jobs remain below capacity limits,
* downside risk probability remains acceptable.

Decision implication:

```text
The organization should diversify capital allocation
rather than increase spending on the historically
largest channel.
```

---

## ### Formula Reference

<details>
<summary>Benchmark Engine</summary>

```excel
=SORT(UNIQUE(FILTER(Channel,Channel<>"")))
=SUMIFS(Spend,Channel,A2#)
=SUMIFS(Revenue,Channel,A2#)
=Revenue/Spend
=Spend/Booked_Jobs
```

</details>

<details>
<summary>Risk Engine</summary>

```excel
=STDEV.S(ROAS)
=SUMSQ(Allocation)
```

</details>

<details>
<summary>Simulation Engine</summary>

```excel
=SEQUENCE(1000)
=NORM.INV(RAND(),Mean,SD)
=SUMPRODUCT()
=COUNTIF()
```

</details>

<details>
<summary>Optimization Engine</summary>

```excel
LET()
FILTER()
MAP()
LAMBDA()
MIN()
MAX()
SUM()
```

</details>

---

## ### Validation Rules

| Field             | Rule                    | Error Behavior       |
| ----------------- | ----------------------- | -------------------- |
| Historical months | Minimum 12 months       | Validation failure   |
| Spend             | Must be ≥ 0             | Reject input         |
| Revenue           | Must be ≥ 0             | Reject input         |
| Booked jobs       | ≤ leads                 | Warning              |
| Budget allocation | Sum equals total budget | Solver rejection     |
| Channel limits    | Within min/max          | Constraint violation |
| Marginal tiers    | Continuous intervals    | Calculation error    |
| Simulation count  | 100–5000                | Input validation     |
| Dynamic arrays    | No blocked spill ranges | #SPILL! error        |

</details>

---

## The Business Logic: Methodology & Commercial Impact

Many organizations treat marketing budget allocation as a backward-looking reporting exercise—simply scaling up yesterday's top-performing channels. In reality, digital customer acquisition is a **dynamic capital allocation problem**. 

This toolkit shifts the conversation from *“What was our historical ROAS?”* to *“Where will our next dollar generate the highest marginal return without exposing the business to unacceptable algorithm risk?”*

Here is the underlying financial methodology and how it solves specific commercial problems:

### 1. The Commercial Problem: The Linear Scaling Fallacy & Capital Waste
The most expensive mistake in digital marketing is assuming linear returns. If a $10,000 ad spend generates a 4.0 ROAS, marketing teams often incorrectly assume a $100,000 spend will yield the same efficiency. 
*   **The flaw of static averages:** Platforms like Meta and Google exhaust their highest-intent audiences first. As you scale spend, you pay more to reach lower-intent users, causing ROAS to drop. Blindly scaling based on historical averages guarantees wasted ad spend.
*   **The solution:** This toolkit replaces static averages with **Marginal Return Curves** to model reality.

### 2. The Core Methodology (How It Works)

The engine applies principles from quantitative finance and operations research to marketing data:

*   **Marginal ROAS Decay (Piecewise Functions):**
    The algorithm models the diminishing returns of every ad platform. It calculates the exact saturation point where a channel becomes inefficient, automatically recommending a budget shift to a secondary channel (like SEO or Referrals) before capital is wasted.
*   **Modern Portfolio Theory & Concentration Risk (HHI):**
    Treating marketing channels like an investment portfolio, the tool calculates the Herfindahl-Hirschman Index (HHI). If your revenue is 80% dependent on Meta Ads, you are one algorithm update away from a cash flow crisis. The model actively penalizes over-concentration, forcing diversification.
*   **Stochastic Forecasting (Monte Carlo Simulation):**
    B2B sales cycles and ad auctions are volatile. Instead of providing a single, deterministic revenue forecast that will inevitably be wrong, the engine runs thousands of simulated quarters using historical standard deviations. It outputs probability distributions (e.g., "There is an 18% statistical probability we miss our downside revenue target").
*   **Constrained Linear Optimization (Solver Engine):**
    It mathematically searches for the highest expected revenue while strictly obeying your business realities—such as maximum operational capacity (so you don't generate more leads than sales can close) and absolute budget caps.

### 3. The Commercial Output (Business Value)
By treating marketing as a quantifiable financial portfolio, the tool produces objective business intelligence:
*   **For the CMO & Board:** Provides mathematically defensible budget requests. You can replace "we think this will work" with "this allocation maximizes revenue while keeping downside risk below 15%."
*   **For Media Buyers:** Identifies exactly when to stop scaling a campaign, eliminating the guesswork of daily budget pacing.
*   **For Finance & Operations:** Ensures alignment between demand generation spending, working capital limits, and sales team capacity.

---

# Other Tools in This Series

* **Inventory Planning & Replenishment Simulator** — optimize purchasing decisions under uncertainty.
* **Paid Media Reporting Architecture Framework** — scalable reporting systems for agencies.
* **VAT Compliance & Calculation Console** — multi-platform tax reconciliation workflows.
* **Project Cost Allocation Dashboard** — operational profitability and labor analysis.
* **DTC Inventory Governance Console** — inventory risk management for multi-market brands.

More tools: **GitHub Profile / Gumroad Store**

---

# License

This project is licensed under the **Apache License 2.0**.

See the `LICENSE` file for details.
