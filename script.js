document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Language Switcher Logic (Desktop) ---
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

  // --- 2. Mobile Navigation (Burger Menu) ---
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

  // --- 3. Chat Widget Logic ---
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
    
    // Builds context from page content for the AI
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

  // --- 4. Translations Data ---
  const translations = {
    fr: {
      "page.title": "Portfolio - Meftah Zineb",
      "nav.title": "Meftah Zineb",
      "header.title": "MEFTAH Zineb",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      "nav.contact": "Contact", "nav.profil": "Profil", "nav.formation": "Formation",
      "nav.publications": "Publications", "nav.projects": "Projets", "nav.competences": "Compétences",
      "nav.langues": "Langues", "nav.experience": "Expérience",
      
      // Certificate - English Specifics (Updated)
      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score : 75/100 (C2 Proficient). Certification standardisée reconnue mondialement attestant d'une maîtrise bilingue.",
      "certs.cta": "Voir certificat",

      // Languages - C2 Update
      "langues.englishlevel": "Bilingue (C2)",
      "langues.frenchlevel": "Intermédiaire (B2)",
      "langues.arabicLevel": "Langue maternelle",

      // New Compiler Project
      "projects.compiler.title": "Compilateur Pascal-like",
      "projects.compiler.short": "Compilateur complet (Lexique, Syntaxe, Sémantique).",
      "projects.compiler.desc": "Développement d'un compilateur pour un sous-ensemble du langage Pascal (Mini-Pascal). Implémentation des analyses lexicale, syntaxique et sémantique, gestion des tables de symboles et génération de quadruplets. Stack: C, Flex, Bison.",

      // Existing Projects
      "projects.p9.title": "LeRobot PushT Trainer",
      "projects.p9.short": "Entraînez/évaluez des politiques PushT.",
      "projects.p9.desc": "App web pour entraîner et évaluer des politiques PushT. Gère checkpoints et publication sur Hugging Face. Stack: Python, LeRobot, Gradio, CUDA.",
      
      "projects.p10.title": "Robot Vision Simulator",
      "projects.p10.short": "Simulateur interactif de vision robotique.",
      "projects.p10.desc": "Simulateur navigateur: robot sur grille, pick/place et commandes en langue naturelle. COCO‑SSD pour la vision, A* pour le pathfinding. Stack: JS/Canvas, TF.js.",

      "projects.p0.title": "Générateur IA de sites web",
      "projects.p0.short": "Générez des sites web depuis une consigne.",
      "projects.p0.desc": "Création d’un système générant des sites web fonctionnels à partir d’instructions en langage naturel grâce à des modèles LLM. Stack : Python, OpenAI API, Automatisation web.",

      "projects.nova.title": "NOVA",
      "projects.nova.short": "Visionnage vidéo synchronisé.",
      "projects.nova.desc": "Plateforme collaborative (type Watch2Gether) avec synchronisation temps réel des lecteurs vidéo et chatbox. Développement du backend NestJS et gestion des WebSockets.",

      "projects.cericar.title": "CERICar",
      "projects.cericar.short": "Covoiturage Full-Stack.",
      "projects.cericar.desc": "Application complète de covoiturage : moteur de recherche de trajets complexes, gestion des réservations et profils utilisateurs. Stack: PHP (Yii), PostgreSQL, AJAX.",

      "projects.p3.title": "Optimisation Agricole",
      "projects.p3.short": "Agriculture durable avec IA.",
      "projects.p3.desc": "Projet IA d’optimisation de la production agricole en Algérie en utilisant des algorithmes de recherche sur graphes et de satisfaction de contraintes.",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "Plateforme d'emploi intelligente.",
      "projects.p4.desc": "Une plateforme intelligente connectant les chercheurs d’emploi algériens avec les recruteurs à travers des filtres avancés, messagerie, et suivi des candidatures.",

      "projects.p5.title": "Moteur de Recherche Avancé",
      "projects.p5.short": "Recherche documentaire (TF-IDF/BM25).",
      "projects.p5.desc": "Moteur de recherche Java basé sur TF-IDF et BM25 pour indexer, analyser et trier efficacement des documents textuels avec précision.",

      "projects.p6.title": "Chaîne de Restaurants",
      "projects.p6.short": "Gestion multisites.",
      "projects.p6.desc": "Système de gestion d’une chaîne de restaurants multi-pays, permettant une organisation optimale des réservations, des stocks et du personnel.",

      "projects.p7.title": "Mon Supermarché Numérique",
      "projects.p7.short": "Gestion stock CLI.",
      "projects.p7.desc": "Application CLI pour digitaliser la gestion d’un supermarché : fournisseurs, stock, ventes, rapports et statistiques.",

      "projects.p8.title": "Analyse Réseau Routier",
      "projects.p8.short": "Algorithmes de graphes.",
      "projects.p8.desc": "Analyse de réseau routier à Avignon basée sur la théorie des graphes : chemins optimaux, connexité, performance réseau.",

      "experience.heading": "Expérience & Leadership",
      "competences.heading": "Compétences",
      "footer.copy": "© 2026 Meftah Zineb. Tous droits réservés.",
      
      // Section headers & static text
      "profile.heading": "À Propos de Moi",
      "profile.greeting": "Bonjour, je suis Meftah Zineb.",
      "profile.text1": "Étudiante en Informatique passionnée par l’IA appliquée à la robotique et le développement backend, je conçois des systèmes intelligents combinant LLM, deep learning et automatisation web.",
      "profile.text2": "Mes projets mettent en œuvre des modèles OpenAI, des simulateurs interactifs, et des solutions complètes de bout-en-bout.",
      "formation.heading": "Formation & Certifications",
      "publications.heading": "Publications",
      "projects.heading": "Projets et Expériences",
      "langues.heading": "Langues",
      "contact.heading": "Contact",
      "projects.link": "Voir le code sur GitHub",
      "projects.link.demo": "Voir la démo",
      "projects.link.modelRepo": "Dépôt modèle",
      "projects.link.demoSpace": "Espace Démo",
      "projects.link.githubRepo": "Dépôt GitHub",
      "projects.link.liveDemo": "Démo Live"
    },
    en: {
      "page.title": "Portfolio - Zineb Meftah",
      "header.title": "Zineb Meftah",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      "nav.contact": "Contact", "nav.profil": "About", "nav.formation": "Education",
      "nav.publications": "Publications", "nav.projects": "Projects", "nav.competences": "Skills",
      "nav.langues": "Languages", "nav.experience": "Experience",
      
      // Certificate - English Specifics
      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score: 75/100 (C2 Proficient). Globally recognized standardized certification verifying bilingual proficiency.",
      "certs.cta": "View Certificate",

      // Languages - C2 Update
      "langues.englishlevel": "Bilingual (C2)",
      "langues.frenchlevel": "Intermediate (B2)",
      "langues.arabicLevel": "Native",

      // New Compiler Project
      "projects.compiler.title": "Pascal-like Compiler",
      "projects.compiler.short": "Full compiler (Lexical, Syntax, Semantic).",
      "projects.compiler.desc": "Developed a compiler for a subset of Pascal (Mini-Pascal). Implemented lexical, syntactic, and semantic analysis, symbol table management, and quadruplet generation. Stack: C, Flex, Bison.",

      // Projects
      "projects.p9.title": "LeRobot PushT Trainer",
      "projects.p9.short": "Train/evaluate PushT policies.",
      "projects.p9.desc": "Web app to train/evaluate PushT policies. Supports checkpoints and push to Hugging Face. Stack: Python, LeRobot, Gradio, CUDA.",

      "projects.p10.title": "Robot Vision Simulator",
      "projects.p10.short": "Interactive robot vision simulator.",
      "projects.p10.desc": "Browser simulator: grid nav, pick/place, natural‑language commands. COCO‑SSD vision, A* pathfinding. Stack: JS/Canvas, TF.js.",
      
      "projects.p0.title": "AI Website Generator",
      "projects.p0.short": "Generate websites from a prompt.",
      "projects.p0.desc": "Builds functional websites from natural language instructions using LLMs. Stack: Python, OpenAI API, Web automation.",

      "projects.nova.title": "NOVA",
      "projects.nova.short": "Real-time synchronized video.",
      "projects.nova.desc": "Collaborative platform for watching YouTube videos together. Developed the NestJS backend with Socket.IO for player synchronization. Stack: Next.js, NestJS, Socket.IO.",

      "projects.cericar.title": "CERICar",
      "projects.cericar.short": "Full-stack carpooling.",
      "projects.cericar.desc": "Web application featuring a journey search engine, real-time availability tracking, and user profile management. Stack: PHP (Yii), PostgreSQL, AJAX.",

      "projects.p3.title": "Agricultural Plan Optimization",
      "projects.p3.short": "AI-based sustainable agriculture.",
      "projects.p3.desc": "AI project to optimize agricultural production in Algeria using graph search and constraint satisfaction algorithms.",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "Smart job platform.",
      "projects.p4.desc": "A smart platform connecting Algerian job seekers with employers through advanced filters, messaging, and job tracking tools.",

      "projects.p5.title": "Advanced Search Engine",
      "projects.p5.short": "Text search (TF-IDF/BM25).",
      "projects.p5.desc": "Java-based search engine using TF-IDF and BM25 to index, analyze, and accurately rank text documents.",

      "projects.p6.title": "Restaurant Chain",
      "projects.p6.short": "Multi-location management.",
      "projects.p6.desc": "Management system for a multi-country restaurant chain, enabling organized booking, inventory, and staff control.",

      "projects.p7.title": "My Online Supermarket",
      "projects.p7.short": "CLI Inventory System.",
      "projects.p7.desc": "A command-line application for digitizing supermarket management: suppliers, stock, sales, reports, and statistics.",

      "projects.p8.title": "Road Network Analysis",
      "projects.p8.short": "Advanced graph algorithms.",
      "projects.p8.desc": "Graph-based road network analysis in Avignon using algorithms for shortest paths, connectivity, and performance.",

      "experience.heading": "Experience & Leadership",
      "competences.heading": "Skills",
      "footer.copy": "© 2026 Zineb Meftah. All rights reserved.",
      "profile.heading": "About Me",
      "profile.greeting": "Hi, I’m Zineb Meftah.",
      "profile.text1": "A computer science student passionate about AI applied to robotics and backend development, I design intelligent systems combining LLM, deep learning and web automation.",
      "profile.text2": "My projects implement OpenAI models, interactive simulators, and complete end-to-end solutions.",
      "formation.heading": "Education & Certificates",
      "publications.heading": "Publications",
      "projects.heading": "Projects & Experience",
      "langues.heading": "Languages",
      "contact.heading": "Contact",
      "projects.link": "View Code on GitHub",
      "projects.link.demo": "View Demo",
      "projects.link.modelRepo": "Model Repo",
      "projects.link.demoSpace": "Demo Space",
      "projects.link.githubRepo": "GitHub Repo",
      "projects.link.liveDemo": "Live Demo"
    },
    ar: {
      "page.title": "المعرض - مفتاح زينب",
      "header.title": "مفتاح زينب",
      "header.subtitle": "مهندس الذكاء الاصطناعي المستقبلي | التعلم العميق | التعلم الآلي | مطور كامل الحزمة",
      "nav.contact": "اتصل", "nav.profil": "نبذة", "nav.formation": "التعليم",
      "nav.publications": "المنشورات", "nav.projects": "المشاريع", "nav.competences": "المهارات",
      "nav.langues": "اللغات", "nav.experience": "الخبرة",

      // Certificate - English Specifics
      "certs.english.title": "شهادة EF SET للغة الإنجليزية (C2 محترف)",
      "certs.english.desc": "النتيجة: 75/100 (C2 محترف). شهادة موحدة معترف بها عالمياً تثبت الكفاءة ثنائية اللغة.",
      "certs.cta": "عرض الشهادة",

      // Languages - C2 Update
      "langues.englishlevel": "ثنائي اللغة (C2)",
      "langues.frenchlevel": "متوسط (B2)",
      "langues.arabicLevel": "اللغة الأم",

      // New Compiler Project
      "projects.compiler.title": "مترجم شبيه بـ Pascal",
      "projects.compiler.short": "مترجم كامل (لفظي، نحوي، دلالي).",
      "projects.compiler.desc": "تطوير مترجم لمجموعة فرعية من لغة Pascal (Mini-Pascal). تنفيذ التحليل اللفظي والنحوي والدلالي، وإدارة جدول الرموز، وتوليد الكود الرباعي. التقنيات: C، Flex، Bison.",

      "projects.p9.title": "مدرب LeRobot PushT",
      "projects.p9.short": "تدريب/تقييم سياسات PushT.",
      "projects.p9.desc": "تطبيق ويب لتدريب وتقييم سياسات PushT. يدعم نقاط التفتيش والنشر على Hugging Face. التقنيات: Python، LeRobot، Gradio، CUDA.",

      "projects.p10.title": "محاكي رؤية الروبوت",
      "projects.p10.short": "محاكي تفاعلي لرؤية الروبوت.",
      "projects.p10.desc": "محاكي متصفح: تنقل على شبكة، التقاط/وضع والأوامر بلغة طبيعية. رؤية COCO‑SSD، خوارزمية A* للمسار. التقنيات: JS/Canvas، TF.js.",

      "projects.p0.title": "مولد مواقع الويب بالذكاء الاصطناعي",
      "projects.p0.short": "إنشاء مواقع ويب من توجيهات نصية.",
      "projects.p0.desc": "إنشاء نظام يولد مواقع ويب فعالة من تعليمات بلغة طبيعية باستخدام نماذج LLM. التقنيات: Python، OpenAI API، أتمتة الويب.",

      "projects.nova.title": "نوفا (NOVA)",
      "projects.nova.short": "مشاهدة متزامنة.",
      "projects.nova.desc": "منصة تعاونية لمشاهدة فيديوهات يوتيوب معاً. قمت بتطوير الواجهة الخلفية باستخدام NestJS وSocket.IO.",

      "projects.cericar.title": "سيري-كار (CERICar)",
      "projects.cericar.short": "نقل تشاركي متكامل.",
      "projects.cericar.desc": "تطبيق ويب متكامل يتضمن محرك بحث عن الرحلات، إدارة الحجوزات، وملفات المستخدمين. التقنيات: PHP (Yii), PostgreSQL, AJAX.",

      "projects.p3.title": "تحسين الخطة الزراعية",
      "projects.p3.short": "زراعة مستدامة بالذكاء الاصطناعي.",
      "projects.p3.desc": "مشروع ذكاء اصطناعي لتحسين الإنتاج الزراعي في الجزائر باستخدام خوارزميات البحث في الرسوم البيانية وإرضاء القيود.",

      "projects.p4.title": "G-Jobs",
      "projects.p4.short": "منصة توظيف ذكية.",
      "projects.p4.desc": "منصة ذكية تربط الباحثين عن عمل الجزائريين بأصحاب العمل من خلال فلاتر متقدمة والمراسلة.",

      "projects.p5.title": "محرك بحث متقدم",
      "projects.p5.short": "بحث نصي (TF-IDF/BM25).",
      "projects.p5.desc": "محرك بحث قائم على Java يستخدم TF-IDF و BM25 لفهرسة وتحليل وترتيب المستندات النصية بدقة.",

      "projects.p6.title": "سلسلة مطاعم",
      "projects.p6.short": "إدارة متعددة المواقع.",
      "projects.p6.desc": "نظام إدارة لسلسلة مطاعم متعددة البلدان، يتيح الحجز المنظم والمخزون والتحكم في الموظفين.",

      "projects.p7.title": "سوبرماركت الإنترنت",
      "projects.p7.short": "نظام إدارة CLI.",
      "projects.p7.desc": "تطبيق سطر أوامر لرقمنة إدارة السوبرماركت: الموردين، المخزون، المبيعات، التقارير والإحصائيات.",

      "projects.p8.title": "تحليل شبكة الطرق",
      "projects.p8.short": "خوارزميات الرسوم البيانية.",
      "projects.p8.desc": "تحليل شبكة الطرق القائم على الرسوم البيانية في أفينيون باستخدام خوارزميات لأقصر المسارات والاتصال والأداء.",

      "experience.heading": "الخبرة والقيادة",
      "competences.heading": "المهارات",
      "footer.copy": "© 2026 مفتاح زينب. جميع الحقوق محفوظة.",
      "profile.heading": "نبذة عني",
      "profile.greeting": "مرحبًا، أنا مفتاح زينب.",
      "profile.text1": "طالبة علوم الحاسوب شغوفة بالذكاء الاصطناعي المطبق على الروبوتات وتطوير الخدمات الخلفية، أقوم بتصميم أنظمة ذكية.",
      "profile.text2": "تنفذ مشاريعي نماذج OpenAI، ومحاكيات تفاعلية، وحلول شاملة.",
      "formation.heading": "التعليم والشهادات",
      "publications.heading": "المنشورات",
      "projects.heading": "المشاريع والخبرة",
      "langues.heading": "اللغات",
      "contact.heading": "الاتصال",
      "projects.link": "عرض الكود",
      "projects.link.demo": "عرض العرض التوضيحي",
      "projects.link.modelRepo": "مستودع النموذج",
      "projects.link.demoSpace": "مساحة العرض",
      "projects.link.githubRepo": "مستودع GitHub",
      "projects.link.liveDemo": "عرض مباشر"
    }
  };

  // --- 5. Mobile Language Dropdown ---
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

  // --- 6. Translation Function ---
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
                   el.tagName === 'H3' || el.tagName === 'H4') {
          el.textContent = dict[key];
        } else if (el.querySelector('p') && !el.querySelector('a')) {
          el.textContent = dict[key];
        }
      }
    });

    // Handle nested text specifically for complex cards
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

  // --- 7. Init Language ---
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

  // --- 8. Intersection Observers (Animations) ---
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

  // --- 9. Scroll Indicator ---
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const firstSection = document.querySelector("main section");
      if (firstSection) {
        window.scrollTo({ top: firstSection.offsetTop - 60, behavior: "smooth" });
      }
    });
  }

  // --- 10. Theme Toggle ---
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
    });
  }

  // --- 11. Skill Bars Animation ---
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // If there were bars, they would animate here. 
        // Current design uses tags, so this just fades in the card.
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

  // --- 12. Hide Nav on Scroll ---
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

  // --- 13. Flip Card Interactions ---
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
