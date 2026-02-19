export const NAV_ITEMS = [
  { id: 'intro', label: 'SYS.INIT' },
  { id: 'part1', label: 'DIAGNOSIS' },
  { id: 'part1-2', label: 'B4.DANGER' },
  { id: 'part1-3', label: 'METRICS' },
  { id: 'part2', label: 'ARCHITECTURE' },
  { id: 'part2-2', label: 'RETRIEVAL' },
  { id: 'part2-3', label: 'FAIL.TAXONOMY' },
  { id: 'part2-4', label: 'CALIBRATION' },
  { id: 'part3', label: 'EVAL.EVAL' },
  { id: 'part4', label: 'HARD.Q' },
  { id: 'refs', label: 'REFERENCES' },
];

export const TAXONOMY = {
  retrieval: [
    {
      id: 'A1',
      name: 'Semantic Proximity Trap',
      desc: 'Embeddings map "pembrolizumab in NSCLC" close to "pembrolizumab in melanoma" \u2014 same drug, wrong indication, retrieval score 0.91. Dense retrieval does not encode indication boundaries.',
      ref: { text: 'Lewis et al., 2020', url: 'https://arxiv.org/abs/2005.11401' },
      detectability: 'Medium',
    },
    {
      id: 'A2',
      name: 'Temporal Conflation',
      desc: '2019 Phase II (positive, n=89) mixed with 2023 Phase III (negative, n=1200). RAG has no inherent temporal supersession logic.',
      ref: { text: 'Jeong et al., 2024', url: 'https://arxiv.org/abs/2403.14403' },
      detectability: 'Medium',
    },
    {
      id: 'A3',
      name: 'Publication Bias Amplification',
      desc: 'Corpus has 6 positive studies, 4 negative never published. Agent sees 100% positive. Well-documented systematic distortion in pharma literature.',
      refs: [
        { text: 'Turner et al., 2008', url: 'https://www.nejm.org/doi/full/10.1056/NEJMsa065779' },
        { text: 'Dickersin, 1990', url: 'https://pubmed.ncbi.nlm.nih.gov/2406472/' },
      ],
      detectability: 'Very Low',
    },
  ],
  reasoning: [
    {
      id: 'B4',
      name: 'Grounded Confabulation',
      desc: '"Study A: Drug X reduces tumor 30% in RCC. Study B: 30% reduction correlates with 5y survival." Agent bridges them \u2014 but Study B was in breast cancer. Each citation correct, causal bridge fabricated. Standard faithfulness metrics miss this.',
      ref: { text: 'Maynez et al., 2020', url: 'https://arxiv.org/abs/2005.00661' },
      detectability: 'Very Low',
      dangerous: true,
    },
    {
      id: 'B5',
      name: 'Statistical Misinterpretation',
      desc: '"OS HR 0.82, CI 0.67\u20131.01, p=0.06" \u2192 Agent: "trend toward improvement." Reality: trial failed primary endpoint. LLMs are demonstrably poor at statistical reasoning.',
      ref: { text: 'Ji et al., 2023', url: 'https://arxiv.org/abs/2202.03629' },
      detectability: 'Medium',
    },
    {
      id: 'B6',
      name: 'Evidence Hierarchy Flattening',
      desc: '1 Phase III RCT (negative, n=1800) + 3 case series (positive, n=35 total). Agent: "majority supports efficacy." Violates evidence-based medicine hierarchy.',
      ref: { text: 'GRADE, Guyatt et al., 2008', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2335261/' },
      detectability: 'Medium',
    },
  ],
  epistemic: [
    {
      id: 'C7',
      name: 'Absence-as-Evidence Blindness',
      desc: 'No studies on elderly patients \u2192 "No safety concerns identified." Absence of data \u2260 absence of risk.',
      detectability: 'Low',
    },
    {
      id: 'C8',
      name: 'Competence Boundary Invisibility',
      desc: 'Asked about commercial potential, answers with clinical data \u2014 different question entirely.',
      detectability: 'Low',
    },
    {
      id: 'C9',
      name: 'Autoregressive Confidence Lock-In',
      desc: 'First tokens "Based on the evidence, Drug X demonstrates..." lock confident tone. Mechanical property of autoregressive generation.',
      ref: { text: 'Kadavath et al., 2022', url: 'https://arxiv.org/abs/2207.05221' },
      detectability: 'Very Low',
    },
    {
      id: 'C10',
      name: 'Contradiction Suppression',
      desc: 'Sources disagree; LLM resolves silently, picks one side. Trained for coherence, not epistemic transparency.',
      detectability: 'Medium',
    },
  ],
};

export const METRICS = [
  {
    abbr: 'ECE',
    name: 'Expected Calibration Error',
    definition: 'Weighted avg of |confidence \u2212 accuracy| across confidence bins',
    why: 'Directly measures "says 95% sure, right 80% of the time" \u2014 the client\'s exact complaint',
    refs: [
      { text: 'Guo et al., 2017', url: 'https://arxiv.org/abs/1706.04599' },
      { text: 'Naeini et al., 2015', url: 'https://ojs.aaai.org/index.php/AAAI/article/view/9602' },
    ],
    min: '< 0.15',
    mature: '< 0.05',
  },
  {
    abbr: 'SWER',
    name: 'Severity-Weighted Error Rate',
    definition: 'Errors \u00d7 severity weight (S0=\u00d71 \u2026 S3=\u00d7100)',
    why: '"Wrong author" \u2260 "missed drug interaction"',
    refs: [
      { text: 'GRADE framework', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2335261/' },
    ],
    min: '\u2014',
    mature: '\u2014',
  },
  {
    abbr: 'EDS',
    name: 'Epistemic Discrimination Score',
    definition: 'AUROC of system confidence as binary classifier for correctness',
    why: 'The single most important metric \u2014 can the system tell when it doesn\'t know?',
    refs: [
      { text: 'Xiong et al., 2023', url: 'https://arxiv.org/abs/2306.13063' },
    ],
    min: '> 0.70',
    mature: '> 0.85',
  },
  {
    abbr: 'Escalation P/R',
    name: 'Escalation Precision & Recall',
    definition: 'Of S2+S3 errors: how many caught? Of escalations: how many real?',
    why: 'Directly measures selective HITL value',
    refs: [],
    min: 'Recall > 0.85',
    mature: 'Recall > 0.95',
  },
];

export const ZONES = [
  {
    name: 'GREEN',
    color: 'green',
    trigger: 'All signals strong. Factual query. Agreement > 0.85, coverage > 0.9, evidence > 3.0',
    response: 'Direct answer + inline citations + evidence level tags + confidence score',
    hitl: 'None',
  },
  {
    name: 'YELLOW',
    color: 'yellow',
    trigger: 'Partial coverage, moderate evidence, temporal evolution, or comparative query',
    response: 'Structural separation: evidence vs. inference. Explicit gap identification',
    hitl: 'None',
  },
  {
    name: 'ORANGE',
    color: 'orange',
    trigger: 'Source agreement < 0.6, high-quality evidence on both sides',
    response: '5-step structured disagreement: decompose \u2192 weight \u2192 score \u2192 differential \u2192 composite. No single answer',
    hitl: 'Briefing prepared',
  },
  {
    name: 'RED',
    color: 'red',
    trigger: 'Predictive/causal query, safety + low coverage, or circuit-broken domain',
    response: 'What system CAN provide + what it CANNOT assess + prepared expert package',
    hitl: 'Required',
  },
  {
    name: 'GRAY',
    color: 'gray',
    trigger: 'Coverage < 0.3 or all retrieval < 0.5',
    response: '"Cannot answer" + differential diagnosis of why',
    hitl: 'N/A',
  },
];

export const SIGNALS = [
  {
    name: 'Source Agreement',
    computation: 'Tiered NLI via DeBERTa-v3 on chunk pairs',
    detects: 'Contradictory evidence',
    refs: [
      { text: 'DeBERTa-v3', url: 'https://arxiv.org/abs/2111.09543' },
      { text: 'Williams et al., 2018', url: 'https://arxiv.org/abs/1704.05426' },
    ],
  },
  {
    name: 'Coverage Ratio',
    computation: 'Medical NER (SciSpacy) extracts query concepts, checks presence in chunks',
    detects: 'Partial evidence, gaps',
    refs: [],
  },
  {
    name: 'Evidence Level',
    computation: 'Classify chunks by GRADE hierarchy (systematic review=5 \u2192 case series=1)',
    detects: 'Low-quality evidence base',
    refs: [{ text: 'GRADE', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2335261/' }],
  },
  {
    name: 'Temporal Profile',
    computation: 'Publication date analysis, newer vs. older evidence divergence',
    detects: 'Evolving/outdated evidence',
    refs: [],
  },
  {
    name: 'Query Complexity',
    computation: 'Few-shot LLM (cold start) \u2192 fine-tuned classifier (~200 labels)',
    detects: 'Questions requiring inference beyond evidence',
    refs: [{ text: 'Adaptive-RAG', url: 'https://arxiv.org/abs/2403.14403' }],
  },
  {
    name: 'Retrieval Distribution',
    computation: 'Statistical analysis of cosine similarities (mean, std, cliff)',
    detects: 'Weak or ambiguous retrieval',
    refs: [],
  },
];

export const DISTRIBUTION = [
  { zone: 'GREEN', cold: '~25%', mature: '~40-50%' },
  { zone: 'YELLOW', cold: '~35%', mature: '~30%' },
  { zone: 'ORANGE', cold: '~10%', mature: '~8%' },
  { zone: 'RED', cold: '~15%', mature: '~7%' },
  { zone: 'GRAY', cold: '~15%', mature: '~5-10%' },
  { zone: 'Human involvement', cold: '~25%', mature: '~7-10%', highlight: true },
];

export const HORIZONS = [
  { name: 'H1: Implicit', latency: 'Real-time', signal: 'User follow-ups, manual escalation', trust: 'Low (noisy)' },
  { name: 'H2: Expert Spot-Check', latency: 'Weekly', signal: '50-100 stratified reviews/week', trust: 'High \u2014 the critical process', highlight: true },
  { name: 'H3: Cross-Validation', latency: 'Monthly', signal: 'Same question rephrased \u2192 answers contradict?', trust: 'Medium' },
  { name: 'H4: Deferred Ground Truth', latency: 'Yearly', signal: 'Trial results resolve historical assessments', trust: 'Definitive' },
];

export const EVAL_DIMENSIONS = [
  { dimension: 'Faithfulness', reliability: 'HIGH', evaluator: 'LLM judge + NLI', refText: 'Maynez et al., 2020', refUrl: 'https://arxiv.org/abs/2005.00661' },
  { dimension: 'Source accuracy', reliability: 'HIGH', evaluator: 'Deterministic lookup' },
  { dimension: 'Completeness', reliability: 'MEDIUM', evaluator: 'LLM judge' },
  { dimension: 'Logical validity', reliability: 'LOW', evaluator: 'Human expert', dangerous: true },
  { dimension: 'Statistical interpretation', reliability: 'LOW', evaluator: 'Rule-based + human', dangerous: true },
  { dimension: 'Clinical appropriateness', reliability: 'VERY LOW', evaluator: 'Human expert only', dangerous: true },
];

export const REFERENCES = {
  calibration: [
    { paper: 'Guo et al., 2017. On Calibration of Modern Neural Networks. ICML', url: 'https://arxiv.org/abs/1706.04599' },
    { paper: 'Naeini et al., 2015. Bayesian Binning into Quantiles (ECE). AAAI', url: 'https://ojs.aaai.org/index.php/AAAI/article/view/9602' },
    { paper: 'Platt, 1999. Probabilistic Outputs for SVMs (Platt scaling)', url: 'https://www.cs.cornell.edu/courses/cs678/2007sp/platt.pdf' },
    { paper: 'Zadrozny & Elkan, 2002. Isotonic Regression Calibration. KDD', url: 'https://dl.acm.org/doi/10.1145/775047.775151' },
    { paper: 'Kadavath et al., 2022. Language Models (Mostly) Know What They Know', url: 'https://arxiv.org/abs/2207.05221' },
    { paper: 'Kuhn et al., 2023. Semantic Uncertainty. ICLR', url: 'https://arxiv.org/abs/2302.09664' },
    { paper: 'Xiong et al., 2023. Can LLMs Express Their Uncertainty?', url: 'https://arxiv.org/abs/2306.13063' },
    { paper: 'Lin et al., 2022. Teaching Models to Express Uncertainty in Words. TMLR', url: 'https://arxiv.org/abs/2205.14334' },
  ],
  rag: [
    { paper: 'Lewis et al., 2020. RAG for Knowledge-Intensive NLP. NeurIPS', url: 'https://arxiv.org/abs/2005.11401' },
    { paper: 'Jeong et al., 2024. Adaptive-RAG. NAACL', url: 'https://arxiv.org/abs/2403.14403' },
    { paper: 'Asai et al., 2023. Self-RAG. ICLR', url: 'https://arxiv.org/abs/2310.11511' },
    { paper: 'Yan et al., 2024. Corrective RAG (CRAG)', url: 'https://arxiv.org/abs/2401.15884' },
    { paper: 'Robertson & Zaragoza, 2009. BM25 and Beyond', url: 'https://dl.acm.org/doi/10.1561/1500000019' },
  ],
  evaluation: [
    { paper: 'Zheng et al., 2023. Judging LLM-as-a-Judge. NeurIPS', url: 'https://arxiv.org/abs/2306.05685' },
    { paper: 'Ji et al., 2023. Survey of Hallucination in NLG. ACM Computing Surveys', url: 'https://arxiv.org/abs/2202.03629' },
    { paper: 'Maynez et al., 2020. Faithfulness and Factuality. ACL', url: 'https://arxiv.org/abs/2005.00661' },
    { paper: 'Wang et al., 2023. Self-Consistency. ICLR', url: 'https://arxiv.org/abs/2203.11171' },
    { paper: 'Es et al., 2023. RAGAS: Automated RAG Evaluation. EACL', url: 'https://arxiv.org/abs/2309.15217' },
    { paper: "Cohen, 1960. Cohen's Kappa", url: 'https://journals.sagepub.com/doi/10.1177/001316446002000104' },
  ],
  interpretability: [
    { paper: 'Burns et al., 2022. CCS: Latent Knowledge Without Supervision. ICLR', url: 'https://arxiv.org/abs/2212.03827' },
    { paper: 'Zou et al., 2023. Representation Engineering', url: 'https://arxiv.org/abs/2310.01405' },
    { paper: 'Li et al., 2023. Inference-Time Intervention (ITI). NeurIPS', url: 'https://arxiv.org/abs/2306.03341' },
  ],
  nlp: [
    { paper: 'He et al., 2020. DeBERTa. ICLR', url: 'https://arxiv.org/abs/2006.03654' },
    { paper: 'He et al., 2021. DeBERTa-v3. ICLR', url: 'https://arxiv.org/abs/2111.09543' },
    { paper: 'Williams et al., 2018. MultiNLI. NAACL', url: 'https://arxiv.org/abs/1704.05426' },
    { paper: 'Settles, 2009. Active Learning Survey', url: 'https://burrsettles.com/pub/settles.activelearning.pdf' },
  ],
  pharma: [
    { paper: 'GRADE Working Group (Guyatt et al., 2008). Evidence hierarchy. BMJ', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2335261/' },
    { paper: 'Turner et al., 2008. Publication bias in antidepressant trials. NEJM', url: 'https://www.nejm.org/doi/full/10.1056/NEJMsa065779' },
    { paper: 'Dickersin, 1990. Publication bias existence. JAMA', url: 'https://pubmed.ncbi.nlm.nih.gov/2406472/' },
    { paper: 'EU AI Act, Regulation 2024/1689', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng' },
    { paper: 'FDA 21 CFR Part 11', url: 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11' },
    { paper: 'FDA Data Integrity Guidance (ALCOA+)', url: 'https://www.fda.gov/media/119570/download' },
    { paper: 'WHO Data Integrity (TRS 1033 Annex 4)', url: 'https://www.who.int/publications/m/item/annex-4-trs-1033' },
  ],
};
