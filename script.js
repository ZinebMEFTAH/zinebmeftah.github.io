document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. Language Switcher Logic (Desktop)
  // =========================================
  const langToggle = document.querySelector(".lang-toggle");
  const langSwitcher = document.querySelector(".lang-switcher");

  if (langToggle && langSwitcher) {
    langToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove("open");
      }
    });
  }

  // =========================================
  // 2. Mobile Navigation (Burger Menu)
  // =========================================
  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("nav-active") &&
        !navLinks.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        navLinks.classList.remove("nav-active");
        burger.classList.remove("toggle");
      }
    });

    // Close menu on scroll
    window.addEventListener("scroll", () => {
      if (navLinks.classList.contains("nav-active")) {
        navLinks.classList.remove("nav-active");
        burger.classList.remove("toggle");
      }
    });
  }

  // =========================================
  // 3. Chat Widget Logic
  // =========================================
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chatbox");
  const chatClose = document.getElementById("chat-close");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  if (chatToggle && chatBox && chatClose && chatForm && chatInput && chatMessages) {
    const append = (text, who) => {
      const div = document.createElement("div");
      div.className = `chat-bubble ${who}`;
      div.textContent = text;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const openChat = () => chatBox.classList.remove("hidden");
    const closeChat = () => chatBox.classList.add("hidden");
    
    // Builds context from page content for the AI to answer questions
    const buildContext = () => {
      const safeText = (sel) => document.querySelector(sel)?.innerText?.trim() || "";
      const parts = [
        safeText("#profil"),
        safeText("#projects"),
        safeText("#experience"),
        safeText("#competences"),
        safeText("#publications"),
        safeText("#formation"),
        safeText("#langues"),
      ].filter(Boolean);
      return parts.join("\n\n").slice(0, 12000);
    };

    chatToggle.addEventListener("click", (e) => {
      e.preventDefault();
      chatBox.classList.toggle("hidden");
      if (!chatBox.classList.contains("hidden")) chatInput.focus();
    });

    chatClose.addEventListener("click", (e) => {
      e.preventDefault();
      closeChat();
    });

    document.addEventListener("click", (e) => {
      if (chatBox.classList.contains("hidden")) return;
      if (!chatBox.contains(e.target) && !chatToggle.contains(e.target)) closeChat();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeChat();
    });

    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const q = chatInput.value.trim();
      if (!q) return;

      chatInput.value = "";
      append(q, "user");

      try {
        const res = await fetch("https://portfolio-chat.zinebmeftah.workers.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: q,
            context: buildContext()
          })
        });

        const data = await res.json();
        append(data.answer || "No answer.", "bot");
      } catch (err) {
        append("Server error. Try again later.", "bot");
      }
    });

    append("Hi. Ask me anything about my projects.", "bot");
  }

  // =========================================
  // 4. Translations Data
  // =========================================
  const translations = {
    fr: {

      "competences.project3": "Algorithmes de Graphes (A*, Dijkstra)",
      "competences.writing": "Rédaction Scientifique",
      "competences.writingDesc": "Publication d'articles techniques (Hugging Face), documentation structurée.",
      
"projects.clustering.title": "Segmentation Client (Clustering)",
"projects.clustering.short": "Analyse de données non supervisée.",
"projects.clustering.desc": "Analyse comportementale des clients utilisant l'algorithme K-Means pour identifier des segments de marché distincts et optimiser les stratégies marketing. Stack: Python, Scikit-learn.",

"projects.sentiment.title": "Analyse de Sentiments (Avis)",
"projects.sentiment.short": "NLP & Classification de textes.",
"projects.sentiment.desc": "Modèle de traitement du langage naturel (NLP) pour analyser et classer les avis clients (positif/négatif) afin d'extraire des insights produits. Stack: Python, NLTK, BERT.",
      
      "page.title": "Portfolio - Meftah Zineb",
      "nav.title": "Meftah Zineb",
      "header.title": "MEFTAH Zineb",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      
      // Navigation
      "nav.contact": "Contact", "nav.profil": "Profil", "nav.formation": "Formation",
      "nav.publications": "Publications", "nav.projects": "Projets", "nav.competences": "Compétences",
      "nav.langues": "Langues", "nav.experience": "Expérience",
      
      // Section Headers
      "formation.heading": "Formation & Certifications",
      "publications.heading": "Publications",
      "projects.heading": "Projets et Expériences",
      "langues.heading": "Langues",
      "competences.heading": "Compétences",
      "experience.heading": "Expérience & Leadership",
      "contact.heading": "Contact",

      // Profile
      "profile.heading": "À Propos de Moi",
      "profile.greeting": "Bonjour, je suis Meftah Zineb.",
      "profile.text1": "Ingénieure en devenir passionnée par l'IA et la robotique. Je conçois des architectures neuronales avancées et des systèmes full-stack robustes pour résoudre des problèmes complexes.",
      "profile.text2": "Mon expertise couvre le Fine-tuning de LLM, la Vision par Ordinateur et le développement de pipelines ML de bout-en-bout.",

      // Skills Headers
      "competences.languages": "Langages",
      "competences.programming": "Programmation",
      "competences.web": "Développement Web",
      "competences.aiDataSkills": "IA & Data Science",
      "competences.techSkills": "Compétences Techniques",
      "competences.softSkillsTitle": "Soft Skills",
      
      // PROJECTS
      "projects.hover": "Survolez pour voir les détails techniques",
      "projects.link": "Voir le code",
      "projects.link.demo": "Voir la démo",
      "projects.link.modelRepo": "Dépôt modèle",
      "projects.link.demoSpace": "Espace Démo",
      "projects.link.githubRepo": "Dépôt GitHub",
      "projects.link.liveDemo": "Démo Live",
      
      // 1. LeRobot
      "projects.p9.title": "LeRobot PushT Trainer",
      "projects.p9.short": "Entraînement de politiques robotiques.",
      "projects.p9.desc": "Pipeline complet pour l'entraînement et l'évaluation de politiques PushT. Intègre la gestion automatique des checkpoints et le déploiement sur le Hub Hugging Face. Stack: Python, LeRobot, Gradio, CUDA.",

      // 2. Breast Cancer
      "projects.cancer.title": "Détection du Cancer du Sein",
      "projects.cancer.short": "Diagnostic médical par Deep Learning.",
      "projects.cancer.desc": "Système de classification d'images histopathologiques utilisant des CNN optimisés pour le diagnostic précoce avec une haute précision. Stack: Python, TensorFlow/Keras, OpenCV.",

      // 3. Robot Vision
      "projects.p10.title": "Robot Vision Simulator",
      "projects.p10.short": "Simulateur interactif de vision.",
      "projects.p10.desc": "Simulateur web de robotique intégrant la détection d'objets (COCO-SSD) et la navigation autonome (A*) contrôlés par langage naturel. Stack: JS, HTML5 Canvas, TF.js.",

      // 4. AI Website Gen
      "projects.p0.title": "Générateur IA de sites web",
      "projects.p0.short": "Du texte au site web fonctionnel.",
      "projects.p0.desc": "Système d'IA générative capable de concevoir et déployer des sites web complets à partir d'une simple description textuelle. Stack : Python, OpenAI API, Selenium.",

      // 5. News Wave
      "projects.p2.title": "News Wave",
      "projects.p2.short": "Agrégateur d'actualités intelligent.",
      "projects.p2.desc": "Application d'actualités personnalisée utilisant le NLP pour filtrer, catégriser et recommander des articles pertinents en temps réel selon les préférences utilisateur. Stack: Python, NewsAPI, NLP.",

      // 6. Compiler
      "projects.compiler.title": "Compilateur Pascal-like",
      "projects.compiler.short": "Architecture de compilateur complète.",
      "projects.compiler.desc": "Conception d'un compilateur pour Mini-Pascal : analyse lexicale (Flex), syntaxique (Bison), sémantique et génération de code intermédiaire (Quadruplets). Stack: C, Flex, Bison.",

      // 7. Agri Optimization
      "projects.p3.title": "Optimisation Agricole",
      "projects.p3.short": "IA pour l'agriculture durable.",
      "projects.p3.desc": "Système d'aide à la décision maximisant la production agricole via des algorithmes de satisfaction de contraintes (CSP).",

      // 8. Search Engine
      "projects.p5.title": "Moteur de Recherche",
      "projects.p5.short": "Indexation et recherche textuelle.",
      "projects.p5.desc": "Moteur haute performance implémentant les modèles vectoriels TF-IDF et BM25 pour une pertinence optimale.",

      // 9. NOVA
      "projects.nova.title": "NOVA",
      "projects.nova.short": "Co-watching vidéo temps réel.",
      "projects.nova.desc": "Plateforme sociale de visionnage synchronisé. Architecture événementielle assurant une latence minimale. Stack : NestJS, Next.js, Socket.IO, PostgreSQL.",

      // 10. CERICar
      "projects.cericar.title": "CERICar",
      "projects.cericar.short": "Covoiturage Full-Stack.",
      "projects.cericar.desc": "Application complète de covoiturage : moteur de recherche de trajets complexes, gestion des réservations et profils utilisateurs. Stack: PHP (Yii), PostgreSQL, AJAX.",

      // 11. G-Jobs
      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "Plateforme d'emploi intelligente.",
      "projects.p4.desc": "Une plateforme intelligente connectant les chercheurs d’emploi algériens avec les recruteurs à travers des filtres avancés, messagerie, et suivi des candidatures.",

      // 12. Restaurant
      "projects.p6.title": "Chaîne de Restaurants",
      "projects.p6.short": "Gestion multisites.",
      "projects.p6.desc": "Système de gestion d’une chaîne de restaurants multi-pays, permettant une organisation optimale des réservations, des stocks et du personnel.",

      // 13. Supermarket
      "projects.p7.title": "Mon Supermarché Numérique",
      "projects.p7.short": "Gestion stock CLI.",
      "projects.p7.desc": "Application CLI pour digitaliser la gestion d’un supermarché : fournisseurs, stock, ventes, rapports et statistiques.",

      // 14. MAP
      "projects.p8.title": "Analyse Réseau Routier",
      "projects.p8.short": "Algorithmes de graphes.",
      "projects.p8.desc": "Analyse de réseau routier à Avignon basée sur la théorie des graphes : chemins optimaux, connexité, performance réseau.",

      // LANGUAGES
      "langues.french": "Français",
      "langues.frenchlevel": "Avancé (C1)",
      "langues.frenchDetail": "Année universitaire validée en France",
      "langues.english": "Anglais",
      "langues.englishlevel": "Bilingue (C2)",
      "langues.arabic": "Arabe",
      "langues.arabicLevel": "Langue maternelle",

      // CERTIFICATES
      "certs.heading": "Certificats",
      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score : 75/100 (C2 Proficient). Certification standardisée reconnue mondialement attestant d'une maîtrise bilingue.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Programme d’échanges axé sur le leadership, l’innovation et la collaboration interculturelle.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch – DataCamp",
      "certs.pytorch.desc": "Formation en ligne sur les réseaux de neurones et l’utilisation de PyTorch.",
      "certs.fcc.title": "Responsive Web Design – freeCodeCamp",
      "certs.fcc.desc": "Certification axée sur les fondamentaux du HTML, CSS, Flexbox et design adaptatif.",
      "certs.cta": "Voir certificat",
      
      // FOOTER
      "footer.copy": "© 2026 Meftah Zineb. Tous droits réservés."
    },
    en: 
    
    "competences.project3": "Graph Algorithms (A*, Dijkstra)",
      "competences.writing": "Scientific Writing",
      "competences.writingDesc": "Technical blog publishing (Hugging Face), structured documentation.",
  {
"projects.clustering.title": "Customer Segmentation (Clustering)",
"projects.clustering.short": "Unsupervised Data Analysis.",
"projects.clustering.desc": "Customer behavior analysis using K-Means algorithm to identify distinct market segments and optimize marketing strategies. Stack: Python, Scikit-learn.",

"projects.sentiment.title": "Sentiment Analysis (Reviews)",
"projects.sentiment.short": "NLP & Text Classification.",
"projects.sentiment.desc": "Natural Language Processing (NLP) model to analyze and classify customer reviews (positive/negative) to extract product insights. Stack: Python, NLTK, BERT.",
      
      "page.title": "Portfolio - Zineb Meftah",
      "header.title": "Zineb Meftah",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      "nav.contact": "Contact", "nav.profil": "About", "nav.formation": "Education",
      "nav.publications": "Publications", "nav.projects": "Projects", "nav.competences": "Skills",
      "nav.langues": "Languages", "nav.experience": "Experience",
      "formation.heading": "Education & Certificates",
      "publications.heading": "Publications",
      "projects.heading": "Projects & Experience",
      "experience.heading": "Experience & Leadership",
      "competences.heading": "Skills",
      "langues.heading": "Languages",
      "contact.heading": "Contact",

      "profile.heading": "About Me",
      "profile.greeting": "Hi, I’m Zineb Meftah.",
      "profile.text1": "An aspiring AI Engineer passionate about Robotics and backend development. I design advanced neural architectures and robust full-stack systems to solve complex problems.",
      "profile.text2": "My expertise covers LLM Fine-tuning, Computer Vision, and building end-to-end Machine Learning pipelines.",

      // Projects
      "projects.hover": "Hover or click for technical details",
      "projects.link": "View Code",
      "projects.link.demo": "View Demo",
      "projects.link.modelRepo": "Model Repo",
      "projects.link.demoSpace": "Demo Space",
      "projects.link.githubRepo": "GitHub Repo",
      "projects.link.liveDemo": "Live Demo",
      
      "projects.p9.title": "LeRobot PushT Trainer",
      "projects.p9.short": "Robotic Policy Training.",
      "projects.p9.desc": "End-to-end pipeline for training and evaluating PushT policies. Features automated checkpointing and Hugging Face Hub integration. Stack: Python, LeRobot, Gradio, CUDA.",

      "projects.cancer.title": "Breast Cancer Detection",
      "projects.cancer.short": "Deep Learning Diagnosis.",
      "projects.cancer.desc": "Histopathology image classification system using optimized CNNs for early diagnosis with high accuracy. Stack: Python, TensorFlow/Keras, OpenCV.",

      "projects.p10.title": "Robot Vision Simulator",
      "projects.p10.short": "Interactive Vision Simulator.",
      "projects.p10.desc": "Web-based robotics simulator integrating object detection (COCO-SSD) and autonomous navigation (A*) controlled via natural language. Stack: JS, HTML5 Canvas, TF.js.",

      "projects.p0.title": "AI Website Generator",
      "projects.p0.short": "Text to Functional Website.",
      "projects.p0.desc": "Generative AI system capable of designing and deploying complete websites from simple text prompts. Stack: Python, OpenAI API, Selenium.",

      "projects.p2.title": "News Wave",
      "projects.p2.short": "Smart News Aggregator.",
      "projects.p2.desc": "Personalized news app using NLP to filter, categorize, and recommend relevant articles in real-time based on user preferences. Stack: Python, NewsAPI, NLP.",

      "projects.compiler.title": "Pascal-like Compiler",
      "projects.compiler.short": "Full Compiler Architecture.",
      "projects.compiler.desc": "Engineered a compiler for Mini-Pascal: lexical (Flex), syntactic (Bison), and semantic analysis with optimized intermediate code generation. Stack: C, Flex, Bison.",

      "projects.nova.title": "NOVA",
      "projects.nova.short": "Real-time Co-watching.",
      "projects.nova.desc": "Social platform for synchronized video viewing. Event-driven architecture ensuring minimal latency. Stack: NestJS, Next.js, Socket.IO, PostgreSQL.",

      "projects.cericar.title": "CERICar",
      "projects.cericar.short": "Full-stack Carpooling.",
      "projects.cericar.desc": "Web application featuring a journey search engine, real-time availability tracking, and user profile management. Stack: PHP (Yii), PostgreSQL, AJAX.",

      "projects.p3.title": "Agricultural Optimization",
      "projects.p3.short": "AI for Sustainable Farming.",
      "projects.p3.desc": "Decision support system maximizing agricultural yield using Constraint Satisfaction Problems (CSP) algorithms.",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "Smart Job Platform.",
      "projects.p4.desc": "A smart platform connecting Algerian job seekers with employers through advanced filters, messaging, and job tracking tools.",

      "projects.p5.title": "Search Engine",
      "projects.p5.short": "Text Indexing & Retrieval.",
      "projects.p5.desc": "High-performance search engine implementing TF-IDF and BM25 vector models for optimal relevance. Stack: Java.",

      "projects.p6.title": "Restaurant Chain",
      "projects.p6.short": "Multi-location Management.",
      "projects.p6.desc": "Management system for a multi-country restaurant chain, enabling organized booking, inventory, and staff control.",

      "projects.p7.title": "My Online Supermarket",
      "projects.p7.short": "CLI Inventory System.",
      "projects.p7.desc": "A command-line application for digitizing supermarket management: suppliers, stock, sales, reports, and statistics.",

      "projects.p8.title": "Road Network Analysis",
      "projects.p8.short": "Advanced Graph Algorithms.",
      "projects.p8.desc": "Graph-based road network analysis in Avignon using algorithms for shortest paths, connectivity, and performance.",

      // Languages
      "langues.french": "French",
      "langues.frenchlevel": "Advanced (C1)",
      "langues.frenchDetail": "Validated year in French university",
      "langues.english": "English",
      "langues.englishlevel": "Bilingual (C2)",
      "langues.arabic": "Arabic",
      "langues.arabicLevel": "Native",

      // Certs
      "certs.heading": "Certificates",
      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score: 75/100 (C2 Proficient). Globally recognized standardized certification verifying bilingual proficiency.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Exchange program focused on leadership, innovation, and cross-cultural collaboration.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch – DataCamp",
      "certs.pytorch.desc": "Online training on neural networks and using PyTorch.",
      "certs.fcc.title": "Responsive Web Design – freeCodeCamp",
      "certs.fcc.desc": "Certificate covering HTML, CSS, Flexbox, and responsive design.",
      "certs.cta": "View Certificate",

      "footer.copy": "© 2026 Zineb Meftah. All rights reserved."
    },
    ar: {
"competences.project3": "خوارزميات الرسوم البيانية (A*, Dijkstra)",
      "competences.writing": "الكتابة العلمية",
      "competences.writingDesc": "نشر المقالات التقنية (Hugging Face)، التوثيق الهيكلي.",
  
"projects.clustering.title": "تجزئة العملاء (Clustering)",
"projects.clustering.short": "تحليل بيانات غير خاضع للرقابة.",
"projects.clustering.desc": "تحليل سلوك العملاء باستخدام خوارزمية K-Means لتحديد قطاعات السوق المتميزة وتحسين استراتيجيات التسويق.",

"projects.sentiment.title": "تحليل المشاعر (المراجعات)",
"projects.sentiment.short": "معالجة اللغة الطبيعية وتصنيف النصوص.",
"projects.sentiment.desc": "نموذج معالجة اللغة الطبيعية (NLP) لتحليل وتصنيف مراجعات العملاء (إيجابية/سلبية) لاستخراج رؤى حول المنتجات.",
      
      "page.title": "المعرض - مفتاح زينب",
      "header.title": "مفتاح زينب",
      "header.subtitle": "مهندس الذكاء الاصطناعي المستقبلي | التعلم العميق | التعلم الآلي | مطور كامل الحزمة",
      "nav.contact": "اتصل", "nav.profil": "نبذة", "nav.formation": "التعليم",
      "nav.publications": "المنشورات", "nav.projects": "المشاريع", "nav.competences": "المهارات",
      "nav.langues": "اللغات", "nav.experience": "الخبرة",
      
      "profile.heading": "نبذة عني",
      "profile.greeting": "مرحبًا، أنا مفتاح زينب.",
      "profile.text1": "مهندسة طموحة شغوفة بالذكاء الاصطناعي والروبوتات. أقوم بتصميم بنى عصبية متقدمة وأنظمة شاملة لحل المشكلات المعقدة.",
      "profile.text2": "تشمل خبرتي الضبط الدقيق لنماذج اللغة الكبيرة (LLM)، والرؤية الحاسوبية، وبناء مسارات تعلم الآلة المتكاملة.",

      // Projects
      "projects.hover": "مرّر أو انقر لعرض التفاصيل",
      "projects.link": "عرض الكود",
      "projects.link.demo": "عرض العرض التوضيحي",
      "projects.link.modelRepo": "مستودع النموذج",
      "projects.link.demoSpace": "مساحة العرض",
      "projects.link.githubRepo": "مستودع GitHub",
      "projects.link.liveDemo": "عرض مباشر",

      "projects.p9.title": "مدرب LeRobot PushT",
      "projects.p9.short": "تدريب السياسات الروبوتية.",
      "projects.p9.desc": "نظام كامل لتدريب وتقييم سياسات PushT. يتميز بنقاط حفظ تلقائية والتكامل مع Hugging Face Hub. التقنيات: Python، LeRobot، Gradio، CUDA.",

      "projects.cancer.title": "كشف سرطان الثدي",
      "projects.cancer.short": "تشخيص طبي بالتعلم العميق.",
      "projects.cancer.desc": "نظام تصنيف صور الأنسجة باستخدام شبكات CNN المحسنة للتشخيص المبكر بدقة عالية. التقنيات: Python، TensorFlow/Keras، OpenCV.",

      "projects.p10.title": "محاكي رؤية الروبوت",
      "projects.p10.short": "محاكي رؤية تفاعلي.",
      "projects.p10.desc": "محاكي روبوتات قائم على الويب يدمج اكتشاف الأشياء (COCO-SSD) والملاحة المستقلة (A*) ويتم التحكم فيه بلغة طبيعية.",

      "projects.p0.title": "مولد مواقع الويب بالذكاء الاصطناعي",
      "projects.p0.short": "من نص إلى موقع ويب.",
      "projects.p0.desc": "نظام ذكاء اصطناعي توليدي قادر على تصميم ونشر مواقع ويب كاملة من مجرد وصف نصي. التقنيات: Python، OpenAI API، Selenium.",

      "projects.p2.title": "News Wave",
      "projects.p2.short": "مجمع أخبار ذكي.",
      "projects.p2.desc": "تطبيق أخبار مخصص يستخدم معالجة اللغة الطبيعية لتصفية وتصنيف وتوصية المقالات ذات الصلة في الوقت الفعلي.",

      "projects.compiler.title": "مترجم شبيه بـ Pascal",
      "projects.compiler.short": "هندسة مترجم كاملة.",
      "projects.compiler.desc": "تصميم مترجم لـ Mini-Pascal: تحليل معجمي، نحوي، ودلالي مع توليد كود وسيط محسن. التقنيات: C، Flex، Bison.",

      "projects.nova.title": "نوفا (NOVA)",
      "projects.nova.short": "مشاهدة متزامنة في الوقت الفعلي.",
      "projects.nova.desc": "منصة اجتماعية للمشاهدة المتزامنة. بنية قائمة على الأحداث لضمان أقل وقت استجابة. التقنيات: NestJS, Next.js, Socket.IO.",

      "projects.cericar.title": "سيري-كار (CERICar)",
      "projects.cericar.short": "نقل تشاركي متكامل.",
      "projects.cericar.desc": "تطبيق ويب متكامل يتضمن محرك بحث عن الرحلات، إدارة الحجوزات، وملفات المستخدمين.",

      "projects.p3.title": "تحسين الخطة الزراعية",
      "projects.p3.short": "زراعة مستدامة بالذكاء الاصطناعي.",
      "projects.p3.desc": "نظام دعم القرار لتعظيم الإنتاج الزراعي باستخدام خوارزميات إرضاء القيود (CSP).",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "منصة توظيف ذكية.",
      "projects.p4.desc": "منصة ذكية تربط الباحثين عن عمل الجزائريين بأصحاب العمل من خلال فلاتر متقدمة والمراسلة.",

      "projects.p5.title": "محرك بحث متقدم",
      "projects.p5.short": "فهرسة وبحث نصي.",
      "projects.p5.desc": "محرك بحث عالي الأداء يطبق نماذج TF-IDF و BM25 للحصول على نتائج بحث دقيقة للغاية.",

      "projects.p6.title": "سلسلة مطاعم",
      "projects.p6.short": "إدارة متعددة المواقع.",
      "projects.p6.desc": "نظام إدارة لسلسلة مطاعم متعددة البلدان، يتيح الحجز المنظم والمخزون والتحكم في الموظفين.",

      "projects.p7.title": "سوبرماركت الإنترنت",
      "projects.p7.short": "نظام إدارة CLI.",
      "projects.p7.desc": "تطبيق سطر أوامر لرقمنة إدارة السوبرماركت: الموردين، المخزون، المبيعات، التقارير والإحصائيات.",

      "projects.p8.title": "تحليل شبكة الطرق",
      "projects.p8.short": "خوارزميات الرسوم البيانية.",
      "projects.p8.desc": "تحليل شبكة الطرق القائم على الرسوم البيانية في أفينيون باستخدام خوارزميات لأقصر المسارات والاتصال والأداء.",

      // Langs
      "langues.french": "الفرنسية",
      "langues.frenchlevel": "متقدم (C1)",
      "langues.frenchDetail": "سنة جامعية مصادق عليها في فرنسا",
      "langues.english": "الإنجليزية",
      "langues.englishlevel": "ثنائي اللغة (C2)",
      "langues.arabic": "العربية",
      "langues.arabicLevel": "اللغة الأم",

      // Certs
      "certs.heading": "الشهادات",
      "certs.english.title": "شهادة EF SET للغة الإنجليزية (C2 محترف)",
      "certs.english.desc": "النتيجة: 75/100. شهادة معترف بها عالمياً تثبت الكفاءة ثنائية اللغة.",
      "certs.aylp.title": "برنامج القيادة الشبابية الجزائري - NNIC",
      "certs.aylp.desc": "برنامج تبادل يركز على القيادة والابتكار والتعاون بين الثقافات.",
      "certs.pytorch.title": "مقدمة في التعلم العميق مع PyTorch - DataCamp",
      "certs.pytorch.desc": "تدريب عبر الإنترنت حول الشبكات العصبية واستخدام PyTorch.",
      "certs.fcc.title": "شهادة تصميم الويب المتجاوب - freeCodeCamp",
      "certs.fcc.desc": "شهادة تركز على أساسيات HTML و CSS و Flexbox والتصميم المتجاوب.",
      "certs.cta": "عرض الشهادة",

      "footer.copy": "© 2026 مفتاح زينب. جميع الحقوق محفوظة."
    }
  };

  // =========================================
  // 5. Mobile Language Dropdown
  // =========================================
  const mobileLangButton = document.querySelector('.mobile-lang-button');
  const mobileLangOptions = document.querySelector('.mobile-lang-options');
  const mobileLangButtons = document.querySelectorAll('.mobile-lang-options button');
  
  if (mobileLangButton && mobileLangOptions) {
    mobileLangButton.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileLangOptions.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
      if (!mobileLangButton.contains(e.target) && !mobileLangOptions.contains(e.target)) {
        mobileLangOptions.classList.remove('active');
      }
    });
  }
  
  mobileLangButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      translatePage(selectedLang);
      
      const langNames = { fr: 'Français', en: 'English', ar: 'العربية' };
      if (mobileLangButton) {
        const currentLangSpan = mobileLangButton.querySelector('.current-lang');
        if (currentLangSpan) {
          currentLangSpan.textContent = langNames[selectedLang] || selectedLang.toUpperCase();
        }
      }
      
      if (mobileLangOptions) {
        mobileLangOptions.classList.remove('active');
      }
    });
  });

  // =========================================
  // 6. Translation Function
  // =========================================
  function translatePage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Horizontal scroll reset
    const scrollers = document.querySelectorAll('.projects-scroll');
    scrollers.forEach((el) => {
      const prevBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = 'auto';
      const applyPosition = () => {
        const max = el.scrollWidth - el.clientWidth;
        el.scrollLeft = (lang === 'ar') ? max : 0;
        el.style.scrollBehavior = prevBehavior || '';
      };
      el.scrollLeft = 0;
      requestAnimationFrame(() => { requestAnimationFrame(applyPosition); });
    });

    const dict = translations[lang] || {};
    const translatableElements = document.querySelectorAll('[data-translate]');
      
    translatableElements.forEach(el => {
      const key = el.getAttribute('data-translate');
      if (dict && dict[key] != null) {
        if (el.hasAttribute('data-translate-html')) {
          el.innerHTML = dict[key];
        } else if (el.children.length === 0 || el.classList.contains('flip-card-front') || 
                   el.classList.contains('flip-card-back') ||
                   el.classList.contains('language-card') ||
                   el.classList.contains('formation-item') ||
                   el.classList.contains('soft-skill-card') ||
                   el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'SPAN') {
          el.textContent = dict[key];
        } else if (el.querySelector('p') && !el.querySelector('a')) {
          el.textContent = dict[key];
        }
      }
    });

    // Handle nested text specifically for complex cards (Safety Check)
    document.querySelectorAll('.flip-card-front h3, .flip-card-back h3, .flip-card-front p, .flip-card-back p').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (key && dict[key]) el.textContent = dict[key];
    });

    // Update <title>
    if (dict["page.title"]) document.title = dict["page.title"];

    // Update buttons state
    document.querySelectorAll('.lang-switcher button[data-lang], .mobile-lang-options button[data-lang]').forEach(b => {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });

    // Persist
    try { localStorage.setItem('lang', lang); } catch {}
  }

  // =========================================
  // 7. Initialization
  // =========================================
  // Restore saved language or default to French
  const savedLang = (() => {
    try { return localStorage.getItem('lang'); } catch { return null; }
  })();
  translatePage(savedLang || "fr");

  const langButtons = document.querySelectorAll(".lang-switcher button");
  langButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      const selectedLang = btn.getAttribute("data-lang");
      translatePage(selectedLang);
      if (langSwitcher) langSwitcher.classList.remove("open");
    });
  });

  // =========================================
  // 8. Intersection Observers (Animations)
  // =========================================
  const sections = document.querySelectorAll(".section");
  const observerOptions = { threshold: 0.2 };
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // =========================================
  // 9. Scroll Indicator
  // =========================================
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const firstSection = document.querySelector("main section");
      if (firstSection) {
        window.scrollTo({ top: firstSection.offsetTop - 60, behavior: "smooth" });
      }
    });
  }

  // =========================================
  // 10. Theme Toggle
  // =========================================
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
    });
  }

  // =========================================
  // 11. Skill & Language Animations
  // =========================================
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  skillCards.forEach(card => skillObserver.observe(card));

  const languageCards = document.querySelectorAll('.language-card');
  const languageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  languageCards.forEach(card => languageObserver.observe(card));

  // =========================================
  // 12. Hide Nav on Scroll
  // =========================================
  let lastScrollY = window.scrollY || 0;
  const navEl = document.querySelector('nav[role="navigation"]');
  const SCROLL_DELTA = 6;          
  const MIN_SHOW_EDGE = 0;         

  function handleScroll() {
    const y = window.scrollY || 0;
    if (!navEl) return;
    if (y <= MIN_SHOW_EDGE) {
      navEl.classList.remove('nav-hidden');
    } else if (y > lastScrollY + SCROLL_DELTA) {
      navEl.classList.add('nav-hidden');
    } else if (y < lastScrollY - SCROLL_DELTA) {
      navEl.classList.remove('nav-hidden');
    }
    lastScrollY = y;
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // =========================================
  // 13. Flip Card Interactions
  // =========================================
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    // Only apply click-to-flip on touch devices or fine pointer fallback
    const shouldUseClick =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    if (shouldUseClick) {
      card.addEventListener('click', (e) => {
        // Prevent flipping if a link is clicked
        if (e.target.closest('a')) return;
        const isFlipped = card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
      });
    }

    // Keyboard support for accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isFlipped = card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
      }
    });
  });  
});
