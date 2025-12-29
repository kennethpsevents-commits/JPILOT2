# WeAreJobPilot Conversation Engine (Beta)

## Purpose
The Conversation Engine is the JobGPT-style layer that powers the AI Support Angel. It transforms free-form chat into
structured intent routing, predictable outcomes, and trust-first guidance.

## Core Principles
1. **Chat-first UX:** Every feature is initiated through a conversation.
2. **No-fluff answers:** Responses are concise, evidence-based, and action-oriented.
3. **Trust loop:** Every redirection follows `Validate → Evidence → Choice`.
4. **Human-style cadence:** Short responses, clear next step, one question at a time.
5. **User control:** The system recommends; the user approves.

## Engine Architecture

### 1) Intent Library
150 intents grouped into operational clusters (intake, matching, application, interview, employer, support). Each intent
has:
- **Inputs:** required slots
- **Outputs:** structured artifacts (shortlist, CV edits, interview plan)
- **Fallbacks:** what to do if inputs are missing

### 2) Router (Policy Layer)
The router selects the next intent based on:
- **User state:** onboarding stage, profile completeness, job goal clarity
- **Confidence score:** match confidence, extraction confidence, sentiment
- **Business rules:** subscription tier, consent gates, compliance checks

### 3) State Machine
States are explicit and visible to the orchestrator:
- `Onboarding`
- `Matching`
- `ApplicationKit`
- `InterviewPrep`
- `OfferNegotiation`
- `EmployerFlow`
- `Support`

### 4) Trust Loop Protocol
Whenever the agent recommends a different role/path:
1. **Validate:** confirm the user’s original goal
2. **Evidence:** show concrete reasons for the alternative
3. **Choice:** present two options, user selects the next step

## Output Artifacts
- **Shortlist:** ranked jobs with match rationale and constraints check
- **Application Kit:** CV edits, cover letter, outreach script
- **Interview Plan:** question sets + scoring rubric
- **Career Plan:** 30/60/90 day action list

## Operational Guardrails
- **One question rule:** each response ends with a single clear question.
- **Max 7 bullets:** to avoid verbosity.
- **Confidence gating:** low confidence triggers data collection or escalation.
- **Consent checks:** for data processing, outreach, and auto-apply.

## Implementation Notes
- Store intent runs in `chat_history` with session context.
- Use `user_artifacts` and `jobs_normalized` for output traceability.
- Maintain a lightweight policy file for tier-specific routing.

---

See `docs/INTENT_LIBRARY.md` for the full 150-intent taxonomy.

## Persona System
The invisible AI experience is defined in `docs/PERSONA_BLUEPRINT.md`, including roles, handovers, and first-contact
scripts.
