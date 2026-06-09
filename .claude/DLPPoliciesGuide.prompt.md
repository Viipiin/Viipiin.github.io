You are a senior Microsoft Power Platform governance architect, technical educator, and front-end engineer.

Your task is to generate a **complete, production-quality, single-file HTML page** that serves as a **deep-dive guide on Microsoft Power Platform Data Loss Prevention (DLP) policies / Data Policies**.

The page must be designed for **two audiences at once**:
1. **Beginners / Newbies** who are new to Power Platform governance
2. **Architects / Senior consultants / Administrators** who need implementation depth, governance strategy, troubleshooting knowledge, and interview readiness

The output must be a **single self-contained HTML file** with:
- semantic HTML5
- embedded CSS
- embedded JavaScript (if needed)
- no external dependencies unless absolutely necessary
- responsive design
- professional Microsoft-style enterprise documentation feel
- excellent readability
- clear section hierarchy
- polished visual layout
- tables, cards, callouts, accordions, diagrams, timelines, and checklists where helpful
- accessibility considerations (proper headings, contrast, aria labels where relevant)

The page title should be:
**Microsoft Power Platform DLP Policies Deep Dive: Beginner to Architect Guide**

---

## PRIMARY OBJECTIVE

Create the **best possible standalone HTML learning page** that teaches a reader how to:
- understand what DLP/Data Policies are in Power Platform
- explain DLP confidently in interviews and architecture discussions
- design and implement DLP policies in real projects
- avoid common governance mistakes
- troubleshoot DLP issues
- answer scenario-based DLP questions from project managers, security teams, admins, and interview panels

This should not be a shallow overview.
It should be a **deep, structured, practical guide**.

---

## IMPORTANT CONTENT RULES

### 1) Use official Microsoft terminology accurately
Explain that Power Platform documentation may refer to these as **Data Policies** (including DLP policies), and use both terms where helpful.

### 2) Separate beginner-level explanations from architect-level details
For every major concept, include:
- **Beginner explanation**
- **Architect insight**
- **Real-world example**
- **Common mistake**
- **Interview answer angle**

### 3) Base the guide on official Microsoft Learn content and current governance concepts
Where appropriate, the generated page should include a **References / Sources** section linking to official Microsoft documentation only (priority: Microsoft Learn).  
If a feature is in preview, clearly label it as **Preview** and explain implications.

### 4) Do not generate vague content
Be precise and practical.

### 5) Prefer implementation realism over marketing language
This is an enterprise administrator/architect learning asset, not a sales article.

---

## REQUIRED PAGE STRUCTURE

Build the HTML page with the following major sections.

### A. Hero / Intro Section
Include:
- Page title
- subtitle
- brief explanation of why DLP is critical in Power Platform
- audience badges: Beginner / Admin / Architect / Interview Prep
- “What you’ll learn” bullet list
- “Who should read this” section

---

### B. Quick Start Summary
Create a concise section called:
**DLP in 5 Minutes**
Cover:
- what DLP/Data Policies are
- why they matter
- where they apply
- basic connector grouping concept
- tenant-level vs environment-level idea
- the “most restrictive policy wins” principle
- why DLP is not the same as all other security controls

Include:
- one beginner analogy
- one architecture summary diagram (SVG or pure HTML/CSS visual)

---

### C. Foundational Concepts
Create a very strong conceptual section covering:

1. What is a connector?
2. What is a connection?
3. Difference between connector and connection
4. What DLP governs vs what it does NOT govern
5. Business / Non-business / Blocked groups
6. Why “Business” and “Non-business” are labels, not moral categories
7. How connectors can and cannot be used together in apps/flows/agents
8. Scope of DLP policies
9. Tenant-wide policies
10. Environment-level policies
11. Inheritance and precedence
12. Why the most restrictive policy applies
13. Design-time versus runtime considerations
14. Policy change latency / propagation considerations
15. Impact on makers and existing assets

For each item:
- explain in simple language
- explain in architect language
- add a practical example

---

### D. Detailed Architecture of DLP in Power Platform
Create a deep-dive section on how DLP fits into Power Platform governance.

Include:
- relationship between environments, connectors, makers, admins, apps, flows, agents
- role of Power Platform admin center
- governance role of tenant admins vs environment admins
- how DLP supports but does not replace broader security architecture
- relationship with:
  - environment strategy
  - security model
  - solution lifecycle
  - ALM
  - compliance controls
  - admin monitoring
  - auditing
  - tenant isolation
  - custom connectors
  - Copilot Studio / agents
  - Dataverse considerations
  - default environment governance

Add an architecture diagram using inline SVG or styled HTML blocks.

---

### E. Core Rules of DLP Behavior
This section must be very detailed and implementation-focused.

Explain:
- how connector grouping works
- what combinations are allowed
- what combinations are blocked
- what happens when a connector is blocked
- which scenarios commonly break flows/apps
- how a maker sees policy violations
- the difference between preventing creation vs impact on existing resources
- limitations and edge cases
- the idea that policies are connector aware, but not always endpoint or environment aware unless additional controls are used
- importance of understanding design-time and runtime impacts

Add:
- example matrices
- decision trees
- “If X then Y” style practical guidance

---

### F. Advanced DLP Capabilities and Related Controls
This section should distinguish between generally available concepts and advanced/preview/special governance controls.

Cover these topics in detail:

1. **Connector endpoint filtering**
   - what it is
   - how it works conceptually
   - supported connectors (if known from official docs)
   - ordered allow/deny rules
   - wildcard behavior
   - limitations
   - preview caveat if applicable
   - where it helps architects

2. **Tenant isolation / cross-tenant restrictions**
   - what problem it solves
   - how it differs from standard connector grouping
   - inbound vs outbound direction concepts
   - when architects should use it
   - pitfalls and exceptions
   - example scenarios

3. **Custom connectors and DLP**
   - why they are risky
   - governance strategy
   - approval model
   - documentation expectations
   - patterns for safe enterprise usage

4. **Copilot Studio / agents and DLP**
   - why this matters
   - enforcement considerations
   - implications for organizations using agents

5. **Admin automation / SDK / PowerShell**
   - when admins should automate DLP management
   - sample governance use cases
   - change control guidance
   - reporting and policy-as-code ideas

Where official support status is uncertain, explicitly say:
**“Validate current GA/Preview status against the latest Microsoft Learn documentation.”**

---

### G. DLP Strategy and Governance Design
Create a section named:
**How to Design a DLP Strategy**

It must include:
- how to assess business data risk
- how to identify trusted vs untrusted connectors
- how to classify connectors
- how to align DLP to environment strategy
- when to use tenant-wide controls
- when to use environment-specific controls
- balancing security with maker productivity
- avoiding overblocking
- phased rollout strategy
- pilot → review → expand approach
- governance board / CAB / CoE considerations
- exception management
- documentation standards
- ownership model
- policy naming conventions
- review cycles
- change management process
- how to communicate DLP changes to makers

Include:
- sample governance operating model
- sample policy design workshop agenda
- sample decision framework

---

### H. Step-by-Step Implementation Guide
This section should feel like a runbook.

Create a practical implementation sequence such as:
1. Assess environments
2. Inventory connectors
3. Identify business-critical data sources
4. Define governance principles
5. Create draft policy matrix
6. Define connector classifications
7. Validate with security/business stakeholders
8. Create pilot policy
9. Test with sample apps/flows
10. Review impact
11. Roll out in phases
12. Monitor, optimize, and document

For each step include:
- objective
- actions
- owner
- risks
- output

Also include:
- sample pre-implementation checklist
- sample post-implementation validation checklist
- rollback/change-control advice

---

### I. Real-World Scenarios and Case Studies
Add at least 8 practical scenarios.

Examples:
- SharePoint + Outlook + Gmail conflict
- Dataverse + Dropbox issue
- SQL Server access with endpoint filtering need
- Default environment governance problem
- HR data leaking through personal email/social connector
- Cross-tenant SharePoint data movement
- Custom connector with unknown API risk
- Copilot Studio agent calling external services
- Teams environment implications
- Production vs sandbox policy design differences

For each scenario provide:
- context
- risk
- incorrect approach
- correct DLP design
- expected outcome
- interview answer summary

---

### J. Common Mistakes / Anti-Patterns
Create a high-value anti-pattern section.

Examples:
- treating DLP as the only security control
- using one policy for every environment without strategy
- blocking too much too early
- ignoring custom connectors
- not documenting exceptions
- confusing connectors with connections
- misunderstanding “business” vs “non-business”
- rolling out policy changes without testing
- ignoring maker communication
- assuming tenant isolation equals all DLP needs
- not aligning DLP with ALM and solutions

For each:
- explain why it’s a mistake
- symptoms
- fix
- architect recommendation

---

### K. Troubleshooting Guide
Create a thorough troubleshooting section.

Include:
- app or flow stopped working after policy change
- connector not available
- policy conflict confusion
- maker receiving policy violation message
- existing resources unexpectedly impacted
- endpoint filtering mismatch
- cross-tenant connection issue
- custom connector blocked
- environment-specific behavior confusion
- Copilot Studio / agent data policy issues
- how to identify likely root cause
- questions admins should ask
- escalation guidance

Format as:
- symptom
- probable cause
- diagnosis steps
- resolution
- prevention

---

### L. Interview Preparation Section
This is critical.

Create a very strong:
**Power Platform DLP Interview Preparation Kit**

It must include:
1. 25 beginner questions with strong sample answers
2. 25 architect-level questions with strong sample answers
3. 15 scenario-based interview questions
4. 10 trick/confusion-based questions
5. “How to answer like an architect” tips
6. common buzzwords to use correctly
7. common wrong statements to avoid
8. rapid-fire revision bullets

Example question styles:
- What is DLP in Power Platform?
- Can environment-level DLP override tenant-wide DLP?
- What happens when multiple policies apply?
- What’s the difference between connector classification and tenant isolation?
- How do you design DLP for a multi-environment enterprise?
- What are the limitations of DLP?
- How do you govern custom connectors?
- How would you explain DLP to a business stakeholder?
- What would you check if a flow stopped working after a policy update?

---

### M. Architect Playbook
Create a section titled:
**Architect Playbook: How to Answer DLP Questions in Real Projects**

Include sample answers for:
- project manager asks for “quick DLP setup”
- security team asks for data exfiltration controls
- business asks why Gmail/Twitter/Dropbox is blocked
- maker asks why their flow no longer works
- auditor asks how data movement is controlled
- enterprise architect asks how DLP fits with broader security
- CoE asks how to operationalize DLP governance

This section should sound practical and leadership-oriented.

---

### N. Visual Learning Aids
Add visual elements throughout the page:
- policy scope diagrams
- connector grouping matrix
- governance lifecycle roadmap
- troubleshooting flowchart
- comparison tables
- beginner vs architect callout cards
- interview prep cards
- implementation checklist cards

Use inline SVG or pure HTML/CSS for diagrams.
No external image files required.

---

### O. Summary / Key Takeaways
Include:
- 10 key takeaways
- “what beginners must remember”
- “what architects must remember”
- “what to validate in every project”

---

### P. References
Create a References section with links to official docs.
Prefer Microsoft Learn.
Use descriptive link names.

If the page includes any preview features, label them clearly.
If certain details might change over time, add:
**“Always validate the latest Microsoft Learn documentation before production rollout.”**

---

## REQUIRED QUALITY STANDARDS

### Depth
The guide must be comprehensive and feel like a premium internal architecture knowledge page.

### Accuracy
Avoid making unsupported claims.
If something may vary by current feature status, mention that it should be validated against latest docs.

### Tone
Use a professional, expert, mentor-style tone.
Not too casual.
Not robotic.

### Usefulness
The reader should be able to:
- study from this page
- use it for project design
- revise before an interview
- explain DLP confidently to stakeholders

### UX / Design
The page must look polished and modern.
Suggested visual style:
- Microsoft documentation inspired
- clean cards
- sticky table of contents
- collapsible FAQ/interview sections
- subtle gradients
- readable typography
- code-like note boxes for technical tips
- highlighted warnings/info/success callouts

---

## HTML TECHNICAL REQUIREMENTS

Generate a **single valid HTML document** with:
- <!DOCTYPE html>
- <html>
- <head>
- <meta charset="UTF-8">
- <meta name="viewport" content="width=device-width, initial-scale=1.0">
- a meaningful <title>
- embedded <style>
- embedded <script> if necessary

Implement:
- responsive layout
- sticky side navigation or top navigation
- anchor links for sections
- collapsible sections for FAQs/interview questions/troubleshooting
- tabbed cards where useful (e.g., Beginner vs Architect)
- print-friendly basics if possible
- copyable code/sample snippets if included
- no broken markup
- no placeholder lorem ipsum
- no unfinished sections

---

## CONTENT PRESENTATION REQUIREMENTS

Use:
- callout boxes for warnings/notes/tips
- summary cards
- comparison tables
- checklists
- numbered implementation flows
- interview prep accordions
- scenario cards
- architecture diagrams

Include at least:
- 4 comparison tables
- 3 diagrams
- 2 checklists
- 1 troubleshooting flow
- 1 policy decision matrix
- 1 interview prep section with expandable answers

---

## SPECIAL INSTRUCTIONS FOR CONTENT QUALITY

When explaining any major concept, follow this pattern where possible:
- Definition
- Why it matters
- How it works
- Example
- Common pitfall
- Architect note
- Interview answer

When discussing limits or caveats, clearly label:
- Limitation
- Impact
- Workaround or mitigation

When discussing implementation:
- mention governance, testing, communication, and change management

Do not oversimplify.
Do not give generic cloud-security filler.
Keep focus on Microsoft Power Platform DLP / Data Policies and closely related governance controls.

---

## OPTIONAL ENHANCEMENTS
If helpful, include:
- a glossary
- “myth vs fact” section
- maturity model (Beginner → Intermediate → Architect)
- downloadable-print style section formatting
- “90-second answer” cards for interview prep
- “What to say in customer workshops” section

---

## FINAL OUTPUT REQUIREMENT

Output **only the final complete HTML code**.
Do not include commentary before or after the HTML.
Do not wrap the HTML in markdown fences.
Ensure the page is complete and ready to save as an `.html` file and open in a browser.
``