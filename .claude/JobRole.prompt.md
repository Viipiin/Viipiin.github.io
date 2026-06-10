Act as a senior Microsoft Power Platform Solution Architect, Governance Lead, ALM specialist, and expert UI/UX designer.

I want you to generate a **single-file, production-quality HTML page** that acts as my **interactive Power Platform Expert Guide / Help Manual / Practical Handbook** for a new project role.

## My role context
I am transitioning into responsibilities where I need to operate like a:
- Power Platform Expert
- Governance advisor
- Center of Excellence / Center of Enablement contributor
- Citizen Developer program enabler
- ALM and deployment advisor
- Pipelines / DevOps / PowerShell / automation practitioner
- Team maturity coach for best practices, standards, and enterprise ways of working

I already have **some existing HTML pages** on a few of these topics, so this new HTML page should be designed to:
1. **Consolidate and unify knowledge**
2. **Avoid duplication where possible**
3. **Fill gaps**
4. **Act as a practical field guide**
5. **Be visually polished and easy to navigate**
6. **Help me gain confidence, knowledge, and real project readiness**

---

## Important instruction about existing HTML pages
I may provide existing HTML page content, snippets, or summaries later.
Design the output so it can:
- absorb and merge existing content
- preserve strong parts from older pages
- identify duplicate topics
- recommend where to reuse vs replace content
- add a section called **“Imported / Reused Content Map”**
- add another section called **“Gaps to Fill Next”**

If existing HTML content is not provided, still generate the full guide structure with placeholder notes such as:
- “Insert existing governance page here”
- “Link current pipeline page here”
- “Compare with existing ALM page”

---

## Output format requirements
Generate a **single self-contained HTML file** with:
- HTML
- embedded CSS
- embedded JavaScript
- no build tools required
- no external dependencies unless absolutely necessary
- responsive layout
- modern enterprise UI
- polished UX
- elegant typography
- sticky left navigation or floating section navigator
- search/filter capability for sections
- collapsible accordions for deep-dive topics
- cards for quick tips and best practices
- copy-to-clipboard buttons for commands/snippets
- tabs where useful (for Dev/Test/UAT/Prod comparisons, or Pipelines vs Azure DevOps)
- progress tracker / roadmap visuals
- warning / note / best-practice callout styles
- printable-friendly layout
- dark/light mode toggle if possible
- accessible semantics (ARIA where appropriate)
- smooth scrolling
- clean spacing and section hierarchy

The page should look like an internal **expert knowledge portal**, not a plain document.

---

## Primary purpose of the guide
This HTML guide must help me become effective in the following areas:

### 1. Power Platform Governance
Cover:
- governance goals
- why governance matters
- enterprise guardrails
- environment strategy
- DLP strategy
- governance operating model
- roles and responsibilities
- admin vs maker responsibilities
- security considerations
- compliance mindset
- managed environments considerations
- monitoring, observability, and reporting
- ownership and support models
- app lifecycle ownership
- app/flow inventory and visibility
- production support expectations
- standards and controls

### 2. Center of Excellence / Center of Enablement
Cover:
- what a CoE is and what it is not
- value proposition of a CoE
- governance + enablement balance
- core team structure
- executive sponsorship
- KPIs and measurable outcomes
- operating cadence
- intake process
- review boards / architecture reviews
- standards publication model
- reusable assets and templates
- internal community building
- communications plan
- support channels
- office hours
- scaling model for enterprise maturity

IMPORTANT:
Make sure the guide clearly explains that a CoE is not only tooling — it includes people, process, communication, standards, governance, training, and continuous improvement.

### 3. Citizen Developer Program
Cover:
- what citizen development means in a controlled enterprise
- maker onboarding pathway
- learning paths
- approval model for building apps/flows
- when makers can use default environment vs dedicated environments
- app classification
- risk tiers
- support boundaries
- reusable templates and starter kits
- governance guardrails that enable, not block
- training and certification approach
- champions program
- community nurture strategy
- escalation to pro-dev / architecture teams
- “when not to use Power Platform” guidance

### 4. ALM (Application Lifecycle Management)
Cover:
- why ALM matters in Power Platform
- solutions as the ALM foundation
- unmanaged vs managed solutions
- solution segmentation
- versioning strategy
- dependency handling
- naming standards
- publishing strategy
- release governance
- layer awareness
- avoiding direct production edits
- rollback / recovery considerations
- healthy ALM principles
- source control strategy
- solution packaging guidance
- deployment checklist
- release readiness checklist

### 5. Pipelines / Deployment Strategy
Cover in detail:
- Power Platform Pipelines
- when to use them
- advantages and limitations
- deployment approvals
- release promotion through Dev → Test → UAT → Prod
- deployment profiles / deployment settings concepts
- handling environment variables
- handling connection references
- release responsibility model
- auditability
- deployment risk controls
- common pain points and how to avoid them

Also compare:
- Power Platform Pipelines
- Azure DevOps
- PAC CLI
- PowerShell automation

Include a **decision matrix**:
- “Use Power Platform Pipelines when…”
- “Use Azure DevOps when…”
- “Use both when…”
- “Use PowerShell for…”
- “Use PAC CLI for…”

### 6. Canvas Apps + Cloud Flows Deployment Best Practices
This area is critical.

Cover practical enterprise deployment guidance for:
- Power Apps Canvas apps
- Power Automate Cloud flows
- solutions-based development
- connection references
- environment variables
- deployment settings files
- service account / service principal considerations
- ownership model for flows
- avoiding personal-account dependencies
- packaging app + associated flows
- release strategy across Dev/Test/UAT/Prod
- config management
- troubleshooting broken connections post-deployment
- environment-specific data source handling
- SharePoint, Dataverse, API endpoint examples
- common mistakes teams make
- “what good looks like”

Include a section:
## “Current Team Situation”
The current team has:
- separate Power Pipelines for individual Canvas forms + associated Cloud workflows
- unmanaged solution packaging
- no premium licensing
- challenges changing environment variables
- challenges with connections
- efficiencies issues

Use this situation to provide:
- architectural critique
- maturity recommendations
- immediate improvements
- short-term actions
- medium-term roadmap
- target-state deployment model

### 7. PowerShell + Azure DevOps + Automation
Cover:
- where PowerShell helps
- where Azure DevOps helps
- where PAC CLI helps
- when native pipelines are enough
- service connection concepts
- deployment settings JSON concepts
- solution export/import automation concepts
- source control integration
- automated validations
- solution checker concepts
- change management automation
- release governance automation
- reusable script patterns
- logging and troubleshooting

### 8. Tips, Tricks, Dumps, Shortcuts, and Practical Wisdom
Include sections like:
- “Things architects watch for immediately”
- “Top 25 mistakes teams make”
- “Red flags in a Power Platform tenant”
- “Questions to ask in the first 2 weeks”
- “Quick wins for governance”
- “Quick wins for ALM”
- “Quick wins for citizen development”
- “Quick wins for pipeline efficiency”
- “What to standardize first”
- “How to speak to PMs / leads / admins / makers”
- “Cheat sheet: environment variables”
- “Cheat sheet: connection references”
- “Cheat sheet: solution strategy”
- “Cheat sheet: release governance”
- “Cheat sheet: Power Platform terminology”
- “Troubleshooting dump”
- “Interview-style expert questions and sample answers”
- “Architect talking points”
- “Meeting checklist”
- “Production readiness checklist”
- “Governance checklist”
- “CoE launch checklist”
- “Citizen developer onboarding checklist”

### 9. Role Enablement / Personal Learning Section
Create a section specifically to help me grow into this role.

Include:
- 30-day learning plan
- 60-day maturity plan
- 90-day contribution plan
- what to learn first
- what to practice hands-on
- what to discuss with PM / architect / admin stakeholders
- what artifacts I should create
- what standards I should propose
- what dashboards / reports would be useful
- what questions I should ask to understand the tenant
- how to build credibility fast in this role

### 10. Reusable Templates Section
Add practical templates:
- governance charter template
- CoE charter outline
- solution review checklist
- release checklist
- environment strategy checklist
- citizen developer policy outline
- deployment readiness checklist
- maker onboarding checklist
- support model outline
- naming convention starter guide
- app registration / connection ownership decisions list

### 11. Architecture Recommendations Section
Include a practical section titled:
## “Recommended Enterprise Setup for This Project”
Create a realistic target-state recommendation using:
- Dev
- Test
- UAT
- Prod

Explain:
- development standards
- managed vs unmanaged usage
- release movement
- ownership model
- how to handle environment variables
- how to handle connection references
- how to standardize deployments
- how to reduce manual effort
- where Power Platform Pipelines fit
- where Azure DevOps fits
- where PowerShell fits
- how to make the operating model more efficient

### 12. Anti-Patterns Section
Include a section:
## “What NOT to do”
Examples:
- building outside solutions
- direct edits in Prod
- hardcoding environment URLs
- personal connections in critical flows
- unmanaged downstream deployments
- undocumented flow ownership
- one-off pipeline patterns with no standards
- no naming standard
- no DLP thinking
- no support model
- no environment strategy
- no release approvals

---

## Content style requirements
The page should be:
- practical
- enterprise-grade
- hands-on
- visually digestible
- not overly academic
- architect-friendly
- easy for a manager, PM, or delivery lead to understand too
- full of applied examples
- realistic and opinionated when useful
- focused on “how to actually do this in a project”

Avoid generic fluff.

---

## Visual/UX requirements
The HTML guide should include:
- Hero section at the top with title, subtitle, and purpose
- sticky navigation sidebar
- section badges such as Beginner / Intermediate / Advanced / Critical
- expandable/collapsible content blocks
- “Quick Read” summary boxes
- “Deep Dive” expandable sections
- “Practical Example” cards
- “Architecture Note” callouts
- “PM Talking Point” callouts
- “Interview Prep” callouts
- “Do / Don’t” cards
- icon-like visual indicators using CSS if no library is used
- a dashboard-style summary area with:
  - governance maturity
  - ALM maturity
  - pipeline maturity
  - citizen developer maturity
  - next-step priorities

Also include:
- searchable glossary
- clickable table of contents
- back-to-top button
- section completion indicators if possible

---

## Technical content depth requirements
Where relevant, include examples for:
- environment variables
- connection references
- deployment settings JSON
- PAC CLI commands
- PowerShell snippets
- Azure DevOps YAML snippets
- naming standards
- semantic versioning
- release sequencing
- issue remediation examples
- troubleshooting broken deployment scenarios

However:
- keep examples concise and readable
- explain why the example matters
- pair each example with a short interpretation

---

## Governance maturity framing
Organize guidance in maturity levels:
- Level 1: Ad hoc / fragmented
- Level 2: controlled but inconsistent
- Level 3: standardized
- Level 4: scalable and governed
- Level 5: optimized and measurable

Use this maturity model across:
- governance
- ALM
- pipelines
- citizen development
- support model

---

## Page sections to generate
At minimum, include these top-level sections:
1. Overview
2. My Role in This Project
3. What Success Looks Like
4. Governance Fundamentals
5. CoE / Enablement
6. Citizen Developer Program
7. ALM Foundations
8. Deployment Architecture
9. Power Platform Pipelines
10. Azure DevOps / PAC CLI / PowerShell
11. Environment Variables & Connection References
12. Canvas Apps + Cloud Flows Best Practices
13. Dev / Test / UAT / Prod Model
14. Practical Tips & Tricks
15. Dumps / Cheat Sheets / Quick Reference
16. Checklists & Templates
17. Common Problems & Troubleshooting
18. Anti-Patterns
19. 30-60-90 Day Learning Plan
20. Recommended Next Actions
21. Imported / Reused Content Map
22. Gaps to Fill Next
23. References

---

## Important content constraints
- Prefer Microsoft-aligned and enterprise-safe best practices.
- Emphasize solutions-based ALM.
- Explain when managed vs unmanaged should be used.
- Clarify the purpose of environment variables and connection references.
- Show how to improve deployment efficiency.
- Keep the guide grounded in real-world enterprise delivery.
- If you reference the CoE Starter Kit, explain that it should be treated as a reference implementation / accelerator, not the whole operating model.
- If possible, note that some governance capabilities are now available through the Power Platform admin center and that governance is not only about installing a kit.
- Make all recommendations actionable.

---

## Source and credibility behavior
If browsing is available, ground the guide in current Microsoft Learn / Microsoft documentation and include a short references section.
If browsing is not available, clearly state assumptions and avoid inventing fake links.

---

## Final output requirement
Return only the final **complete HTML code** in one block, ready to save as:
power-platform-expert-NewRole-guide.html

Make the result polished enough that it feels like an internal consulting deliverable or architect playbook.