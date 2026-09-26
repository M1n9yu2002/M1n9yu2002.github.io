// The English NKUST page supplies the structure and selected completed courses.
// Chinese course names below were checked against the user-provided NKUST transcript.
const copy = [
  ['<html lang="en">', '<html lang="zh-Hant">'],
  ['<title>Mingyu Wang | National Kaohsiung University of Science and Technology</title>', '<title>王明宇｜國立高雄科技大學</title>'],
  [`<meta name="description" content="Mingyu Wang's BSc Information Management at National Kaohsiung University of Science and Technology, covering programming, data analytics, information systems, networks, digital business and emerging technologies.">`, '<meta name="description" content="王明宇於國立高雄科技大學資訊管理學士期間的學習基礎，涵蓋程式設計、資料分析、資訊系統、網路與資安，以及商業與新興科技。">'],
  ['./assets/', '../assets/', 3],
  ['class="nkust-page"', 'class="nkust-page locale-zh"'],
  ['Skip to content', '跳至主要內容'],
  ['href="./index.html#education"', 'href="/zh/#education"', 2],
  ['href="./index.html"', 'href="/zh/"'],
  ['>Menu <span aria-hidden="true">+</span>', '>選單 <span aria-hidden="true">+</span>'],
  ['aria-label="Education page navigation"', 'aria-label="學歷頁面導覽"'],
  ['href="#programme">Programme</a>', 'href="#programme">課程</a>'],
  ['href="#foundations">Foundations</a>', 'href="#foundations">基礎</a>'],
  ['href="#next-step">Next step</a>', 'href="#next-step">延伸</a>'],
  ['href="#degree">Degree</a>', 'href="#degree">學位</a>'],
  ['MINGYU WANG / EDUCATION', '王明宇 / EDUCATION'],
  ['<h1>National Kaohsiung University <br class="nkust-desktop-break">of Science and Technology</h1>', '<h1>國立高雄科技大學</h1>'],
  ['BSc Information Management', '資訊管理學士', 2],
  ['Department of Information Management', '資訊管理系'],
  ['Back to portfolio', '返回作品集', 2],
  ['aria-label="Official NKUST Information Management department, opens in a new tab"', 'aria-label="開啟國立高雄科技大學資訊管理系官方網站（新分頁）"'],
  ['Official department <span', '官方系所網站 <span'],
  ['THE PROGRAMME', '課程概覽'],
  ['<h2>Where computing, data<br>and business came together.</h2>', '<h2>資訊技術 · 資料 · 商業</h2>'],
  ['Information Management brought programming, statistics, databases and information systems into the same education as digital business and management. That breadth became the foundation for my later specialisation in financial technology and data science.', '資訊管理讓我同時學習程式設計、統計、資料庫、資訊系統，以及數位商務與管理。這些基礎也成為我之後進一步學習金融科技與資料科學的起點。'],
  ['COMPLETED COURSEWORK / SELECTED', '已完成課程 / 精選'],
  ['<h2>Technical foundations.</h2>', '<h2>技術與分析基礎</h2>'],
  ['Five professional learning tracks drawn from my completed undergraduate coursework.', '我把已完成的大學課程整理成五個主要方向。'],
  ['<h3>Programming & Software Foundations</h3>', '<h3>程式設計與軟體基礎</h3>'],
  ['Programming, software structure and data structures developed alongside an understanding of the computing environments that run them.', '涵蓋程式設計、資料結構、軟體工程，以及作業系統與 Linux 環境。'],
  ['<h3>Data & Analytics</h3>', '<h3>資料與分析</h3>'],
  ['A progression from statistics and relational data to R-based analysis, network analysis and big-data applications.', '從統計與關聯式資料庫，逐步延伸到 R 分析、社會網路分析與大數據應用。'],
  ['<h3>Information Systems & Digital Business</h3>', '<h3>資訊系統與數位商務</h3>'],
  ['Systems design and management coursework connected technology to organisational processes and digital business change.', '從系統分析與資訊管理出發，理解技術如何支援組織流程、電子商務與數位轉型。'],
  ['<h3>Networks & Security</h3>', '<h3>網路與資安</h3>'],
  ['Undergraduate exposure to enterprise networks, mobile communications, wireless systems and applied network defence.', '涵蓋企業網路、行動通訊、無線網路與網路攻防實務。'],
  ['<h3>Business & Emerging Technology</h3>', '<h3>商業與新興科技</h3>'],
  ['Management and finance foundations gave the technical study a business setting, with later exposure to smart technology and blockchain contracts.', '透過會計、經濟、管理與財務課程建立商業基礎，並延伸至智慧科技與區塊鏈智慧合約。'],
  ['THE PROGRESSION', '從大學到研究所'],
  ['<h2>Foundation for<br>the next step.</h2>', '<h2>為下一階段打下基礎</h2>'],
  ['The BSc established a broad base in programming, databases, statistics, information systems, digital business and networks. I extended it through postgraduate work in financial technology, market data, cloud data engineering and applied analytics.', '大學期間，我建立了程式設計、資料庫、統計、資訊系統、數位商務與網路等基礎；研究所階段則進一步延伸到金融科技、市場資料、雲端資料工程與應用分析。'],
  ['href="./bristol.html"', 'href="/zh/bristol.html"'],
  ['University of Bristol <span', '布里斯托大學 <span'],
  ['THE RECORD', '學位紀錄'],
  ['<h2>Degree summary.</h2>', '<h2>學位摘要</h2>'],
  ['<dt>Degree</dt>', '<dt>學位</dt>'],
  ['<dt>Institution</dt>', '<dt>學校</dt>'],
  ['<dd>National Kaohsiung University of Science and Technology</dd>', '<dd>國立高雄科技大學</dd>'],
  ['<dt>Study period</dt>', '<dt>就讀期間</dt>'],
  ['<dt>Credits completed</dt>', '<dt>修畢學分</dt>'],
  ['<footer class="container"><p>Mingyu Wang ©', '<footer class="container"><p>王明宇 ©'],
  ['Data · Evidence · Understanding', '資料 · 證據 · 理解'],
  ['Back to top ↑', '回到頂端 ↑'],
  ['href="#top">回到頂端', 'href="/zh/nkust.html#top">回到頂端']
];

// The first column is the exact published English list; the second is the
// corresponding official Chinese title on the user's academic record.
const courses = [
  ['Basic Computer Concepts', '計算機概論'],
  ['Computer Programming', '程式設計'],
  ['Object-Oriented Programming', '物件導向程式設計'],
  ['Data Structures', '資料結構'],
  ['Software Engineering', '軟體工程'],
  ['Linux System', 'Linux 系統'],
  ['Operating Systems', '作業系統'],
  ['Statistics (Ⅰ)', '統計學（一）'],
  ['Statistics (Ⅱ)', '統計學（二）'],
  ['Database Management', '資料庫管理'],
  ['Data Science Application and R', '資料科學應用與 R 語言'],
  ['Social Network Analysis and Management', '社群網路分析與管理'],
  ['Big Data Analytics', '大數據分析實務'],
  ['Introduction to Information Management', '資訊管理導論'],
  ['Systems Analysis and Design', '系統分析與設計'],
  ['Management Information System', '管理資訊系統'],
  ['e-Business', '電子化企業'],
  ['Digital Transformation', '數位轉型'],
  ['Enterprise Information Networks', '企業資訊網路'],
  ['Mobile Communication and Commerce', '行動通訊與商務'],
  ['Wireless Networks', '無線網路'],
  ['The Practice of Network Attack and Defense', '網路攻防實務'],
  ['Accounting', '會計學'],
  ['Economics (I) — Microeconomics', '<span lang="zh-TW">經濟學（一）— 個體經濟學</span> <span class="nkust-course-detail" lang="en">Economics (I) — Microeconomics</span>'],
  ['Economics (II) — Macroeconomics', '<span lang="zh-TW">經濟學（二）— 總體經濟學</span> <span class="nkust-course-detail" lang="en">Economics (II) — Macroeconomics</span>'],
  ['Introduction to Management', '管理學'],
  ['Financial Management', '財務管理'],
  ['Smart Technology', '智慧科技'],
  ['Block Chain Smart Contract Practice', '區塊鏈智能合約實務']
];

export function localizeNkustPage(english) {
  let html = english;
  for (const [source, translated, expected = 1] of copy) {
    const count = html.split(source).length - 1;
    if (count !== expected) throw Error(`NKUST zh-TW source mismatch: ${source} (${count}, expected ${expected})`);
    html = html.replaceAll(source, translated);
  }
  for (const [englishTitle, chineseTitle] of courses) {
    const source = `<li>${englishTitle}</li>`;
    if (html.split(source).length !== 2) throw Error(`NKUST course missing or duplicated: ${englishTitle}`);
    html = html.replace(source, `<li>${chineseTitle}</li>`);
  }
  return html;
}
