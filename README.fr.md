[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Simulateur d'allocation budgétaire marketing & outil d'optimisation des dépenses

![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform: Browser + Excel](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool Type: Decision Support](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Optimisez votre allocation budgétaire marketing cross-canal avec la théorie du portefeuille, les courbes de rendement marginal (decay du ROAS) et la simulation de Monte-Carlo. Ce planificateur de dépenses marketing digital gratuit et ce modèle Excel aident les CMO, directeurs marketing et acheteurs médias à prévoir le ROI et à éliminer le gaspillage publicitaire.**

**Aucune inscription. Aucune installation. Gratuit dans votre navigateur.**

Testez vos scénarios avec notre application web gratuite. Pour les équipes ayant besoin d'une planification trimestrielle récurrente et de saisies de données historiques personnalisées, la version Excel déverrouillée est disponible avec une garantie de remboursement de 30 jours sans questions.

> 🌐 **Tester les scénarios dans le navigateur** → [*Lancer le simulateur de budget marketing gratuit*](https://hyvoid.github.io/Marketing-Budget-Allocation-Simulator/)
>
> 📥 **Obtenir le modèle réutilisable** → [*Télécharger le modèle Excel d'allocation budgétaire marketing*](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation)

---

## 🎯 Surmonter les points douloureux des dépenses marketing (Ce que cet outil résout)

Cessez de vous fier à des moyennes basiques. Ce cadre d'optimisation budgétaire associe directement les points douloureux marketing digital courants à des solutions fondées sur les données :

* **Point douloureux : gaspillage des dépenses publicitaires sur les canaux saturés.** 
  * **Solution :** Identifie les **points de saturation budgétaire** où les dépenses publicitaires supplémentaires cessent de produire des rendements marginaux efficaces (suivi du decay du ROAS).
* **Point douloureux : deviner les réallocations budgétaires entre canaux.** 
  * **Solution :** Prévoit **l'impact revenu attendu** d'une réaffectation des dépenses marketing entre les canaux Recherche payante, SEO et Réseaux sociaux.
* **Point douloureux : chutes de revenus soudaines dues aux changements d'algorithme des plateformes.** 
  * **Solution :** Quantifie le **risque de concentration** à l'aide de l'indice HHI pour éviter la dépendance excessive à un unique canal d'acquisition client.
* **Point douloureux : cycles de vente B2B ou B2C imprévisibles.** 
  * **Solution :** Exécute des **simulations de Monte-Carlo** pour calculer la probabilité exacte d'atteindre vos objectifs de revenus trimestriels dans des conditions de marché incertaines.
* **Point douloureux : générer des leads que l'équipe commerciale ne peut traiter.** 
  * **Solution :** Confronte les **contraintes de capacité opérationnelle** à l'investissement de génération de demande pour assurer une croissance durable.

---

## ⚙️ Flux de travail de démarrage rapide : comment optimiser votre budget dès aujourd'hui

Transformez votre planification budgétaire, de la conjecture à un moteur de revenus prévisible, en quatre étapes :

1. **Saisir les métriques de base :** Entrez votre performance canal historique (par ex. Google Ads, SEO, Meta Ads), incluant les dépenses publicitaires actuelles et le ROAS moyen, dans le tableau de bord.
2. **Définir les contraintes et la capacité :** Fixez votre plafond budgétaire marketing total et vos limites opérationnelles internes (par ex. leads mensuels maximum ou missions réservées).
3. **Exécuter le moteur de simulation :** Laissez l'outil calculer vos courbes de rendement marginal et générer les probabilités de risque de baisse par Monte-Carlo.
4. **Exporter et standardiser (CTA) :** Examinez le mix budgétaire optimisé dans le navigateur. Pour les ajustements mensuels récurrents et la sauvegarde de jeux de données historiques complexes, [**téléchargez le modèle d'allocation Excel permanent**](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation) pour bâtir un flux de travail de prévision financière reproductible.

---

## 💡 Pourquoi j'ai conçu ce cadre d'allocation du capital

La plupart des décisions de budget marketing sont encore prises à l'aide de moyennes historiques défectueuses. 

Les équipes de croissance examinent les rapports ROAS historiques, identifient les canaux de marketing digital aux rendements apparents les plus élevés et allouent aveuglément plus de budget en conséquence. Malheureusement, cette approche naïve échoue précisément au moment de passer les campagnes à l'échelle.

Le problème central : **les canaux d'acquisition client numériques se comportent rarement de manière linéaire.**

Par exemple, examinez cette approche d'allocation standard défectueuse :

| Canal de marketing digital | ROAS moyen historique (référence) | Allocation des dépenses publicitaires actuelle | Action recommandée (méthode des moyennes défectueuse) |
| ------------------------- | ---------------------------------: | --------------------------: | -----------------------------------------: |
| Annonces Google Search         |                                4.0 |                     $60,000 |                  Monter en puissance (investissement max) |
| SEO organique               |                                3.8 |                     $20,000 |                       Maintenir le niveau actuel |
| Recommandation de partenaires          |                                5.5 |                          $0 |                      Ignorer (pas de données passées) |

Cette recommandation apparaît rationnelle sur un tableau de bord marketing standard. 

Cependant, après avoir passé les données dans notre **moteur de decay du rendement marginal**, en intégrant la **volatilité du canal (risque)** et en calculant la **concentration du portefeuille**, la réalité se déplace :

| Canal de marketing digital | ROAS marginal réel (prochain dollar) | Recommandation de dépenses optimisée |
| ------------------------- | -------------------------------: | -----------------------------: |
| Annonces Google Search         |                              3.2 |        $45,000 (réduire les dépenses)  |
| SEO organique               |                              4.1 |        $35,000 (monter les dépenses)   |
| Recommandation de partenaires          |                              5.5 |        $10,000 (budget test)   |

Le portefeuille marketing optimal change entièrement. 

L'échec analytique n'est pas un manque de reporting d'attribution marketing. L'échec est de traiter l'allocation du capital comme un exercice de reporting plutôt que comme un **problème de portefeuille d'investissement**.

J'ai conçu ce logiciel pour industrialiser un cadre de décision financière reproductible :
* La performance historique établit les attentes de référence.
* Les courbes de rendement marginal modélisent la diminution d'efficacité publicitaire (decay du ROAS).
* L'analyse de portefeuille quantifie le risque de concentration plateforme.
* La simulation de Monte-Carlo estime la probabilité de revenus en baisse.
* L'optimisation linéaire identifie le rendement attendu le plus élevé sous contraintes opérationnelles.

> **À capital marketing limité, où devrait réellement aller le prochain dollar ?** Cet outil fournit la réponse mathématique.

---

## 👥 À qui s'adresse cet outil (cas d'usage et scénarios)

Cet outil d'aide à la décision est spécifiquement conçu pour des rôles marketing et finance distincts :

* **CMO et VP Marketing :** Besoin d'un *modèle de prévision budgétaire marketing* de haut niveau pour défendre les demandes de budget trimestriel devant le conseil avec des mathématiques de probabilité plutôt que des intuitions.
* **Directeurs marketing performance :** Recherchent un *logiciel d'allocation de médias payants* pour équilibrer le coût d'acquisition client (CAC) entre les portefeuilles publicitaires Google, Meta et TikTok.
* **Marketers croissance B2B et responsables de génération de demande :** Recherchent un *calculateur de prévision de ROI* pour équilibrer la vélocité de génération de leads contre la capacité opérationnelle de l'équipe commerciale.
* **CMO fractionnels et agences marketing :** Besoin d'un *cadre d'audit budgétaire cross-canal* reproductible pour montrer rapidement aux nouveaux clients où leur budget actuel saigne en efficacité.
* **Équipes FP&A / Finance :** Évaluent *l'efficacité du capital marketing* pour garantir que les investissements de génération de demande s'alignent sur les profils de risque de l'entreprise.

**À qui il ne s'adresse pas :**

* Les remplacements d'automatisation marketing entreprise (par ex. HubSpot, Marketo).
* Les logiciels de suivi d'attribution multi-touch (par ex. Northbeam, TripleWhale).
* L'exécution d'enchères publicitaires programmatiques en temps réel.

Aucune expertise avancée en tableur ou en programmation n'est requise.

---

## À propos

Je conçois des outils d'aide à la décision légers pour les situations où il y a trop de variables en interaction pour être gérées mentalement de façon fiable.

La question derrière la plupart de ces outils est simple :

> **Quelles informations doivent coexister en un seul endroit pour prendre la prochaine décision avec confiance ?**

Le Marketing Budget Allocation Simulator est un exemple de cette approche : convertir l'allocation budgétaire marketing, de l'intuition et du reporting, en un cadre analytique reproductible.

---

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens Excel et les collaborateurs</summary>

## Architecture du classeur

| Couche | Feuille de calcul | Objet                                       |
| ------ | ---------------------- | --------------------------------------------- |
| Entrée | 01_Settings            | Paramètres globaux de simulation et d'optimisation |
| Entrée | 02_Historical_Data     | Performance canal historique                |
| Entrée | 03_Constraints         | Contraintes budgétaires et opérationnelles            |
| Entrée | 04_Marginal_Curves     | Fonctions de rendement décroissant                  |
| Entrée | 05_Scenario_Inputs     | Définitions de scénarios alternatifs              |
| Moteur | 06_Benchmark_Engine    | Métriques de performance de référence                  |
| Moteur | 07_Risk_Engine         | Analyse de volatilité et de concentration         |
| Moteur | 08_Optimization_Solver | Optimisation de portefeuille                        |
| Moteur | 09_Simulation_Engine   | Simulation de Monte-Carlo                        |
| Sortie | 10_Executive_Summary   | Recommandations exécutives                     |
| Sortie | 11_Scenario_Comparison | Comparaison de scénarios                           |
| Sortie | 12_Portfolio_Report    | Classification de portefeuille                      |

### Flux de données

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

## Trois pièges qui rattrapent même les équipes marketing expérimentées

### Piège 1 — Supposer que le ROAS est constant

Une décision a été prise :

```text
Google Ads ROAS = 4.0
Increase budget from $60k to $100k
```

L'hypothèse passée inaperçue :

```text
ROAS remains constant regardless of spend level.
```

#### Résultat

| Dépenses | Revenu supposé | Revenu marginal réel |
| ----- | --------------: | ----------------------: |
| $60k  |           $240k |                   $240k |
| $100k |           $400k |                   $320k |

La recommandation devient incorrecte car l'efficacité marginale diminue.

Approche correcte :

* modéliser des plages de budget,
* estimer le ROAS marginal,
* optimiser par rapport à des rendements par paliers.

<details>
<summary>Implémentation de la formule</summary>

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

### Piège 2 — Ignorer le risque de concentration du portefeuille

Une décision a été prise :

```text
Allocate 60% of budget to Google Ads.
```

La métrique passée inaperçue :

```text
HHI concentration index.
```

| Allocation  |  HHI |
| ----------- | ---: |
| 60/20/20    | 0.44 |
| 45/35/10/10 | 0.34 |

Le premier portefeuille produit un risque de dépendance plateforme substantiellement plus grand.

Approche correcte :

```excel
=SUMSQ(Allocation_Range)
```

Lorsque :

```text
HHI > 0.30
```

les alertes de risque s'activent.

<details>
<summary>Implémentation de la formule</summary>

```excel
=SUMSQ(Recommended_Allocation_Pct_Range)
```

</details>

---

### Piège 3 — Traiter les prévisions comme des certitudes

Une décision a été prise :

```text
Expected revenue = $368,000
```

L'hypothèse passée inaperçue :

```text
Future performance equals average historical performance.
```

La simulation de Monte-Carlo a révélé :

| Métrique             | Valeur |
| ------------------ | ----: |
| Moyenne               | $368k |
| Écart-type            |  $82k |
| P(revenu > $400k) |   37% |
| P(revenu < $250k) |   18% |

La recommandation est passée de :

```text
"Expected revenue is $368k."
```

à :

```text
"There is an 18% probability of severe underperformance."
```

<details>
<summary>Implémentation de la formule</summary>

```excel
=NORM.INV(
RAND(),
Mean_ROAS,
Volatility
)
```

</details>

---

## Scénario d'exemple

Une entreprise de services B2B alloue :

| Canal    | Budget actuel |
| ---------- | -------------: |
| Google Ads |        $60,000 |
| SEO        |        $20,000 |
| Facebook   |        $20,000 |
| Recommandation   |             $0 |

L'analyse historique indique :

| Canal    | ROAS moyen | Volatilité |
| ---------- | --------: | ---------: |
| Google Ads |      3.68 |       0.12 |
| SEO        |      4.10 |       0.08 |
| Facebook   |      2.10 |       0.45 |
| Recommandation   |      5.50 |       0.60 |

Contraintes opérationnelles :

* budget total : $100 000,
* missions réservées maximum : 120,
* cible de leads minimale : 350.

Résultats de l'optimisation :

| Canal    | Budget recommandé |
| ---------- | -----------------: |
| Google Ads |            $45,000 |
| SEO        |            $35,000 |
| Facebook   |            $10,000 |
| Recommandation   |            $10,000 |

Résultats :

* le revenu attendu passe de $320k à $368k,
* la concentration du portefeuille diminue de 22 %,
* les missions réservées attendues restent sous les limites de capacité,
* la probabilité de risque de baisse reste acceptable.

Implication pour la décision :

```text
The organization should diversify capital allocation
rather than increase spending on the historically
largest channel.
```

---

## Référence des formules

<details>
<summary>Moteur de référence</summary>

```excel
=SORT(UNIQUE(FILTER(Channel,Channel<>"")))
=SUMIFS(Spend,Channel,A2#)
=SUMIFS(Revenue,Channel,A2#)
=Revenue/Spend
=Spend/Booked_Jobs
```

</details>

<details>
<summary>Moteur de risque</summary>

```excel
=STDEV.S(ROAS)
=SUMSQ(Allocation)
```

</details>

<details>
<summary>Moteur de simulation</summary>

```excel
=SEQUENCE(1000)
=NORM.INV(RAND(),Mean,SD)
=SUMPRODUCT()
=COUNTIF()
```

</details>

<details>
<summary>Moteur d'optimisation</summary>

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

## Règles de validation

| Champ             | Règle                    | Comportement en cas d'erreur       |
| ----------------- | ----------------------- | -------------------- |
| Mois historiques | 12 mois minimum       | Échec de validation   |
| Dépenses             | Doit être ≥ 0             | Entrée rejetée         |
| Revenu           | Doit être ≥ 0             | Entrée rejetée         |
| Missions réservées       | ≤ leads                 | Avertissement              |
| Allocation budgétaire | La somme égale le budget total | Rejet du solveur     |
| Limites de canal    | Dans min/max          | Violation de contrainte    |
| Paliers marginaux    | Intervalles continus    | Erreur de calcul    |
| Nombre de simulations  | 100–5000                | Validation d'entrée     |
| Tableaux dynamiques    | Aucune plage de déversement bloquée | Erreur #SPILL!        |

</details>

---

## La logique métier : méthodologie et impact commercial

De nombreuses organisations traitent l'allocation budgétaire marketing comme un exercice de reporting tourné vers le passé—monter simplement en puissance les canaux les plus performants d'hier. En réalité, l'acquisition client numérique est un **problème dynamique d'allocation du capital**. 

Cette boîte à outils déplace la conversation de *"Quel était notre ROAS historique ?"* à *"Où notre prochain dollar générera-t-il le rendement marginal le plus élevé sans exposer l'entreprise à un risque d'algorithme inacceptable ?"*

Voici la méthodologie financière sous-jacente et comment elle résout des problèmes commerciaux spécifiques :

### 1. Le problème commercial : le sophisme de la mise à l'échelle linéaire et le gaspillage de capital

L'erreur la plus coûteuse du marketing digital est de supposer des rendements linéaires. Si $10 000 de dépenses publicitaires génèrent un ROAS de 4,0, les équipes marketing supposent souvent à tort que $100 000 de dépenses produiront la même efficacité. 
*   **Le défaut des moyennes statiques :** Les plateformes comme Meta et Google épuisent d'abord leurs audiences à plus forte intention. À mesure que vous montez les dépenses, vous payez plus pour atteindre des utilisateurs à plus faible intention, ce qui fait chuter le ROAS. Monter aveuglément sur la base de moyennes historiques garantit le gaspillage des dépenses publicitaires.
*   **La solution :** Cette boîte à outils remplace les moyennes statiques par des **courbes de rendement marginal** pour modéliser la réalité.

### 2. La méthodologie centrale (comment elle fonctionne)

Le moteur applique des principes de finance quantitative et de recherche opérationnelle aux données marketing :

*   **Decay du ROAS marginal (fonctions par paliers) :**
    L'algorithme modélise les rendements décroissants de chaque plateforme publicitaire. Il calcule le point de saturation exact où un canal devient inefficace, en recommandant automatiquement un déplacement budgétaire vers un canal secondaire (comme le SEO ou les recommandations) avant que du capital ne soit gaspillé.
*   **Théorie moderne du portefeuille et risque de concentration (HHI) :**
    En traitant les canaux marketing comme un portefeuille d'investissement, l'outil calcule l'indice Herfindahl-Hirschman (HHI). Si vos revenus dépendent à 80 % de Meta Ads, vous n'êtes qu'une mise à jour d'algorithme d'une crise de trésorerie. Le modèle pénalise activement la surconcentration, forçant la diversification.
*   **Prévision stochastique (simulation de Monte-Carlo) :**
    Les cycles de vente B2B et les enchères publicitaires sont volatils. Au lieu de fournir une prévision de revenus unique et déterministe qui sera inévitablement fausse, le moteur exécute des milliers de trimestres simulés à l'aide des écarts-types historiques. Il produit des distributions de probabilité (par ex. "Il existe une probabilité statistique de 18 % que nous manquions notre objectif de revenus en baisse").
*   **Optimisation linéaire sous contraintes (moteur Solveur) :**
    Il cherche mathématiquement le revenu attendu le plus élevé tout en respectant strictement vos réalités opérationnelles—telles que la capacité opérationnelle maximale (pour ne pas générer plus de leads que les ventes ne peuvent en clôturer) et les plafonds budgétaires absolus.

### 3. La sortie commerciale (valeur métier)

En traitant le marketing comme un portefeuille financier quantifiable, l'outil produit une business intelligence objective :
*   **Pour le CMO et le conseil :** Fournit des demandes budgétaires mathématiquement défendables. Vous pouvez remplacer "nous pensons que cela va fonctionner" par "cette allocation maximise les revenus tout en maintenant le risque de baisse sous 15 %."
*   **Pour les acheteurs médias :** Identifie précisément quand arrêter de monter une campagne, éliminant les conjectures du rythme budgétaire quotidien.
*   **Pour la finance et les opérations :** Garantit l'alignement entre les dépenses de génération de demande, les limites de fonds de roulement et la capacité de l'équipe commerciale.

---

## Autres outils de cette série

* **Inventory Planning & Replenishment Simulator** — optimiser les décisions d'achat sous incertitude.
* **Paid Media Reporting Architecture Framework** — systèmes de reporting évolutifs pour les agences.
* **VAT Compliance & Calculation Console** — flux de travail de rapprochement fiscal multiplateforme.
* **Project Cost Allocation Dashboard** — rentabilité opérationnelle et analyse du travail.
* **DTC Inventory Governance Console** — gestion des risques de stock pour les marques multimarchés.

Plus d'outils : **Profil GitHub / [Notre site](https://www.theseusworkshop.com/)**

---

## Licence

Ce projet est sous licence **Apache License 2.0**.

Voir le fichier `LICENSE` pour plus de détails.
