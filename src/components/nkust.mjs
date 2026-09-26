// Representative completed coursework, checked against the official transcript.
// The 109 curriculum plan informs the grouping only; it is not a completion record.
const tracks = [
  {
    title: 'Programming & Software Foundations',
    description: 'Programming, software structure and data structures developed alongside an understanding of the computing environments that run them.',
    courses: ['Basic Computer Concepts', 'Computer Programming', 'Object-Oriented Programming', 'Data Structures', 'Software Engineering', 'Linux System', 'Operating Systems']
  },
  {
    title: 'Data & Analytics',
    description: 'A progression from statistics and relational data to R-based analysis, network analysis and big-data applications.',
    courses: ['Statistics (Ⅰ)', 'Statistics (Ⅱ)', 'Database Management', 'Data Science Application and R', 'Social Network Analysis and Management', 'Big Data Analytics']
  },
  {
    title: 'Information Systems & Digital Business',
    description: 'Systems design and management coursework connected technology to organisational processes and digital business change.',
    courses: ['Introduction to Information Management', 'Systems Analysis and Design', 'Management Information System', 'e-Business', 'Digital Transformation']
  },
  {
    title: 'Networks & Security',
    description: 'Undergraduate exposure to enterprise networks, mobile communications, wireless systems and applied network defence.',
    courses: ['Enterprise Information Networks', 'Mobile Communication and Commerce', 'Wireless Networks', 'The Practice of Network Attack and Defense']
  },
  {
    title: 'Business & Emerging Technology',
    description: 'Management and finance foundations gave the technical study a business setting, with later exposure to smart technology and blockchain contracts.',
    courses: ['Accounting', 'Economics (I) — Microeconomics', 'Economics (II) — Macroeconomics', 'Introduction to Management', 'Financial Management', 'Smart Technology', 'Block Chain Smart Contract Practice']
  }
];

const track = (item, index) => `<article class="nkust-track"><span class="nkust-track-number">${String(index + 1).padStart(2, '0')}</span><div><h3>${item.title}</h3><p>${item.description}</p><ul>${item.courses.map(course => `<li>${course}</li>`).join('')}</ul></div></article>`;

export function nkustPage() { return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#006DAD"><title>Mingyu Wang | National Kaohsiung University of Science and Technology</title><meta name="description" content="Mingyu Wang's BSc Information Management at National Kaohsiung University of Science and Technology, covering programming, data analytics, information systems, networks, digital business and emerging technologies."><link rel="icon" href="./assets/favicon.svg"><link rel="stylesheet" href="./assets/styles.css"><script src="./assets/app.js" defer></script></head><body id="top" class="nkust-page"><a class="skip-link" href="#main">Skip to content</a><header class="glass-nav"><a class="wordmark" href="./index.html">Mingyu Wang<span class="brand-dot" aria-hidden="true">.</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="nav-links">Menu <span aria-hidden="true">+</span></button><nav id="nav-links" aria-label="Education page navigation"><a href="#programme">Programme</a><a href="#foundations">Foundations</a><a href="#next-step">Next step</a><a href="#degree">Degree</a></nav></header><main id="main" tabindex="-1">
<section class="nkust-hero"><div class="container"><p class="eyebrow">MINGYU WANG / EDUCATION</p><div class="nkust-hero-type reveal ready"><h1>National Kaohsiung University <br class="nkust-desktop-break">of Science and Technology</h1><p class="nkust-degree">BSc Information Management</p></div><noscript><style>.nkust-hero-type.reveal.ready{opacity:1;transform:none}</style></noscript><p class="nkust-period">2020–2024<br>Department of Information Management</p><div class="nkust-hero-actions"><a href="./index.html#education">Back to portfolio <span aria-hidden="true">←</span></a><a href="https://mis.nkust.edu.tw/p/412-1097-5822.php?Lang=en" target="_blank" rel="noopener noreferrer" aria-label="Official NKUST Information Management department, opens in a new tab">Official department <span aria-hidden="true">↗</span></a></div></div></section>
<section class="nkust-section nkust-intro near-black" id="programme"><div class="container"><p class="eyebrow">THE PROGRAMME</p><h2>Where computing, data<br>and business came together.</h2><p class="lead">Information Management brought programming, statistics, databases and information systems into the same education as digital business and management. That breadth became the foundation for my later specialisation in financial technology and data science.</p></div></section>
<section class="nkust-section" id="foundations"><div class="container"><p class="eyebrow">COMPLETED COURSEWORK / SELECTED</p><h2>Technical foundations.</h2><p class="nkust-section-note">Five professional learning tracks drawn from my completed undergraduate coursework.</p><div class="nkust-tracks">${tracks.map(track).join('')}</div></div></section>
<section class="nkust-section nkust-next near-black" id="next-step"><div class="container"><p class="eyebrow">THE PROGRESSION</p><h2>Foundation for<br>the next step.</h2><p class="lead">The BSc established a broad base in programming, databases, statistics, information systems, digital business and networks. I extended it through postgraduate work in financial technology, market data, cloud data engineering and applied analytics.</p><a class="nkust-next-link" href="./bristol.html">University of Bristol <span aria-hidden="true">→</span></a></div></section>
<section class="nkust-section" id="degree"><div class="container"><p class="eyebrow">THE RECORD</p><h2>Degree summary.</h2><dl class="nkust-summary"><div><dt>Degree</dt><dd>BSc Information Management</dd></div><div><dt>Institution</dt><dd>National Kaohsiung University of Science and Technology</dd></div><div><dt>Study period</dt><dd>2020–2024</dd></div><div><dt>Credits completed</dt><dd>137</dd></div></dl><a class="nkust-return" href="./index.html#education">Back to portfolio ←</a></div></section></main><footer class="container"><p>Mingyu Wang © <span data-current-year>2026</span></p><p>Data · Evidence · Understanding</p><a href="#top">Back to top ↑</a></footer></body></html>`; }
