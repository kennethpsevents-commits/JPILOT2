# WeAreJobPilot Intent Library (150 Playbooks)

Each intent is a reusable script with defined inputs and outputs. IDs are stable for routing and analytics.

## 1) Intake & Onboarding (001–015)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 001 | Welcome + consent | Start session, confirm consent | locale | consent flag |
| 002 | Goal capture | Collect primary career goal | role goal | goal summary |
| 003 | Location capture | Capture preferred locations | city/region | location slots |
| 004 | Work mode capture | Remote/hybrid/on-site | preference | mode slot |
| 005 | Salary capture | Capture expected range | salary range | salary slot |
| 006 | Seniority capture | Entry/mid/senior | level | seniority slot |
| 007 | Industry capture | Capture target industries | industries | industry slot |
| 008 | Constraints capture | Visa, language, schedule | constraints | constraint slot |
| 009 | Timeline capture | Start date and urgency | timeline | timeline slot |
| 010 | Strengths capture | User’s top strengths | strengths | strengths slot |
| 011 | Soft skills capture | Collaboration/leadership | soft skills | soft skills slot |
| 012 | Portfolio capture | Links to work | portfolio links | portfolio slot |
| 013 | CV upload | Capture CV data | CV file/text | parsed CV |
| 014 | Education capture | Degrees/certs | education | education slot |
| 015 | Summary confirmation | Confirm collected data | all slots | confirmed profile |

## 2) Profile & Data Enrichment (016–030)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 016 | CV parsing | Extract roles/skills | CV text | structured profile |
| 017 | Skill normalization | Map skills to taxonomy | skills list | normalized skills |
| 018 | Experience timeline | Build chronology | work history | timeline summary |
| 019 | Gap detection | Identify missing requirements | CV + goal | gap list |
| 020 | Credential scoring | Score certifications | certs | score |
| 021 | Language proficiency | Capture language levels | languages | language slot |
| 022 | Portfolio review | Summarize portfolio | links | highlights |
| 023 | Role fit baseline | Baseline match against goal | profile | baseline score |
| 024 | Preference clarity | Clarify ambiguous preferences | profile | clarified slots |
| 025 | Motivation capture | Capture motivations | motivations | motivation notes |
| 026 | Achievement extraction | Extract achievements | CV | achievements list |
| 027 | Impact quantification | Quantify results | achievements | metrics |
| 028 | ATS readiness scan | Check CV for ATS | CV | ATS checklist |
| 029 | Persona tagging | Match to persona | profile | persona tag |
| 030 | Profile completeness | Score completeness | slots | completeness score |

## 3) Matching & Shortlist (031–050)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 031 | Job query build | Build job query | profile | search query |
| 032 | Match scoring | Score jobs by fit | jobs + profile | ranked list |
| 033 | Constraint filter | Filter by constraints | constraints | filtered list |
| 034 | Location ranking | Rank by commute/region | location | location score |
| 035 | Salary filter | Filter by salary | salary range | filtered list |
| 036 | Seniority alignment | Filter by level | seniority | filtered list |
| 037 | Company size match | Align company size | preference | filtered list |
| 038 | Industry relevance | Score industry fit | industries | industry score |
| 039 | Role similarity | Identify adjacent roles | profile | adjacent roles |
| 040 | Match explanation | Provide fit rationale | ranked list | rationale bullets |
| 041 | Shortlist creation | Create top 5–10 list | ranked list | shortlist |
| 042 | Shortlist refinement | Refine based on feedback | shortlist + feedback | revised list |
| 043 | Save jobs | Save shortlist | job ids | saved list |
| 044 | Alert setup | Create job alerts | query | alert config |
| 045 | Trend insights | Show market insights | data | insights summary |
| 046 | Skill gap match | Highlight skill gaps | job + profile | gap report |
| 047 | Fast path jobs | Identify quick wins | profile | quick-win list |
| 048 | Stretch roles | Identify stretch roles | profile | stretch list |
| 049 | Employer highlights | Summarize employer perks | job | perk summary |
| 050 | Apply readiness | Check readiness score | profile + job | readiness score |

## 4) Repositioning & Career Pivot (051–070)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 051 | Trust-loop start | Validate original goal | goal | validation |
| 052 | Evidence gather | Show alternative evidence | CV + market | evidence bullets |
| 053 | Choice architecture | Offer 2 routes | evidence | choice prompt |
| 054 | Pivot suggestion | Suggest adjacent roles | profile | pivot list |
| 055 | Transferable skills | Map transferable skills | profile | skills map |
| 056 | Role laddering | Show role progression | role | ladder view |
| 057 | Salary tradeoff | Explain tradeoffs | role + market | tradeoff notes |
| 058 | Location tradeoff | Suggest location changes | location | options |
| 059 | Skill upgrade plan | Recommend upskilling | gaps | plan |
| 060 | Quick credential | Suggest quick cert | gaps | cert list |
| 061 | Portfolio focus | Suggest portfolio focus | target role | focus plan |
| 062 | Time-to-hire model | Estimate time | market data | timeline |
| 063 | Risk assessment | Assess risk of path | profile | risk rating |
| 064 | Alternative industry | Industry pivot | profile | industry options |
| 065 | Job family pivot | Move across functions | profile | job family map |
| 066 | Seniority adjustment | Adjust seniority | profile | level options |
| 067 | Compensation path | Optimize for salary | profile | salary path |
| 068 | Purpose alignment | Align role to values | motivations | alignment score |
| 069 | Lifestyle alignment | Align to lifestyle | constraints | lifestyle fit |
| 070 | Decision confirmation | Confirm new direction | choice | decision |

## 5) Application Kit (071–090)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 071 | CV tailoring | Tailor CV to job | CV + job | CV edits |
| 072 | Cover letter draft | Draft cover letter | CV + job | cover letter |
| 073 | Recruiter message | Draft outreach message | job + profile | message |
| 074 | LinkedIn update | Suggest LinkedIn edits | profile | edits |
| 075 | ATS keyword map | Map keywords to CV | job | keyword plan |
| 076 | Portfolio snippet | Generate portfolio summary | portfolio | snippet |
| 077 | Impact bullet rewrite | Rewrite bullet points | CV | improved bullets |
| 078 | Skill evidence | Add evidence bullets | skills | evidence list |
| 079 | Career summary | Write summary section | profile | summary |
| 080 | Role alignment notes | Explain role fit | job | fit notes |
| 081 | Application checklist | Build checklist | job | checklist |
| 082 | Submission prep | Final pre-submit check | CV + letter | ready flag |
| 083 | Multi-apply batch | Batch applications | shortlist | batch plan |
| 084 | Follow-up plan | Follow-up schedule | application | schedule |
| 085 | Rejection analysis | Analyze rejection | feedback | adjustments |
| 086 | ATS risk scan | Scan for ATS risks | CV | issues |
| 087 | Tone adjustment | Adjust tone for company | company | revised copy |
| 088 | Localization | Localize language | locale | localized copy |
| 089 | Application log | Log application | job id | application entry |
| 090 | Consent to apply | Confirm user approval | shortlist | consent flag |

## 6) Interview Prep (091–105)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 091 | Interview plan | Build prep plan | job + CV | plan |
| 092 | Role-specific questions | Generate questions | job | question set |
| 093 | STAR responses | Build STAR answers | achievements | STAR drafts |
| 094 | Technical practice | Technical drills | role | drills |
| 095 | Behavioral coaching | Behavioral coaching | profile | coaching tips |
| 096 | Company research | Company summary | company | research brief |
| 097 | Mock interview | Simulated interview | job + CV | transcript |
| 098 | Feedback rubric | Score responses | transcript | rubric scores |
| 099 | Weakness repair | Improve weak areas | rubric | improvement plan |
| 100 | Salary questions | Prep comp questions | role | answers |
| 101 | Portfolio walkthrough | Walkthrough plan | portfolio | script |
| 102 | Culture fit prep | Culture alignment | company | notes |
| 103 | Close strategy | Closing questions | job | closing list |
| 104 | Interview follow-up | Thank you note | interview info | follow-up note |
| 105 | Offer readiness | Offer readiness check | status | readiness |

## 7) Negotiation & Offers (106–115)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 106 | Offer analysis | Analyze offer details | offer | analysis |
| 107 | Market benchmark | Compare with market | role + location | benchmark |
| 108 | Negotiation script | Create negotiation message | offer | script |
| 109 | Counter offer plan | Build counter strategy | offer | counter plan |
| 110 | Benefits review | Evaluate benefits | offer | benefits summary |
| 111 | Equity explanation | Explain equity terms | offer | equity notes |
| 112 | Timing strategy | Timing negotiation | timeline | strategy |
| 113 | Multiple offers | Compare offers | offers | comparison |
| 114 | Acceptance plan | Accept with conditions | offer | acceptance script |
| 115 | Decline script | Decline professionally | offer | decline message |

## 8) Employer Portal (116–130)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 116 | Employer signup | Create employer account | company info | account |
| 117 | Company verification | Verify contact | email/domain | verification |
| 118 | Job intake | Capture job description | job text | structured job |
| 119 | ATS link import | Import from ATS | ATS link | job data |
| 120 | Job normalization | Normalize job data | job text | normalized job |
| 121 | Role priority | Capture urgency | timeline | priority tag |
| 122 | Candidate request | Define ideal candidate | must-haves | criteria |
| 123 | Shortlist delivery | Deliver shortlist | criteria | shortlist |
| 124 | Candidate summaries | Provide AI summaries | candidates | summaries |
| 125 | Interview scheduling | Coordinate scheduling | availability | schedule |
| 126 | Employer messaging | Draft outreach | role | messages |
| 127 | Job status update | Update job state | status | updated job |
| 128 | Performance insights | Provide analytics | job data | insights |
| 129 | Billing setup | Configure billing | plan | billing status |
| 130 | Employer support | Support request | issue | support ticket |

## 9) Support & Escalation (131–150)
| ID | Intent | Purpose | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| 131 | Loop detection | Detect repetition | chat history | loop flag |
| 132 | Escalate persona | Switch support mode | loop flag | new persona |
| 133 | Context summary | Summarize session | chat history | summary |
| 134 | Confidence fallback | Ask for missing data | low confidence | data request |
| 135 | Error handling | Report errors | error | recovery step |
| 136 | Subscription question | Handle plan questions | plan | answer |
| 137 | Billing issue | Resolve billing | issue | resolution |
| 138 | Privacy request | Handle data request | request | action |
| 139 | Data export | Export user data | user id | export |
| 140 | Delete account | Handle deletion | user id | deletion |
| 141 | Feedback capture | Capture user feedback | feedback | log |
| 142 | Bug report | Capture bug details | issue | ticket |
| 143 | Feature request | Capture feature ideas | request | log |
| 144 | Escalate to human | Handover to human | request | handover |
| 145 | Trust repair | De-escalate frustration | sentiment | repair script |
| 146 | Re-engagement | Bring back inactive users | inactivity | re-engage message |
| 147 | Reminder nudge | Send reminders | timeline | reminder |
| 148 | Onboarding resume | Resume onboarding | state | next step |
| 149 | Policy clarification | Explain policies | policy | summary |
| 150 | Closing loop | Close session | status | closing message |
