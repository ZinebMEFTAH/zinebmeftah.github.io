document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.querySelector(".lang-toggle");
const langSwitcher = document.querySelector(".lang-switcher");

if (langToggle && langSwitcher) {
  langToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent immediate close
    langSwitcher.classList.toggle("open");
  });

  // Close dropdown if you click outside it
  document.addEventListener("click", (e) => {
    if (!langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove("open");
    }
  });
}

const burger = document.getElementById("burger");
const navLinks = document.querySelector(".nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    burger.classList.toggle("toggle"); // Optional: animate lines
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

  // --- Chat (single implementation) ---
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
          body: JSON.stringify({ message: q })
        });

        const data = await res.json();
        append(data.answer || "No answer.", "bot");
      } catch (err) {
        append("Server error. Try again later.", "bot");
      }
    });

    append("Hi. Ask me anything about my projects.", "bot");
  }

  // --- Translation Dictionary ---
    const translations = {
      fr: {
        "page.title": "Portfolio - Meftah Zineb",
        "nav.title": "Meftah Zineb",
        "header.title": "Meftah Zineb",
        "contact.heading": "Contact",
        "info.telephone": "☎ Téléphone",
        "info.email": "✉ Email",
        "info.linkedin": "🔗 LinkedIn",
        "info.portfolio": "🌐 Portfolio",
        "info.github": "🐙 GitHub",
        "info.huggingface": "🤖 Hugging Face",
        "profile.heading": "À propos de moi",
        "profile.greeting": "Bonjour, je suis Meftah Zineb.",
        "profile.text1": "Étudiante en Informatique passionnée par l’IA appliquée à la robotique et le développement backend, je conçois des systèmes intelligents combinant LLM, deep learning et automatisation web. ",
        "profile.text2": "Mes projets mettent en œuvre des modèles OpenAI, des simulateurs interactifs, et des solutions complètes de bout-en-bout.",
        "profile.more": "En savoir plus sur mon parcours",
        "projects.hover": "Survolez ou cliquez pour voir les détails",
        "projects.link": "Voir le code sur GitHub",
        "projects.link.instagram" : "Voir la page sur Instagram",
        "projects.link.demo": "Voir la démo",
        "projects.link.modelRepo": "Dépôt du modèle",
        "projects.link.demoSpace": "Espace de démo",
        "projects.link.githubRepo": "Dépôt GitHub",
        "projects.link.liveDemo": "Démo en ligne",

        "projects.p1.title": "Personnalisation de produits par l’IA",
        "projects.p1.short": "Transformez vos idées en produits uniques.",
        "projects.p1.desc": "Système permettant aux utilisateurs de transformer leurs idées en produits personnalisés via des modèles d’IA, avec une transition vers la production.",

        "projects.p2.title": "News Wave",
        "projects.p2.short": "Votre actualité personnalisée avec l’IA.",
        "projects.p2.desc": "Agrégateur de nouvelles personnalisées par l'IA qui offre des mises à jour en temps réel à partir des principales sources mondiales, filtrées selon les intérêts de l'utilisateur.",

        "projects.p3.title": "Optimisation Agricole",
        "projects.p3.short": "Agriculture durable basée sur l’IA.",
        "projects.p3.desc": "Projet IA d’optimisation de la production agricole en Algérie en utilisant des algorithmes de recherche sur graphes et de satisfaction de contraintes.",

        "projects.p4.title": "G-Jobs",
        "projects.p4.short": "Plateforme d’emploi intelligente en Algérie.",
        "projects.p4.desc": "Une plateforme intelligente connectant les chercheurs d’emploi algériens avec les recruteurs à travers des filtres avancés, messagerie, et suivi des candidatures.",

        "projects.p5.title": "Moteur de Recherche Avancé",
        "projects.p5.short": "Recherche documentaire avec TF-IDF & BM25.",
        "projects.p5.desc": "Moteur de recherche Java basé sur TF-IDF et BM25 pour indexer, analyser et trier efficacement des documents textuels avec précision.",

        "projects.p6.title": "Chaîne de Restaurants",
        "projects.p6.short": "Gestion multisites de restaurants.",
        "projects.p6.desc": "Système de gestion d’une chaîne de restaurants multi-pays, permettant une organisation optimale des réservations, des stocks et du personnel.",

        "projects.p7.title": "Mon Supermarché Numérique",
        "projects.p7.short": "Supermarché intelligent en ligne (CLI).",
        "projects.p7.desc": "Application CLI pour digitaliser la gestion d’un supermarché : fournisseurs, stock, ventes, rapports et statistiques.",

        "projects.p8.title": "Analyse du Réseau Routier (MAP)",
        "projects.p8.short": "Algorithmes avancés sur les graphes.",
        "projects.p8.desc": "Analyse de réseau routier à Avignon basée sur la théorie des graphes : chemins optimaux, connexité, performance réseau.",
        "header.subtitle": "Ingénieure en IA du futur | Apprentissage profond | Apprentissage automatique | Développeuse full-stack",
        "nav.contact": "Contact",
        "nav.profil": "Profil",
        "nav.formation": "Formation",
        "nav.publications": "Publications",
        "nav.projects": "Projets",
        "nav.competences": "Compétences",
        "nav.langues": "Langues",
        "nav.experience": "Expérience",
        "profil.heading": "À Propos de Moi",
        "profil.greeting": "Bonjour, je suis Meftah Zineb.",
        "profil.bio1": "Architecte digital et innovateur passionné, je fusionne l'intelligence artificielle avec l'art du développement pour créer des solutions disruptives qui redéfinissent le futur.",
        "profil.bio2": "Explorateur des algorithmes de pointe et toujours en quête de nouvelles idées, chaque projet est une aventure vers l'innovation.",
        "formation.heading": "Formation & Certifications",
        "formation.ensia": "ENSIA, Algérie",
        "formation.ensiaDiplome": "<strong>Diplôme :</strong> Ingénierie en Intelligence Artificielle (1ʳᵉ et 2ᵉ année validées)",
        "formation.ensiaCert": "Voir diplôme",
        "formation.avignon": "Université d'Avignon (CERI), France",
        "formation.avignonDiplome": "<strong>Diplôme :</strong> Data Science (3ᵉ année en cours, excellents résultats)",
        "formation.avignonCert": "Voir diplôme",
        "publications.heading": "Publications",
        "publication.date": "📅 20 décembre 2024",
        "publication.location": "📍 Hugging Face",
        "publication.description": "Découvrez notre approche révolutionnaire qui utilise un fine-tuning inversé pour générer des données synthétiques. Conçues pour extraire des mots-clés précis, ces données servent à entraîner des modèles de génération de tags ultra-performants.",
        "publication.cta": "Lire l'article complet",
        "publication.tableTitle": "Exemple de base de données",
        "projects.heading": "Projets et Expériences",
        "competences.heading": "Compétences",

        // Développement Web
        "competences.web": "🧑‍💻 Développement Web",
        "competences.web.frontend": "Frontend : HTML, CSS, JavaScript, Bootstrap, AJAX, TensorFlow.js, HTML5 Canvas",
        "competences.web.backend": "Backend : Node.js, PHP, Python (Flask, Django), REST API, SQL",
        "competences.web.fullstack": "Full-Stack : Laravel, React, Django, Flask",
        "competences.web.database": "Base de données : MySQL, PostgreSQL",
        "competences.web.security": "Sécurité Web : Sessions, Cookies, CSRF, URL Rewriting",
        "competences.web.tools": "Outils associés : Git, GitHub, GitHub Actions, Makefile",

        // Data Science & IA
        "competences.data": "🤖 Data Science & Intelligence Artificielle",
        "competences.data.tools": "Langages & Outils : Python, PyTorch, OpenAI API, Hugging Face, Scikit-learn, Pandas",
        "competences.data.models": "Modèles & Techniques : LLM, Fine-tuning, Diffusion Models, Reinforcement Learning, Classification, Génération de données synthétiques",
        "competences.data.apps": "Applications IA : Vision par ordinateur, NLP, Génération de tags, Sites web IA, Recommandation intelligente",
        "competences.data.projects": "Projets notables : LeRobot, Générateur de sites web IA, News Wave, Génération automatique de tags",
        "competences.data.extra": "Outils : Jupyter, Colab, Transformers, OpenAI Playground, TensorBoard, NumPy, Matplotlib",

        // Programmation
        "competences.programming": "💻 Programmation",
        "competences.programming.languages": "Langages : Python, C++, Java, PHP, JavaScript, Bash, SQL",
        "competences.programming.paradigms": "Paradigmes : POO, fonctionnelle, logique métier",
        "competences.programming.experience": "Expériences : Compilation, Algorithmes de graphes (Dijkstra, A*, BM25), Scripting CLI",
        "competences.programming.projects": "Projets : Compilateur Pascal-like, Optimisation réseaux, Moteur de recherche, CLI Supermarché, Génération web via LLM",

        // Soft Skills
        "competences.soft": "🤝 Compétences interpersonnelles",
        "competences.soft.list": "Autonomie, travail en équipe, communication claire, leadership (GDSC, AYLP), résolution de problèmes, apprentissage rapide, rigueur technique, gestion de projet",

        // Compétences complémentaires
        "competences.extra": "🧩 Compétences complémentaires",
        "competences.extra.cognitive": "Cognitives : pensée algorithmique, esprit critique, modélisation",
        "competences.extra.techniques": "Techniques : API REST, WebSockets, CI/CD, Git workflows",
        "competences.extra.learning": "Apprentissage : veille technologique, frameworks IA",
        "competences.extra.presentation": "Communication : vulgarisation, rédaction technique, présentations",
        "competences.extra.methods": "Méthodologies : agile, GitHub Flow, conception modulaire, réutilisabilité",
        "competences.techSkills": "Compétences Techniques",
        "competences.aiDataSkills": "IA & Data Science",
        "competences.softSkillsTitle": "Compétences Personnelles",
        "competences.artificialIntelligence": "Intelligence Artificielle",
        "competences.dataScience": "Data Science",
        "competences.programming": "Programmation",
        "competences.web": "Développement Web",
        "competences.languages": "Langages",
        "competences.paradigms": "Paradigmes",
        "competences.frontend": "Frontend",
        "competences.backend": "Backend",
        "competences.databases": "Bases de données",
        "competences.tools": "Outils",
        "competences.aiModels": "Modèles & Techniques",
        "competences.aiTools": "Outils IA",
        "competences.dataAnalysis": "Analyse & Manipulation",
        "competences.dataProjects": "Projets notables",
        "competences.project1": "Génération de données synthétiques pour fine-tuning",
        "competences.project2": "Moteur de recherche avec TF-IDF & BM25",
        "competences.teamwork": "Travail en équipe",
        "competences.leadership": "Leadership",
        "competences.problemSolving": "Résolution de problèmes",
        "competences.continuousLearning": "Apprentissage continu",
        "competences.teamworkDesc": "Collaboration efficace, communication claire, esprit d'équipe",
        "competences.leadershipDesc": "Expérience GDSC, mentorat, gestion de projets collaboratifs",
        "competences.problemSolvingDesc": "Pensée analytique, approche systématique, solutions créatives",
        "competences.continuousLearningDesc": "Veille technologique, adaptation rapide, autoformation",
          "experience.heading": "Expérience & Leadership",
  "experience.card1.title": "Responsable IT",
  "experience.card1.detail": "Google Developer Student Club ENSIA (2023–2024)",
  "experience.card2.title": "Participant AYLP",
  "experience.card2.detail": "Northern Nevada International Center (2021) – Programme Algérien de Leadership des Jeunes",
  "experience.card2.cert": "Voir le certificat",
  "experience.card3.title": "Organisatrice d’événements",
  "experience.card3.detail": "Hackathons, IA, Développement Web",
  "experience.card4.title": "Autres réalisations",
  "experience.card4.detail": "Participation à divers hackathons et projets collaboratifs pour innover et exceller.",
  "experience.card4.item1": "Hackathon IA Avignon (24h, 2024)",
  "experience.card4.item2": "Mentor junior – GDSC (2023)",
  "experience.card4.item3": "Projet encadré G-JOBS (2024) : tâches, Git, revue",

  // Projects p0
  "projects.p0.title": "Générateur de sites web IA",
  "projects.p0.short": "Générez des sites web à partir d’une consigne.",
  "projects.p0.desc": "Crée des sites fonctionnels à partir d’instructions en langage naturel grâce aux LLM. Stack : Python, OpenAI API, automatisation web.",

  // Certificates section
  "certs.heading": "Certificats",
  "certs.pytorch.title": "Introduction au Deep Learning avec PyTorch – DataCamp",
  "certs.pytorch.desc": "Formation en ligne sur les réseaux de neurones et l’utilisation de PyTorch.",
  "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
  "certs.aylp.desc": "Programme d’échange axé sur le leadership, l’innovation et la collaboration interculturelle.",
  "certs.eplus.title": "Niveau d’anglais – E-Plus Center",
  "certs.eplus.desc": "Attestation de compétence en anglais.",
  "certs.fcc.title": "Responsive Web Design – freeCodeCamp",
  "certs.fcc.desc": "Certification couvrant HTML, CSS, Flexbox et le design responsive.",
  "certs.cta": "Voir le certificat",

  // Languages section (keys named 'langues.*' in HTML)
  "langues.heading": "Langues",
  "langues.french": "Français",
  "langues.frenchlevel": "Intermédiaire (B2)",
  "langues.frenchCert": "Voir certificat",
  "langues.english": "Anglais",
  "langues.englishlevel": "Courant",
  "langues.englishCert": "Voir certificat",
  "langues.arabic": "Arabe",
  "langues.arabicLevel": "Langue maternelle",

  "projects.p9.title": "LeRobot PushT Trainer",
  "projects.p9.short": "Entraînez/évaluez des politiques PushT.",
  "projects.p9.desc": "App web pour entraîner et évaluer des politiques PushT. Gère checkpoints et publication sur Hugging Face. Stack : Python, LeRobot, Gradio, CUDA.",

  "projects.p10.title": "Simulateur de vision robotique",
  "projects.p10.short": "Simulateur interactif de vision robotique.",
  "projects.p10.desc": "Simulateur navigateur : robot sur grille, pick/place et commandes en langue naturelle. COCO-SSD pour la vision, A* pour le pathfinding. Stack : JS/Canvas, TF.js.",

  "footer.copy": "© 2025 Meftah Zineb. Tous droits réservés.",
  "formation.bac": "Baccalauréat Scientifique — Lycée Abd-El-Kader El-Yajouri, Guemar (Algérie)",
  "formation.bacDiplome": "<strong>Mention :</strong> Excellent — Moyenne 17,82 (Filière scientifique)",
  "formation.bacCert": "Voir attestation BAC",
  "formation.bacTranscript": "Voir relevés de notes",

  "chat.open": "Chat",
  "chat.title": "Assistant Portfolio",
  "chat.placeholder": "Pose une question...",
  "chat.send": "Envoyer",
  "chat.note": "Réponses basées sur le contenu du portfolio."
      },
      en: {
        "experience.card4.item1": "AI Hackathon Avignon (24h, 2024)",
        "experience.card4.item2": "Junior Mentor – GDSC (2023)",
        "experience.card4.item3": "Supervised Project G‑JOBS (2024): tasks, Git, review",
        // --- Experience & Leadership ---
        "experience.heading": "Experience & Leadership",
        "experience.card1.title": "IT Manager",
        "experience.card1.detail": "Google Developer Student Club ENSIA (2023-2024)",
        "experience.card2.title": "AYLP Participant",
        "experience.card2.detail": "Northern Nevada International Center (2021) Algerian Youth Leadership Program",
        "experience.card2.cert": "View Certificate",
        "experience.card3.title": "Event Organizer",
        "experience.card3.detail": "Hackathons, AI, Web Development",
        "experience.card4.title": "Other Achievements",
        "experience.card4.detail": "Participated in various hackathons and collaborative projects to innovate and excel.",
        "page.title": "Portfolio - Zineb Meftah",
        "nav.title": "Zineb Meftah",
        "header.title": "Zineb Meftah",
        "contact.heading": "Contact",
        "info.telephone": "☎ Phone",
        "info.email": "✉ Email",
        "info.linkedin": "🔗 LinkedIn",
        "info.portfolio": "🌐 Portfolio",
        "info.github": "🐙 GitHub",
        "info.huggingface": "🤖 Hugging Face",
        "header.subtitle": "Future AI Engineer | Deep Learning | Machine Learning | Full-Stack Developer",
        "nav.contact": "Contact",
        "nav.profil": "About",
        "nav.formation": "Education",
        "nav.publications": "Publications",
        "nav.projects": "Projects",
        "nav.competences": "Skills",
        "nav.langues": "Languages",
        "nav.experience": "Experience",
        "profil.heading": "About Me",
        "profil.greeting": "Hi, I’m Zineb Meftah.",
        "profil.bio1": "A digital architect and passionate innovator, I blend AI with the art of development to create disruptive solutions that redefine the future.",
        "profil.bio2": "Explorer of cutting-edge algorithms and always pushing creative boundaries — each project is a journey toward innovation.",
        "formation.heading": "Education & Certificates",
        "formation.ensia": "ENSIA, Algeria",
        "formation.ensiaDiplome": "<strong>Degree:</strong> Artificial Intelligence Engineering (1st & 2nd Year Completed)",
        "formation.ensiaCert": "View Certificate",
        "formation.avignon": "Université d'Avignon (CERI), France",
        "formation.avignonDiplome": "<strong>Degree:</strong> Data Science (3rd year ongoing, excellent results)",
        "formation.avignonCert": "View Certificate",
        "publications.heading": "Publications",
        "publication.date": "📅 December 20, 2024",
        "publication.location": "📍 Hugging Face",
        "publication.description": "Discover our revolutionary approach using reverse fine-tuning to generate synthetic data. Designed to extract accurate keywords and train highly efficient tag generation models.",
        "publication.cta": "Read Full Article",
        "publication.tableTitle": "Sample Database",
        "projects.heading": "Projects & Experience",
        "projects.hover": "Hover or click to view details",
        "projects.link": "View Code on GitHub",
        "projects.link.instagram" : "View page on Instagram",
        "projects.link.demo": "View demo",
        "projects.link.modelRepo": "Model repo",
        "projects.link.demoSpace": "Demo space",
        "projects.link.githubRepo": "GitHub repo",
        "projects.link.liveDemo": "Live demo",

        "projects.p1.title": "AI Product Personalization",
        "projects.p1.short": "Turn your ideas into personalized products.",
        "projects.p1.desc": "A system enabling users to convert their ideas into custom products using AI models, with a smooth transition to production.",
        "projects.p2.title": "News Wave",
        "projects.p2.short": "Your AI-powered personalized news.",
        "projects.p2.desc": "AI-powered personalized news aggregator offering real-time updates from top global sources, filtered based on user interests.",
        "projects.p3.title": "Agricultural Plan Optimization",
        "projects.p3.short": "AI-based sustainable agriculture.",
        "projects.p3.desc": "AI project to optimize agricultural production in Algeria using graph search and constraint satisfaction algorithms.",
        "projects.p4.title": "G-Jobs",
        "projects.p4.short": "Smart job platform in Algeria.",
        "projects.p4.desc": "A smart platform connecting Algerian job seekers with employers through advanced filters, messaging, and job tracking tools.",
        "projects.p5.title": "Advanced Search Engine",
        "projects.p5.short": "Text search with TF-IDF & BM25.",
        "projects.p5.desc": "Java-based search engine using TF-IDF and BM25 to index, analyze, and accurately rank text documents.",
        "projects.p6.title": "Restaurant Chain",
        "projects.p6.short": "Multi-location restaurant management.",
        "projects.p6.desc": "Management system for a multi-country restaurant chain, enabling organized booking, inventory, and staff control.",
        "projects.p7.title": "My Online Supermarket",
        "projects.p7.short": "Smart CLI-based supermarket system.",
        "projects.p7.desc": "A command-line application for digitizing supermarket management: suppliers, stock, sales, reports, and statistics.",
        "projects.p8.title": "Road Network Analysis (MAP)",
        "projects.p8.short": "Advanced graph algorithms.",
        "projects.p8.desc": "Graph-based road network analysis in Avignon using algorithms for shortest paths, connectivity, and performance.",
        "projects.p0.title": "AI Website Generator",
        "projects.p0.short": "Generate websites from a prompt.",
        "projects.p0.desc": "Builds functional websites from natural language instructions using LLMs. Stack: Python, OpenAI API, Web automation.",

        "projects.p9.title": "LeRobot PushT Trainer",
        "projects.p9.short": "Train/evaluate PushT policies.",
        "projects.p9.desc": "Web app to train/evaluate PushT policies. Supports checkpoints and push to Hugging Face. Stack: Python, LeRobot, Gradio, CUDA.",

        "projects.p10.title": "Robot Vision Simulator",
        "projects.p10.short": "Interactive robot vision simulator.",
        "projects.p10.desc": "Browser simulator: grid nav, pick/place, natural‑language commands. COCO‑SSD vision, A* pathfinding. Stack: JS/Canvas, TF.js.",
        "profile.heading": "About Me",
        "profile.greeting": "Hello, I'm Meftah Zineb.",
        "profile.text1": "A computer science student passionate about AI applied to robotics and backend development, I design intelligent systems combining LLM, deep learning and web automation.",
        "profile.text2": "My projects implement OpenAI models, interactive simulators, and complete end-to-end solutions.",
        "profile.more": "Learn more about my journey",

        // --- Skills (Compétences) ---
        "competences.heading": "Skills",

        // Web Development
        "competences.web": "🧑‍💻 Web Development",
        "competences.web.frontend": "Frontend: HTML, CSS, JavaScript, Bootstrap, AJAX, TensorFlow.js, HTML5 Canvas",
        "competences.web.backend": "Backend: Node.js, PHP, Python (Flask, Django), REST API, SQL",
        "competences.web.fullstack": "Full-Stack: Laravel, React, Django, Flask",
        "competences.web.database": "Databases: MySQL, PostgreSQL",
        "competences.web.security": "Web Security: Sessions, Cookies, CSRF, URL Rewriting",
        "competences.web.tools": "Related Tools: Git, GitHub, GitHub Actions, Makefile",

        // Data Science & AI
        "competences.data": "🤖 Data Science & Artificial Intelligence",
        "competences.data.tools": "Languages & Tools: Python, PyTorch, OpenAI API, Hugging Face, Scikit-learn, Pandas",
        "competences.data.models": "Models & Techniques: LLM, Fine-tuning, Diffusion Models, Reinforcement Learning, Classification, Synthetic Data Generation",
        "competences.data.apps": "AI Applications: Computer Vision, NLP, Tag Generation, AI-powered websites, Smart Recommendation",
        "competences.data.projects": "Notable Projects: LeRobot, AI Website Generator, News Wave, Automatic Tag Generation",
        "competences.data.extra": "Tools: Jupyter, Colab, Transformers, OpenAI Playground, TensorBoard, NumPy, Matplotlib",

        // Programming
        "competences.programming": "💻 Programming",
        "competences.programming.languages": "Languages: Python, C++, Java, PHP, JavaScript, Bash, SQL",
        "competences.programming.paradigms": "Paradigms: OOP, Functional, Business Logic",
        "competences.programming.experience": "Experience: Compilation, Graph Algorithms (Dijkstra, A*, BM25), CLI Scripting",
        "competences.programming.projects": "Projects: Pascal-like Compiler, Network Optimization, Search Engine, Supermarket CLI, Web Generation via LLM",

        // Soft Skills
        "competences.soft": "🤝 Interpersonal Skills",
        "competences.soft.list": "Autonomy, teamwork, clear communication, leadership (GDSC, AYLP), problem-solving, fast learning, technical rigor, project management",

        // Extra Skills
        "competences.extra": "🧩 Extra Skills",
        "competences.extra.cognitive": "Cognitive: algorithmic thinking, critical mind, modeling",
        "competences.extra.techniques": "Technical: REST API, WebSockets, CI/CD, Git workflows",
        "competences.extra.learning": "Learning: tech watch, AI frameworks",
        "competences.extra.presentation": "Communication: popularization, technical writing, presentations",
        "competences.extra.methods": "Methodologies: agile, GitHub Flow, modular design, reusability",
        "competences.techSkills": "Technical Skills",
        "competences.aiDataSkills": "AI & Data Science",
        "competences.softSkillsTitle": "Personal Skills",
        "competences.artificialIntelligence": "Artificial Intelligence",
        "competences.dataScience": "Data Science",
        "competences.programming": "Programming",
        "competences.web": "Web Development",
        "competences.languages": "Languages",
        "competences.paradigms": "Paradigms",
        "competences.frontend": "Frontend",
        "competences.backend": "Backend",
        "competences.databases": "Databases",
        "competences.tools": "Tools",
        "competences.aiModels": "Models & Techniques",
        "competences.aiTools": "AI Tools",
        "competences.dataAnalysis": "Analysis & Manipulation",
        "competences.dataProjects": "Notable Projects",
        "competences.project1": "Synthetic data generation for fine-tuning",
        "competences.project2": "Search engine with TF-IDF & BM25",
        "competences.teamwork": "Teamwork",
        "competences.leadership": "Leadership",
        "competences.problemSolving": "Problem Solving",
        "competences.continuousLearning": "Continuous Learning",
        "competences.teamworkDesc": "Effective collaboration, clear communication, team spirit",
        "competences.leadershipDesc": "GDSC experience, mentoring, collaborative project management",
        "competences.problemSolvingDesc": "Analytical thinking, systematic approach, creative solutions",
        "competences.continuousLearningDesc": "Technology watch, quick adaptation, self-learning",
          "certs.heading": "Certificates",
  "certs.pytorch.title": "Introduction to Deep Learning with PyTorch – DataCamp",
  "certs.pytorch.desc": "Online training on neural networks and using PyTorch.",
  "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
  "certs.aylp.desc": "Exchange program focused on leadership, innovation, and cross-cultural collaboration.",
  "certs.eplus.title": "English Level – E-Plus Center",
  "certs.eplus.desc": "Certificate of English proficiency.",
  "certs.fcc.title": "Responsive Web Design – freeCodeCamp",
  "certs.fcc.desc": "Certificate covering HTML, CSS, Flexbox, and responsive design.",
  "certs.cta": "View Certificate",

  // Languages section (HTML uses 'langues.*' keys)
  "langues.heading": "Languages",
  "langues.french": "French",
  "langues.frenchlevel": "Intermediate (B2)",
  "langues.frenchCert": "View certificate",
  "langues.english": "English",
  "langues.englishlevel": "Fluent",
  "langues.englishCert": "View certificate",
  "langues.arabic": "Arabic",
  "langues.arabicLevel": "Native",
  "footer.copy": "© 2025 Zineb Meftah. All rights reserved.",
  "formation.bac": "Scientific Baccalaureate — Abd-El-Kader El-Yajouri High School, Guemar (Algeria)",
  "formation.bacDiplome": "<strong>Honors:</strong> Excellent — Average 17.82 (Scientific stream)",
  "formation.bacCert": "View BAC certificate",
  "formation.bacTranscript": "View grade transcripts",
  "chat.open": "Chat",
  "chat.title": "Portfolio Assistant",
  "chat.placeholder": "Ask a question...",
  "chat.send": "Send",
  "chat.note": "Answers based on portfolio content."
      },
      ar: {
        "profile.heading": "نبذة عني",
        "experience.card4.item1": "هاكاثون الذكاء الاصطناعي أفينيون (24 ساعة، 2024)",
        "experience.card4.item2": "مرشدة مبتدئة – GDSC (2023)",
        "experience.card4.item3": "مشروع مؤطر G‑JOBS (2024): المهام، Git، المراجعة",
        "page.title": "المعرض - مفتاح زينب",
        "nav.title": "مفتاح زينب",
        "header.title": "مفتاح زينب",
        "contact.heading": "الاتصال",
        "info.telephone": "☎ الهاتف",
        "info.email": "✉ البريد الإلكتروني",
        "info.linkedin": "🔗 لينكد إن",
        "info.portfolio": "🌐 الموقع الشخصي",
        "info.github": "🐙 جيتهاب",
        "info.huggingface": "🤖 هاجينغ فايس",
        "header.subtitle": "مهندس الذكاء الاصطناعي المستقبلي | التعلم العميق | التعلم الآلي | مطور كامل الحزمة",
        "nav.contact": "اتصل",
        "nav.profil": "نبذة",
        "nav.formation": "التعليم",
        "nav.publications": "المنشورات",
        "nav.projects": "المشاريع",
        "nav.competences": "المهارات",
        "nav.langues": "اللغات",
        "nav.experience": "الخبرة",
        "profil.heading": "نبذة عني",
        "profil.greeting": "مرحبًا، أنا مفتاح زينب.",
        "profil.bio1": "أنا مهندسة رقمية ومبتعة شغوفة أدمج الذكاء الاصطناعي مع فن التطوير لإنشاء حلول ثورية تعيد تعريف المستقبل.",
        "profil.bio2": "مستكشفة لأحدث الخوارزميات وساعية دومًا وراء أفكار جديدة، كل مشروع هو مغامرة نحو الابتكار.",
        "formation.heading": "التعليم والشهادات",
        "formation.ensia": "ENSIA، الجزائر",
        "formation.ensiaDiplome": "<strong>الشهادة:</strong> هندسة الذكاء الاصطناعي (السنة الأولى والثانية)",
        "formation.ensiaCert": "عرض الشهادة",
        "formation.avignon": "جامعة أفينيون (CERI)، فرنسا",
        "formation.avignonDiplome": "<strong>الشهادة:</strong> علوم البيانات (السنة الثالثة جارية، نتائج ممتازة)",
        "formation.avignonCert": "عرض الشهادة",
        "publications.heading": "المنشورات",
        "publication.date": "📅 20 ديسمبر 2024",
        "publication.location": "📍 Hugging Face",
        "publication.description": "اكتشف نهجنا الثوري الذي يستخدم الضبط العكسي لتوليد بيانات تركيبية. صممت هذه البيانات لاستخراج الكلمات الرئيسية الدقيقة وتدريب نماذج توليد العلامات بكفاءة عالية.",
        "publication.cta": "اقرأ المقال الكامل",
        "publication.tableTitle": "عينة قاعدة البيانات",
        "projects.heading": "المشاريع والخبرة",
        "projects.product.title": "تخصيص المنتجات بالذكاء الاصطناعي",
        "projects.product.description": "حوّل أفكارك إلى منتجات مخصصة باستخدام الذكاء الاصطناعي.",
        "projects.product.details": "نظام يسمح للمستخدمين بتحويل أفكارهم إلى منتجات مخصصة عبر نماذج ذكاء اصطناعي مع إمكانية إنتاجها.",
        "projects.newswave.title": "News Wave",
        "projects.newswave.description": "موجز أخبار شخصي مدعوم بالذكاء الاصطناعي.",
        "projects.newswave.details": "تطبيق يجلب لك آخر الأخبار من مصادر موثوقة ويخصصها حسب اهتماماتك باستخدام الذكاء الاصطناعي.",
        "projects.agriopt.title": "تحسين الخطة الزراعية",
        "projects.agriopt.description": "زراعة ذكية باستخدام الذكاء الاصطناعي.",
        "projects.agriopt.details": "مشروع لتحسين الإنتاج الزراعي في الجزائر باستخدام خوارزميات البحث والقيود لتحقيق الاكتفاء الذاتي.",
        "projects.gjobs.title": "G-Jobs",
        "projects.gjobs.description": "أفضل منصة توظيف في الجزائر.",
        "projects.gjobs.details": "منصة توظيف ذكية تربط بين الباحثين عن عمل وأرباب العمل الجزائريين، وتوفر فلاتر متقدمة ورسائل وأدوات تتبع.",
        "projects.searchengine.title": "محرك بحث متقدم",
        "projects.searchengine.description": "تحسين استرجاع النصوص باستخدام TF-IDF وBM25.",
        "projects.searchengine.details": "محرك بحث مطور بلغة Java يستخدم نماذج TF-IDF وBM25 لمعالجة وترتيب الوثائق النصية بكفاءة.",
        "projects.restaurant.title": "سلسلة مطاعم",
        "projects.restaurant.description": "نظام إدارة للمطاعم متعددة الفروع.",
        "projects.restaurant.details": "نظام إداري لسلسلة مطاعم عبر دول متعددة، يشمل إدارة الوقت والمكان.",
        "projects.supermarket.title": "سوبرماركت رقمي",
        "projects.supermarket.description": "نظام ذكي لإدارة السوبرماركت.",
        "projects.supermarket.details": "تطبيق سطر أوامر لإدارة السوبرماركت يشمل الموردين والمخزون والمبيعات والتقارير.",
        "projects.roadmap.title": "تحليل شبكة الطرق",
        "projects.roadmap.description": "خوارزميات متقدمة وتحليل بياني.",
        "projects.roadmap.details": "مشروع لتحليل شبكات الطرق باستخدام الرسوم البيانية، يتضمن حساب أقصر الطرق والتحقق من الاتصال وتحسين الشبكات.",
        "projects.p0.title": "مولد مواقع الويب بالذكاء الاصطناعي",
        "projects.p0.short": "إنشاء مواقع ويب من توجيهات نصية.",
        "projects.p0.desc": "إنشاء نظام يولد مواقع ويب فعالة من تعليمات بلغة طبيعية باستخدام نماذج LLM. التقنيات: Python، OpenAI API، أتمتة الويب.",

        "projects.p1.title": "تخصيص المنتجات بالذكاء الاصطناعي",
        "projects.p1.short": "حول أفكارك إلى منتجات مخصصة.",
        "projects.p1.desc": "نظام يمكن المستخدمين من تحويل أفكارهم إلى منتجات مخصصة باستخدام نماذج الذكاء الاصطناعي، مع انتقال سلس إلى الإنتاج.",

        "projects.p2.title": "News Wave",
        "projects.p2.short": "أخبارك الشخصية المدعومة بالذكاء الاصطناعي.",
        "projects.p2.desc": "مُجمِّع أخبار مخصص بالذكاء الاصطناعي يوفر تحديثات في الوقت الفعيل من أهم المصادر العالمية، مصفاة حسب اهتمامات المستخدم.",

        "projects.p3.title": "تحسين الخطة الزراعية",
        "projects.p3.short": "زراعة مستدامة قائمة على الذكاء الاصطناعي.",
        "projects.p3.desc": "مشروع ذكاء اصطناعي لتحسين الإنتاج الزراعي في الجزائر باستخدام خوارزميات البحث في الرسوم البيانية وإرضاء القيود.",

        "projects.p4.title": "G-Jobs",
        "projects.p4.short": "منصة توظيف ذكية في الجزائر.",
        "projects.p4.desc": "منصة ذكية تربط الباحثين عن عمل الجزائريين بأصحاب العمل من خلال فلاتر متقدمة والمراسلة وأدوات تتبع الوظائف.",

        "projects.p5.title": "محرك بحث متقدم",
        "projects.p5.short": "بحث نصي مع TF-IDF & BM25.",
        "projects.p5.desc": "محرك بحث قائم على Java يستخدم TF-IDF و BM25 لفهرسة وتحليل وترتيب المستندات النصية بدقة.",

        "projects.p6.title": "سلسلة مطاعم",
        "projects.p6.short": "إدارة مطاعم متعددة المواقع.",
        "projects.p6.desc": "نظام إدارة لسلسلة مطاعم متعددة البلدان، يتيح الحجز المنظم والمخزون والتحكم في الموظفين.",

        "projects.p7.title": "سوبرماركت الإنترنت الخاص بي",
        "projects.p7.short": "نظام سوبرماركت ذكي قائم على CLI.",
        "projects.p7.desc": "تطبيق سطر أوامر لرقمنة إدارة السوبرماركت: الموردين، المخزون، المبيعات، التقارير والإحصائيات.",

        "projects.p8.title": "تحليل شبكة الطرق (MAP)",
        "projects.p8.short": "خوارزميات الرسوم البيانية المتقدمة.",
        "projects.p8.desc": "تحليل شبكة الطرق القائم على الرسوم البيانية في أفينيون باستخدام خوارزميات لأقصر المسارات والاتصال والأداء.",

        "projects.p9.title": "مدرب LeRobot PushT",
        "projects.p9.short": "تدريب/تقييم سياسات PushT.",
        "projects.p9.desc": "تطبيق ويب لتدريب وتقييم سياسات PushT. يدعم نقاط التفتيش والنشر على Hugging Face. التقنيات: Python، LeRobot، Gradio، CUDA.",

        "projects.p10.title": "محاكي رؤية الروبوت",
        "projects.p10.short": "محاكي تفاعلي لرؤية الروبوت.",
        "projects.p10.desc": "محاكي متصفح: تنقل على شبكة، التقاط/وضع والأوامر بلغة طبيعية. رؤية COCO‑SSD، خوارزمية A* للمسار. التقنيات: JS/Canvas، TF.js.",

        // Add missing Arabic translations for profile section
        "profile.greeting": "مرحباً، أنا مفتاح زينب.",
        "profile.text1": "طالبة علوم الحاسوب شغوفة بالذكاء الاصطناعي المطبق على الروبوتات وتطوير الخدمات الخلفية، أقوم بتصميم أنظمة ذكية تجمع بين نماذج اللغة الكبيرة والتعلم العميق وأتمتة الويب.",
        "profile.text2": "تنفذ مشاريعي نماذج OpenAI، ومحاكيات تفاعلية، وحلول شاملة من البداية إلى النهاية.",
        "profile.more": "تعرف أكثر على مسيرتي",

        // Add missing Arabic translations for certificates section
        "certs.heading": "الشهادات",
        "certs.pytorch.title": "مقدمة في التعلم العميق مع PyTorch - DataCamp",
        "certs.pytorch.desc": "تدريب عبر الإنترنت حول الشبكات العصبية واستخدام PyTorch.",
        "certs.aylp.title": "برنامج القيادة الشبابية الجزائري - مركز شمال نيفادا الدولي",
        "certs.aylp.desc": "برنامج تبادل يركز على القيادة والابتكار والتعاون بين الثقافات.",
        "certs.eplus.title": "مستوى اللغة الإنجليزية - مركز E-Plus",
        "certs.eplus.desc": "شهادة كفاءة في اللغة الإنجليزية.",
        "certs.fcc.title": "شهادة تصميم الويب المتجاوب - freeCodeCamp",
        "certs.fcc.desc": "شهادة تركز على أساسيات HTML و CSS و Flexbox والتصميم المتجاوب.",
        "certs.cta": "عرض الشهادة",
  // Project links & hover
  "projects.hover": "مرّر أو انقر لعرض التفاصيل",
  "projects.link": "عرض الكود على GitHub",
  "projects.link.instagram": "عرض الصفحة على إنستغرام",
  "projects.link.demo": "عرض العرض التوضيحي",
  "projects.link.modelRepo": "مستودع النموذج",
  "projects.link.demoSpace": "مساحة العرض",
  "projects.link.githubRepo": "مستودع GitHub",
  "projects.link.liveDemo": "عرض مباشر",

  // Experience & leadership (complete set)
  "experience.heading": "الخبرة والقيادة",
  "experience.card1.title": "مسؤولة تقنية المعلومات",
  "experience.card1.detail": "نادي مطوري Google – ENSIA (2023–2024)",
  "experience.card2.title": "مشاركة في AYLP",
  "experience.card2.detail": "المركز الدولي لشمال نيفادا (2021) – برنامج القيادة للشباب الجزائري",
  "experience.card2.cert": "عرض الشهادة",
  "experience.card3.title": "منظِّمة فعاليات",
  "experience.card3.detail": "هاكاثونات، ذكاء اصطناعي، تطوير الويب",
  "experience.card4.title": "إنجازات أخرى",
  "experience.card4.detail": "المشاركة في عدة هاكاثونات ومشاريع تعاونية للابتكار والتميز.",

  // Languages section
  "langues.heading": "اللغات",
  "langues.french": "الفرنسية",
  "langues.frenchlevel": "متوسط (B2)",
  "langues.frenchCert": "عرض الشهادة",
  "langues.english": "الإنجليزية",
  "langues.englishlevel": "طلاقة",
  "langues.englishCert": "عرض الشهادة",
  "langues.arabic": "العربية",
  "langues.arabicLevel": "اللغة الأم",

  // Competences (summary titles + common items)
  "competences.heading": "المهارات",
  "competences.techSkills": "المهارات التقنية",
  "competences.aiDataSkills": "الذكاء الاصطناعي وعلوم البيانات",
  "competences.softSkillsTitle": "المهارات الشخصية",
  "competences.artificialIntelligence": "الذكاء الاصطناعي",
  "competences.dataScience": "علوم البيانات",
  "competences.programming": "البرمجة",
  "competences.web": "تطوير الويب",
  "competences.languages": "اللغات",
  "competences.paradigms": "الأنماط",
  "competences.frontend": "الواجهة الأمامية",
  "competences.backend": "الواجهة الخلفية",
  "competences.databases": "قواعد البيانات",
  "competences.tools": "الأدوات",
  "competences.aiModels": "النماذج والتقنيات",
  "competences.aiTools": "أدوات الذكاء الاصطناعي",
  "competences.dataAnalysis": "التحليل والمعالجة",
  "competences.dataProjects": "مشاريع بارزة",
  "competences.project1": "توليد بيانات تركيبية للتدريب الدقيق",
  "competences.project2": "محرك بحث باستخدام TF-IDF وBM25",
  "competences.teamwork": "العمل الجماعي",
  "competences.leadership": "القيادة",
  "competences.problemSolving": "حل المشكلات",
  "competences.continuousLearning": "التعلّم المستمر",
  "competences.teamworkDesc": "تعاون فعّال، تواصل واضح، روح الفريق",
  "competences.leadershipDesc": "خبرة GDSC، إرشاد، إدارة مشاريع تعاونية",
  "competences.problemSolvingDesc": "تفكير تحليلي، نهج منهجي، حلول مبتكرة",
  "competences.continuousLearningDesc": "متابعة تقنية، تكيّف سريع، تعلّم ذاتي",

  // Detailed skill lines (match your UI text)
  "competences.web.frontend": "الواجهة الأمامية: HTML، CSS، JavaScript، Bootstrap، AJAX، TensorFlow.js، HTML5 Canvas",
  "competences.web.backend": "الواجهة الخلفية: Node.js، PHP، Python (Flask، Django)، REST API، SQL",
  "competences.web.fullstack": "كامل المكدس: Laravel، React، Django، Flask",
  "competences.web.database": "قواعد البيانات: MySQL، PostgreSQL",
  "competences.web.security": "أمن الويب: الجلسات، الكوكيز، CSRF، إعادة كتابة الروابط",
  "competences.web.tools": "أدوات مرتبطة: Git، GitHub، GitHub Actions، Makefile",

  "competences.data.tools": "اللغات والأدوات: Python، PyTorch، OpenAI API، Hugging Face، Scikit-learn، Pandas",
  "competences.data.models": "النماذج والتقنيات: LLM، الضبط الدقيق، نماذج الانتشار، التعلم المعزز، التصنيف، توليد البيانات التركيبية",
  "competences.data.apps": "تطبيقات الذكاء الاصطناعي: رؤية حاسوبية، معالجة لغة طبيعية، توليد الوسوم، مواقع مدعومة بالذكاء الاصطناعي، توصية ذكية",
  "competences.data.projects": "مشاريع بارزة: LeRobot، مولد مواقع بالذكاء الاصطناعي، News Wave، توليد تلقائي للوسوم",
  "competences.data.extra": "أدوات: Jupyter، Colab، Transformers، OpenAI Playground، TensorBoard، NumPy، Matplotlib",

  "competences.programming.languages": "اللغات: Python، C++، Java، PHP، JavaScript، Bash، SQL",
  "competences.programming.paradigms": "الأنماط: كائنية، وظيفية، منطق الأعمال",
  "competences.programming.experience": "الخبرات: ترجمة، خوارزميات الرسوم البيانية (ديكسترا، A*، BM25)، سكربتات CLI",
  "competences.programming.projects": "المشاريع: مترجم شبيه بـ Pascal، تحسين الشبكات، محرك بحث، سوبرماركت CLI، توليد الويب عبر LLM",
  "footer.copy": "© 2025 مفتاح زينب. جميع الحقوق محفوظة.",
  "formation.bac": "بكالوريا علوم تجريبية — ثانوية عبد القادر الياجوري، قمار (الجزائر)",
  "formation.bacDiplome": "<strong>التقدير:</strong> ممتاز — معدل 17.82 (شعبة علوم تجريبية)",
  "formation.bacCert": "عرض شهادة البكالوريا",
  "formation.bacTranscript": "عرض كشف النقاط",
  "chat.open": "محادثة",
  "chat.title": "مساعد السيرة",
  "chat.placeholder": "اسأل سؤالاً...",
  "chat.send": "إرسال",
  "chat.note": "الإجابات مبنية على محتوى الموقع."
      },
    };
    
    // --- Mobile Language Dropdown ---
    const mobileLangButton = document.querySelector('.mobile-lang-button');
    const mobileLangOptions = document.querySelector('.mobile-lang-options');
    const mobileLangButtons = document.querySelectorAll('.mobile-lang-options button');
    
    if (mobileLangButton && mobileLangOptions) {
        mobileLangButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileLangOptions.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
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
            
            // Update mobile button text
            const langNames = { fr: 'Français', en: 'English', ar: 'العربية' };
            if (mobileLangButton) {
                const currentLangSpan = mobileLangButton.querySelector('.current-lang');
                if (currentLangSpan) {
                    currentLangSpan.textContent = langNames[selectedLang] || selectedLang.toUpperCase();
                }
            }
            
            // Close dropdown
            if (mobileLangOptions) {
                mobileLangOptions.classList.remove('active');
            }
        });
    });

    // --- Translation Function ---
    function translatePage(lang) {
      const html = document.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

      // --- Reset projects scroller to the visual start ---
      const scrollers = document.querySelectorAll('.projects-scroll');
      scrollers.forEach((el) => {
        const prevBehavior = el.style.scrollBehavior;
        el.style.scrollBehavior = 'auto'; // no animation on jump

        const applyPosition = () => {
          const max = el.scrollWidth - el.clientWidth;
          // LTR => show first card at left edge; RTL => show first card at right edge
          el.scrollLeft = (lang === 'ar') ? max : 0;
          el.style.scrollBehavior = prevBehavior || '';
        };

        // Clear any stale position first
        el.scrollLeft = 0;

        // Double RAF: wait for layout to update after dir change, then measure & set
        requestAnimationFrame(() => {
          requestAnimationFrame(applyPosition);
        });
      });


      const translatableElements = document.querySelectorAll('[data-translate]');
      const dict = translations[lang] || {};
        
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

        // Special handling for specific sections that have nested content
        // Certificates section
        document.querySelectorAll('[data-translate="certs.heading"]').forEach(el => {
          if (dict["certs.heading"]) {
            el.textContent = dict["certs.heading"];
          }
        });
        
        // Project cards - force update titles and descriptions
        document.querySelectorAll('.flip-card-front h3, .flip-card-back h3').forEach(el => {
          const key = el.getAttribute('data-translate');
          if (key && dict[key]) {
            el.textContent = dict[key];
          }
        });
        
        document.querySelectorAll('.flip-card-front p, .flip-card-back p').forEach(el => {
          const key = el.getAttribute('data-translate');
          if (key && dict[key]) {
            el.textContent = dict[key];
          }
        });
        
        // Experience cards
        document.querySelectorAll('.experience-card h3').forEach(el => {
          const key = el.getAttribute('data-translate');
          if (key && dict[key]) {
            el.textContent = dict[key];
          }
        });
        
        // Experience card details (paragraphs)
        document.querySelectorAll('.experience-details p').forEach(el => {
          const key = el.getAttribute('data-translate');
          if (key && dict[key]) {
            el.textContent = dict[key];
          }
        });
        
        // Experience card highlight list items
        document.querySelectorAll('.xp-highlights li').forEach(el => {
          const key = el.getAttribute('data-translate');
          if (key && dict[key]) {
            el.textContent = dict[key];
          }
        });
        
        // Languages section
        document.querySelectorAll('.language-card h3, .language-card p span').forEach(el => {
          const key = el.getAttribute('data-translate');
          if (key && dict[key]) {
            el.textContent = dict[key];
          }
        });

        // Update <title>
        if (dict["page.title"]) {
          document.title = dict["page.title"];
        }

        // Update pressed state on language buttons (both desktop and mobile)
        document.querySelectorAll('.lang-switcher button[data-lang], .mobile-lang-options button[data-lang]').forEach(b => {
          b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
        });

        // Update mobile language button text
        const langNames = { fr: 'Français', en: 'English', ar: 'العربية' };
        const mobileLangButton = document.querySelector('.mobile-lang-button .current-lang');
        if (mobileLangButton) {
            mobileLangButton.textContent = langNames[lang] || lang.toUpperCase();
        }

        // Persist selection
        try { localStorage.setItem('lang', lang); } catch {}
    }
  
    // --- Initialize translations on page load (restore saved or default to French) ---
    const savedLang = (() => {
      try { return localStorage.getItem('lang'); } catch { return null; }
    })();
    translatePage(savedLang || "fr");
  
    // --- Language Switcher (Desktop) ---
    const langButtons = document.querySelectorAll(".lang-switcher button");
    langButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // avoid the outside-click closer interfering
        const selectedLang = btn.getAttribute("data-lang");
        translatePage(selectedLang);

        // Close the desktop dropdown
        if (langSwitcher) {
          langSwitcher.classList.remove("open");
        }
      });
    });
  
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
  
    const scrollIndicator = document.getElementById("scrollIndicator");
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        const firstSection = document.querySelector("main section");
        if (firstSection) {
          window.scrollTo({
            top: firstSection.offsetTop - 60,
            behavior: "smooth"
          });
        }
      });
    }
  
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
      });
    }

    // Animate competence cards and their progress bars when they scroll into view
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserverOptions = { threshold: 0.5 };

    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add 'in-view' class to trigger scaling animation
          entry.target.classList.add('in-view');
          // Animate each progress bar from 0 to its target value (stored in the inline --progress variable)
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach(pb => {
            // Get the target width from the inline style property --progress
            const targetWidth = getComputedStyle(pb).getPropertyValue('--progress');
            pb.style.width = targetWidth;
          });
          // Once animated, unobserve to prevent re-triggering
          observer.unobserve(entry.target);
        }
      });
    }, skillObserverOptions);

    skillCards.forEach(card => {
      skillObserver.observe(card);
    });

    const languageCards = document.querySelectorAll('.language-card');
    const languageObserverOptions = { threshold: 0.5 };
    const languageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          const progressBar = entry.target.querySelector('.language-progress');
          if (progressBar) {
            const targetWidth = getComputedStyle(progressBar).getPropertyValue('--progress');
            progressBar.style.width = targetWidth;
          }
          observer.unobserve(entry.target);
        }
      });
    }, languageObserverOptions);
    
    languageCards.forEach(card => {
      languageObserver.observe(card);
    });

    // Hide-on-scroll (desktop + mobile)
    let lastScrollY = window.scrollY || 0;
    const navEl = document.querySelector('nav[role="navigation"]');
    const SCROLL_DELTA = 6;          // small threshold to avoid jitter
    const MIN_SHOW_EDGE = 0;         // always show when at very top

    function handleScroll() {
      const y = window.scrollY || 0;
      if (!navEl) return;

      if (y <= MIN_SHOW_EDGE) {
        // Always show navbar at the top of the page
        navEl.classList.remove('nav-hidden');
      } else if (y > lastScrollY + SCROLL_DELTA) {
        // Scrolling DOWN: hide nav
        navEl.classList.add('nav-hidden');
      } else if (y < lastScrollY - SCROLL_DELTA) {
        // Scrolling UP: show nav
        navEl.classList.remove('nav-hidden');
      }
      lastScrollY = y;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Add click/keyboard handlers for flip cards (mobile & non-hover support)
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
      // Make the whole card focusable and button-like (a11y)
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');

      // Only use click on devices where hover is not available (phones/tablets)
      const shouldUseClick =
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(pointer: coarse)').matches;

      if (shouldUseClick) {
        card.addEventListener('click', (e) => {
          // Don't toggle if the user clicked a link inside the card
          if (e.target.closest('a')) return;

          const isFlipped = card.classList.toggle('flipped');
          card.setAttribute('aria-pressed', String(isFlipped));
        });
      }

      // Keyboard accessibility (works everywhere)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // avoid page scroll on Space
          const isFlipped = card.classList.toggle('flipped');
          card.setAttribute('aria-pressed', String(isFlipped));
        }
      });
    });  

  
});

