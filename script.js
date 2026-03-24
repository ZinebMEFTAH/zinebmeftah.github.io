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
      // ... (Keep previous translations the same) ...
      "page.title": "Portfolio - Meftah Zineb",
      "header.title": "MEFTAH Zineb",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      
      // Nav
      "nav.contact": "Contact", "nav.profil": "Profil", "nav.formation": "Formation",
      "nav.publications": "Publications", "nav.projects": "Projets", "nav.competences": "Compétences",
      "nav.langues": "Langues", "nav.experience": "Expérience", "nav.skip": "Aller au contenu",

      // Contact
      "info.telephone": "☎ Téléphone", "info.email": "✉ Email", "info.linkedin": "🔗 LinkedIn", "info.portfolio": "🌐 Portfolio", "info.github": "🐙 GitHub", "info.huggingface": "🤖 Hugging Face",

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

      // FORMATION
      "formation.ensia.title": "ENSIA, Algérie",
      "formation.ensia.desc": "<strong>Diplôme :</strong> Ingénierie en Intelligence Artificielle (1ʳᵉ et 2ᵉ année validées)",
      "formation.avignon.title": "Université d'Avignon (CERI), France",
      "formation.avignon.desc": "<strong>Diplôme :</strong> Data Science (3ᵉ année en cours, excellents résultats)",
      "formation.bac.title": "Baccalauréat Scientifique",
      "formation.bac.desc": "<strong>Mention :</strong> Excellent — Moyenne 17,82",
      "formation.bac.cert": "Voir attestation BAC",
      "formation.bac.transcript": "Voir relevés de notes",
      "dates.ensia": "2022 - Juin 2024",
      "dates.avignon": "Septembre 2024 - Aujourd'hui",
      "common.viewDiploma": "Voir diplôme",

      // PUBLICATIONS
      "publication.date": "📅 20 décembre 2024",
      "publication.location": "📍 Hugging Face",
      "publication.description": "Découvrez notre approche révolutionnaire qui utilise un fine-tuning inversé pour générer des données synthétiques.",
      "publication.cta": "Lire l'article complet",
      "publication.tableTitle": "Exemple de base de données",
      "pub.keywords": "Mots-clés",
      "pub.articles": "Articles",

      // SKILLS
      "competences.aiDataSkills": "IA & Data Science", "competences.techSkills": "Compétences Techniques", "competences.softSkillsTitle": "Soft Skills",
      "competences.artificialIntelligence": "Intelligence Artificielle", "competences.dataScience": "Data Science", "competences.programming": "Programmation", "competences.web": "Full-Stack Web",
      "competences.aiModels": "Techniques", "competences.aiTools": "Frameworks", "competences.dataAnalysis": "Analyse", "competences.dataProjects": "Concepts Clés",
      "competences.languages": "Langages", "competences.tools": "DevOps", "competences.backend": "Backend", "competences.frontend": "Frontend",
      "competences.writing": "Rédaction Scientifique", "competences.writingDesc": "Publication d'articles techniques, documentation.",
      "competences.teamwork": "Leadership", "competences.teamworkDesc": "Expérience GDSC, gestion de projets.",
      "competences.problemSolving": "Résolution de problèmes", "competences.problemSolvingDesc": "Approche algorithmique, optimisation.",
      "competences.continuousLearning": "Apprentissage continu", "competences.continuousLearningDesc": "Veille technologique active.",
      "competences.project1": "Génération de données synthétiques", "competences.project2": "Clustering & Segmentation", "competences.project3": "Algorithmes de Graphes",

      // LANGUAGES
      "langues.french": "Français", "langues.frenchlevel": "Avancé (C1)", "langues.frenchDetail": "Année universitaire validée en France",
      "langues.english": "Anglais", "langues.englishlevel": "Bilingue (C2)",
      "langues.arabic": "Arabe", "langues.arabicLevel": "Langue maternelle",

      // CERTIFICATES
      "certs.heading": "Certificats",
      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score : 92/100 (C2). Certification standardisée reconnue mondialement.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Programme d’échanges axé sur le leadership.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch",
      "certs.pytorch.desc": "Formation en ligne sur les réseaux de neurones.",
      "certs.fcc.title": "Responsive Web Design",
      "certs.fcc.desc": "Certification axée sur les fondamentaux du HTML/CSS.",
      "certs.cta": "Voir certificat",

      // EXPERIENCE
      "experience.card1.title": "Responsable informatique", "experience.card1.detail": "Google Developer Student Club ENSIA",
      "experience.card2.title": "Participant AYLP", "experience.card2.detail": "Northern Nevada International Center",
      "experience.card3.title": "Organisation d'événements", "experience.card3.detail": "Hackathons, IA, Dev Web",
      "experience.card4.title": "Autres Réalisations",
      "experience.card4.item1": "Hackathon IA Avignon (24h)", "experience.card4.item2": "Mentor junior – GDSC", "experience.card4.item3": "Projet tutoré G‑JOBS",

      // PROJECTS (UPDATED SECTION)
      "projects.hover": "Survolez pour les détails", "projects.link": "Voir code", "projects.link.modelRepo": "Dépôt modèle", "projects.link.demoSpace": "Démo", "projects.link.viewCode": "Voir code", "projects.link.githubRepo": "GitHub", "projects.link.liveDemo": "Démo Live",
      "projects.p9.title": "LeRobot PushT Trainer", "projects.p9.short": "Politiques robotiques.", "projects.p9.desc": "Entraînement et évaluation de politiques PushT avec Hugging Face.",
      
      // --- FIXED: LUNG CANCER ---
      "projects.cancer.title": "Détection du Cancer du Poumon", 
      "projects.cancer.short": "Diagnostic Carcinomes (CT).", 
      "projects.cancer.desc": "Classification de 4 types de cancer du poumon via CNN sur scanners CT.",
      // --------------------------

      "projects.p10.title": "Robot Vision Simulator", "projects.p10.short": "Simulateur interactif.", "projects.p10.desc": "Navigation autonome et détection d'objets (Web).",
      "projects.sentiment.title": "Analyse de Sentiments", "projects.sentiment.short": "NLP & Classification.", "projects.sentiment.desc": "Modèle NLP pour analyser les avis clients.",
      "projects.clustering.title": "Segmentation Client", "projects.clustering.short": "Clustering de données.", "projects.clustering.desc": "Analyse comportementale via K-Means.",
      "projects.p0.title": "Générateur Site IA", "projects.p0.short": "Texte vers Site Web.", "projects.p0.desc": "Génération de sites via OpenAI API.",
      "projects.p2.title": "News Wave", "projects.p2.short": "Actus Intelligentes.", "projects.p2.desc": "Agrégateur personnalisé via NLP.",
      "projects.compiler.title": "Compilateur Pascal", "projects.compiler.short": "Architecture Compilateur.", "projects.compiler.desc": "Lexique, syntaxe, sémantique (C/Flex/Bison).",
      "projects.nova.title": "NOVA", "projects.nova.short": "Co-watching vidéo.", "projects.nova.desc": "Visionnage synchronisé temps réel.",
      "projects.cericar.title": "CERICar", "projects.cericar.short": "Covoiturage Full-Stack.", "projects.cericar.desc": "Réservation et recherche de trajets.",
      "projects.p3.title": "Optimisation Agricole", "projects.p3.short": "IA Durable.", "projects.p3.desc": "Maximisation de production via CSP.",
      "projects.p4.title": "G-Jobs", "projects.p4.short": "Plateforme Emploi.", "projects.p4.desc": "Mise en relation intelligente recruteurs/candidats.",
      "projects.p5.title": "Moteur de Recherche", "projects.p5.short": "Indexation Textuelle.", "projects.p5.desc": "Implémentation TF-IDF et BM25.",
      "projects.p6.title": "Chaîne Restaurants", "projects.p6.short": "Gestion Multisites.", "projects.p6.desc": "Gestion centralisée de restaurants.",
      "projects.p7.title": "Supermarché CLI", "projects.p7.short": "Gestion Stock.", "projects.p7.desc": "Application CLI de gestion.",
      "projects.p8.title": "Réseau Routier", "projects.p8.short": "Graphes Avancés.", "projects.p8.desc": "Analyse de réseau et chemins optimaux.",

      "chat.title": "Assistant Portfolio", "chat.placeholder": "Posez une question...", "chat.send": "Envoyer",
      "footer.copy": "© 2026 Meftah Zineb. Tous droits réservés."
    },
    en: {
      "page.title": "Portfolio - Zineb Meftah",
      "header.title": "Zineb Meftah",
      "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
      
      "nav.contact": "Contact", "nav.profil": "About", "nav.formation": "Education",
      "nav.publications": "Publications", "nav.projects": "Projects", "nav.competences": "Skills",
      "nav.langues": "Languages", "nav.experience": "Experience", "nav.skip": "Skip to content",

      "info.telephone": "☎ Phone", "info.email": "✉ Email", "info.linkedin": "🔗 LinkedIn", "info.portfolio": "🌐 Portfolio", "info.github": "🐙 GitHub", "info.huggingface": "🤖 Hugging Face",

      "formation.heading": "Education & Certificates", "publications.heading": "Publications", "projects.heading": "Projects & Experience", "experience.heading": "Experience & Leadership", "competences.heading": "Skills", "langues.heading": "Languages", "contact.heading": "Contact",

      "profile.heading": "About Me", "profile.greeting": "Hi, I’m Zineb Meftah.",
      "profile.text1": "An aspiring AI Engineer passionate about Robotics and backend development.",
      "profile.text2": "My expertise covers LLM Fine-tuning, Computer Vision, and end-to-end Machine Learning pipelines.",

      // FORMATION
      "formation.ensia.title": "ENSIA, Algeria",
      "formation.ensia.desc": "<strong>Degree:</strong> Artificial Intelligence Engineering (1st & 2nd Year Completed)",
      "formation.avignon.title": "Avignon University (CERI), France",
      "formation.avignon.desc": "<strong>Degree:</strong> Data Science (3rd year ongoing, excellent results)",
      "formation.bac.title": "Scientific Baccalaureate",
      "formation.bac.desc": "<strong>Honors:</strong> Excellent — Average 17.82",
      "formation.bac.cert": "View BAC certificate",
      "formation.bac.transcript": "View grade transcripts",
      "dates.ensia": "2022 - June 2024",
      "dates.avignon": "Sept 2024 - Present",
      "common.viewDiploma": "View Diploma",

      // PUBLICATIONS
      "publication.date": "📅 December 20, 2024",
      "publication.location": "📍 Hugging Face",
      "publication.description": "Discover our revolutionary approach using reverse fine-tuning to generate synthetic data.",
      "publication.cta": "Read Full Article",
      "publication.tableTitle": "Sample Database",
      "pub.keywords": "Keywords", "pub.articles": "Articles",

      // SKILLS
      "competences.aiDataSkills": "AI & Data Science", "competences.techSkills": "Technical Skills", "competences.softSkillsTitle": "Personal Skills",
      "competences.artificialIntelligence": "Artificial Intelligence", "competences.dataScience": "Data Science", "competences.programming": "Programming & Systems", "competences.web": "Full-Stack Web",
      "competences.aiModels": "Techniques", "competences.aiTools": "Frameworks", "competences.dataAnalysis": "Analysis", "competences.dataProjects": "Key Concepts",
      "competences.languages": "Languages", "competences.tools": "DevOps", "competences.backend": "Backend", "competences.frontend": "Frontend",
      "competences.writing": "Scientific Writing", "competences.writingDesc": "Technical blog publishing, structured documentation.",
      "competences.teamwork": "Leadership", "competences.teamworkDesc": "GDSC experience, mentoring, agile management.",
      "competences.problemSolving": "Problem Solving", "competences.problemSolvingDesc": "Algorithmic thinking, optimization.",
      "competences.continuousLearning": "Continuous Learning", "competences.continuousLearningDesc": "Active tech watch (Papers with Code).",
      "competences.project1": "Synthetic Data Generation", "competences.project2": "Clustering & Segmentation", "competences.project3": "Graph Algorithms",

      // LANGUAGES
      "langues.french": "French", "langues.frenchlevel": "Advanced (C1)", "langues.frenchDetail": "Validated year in French university",
      "langues.english": "English", "langues.englishlevel": "Bilingual (C2)",
      "langues.arabic": "Arabic", "langues.arabicLevel": "Native",

      // CERTIFICATES
      "certs.heading": "Certificates",
      "certs.english.title": "EF SET English Certificate (C2 Proficient)",
      "certs.english.desc": "Score: 92/100 (C2). Globally recognized standardized certification.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Exchange program focused on leadership and innovation.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch",
      "certs.pytorch.desc": "Online training on neural networks.",
      "certs.fcc.title": "Responsive Web Design",
      "certs.fcc.desc": "Certificate covering HTML, CSS, Flexbox.",
      "certs.cta": "View Certificate",

      // EXPERIENCE
      "experience.card1.title": "IT Manager", "experience.card1.detail": "Google Developer Student Club ENSIA",
      "experience.card2.title": "AYLP Participant", "experience.card2.detail": "Northern Nevada International Center",
      "experience.card3.title": "Event Organizer", "experience.card3.detail": "Hackathons, AI, Web Dev",
      "experience.card4.title": "Other Achievements",
      "experience.card4.item1": "AI Hackathon Avignon (24h)", "experience.card4.item2": "Junior Mentor – GDSC", "experience.card4.item3": "Supervised Project G‑JOBS",

      // PROJECTS (UPDATED SECTION)
      "projects.hover": "Hover or click for details", "projects.link": "View Code", "projects.link.modelRepo": "Model Repo", "projects.link.demoSpace": "Demo Space", "projects.link.viewCode": "View Code", "projects.link.githubRepo": "GitHub Repo", "projects.link.liveDemo": "Live Demo",
      "projects.p9.title": "LeRobot PushT Trainer", "projects.p9.short": "Robotic Policy Training.", "projects.p9.desc": "End-to-end pipeline for training PushT policies.",
      
      // --- FIXED: LUNG CANCER ---
      "projects.cancer.title": "Lung Cancer Detection", 
      "projects.cancer.short": "Carcinoma Diagnosis (CT).", 
      "projects.cancer.desc": "Classification of 4 lung cancer types using CNNs on CT scans.",
      // --------------------------

      "projects.p10.title": "Robot Vision Simulator", "projects.p10.short": "Interactive Vision Simulator.", "projects.p10.desc": "Web-based robotics simulator (COCO-SSD).",
      "projects.sentiment.title": "Sentiment Analysis", "projects.sentiment.short": "NLP & Classification.", "projects.sentiment.desc": "NLP model to analyze customer reviews.",
      "projects.clustering.title": "Customer Segmentation", "projects.clustering.short": "Data Clustering.", "projects.clustering.desc": "Customer behavior analysis using K-Means.",
      "projects.p0.title": "AI Website Generator", "projects.p0.short": "Text to Website.", "projects.p0.desc": "Generative AI system for website creation.",
      "projects.p2.title": "News Wave", "projects.p2.short": "Smart News Aggregator.", "projects.p2.desc": "Personalized news app using NLP.",
      "projects.compiler.title": "Pascal-like Compiler", "projects.compiler.short": "Full Compiler.", "projects.compiler.desc": "Compiler for Mini-Pascal (C, Flex, Bison).",
      "projects.nova.title": "NOVA", "projects.nova.short": "Real-time Co-watching.", "projects.nova.desc": "Synchronized video viewing platform.",
      "projects.cericar.title": "CERICar", "projects.cericar.short": "Full-stack Carpooling.", "projects.cericar.desc": "Journey search and profile management.",
      "projects.p3.title": "Agricultural Optimization", "projects.p3.short": "Sustainable Farming AI.", "projects.p3.desc": "Yield maximization using CSP algorithms.",
      "projects.p4.title": "G-Jobs", "projects.p4.short": "Smart Job Platform.", "projects.p4.desc": "Connecting job seekers with employers.",
      "projects.p5.title": "Search Engine", "projects.p5.short": "Text Indexing.", "projects.p5.desc": "Search engine implementing TF-IDF/BM25.",
      "projects.p6.title": "Restaurant Chain", "projects.p6.short": "Multi-location Management.", "projects.p6.desc": "System for multi-country restaurant chain.",
      "projects.p7.title": "My Online Supermarket", "projects.p7.short": "CLI Inventory.", "projects.p7.desc": "Command-line supermarket management.",
      "projects.p8.title": "Road Network Analysis", "projects.p8.short": "Graph Algorithms.", "projects.p8.desc": "Network analysis in Avignon (Shortest paths).",

      "chat.title": "Portfolio Assistant", "chat.placeholder": "Ask a question...", "chat.send": "Send",
      "footer.copy": "© 2026 Zineb Meftah. All rights reserved."
    },
    ar: {
      "page.title": "المعرض - مفتاح زينب",
      "header.title": "مفتاح زينب",
      "header.subtitle": "مهندس الذكاء الاصطناعي المستقبلي | التعلم العميق | التعلم الآلي | مطور كامل الحزمة",
      "nav.contact": "اتصل", "nav.profil": "نبذة", "nav.formation": "التعليم",
      "nav.publications": "المنشورات", "nav.projects": "المشاريع", "nav.competences": "المهارات",
      "nav.langues": "اللغات", "nav.experience": "الخبرة", "nav.skip": "تخطي إلى المحتوى",

      "info.telephone": "☎ الهاتف", "info.email": "✉ البريد", "info.linkedin": "🔗 لينكد إن", "info.portfolio": "🌐 المعرض", "info.github": "🐙 جيتهاب", "info.huggingface": "🤖 هاجينغ فايس",

      "formation.heading": "التعليم والشهادات", "publications.heading": "المنشورات", "projects.heading": "المشاريع والخبرة", "experience.heading": "الخبرة والقيادة", "competences.heading": "المهارات", "langues.heading": "اللغات", "contact.heading": "اتصل",

      "profile.heading": "نبذة عني", "profile.greeting": "مرحبًا، أنا مفتاح زينب.",
      "profile.text1": "مهندسة طموحة شغوفة بالذكاء الاصطناعي والروبوتات.",
      "profile.text2": "تشمل خبرتي الضبط الدقيق لنماذج اللغة الكبيرة (LLM)، والرؤية الحاسوبية.",

      // FORMATION
      "formation.ensia.title": "ENSIA، الجزائر",
      "formation.ensia.desc": "<strong>الشهادة:</strong> هندسة الذكاء الاصطناعي (السنة الأولى والثانية)",
      "formation.avignon.title": "جامعة أفينيون (CERI)، فرنسا",
      "formation.avignon.desc": "<strong>الشهادة:</strong> علوم البيانات (السنة الثالثة جارية)",
      "formation.bac.title": "بكالوريا علمية",
      "formation.bac.desc": "<strong>التقدير:</strong> ممتاز — معدل 17.82",
      "formation.bac.cert": "عرض شهادة البكالوريا",
      "formation.bac.transcript": "عرض كشف النقاط",
      "dates.ensia": "2022 - يونيو 2024",
      "dates.avignon": "سبتمبر 2024 - الحاضر",
      "common.viewDiploma": "عرض الشهادة",

      // PUBLICATIONS
      "publication.date": "📅 20 ديسمبر 2024",
      "publication.location": "📍 Hugging Face",
      "publication.description": "اكتشف نهجنا الثوري الذي يستخدم الضبط العكسي لتوليد بيانات تركيبية.",
      "publication.cta": "اقرأ المقال الكامل",
      "publication.tableTitle": "عينة قاعدة البيانات",
      "pub.keywords": "الكلمات المفتاحية", "pub.articles": "المقالات",

      // SKILLS
      "competences.aiDataSkills": "الذكاء الاصطناعي وعلوم البيانات", "competences.techSkills": "المهارات التقنية", "competences.softSkillsTitle": "المهارات الشخصية",
      "competences.artificialIntelligence": "الذكاء الاصطناعي", "competences.dataScience": "علوم البيانات", "competences.programming": "البرمجة والأنظمة", "competences.web": "تطوير الويب",
      "competences.aiModels": "التقنيات", "competences.aiTools": "الأطر والأدوات", "competences.dataAnalysis": "التحليل", "competences.dataProjects": "المفاهيم",
      "competences.languages": "اللغات", "competences.tools": "الأدوات", "competences.backend": "الخلفية", "competences.frontend": "الواجهة الأمامية",
      "competences.writing": "الكتابة العلمية", "competences.writingDesc": "نشر المقالات التقنية والتوثيق.",
      "competences.teamwork": "القيادة والعمل الجماعي", "competences.teamworkDesc": "خبرة GDSC، الإرشاد.",
      "competences.problemSolving": "حل المشكلات", "competences.problemSolvingDesc": "التفكير الخوارزمي.",
      "competences.continuousLearning": "التعلم المستمر", "competences.continuousLearningDesc": "متابعة تقنية نشطة.",
      "competences.project1": "توليد البيانات الاصطناعية", "competences.project2": "التجميع والتجزئة", "competences.project3": "خوارزميات الرسوم البيانية",

      // LANGUAGES
      "langues.french": "الفرنسية", "langues.frenchlevel": "متقدم (C1)", "langues.frenchDetail": "سنة جامعية مصادق عليها في فرنسا",
      "langues.english": "الإنجليزية", "langues.englishlevel": "ثنائي اللغة (C2)",
      "langues.arabic": "العربية", "langues.arabicLevel": "اللغة الأم",

      // CERTIFICATES
      "certs.heading": "الشهادات",
      "certs.english.title": "شهادة EF SET للغة الإنجليزية (C2 محترف)",
      "certs.english.desc": "النتيجة: 92/100. شهادة معترف بها عالمياً.",
      "certs.aylp.title": "برنامج القيادة الشبابية الجزائري",
      "certs.aylp.desc": "برنامج تبادل يركز على القيادة والابتكار.",
      "certs.pytorch.title": "مقدمة في التعلم العميق (PyTorch)",
      "certs.pytorch.desc": "تدريب عبر الإنترنت حول الشبكات العصبية.",
      "certs.fcc.title": "تصميم الويب المتجاوب",
      "certs.fcc.desc": "شهادة تركز على أساسيات HTML و CSS.",
      "certs.cta": "عرض الشهادة",

      // EXPERIENCE
      "experience.card1.title": "مسؤولة تقنية المعلومات", "experience.card1.detail": "نادي مطوري Google – ENSIA",
      "experience.card2.title": "مشاركة في AYLP", "experience.card2.detail": "المركز الدولي لشمال نيفادا",
      "experience.card3.title": "منظِّمة فعاليات", "experience.card3.detail": "هاكاثونات، ذكاء اصطناعي",
      "experience.card4.title": "إنجازات أخرى",
      "experience.card4.item1": "هاكاثون الذكاء الاصطناعي أفينيون", "experience.card4.item2": "مرشدة مبتدئة – GDSC", "experience.card4.item3": "مشروع مؤطر G‑JOBS",

      // PROJECTS (UPDATED SECTION)
      "projects.hover": "مرّر أو انقر لعرض التفاصيل", "projects.link": "عرض الكود", "projects.link.modelRepo": "مستودع النموذج", "projects.link.demoSpace": "مساحة العرض", "projects.link.viewCode": "عرض الكود", "projects.link.githubRepo": "مستودع GitHub", "projects.link.liveDemo": "عرض مباشر",
      "projects.p9.title": "مدرب LeRobot PushT", "projects.p9.short": "تدريب السياسات.", "projects.p9.desc": "نظام كامل لتدريب وتقييم سياسات PushT.",
      
      // --- FIXED: LUNG CANCER ---
      "projects.cancer.title": "كشف سرطان الرئة", 
      "projects.cancer.short": "تشخيص الأورام (CT).", 
      "projects.cancer.desc": "تصنيف 4 أنواع من سرطان الرئة باستخدام CNN على صور الأشعة المقطعية.",
      // --------------------------

      "projects.p10.title": "محاكي رؤية الروبوت", "projects.p10.short": "محاكي تفاعلي.", "projects.p10.desc": "محاكي روبوتات ويب.",
      "projects.sentiment.title": "تحليل المشاعر", "projects.sentiment.short": "تصنيف النصوص.", "projects.sentiment.desc": "نموذج NLP لتحليل المراجعات.",
      "projects.clustering.title": "تجزئة العملاء", "projects.clustering.short": "تحليل بيانات.", "projects.clustering.desc": "تحليل سلوك العملاء (K-Means).",
      "projects.p0.title": "مولد مواقع الويب", "projects.p0.short": "من نص إلى موقع.", "projects.p0.desc": "تصميم ونشر مواقع ويب كاملة.",
      "projects.p2.title": "News Wave", "projects.p2.short": "مجمع أخبار ذكي.", "projects.p2.desc": "تطبيق أخبار مخصص.",
      "projects.compiler.title": "مترجم Pascal", "projects.compiler.short": "هندسة مترجم.", "projects.compiler.desc": "تصميم مترجم لـ Mini-Pascal.",
      "projects.nova.title": "نوفا (NOVA)", "projects.nova.short": "مشاهدة متزامنة.", "projects.nova.desc": "منصة اجتماعية للمشاهدة.",
      "projects.cericar.title": "سيري-كار", "projects.cericar.short": "نقل تشاركي.", "projects.cericar.desc": "تطبيق ويب متكامل للنقل.",
      "projects.p3.title": "تحسين الزراعة", "projects.p3.short": "زراعة ذكية.", "projects.p3.desc": "تعظيم الإنتاج الزراعي (CSP).",
      "projects.p4.title": "G-Jobs", "projects.p4.short": "منصة توظيف.", "projects.p4.desc": "ربط الباحثين عن عمل بأصحاب العمل.",
      "projects.p5.title": "محرك بحث", "projects.p5.short": "فهرسة وبحث.", "projects.p5.desc": "محرك بحث (TF-IDF/BM25).",
      "projects.p6.title": "سلسلة مطاعم", "projects.p6.short": "إدارة مواقع.", "projects.p6.desc": "نظام إدارة سلسلة مطاعم.",
      "projects.p7.title": "سوبرماركت الإنترنت", "projects.p7.short": "نظام CLI.", "projects.p7.desc": "إدارة السوبرماركت (CLI).",
      "projects.p8.title": "تحليل الطرق", "projects.p8.short": "خوارزميات.", "projects.p8.desc": "تحليل شبكة الطرق (أفينيون).",

      "chat.title": "مساعد المعرض", "chat.placeholder": "اطرح سؤالاً...", "chat.send": "إرسال",
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
    
    // --- SAFARI FIX START ---
    const navEl = document.querySelector('nav[role="navigation"]');
    
    // 1. Temporarily disable transition to prevent glitches during switch
    if (navEl) {
        navEl.style.transition = 'none'; 
        navEl.classList.remove('nav-hidden'); // Ensure it's visible
        navEl.style.transform = 'translateY(0)'; // Reset position
    }

    // 2. Change the language
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // 3. Force browser to accept the change (Reflow)
    if (navEl) void navEl.offsetWidth; 

    // 4. Re-enable transition after a tiny delay
    if (navEl) {
        setTimeout(() => {
            navEl.style.transition = ''; // Remove inline style to revert to CSS
            navEl.style.transform = '';  // Remove inline transform
        }, 50);
    }
    // --- SAFARI FIX END ---    // Horizontal scroll reset
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
