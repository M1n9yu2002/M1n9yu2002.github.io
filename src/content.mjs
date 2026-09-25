// Personal facts and links supplied by the portfolio owner. No inferred project results.
export const content = {
  name: 'Mingyu Wang',
  links: { email: 'cyruswang2002@hotmail.com', linkedin: 'https://www.linkedin.com/in/mingyu-wang-fintech/', github: 'https://github.com/M1n9yu2002', resume: '/resume.html' },
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
      description:'A hybrid FinTech MVP combining smart-contract escrow with application-level coordination to manage payment, subsidy funding and settlement across an online counselling workflow.',
      heroTechnologies:['Next.js','TypeScript','Solidity','Hardhat','Wagmi / viem','Supabase','Sepolia'],
      architectureTechnologies:['Next.js / React / TypeScript','Solidity','Hardhat / OpenZeppelin','Wagmi / viem','Supabase','Sepolia'],
      prototypeUrl:'https://mindpass-ftgp-group19.vercel.app/',
      url:'https://github.com/M1n9yu2002/mindpass-fintech-escrow-dapp', caseStudy:'./mindpass.html',
      productParagraphs:[
        'A counselling appointment can involve multiple parties and multiple outcomes: patient payment, sponsor subsidy, therapist acceptance, attendance, rejection, timeout or no-show.',
        'MindPass models these conditions as an explicit settlement lifecycle in which funds can be locked, returned, refunded or released according to the final session state.'
      ],
      lifecycleLabels:['Request','Fund','Accept','Attend','Resolve','Settle','Withdraw'],
      capabilities:[
        ['Programmable escrow','Contract-defined session states determine how funds move.'],
        ['Split funding','Patient-paid and sponsor-funded portions can coexist within one session.'],
        ['Outcome-aware settlement','Completion, timeout and no-show paths can produce different settlement outcomes.']
      ],
      architectureSummary:'Settlement-critical rules and balances live on-chain, while user workflows, dashboards, records and realtime coordination remain in the application layer.',
      architectureNote:'The smart contract is the authoritative settlement layer. Next.js and Supabase support operational state and user-facing workflows, while contract events and transaction receipts connect on-chain outcomes with the application.',
      dataModelIntro:'MindPass uses a relational application model to coordinate users, sessions, communication, support workflows and settlement-related state around the on-chain escrow lifecycle.',
      dataModelNote:'The database coordinates application state; it is not the financial source of truth. Settlement-critical outcomes remain governed by the smart contract, while Supabase maintains the operational representation used by the application.',
      contributionIntro:'MindPass was developed as a four-person university project. I led much of the technical implementation and final integration of the MVP, while also coordinating technical decisions and consolidating the final implementation evidence.',
      contributions:[
        ['Build','Implemented core Next.js application flows, wallet entry, role-aware dashboards and session-state behaviour.'],
        ['Integrate','Connected frontend actions to the Solidity escrow lifecycle through Wagmi / viem and linked contract outcomes with Supabase-backed application state.'],
        ['Validate','Debugged inconsistencies across frontend state, Supabase records, wallet transactions and smart-contract outcomes, then led deployed end-to-end validation on Sepolia.']
      ],
      contributionNote:'I also coordinated much of the technical discussion, consolidated the technical sections of the final report, corrected implementation overclaims and aligned the written submission with the behaviour of the delivered MVP.',
      contributionDisclaimer:'Four-person group project · contribution statements reflect the documented technical implementation, integration and final project delivery recorded in the submitted evidence.',
      validationLayers:[
        ['Hardhat','Selected smart-contract behaviours and settlement rules.'],
        ['Sepolia','Deployed end-to-end settlement scenarios using testnet transactions.'],
        ['Etherscan + Supabase','Transaction outcomes reconciled with application state.']
      ],
      validationScenarios:'Tested scenarios included successful completion, mixed-funded no-show, patient no-show, therapist rejection and payment timeout.',
      scopeParagraphs:[
        'MindPass demonstrates the settlement architecture rather than a production-ready decentralised healthcare system.',
        'Timeout and no-show resolution still require an explicit trigger. Off-chain mirror state can diverge if synchronisation fails. Therapist verification remains application-level, while encrypted clinical records, decentralised identity and secure messaging sit outside the implemented scope.',
        'These boundaries define the implemented MVP rather than being presented as capabilities the system does not yet provide.'
      ]
    },
    { id:'customer-risk', layout:'summary', category:'Risk Analytics / Customer Analytics', title:'Customer Behaviour–Driven Risk Analysis',
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
    ['Data systems & cloud', ['Relational data modelling','PostgreSQL / Supabase','Data validation','Reproducible pipelines',{label:'AWS cloud workflows',detail:'EC2 · S3 · SQS · DynamoDB · Auto Scaling · CloudWatch · IAM'}]],
    ['Applications & reporting', ['Next.js / TypeScript','Django','Tableau / R Markdown','Solidity / Hardhat']]
  ],
  education: [
    ['University of Bristol','MSc Financial Technology with Data Science','2025–2026','Dissertation completed · Final results expected November 2026','Global rankings · TIME 2026 #35 · QS 2027 #57 · THE 2026 =#80'],
    ['National Kaohsiung University of Science and Technology','BSc Information Management','2020–2024']
  ]
};
