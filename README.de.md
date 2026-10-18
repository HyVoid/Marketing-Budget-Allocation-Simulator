[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Marketing Budget Allocation Simulator & Tool zur Ausgabenoptimierung

![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform: Browser + Excel](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool Type: Decision Support](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Optimieren Sie Ihre kanalübergreifende Marketing-Budget-Allokation mit Portfoliotheorie, Grenzertragskurven (ROAS-Decay) und Monte-Carlo-Simulation. Dieser kostenlose digitale Marketing-Ausgabenplaner und die Excel-Vorlage helfen CMOs, Marketing-Direktoren und Media-Einkäufern, den ROI zu prognostizieren und Anzeigenverschwendung zu eliminieren.**

**Keine Registrierung. Keine Installation. Kostenlos in Ihrem Browser.**

Testen Sie Ihre Szenarien mit unserer kostenlosen Web-App. Für Teams, die wiederkehrende Quartalsplanung und angepasste historische Dateneingaben benötigen, ist die freigeschaltete Excel-Version mit 30-tägiger Geld-zurück-Garantie ohne Fragen verfügbar.

> 🌐 **Szenarien im Browser testen** → [*Kostenlosen Marketing-Budget-Simulator starten*](https://hyvoid.github.io/Marketing-Budget-Allocation-Simulator/)
>
> 📥 **Die wiederverwendbare Vorlage holen** → [*Excel-Modell zur Marketing-Budget-Allokation herunterladen*](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation)

---

## 🎯 Marketing-Schmerzpunkte bei Ausgaben überwinden (Was dieses Tool löst)

Hören Sie auf, sich auf einfache Durchschnittswerte zu verlassen. Dieses Budget-Optimierungs-Framework ordnet gängige digitale Marketing-Schmerzpunkte direkt datengesteuerten Lösungen zu:

* **Schmerzpunkt: Verschwendete Anzeigenausgaben in gesättigten Kanälen.** 
  * **Lösung:** Identifiziert **Budget-Sättigungspunkte**, an denen zusätzliche Anzeigenausgaben keine effizienten Grenzerträge mehr erzeugen (ROAS-Decay-Tracking).
* **Schmerzpunkt: Raten bei kanalübergreifenden Budget-Verschiebungen.** 
  * **Lösung:** Prognostiziert die **erwartete Umsatzauswirkung** einer Neuallokation von Marketingausgaben über die Kanäle Paid Search, SEO und Social Media.
* **Schmerzpunkt: Plötzliche Umsatzeinbrüche durch Plattform-Algorithmus-Änderungen.** 
  * **Lösung:** Quantifiziert **Konzentrationsrisiken** mit dem HHI-Index, um übermäßige Abhängigkeit von einem einzigen Kundenakquise-Kanal zu verhindern.
* **Schmerzpunkt: Unvorhersehbare B2B- oder B2C-Vertriebszyklen.** 
  * **Lösung:** Führt **Monte-Carlo-Simulationen** aus, um die exakte Wahrscheinlichkeit zu berechnen, Ihre Quartalsumsatzziele unter unsicheren Marktbedingungen zu erreichen.
* **Schmerzpunkt: Leads generieren, die das Vertriebsteam nicht bewältigen kann.** 
  * **Lösung:** Gleicht **operative Kapazitätsgrenzen** gegen die Nachfragegenerierungs-Investition ab, um nachhaltiges Wachstum zu sichern.

---

## ⚙️ Schnellstart-Arbeitsablauf: So optimieren Sie Ihr Budget noch heute

Verwandeln Sie Ihre Budgetplanung in vier Schritten von Rätselraten in eine vorhersagbare Umsatzmaschine:

1. **Basismetriken eingeben:** Erfassen Sie Ihre historische Kanalperformance (z. B. Google Ads, SEO, Meta Ads) einschließlich aktueller Anzeigenausgaben und durchschnittlichem ROAS im Dashboard.
2. **Randbedingungen & Kapazität definieren:** Legen Sie Ihre gesamte Marketing-Budget-Obergrenze und internen operativen Limits fest (z. B. maximale monatliche Leads oder gebuchte Aufträge).
3. **Simulations-Engine ausführen:** Lassen Sie das Tool Ihre Grenzertragskurven berechnen und Monte-Carlo-Wahrscheinlichkeiten für Abwärtsrisiken generieren.
4. **Exportieren & standardisieren (CTA):** Überprüfen Sie den optimierten Budget-Mix im Browser. Für wiederkehrende monatliche Anpassungen und das Speichern komplexer historischer Datensätze [**laden Sie die dauerhafte Excel-Allokationsvorlage herunter**](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation), um einen wiederholbaren Finanzprognose-Arbeitsablauf aufzubauen.

---

## 💡 Warum ich dieses Framework zur Kapitalallokation entwickelt habe

Die meisten Marketing-Budget-Entscheidungen werden immer noch mit fehlerhaften historischen Durchschnittswerten getroffen. 

Wachstumsteams untersuchen historische ROAS-Berichte, identifizieren die digitalen Marketing-Kanäle mit den höchsten scheinbaren Erträgen und allokieren blind mehr Budget entsprechend. Leider versagt dieser naive Ansatz genau dann, wenn Kampagnen skaliert werden.

Das Kernproblem: **Digitale Kundenakquise-Kanäle verhalten sich selten linear.**

Sehen Sie sich zum Beispiel diesen fehlerhaften Standard-Allokationsansatz an:

| Digitaler Marketing-Kanal | Historischer durchschnittlicher ROAS (Basis) | Aktuelle Anzeigenausgaben-Allokation | Empfohlene Aktion (fehlerhafte Durchschnittsmethode) |
| ------------------------- | ---------------------------------: | --------------------------: | -----------------------------------------: |
| Google Search Ads         |                                4.0 |                     $60,000 |                  Hochskalieren (maximale Investition) |
| Organische SEO               |                                3.8 |                     $20,000 |                       Aktuelles Niveau halten |
| Partner-Empfehlung          |                                5.5 |                          $0 |                      Ignorieren (keine Vergangenheitsdaten) |

Diese Empfehlung erscheint auf einem Standard-Marketing-Dashboard rational. 

Nachdem wir die Daten jedoch durch unsere **Grenzertrags-Decay-Engine** laufen ließen, **Kanalvolatilität (Risiko)** einbezogen und **Portfolio-Konzentration** berechneten, verschiebt sich die Realität:

| Digitaler Marketing-Kanal | Wahrer Grenz-ROAS (nächster Dollar) | Optimierte Ausgabenempfehlung |
| ------------------------- | -------------------------------: | -----------------------------: |
| Google Search Ads         |                              3.2 |        $45,000 (Ausgaben senken)  |
| Organische SEO               |                              4.1 |        $35,000 (Ausgaben skalieren)   |
| Partner-Empfehlung          |                              5.5 |        $10,000 (Testbudget)   |

Das optimale Marketing-Portfolio ändert sich vollständig. 

Das analytische Versagen ist nicht ein Mangel an Marketing-Attribution-Reporting. Das Versagen ist, Kapitalallokation als Reporting-Übung zu behandeln statt als **Investitionsportfolio-Problem**.

Ich habe diese Software entwickelt, um ein wiederholbares finanzielles Entscheidungs-Framework zu produktisieren:
* Historische Performance begründet Basis-Erwartungen.
* Grenzertragskurven modellieren abnehmende Anzeigeneffizienz (ROAS-Decay).
* Portfolio-Analyse quantifiziert Plattform-Konzentrationsrisiken.
* Monte-Carlo-Simulation schätzt die Abwärtswahrscheinlichkeit des Umsatzes.
* Lineare Optimierung identifiziert die höchste erwartete Rendite innerhalb operativer Randbedingungen.

> **Bei begrenztem Marketing-Kapital: Wohin sollte der nächste Dollar tatsächlich gehen?** Dieses Tool liefert die mathematische Antwort.

---

## 👥 Für wen es gedacht ist (Anwendungsfälle & Szenarien)

Dieses entscheidungsunterstützende Tool ist speziell für unterschiedliche Marketing- und Finanzrollen konzipiert:

* **CMOs & VP Marketing:** Brauchen eine *Marketing-Budget-Prognosevorlage* auf hoher Ebene, um Quartalsbudget-Anfragen vor dem Board mit Wahrscheinlichkeitsmathematik statt Bauchgefühl zu verteidigen.
* **Performance-Marketing-Direktoren:** Suchen *Paid-Media-Allokationssoftware*, um die Kundenakquisekosten (CAC) über Google-, Meta- und TikTok-Anzeigenportfolios auszubalancieren.
* **B2B-Wachstums-Marketer & Demand-Gen-Leads:** Suchen einen *ROI-Prognoserechner*, um Lead-Generierungsgeschwindigkeit gegen die operative Kapazität des Vertriebsteams auszubalancieren.
* **Fractional CMOs & Marketing-Agenturen:** Brauchen ein wiederholbares *kanalübergreifendes Budget-Audit-Framework*, um neuen Kunden schnell zu zeigen, wo ihr aktuelles Budget Effizienz verliert.
* **FP&A / Finanzteams:** Bewerten *Marketing-Kapitaleffizienz*, um sicherzustellen, dass Nachfragegenerierungs-Investitionen zum Unternehmensrisikoprofil passen.

**Für wen es nicht gedacht ist:**

* Ersatz für Enterprise-Marketing-Automatisierung (z. B. HubSpot, Marketo).
* Multi-Touch-Attribution-Tracking-Software (z. B. Northbeam, TripleWhale).
* Echtzeit-Programmatic-Anzeigengebots-Ausführung.

Es sind keine fortgeschrittenen Tabellenkalkulations- oder Programmierkenntnisse erforderlich.

---

## Über

Ich baue leichte entscheidungsunterstützende Tools für Situationen, in denen es zu viele interagierende Variablen gibt, um sie zuverlässig im Kopf zu verwalten.

Die Frage hinter den meisten dieser Tools ist einfach:

> **Welche Informationen müssen an einem Ort existieren, um die nächste Entscheidung sicher zu treffen?**

Der Marketing Budget Allocation Simulator ist ein Beispiel für diesen Ansatz: Marketing-Budget-Allokation von Intuition und Reporting in ein wiederholbares analytisches Framework zu verwandeln.

---

## Technische Details

<details>
<summary>Für technische Prüfer, Excel-Praktiker und Mitarbeiter</summary>

## Arbeitsmappenarchitektur

| Ebene  | Arbeitsblatt              | Zweck                                       |
| ------ | ---------------------- | --------------------------------------------- |
| Eingabe  | 01_Settings            | Globale Simulations- und Optimierungsparameter |
| Eingabe  | 02_Historical_Data     | Historische Kanalperformance                |
| Eingabe  | 03_Constraints         | Budget- und operative Randbedingungen            |
| Eingabe  | 04_Marginal_Curves     | Funktionen abnehmenden Ertrags                  |
| Eingabe  | 05_Scenario_Inputs     | Alternative Szenariodefinitionen              |
| Engine | 06_Benchmark_Engine    | Basis-Performance-Metriken                  |
| Engine | 07_Risk_Engine         | Volatilitäts- und Konzentrationsanalyse         |
| Engine | 08_Optimization_Solver | Portfolio-Optimierung                        |
| Engine | 09_Simulation_Engine   | Monte-Carlo-Simulation                        |
| Ausgabe | 10_Executive_Summary   | Executive-Empfehlungen                     |
| Ausgabe | 11_Scenario_Comparison | Szenariovergleich                           |
| Ausgabe | 12_Portfolio_Report    | Portfolio-Klassifizierung                      |

### Datenfluss

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

## Drei Fallen, die selbst erfahrene Marketing-Teams stellen

### Falle 1 — ROAS als konstant annehmen

Es wurde eine Entscheidung getroffen:

```text
Google Ads ROAS = 4.0
Increase budget from $60k to $100k
```

Die unbemerkte Annahme:

```text
ROAS remains constant regardless of spend level.
```

#### Ergebnis

| Ausgaben | Angenommener Umsatz | Tatsächlicher Grenzumsatz |
| ----- | --------------: | ----------------------: |
| $60k  |           $240k |                   $240k |
| $100k |           $400k |                   $320k |

Die Empfehlung wird falsch, weil die Grenzeffizienz sinkt.

Korrekter Ansatz:

* Budgetbereiche modellieren,
* Grenz-ROAS schätzen,
* gegen stückweise Erträge optimieren.

<details>
<summary>Formelimplementierung</summary>

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

### Falle 2 — Portfolio-Konzentrationsrisiko ignorieren

Es wurde eine Entscheidung getroffen:

```text
Allocate 60% of budget to Google Ads.
```

Die unbemerkte Metrik:

```text
HHI concentration index.
```

| Allokation  |  HHI |
| ----------- | ---: |
| 60/20/20    | 0.44 |
| 45/35/10/10 | 0.34 |

Das erste Portfolio erzeugt ein wesentlich größeres Plattform-Abhängigkeitsrisiko.

Korrekter Ansatz:

```excel
=SUMSQ(Allocation_Range)
```

Wenn:

```text
HHI > 0.30
```

werden Risikowarnungen aktiviert.

<details>
<summary>Formelimplementierung</summary>

```excel
=SUMSQ(Recommended_Allocation_Pct_Range)
```

</details>

---

### Falle 3 — Prognosen als Gewissheit behandeln

Es wurde eine Entscheidung getroffen:

```text
Expected revenue = $368,000
```

Die unbemerkte Annahme:

```text
Future performance equals average historical performance.
```

Monte-Carlo-Simulation zeigte:

| Metrik             | Wert |
| ------------------ | ----: |
| Mittelwert               | $368k |
| Std.-Abw.            |  $82k |
| P(Umsatz > $400k) |   37% |
| P(Umsatz < $250k) |   18% |

Die Empfehlung änderte sich von:

```text
"Expected revenue is $368k."
```

zu:

```text
"There is an 18% probability of severe underperformance."
```

<details>
<summary>Formelimplementierung</summary>

```excel
=NORM.INV(
RAND(),
Mean_ROAS,
Volatility
)
```

</details>

---

## Beispielszenario

Ein B2B-Dienstleistungsunternehmen allokiert:

| Kanal    | Aktuelles Budget |
| ---------- | -------------: |
| Google Ads |        $60,000 |
| SEO        |        $20,000 |
| Facebook   |        $20,000 |
| Empfehlung   |             $0 |

Die historische Analyse zeigt:

| Kanal    | Mittlerer ROAS | Volatilität |
| ---------- | --------: | ---------: |
| Google Ads |      3.68 |       0.12 |
| SEO        |      4.10 |       0.08 |
| Facebook   |      2.10 |       0.45 |
| Empfehlung   |      5.50 |       0.60 |

Operative Randbedingungen:

* Gesamtbudget: $100.000,
* maximal gebuchte Aufträge: 120,
* minimales Lead-Ziel: 350.

Optimierungsergebnisse:

| Kanal    | Empfohlenes Budget |
| ---------- | -----------------: |
| Google Ads |            $45,000 |
| SEO        |            $35,000 |
| Facebook   |            $10,000 |
| Empfehlung   |            $10,000 |

Ergebnisse:

* der erwartete Umsatz steigt von $320k auf $368k,
* die Portfolio-Konzentration sinkt um 22 %,
* die erwarteten gebuchten Aufträge bleiben unter den Kapazitätsgrenzen,
* die Abwärtsrisiko-Wahrscheinlichkeit bleibt akzeptabel.

Entscheidungsimplikation:

```text
The organization should diversify capital allocation
rather than increase spending on the historically
largest channel.
```

---

## Formelreferenz

<details>
<summary>Benchmark-Engine</summary>

```excel
=SORT(UNIQUE(FILTER(Channel,Channel<>"")))
=SUMIFS(Spend,Channel,A2#)
=SUMIFS(Revenue,Channel,A2#)
=Revenue/Spend
=Spend/Booked_Jobs
```

</details>

<details>
<summary>Risiko-Engine</summary>

```excel
=STDEV.S(ROAS)
=SUMSQ(Allocation)
```

</details>

<details>
<summary>Simulations-Engine</summary>

```excel
=SEQUENCE(1000)
=NORM.INV(RAND(),Mean,SD)
=SUMPRODUCT()
=COUNTIF()
```

</details>

<details>
<summary>Optimierungs-Engine</summary>

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

## Validierungsregeln

| Feld             | Regel                    | Fehlerverhalten       |
| ----------------- | ----------------------- | -------------------- |
| Historische Monate | Mindestens 12 Monate       | Validierungsfehler   |
| Ausgaben             | Muss ≥ 0 sein             | Eingabe abgelehnt         |
| Umsatz           | Muss ≥ 0 sein             | Eingabe abgelehnt         |
| Gebuchte Aufträge       | ≤ Leads                 | Warnung              |
| Budget-Allokation | Summe gleich Gesamtbudget | Solver-Ablehnung     |
| Kanalgrenzen    | Innerhalb min/max          | Randbedingungsverletzung    |
| Grenz-Stufen    | Stetige Intervalle    | Berechnungsfehler    |
| Simulationsanzahl  | 100–5000                | Eingabevalidierung     |
| Dynamische Arrays    | Keine blockierten Spill-Bereiche | #SPILL!-Fehler        |

</details>

---

## Die Geschäftslogik: Methodik & kommerzielle Auswirkung

Viele Organisationen behandeln Marketing-Budget-Allokation als rückwärtsgewandte Reporting-Übung—einfaches Hochskalieren der leistungsstärksten Kanäle von gestern. Tatsächlich ist digitale Kundenakquise ein **dynamisches Kapitalallokationsproblem**. 

Dieses Toolkit verschiebt das Gespräch von *"Wie war unser historischer ROAS?"* zu *"Wo wird unser nächster Dollar die höchste Grenzrendite generieren, ohne das Unternehmen einem inakzeptablen Algorithmus-Risiko auszusetzen?"*

Hier ist die zugrunde liegende finanzielle Methodik und wie sie spezifische kommerzielle Probleme löst:

### 1. Das kommerzielle Problem: Der Trugschluss linearer Skalierung & Kapitalverschwendung

Der teuerste Fehler im digitalen Marketing ist die Annahme linearer Erträge. Wenn $10.000 Anzeigenausgaben einen ROAS von 4,0 generieren, nehmen Marketing-Teams oft fälschlich an, dass $100.000 Ausgaben die gleiche Effizienz erzielen. 
*   **Der Fehler statischer Durchschnittswerte:** Plattformen wie Meta und Google erschöpfen ihre höchstintentionalen Zielgruppen zuerst. Je mehr Sie ausgeben, desto mehr zahlen Sie, um Nutzer mit geringerer Intention zu erreichen, wodurch der ROAS sinkt. Blindes Skalieren auf Basis historischer Durchschnittswerte garantiert verschwendete Anzeigenausgaben.
*   **Die Lösung:** Dieses Toolkit ersetzt statische Durchschnittswerte durch **Grenzertragskurven**, um die Realität zu modellieren.

### 2. Die Kernmethodik (Funktionsweise)

Die Engine wendet Prinzipien aus quantitativer Finanzierung und Operations Research auf Marketing-Daten an:

*   **Grenz-ROAS-Decay (stückweise Funktionen):**
    Der Algorithmus modelliert die abnehmenden Erträge jeder Anzeigenplattform. Er berechnet den exakten Sättigungspunkt, an dem ein Kanal ineffizient wird, und empfiehlt automatisch eine Budget-Verschiebung zu einem sekundären Kanal (wie SEO oder Empfehlungen), bevor Kapital verschwendet wird.
*   **Moderne Portfoliotheorie & Konzentrationsrisiko (HHI):**
    Indem Marketing-Kanäle wie ein Anlageportfolio behandelt werden, berechnet das Tool den Herfindahl-Hirschman-Index (HHI). Wenn Ihr Umsatz zu 80 % von Meta Ads abhängt, sind Sie ein Algorithmus-Update von einer Cashflow-Krise entfernt. Das Modell bestraft Überkonzentration aktiv und erzwingt Diversifikation.
*   **Stochastische Prognose (Monte-Carlo-Simulation):**
    B2B-Vertriebszyklen und Anzeigenauktionen sind volatil. Statt einer einzelnen deterministischen Umsatzprognose, die zwangsläufig falsch sein wird, führt die Engine Tausende simulierte Quartale mit historischen Standardabweichungen aus. Sie gibt Wahrscheinlichkeitsverteilungen aus (z. B. "Es gibt eine 18-%ige statistische Wahrscheinlichkeit, dass wir unser Abwärtsumsatzziel verfehlen").
*   **Eingeschränkte lineare Optimierung (Solver-Engine):**
    Sie sucht mathematisch den höchsten erwarteten Umsatz unter strenger Einhaltung Ihrer Geschäftsrealitäten—wie maximale operative Kapazität (damit Sie nicht mehr Leads generieren, als der Vertrieb schließen kann) und absolute Budget-Obergrenzen.

### 3. Die kommerzielle Ausgabe (Business Value)

Indem Marketing als quantifizierbares Finanzportfolio behandelt wird, produziert das Tool objektive Business Intelligence:
*   **Für CMO & Board:** Liefert mathematisch verteidbare Budget-Anfragen. Sie können "wir denken, das wird funktionieren" durch "diese Allokation maximiert den Umsatz und hält das Abwärtsrisiko unter 15 %" ersetzen.
*   **Für Media-Einkäufer:** Identifiziert genau, wann eine Kampagne nicht mehr skaliert werden sollte, und eliminiert das Rätselraten bei der täglichen Budget-Steuerung.
*   **Für Finanzen & Operations:** Sichert die Abstimmung zwischen Nachfragegenerierungs-Ausgaben, Working-Capital-Grenzen und Vertriebsteam-Kapazität.

---

## Weitere Tools dieser Reihe

* **Inventory Planning & Replenishment Simulator** — Kaufentscheidungen unter Unsicherheit optimieren.
* **Paid Media Reporting Architecture Framework** — skalierbare Reporting-Systeme für Agenturen.
* **VAT Compliance & Calculation Console** — Multi-Plattform-Steuerabstimmungs-Arbeitsabläufe.
* **Project Cost Allocation Dashboard** — operative Rentabilitäts- und Arbeitsanalyse.
* **DTC Inventory Governance Console** — Bestandsrisikomanagement für Multi-Market-Marken.

Weitere Tools: **GitHub Profile / [Unsere Website](https://www.theseusworkshop.com/)**

---

## Lizenz

Dieses Projekt ist unter der **Apache License 2.0** lizenziert.

Siehe die Datei `LICENSE` für Details.
