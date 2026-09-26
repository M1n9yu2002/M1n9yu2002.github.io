// Bristol's English component remains the structural and factual source.
// Each checked replacement changes only the published Chinese rendering.
const copy = [
  ['<html lang="en">', '<html lang="zh-Hant">'],
  ['<title>Mingyu Wang | University of Bristol</title>', '<title>王明宇｜布里斯托大學</title>'],
  [`<meta name="description" content="Mingyu Wang's MSc Financial Technology with Data Science at the University of Bristol, covering financial technology, statistical computing, data analytics, cloud data engineering and applied research.">`, '<meta name="description" content="王明宇於布里斯托大學金融科技與資料科學碩士的修課內容與實作經驗，涵蓋統計運算、資料分析、AWS 資料工程、金融科技與獨立研究。">'],
  ['./assets/', '../assets/', 3],
  ['class="bristol-page"', 'class="bristol-page locale-zh"'],
  ['Skip to content', '跳至主要內容'],
  ['href="./index.html#education"', 'href="/zh/#education"', 2],
  ['href="./index.html"', 'href="/zh/"'],
  ['>Menu <span aria-hidden="true">+</span>', '>選單 <span aria-hidden="true">+</span>'],
  ['aria-label="Education page navigation"', 'aria-label="學歷頁面導覽"'],
  ['href="#programme">Programme</a>', 'href="#programme">課程</a>'],
  ['href="#curriculum">Curriculum</a>', 'href="#curriculum">修課</a>'],
  ['href="#outcomes">Outcomes</a>', 'href="#outcomes">能力</a>'],
  ['href="#status">Status</a>', 'href="#status">進度</a>'],
  ['MINGYU WANG / EDUCATION', '王明宇 / EDUCATION'],
  ['<h1>University of Bristol</h1>', '<h1>布里斯托大學</h1>'],
  ['MSc Financial Technology<br>\nwith Data Science', '金融科技與<br>\n資料科學碩士'],
  ['School of Engineering Mathematics and Technology', '工程數學與科技學院'],
  ['Dissertation completed · Final results expected November 2026', '論文已完成 · 預計 2026 年 11 月公布最終成績'],
  ['Back to portfolio', '返回作品集', 2],
  ['aria-label="Official University of Bristol MSc programme, opens in a new tab"', 'aria-label="開啟布里斯托大學官方碩士課程頁面（新分頁）"'],
  ['Official programme <span', '官方課程頁面 <span'],
  ['THE PROGRAMME', '課程概覽'],
  ['<h2>Technology, data<br>and finance.</h2>', '<h2>技術 · 資料 · 金融</h2>'],
  ['An engineering-led MSc connecting financial technology with computational and statistical methods, data analytics, large-scale data engineering and applied project work.', '以工程與技術為核心的碩士課程，結合金融科技、運算與統計方法、資料分析、大規模資料工程與應用專題。'],
  ['<dd>1 year</dd><dt>full-time</dt>', '<dd>1 年</dd><dt>全日制</dt>'],
  ['<dd>7 units</dd><dt>including project work</dt>', '<dd>7 個課程單元</dd><dt>包含個人專題</dt>'],
  ['individual-project credits', '個人專題學分'],
  ['THE ACTUAL ROUTE / 2025–2026', '實際修課路線 / 2025–2026'],
  ['<h2>My curriculum.</h2>', '<h2>我的修課內容</h2>'],
  ['SCEM was my selected foundation unit. The curriculum below reflects my 2025–2026 study route.', 'SCEM 是我的選修課，下列內容反映我在 2025–2026 的實際修課路線。'],
  ['Selected foundation route · SCEM', '選修課 · SCEM'],
  ['Statistical computing and empirical methods for analysing financial data, with attention to statistical modelling, evaluation and validation in R.', '以 R 進行金融資料的統計運算與實證分析，涵蓋統計建模、模型評估與驗證。'],
  ['Engineering data workflows for financial technology at scale, from storage and processing to operational performance.', '聚焦金融科技情境下的大規模資料工作流程，從資料儲存與處理延伸到系統效能與實際運作。'],
  ['Built and load-tested a queue-driven AWS processing workflow using EC2, S3, SQS and DynamoDB, with CloudWatch-driven Auto Scaling and IAM access control.', '使用 EC2、S3、SQS 與 DynamoDB 建置並進行負載測試的佇列式 AWS 處理流程，搭配 CloudWatch 驅動 Auto Scaling，並以 IAM 管理存取權限。'],
  ['<dd>~120 files</dd><dt>load-test burst</dt>', '<dd>約 120 個檔案</dd><dt>負載測試批次</dt>'],
  ['<dd>1 → 3 workers</dd><dt>automatic scale-out</dt>', '<dd>1 → 3 workers</dd><dt>自動擴展</dt>'],
  ['t2.micro vs t3.micro in coursework test conditions', 't2.micro 與 t3.micro · 課程作業測試條件'],
  ['Introduced the design and assessment of financial technology applications and the systems that support data-driven finance.', '介紹金融科技應用的設計與評估，以及支撐資料驅動金融服務的相關系統。'],
  ['SELECTED COURSEWORK EVIDENCE', '課程實作精選'],
  ['Computational market experiments in the Bristol Stock Exchange.', '以 Bristol Stock Exchange 進行市場模擬實驗'],
  ['Used the Bristol Stock Exchange (BSE) simulator to search MMM01 market-maker settings across synthetic and real-price-derived environments, then selected a cross-market baseline. Modified MMM02 so recent trade-price variation relative to a moving average adjusted its bidding and markup, and compared the strategies in matched IBM-offset simulations.', '使用 Bristol Stock Exchange（BSE）模擬器，在合成市場與由真實價格資料衍生的市場環境中搜尋 MMM01 的造市參數，並選出跨市場的穩健基準設定。接著修改 MMM02，讓近期交易價格相對移動平均的波動程度調整出價與 markup，並在配對的 IBM-offset 模擬中比較兩種策略。'],
  ['<dd>5 markets</dd><dt>synthetic, IBM, Copper, Nasdaq and T-Note</dt>', '<dd>5 個市場</dd><dt>合成市場、IBM、Copper、Nasdaq 與 T-Note</dt>'],
  ['<dd>20 IID runs</dd><dt>per parameter configuration</dt>', '<dd>20 次 IID 模擬</dd><dt>每組參數設定</dt>'],
  ['<dd>80 matched pairs</dd><dt>MMM01* versus modified MMM02</dt>', '<dd>80 組配對模擬</dd><dt>MMM01* 與修改後的 MMM02</dt>'],
  ['In the IBM-offset comparison, mean final balance was 557.95 for MMM01* and 601.39 for modified MMM02 (one-sided paired t-test, p = 0.0017).', '在 IBM-offset 比較中，MMM01* 的最終平均餘額為 557.95，修改後的 MMM02 為 601.39（單尾配對 t 檢定，p = 0.0017）。'],
  ['Extended the programme’s financial technology foundations through more advanced applications and their technical assessment.', '延伸課程的金融科技基礎，進一步探討更進階的應用與技術評估。'],
  ['Developed analytical training in data analysis, statistical methods and AI-enabled approaches to interpreting data.', '培養資料分析、統計方法與 AI 輔助分析的應用能力。'],
  ['Applied the programme’s ideas in a collaborative financial technology implementation project.', '透過團隊專題，將課程概念實作為金融科技系統。'],
  ['Four-person group MVP. Led technical implementation, integration and Sepolia validation; work covered relational data, funding logic, programmable escrow and settlement integration.', '四人團隊 MVP。主導技術實作、系統整合與 Sepolia 驗證，內容涵蓋關聯式資料、資金邏輯、可程式化 Escrow 託管與結算整合。'],
  ['RELATED PORTFOLIO EVIDENCE', '相關作品', 2],
  ['View project', '查看專案', 4],
  ['A substantial independent research project bringing together programme methods through planning, analysis, documentation and presentation.', '一項完整的獨立研究專題，整合研究規劃、資料分析、文件撰寫與成果簡報等課程能力。'],
  ['<dd>10</dd><dt>Nasdaq securities</dt>', '<dd>10</dd><dt>檔 Nasdaq 股票</dt>'],
  ['<dd>37</dd><dt>sessions per security</dt>', '<dd>37</dd><dt>個交易時段 / 每檔股票</dt>'],
  ['one-second market states', '一秒市場狀態'],
  ['liquidity-shock records', '流動性衝擊紀錄'],
  ['recovery observations', '復原觀測'],
  ['Individual project · academic year', '個人專題 · 全學年'],
  ['<h3>Individual project <span>', '<h3>個人專題 <span>'],
  ['Programme total', '課程總學分'],
  ['The <a href=', '<a href='],
  ['aria-label="University of Bristol MSc programme, opens in a new tab"', 'aria-label="開啟布里斯托大學官方碩士課程頁面（新分頁）"'],
  ['official programme page ↗</a> explains the foundation choice and compulsory units. Module descriptions here are concise summaries based on the published programme structure.', '官方課程頁面 ↗</a> 說明選修課程與必修課程架構；本頁的課程說明則依據公開課程架構整理為精簡摘要。'],
  ['THE SYNTHESIS', '能力整合'],
  ['<h2>What the degree<br>brought together.</h2>', '<h2>這個學位<br>整合的能力</h2>'],
  ['Data &amp; statistics', '資料與統計'],
  ['R · statistical modelling · empirical analysis · validation', 'R · 統計建模 · 實證分析 · 驗證'],
  ['Financial technology</h3>', '金融科技</h3>'],
  ['FinTech systems · market data · risk analytics · programmable finance', 'FinTech 系統 · 市場資料 · 風險分析 · 可程式化金融'],
  ['Cloud &amp; data systems', '雲端與資料系統'],
  ['AWS · data pipelines · relational data · scalable processing', 'AWS · 資料流程 · 關聯式資料 · 可擴展資料處理'],
  ['Applied research', '應用研究'],
  ['Research design · reproducibility · independent analysis · technical communication', '研究設計 · 可重現性 · 獨立分析 · 技術溝通'],
  ['CURRENT RECORD', '目前狀態'],
  ['<h2>Programme status.</h2>', '<h2>學位進度</h2>'],
  ['<dt>Programme</dt><dd>MSc Financial Technology with Data Science</dd>', '<dt>學位</dt><dd>金融科技與資料科學碩士</dd>'],
  ['<dt>Study period</dt>', '<dt>就讀期間</dt>'],
  ['<dt>Taught modules</dt>', '<dt>授課課程</dt>'],
  ['<dt>Individual project</dt>', '<dt>個人專題</dt>'],
  ['<dt>Viva</dt>', '<dt>口試</dt>'],
  ['<dt>Final results</dt><dd>Expected November 2026</dd>', '<dt>最終成績</dt><dd>預計 2026 年 11 月公布</dd>'],
  ['Completed</dd>', '已完成</dd>', 3],
  [' credits', ' 學分', 12],
  ['<footer class="container"><p>Mingyu Wang ©', '<footer class="container"><p>王明宇 ©'],
  ['Data · Evidence · Understanding', '資料 · 證據 · 理解'],
  ['Back to top ↑', '回到頂端 ↑'],
  ['href="#top">回到頂端', 'href="/zh/bristol.html#top">回到頂端']
];

const moduleSubtitles = [
  ['Statistical Computing and Empirical Methods for Financial Technology', '金融科技統計運算與實證方法'],
  ['Large-Scale Data Engineering for Financial Technology', '金融科技大規模資料工程'],
  ['Introduction to Financial Technology', '金融科技導論'],
  ['Advanced Financial Technology', '進階金融科技'],
  ['Introduction to AI and Data Analytics', 'AI 與資料分析導論'],
  ['Financial Technology Group Project', '金融科技團隊專題'],
  ['Financial Technology Individual Project', '金融科技個人專題']
];

export function localizeBristolPage(english) {
  let html = english;
  for (const [source, translated, expected = 1] of copy) {
    const count = html.split(source).length - 1;
    if (count !== expected) throw Error(`Bristol zh-TW source mismatch: ${source} (${count}, expected ${expected})`);
    html = html.replaceAll(source, translated);
  }
  for (const [official, subtitle] of moduleSubtitles) {
    const heading = `<h4>${official}</h4>`;
    if (html.split(heading).length !== 2) throw Error(`Bristol module title missing or duplicated: ${official}`);
    html = html.replace(heading, `<h4 lang="en">${official}</h4><p class="bristol-module-subtitle" lang="zh-TW">${subtitle}</p>`);
  }
  return html;
}
