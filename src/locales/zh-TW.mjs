// Homepage copy only. Factual values, project titles, URLs and technologies come
// from the English content model so they stay aligned until reviewed together.
export const homeText = new Map([
  ['<html lang="en">', '<html lang="zh-TW">'],
  ['<title>Mingyu Wang | Financial Data Analyst</title>', '<title>王明宇｜金融資料分析作品集</title>'],
  ['<meta name="description" content="Financial Data Analyst portfolio focused on financial data, risk analytics, FinTech systems, market data and reproducible analysis.">', '<meta name="description" content="王明宇的資料分析作品集，涵蓋金融資料、風險分析、FinTech 系統與可重現的分析方法。">'],
  ['class="home-page"', 'class="home-page locale-zh"'],
  ['Skip to content', '跳至主要內容'],
  ['>Menu <span aria-hidden="true">+</span>', '>選單 <span aria-hidden="true">+</span>'],
  ['aria-label="Main navigation"', 'aria-label="主要導覽"'],
  ['>Work</a>', '>作品</a>'],
  ['>Skills</a>', '>技能</a>'],
  ['>Education</a>', '>學歷</a>'],
  ['>About</a>', '>關於</a>'],
  ['<p class="eyebrow reveal ready">MINGYU WANG / <span>DATA ANALYST</span></p>', '<p class="eyebrow reveal ready">王明宇 / <span>DATA ANALYST</span></p>'],
  ['Complex data,', '讓複雜資料'],
  ['made understandable.', '變得清楚可用'],
  ['MSc Financial Technology with Data Science at the University of Bristol.<br class="desktop-break"> Focused on financial data, risk analytics, statistical modelling and AI-enabled analysis.', '英國布里斯托大學金融科技與資料科學碩士。<br class="desktop-break">專注於金融資料、風險分析、統計建模與 AI 輔助分析。'],
  ['View selected work', '查看精選作品'],
  ['COMPLEXITY, INTO CLARITY.', '化繁為清晰 / '],
  ['FINANCIAL DATA / ABSTRACT STUDY', '金融資料 / 抽象視覺'],
  ['SELECTED WORK', '精選作品'],
  ['Built with data.', '以資料建構'],
  ['Tested with evidence.', '用證據驗證'],
  ['Financial data, FinTech systems, risk analytics and statistical modelling.', '金融資料、FinTech 系統、風險分析與統計建模。'],
  ['WHAT I WORK WITH', '使用的工具與方法'],
  ['A quantitative mindset.', '量化思維'],
  ['A practical toolkit.', '實用工具'],
  ['THE FOUNDATION', '學習基礎'],
  ['Education.', '學歷'],
  ['A LITTLE ABOUT ME', '關於我'],
  ['I work where<br>data meets<br><span class="muted">decisions.</span>', '把資料變成<br><span class="muted">決策依據</span>'],
  ['I focus on data, analytics and technology, with particular interest in turning complex financial, market and business data into structured, reproducible analysis.', '我運用資料、分析與技術，將複雜的金融、市場與商業資料整理成有架構、可重現的分析。'],
  ['I care not only about whether an analytical result works, but why it works, under what assumptions, and how reliably it can be reproduced.', '我在意的不只是分析結果是否有效，也重視它為什麼有效、建立在哪些假設上，以及能否可靠地重現。'],
  ['THE NEXT CHAPTER', '下一篇章'],
  ['Open to opportunities<br><span class="muted">in Taiwan.</span>', '期待在台灣展開<br><span class="muted">下一段職涯</span>'],
  ['Data Analytics · Business Analytics · Financial &amp; Risk Analytics · Product Analytics · FinTech', '資料分析 · 商業分析 · 金融與風險分析 · 產品分析 · FinTech'],
  ['Based in New Taipei City, Taiwan · Open to opportunities across Taiwan', '現居新北市 · 接受全台工作機會'],
  ['On-site · Hybrid · Remote · Available from October 2026', 'On-site · Hybrid · Remote · 2026 年 10 月起可到職'],
  ['<footer class="container"><p>Mingyu Wang</p>', '<footer class="container"><p>王明宇</p>'],
  ['Data. Evidence. Understanding.', '資料 · 證據 · 理解'],
  ['Back to top ↑', '回到頂端 ↑']
]);

export function localizeHomeTemplate(template) {
  let output = template;
  for (const [english, chinese] of homeText) {
    if (!output.includes(english)) throw Error(`Missing English homepage text: ${english}`);
    output = output.replace(english, chinese);
  }
  return output.replaceAll('./assets/', '../assets/');
}

export function localizeHomeContent(c) {
  const previews = {
    mindpass: {
      category: 'FinTech / 可程式化託管 · 四人團隊 MVP',
      summary: '結合關聯式諮商預約與補助紀錄、分攤資金、可程式化 Escrow 託管及可驗證結算的 FinTech MVP。',
      previewEvidence: [['關聯式資料', '與預約連結的紀錄'], ['資金邏輯', '補助與退款狀態'], ['Escrow 託管結算', '可驗證的結算紀錄']],
      previewInsight: '預約與資金紀錄串接至結算執行',
      previewInsightNote: 'PostgreSQL 函式與觸發器追蹤補助與退款狀態；鏈上事件則同步更新 Supabase 中的預約紀錄。',
      previewContribution: '四人團隊 MVP · 主導技術實作、整合與 Sepolia 驗證'
    },
    'customer-risk': {
      category: '風險分析 / 客戶分析',
      summary: '將逐筆交易活動轉為可解讀的客戶行為指標，並從活躍客戶中選出 40 人，供後續風險檢視。',
      previewEvidence: [['200', '最活躍客戶'], ['40', '風險檢視目標客戶']],
      previewInsight: '以行為訊號聚焦風險檢視',
      previewInsightNote: '將交易活動整理成客戶層級指標；目標群體的篩選未使用 PnL。',
      previewTechnologies: ['R', 'R Markdown', '風險分析', '客戶行為']
    },
    'modelling-pipeline': {
      category: '統計建模',
      summary: '在 26 個基準問題上評估五種 Differential Evolution 設定，並建立避免資料洩漏的分類流程，採用分組交叉驗證與獨立保留測試集進行評估。',
      previewEvidence: [['5', 'DE 設定'], ['26', '基準問題']],
      previewInsight: '初步 Config C → 多問題 Config B',
      previewInsightNote: '依群組切分資料 · grouped 5-fold CV · 保留測試集評估',
      previewTechnologies: ['R', '統計建模', '最佳化', '驗證']
    }
  };
  return {
    ...c,
    research: {
      ...c.research,
      summary: '以高頻市場微結構資料，研究報價買賣價差與委託簿顯示深度在短期流動性衝擊後的復原情形。'
    },
    projects: c.projects.map(project => ({...project, ...previews[project.id]})),
    skills: [
      ['資料與分析', ['Python', 'SQL', 'R', '統計建模', '存活分析']],
      ['金融與風險', ['市場微結構', '委託簿分析', '風險分析', '客戶分析', '交易資料']],
      ['資料系統與雲端', ['關聯式資料建模', 'PostgreSQL / Supabase', '資料驗證', '可重現分析流程', {label:'AWS 雲端工作流程', detail:'EC2 · S3 · SQS · DynamoDB · Auto Scaling · CloudWatch · IAM'}]],
      ['應用開發與報告', ['Next.js / TypeScript', 'Django', 'Tableau / R Markdown', 'Solidity / Hardhat']]
    ],
    education: [
      ['布里斯托大學（University of Bristol）', '金融科技與資料科學碩士', c.education[0][2], '論文已完成 · 預計 2026 年 11 月公布最終成績', '全球排名 · TIME 2026 #35 · QS 2027 #57 · THE 2026 =#80'],
      ['國立高雄科技大學', '資訊管理學士', c.education[1][2]]
    ]
  };
}
