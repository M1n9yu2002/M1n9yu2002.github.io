// Personal facts and links supplied by the portfolio owner. No inferred project results.
export const content = {
  name: 'Mingyu Wang',
  links: { email: 'cyruswang2002@hotmail.com', linkedin: 'https://www.linkedin.com/in/mingyu-wang-fintech/', github: 'https://github.com/M1n9yu2002', resume: 'TODO_RESUME_URL' },
  research: {
    title:'High-Frequency Liquidity Shock Detection and Order-Book Resiliency',
    caseStudy:'./liquidity-shock.html',
    summary:'High-frequency market microstructure research examining how quoted spread and displayed order-book depth recover after short-term liquidity shocks.',
    technologies:['Python','Polars','pandas','NumPy','Databento','R'],
    events:'34,589', securities:'10', sessions:'37', grid:'1-second', feed:'XNAS ITCH MBP-10',
    spreadMedian:'3', depthMedian:'10', spreadAchievement:'99.76', depthAchievement:'97.72',
    spread30Attainment:'93.35', depth30Attainment:'77.54',
    spreadRelapse10:'76.08', depthRelapse10:'88.37',
    spreadSustainedMedian:'10.25', depthSustainedMedian:'28.50',
    reconciledFirstCrossings:'32,661',
    scale: {
      marketStates:8658000, warmupRows:1170000, targetRows:7488000,
      securities:10, sessionsPerSecurity:37, warmupSessions:5, targetSessions:32, cutoffsPerSession:23400,
      shockRecords:34589, spreadRecords:19752, depthRecords:14837,
      recoveryRows:3728389, securityFamilyPartitions:20,
      droppedEvents:0, duplicatedEvents:0
    }
  },
  // Add future projects here. `summary` renders only supplied content; `escrow` adds the architecture story.
  // No election/social-data project is included in the active content model.
  projects: [
    {
      id:'mindpass', layout:'escrow', category:'FinTech / Programmable Escrow · Team MVP', title:'MindPass FinTech Escrow DApp',
      summary:'A hybrid FinTech MVP linking relational session and subsidy records with split funding, programmable escrow and verifiable settlement.',
      previewEvidence:[
        ['Relational Data','session-linked records'],
        ['Funding Logic','subsidy & refund state'],
        ['Escrow Settlement','verifiable settlement records']
      ],
      previewInsight:'Session and funding records linked to settlement execution.',
      previewInsightNote:'PostgreSQL functions and triggers track subsidy and refund accounting; on-chain events update the Supabase session mirror.',
      previewContribution:'Four-person group MVP · Led technical implementation, integration and Sepolia validation',
      previewTechnologies:['PostgreSQL / Supabase','TypeScript','Next.js','Solidity','Hardhat','Wagmi / viem'],
      period:'Mar 2026 – May 2026', context:'University of Bristol',
      description:'A hybrid FinTech MVP using smart-contract escrow, subsidy-aware funding and verifiable settlement records for an online counselling workflow.',
      heroTechnologies:['Next.js','TypeScript','Solidity','Hardhat','Wagmi / viem','Supabase','Sepolia'],
      architectureTechnologies:['Next.js / React / TypeScript','Solidity','Hardhat / OpenZeppelin','Wagmi / viem','Supabase','Sepolia'],
      prototypeUrl:'https://mindpass-ftgp-group19.vercel.app/',
      url:'https://github.com/M1n9yu2002/mindpass-fintech-escrow-dapp', caseStudy:'./mindpass.html',
      productParagraphs:[
        'A counselling session can involve patient payment, sponsor subsidy, therapist acceptance, attendance, no-shows and final settlement.',
        'MindPass turns those conditions into an explicit financial workflow, using escrow to determine when funds should be locked, refunded, returned or released.'
      ],
      lifecycleLabels:['Request','Fund','Attend','Resolve','Settle','Withdraw'],
      capabilities:[
        ['Programmable escrow','Funds are governed by contract-defined session states rather than a simple direct payment.'],
        ['Split funding','Patient-paid and sponsor-funded portions can be represented separately within the same session.'],
        ['Outcome-aware settlement','Completion, payment timeout and no-show outcomes lead to different settlement paths.'],
        ['Claimable balances','Settlement assigns balances first; the relevant recipients then withdraw their allocated funds.']
      ],
      architectureLayers:['Wallet','Next.js application','Wagmi / viem','MindPassEscrow · Sepolia','Events / transaction receipts','Supabase mirror'],
      architectureSummary:'Settlement-critical state transitions live on-chain; dashboards, therapist records, realtime coordination and application-facing state remain off-chain.',
      architectureNote:'The smart contract is the authoritative settlement layer, while the frontend, API routes and Supabase support the operational application experience.',
      contributionIntro:'MindPass was a four-person university group project. I led the technical implementation and integration of the final MVP, drove much of the technical discussion and project coordination, and completed the final technical consolidation of the submitted report and project evidence.',
      contributions:[
        ['Technical implementation','Built the core Next.js application flows, wallet entry, role-aware dashboards and session-state behaviour.'],
        ['Smart-contract integration','Connected frontend actions to the escrow lifecycle through Wagmi / viem and coordinated contract-driven settlement states.'],
        ['On-chain / off-chain integration','Connected smart-contract outcomes with Supabase-backed application state and realtime session mirroring.'],
        ['Debugging & system consistency','Reconciled frontend state, Supabase records, wallet transactions and smart-contract outcomes across the hybrid workflow.'],
        ['Sepolia validation','Led deployed end-to-end testing, transaction verification and collection of supporting evidence.'],
        ['Project & report integration','Chaired much of the technical discussion, coordinated implementation direction, integrated the technical sections of the final report, corrected technical overclaims, and aligned the written submission with the implemented MVP.']
      ],
      contributionDisclaimer:'Four-person group project · contribution statements reflect the documented technical implementation, integration and final project delivery recorded in the submitted evidence.',
      validationLayers:[
        ['Hardhat','Selected smart-contract invariants'],
        ['Sepolia','Deployed end-to-end settlement scenarios'],
        ['Etherscan + Supabase','Transaction outcomes reconciled with application state']
      ],
      validationScenarios:'Tested scenarios included successful completion, a mixed-funded no-show case, patient no-show, therapist rejection and payment timeout.',
      scope:'MindPass demonstrates the settlement workflow rather than a complete decentralised healthcare system. Timeout and no-show resolution still require an explicit trigger, off-chain mirror state can diverge if synchronisation fails, therapist verification remains application-level, and encrypted clinical records, decentralised identity and secure messaging are outside the implemented MVP.'
    },
    { id:'customer-risk', layout:'summary', category:'Risk Analytics / Customer Analytics', title:'Customer Behavior–Driven Risk Analysis',
      summary:'Translated transaction-level trading activity into interpretable customer-level behavioural indicators and a 40-customer target cohort for focused risk review.',
      previewEvidence:[
        ['200','most active customers'],
        ['40','target customers for risk review']
      ],
      previewInsight:'Behavioural signals for focused review.',
      previewInsightNote:'Transaction activity became customer-level indicators; PnL was not used to select the cohort.',
      description:'Translated transaction-level trading activity into interpretable customer-level behavioural indicators, then narrowed the 200 most active users to a 40-customer target cohort for focused risk review.',
      previewTechnologies:['R','R Markdown','Risk Analytics','Customer Behaviour'],
      detailTechnologies:['R','R Markdown','Customer Analytics','Risk Analytics','Reproducible Analysis'],
      caseStudy:'./customer-risk.html', url:'https://github.com/M1n9yu2002/risk-management-customer-behavior-analysis/tree/main',
      signals:[
        {name:'High exposure',value:'>50%',description:'Trade value greater than 50% of reconstructed pre-transaction cash balance.'},
        {name:'FOMO-like buying',value:'>3%',description:'Buy execution more than 3% above the previous close.',note:'Used as a heuristic behavioural signal, not evidence of customer motivation or intent.'},
        {name:'Market-order reliance',value:'Market',description:'Use of market orders as a customer-level execution characteristic.'},
        {name:'Low-balance reloading',value:'<$500',description:'Deposit made when reconstructed pre-deposit balance is below $500.'}
      ],
      decisions:[
        ['Early-warning review','Prioritise customer cohorts for further review before treating any flag as a final risk judgement.'],
        ['Customer education','Use behavioural context to support more relevant risk-management education.'],
        ['Friction & prompts','Explore where additional warnings, prompts or deliberate pauses could support more disciplined decisions.'],
        ['Retention & platform-risk monitoring','Evaluate behavioural changes alongside churn, customer lifetime value and broader platform-risk indicators.']
      ],
      scope:'This is a descriptive rather than causal analysis. The thresholds are heuristic and context-dependent, observed trading patterns do not establish customer motivation, and the target cohort should be interpreted as a prioritisation mechanism rather than a validated risk classification. Operational use would require calibration on representative data, ongoing monitoring and evaluation of intervention outcomes.'
    },
    { id:'modelling-pipeline', layout:'summary', category:'Statistical Modelling',
      title:'Robust Algorithm Evaluation and Predictive Modelling Pipeline',
      caseTitle:'Robust Algorithm Evaluation & Predictive Modelling Pipeline',
      summary:'Evaluated five Differential Evolution configurations across 26 benchmark problems, then built a leakage-aware classification pipeline with grouped cross-validation and held-out evaluation.',
      previewEvidence:[
        ['5','DE configurations'],
        ['26','benchmark problems']
      ],
      previewInsight:'Pilot Config C → Multi‑problem Config B.',
      previewInsightNote:'Group-aware split · Grouped 5-fold CV · Held-out evaluation',
      description:'Two complementary modelling studies: one tests whether optimisation choices remain stable across changing benchmark conditions; the other builds a leakage-aware classification pipeline from exploration through held-out evaluation.',
      previewTechnologies:['R','Statistical Modelling','Optimisation','Validation'],
      detailTechnologies:['R','R Markdown','tidymodels','Statistical Modelling','Experimental Design'],
      methodsTechnologies:['R','R Markdown','tidymodels','glmnet','ANOVA','RCBD','PCA','Cross-validation'],
      caseStudy:'./modelling-pipeline.html',
      url:'https://github.com/M1n9yu2002/robust-optimisation-and-predictive-pipeline/tree/main'
    }
  ],
  skills: [
    ['Data & analytics', ['Python','SQL','R','Statistical modelling','Survival analysis']],
    ['Financial & risk', ['Market microstructure','Order-book analytics','Risk analytics','Customer analytics','Transaction data']],
    ['Data systems', ['Relational data modelling','PostgreSQL / Supabase','Data validation','Reproducible pipelines','AWS']],
    ['Applications', ['Next.js / TypeScript','Django','Solidity','Hardhat']]
  ],
  education: [
    ['University of Bristol','MSc Financial Technology with Data Science','2025–2026','Dissertation completed · Final results expected November 2026'],
    ['National Kaohsiung University of Science and Technology','BSc Information Management','2020–2024']
  ]
};
