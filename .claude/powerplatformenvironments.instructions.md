Create a single, self-contained, visually stunning HTML page (one file only) that acts as the ultimate master guide to Power Platform environments for architects, administrators, makers, and developers.

### Primary Goal
Build a premium-quality, modern, responsive HTML page that deeply explains Power Platform environment types and helps the reader understand:
- what each environment type is
- why it exists
- its pros and cons
- capabilities and limitations
- which features are available for app makers, developers, environment admins, Power Platform admins, Dynamics 365 admins, and global admins
- when each environment type should be used
- when it should not be used
- how it fits into governance, ALM, security, and enterprise architecture

### Environment Types to Cover
You must cover these in depth:
1. Default environment
2. Production environment
3. Sandbox environment
4. Trial environment
   - Standard trial
   - Subscription-based trial
5. Developer environment
6. Microsoft Dataverse for Teams / Microsoft Teams environment

Also include:
7. Managed Environments as a governance/control layer (clearly explain that it is not a standalone environment type in the same way as the others, but a premium governance capability that can be enabled for supported environments)

### Accuracy Rules
- Use only accurate, current Microsoft documentation concepts and terminology.
- Do not hallucinate features or limits.
- If some capabilities differ depending on whether Dataverse exists in the environment, explicitly say so.
- Clearly distinguish:
  - tenant-level admin roles
  - environment-level roles
  - Dataverse security roles
- Clearly state where behavior changes once a Dataverse database is present.
- If any detail is version-sensitive or licensing-sensitive, label it as “Verify in current Microsoft documentation”.
- Include a “Last reviewed / documentation-aligned” badge or note at the top.

### Page Style and UX Requirements
Make the page look sleek, premium, enterprise-grade, and modern.
Design direction:
- clean Microsoft/Fluent-inspired design language
- subtle gradients, glassmorphism or elevated cards
- sticky top navigation or side navigation
- responsive layout for desktop, tablet, and mobile
- modern typography
- soft section dividers
- icons for each environment type
- hover effects and smooth transitions
- visually strong comparison sections
- accessible color contrast
- collapsible accordions for deep content
- tabbed comparison views where useful
- search/filter box to quickly find an environment
- anchor navigation for quick jumps
- “best for this scenario” highlighted callout cards
- printable-friendly section at the end

### Output Requirements
- Return only one complete HTML file
- Include embedded CSS and embedded JavaScript in the same file
- Do not use external build tools
- You may use CDN links only if absolutely necessary, but prefer a fully self-contained file
- The page must work by simply saving it as `.html` and opening it in a browser

### Content Structure
The page must include the following major sections:

#### 1. Hero Section
- Title: “Power Platform Environments – Master Guide”
- Subtitle explaining this is a complete reference for choosing, governing, and using environments correctly
- Short intro paragraph
- Visual badges such as:
  - Architecture
  - Governance
  - ALM
  - Security
  - Maker Enablement

#### 2. Executive Summary
Provide a concise summary that answers:
- What is a Power Platform environment?
- Why environment strategy matters
- Why environment choice affects security, ALM, licensing, governance, and scalability

#### 3. Quick Comparison Overview
Create a beautiful comparison grid or matrix showing:
- Environment type
- Intended purpose
- Permanent or temporary
- Dataverse supported?
- Good for production?
- Good for development?
- Can be reset?
- Can be copied?
- Can be upgraded/converted?
- Typical owner
- Typical audience
- Governance level
- Best use case

#### 4. Deep Dive: Each Environment Type
For each environment type, create a visually rich detailed section with:
- definition
- purpose
- who typically creates it
- who typically owns/manages it
- common licensing or eligibility notes
- whether Dataverse can exist here
- special behaviors
- major capabilities
- limitations
- pros
- cons
- security/governance considerations
- admin controls
- maker experience
- developer experience
- ALM suitability
- enterprise use recommendation
- typical mistakes
- best-fit scenarios
- not recommended scenarios

Use one consistent format for each type, such as:
- Overview
- What it provides
- What makers can do
- What admins can do
- What global/tenant admins can do
- Limitations
- Pros
- Cons
- Best for
- Avoid when
- Example scenario

#### 5. Role and Capability Matrix
Create a dedicated section that compares what each persona can do in each environment:
Personas:
- App Maker
- Developer
- Environment Maker
- Environment Admin
- System Customizer
- System Administrator
- Power Platform Admin
- Dynamics 365 Admin
- Global Admin
- Team Owner / Team Member / Team Guest (for Dataverse for Teams)

For each persona/environment combination, explain:
- create apps?
- create flows?
- create tables?
- manage data?
- manage users?
- assign roles?
- backup/restore?
- reset?
- copy?
- apply governance?
- install Dynamics 365 apps?
- use premium connectors?
- use custom connectors?
- use solutions?
- perform ALM?
- production-grade suitability?

#### 6. Dataverse Dependency and Security Model
Add a dedicated section explaining:
- difference between environments with and without Dataverse
- environment roles vs Dataverse security roles
- why Environment Admin is not the same as System Administrator
- why Environment Maker is not enough for Dataverse data authoring in many cases
- how security differs in Dataverse for Teams
- how access changes when an environment is upgraded

#### 7. Trial Environment Special Section
Include a dedicated section that clearly explains:
- standard trial vs subscription-based trial
- who can create each
- lifespan
- expiration behavior
- extension possibilities
- conversion to production
- when to use each one
- when trial is a bad architectural decision

#### 8. Developer Environment Special Section
Include:
- why it exists
- free developer plan concept
- intended for development/test only
- collaboration implications
- capacity limitations
- why it should not be used for production
- when it is perfect
- when it becomes insufficient
- relationship to managed environments

#### 9. Dataverse for Teams / Microsoft Teams Environment Special Section
Include:
- how it is created automatically from Teams
- how it maps to a Team
- owner/member/guest security behavior
- capacity and scale implications
- what it can do well
- what it cannot do compared to full Dataverse
- lifecycle tied to the Team
- upgrade path to Dataverse / production-grade environment
- ideal use cases
- warning signs that it should be upgraded

#### 10. Managed Environments Section
Explain:
- what Managed Environments are
- why they matter for governance
- what premium governance features they provide
- which features benefit admins vs makers
- how they change enterprise governance posture
- when an organization should enable them

#### 11. Environment Strategy Patterns
Create visual cards or flow diagrams for recommended environment strategies such as:
- Solo maker learning path
- Small departmental app
- Enterprise ALM strategy
- Dev / Test / UAT / Prod pattern
- Teams-first lightweight solution
- Proof of concept
- Regulated production workload

For each pattern, explain:
- recommended environment types
- why
- risks
- governance needs

#### 12. Decision Guide / Decision Tree
Create an interactive decision tree or guided selector:
Questions like:
- Is this for learning only?
- Is this temporary?
- Is this for production users?
- Does it need enterprise governance?
- Does it need Dataverse?
- Is it created inside Teams?
- Does it need reset/copy?
- Does it need full ALM?
- Does it need Dynamics 365 apps?

Then provide:
- recommended environment type
- why
- cautions
- next best alternative

#### 13. Best Practices and Anti-Patterns
Create two strong sections:
A. Best Practices
B. Anti-Patterns / Common Mistakes

Examples:
- using default for enterprise apps
- developing directly in production
- relying on trial for real workloads
- ignoring security role differences
- not planning for ALM
- overusing Dataverse for Teams where full Dataverse is needed

#### 14. Architecture and Governance Recommendations
Add an architect-focused section:
- how to think about environment planning
- environment naming conventions
- regional considerations
- security group strategy
- DLP implications
- solution strategy
- maker enablement vs governance balance
- when to isolate business units
- when to centralize vs decentralize

#### 15. Final Summary
End with:
- “Which environment should I choose?” summary cards
- quick recommendations by scenario
- a memorable closing checklist

### Visual Components to Include
Use these UI elements:
- comparison cards
- environment badges
- icon-based feature chips
- collapsible FAQs
- highlighted warnings
- “recommended” ribbons
- sticky jump navigation
- progress indicator when scrolling
- tooltip-style glossary for terms like Dataverse, DLP, ALM, System Administrator, Environment Maker, security group, etc.

### Content Tone
- professional
- architect-level
- clear and educational
- deep but easy to follow
- suited for someone who wants to master Power Platform environments
- do not make it too marketing-heavy
- make it practical and usable

### Technical Quality
- semantic HTML5
- clean CSS organization
- lightweight JS for tabs, accordion, filtering, and decision tree
- responsive layout
- accessible components
- polished spacing and modern UI hierarchy

### Extra Requirement
At the bottom, include:
- “Reference Notes” section
- placeholder list for official documentation links
- small disclaimer encouraging verification against the latest Microsoft documentation for licensing and feature changes

### Final Output Rule
Output only the final complete HTML code.
Do not explain the code.
Do not use markdown fences.