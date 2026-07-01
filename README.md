# [Marketing Budget Allocation Simulator](README)

![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform: Browser + Excel](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool Type: Decision Support](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Optimize marketing budget allocation using portfolio theory, marginal return curves, and Monte Carlo simulation — entirely in a free browser tool or Excel workbook, with no installation or signup required.**

> ## **No signup. No installation. Free.**
>
> 🌐 **Open in Browser** → *HTML version coming soon*
>
> 📥 **Download Excel** → *GitHub Release / Gumroad download link*
>
> Available in both **browser** and **Excel** formats.

---

# Screenshots

### Browser Version

<!-- screenshot: browser version -->

*Interactive executive dashboard showing recommended budget allocation, channel risk exposure, and expected revenue uplift.*

### Excel Version

<!-- screenshot: excel version -->

*Excel decision model displaying portfolio optimization results, marginal return curves, and scenario comparison analysis.*

---

# What It Helps You Track

* Expected revenue impact of reallocating marketing spend across channels.
* Budget saturation points where additional spend stops producing efficient returns.
* Concentration risk from overdependence on individual acquisition channels.
* Probability of achieving revenue targets under uncertain market conditions.
* Operational capacity constraints before additional demand generation investment.
* Comparative performance between current, optimized, and alternative budget scenarios.

---

# Why I Built This

Most marketing budget decisions are still made using averages.

Teams examine historical ROAS reports, identify the channels with the highest apparent returns, and allocate more budget accordingly. Unfortunately, this approach fails precisely when budget decisions become important.

The problem is that marketing channels rarely behave linearly.

For example:

| Channel    | Historical ROAS | Current Spend | Recommended Using Average ROAS |
| ---------- | --------------: | ------------: | -----------------------------: |
| Google Ads |             4.0 |       $60,000 |                       Increase |
| SEO        |             3.8 |       $20,000 |                       Maintain |
| Referral   |             5.5 |            $0 |                         Ignore |

This recommendation appears rational.

However, after modeling marginal return decay, channel volatility, and concentration risk:

| Channel    | Marginal ROAS | Optimized Spend |
| ---------- | ------------: | --------------: |
| Google Ads |           3.2 |         $45,000 |
| SEO        |           4.1 |         $35,000 |
| Referral   |           5.5 |         $10,000 |

The optimal portfolio changes entirely.

The analytical failure is not a lack of reporting. The failure is treating capital allocation as a reporting exercise rather than an investment portfolio problem.

I built this tool to productize a repeatable decision framework:

* historical performance establishes baseline expectations,
* marginal return curves model diminishing efficiency,
* portfolio analysis quantifies concentration risk,
* Monte Carlo simulation estimates downside probability,
* optimization identifies the highest expected return within operational constraints.

This workbook is not a dashboard. It is a reusable reasoning framework for answering one question:

> **Given limited capital, where should the next dollar actually go?**

---

# Common Marketing Budget Problems This Solves

| Problem                                   | Without This Tool                                      | With This Tool                                             |
| ----------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| Budget allocation based on average ROAS   | Budget shifts amplify diminishing returns              | Marginal return curves identify efficient spend ranges     |
| Overdependence on one acquisition channel | Concentration risk remains invisible                   | HHI concentration monitoring generates risk warnings       |
| Capacity constraints ignored              | Marketing generates operational bottlenecks            | Capacity ceilings become optimization constraints          |
| Channel volatility overlooked             | High-risk channels receive excessive investment        | Portfolio volatility becomes measurable                    |
| Scenario planning performed manually      | Alternative strategies require rebuilding spreadsheets | Multiple allocation scenarios compare automatically        |
| Revenue forecasting assumes certainty     | Budget decisions ignore downside risk                  | Monte Carlo simulation estimates probability distributions |

---

# Who This Is For

This tool is designed for:

* marketing directors managing multi-channel acquisition portfolios,
* founders allocating constrained growth budgets,
* agencies optimizing paid media portfolios,
* finance teams evaluating marketing capital efficiency,
* operators balancing acquisition performance against fulfillment capacity.

This tool is **not** designed for:

* enterprise marketing automation platforms,
* attribution platform replacement,
* campaign execution management,
* real-time advertising operations.

No spreadsheet expertise is required. Open the browser version and begin evaluating budget allocation decisions immediately.

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
