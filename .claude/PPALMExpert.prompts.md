# Power Platform ALM Expert — HTML Page Brief

## Role
Senior Power Platform Solution Architect and ALM Engineer with hands-on enterprise delivery experience.

## Goal
Generate a single, complete, self-contained HTML page — a practitioner-grade reference that covers **what actually determines ALM success and failure** in Power Platform enterprise projects. No theory padding. No vague guidance. Everything must be actionable.

---

## Target audience (two tiers — address both)
- **Primary**: architects, senior pro-devs, DevOps engineers implementing ALM
- **Secondary**: technical decision-makers who must choose between tooling options and understand licensing/governance impact

---

## Scenario (apply throughout every section)
- 10 developers, each with an isolated individual dev environment
- Environment chain: **Dev → Test/UAT → Stage → Production (Managed)**
- Azure DevOps is preferred; cover Power Platform Pipelines as the alternative
- Solution components in scope: Canvas apps, Model-driven apps, Power Automate flows, Dataverse tables/columns/forms/views, Custom connectors, Connection references, Environment variables, Copilot Studio agents, PCF controls and plugins
- All ALM tooling choices must account for this team structure

---

## HTML output specification

### Technical requirements
- Single self-contained `.html` file — all CSS and JS inline in `<head>` / end of `<body>`
- First tag inside `<head>`: `<script src="../js/vault.js"></script>`
- Second tag: `<link rel="stylesheet" href="../css/base.css">`
- Load **Mermaid.js** from CDN (`https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js`) — initialise with `startOnLoad: true`
- Load **Prism.js** (CDN) for syntax highlighting: `yaml`, `bash`, `json` languages
- All YAML/code examples inside `<pre><code class="language-yaml">` blocks

### Layout and navigation
- Sticky left sidebar (220px) with section navigation items and count badges (`.nn` class)
- Active section highlighting — JS `IntersectionObserver` or click-to-show pattern
- Search bar that filters across all visible content
- Sticky progress bar at top of viewport
- Back-to-top button
- All long YAML blocks in `<details><summary>` accordions — **collapsed by default** to keep the page scannable
- Print-friendly: `@media print { sidebar, search, controls: display:none }`

### Visual design — fresh, not copying any prior page
- **Colour palette**: sidebar background `#0f172a` (dark navy), primary accent `#0ea5e9` (sky blue), warning `#f59e0b` (amber), danger `#ef4444` (red), success `#22c55e` (green), page background `#f8fafc`
- **Typography**: body `'Inter', system-ui, sans-serif`; code `'JetBrains Mono', 'Cascadia Code', monospace`
- **Callout box types**:
  - ✅ `.cb-do` — green left border, `#f0fdf4` bg — best practice
  - ⚠️ `.cb-warn` — amber left border, `#fffbeb` bg — important warning
  - ❌ `.cb-anti` — red left border, `#fef2f2` bg — anti-pattern
  - 💡 `.cb-tip` — sky left border, `#f0f9ff` bg — expert tip
- **Tables**: zebra-striped, sticky header on overflow, responsive horizontal scroll
- **Mermaid diagrams**: centred, max-width 700px, `theme: 'base'` with custom variables matching the colour palette
- **Section icons** in sidebar: emoji or simple SVG, consistent with section topic

---

## Content sections — generate in this exact order

---

### Section 1 — Decision Framework (start here — highest ROI content)

**Title**: "Choosing Your ALM Toolchain"

Produce:
- A **comparison table** across 4 columns: Power Platform Pipelines / Azure DevOps + PAC CLI / ALM Accelerator / Hybrid
- Row dimensions: Team type fit | Governance maturity needed | Multi-dev support | Automation depth | Licensing cost | Rollback capability | Skill barrier | Regulated environment suitability
- A **Mermaid flowchart** decision tree: starts with "Is the team citizen-dev or pro-dev?" → branches → arrives at a tool recommendation
- A **client recommendation matrix** table: 5 realistic enterprise scenarios (rows) × 4 tools (columns) with ✅ / ⚠️ / ❌ rating
- Flag: what happens if you outgrow Power Platform Pipelines mid-project

---

### Section 2 — ALM Foundation: What Kills Projects (second — put danger first)

**Title**: "The 6 Foundation Decisions That Determine Project Failure or Success"

This section is about structural correctness BEFORE you write a single pipeline. Cover:

#### 2a. Managed vs Unmanaged solution layers
- What the managed/unmanaged layer is, why it exists
- What happens when developers customise in downstream environments using unmanaged layers (the "unmanaged layer corruption" problem)
- ❌ Anti-pattern: importing unmanaged solutions to Test/UAT/Prod and why it silently destroys ALM
- ✅ Rule: managed solutions ONLY in Test/Stage/Prod — how to enforce this
- How the `stage-and-upgrade` vs `update` upgrade behaviour affects component deletion

#### 2b. Solution segmentation strategy
- ❌ Anti-pattern: one giant monolith solution for everything
- ✅ Recommended layered approach: `01-CoreData` (Dataverse schema) → `02-SharedComponents` (shared PCF, connectors, env vars) → `03-AppName` (app-specific flows, canvas/MDA app) — dependency chain
- Decision table: when does segmentation help vs add complexity?
- Rule: never include components from one bounded domain in another solution

#### 2c. Publisher prefix and naming conventions
- Why publisher prefix must be agreed BEFORE any component is created — it cannot be changed post-deployment
- Recommended prefix format and naming scheme
- ❌ Anti-pattern: using the default `new_` publisher in enterprise projects
- Environment variable naming, connection reference naming, solution naming conventions (table)

#### 2d. Managed Environments and licensing
- What a Managed Environment is and what it unlocks (Pipelines requirement, DLP enforcement, weekly digest, IP firewall)
- Whether Power Platform Pipelines REQUIRE Managed Environments for target stages → precise answer
- Whether end users of apps in a Managed Environment need premium licensing — precise answer (one qualifying premium license covers both Power Apps + Power Automate flows; distinguish standard-app vs premium-connector scenarios)
- ⚠️ Flag: licensing policy is subject to Microsoft change — validate with account team before project start
- Practical advice: which environments should be Managed and which should not

#### 2e. Component merge compatibility
A **merge risk table** with columns: Component type | Merges cleanly in git | Conflict-prone | Ownership rule recommended
Rows: Canvas app | Model-driven form | Sitemap | Cloud flow | Environment variable | Connection reference | PCF control | Plugin assembly | Dataverse table | Ribbon/command bar

#### 2f. Naming and governance baseline checklist
A ✅ checklist of 10 items that must be in place before any pipeline is created.

---

### Section 3 — Environment Strategy

**Title**: "Environment Chain Architecture"

Produce:
- A **Mermaid diagram** showing the full environment chain: `[Dev-1..Dev-10] → [Build/Validate] → [Test/UAT] → [Stage] → [Production]` — annotate each with: environment type (Developer/Sandbox/Production), Managed status, security group, who owns it
- A **table** with columns: Environment | Type | Managed | Owner | Security group | Purpose | Solution type allowed (managed/unmanaged)
- Notes on pipeline host environment placement (for Power Platform Pipelines)
- Notes on build/validation environment purpose for Azure DevOps (no users — only service principal)
- Region and data residency considerations (one paragraph, practical)
- Security group recommendation per environment (principle of least privilege)

---

### Section 4 — Multi-Developer Source Control Strategy

**Title**: "How 10 Developers Merge Without Breaking Each Other"

Key message up front: **source control is the single source of truth — not environments.**

Cover:
- Why "sync environments" is not a merge strategy
- Unpacked solution in git (PAC CLI `pac solution unpack`) — what unpacking produces, why it enables diffs
- **Branching model**: feature → develop → release → main (GitFlow lite) — compare vs trunk-based (when trunk-based works for Power Platform)
- A **Mermaid git branching diagram** showing feature branch → PR → develop → release → main promotion
- PR process: who reviews, what they check, what automated checks run (solution checker, unpack diff)
- **"Day in the life" — developer flow**: pull latest develop → create feature branch → make changes in dev env → pac solution export → pac solution unpack → commit → push → PR
- **"Day in the life" — release manager flow**: merge develop → release → trigger build pipeline → artifact → promote to Test → approve → Stage → approve → Prod
- Hotfix strategy: hotfix branch from main → deploy to Prod → backport to develop
- Component ownership model to reduce conflicts (who owns which form/app/flow)
- Dataverse Git integration (native YAML format, 2024+): when to use it vs PAC CLI unpack

---

### Section 5 — Azure DevOps Implementation

**Title**: "Azure DevOps ALM: Setup to Production"

#### 5a. Prerequisites and service principal setup
- App registration → Dataverse app user → assign System Administrator (scope to environment) — exact steps
- ADO service connection (Power Platform service connection type)
- Variable groups and Azure Key Vault linkage for secrets
- PAC CLI vs Power Platform Build Tools: recommend PAC CLI, note Build Tools task equivalents
- Agent pool: Microsoft-hosted vs self-hosted (when self-hosted is needed)

#### 5b. Repository structure
One code block showing the recommended folder layout:
```
/solutions
  /SolutionName
    /src (unpacked solution)
/pipelines
  /templates
  ci-build.yml
  cd-deploy.yml
/config
  /test
    deployment-settings.json
  /stage
    deployment-settings.json
  /prod
    deployment-settings.json
/scripts
  pack-solution.ps1
  validate-solution.ps1
```

#### 5c. CI pipeline design
Trigger → export & unpack → solution checker → increment version → pack managed → publish artifact → notify

Key decisions: when to export from dev env vs build from unpacked source (recommend: build from source)

#### 5d. CD pipeline design (multi-stage)
Stage 1 (Test): deploy managed artifact → run post-deploy validation → auto-approve or wait
Stage 2 (Stage): manual approval gate → deploy → smoke test
Stage 3 (Prod): manual approval gate → deploy → post-deploy checklist → tag release

Connection reference and environment variable injection via deployment settings — explain the pattern.

#### 5e. YAML examples (3 focused examples — in accordions, collapsed by default)
1. **PR validation pipeline**: trigger on PR → solution checker → post status check
2. **Build pipeline**: export → unpack → version → pack managed → publish artifact
3. **Release pipeline**: multi-stage with approval gates, deployment settings injection

Use PAC CLI tasks as primary. One comment per task noting the Build Tools equivalent.
Keep examples focused — not full working enterprise pipelines, but complete enough to understand the pattern.

---

### Section 6 — Power Platform Pipelines

**Title**: "Power Platform Pipelines: Setup, Strengths, and Gaps"

Cover:
- What Pipelines provide and who they are designed for
- Step-by-step setup: host env → install Deployment Pipeline Configuration app → link environments → create pipeline record → add stages → configure approvals → delegated deployment
- Environment variable and connection reference handling at deployment time (inline UI configuration)
- Redeploy prior version: exact UI steps
- A **Mermaid deployment flow diagram**
- **Gap table**: feature comparison ADO vs Pipelines — what Pipelines cannot do today (no solution checker integration, no external secret injection, limited branching support, etc.)
- When to graduate from Pipelines to ADO: trigger criteria

---

### Section 7 — Testing and Quality Gates

**Title**: "Automated Testing: What's Realistic in Power Platform ALM"

Be honest about current limitations. Cover:
- **Solution Checker**: when to run (PR gate vs build gate), how to fail pipeline on High/Critical rules, rule categories that matter most
- **Post-deployment validation**: automated checks for env var presence, connection reference status, flow enabled/disabled state — PowerShell patterns
- **Power Apps Test Studio**: scope, limitations, what it is good for (regression for canvas apps), what it is not (not a CI gate tool today)
- **PAC CLI test commands**: what exists
- **Manual smoke test checklist**: what release manager verifies after each stage deployment (template)
- ⚠️ Honest callout: true automated end-to-end UI testing for Power Platform is immature — plan for manual UAT at Stage

---

### Section 8 — Configuration and Secrets Management

**Title**: "Environment Variables, Connection References, and Secrets"

Cover:
- What goes in source control vs deployment settings vs Azure Key Vault vs never anywhere
- A **decision table**: Artefact type | Store in source control | Store in deployment settings | Store in Key Vault | Notes
  - Rows: Environment variable value | Connection reference | Service principal secret | API key | SharePoint site URL | Storage account name | Feature flag | Tenant ID
- Connection reference post-deployment configuration: why apps/flows break after deployment if connection refs are not pre-configured, and how deployment settings files solve this
- Flow and app ownership post-deployment: why flows owned by service principals can fail in user-context scenarios — recommended pattern
- ❌ What must never be hardcoded (env-specific URLs, secrets, user GUIDs)

---

### Section 9 — Rollback Strategy

**Title**: "Rollback: When It's Safe, When It's Dangerous, and How to Decide"

Cover for **both ADO and Pipelines**:
- A **decision table**: Scenario | Rollback safe? | Risk | Recommended action
  - Rows: Schema change (column added) | Schema change (column deleted) | Flow logic change only | App UI change only | Data migration applied | Managed solution layer corruption
- ADO rollback: redeploy prior managed artifact, `stage-and-upgrade` vs `update` risk (update leaves deleted components as unmanaged orphans)
- Pipelines rollback: exact UI steps to redeploy prior version
- Hotfix-forward vs rollback decision model (table with decision criteria)
- Pre-rollback checklist (8 items)
- Post-rollback verification checklist (6 items)
- ⚠️ Key message: rollback is a last resort — forward hotfix is almost always safer after a destructive schema change

---

### Section 10 — Copilot Studio ALM

**Title**: "Copilot Studio Agent ALM"

Cover what is different vs standard component ALM:
- What travels in a solution: agent definition, topics, entities, knowledge source references, actions, environment variable references — **what does NOT travel**: authenticated knowledge source credentials, SharePoint site content, Dataverse environment-specific data
- Post-deployment configuration required: re-authenticate knowledge sources, update SharePoint site/list pointers, re-enable channels, test handoff to human agents
- Testing options: manual conversation testing, test campaigns in Copilot Studio (current state), no native CI gate today
- Connection to Power Automate flows triggered by agents: ALM considerations for those flows
- Governance checkpoints: content moderation, security roles for bot users, DLP policy impact on channels
- ⚠️ Callout: agent ALM is evolving rapidly — validate against current Copilot Studio release notes before project start

---

### Section 11 — Best Practices and Anti-Patterns Quick Reference

**Title**: "ALM Decision Cards: Do / Do Not"

Two-column layout (✅ Do / ❌ Do Not) — 15 rows minimum. Each row is a single crisp rule — no explanations, just the rule. This is a quick-reference card, not a tutorial. Topics must cover:
- Solution layer (managed/unmanaged)
- Publisher prefix
- Solution segmentation
- Shared dev environment
- Direct prod changes
- Deployment settings
- Connection reference ownership
- Environment variable hardcoding
- Branch strategy discipline
- Solution checker as a gate
- Rollback vs hotfix-forward
- Flow/app ownership by service principal
- DLP and Managed Environment setup order
- PCF and plugin solution separation
- Approval gate discipline

---

## Content quality rules (apply to all sections)
- ❌ No prose intros like "In this section we will explore..." — go straight to the content
- ❌ No "it depends" without a decision table or criteria list
- ✅ Prefer tables, numbered steps, callout boxes over paragraphs
- ✅ Use Mermaid for any flow or branching diagram (not ASCII)
- ✅ Flag anything that is time-sensitive or subject to Microsoft licensing change with ⚠️
- ✅ Every YAML block must be inside a `<details>` accordion (collapsed by default)
- ✅ Section headers must match the sidebar navigation items exactly
- ✅ Each sidebar nav item must show a count badge (number of key items/questions/rules in that section)
