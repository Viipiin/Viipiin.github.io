Act as a Principal Engineering Interview Architect and create a world-class, detailed, interviewer-ready interview guide for hiring an "Azure .NET Fullstack Developer with Azure AI Developer skills."

The interview guide must be designed for real enterprise hiring and should help distinguish average candidates from truly strong engineers. The tone should be professional, practical, deep, and high-signal.

## Target Role
Role Title: Azure .NET Fullstack + Azure AI Developer
Seniority: [Choose one: Mid-Level / Senior / Lead / Architect]
Experience Range: [e.g., 5–8 years]
Frontend Stack: [React / Angular / Blazor / Mixed]
Backend Stack: C#, .NET / ASP.NET Core, Web API, microservices
Cloud Stack: Azure
AI Stack: Azure OpenAI / Azure AI Foundry / Azure AI Search / RAG / Semantic Kernel / Prompt Engineering / AI safety
Database: SQL Server / Azure SQL / Cosmos DB (if relevant)
DevOps: Azure DevOps / GitHub Actions / CI/CD / IaC
Architecture Style: RESTful APIs, distributed systems, event-driven systems, secure cloud-native applications

## Objective
Generate a complete interview guide that includes:
1. Basic screening questions
2. Strong core technical Q&A
3. Scenario-based questions
4. Advanced “mind-blowing” architecture and debugging rounds
5. Azure AI developer specific use cases
6. Evaluation rubric with expected indicators of weak / average / excellent answers
7. Follow-up probing questions for each important question
8. Red flags to watch for
9. A final hiring recommendation framework

## Important Requirements
The guide must be practical and structured for actual interviewer usage.
Do NOT give generic textbook-only content.
The questions must test:
- real experience
- design thinking
- debugging ability
- tradeoff analysis
- cloud architecture understanding
- production readiness
- security and scalability thinking
- responsible AI awareness
- API and frontend integration skills
- coding and delivery maturity

The guide must be split into interview rounds as below.

---

# REQUIRED OUTPUT FORMAT

## 1) Role Summary
Provide:
- a concise role summary
- what kind of candidate this guide is targeting
- top competencies being evaluated
- ideal hiring profile

## 2) Interview Plan
Create a suggested interview plan with:
- Round name
- Duration
- Focus area
- What to evaluate
- Interviewer type (HR / Engineering Manager / Senior Engineer / Architect)
- Elimination criteria

Example rounds:
- Round 1: Initial screening
- Round 2: .NET backend deep dive
- Round 3: Frontend + integration + API consumption
- Round 4: Azure cloud and DevOps
- Round 5: Azure AI / RAG / LLM engineering
- Round 6: Architecture and scenario-based problem solving
- Round 7: Behavioral / ownership / cross-team communication

## 3) Basic Screening Q&A (must include answers)
Create 25–30 basic but important screening questions with:
- Question
- Ideal short answer
- Why this question matters
- Difficulty level
- Common weak answer pattern

Cover:
- C# and OOP basics
- async/await
- dependency injection
- ASP.NET Core pipeline
- REST API fundamentals
- authentication vs authorization
- SQL and EF Core basics
- frontend basics (state management, API handling)
- Azure basics (App Service, Functions, Storage, Key Vault, Application Insights)
- Docker basics
- Git and CI/CD basics
- Azure AI basics
- RAG basics
- prompt engineering basics
- responsible AI basics

## 4) Intermediate / Strong Technical Questions
Create 20–25 strong technical questions with:
- Question
- What a strong candidate should mention
- What an expert candidate adds
- Follow-up questions
- Scoring guide out of 5

Cover:
### Backend
- middleware
- filters
- model binding
- exception handling strategy
- clean architecture
- CQRS
- MediatR (if relevant)
- caching
- resiliency
- distributed tracing
- background jobs
- performance tuning
- API versioning
- gRPC vs REST
- message queues

### Database
- indexing
- transactions
- optimistic concurrency
- query optimization
- N+1 issue
- pagination
- partitioning
- read/write patterns

### Frontend
- SSR vs CSR
- SPA performance
- auth token handling
- component design
- state management
- API retry and caching
- error boundaries
- accessibility basics
- secure frontend practices

### Azure Cloud
- App Service vs Functions vs AKS vs Container Apps
- Service Bus vs Storage Queue vs Event Grid
- Azure SQL vs Cosmos DB
- Key Vault integration
- Managed Identity
- VNets / private endpoints
- autoscaling
- monitoring and alerts
- cost optimization
- deployment slots
- blue-green / canary deployment

## 5) Azure AI Developer Section (very important)
Create a dedicated section with 20–25 questions for Azure AI Developer skills.

Evaluate candidate on:
- Azure OpenAI usage patterns
- Azure AI Foundry / AI application lifecycle
- embeddings
- vector databases / Azure AI Search
- hybrid search
- semantic ranking
- chunking strategy
- prompt design
- grounding
- hallucination prevention
- RAG pipeline design
- agentic workflows
- Semantic Kernel
- tool calling / function calling
- guardrails
- content filtering
- prompt injection risks
- evaluation of AI answers
- observability for AI systems
- token cost optimization
- latency optimization
- secure enterprise AI design

For each question provide:
- Question
- Expected answer points
- Weak answer indicators
- Probing follow-ups
- Senior/Lead level extension

## 6) Scenario-Based Interview Section
Create 15 high-quality, realistic enterprise scenarios.
For each scenario provide:
- Scenario statement
- What the interviewer is testing
- Expected thought process
- Good answer structure
- Excellent answer differentiators
- Red flags
- Suggested score out of 10

Scenarios must include:
1. Production API is slow after deployment on Azure
2. A .NET microservice works locally but fails in App Service
3. Frontend intermittently gets 401/403 from backend
4. Azure OpenAI responses are inconsistent in production
5. RAG answers are factually wrong despite correct source data
6. Azure AI Search retrieves irrelevant chunks
7. Token cost suddenly spikes
8. AI assistant leaks sensitive internal content
9. Multi-region failover requirement for critical enterprise app
10. Application Insights shows high dependency failures
11. High Cosmos DB RU cost / Azure SQL bottleneck
12. Queue backlog is increasing and downstream services lag
13. Prompt injection attempt via uploaded document
14. Need to design secure AI chat over enterprise knowledge base
15. Need to migrate monolith to cloud-native Azure architecture

## 7) “Mind-Blowing” Deep-Dive Questions
Create 12–15 elite questions that separate senior engineers from real architects.
These should force tradeoff thinking, not memorization.

Examples of the kind of thinking expected:
- “How would you design a trustworthy enterprise RAG system for regulated data?”
- “When would Azure AI Search not be enough, and what would you change?”
- “How do you design AI systems to fail safely?”
- “How do you evaluate answer quality when the system appears correct but users lose trust?”
- “How would you redesign a high-latency distributed .NET + Azure AI application end to end?”
- “How do you justify platform choice between App Service, AKS, Container Apps, and Functions for an AI-enabled product?”
- “How would you design observability for both classic microservices and AI workflows together?”
- “How do you architect secure multi-tenant AI applications on Azure?”

For each question include:
- Why it is a powerful discriminator
- Excellent answer markers
- Weak answer markers
- Follow-up challenge question

## 8) Hands-On / Coding / Whiteboard Round
Create:
- 5 coding exercises
- 5 API design exercises
- 5 system design / architecture exercises
- 3 AI feature design exercises

Each exercise must include:
- Problem statement
- Target skills
- Ideal solution characteristics
- Common mistakes
- Evaluation rubric

Possible examples:
- build a resilient .NET API with retry/circuit breaker
- design a file ingestion pipeline on Azure
- design RAG chunking + retrieval strategy
- design secure chat app using Azure OpenAI + Azure AI Search
- optimize a slow EF Core query
- design telemetry for distributed services
- create role-based access strategy for fullstack app
- design caching strategy across frontend + API + data layer

## 9) Candidate Answer Evaluation Rubric
Create a detailed rubric table or structured list with scoring bands:
- 1 = poor
- 2 = weak
- 3 = acceptable
- 4 = strong
- 5 = exceptional

Rubric dimensions:
- technical correctness
- depth
- practical experience
- architecture thinking
- cloud-native understanding
- debugging approach
- security mindset
- scalability mindset
- AI engineering maturity
- communication clarity
- ownership and tradeoff awareness

## 10) Red Flags Section
List at least 20 red flags such as:
- only textbook knowledge
- cannot explain production incidents
- no clarity on auth flow
- confuses vector DB with embeddings
- cannot reason about latency/cost/security tradeoffs
- overuses buzzwords
- no observability mindset
- unaware of prompt injection / AI safety / grounding risks
- weak debugging sequence
- no understanding of deployment and rollback strategy

## 11) Strong Signals Section
List at least 20 strong signals such as:
- explains tradeoffs clearly
- gives production examples
- talks about metrics, traces, logs, SLAs, SLOs
- understands cost/performance/security balance
- structures responses well
- knows how to validate AI outputs
- understands retrieval quality, chunking, and evaluation
- discusses managed identity, secretless access, and least privilege
- understands CI/CD, rollback, deployment slots, health checks

## 12) Final Hiring Recommendation Template
Provide a final summary template interviewers can fill out:
- Candidate name
- Seniority fit
- Core strengths
- Technical concerns
- AI/Cloud maturity
- Communication quality
- Hiring recommendation: No Hire / Lean No / Lean Yes / Strong Yes
- Suggested role fit
- Suggested compensation band confidence
- Areas to validate in next round

## 13) Interviewer Cheat Sheet
At the end, provide a concise one-page cheat sheet:
- top 15 must-ask questions
- top 10 killer follow-ups
- top 10 red flags
- top 10 strong hire indicators

## Quality Bar
The output must be:
- highly structured
- detailed
- interviewer-friendly
- realistic for enterprise hiring
- modern and aligned with Azure + .NET + AI engineering practices
- deep enough for senior candidates
- practical enough for immediate use

## Extra Customization
Use the following preferences while generating:
- Industry domain: [Finance / Healthcare / Retail / SaaS / Manufacturing / Generic Enterprise]
- Frontend framework priority: [React / Angular / Blazor]
- Architecture preference: [Monolith-modernized / Microservices / Event-driven / Hybrid]
- AI use case: [Enterprise chat / document intelligence / internal copilot / knowledge assistant / AI search app / agentic workflows]
- Interview duration available: [e.g., 90 mins / 2 hours / full panel]
- Geography / hiring bar: [India / Global / Product company / Consulting / Enterprise IT]

If helpful, also generate:
A. A shorter 60-minute version
B. A tougher architect-level version
C. A candidate scorecard
D. A panel interview version