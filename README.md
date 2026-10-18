<p align="center">
  <img src="docs/assets/bioauth-banner.svg" alt="BioAuth — Trust through biometric evidence. TED University, CMPE 492." width="100%" />
</p>

<p align="center">
  <a href="https://bioauth-deploy.vercel.app"><strong>Project website</strong></a>
  &nbsp; · &nbsp;
  <a href="https://bioauth-deploy.vercel.app/technology">Research</a>
  &nbsp; · &nbsp;
  <a href="https://bioauth-deploy.vercel.app/reports">Reports</a>
  &nbsp; · &nbsp;
  <a href="https://bioauth-deploy.vercel.app/team">Our team</a>
</p>

## The project

**BioAuth** is a TED University Computer Engineering senior project exploring more reliable remote biometric verification. Its focus is a **quality- and attack-aware fusion engine** that considers facial identity, visual attack indicators and physiological evidence together.

The project investigates how these signals can support verification before sensitive digital actions, while giving a clear reason to accept, reject or request another capture.

## Our approach

| Evidence | What it contributes |
| :--- | :--- |
| **Face verification** | One-to-one comparison with an approved reference to assess identity. |
| **Visual PAD** | Independent assessment of presentation attack indicators. |
| **Physiological signals** | Pulse-related colour variations from facial video, analysed with rPPG methods. |
| **Capture quality** | Context about lighting, motion and signal reliability. |

The proposed fusion policy evaluates the reliability and agreement of the available evidence. Its three outcomes make uncertainty explicit:

- **ACCEPT** · sufficient evidence supports verification
- **REJECT** · reliable mismatch or attack evidence prevents verification
- **RETRY** · another capture is needed to reach a supported decision

Our research examines the balance between security, genuine-user experience, retries and processing cost. Physiological signals are interpreted alongside identity, presentation and capture quality.

## The team

Four Computer Engineering students at **TED University**, working together through CMPE 491 and CMPE 492:

- **Esra Eda Kılıç**
- **Enes Taşçı**
- **Ömer Taylan Alemdar**
- **Batuhan Mert Korkmaz**

**Project supervisor:** Dr. Ulaş Güleç

**Jury members:** Prof. Dr. Saiful Islam · Prof. Dr. Tolga Kurtuluş Çapın

## Project reports

The reports trace BioAuth from its initial proposal to the detailed design of the current system.

| Course | Document |
| :--- | :--- |
| CMPE 491 | [Project Proposal](public/reports/bioauth-project-proposal.pdf) |
| CMPE 491 | [Project Specifications](public/reports/bioauth-project-specifications.pdf) |
| CMPE 491 | [Project Analysis](public/reports/bioauth-project-analysis.pdf) |
| CMPE 491 | [High-Level Design](public/reports/bioauth-high-level-design.pdf) |
| CMPE 492 | [Low-Level Design · v1](public/reports/bioauth-low-level-design-v1.pdf) |

The CMPE 492 Low-Level Design Report describes the current scope and policies. Earlier reports document the project's evolution.

---

<p align="center">
  <sub>Academic research prototype · Design and implementation in progress<br />
  The website's interactive console uses simulated data; measured biometric performance has not yet been published.</sub>
</p>
