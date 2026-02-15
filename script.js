document.addEventListener("DOMContentLoaded", () => {
  // 1. Language Switcher Logic
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

  // 2. Mobile Navigation
  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      burger.classList.toggle("toggle");
    });
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
    window.addEventListener("scroll", () => {
      if (navLinks.classList.contains("nav-active")) {
        navLinks.classList.remove("nav-active");
        burger.classList.remove("toggle");
      }
    });
  }

  // 3. Chat Widget Logic
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
    
    const buildContext = () => {
      const safeText = (sel) => document.querySelector(sel)?.innerText?.trim() || "";
      const parts = [
        safeText("#profil"),
        safeText("#projects"),
        safeText("#experience"),
        safeText("#competences"),
        safeText("#publications"),
        safeText("#formation"),
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

  // 4. Translations Data
  const translations = {
    fr: {
      "page.title": "Portfolio - Meftah Zineb",
      "header.title": "MEFTAH Zineb",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      
      // Nav
      "nav.contact": "Contact", "nav.profil": "Profil", "nav.formation": "Formation",
      "nav.publications": "Publications", "nav.projects": "Projets", "nav.competences": "Compétences",
      "nav.langues": "Langues", "nav.experience": "Expérience",
      "nav.skip": "Aller au contenu",

      // Contact info
      "info.telephone": "☎ Téléphone",
      "info.email": "✉ Email",
      "info.linkedin": "🔗 LinkedIn",
      "info.portfolio": "🌐 Portfolio",
      "info.github": "🐙 GitHub",
      "info.huggingface": "🤖 Hugging Face",

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
      "profile.text1": "Ingénieure en devenir passionnée par l'IA et la robotique. Je conçois des architectures neuronales avancées et des systèmes full-stack robustes.",
      "profile.text2": "Mon expertise couvre le Fine-tuning de LLM, la Vision par Ordinateur et le développement de pipelines ML.",

      // Dates & Buttons
      "dates.ensia": "2022 - Juin 2024",
      "dates.avignon": "Septembre 2024 - Aujourd'hui",
      "common.viewDiploma": "Voir diplôme",
      "certs.cta": "Voir certificat",
      
      // Skills Headers
      "competences.aiDataSkills": "IA & Data Science",
      "competences.techSkills": "Compétences Techniques",
      "competences.softSkillsTitle": "Compétences Personnelles",
      
      // Skill Sub-headers
      "competences.artificialIntelligence": "Intelligence Artificielle",
      "competences.dataScience": "Data Science",
      "competences.programming": "Programmation & Systèmes",
      "competences.web": "Full-Stack Web",
      "competences.aiModels": "Techniques",
      "competences.aiTools": "Frameworks & Outils",
      "competences.dataAnalysis": "Analyse & Visualisation",
      "competences.dataProjects": "Concepts Clés",
      "competences.languages": "Langages",
      "competences.tools": "DevOps & Outils",
      "competences.backend": "Backend",
      "competences.frontend": "Frontend",
      
      // Soft Skills
      "competences.writing": "Rédaction Scientifique",
      "competences.writingDesc": "Publication d'articles techniques (Hugging Face), documentation structurée.",
      "competences.teamwork": "Leadership & Teamwork",
      "competences.teamworkDesc": "Expérience GDSC, mentorat, gestion de projets agiles.",
      "competences.problemSolving": "Résolution de problèmes",
      "competences.problemSolvingDesc": "Approche algorithmique, optimisation de performance.",
      "competences.continuousLearning": "Apprentissage continu",
      "competences.continuousLearningDesc": "Veille technologique active (Papers with Code, arXiv).",

      // Skill Items
      "competences.project1": "Génération de données synthétiques",
      "competences.project2": "Clustering & Segmentation (K-Means)",
      "competences.project3": "Algorithmes de Graphes (A*, Dijkstra)",

      // Projects
      "projects.hover": "Survolez pour voir les détails",
      "projects.link.modelRepo": "Dépôt du modèle",
      "projects.link.demoSpace": "Espace de démo",
      "projects.link.viewCode": "Voir le code",
      "projects.link.githubRepo": "Dépôt GitHub",
      "projects.link.liveDemo": "Démo en ligne",

      // Project Content
      "projects.p9.title": "LeRobot PushT Trainer",
      "projects.p9.short": "Entraînement de politiques robotiques.",
      "projects.p9.desc": "Pipeline complet pour l'entraînement et l'évaluation de politiques PushT.",

      "projects.cancer.title": "Détection du Cancer du Sein",
      "projects.cancer.short": "Diagnostic médical par Deep Learning.",
      "projects.cancer.desc": "Système de classification d'images histopathologiques utilisant des CNN optimisés.",

      "projects.p10.title": "Robot Vision Simulator",
      "projects.p10.short": "Simulateur interactif de vision.",
      "projects.p10.desc": "Simulateur web de robotique intégrant la détection d'objets (COCO-SSD).",

      "projects.sentiment.title": "Analyse de Sentiments (Avis)",
      "projects.sentiment.short": "NLP & Classification de textes.",
      "projects.sentiment.desc": "Modèle NLP pour analyser et classer les avis clients (positif/négatif).",

      "projects.clustering.title": "Segmentation Client (Clustering)",
      "projects.clustering.short": "Analyse de données non supervisée.",
      "projects.clustering.desc": "Analyse comportementale des clients utilisant l'algorithme K-Means.",

      "projects.p0.title": "Générateur IA de sites web",
      "projects.p0.short": "Du texte au site web fonctionnel.",
      "projects.p0.desc": "Système d'IA générative capable de concevoir et déployer des sites web complets.",

      "projects.p2.title": "News Wave",
      "projects.p2.short": "Agrégateur d'actualités intelligent.",
      "projects.p2.desc": "Application d'actualités personnalisée utilisant le NLP pour filtrer les articles.",

      "projects.compiler.title": "Compilateur Pascal-like",
      "projects.compiler.short": "Architecture de compilateur complète.",
      "projects.compiler.desc": "Conception d'un compilateur pour Mini-Pascal : analyse lexicale, syntaxique et sémantique.",

      "projects.nova.title": "NOVA",
      "projects.nova.short": "Co-watching vidéo temps réel.",
      "projects.nova.desc": "Plateforme sociale de visionnage synchronisé.",

      "projects.cericar.title": "CERICar",
      "projects.cericar.short": "Covoiturage Full-Stack.",
      "projects.cericar.desc": "Application complète de covoiturage.",

      "projects.p3.title": "Optimisation Agricole",
      "projects.p3.short": "IA pour l'agriculture durable.",
      "projects.p3.desc": "Système d'aide à la décision maximisant la production agricole (CSP).",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "Plateforme d'emploi intelligente.",
      "projects.p4.desc": "Plateforme intelligente connectant les chercheurs d’emploi avec les recruteurs.",

      "projects.p5.title": "Moteur de Recherche",
      "projects.p5.short": "Indexation et recherche textuelle.",
      "projects.p5.desc": "Moteur haute performance implémentant TF-IDF et BM25.",

      "projects.p6.title": "Chaîne de Restaurants",
      "projects.p6.short": "Gestion multisites.",
      "projects.p6.desc": "Système de gestion d’une chaîne de restaurants multi-pays.",

      "projects.p7.title": "Mon Supermarché Numérique",
      "projects.p7.short": "Gestion stock CLI.",
      "projects.p7.desc": "Application CLI pour digitaliser la gestion d’un supermarché.",

      "projects.p8.title": "Analyse Réseau Routier",
      "projects.p8.short": "Algorithmes de graphes.",
      "projects.p8.desc": "Analyse de réseau routier à Avignon basée sur la théorie des graphes.",

      // Publications
      "pub.keywords": "Mots-clés",
      "pub.articles": "Articles",
      "publication.description": "Découvrez notre approche révolutionnaire qui utilise un fine-tuning inversé pour générer des données synthétiques.",
      "publication.cta": "Lire l'article complet",
      "publication.tableTitle": "Exemple de base de données",

      // Experience
      "experience.card1.title": "Responsable informatique",
      "experience.card1.detail": "Google Developer Student Club ENSIA (2023-2024)",
      "experience.card2.title": "Participant AYLP",
      "experience.card2.detail": "Northern Nevada International Center (2021) Algerian Youth Leadership Program",
      "experience.card3.title": "Organisation d'événements",
      "experience.card3.detail": "Hackathons, IA, Développement Web",
      "experience.card4.title": "Autres Réalisations",
      "experience.card4.item1": "Hackathon IA Avignon (24h, 2024)",
      "experience.card4.item2": "Mentor junior – GDSC (2023)",
      "experience.card4.item3": "Projet tutoré G‑JOBS (2024): tâches, Git, review",

      // Langs
      "langues.french": "Français", "langues.frenchlevel": "Avancé (C1)",
      "langues.frenchDetail": "Année universitaire validée en France",
      "langues.english": "Anglais", "langues.englishlevel": "Bilingue (C2)",
      "langues.arabic": "Arabe", "langues.arabicLevel": "Langue maternelle",

      // Chat
      "chat.title": "Assistant Portfolio",
      "chat.placeholder": "Posez une question...",
      "chat.send": "Envoyer",

      // Certs
      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score : 92/100 (C2). Certification standardisée reconnue mondialement.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Programme d’échanges axé sur le leadership.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch",
      "certs.pytorch.desc": "Formation en ligne sur les réseaux de neurones.",
      "certs.fcc.title": "Responsive Web Design – freeCodeCamp",
      "certs.fcc.desc": "Certification axée sur les fondamentaux du HTML/CSS.",

      "footer.copy": "© 2026 Meftah Zineb. Tous droits réservés."
    },
    en: {
      "page.title": "Portfolio - Zineb Meftah",
      "header.title": "Zineb Meftah",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      "nav.contact": "Contact", "nav.profil": "About", "nav.formation": "Education",
      "nav.publications": "Publications", "nav.projects": "Projects", "nav.competences": "Skills",
      "nav.langues": "Languages", "nav.experience": "Experience",
      "nav.skip": "Skip to content",

      // Contact
      "info.telephone": "☎ Phone",
      "info.email": "✉ Email",
      "info.linkedin": "🔗 LinkedIn",
      "info.portfolio": "🌐 Portfolio",
      "info.github": "🐙 GitHub",
      "info.huggingface": "🤖 Hugging Face",

      // Section Headers
      "formation.heading": "Education & Certificates",
      "publications.heading": "Publications",
      "projects.heading": "Projects & Experience",
      "experience.heading": "Experience & Leadership",
      "competences.heading": "Skills",
      "langues.heading": "Languages",
      "contact.heading": "Contact",

      // Profile
      "profile.heading": "About Me",
      "profile.greeting": "Hi, I’m Zineb Meftah.",
      "profile.text1": "An aspiring AI Engineer passionate about Robotics and backend development. I design advanced neural architectures and robust full-stack systems.",
      "profile.text2": "My expertise covers LLM Fine-tuning, Computer Vision, and building end-to-end Machine Learning pipelines.",

      // Dates & Buttons
      "dates.ensia": "2022 - June 2024",
      "dates.avignon": "Sept 2024 - Present",
      "common.viewDiploma": "View Diploma",
      "certs.cta": "View Certificate",

      // Skills Headers
      "competences.aiDataSkills": "AI & Data Science",
      "competences.techSkills": "Technical Skills",
      "competences.softSkillsTitle": "Personal Skills",

      // Skill Sub-headers
      "competences.artificialIntelligence": "Artificial Intelligence",
      "competences.dataScience": "Data Science",
      "competences.programming": "Programming & Systems",
      "competences.web": "Full-Stack Web",
      "competences.aiModels": "Techniques",
      "competences.aiTools": "Frameworks & Tools",
      "competences.dataAnalysis": "Analysis & Visualization",
      "competences.dataProjects": "Key Concepts",
      "competences.languages": "Languages",
      "competences.tools": "DevOps & Tools",
      "competences.backend": "Backend",
      "competences.frontend": "Frontend",

      // Soft Skills
      "competences.writing": "Scientific Writing",
      "competences.writingDesc": "Technical blog publishing (Hugging Face), structured documentation.",
      "competences.teamwork": "Leadership & Teamwork",
      "competences.teamworkDesc": "GDSC experience, mentoring, agile project management.",
      "competences.problemSolving": "Problem Solving",
      "competences.problemSolvingDesc": "Algorithmic thinking, performance optimization.",
      "competences.continuousLearning": "Continuous Learning",
      "competences.continuousLearningDesc": "Active tech watch (Papers with Code, arXiv).",

      // Skill Items
      "competences.project1": "Synthetic Data Generation",
      "competences.project2": "Clustering & Segmentation (K-Means)",
      "competences.project3": "Graph Algorithms (A*, Dijkstra)",

      // Projects
      "projects.hover": "Hover or click for technical details",
      "projects.link.modelRepo": "Model Repo",
      "projects.link.demoSpace": "Demo Space",
      "projects.link.viewCode": "View Code",
      "projects.link.githubRepo": "GitHub Repo",
      "projects.link.liveDemo": "Live Demo",

      "projects.p9.title": "LeRobot PushT Trainer",
      "projects.p9.short": "Robotic Policy Training.",
      "projects.p9.desc": "End-to-end pipeline for training and evaluating PushT policies.",

      "projects.cancer.title": "Breast Cancer Detection",
      "projects.cancer.short": "Deep Learning Diagnosis.",
      "projects.cancer.desc": "Histopathology image classification system using optimized CNNs.",

      "projects.p10.title": "Robot Vision Simulator",
      "projects.p10.short": "Interactive Vision Simulator.",
      "projects.p10.desc": "Web-based robotics simulator integrating object detection (COCO-SSD).",

      "projects.sentiment.title": "Sentiment Analysis (Reviews)",
      "projects.sentiment.short": "NLP & Text Classification.",
      "projects.sentiment.desc": "NLP model to analyze and classify customer reviews (positive/negative).",

      "projects.clustering.title": "Customer Segmentation (Clustering)",
      "projects.clustering.short": "Unsupervised Data Analysis.",
      "projects.clustering.desc": "Customer behavior analysis using K-Means algorithm.",

      "projects.p0.title": "AI Website Generator",
      "projects.p0.short": "Text to Functional Website.",
      "projects.p0.desc": "Generative AI system capable of designing and deploying complete websites.",

      "projects.p2.title": "News Wave",
      "projects.p2.short": "Smart News Aggregator.",
      "projects.p2.desc": "Personalized news app using NLP to filter relevant articles.",

      "projects.compiler.title": "Pascal-like Compiler",
      "projects.compiler.short": "Full Compiler Architecture.",
      "projects.compiler.desc": "Engineered a compiler for Mini-Pascal: lexical, syntactic, and semantic analysis.",

      "projects.nova.title": "NOVA",
      "projects.nova.short": "Real-time Co-watching.",
      "projects.nova.desc": "Social platform for synchronized video viewing. Event-driven architecture.",

      "projects.cericar.title": "CERICar",
      "projects.cericar.short": "Full-stack Carpooling.",
      "projects.cericar.desc": "Web application featuring a journey search engine and profile management.",

      "projects.p3.title": "Agricultural Optimization",
      "projects.p3.short": "AI for Sustainable Farming.",
      "projects.p3.desc": "Decision support system maximizing agricultural yield using CSP algorithms.",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "Smart Job Platform.",
      "projects.p4.desc": "A smart platform connecting Algerian job seekers with employers.",

      "projects.p5.title": "Search Engine",
      "projects.p5.short": "Text Indexing & Retrieval.",
      "projects.p5.desc": "High-performance search engine implementing TF-IDF and BM25.",

      "projects.p6.title": "Restaurant Chain",
      "projects.p6.short": "Multi-location Management.",
      "projects.p6.desc": "Management system for a multi-country restaurant chain.",

      "projects.p7.title": "My Online Supermarket",
      "projects.p7.short": "CLI Inventory System.",
      "projects.p7.desc": "A command-line application for digitizing supermarket management.",

      "projects.p8.title": "Road Network Analysis",
      "projects.p8.short": "Advanced Graph Algorithms.",
      "projects.p8.desc": "Graph-based road network analysis in Avignon using algorithms for shortest paths.",

      // Publications
      "pub.keywords": "Keywords",
      "pub.articles": "Articles",
      "publication.description": "Discover our revolutionary approach using reverse fine-tuning to generate synthetic data.",
      "publication.cta": "Read Full Article",
      "publication.tableTitle": "Sample Database",

      // Experience
      "experience.card1.title": "IT Manager",
      "experience.card1.detail": "Google Developer Student Club ENSIA (2023-2024)",
      "experience.card2.title": "AYLP Participant",
      "experience.card2.detail": "Northern Nevada International Center (2021) Algerian Youth Leadership Program",
      "experience.card3.title": "Event Organizer",
      "experience.card3.detail": "Hackathons, AI, Web Development",
      "experience.card4.title": "Other Achievements",
      "experience.card4.item1": "AI Hackathon Avignon (24h, 2024)",
      "experience.card4.item2": "Junior Mentor – GDSC (2023)",
      "experience.card4.item3": "Supervised Project G‑JOBS (2024): tasks, Git, review",

      // Chat
      "chat.title": "Portfolio Assistant",
      "chat.placeholder": "Ask a question...",
      "chat.send": "Send",

      "langues.french": "French", "langues.frenchlevel": "Advanced (C1)",
      "langues.frenchDetail": "Validated year in French university",
      "langues.english": "English", "langues.englishlevel": "Bilingual (C2)",
      "langues.arabic": "Arabic", "langues.arabicLevel": "Native",

      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score: 92/100 (C2). Globally recognized standardized certification.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Exchange program focused on leadership and innovation.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch",
      "certs.pytorch.desc": "Online training on neural networks and PyTorch.",
      "certs.fcc.title": "Responsive Web Design – freeCodeCamp",
      "certs.fcc.desc": "Certificate covering HTML, CSS, Flexbox.",
      "footer.copy": "© 2026 Zineb Meftah. All rights reserved."
    },
    ar: {
      "page.title": "المعرض - مفتاح زينب",
      "header.title": "مفتاح زينب",
      "header.subtitle": "مهندس الذكاء الاصطناعي المستقبلي | التعلم العميق | التعلم الآلي | مطور كامل الحزمة",
      "nav.contact": "اتصل", "nav.profil": "نبذة", "nav.formation": "التعليم",
      "nav.publications": "المنشورات", "nav.projects": "المشاريع", "nav.competences": "المهارات",
      "nav.langues": "اللغات", "nav.experience": "الخبرة",
      "nav.skip": "تخطي إلى المحتوى",

      // Contact
      "info.telephone": "☎ الهاتف",
      "info.email": "✉ البريد",
      "info.linkedin": "🔗 لينكد إن",
      "info.portfolio": "🌐 المعرض",
      "info.github": "🐙 جيتهاب",
      "info.huggingface": "🤖 هاجينغ فايس",

      // Section Headers
      "formation.heading": "التعليم والشهادات",
      "publications.heading": "المنشورات",
      "projects.heading": "المشاريع والخبرة",
      "experience.heading": "الخبرة والقيادة",
      "competences.heading": "المهارات",
      "langues.heading": "اللغات",
      "contact.heading": "اتصل",

      // Profile
      "profile.heading": "نبذة عني",
      "profile.greeting": "مرحبًا، أنا مفتاح زينب.",
      "profile.text1": "مهندسة طموحة شغوفة بالذكاء الاصطناعي والروبوتات. أقوم بتصميم بنى عصبية متقدمة وأنظمة شاملة.",
      "profile.text2": "تشمل خبرتي الضبط الدقيق لنماذج اللغة الكبيرة (LLM)، والرؤية الحاسوبية.",

      // Dates & Buttons
      "dates.ensia": "2022 - يونيو 2024",
      "dates.avignon": "سبتمبر 2024 - الحاضر",
      "common.viewDiploma": "عرض الشهادة",
      "certs.cta": "عرض الشهادة",

      // Skills Headers
      "competences.aiDataSkills": "الذكاء الاصطناعي وعلوم البيانات",
      "competences.techSkills": "المهارات التقنية",
      "competences.softSkillsTitle": "المهارات الشخصية",

      // Skill Sub-headers
      "competences.artificialIntelligence": "الذكاء الاصطناعي",
      "competences.dataScience": "علوم البيانات",
      "competences.programming": "البرمجة والأنظمة",
      "competences.web": "تطوير الويب الشامل",
      "competences.aiModels": "التقنيات",
      "competences.aiTools": "الأطر والأدوات",
      "competences.dataAnalysis": "التحليل والتصور",
      "competences.dataProjects": "المفاهيم الرئيسية",
      "competences.languages": "لغات البرمجة",
      "competences.tools": "أدوات التطوير",
      "competences.backend": "الخلفية",
      "competences.frontend": "الواجهة الأمامية",

      // Soft Skills
      "competences.writing": "الكتابة العلمية",
      "competences.writingDesc": "نشر المقالات التقنية (Hugging Face)، التوثيق الهيكلي.",
      "competences.teamwork": "القيادة والعمل الجماعي",
      "competences.teamworkDesc": "خبرة GDSC، الإرشاد، إدارة المشاريع المرنة.",
      "competences.problemSolving": "حل المشكلات",
      "competences.problemSolvingDesc": "التفكير الخوارزمي، تحسين الأداء.",
      "competences.continuousLearning": "التعلم المستمر",
      "competences.continuousLearningDesc": "متابعة تقنية نشطة (الأوراق البحثية، arXiv).",

      // Skill Items
      "competences.project1": "توليد البيانات الاصطناعية",
      "competences.project2": "التجميع والتجزئة (K-Means)",
      "competences.project3": "خوارزميات الرسوم البيانية (A*, Dijkstra)",

      // Projects
      "projects.hover": "مرّر أو انقر لعرض التفاصيل",
      "projects.link.modelRepo": "مستودع النموذج",
      "projects.link.demoSpace": "مساحة العرض",
      "projects.link.viewCode": "عرض الكود",
      "projects.link.githubRepo": "مستودع GitHub",
      "projects.link.liveDemo": "عرض مباشر",

      "projects.p9.title": "مدرب LeRobot PushT",
      "projects.p9.short": "تدريب السياسات الروبوتية.",
      "projects.p9.desc": "نظام كامل لتدريب وتقييم سياسات PushT.",

      "projects.cancer.title": "كشف سرطان الثدي",
      "projects.cancer.short": "تشخيص طبي بالتعلم العميق.",
      "projects.cancer.desc": "نظام تصنيف صور الأنسجة باستخدام شبكات CNN المحسنة.",

      "projects.p10.title": "محاكي رؤية الروبوت",
      "projects.p10.short": "محاكي رؤية تفاعلي.",
      "projects.p10.desc": "محاكي روبوتات قائم على الويب يدمج اكتشاف الأشياء.",

      "projects.sentiment.title": "تحليل المشاعر (المراجعات)",
      "projects.sentiment.short": "معالجة اللغة الطبيعية وتصنيف النصوص.",
      "projects.sentiment.desc": "نموذج NLP لتحليل وتصنيف مراجعات العملاء.",

      "projects.clustering.title": "تجزئة العملاء (Clustering)",
      "projects.clustering.short": "تحليل بيانات غير خاضع للرقابة.",
      "projects.clustering.desc": "تحليل سلوك العملاء باستخدام خوارزمية K-Means.",

      "projects.p0.title": "مولد مواقع الويب بالذكاء الاصطناعي",
      "projects.p0.short": "من نص إلى موقع ويب.",
      "projects.p0.desc": "نظام ذكاء اصطناعي توليدي قادر على تصميم ونشر مواقع ويب كاملة.",

      "projects.p2.title": "News Wave",
      "projects.p2.short": "مجمع أخبار ذكي.",
      "projects.p2.desc": "تطبيق أخبار مخصص يستخدم معالجة اللغة الطبيعية.",

      "projects.compiler.title": "مترجم شبيه بـ Pascal",
      "projects.compiler.short": "هندسة مترجم كاملة.",
      "projects.compiler.desc": "تصميم مترجم لـ Mini-Pascal: تحليل معجمي، نحوي، ودلالي.",

      "projects.nova.title": "نوفا (NOVA)",
      "projects.nova.short": "مشاهدة متزامنة.",
      "projects.nova.desc": "منصة اجتماعية للمشاهدة المتزامنة.",

      "projects.cericar.title": "سيري-كار (CERICar)",
      "projects.cericar.short": "نقل تشاركي متكامل.",
      "projects.cericar.desc": "تطبيق ويب متكامل يتضمن محرك بحث عن الرحلات.",

      "projects.p3.title": "تحسين الخطة الزراعية",
      "projects.p3.short": "زراعة مستدامة بالذكاء الاصطناعي.",
      "projects.p3.desc": "نظام دعم القرار لتعظيم الإنتاج الزراعي باستخدام CSP.",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "منصة توظيف ذكية.",
      "projects.p4.desc": "منصة ذكية تربط الباحثين عن عمل الجزائريين بأصحاب العمل.",

      "projects.p5.title": "محرك بحث متقدم",
      "projects.p5.short": "فهرسة وبحث نصي.",
      "projects.p5.desc": "محرك بحث عالي الأداء يطبق نماذج TF-IDF و BM25.",

      "projects.p6.title": "سلسلة مطاعم",
      "projects.p6.short": "إدارة متعددة المواقع.",
      "projects.p6.desc": "نظام إدارة لسلسلة مطاعم متعددة البلدان.",

      "projects.p7.title": "سوبرماركت الإنترنت",
      "projects.p7.short": "نظام إدارة CLI.",
      "projects.p7.desc": "تطبيق سطر أوامر لرقمنة إدارة السوبرماركت.",

      "projects.p8.title": "تحليل شبكة الطرق",
      "projects.p8.short": "خوارزميات الرسوم البيانية.",
      "projects.p8.desc": "تحليل شبكة الطرق القائم على الرسوم البيانية في أفينيون.",

      // Publications
      "pub.keywords": "الكلمات المفتاحية",
      "pub.articles": "المقالات",
      "publication.description": "اكتشف نهجنا الثوري الذي يستخدم الضبط العكسي لتوليد بيانات تركيبية.",
      "publication.cta": "اقرأ المقال الكامل",
      "publication.tableTitle": "عينة قاعدة البيانات",

      // Experience
      "experience.card1.title": "مسؤولة تقنية المعلومات",
      "experience.card1.detail": "نادي مطوري Google – ENSIA (2023–2024)",
      "experience.card2.title": "مشاركة في AYLP",
      "experience.card2.detail": "المركز الدولي لشمال نيفادا (2021) – برنامج القيادة للشباب الجزائري",
      "experience.card3.title": "منظِّمة فعاليات",
      "experience.card3.detail": "هاكاثونات، ذكاء اصطناعي، تطوير الويب",
      "experience.card4.title": "إنجازات أخرى",
      "experience.card4.item1": "هاكاثون الذكاء الاصطناعي أفينيون (24 ساعة، 2024)",
      "experience.card4.item2": "مرشدة مبتدئة – GDSC (2023)",
      "experience.card4.item3": "مشروع مؤطر G‑JOBS (2024): المهام، Git، المراجعة",

      // Chat
      "chat.title": "مساعد المعرض",
      "chat.placeholder": "اطرح سؤالاً...",
      "chat.send": "إرسال",

      "langues.french": "الفرنسية", "langues.frenchlevel": "متقدم (C1)",
      "langues.frenchDetail": "سنة جامعية مصادق عليها في فرنسا",
      "langues.english": "الإنجليزية", "langues.englishlevel": "ثنائي اللغة (C2)",
      "langues.arabic": "العربية", "langues.arabicLevel": "اللغة الأم",
      "certs.heading": "الشهادات",
      "certs.english.title": "شهادة EF SET للغة الإنجليزية (C2 محترف)",
      "certs.english.desc": "النتيجة: 92/100. شهادة معترف بها عالمياً.",
      "certs.aylp.title": "برنامج القيادة الشبابية الجزائري - NNIC",
      "certs.aylp.desc": "برنامج تبادل يركز على القيادة والابتكار.",
      "certs.pytorch.title": "مقدمة في التعلم العميق مع PyTorch",
      "certs.pytorch.desc": "تدريب عبر الإنترنت حول الشبكات العصبية.",
      "certs.fcc.title": "شهادة تصميم الويب المتجاوب",
      "certs.fcc.desc": "شهادة تركز على أساسيات HTML و CSS.",
      "footer.copy": "© 2026 مفتاح زينب. جميع الحقوق محفوظة."
    }
  };

  // 5. Mobile Language Dropdown
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

  // 6. Translation Function
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
                   el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'SPAN' || el.classList.contains('chatbox-title')) {
          el.textContent = dict[key];
        } else if (el.querySelector('p') && !el.querySelector('a')) {
          el.textContent = dict[key];
        } else if (el.tagName === 'BUTTON' || el.tagName === 'A') {
          el.textContent = dict[key];
        } else if (el.tagName === 'TH') {
          el.textContent = dict[key];
        } else if (el.tagName === 'P') {
          el.textContent = dict[key];
        } else if (el.tagName === 'LI') { // Added list items for experience details
          el.textContent = dict[key];
        }
      }
    });

    // Handle placeholder for chat input
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      if (dict && dict[key]) {
        el.setAttribute('placeholder', dict[key]);
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

  // 7. Initialization
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

  // 8. Intersection Observers (Animations)
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

  // 9. Scroll Indicator
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const firstSection = document.querySelector("main section");
      if (firstSection) {
        window.scrollTo({ top: firstSection.offsetTop - 60, behavior: "smooth" });
      }
    });
  }

  // 10. Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
    });
  }

  // 11. Skill & Language Animations
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

  // 12. Hide Nav on Scroll
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

  // 13. Flip Card Interactions
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    const shouldUseClick =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    if (shouldUseClick) {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const isFlipped = card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
      });
    }

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isFlipped = card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
      }
    });
  });  
});
