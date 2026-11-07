/* All site content. Edit here; no rebuild needed for content changes. */
window.SITE = {
  person: {
    name: "Ahmad Faraz Sheikh",
    short: "AF",
    /* the changing line on the left, one per service */
    typed: [
      "RAG systems that cite their sources",
      "agents with guardrails and memory",
      "data pipelines that stay clean",
      "evals that catch failures early",
      "computer vision for worksite safety",
      "private LLM stacks on vLLM"
    ],
    lede: "I build the backend of LLM products at Redbuffer: retrieval pipelines, agentic systems and ingestion services, deployed on AWS and on-prem with vLLM.",
    location: "Islamabad, Pakistan",
    email: "faraz.sheikh2001@gmail.com",
    linkedin: "https://www.linkedin.com/in/ahmadfarazsheikh",
    github: "https://github.com/FarazSheikh16",
    medium: "https://medium.com/@faraz.sheikh",
    whatsapp: "https://wa.me/923364987342",
    cv: "assets/doc/Ahmad-Faraz-Sheikh-CV.pdf"
  },

  proof: [
    { n: "2 yrs", l: "building production ML at Redbuffer" },
    { n: "7", l: "client projects shipped, L3 to L4" },
    { n: "49 + 6", l: "news sources and metric providers ingested" },
    { n: "4", l: "technical articles on Medium" }
  ],

  about: [
    "My work sits behind LLM products: the retrieval, orchestration, data and evaluation layers that decide whether an answer is right, safe and traceable. I do it as a machine learning engineer at <b>Redbuffer</b> in Islamabad, where I was promoted to L4 in August 2026.",
    "Since October 2024 I've shipped systems for legal tech, market intelligence, worksite safety, email automation, surveying and EDI. Some run on AWS (Lambda, OpenSearch, ECS), others fully on-prem with open-source models served through vLLM.",
    "Before that I studied computer science at <b>PIEAS</b>, where I led the machine learning track at Google Developer Student Club. I still write about what I build on Redbuffer's Medium."
  ],

  facts: [
    ["Now", "ML Engineer (L4), Redbuffer"],
    ["Based in", "Islamabad, Pakistan"],
    ["Focus", "RAG, agents, data pipelines, evaluation"],
    ["Serving", "AWS, Docker, vLLM on-prem"],
    ["Degree", "BS Computer Science, PIEAS (3.53)"]
  ],

  services: [
    { icon: "search", title: "RAG and retrieval", text: "Structure-aware chunking, vector search on Qdrant and OpenSearch, citation-grounded answers and answerability checks." },
    { icon: "bot", title: "Agentic AI", text: "Agents on the OpenAI Agent SDK and LangGraph with guardrails, memory, context summarization and dynamic MCP tools." },
    { icon: "flow", title: "Data pipelines", text: "Async ingestion from RSS, APIs and scrapers, normalization, hash-based dedup and revision tracking in PostgreSQL." },
    { icon: "gauge", title: "Evaluation and LLMOps", text: "Gold-set evals, LLM-as-judge scoring, Langfuse traces and Sentry alerts so failures show up before users notice." },
    { icon: "eye", title: "Computer vision and DL", text: "Near real-time risk detection in video, pose estimation with ViT, graph neural networks and CLIP embeddings." },
    { icon: "cloud", title: "Deployment", text: "FastAPI services on AWS with Terraform, or private on-prem stacks with Docker and open-source LLMs on vLLM." }
  ],

  /* Hire me page: what a team gets, each backed by a real result */
  why: [
    { t: "Answers you can trust", d: "Retrieval that cites the exact source, and says so when the answer isn't in the data instead of guessing.", proof: "Zonlex: every answer links to a section ID" },
    { t: "Agents that stay inside the lines", d: "Guardrails at the tool and input/output level, memory across sessions, and tools loaded only when the task needs them.", proof: "Agent platform: guardrails at 2 levels" },
    { t: "Clean data before clever models", d: "Async ingestion with normalization, hash-based dedup and revision tracking, so the model reads one clean version of the truth.", proof: "BeyondOne: 49 news sources and 6 metric providers" },
    { t: "Quality you can measure", d: "Gold-set evals, LLM-as-judge scoring and Langfuse traces, so quality is a number you can watch, not a feeling.", proof: "Zonlex: recall, answerability and correctness tracked" },
    { t: "Runs where your data has to live", d: "On AWS with Terraform, Lambda and ECS, or fully on-prem with open-source models on vLLM when data can't leave the building.", proof: "EDI: a private LLM stack, on-prem" },
    { t: "Work your team can own", d: "I write up what I build and why, so the system doesn't depend on me after handover.", proof: "4 technical articles on Medium" }
  ],
  process: [
    ["Understand the question", "What must the system answer, from which data, and how will we know it's right?"],
    ["Build with evals from day one", "A small gold set and tracing go in before features, so every change is measured."],
    ["Ship and watch it", "Deploy on your stack with monitoring and alerts, then tune from real usage."]
  ],
  contact: {
    title: "Let's talk",
    text: "Tell me what you're building and where it's stuck: a RAG system that guesses, an agent you can't trust yet, or data that won't stay clean.",
    where: "Based in Islamabad, Pakistan (UTC+5)"
  },

  experience: [
    {
      role: "Machine Learning Engineer (L4)",
      org: "Redbuffer",
      when: "Aug 2026 – Present",
      where: "Islamabad",
      text: "Promoted to L4. Leading backend and retrieval work on two client platforms.",
      projects: ["zonlex", "beyondone"]
    },
    {
      role: "Machine Learning Engineer (L3)",
      org: "Redbuffer",
      when: "Oct 2024 – Jul 2026",
      where: "Islamabad",
      text: "Built and shipped LLM, agentic and computer vision systems across five client projects.",
      projects: ["agentic", "worksite", "continuas", "cad", "edi"]
    },
    {
      role: "Machine Learning Intern",
      org: "PanaceaLogics",
      when: "Sep 2024 – Oct 2024",
      where: "Islamabad",
      text: "Researched ML and DL approaches, then trained and evaluated models for object detection and for estimating an object's length and distance."
    }
  ],

  filters: [
    { id: "all", label: "All" },
    { id: "llm", label: "LLM apps" },
    { id: "rag", label: "RAG" },
    { id: "agents", label: "Agents" },
    { id: "data", label: "Data pipelines" },
    { id: "ml", label: "ML and vision" },
    { id: "deploy", label: "Deployment" }
  ],

  /* featured: shown on Home. Order here is the order on the Projects page. */
  projects: [
    {
      id: "zonlex",
      short: "Zonlex",
      featured: true,
      tags: ["llm", "rag"],
      client: "Zonlex · Legal tech",
      when: "2026",
      title: "Citation-grounded RAG for zoning law",
      summary: "A legal RAG backend that answers zoning-code questions with exact section citations, and says so when the code doesn't answer the question.",
      stats: [["Cited", "every answer links to a section ID"], ["3 metrics", "recall, answerability, correctness"], ["Any LLM", "Gemini, vLLM or local via LiteLLM"]],
      context: "Zoning answers are only useful if a planner can check them against the code. A plain chatbot that paraphrases, or answers when the code is silent, is worse than no answer.",
      built: [
        "End-to-end backend on FastAPI, Qdrant and LiteLLM that ingests municipal code documents.",
        "Structure-aware chunking that keeps section IDs and citation anchors intact, so every answer points to the exact clause.",
        "Answerability handling: the system declines when the retrieved code doesn't support an answer.",
        "LiteLLM for provider-agnostic generation and embeddings, so Gemini, vLLM or any OpenAI-compatible local model is a config change.",
        "An evaluation module driven by gold Q&A spreadsheets that scores citation recall, answerability accuracy and answer correctness with LLM-as-judge, and exports Excel and JSON reports."
      ],
      flow: [["Municipal codes", "PDF / HTML"], ["Chunk", "section IDs + anchors"], ["Embed", "LiteLLM"], ["Qdrant", "vector search"], ["Generate", "with citations"], ["Answerable?", "or decline"]],
      eval: [["Gold Q&A", "spreadsheets"], ["Run pipeline", "per question"], ["LLM judge", "3 metrics"], ["Report", "Excel + JSON"]],
      stack: ["Python", "FastAPI", "Qdrant", "LiteLLM", "Gemini", "vLLM", "LLM-as-judge"]
    },
    {
      id: "beyondone",
      short: "BeyondOne",
      featured: true,
      tags: ["data"],
      client: "BeyondOne · Market intelligence",
      when: "2026",
      title: "Market data ingestion across 49 sources",
      summary: "A Python/FastAPI pipeline that continuously pulls news and macroeconomic metrics for Chile, Saudi Arabia and global markets into one clean, deduplicated store.",
      stats: [["49", "article sources"], ["6", "metric providers"], ["6", "normalized PostgreSQL tables"]],
      context: "Market intelligence depends on fresh, trustworthy inputs. The sources speak different formats (REST JSON, SDMX, RSS and Atom), publish duplicates and quietly revise past figures.",
      built: [
        "Ingestion pipeline fetching articles, news and metrics from RSS, the App Store, SEC EDGAR and custom scrapers.",
        "PostgreSQL schema and persistence layer for six normalized tables, with SHA-256 content-hash dedup and deterministic UUID5 identity keys.",
        "An asyncio per-source scheduler with configurable polling intervals, per-source overlap locks, YAML-driven source matching against a DB-first registry, and manual trigger endpoints in FastAPI.",
        "Revision detection that tracks prior values, so a provider correcting last quarter's figure is recorded, not overwritten.",
        "A normalization layer that maps REST JSON, SDMX and RSS/Atom XML responses into one observation model."
      ],
      flow: [["Sources", "RSS · EDGAR · App Store · scrapers"], ["Scheduler", "asyncio + per-source locks"], ["Normalize", "JSON · SDMX · XML"], ["Dedup", "SHA-256 · UUID5"], ["PostgreSQL", "upserts + revisions"], ["FastAPI", "query + triggers"]],
      stack: ["Python", "FastAPI", "asyncio", "PostgreSQL", "SDMX", "YAML", "SEC EDGAR"]
    },
    {
      id: "agentic",
      short: "Agent platform",
      featured: true,
      tags: ["llm", "agents"],
      client: "Redbuffer · Agentic AI platform",
      when: "2024–26",
      title: "Guardrails, memory and dynamic MCP for an agent platform",
      summary: "Safety and context features for an agentic chat system: configurable LLM guardrails, cross-session memory, context summarization, data masking and agent-managed MCP tools.",
      stats: [["2 levels", "guardrails at tool and I/O"], ["No-code", "UI to add custom guardrails"], ["Masked", "sensitive data before the LLM"]],
      context: "An agent that can call tools needs limits a business can set without a developer, and it has to keep context in long sessions without loading every tool up front.",
      built: [
        "A dynamic LLM-based guardrails pipeline that validates at tool level and at input/output, with an API and web interface so non-technical users can add and manage their own guardrails.",
        "Context summarization so conversations keep going when session history grows large.",
        "Memory tools that let the agent save and recall user-specific information across sessions on request.",
        "Agentic MCP management: the agent decides when to initialize or reinitialize MCP instances based on the task.",
        "A data masker that hides sensitive values before any LLM sees them."
      ],
      flow: [["User", "message"], ["Data masker", "PII hidden"], ["Input guardrails", "custom rules"], ["Agent", "memory + summarizer"], ["MCP tools", "loaded on demand"], ["Output guardrails", "checked reply"]],
      stack: ["OpenAI Agent SDK", "MCP", "Python", "FastAPI", "Guardrails"],
      links: [["Read: Agentic MCP", "https://medium.com/red-buffer/agentic-mcp-dynamic-mcp-integration-for-ai-agents-5c1daf5b950c"]]
    },
    {
      id: "worksite",
      short: "Worksite safety",
      featured: true,
      tags: ["llm", "rag", "ml", "deploy", "data"],
      client: "Worksite safety · Construction",
      when: "2024–26",
      title: "AI Hub for worksite safety",
      summary: "RAG knowledge bases and a near real-time computer vision system that spots risks in worksite video and suggests safety measures, deployed on AWS.",
      stats: [["RAG", "domain knowledge bases"], ["Near real-time", "video risk detection"], ["AWS", "provisioned with Terraform"]],
      context: "Safety teams need answers grounded in their own procedures, and an extra pair of eyes on site footage.",
      built: [
        "RAG systems with domain knowledge bases wired into LLM pipelines.",
        "Scalable ingestion for domain datasets, covering dedup, indexing and OpenSearch mappings.",
        "ML pipelines and APIs deployed on AWS: Lambda, API Gateway, OpenSearch, S3, ECS and ECR, managed with Terraform.",
        "A near real-time computer vision solution that detects risks in worksite videos and suggests measures to reduce them."
      ],
      flow: [["Site docs", "procedures"], ["Ingest", "dedup + mapping"], ["OpenSearch", "index"], ["Lambda + API GW", "RAG API"], ["Video feed", "worksite"], ["CV model", "risk + advice"]],
      stack: ["AWS Lambda", "API Gateway", "OpenSearch", "S3", "ECS", "ECR", "Terraform", "OpenCV", "PyTorch"]
    },
    {
      id: "continuas",
      short: "Continuas AI",
      tags: ["llm", "agents"],
      client: "Continuas AI · Email productivity",
      when: "2024–26",
      title: "LLM follow-ups and replies for email threads",
      summary: "An inference state machine that reads a thread, decides whether a follow-up is due and when, drafts tone-aware replies and tags priority, with Langfuse and Sentry watching it.",
      stats: [["State machine", "classify, tone, delay, fallback"], ["Timezone-aware", "skips weekends"], ["Observed", "Langfuse + Sentry"]],
      context: "A reminder that fires on a Saturday or ignores the recipient's timezone looks careless. The pipeline had to reason about thread state, intent and timing, and fail safely.",
      built: [
        "An LLM reminder pipeline that classifies thread state, extracts scheduling intent and generates follow-ups with timezone and weekend-aware logic.",
        "A multi-step state machine for inference: classification, tone analysis, delay calculation, cold-email follow-ups and fallback paths for failure recovery.",
        "Reply and reply-all templates with tone-aware variants tuned to user preferences and recipient context.",
        "Automatic email tagging and priority classification.",
        "Structured error handling, Langfuse observability and Sentry monitoring for model and API failures and timeouts."
      ],
      flow: [["Thread", "email"], ["Classify", "state"], ["Intent", "scheduling"], ["Tone", "analysis"], ["Delay", "tz + weekends"], ["Draft", "reminder / reply"]],
      stack: ["Python", "LLMs", "Langfuse", "Sentry", "State machine"]
    },
    {
      id: "cad",
      short: "Survey matching",
      tags: ["ml"],
      client: "Surveying · Geospatial",
      when: "2024–26",
      title: "Matching survey points to CAD geometry with GNNs",
      summary: "A GeoGNN/GraphSAGE pipeline with CLIP and MiniLM embeddings that matches raw survey points to CAD/DWG geometry using spatial, semantic and field-code features.",
      stats: [["≈0.69", "validation F1"], ["GraphSAGE", "graph neural network"], ["CLIP + MiniLM", "semantic features"]],
      context: "Reconciling field survey points against design drawings is slow, manual work, and point codes are often inconsistent.",
      built: [
        "A GeoGNN/GraphSAGE pipeline combining spatial, semantic (CLIP, all-MiniLM) and field-code features.",
        "Python tooling for survey-to-CAD comparison, point classification, field-code matching, movement detection and dedup.",
        "Grid search with fault-tolerant resume and hyperparameter tuning, reaching a validation F1 of about 0.69."
      ],
      flow: [["Survey + CAD", "points, DWG"], ["Features", "spatial · semantic · code"], ["Graph", "build"], ["GraphSAGE", "train"], ["Match", "classify points"], ["Report", "movement + dupes"]],
      stack: ["PyTorch", "GraphSAGE", "CLIP", "all-MiniLM", "Python"]
    },
    {
      id: "edi",
      short: "EDI",
      tags: ["llm", "deploy"],
      client: "EDI · Supply chain",
      when: "2024–26",
      title: "On-prem LLM automation for EDI mappings",
      summary: "A platform that validates and generates field-level mappings between input and output documents across trading partners, running open-source LLMs on vLLM inside the client's network.",
      stats: [["On-prem", "no data leaves the network"], ["vLLM", "open-source LLM serving"], ["Multi-partner", "field-level mappings"]],
      context: "EDI documents carry commercial data a company can't send to a third-party API, and each trading partner formats them differently.",
      built: [
        "An EDI automation platform that validates and generates field-level mappings between input and output documents for many trading partners.",
        "Evaluation and integration of large-context open-source LLMs to improve mapping accuracy.",
        "Full on-prem deployment in Docker, with open-source models served through vLLM."
      ],
      flow: [["Input doc", "partner A"], ["Parse", "fields"], ["LLM", "large-context, vLLM"], ["Mapping", "field to field"], ["Validate", "rules"], ["Output doc", "partner B"]],
      stack: ["vLLM", "Docker", "Open-source LLMs", "Python"],
      links: [["Read: private LLM inference with vLLM", "https://medium.com/red-buffer/private-scalable-llm-inference-for-data-compliance-vllm-sglang-539ad81af04f"]]
    }
  ],

  university: [
    {
      title: "Human pose estimation with ViT",
      tag: "Final year project",
      text: "Applied a Vision Transformer to COCO, adapted it to low-light data (ExLPose) for better accuracy in poor lighting, and served it through an API to a Flutter mobile app.",
      stats: ["ViT", "COCO", "ExLPose", "Flutter"],
      repo: "https://github.com/FarazSheikh16/Poseapp"
    },
    {
      title: "Computer vision geolocation",
      tag: "94% accuracy",
      text: "Fine-tuned MobileNet in Keras on University of Salford building images to geolocate a photo from colour, texture and shape, with results shown on Google Maps.",
      stats: ["MobileNet", "Keras", "Google Maps"],
      repo: "https://github.com/FarazSheikh16/cv-based-geolocation"
    },
    {
      title: "Bot account detection",
      tag: "80% accuracy",
      text: "Account-level detection with a DNN and SMOTE for class balance, plus tweet-level detection with LSTM and DNN models.",
      stats: ["DNN", "LSTM", "SMOTE"],
      repo: "https://github.com/FarazSheikh16/DNNforBotDetection"
    },
    {
      title: "Urdu hate speech detection",
      tag: "80%+ accuracy",
      text: "ML and DL models that flag offensive Urdu text, improved with extra YouTube comments and e-commerce reviews so they hold up on real-world language.",
      stats: ["NLP", "Urdu", "Deep learning"],
      repo: "https://github.com/FarazSheikh16/Urdu-Hate-Speech-Detection"
    }
  ],

  repos: [
    { name: "zero-shot-object-detection-using-clip", year: "2025", lang: "Jupyter", text: "Detecting objects from text prompts with CLIP, no task-specific training." },
    { name: "Sentence-Segmentation-in-Urdu", year: "2023", lang: "Jupyter", text: "Splitting Urdu text into sentences." },
    { name: "N-Gram-Language-Model", year: "2023", lang: "Jupyter", text: "An n-gram language model built from scratch." },
    { name: "Breast-Cancer-Detection", year: "2024", lang: "Jupyter", text: "Classification experiments on breast cancer data." },
    { name: "brain-tumor-detection", year: "2024", lang: "Notebook", text: "Brain tumor detection from medical images." },
    { name: "Flask_Auth_App", year: "2024", lang: "Python", text: "Flask app with JWT authentication and two-factor auth." }
  ],

  writing: [
    {
      title: "Private, Scalable LLM Inference for Data Compliance: vLLM & SGLang",
      date: "Apr 2026",
      text: "Why regulated teams self-host LLMs, and how vLLM and SGLang deliver data sovereignty at production throughput.",
      url: "https://medium.com/red-buffer/private-scalable-llm-inference-for-data-compliance-vllm-sglang-539ad81af04f"
    },
    {
      title: "Zero-Shot Object Detection with CLIP Models",
      date: "Jan 2026",
      text: "Finding objects a model was never trained on, using text descriptions and CLIP.",
      url: "https://medium.com/red-buffer/zero-shot-object-detection-with-clip-models-8dc69bc8834b"
    },
    {
      title: "Agentic MCP: Dynamic MCP Integration for AI Agents",
      date: "Nov 2025",
      text: "Letting agents connect MCP servers on demand instead of loading every tool up front.",
      url: "https://medium.com/red-buffer/agentic-mcp-dynamic-mcp-integration-for-ai-agents-5c1daf5b950c"
    },
    {
      title: "A Practical Guide to the OpenAI Agent SDK",
      date: "Jul 2025",
      text: "Building agents that use tools, make decisions and hand off to each other.",
      url: "https://medium.com/red-buffer/a-practical-guide-to-the-openai-agent-sdk-12243710dd75"
    }
  ],

  skills: [
    { group: "LLMs and agents", items: ["RAG", "OpenAI Agent SDK", "LangGraph", "LangChain", "MCP", "LiteLLM", "Guardrails", "LLM-as-judge"] },
    { group: "Retrieval and data", items: ["Qdrant", "OpenSearch", "PostgreSQL", "FastAPI", "asyncio", "SQL"] },
    { group: "Machine learning", items: ["PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "OpenCV", "NLTK", "GraphSAGE", "ViT", "CLIP"] },
    { group: "Serving and cloud", items: ["vLLM", "Docker", "Terraform", "AWS Lambda", "API Gateway", "ECS", "ECR", "S3"] },
    { group: "Observability", items: ["Langfuse", "Sentry"] },
    { group: "Languages and analysis", items: ["Python", "C/C++", "SQL", "NumPy", "Pandas", "SciPy", "Matplotlib", "Seaborn"] }
  ],

  education: {
    school: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
    degree: "BS Computer Science",
    when: "2020 – 2024",
    where: "Islamabad",
    cgpa: "3.53 / 4.00",
    courses: ["Artificial Intelligence", "Machine Learning", "Natural Language Processing", "Computer Vision", "Data Mining", "Data Structures", "OOP and Design", "Software Engineering", "Operating Systems", "Database Systems"]
  },

  leadership: [
    { role: "Machine Learning Lead", org: "Google Developer Student Club, PIEAS", when: "Sep 2023 – Jun 2024" },
    { role: "Treasurer", org: "PIEAS Artificial Intelligence Society", when: "Dec 2022 – May 2024" },
    { role: "Marketing Lead", org: "Google Developer Student Club, PIEAS", when: "Aug 2022 – Jun 2023" },
    { role: "Information Secretary", org: "Islamic Society, PIEAS", when: "Apr 2022 – Jun 2023" }
  ]
};
