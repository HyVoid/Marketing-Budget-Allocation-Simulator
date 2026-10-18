[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)
# Simulador de asignación de presupuesto de marketing & herramienta de optimización del gasto

![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform: Browser + Excel](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)
![Tool Type: Decision Support](https://img.shields.io/badge/Tool-Marketing%20Decision%20Support-orange.svg)

**Optimiza tu asignación de presupuesto de marketing entre canales con la teoría de cartera, las curvas de rendimiento marginal (decay del ROAS) y la simulación de Monte Carlo. Este planificador de gasto en marketing digital gratuito y la plantilla de Excel ayudan a CMOs, directores de marketing y compradores de medios a pronosticar el ROI y eliminar el desperdicio de gasto publicitario.**

**Sin registro. Sin instalación. Gratis en tu navegador.**

Prueba tus escenarios con nuestra aplicación web gratuita. Para los equipos que necesitan planificación trimestral recurrente y entradas de datos históricas personalizadas, la versión de Excel desbloqueada está disponible con una garantía de devolución de 30 días sin preguntas.

> 🌐 **Probar escenarios en el navegador** → [*Lanzar el simulador de presupuesto de marketing gratuito*](https://hyvoid.github.io/Marketing-Budget-Allocation-Simulator/)
>
> 📥 **Obtener la plantilla reutilizable** → [*Descargar el modelo de Excel de asignación de presupuesto de marketing*](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation)

---

## 🎯 Superar los puntos de dolor del gasto en marketing (Lo que resuelve esta herramienta)

Deja de depender de promedios básicos. Este marco de optimización presupuestaria asigna directamente los puntos de dolor del marketing digital a soluciones basadas en datos:

* **Punto de dolor: gasto publicitario desperdiciado en canales saturados.** 
  * **Solución:** Identifica los **puntos de saturación del presupuesto** donde el gasto publicitario adicional deja de producir rendimientos marginales eficientes (seguimiento del decay del ROAS).
* **Punto de dolor: adivinar los cambios de presupuesto entre canales.** 
  * **Solución:** Pronostica **el impacto esperado en los ingresos** de reasignar el gasto de marketing entre los canales de Búsqueda pagada, SEO y Redes sociales.
* **Punto de dolor: caídas repentinas de ingresos por cambios de algoritmo de las plataformas.** 
  * **Solución:** Cuantifica el **riesgo de concentración** con el índice HHI para evitar la dependencia excesiva de un único canal de adquisición de clientes.
* **Punto de dolor: ciclos de venta B2B o B2C impredecibles.** 
  * **Solución:** Ejecuta **simulaciones de Monte Carlo** para calcular la probabilidad exacta de alcanzar tus objetivos de ingresos trimestrales bajo condiciones de mercado inciertas.
* **Punto de dolor: generar leads que el equipo de ventas no puede gestionar.** 
  * **Solución:** Contrasta las **restricciones de capacidad operativa** con la inversión en generación de demanda para garantizar un crecimiento sostenible.

---

## ⚙️ Flujo de trabajo de inicio rápido: cómo optimizar tu presupuesto hoy

Transforma tu planificación presupuestaria, de las conjeturas a un motor de ingresos predecible, en cuatro pasos:

1. **Introducir métricas base:** Ingresa tu rendimiento histórico por canal (p. ej., Google Ads, SEO, Meta Ads), incluidos el gasto publicitario actual y el ROAS medio, en el panel.
2. **Definir restricciones y capacidad:** Fija tu límite total de presupuesto de marketing y tus límites operativos internos (p. ej., leads mensuales máximos o trabajos reservados).
3. **Ejecutar el motor de simulación:** Deja que la herramienta calcule tus curvas de rendimiento marginal y genere las probabilidades de riesgo a la baja de Monte Carlo.
4. **Exportar y estandarizar (CTA):** Revisa la combinación de presupuesto optimizada en el navegador. Para ajustes mensuales recurrentes y guardar conjuntos de datos históricos complejos, [**descarga la plantilla de asignación de Excel permanente**](https://www.theseusworkshop.com/l/owwsv?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=marketing-budget-allocation) para construir un flujo de trabajo de previsión financiera repetible.

---

## 💡 Por qué construí este marco de asignación de capital

La mayoría de las decisiones de presupuesto de marketing todavía se toman con promedios históricos defectuosos. 

Los equipos de crecimiento examinan informes de ROAS históricos, identifican los canales de marketing digital con los rendimientos aparentes más altos y asignan más presupuesto a ciegas. Lamentablemente, este enfoque ingenuo falla precisamente al escalar las campañas.

El problema central: **los canales de adquisición de clientes digitales rara vez se comportan de forma lineal.**

Por ejemplo, observa este enfoque de asignación estándar defectuoso:

| Canal de marketing digital | ROAS medio histórico (línea base) | Asignación actual de gasto publicitario | Acción recomendada (método del promedio defectuoso) |
| ------------------------- | ---------------------------------: | --------------------------: | -----------------------------------------: |
| Anuncios de Google Search         |                                4.0 |                     $60,000 |                  Escalar (inversión máxima) |
| SEO orgánico               |                                3.8 |                     $20,000 |                       Mantener el nivel actual |
| Recomendación de socios          |                                5.5 |                          $0 |                      Ignorar (sin datos pasados) |

Esta recomendación parece racional en un panel de marketing estándar. 

Sin embargo, tras pasar los datos por nuestro **motor de decay del rendimiento marginal**, incorporando la **volatilidad del canal (riesgo)** y calculando la **concentración de la cartera**, la realidad cambia:

| Canal de marketing digital | ROAS marginal real (próximo dólar) | Recomendación de gasto optimizada |
| ------------------------- | -------------------------------: | -----------------------------: |
| Anuncios de Google Search         |                              3.2 |        $45,000 (reducir gasto)  |
| SEO orgánico               |                              4.1 |        $35,000 (escalar gasto)   |
| Recomendación de socios          |                              5.5 |        $10,000 (presupuesto de prueba)   |

La cartera de marketing óptima cambia por completo. 

El fracaso analítico no es la falta de informes de atribución de marketing. El fracaso es tratar la asignación de capital como un ejercicio de informes en lugar de un **problema de cartera de inversión**.

Construí este software para productizar un marco de decisión financiera repetible:
* El rendimiento histórico establece las expectativas base.
* Las curvas de rendimiento marginal modelan la disminución de la eficiencia publicitaria (decay del ROAS).
* El análisis de cartera cuantifica el riesgo de concentración en la plataforma.
* La simulación de Monte Carlo estima la probabilidad de ingresos a la baja.
* La optimización lineal identifica el rendimiento esperado más alto dentro de las restricciones operativas.

> **Con capital de marketing limitado, ¿adónde debería ir realmente el próximo dólar?** Esta herramienta proporciona la respuesta matemática.

---

## 👥 Para quién es esto (casos de uso y escenarios)

Esta herramienta de apoyo a la decisión está diseñada específicamente para roles de marketing y finanzas diferenciados:

* **CMO y VP de Marketing:** Necesitan una *plantilla de previsión de presupuesto de marketing* de alto nivel para defender las solicitudes de presupuesto trimestral ante el consejo con matemáticas de probabilidad en lugar de intuiciones.
* **Directores de Marketing de Rendimiento:** Buscan *software de asignación de medios pagados* para equilibrar el costo de adquisición de clientes (CAC) entre las carteras publicitarias de Google, Meta y TikTok.
* **Marketers de crecimiento B2B y líderes de generación de demanda:** Buscan una *calculadora de previsión de ROI* para equilibrar la velocidad de generación de leads con la capacidad operativa del equipo de ventas.
* **CMO fraccionales y agencias de marketing:** Necesitan un *marco de auditoría presupuestaria cross-canal* repetible para mostrar rápidamente a los nuevos clientes dónde su presupuesto actual pierde eficiencia.
* **Equipos de FP&A / Finanzas:** Evalúan *la eficiencia del capital de marketing* para garantizar que las inversiones en generación de demanda se alineen con los perfiles de riesgo de la empresa.

**Para quién no es:**

* Sustitutos de automatización de marketing empresarial (p. ej., HubSpot, Marketo).
* Software de seguimiento de atribución multitáctil (p. ej., Northbeam, TripleWhale).
* Ejecución de pujas publicitarias programáticas en tiempo real.

No se requiere experiencia avanzada en hojas de cálculo ni programación.

---

## Acerca de

Construyo herramientas de apoyo a la decisión ligeras para situaciones en las que hay demasiadas variables interactuando para gestionarlas mentalmente de forma fiable.

La pregunta detrás de la mayoría de estas herramientas es simple:

> **¿Qué información debe existir en un solo lugar para tomar la próxima decisión con confianza?**

El Simulador de Asignación de Presupuesto de Marketing es un ejemplo de este enfoque: convertir la asignación de presupuesto de marketing, de la intuición y los informes, en un marco analítico repetible.

---

## Detalles técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

## Arquitectura del libro

| Capa | Hoja de cálculo | Propósito                                       |
| ------ | ---------------------- | --------------------------------------------- |
| Entrada | 01_Settings            | Parámetros globales de simulación y optimización |
| Entrada | 02_Historical_Data     | Rendimiento histórico por canal                |
| Entrada | 03_Constraints         | Restricciones presupuestarias y operativas            |
| Entrada | 04_Marginal_Curves     | Funciones de rendimiento decreciente                  |
| Entrada | 05_Scenario_Inputs     | Definiciones de escenarios alternativos              |
| Motor | 06_Benchmark_Engine    | Métricas de rendimiento base                  |
| Motor | 07_Risk_Engine         | Análisis de volatilidad y concentración         |
| Motor | 08_Optimization_Solver | Optimización de cartera                        |
| Motor | 09_Simulation_Engine   | Simulación de Monte Carlo                        |
| Salida | 10_Executive_Summary   | Recomendaciones ejecutivas                     |
| Salida | 11_Scenario_Comparison | Comparación de escenarios                           |
| Salida | 12_Portfolio_Report    | Clasificación de cartera                      |

### Flujo de datos

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

## Tres trampas que atrapan incluso a equipos de marketing experimentados

### Trampa 1 — Suponer que el ROAS es constante

Se tomó una decisión:

```text
Google Ads ROAS = 4.0
Increase budget from $60k to $100k
```

El supuesto no percibido:

```text
ROAS remains constant regardless of spend level.
```

#### Resultado

| Gasto | Ingreso supuesto | Ingreso marginal real |
| ----- | --------------: | ----------------------: |
| $60k  |           $240k |                   $240k |
| $100k |           $400k |                   $320k |

La recomendación se vuelve incorrecta porque la eficiencia marginal disminuye.

Enfoque correcto:

* modelar rangos de presupuesto,
* estimar el ROAS marginal,
* optimizar frente a rendimientos por tramos.

<details>
<summary>Implementación de la fórmula</summary>

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

### Trampa 2 — Ignorar el riesgo de concentración de la cartera

Se tomó una decisión:

```text
Allocate 60% of budget to Google Ads.
```

La métrica no percibida:

```text
HHI concentration index.
```

| Asignación  |  HHI |
| ----------- | ---: |
| 60/20/20    | 0.44 |
| 45/35/10/10 | 0.34 |

La primera cartera produce un riesgo de dependencia de la plataforma sustancialmente mayor.

Enfoque correcto:

```excel
=SUMSQ(Allocation_Range)
```

Cuando:

```text
HHI > 0.30
```

se activan las alertas de riesgo.

<details>
<summary>Implementación de la fórmula</summary>

```excel
=SUMSQ(Recommended_Allocation_Pct_Range)
```

</details>

---

### Trampa 3 — Tratar los pronósticos como certezas

Se tomó una decisión:

```text
Expected revenue = $368,000
```

El supuesto no percibido:

```text
Future performance equals average historical performance.
```

La simulación de Monte Carlo reveló:

| Métrica             | Valor |
| ------------------ | ----: |
| Media               | $368k |
| Desv. estándar            |  $82k |
| P(ingresos > $400k) |   37% |
| P(ingresos < $250k) |   18% |

La recomendación cambió de:

```text
"Expected revenue is $368k."
```

a:

```text
"There is an 18% probability of severe underperformance."
```

<details>
<summary>Implementación de la fórmula</summary>

```excel
=NORM.INV(
RAND(),
Mean_ROAS,
Volatility
)
```

</details>

---

## Escenario de ejemplo

Una empresa de servicios B2B asigna:

| Canal    | Presupuesto actual |
| ---------- | -------------: |
| Google Ads |        $60,000 |
| SEO        |        $20,000 |
| Facebook   |        $20,000 |
| Recomendación   |             $0 |

El análisis histórico indica:

| Canal    | ROAS medio | Volatilidad |
| ---------- | --------: | ---------: |
| Google Ads |      3.68 |       0.12 |
| SEO        |      4.10 |       0.08 |
| Facebook   |      2.10 |       0.45 |
| Recomendación   |      5.50 |       0.60 |

Restricciones operativas:

* presupuesto total: $100,000,
* trabajos reservados máximos: 120,
* objetivo mínimo de leads: 350.

Resultados de la optimización:

| Canal    | Presupuesto recomendado |
| ---------- | -----------------: |
| Google Ads |            $45,000 |
| SEO        |            $35,000 |
| Facebook   |            $10,000 |
| Recomendación   |            $10,000 |

Resultados:

* los ingresos esperados aumentan de $320k a $368k,
* la concentración de la cartera disminuye un 22 %,
* los trabajos reservados esperados se mantienen por debajo de los límites de capacidad,
* la probabilidad de riesgo a la baja se mantiene aceptable.

Implicación para la decisión:

```text
The organization should diversify capital allocation
rather than increase spending on the historically
largest channel.
```

---

## Referencia de fórmulas

<details>
<summary>Motor de referencia</summary>

```excel
=SORT(UNIQUE(FILTER(Channel,Channel<>"")))
=SUMIFS(Spend,Channel,A2#)
=SUMIFS(Revenue,Channel,A2#)
=Revenue/Spend
=Spend/Booked_Jobs
```

</details>

<details>
<summary>Motor de riesgo</summary>

```excel
=STDEV.S(ROAS)
=SUMSQ(Allocation)
```

</details>

<details>
<summary>Motor de simulación</summary>

```excel
=SEQUENCE(1000)
=NORM.INV(RAND(),Mean,SD)
=SUMPRODUCT()
=COUNTIF()
```

</details>

<details>
<summary>Motor de optimización</summary>

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

## Reglas de validación

| Campo             | Regla                    | Comportamiento ante errores       |
| ----------------- | ----------------------- | -------------------- |
| Meses históricos | Mínimo 12 meses       | Fallo de validación   |
| Gasto             | Debe ser ≥ 0             | Rechazar entrada         |
| Ingresos           | Debe ser ≥ 0             | Rechazar entrada         |
| Trabajos reservados       | ≤ leads                 | Advertencia              |
| Asignación de presupuesto | La suma iguala el presupuesto total | Rechazo del solucionador     |
| Límites de canal    | Dentro de mín/máx          | Violación de restricción    |
| Tramos marginales    | Intervalos continuos    | Error de cálculo    |
| Número de simulaciones  | 100–5000                | Validación de entrada     |
| Matrices dinámicas    | Sin rangos de desbordamiento bloqueados | Error #SPILL!        |

</details>

---

## La lógica de negocio: metodología e impacto comercial

Muchas organizaciones tratan la asignación de presupuesto de marketing como un ejercicio de informes orientado al pasado—simplemente escalar los canales de mejor rendimiento de ayer. En realidad, la adquisición de clientes digital es un **problema dinámico de asignación de capital**. 

Este conjunto de herramientas desplaza la conversación de *"¿Cuál fue nuestro ROAS histórico?"* a *"¿Dónde generará nuestro próximo dólar el rendimiento marginal más alto sin exponer el negocio a un riesgo de algoritmo inaceptable?"*

Esta es la metodología financiera subyacente y cómo resuelve problemas comerciales específicos:

### 1. El problema comercial: la falacia del escalado lineal y el desperdicio de capital

El error más caro del marketing digital es suponer rendimientos lineales. Si $10,000 de gasto publicitario generan un ROAS de 4,0, los equipos de marketing suponen a menudo erróneamente que $100,000 de gasto producirán la misma eficiencia. 
*   **El defecto de los promedios estáticos:** Las plataformas como Meta y Google agotan primero sus audiencias de mayor intención. A medida que escalas el gasto, pagas más por llegar a usuarios de menor intención, lo que hace caer el ROAS. Escalar a ciegas basándose en promedios históricos garantiza el desperdicio de gasto publicitario.
*   **La solución:** Este conjunto de herramientas sustituye los promedios estáticos por **curvas de rendimiento marginal** para modelar la realidad.

### 2. La metodología central (cómo funciona)

El motor aplica principios de las finanzas cuantitativas y la investigación de operaciones a los datos de marketing:

*   **Decay del ROAS marginal (funciones por tramos):**
    El algoritmo modela los rendimientos decrecientes de cada plataforma publicitaria. Calcula el punto de saturación exacto donde un canal se vuelve ineficiente y recomienda automáticamente un cambio de presupuesto a un canal secundario (como SEO o Recomendaciones) antes de que se desperdicie capital.
*   **Teoría moderna de cartera y riesgo de concentración (HHI):**
    Al tratar los canales de marketing como una cartera de inversión, la herramienta calcula el índice Herfindahl-Hirschman (HHI). Si tus ingresos dependen en un 80 % de Meta Ads, estás a una actualización de algoritmo de una crisis de flujo de caja. El modelo penaliza activamente la sobreconcentración, forzando la diversificación.
*   **Previsión estocástica (simulación de Monte Carlo):**
    Los ciclos de venta B2B y las subastas publicitarias son volátiles. En lugar de ofrecer un único pronóstico de ingresos determinista que inevitablemente será erróneo, el motor ejecuta miles de trimestres simulados usando desviaciones estándar históricas. Genera distribuciones de probabilidad (p. ej., "Existe una probabilidad estadística del 18 % de que no alcancemos nuestro objetivo de ingresos a la baja").
*   **Optimización lineal con restricciones (motor solucionador):**
    Busca matemáticamente el ingreso esperado más alto respetando estrictamente tus realidades de negocio—como la capacidad operativa máxima (para no generar más leads de los que ventas puede cerrar) y los límites absolutos de presupuesto.

### 3. El resultado comercial (valor de negocio)

Al tratar el marketing como una cartera financiera cuantificable, la herramienta produce inteligencia de negocio objetiva:
*   **Para el CMO y el consejo:** Proporciona solicitudes de presupuesto defendibles matemáticamente. Puedes sustituir "creemos que esto funcionará" por "esta asignación maximiza los ingresos manteniendo el riesgo a la baja por debajo del 15 %."
*   **Para los compradores de medios:** Identifica exactamente cuándo dejar de escalar una campaña, eliminando las conjeturas del ritmo presupuestario diario.
*   **Para finanzas y operaciones:** Garantiza la alineación entre el gasto en generación de demanda, los límites de capital de trabajo y la capacidad del equipo de ventas.

---

## Otras herramientas de esta serie

* **Inventory Planning & Replenishment Simulator** — optimizar decisiones de compra bajo incertidumbre.
* **Paid Media Reporting Architecture Framework** — sistemas de informes escalables para agencias.
* **VAT Compliance & Calculation Console** — flujos de trabajo de conciliación fiscal multiplataforma.
* **Project Cost Allocation Dashboard** — rentabilidad operativa y análisis de mano de obra.
* **DTC Inventory Governance Console** — gestión del riesgo de inventario para marcas multimercado.

Más herramientas: **Perfil de GitHub / [Nuestro sitio web](https://www.theseusworkshop.com/)**

---

## Licencia

Este proyecto está licenciado bajo la **Apache License 2.0**.

Consulta el archivo `LICENSE` para más detalles.
