document.addEventListener("DOMContentLoaded", () => {
  // 0. Shared state
  const CHAT_ENDPOINT = "https://portfolio-chat.zinebmeftah.workers.dev";
  const SUPPORTED_LANGS = ["fr", "en", "ar"];
  const DEFAULT_LANG = "fr";
  let currentLang = DEFAULT_LANG;

  // Assigned by the chat widget below; no-ops when the widget is absent.
  let greetOnce = () => {};
  let refreshChatGreeting = () => {};

  // Translation lookup. Safe once translatePage() has run.
  function t(key) {
    const dict = translations[currentLang] || translations[DEFAULT_LANG] || {};
    return dict[key] != null ? dict[key] : (translations[DEFAULT_LANG] || {})[key] || "";
  }

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
      return div;
    };

    // The greeting has to follow the language the visitor picked.
    let greeting = null;
    greetOnce = () => {
      greeting = append(t("chat.greeting"), "bot");
    };
    refreshChatGreeting = () => {
      if (greeting) greeting.textContent = t("chat.greeting");
      chatInput.setAttribute("aria-label", t("chat.placeholder"));
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

      const pending = append(t("chat.thinking"), "bot pending");
      const submitBtn = chatForm.querySelector("button[type=submit]");
      if (submitBtn) submitBtn.disabled = true;

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        const res = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: q,
            lang: document.documentElement.getAttribute("lang") || "fr",
            context: buildContext()
          }),
          signal: controller.signal
        });
        clearTimeout(timeout);

        // A provider outage must never leak its error text into the page.
        const data = await res.json().catch(() => ({}));
        const answer = res.ok && typeof data.answer === "string" ? data.answer.trim() : "";
        pending.remove();
        append(answer || t("chat.unavailable"), answer ? "bot" : "bot error");
      } catch (err) {
        pending.remove();
        append(t("chat.unavailable"), "bot error");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

  }

  // 4. Translations Data
const translations = {
    fr: {
      // ... (Keep previous translations the same) ...
      "page.title": "Portfolio - Zineb MEFTAH",
      "nav.title": "Zineb MEFTAH",
      "header.title": "Zineb MEFTAH",
      "header.subtitle": "Je conçois des systèmes IA autonomes, déployés en production.",
      "header.tagline": "Double compétence : ingénierie logicielle + IA · MLOps · Deep Learning",
      "hero.chip0": "Double profil : Ingénierie + IA", "hero.chip1": "Major de promotion · 1ʳᵉ/126", "hero.chip2": "IA en production @ GE HealthCare", "hero.chip3": "Anglais C2 · LanguageCert",
      "hero.ctaCV": "⬇ Télécharger mon CV", "hero.ctaLetter": "⬇ Lettre de motivation", "hero.ctaProjects": "Voir mes projets", "hero.ctaContact": "Me contacter",
      "stat.rank": "Major de promotion L2 & L3", "stat.avg": "Moyenne générale", "stat.english": "Anglais · LanguageCert (Ofqual)", "stat.prod": "Systèmes IA @ GE HealthCare",
      "badge.production": "Production",
      
      // Nav
      "nav.contact": "Contact", "nav.profil": "Profil", "nav.formation": "Formation",
      "nav.publications": "Publications", "nav.projects": "Projets", "nav.competences": "Compétences",
      "nav.langues": "Langues", "nav.experience": "Expérience", "nav.skip": "Aller au contenu",

      // Contact
      "info.telephone": "☎ Téléphone", "info.location": "📍 Localisation", "info.email": "✉ Email", "info.linkedin": "🔗 LinkedIn", "info.portfolio": "🌐 Portfolio", "info.github": "🐙 GitHub", "info.huggingface": "🤖 Hugging Face",
      "info.alternance": "🎯 Recruteurs", "info.alternanceLink": "Page dédiée : alternance / CDI / CDD",

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
      "profile.greeting": "Bonjour, je suis Zineb MEFTAH.",
      "profile.text1": "Major de promotion en L2 et L3 à l’Université d’Avignon (1ʳᵉ sur 126, moyenne > 15/20), issue du cycle préparatoire d’élite de l’ENSIA à Alger. Ingénieure IA et MLOps, je conçois des agents RAG, des pipelines LLM et des systèmes autonomes, et je les emmène jusqu’à la production.",
      "profile.text2": "Chez GE HealthCare, j’ai livré un agent RAG qui répond en quelques secondes à des questions qui demandaient des heures de recherche documentaire. Je l’avais codé de bout en bout ; quand le coût en tokens est devenu le facteur limitant, je l’ai ré-architecturé en système multi-agents. C’est ce passage du prototype qui marche au système qui tient que je veux continuer à faire. Actuellement en Master 1 MLSD à l’Université Paris Cité, disponible en CDI, CDD ou alternance.",
      "profile.highlight": "Ce qui me distingue : une vraie rigueur d’ingénieure — code, backend, systèmes complexes — mise au service de l’IA, pour livrer des solutions qui tiennent une fois déployées.",

      // FORMATION
      "formation.paris.title": "Université Paris Cité, France",
      "formation.paris.desc": "<strong>Master 1 MLSD</strong> — Machine Learning pour la Science des Données, réalisable en alternance. L’une des formations en IA les plus reconnues.",
      "formation.ensia.title": "ENSIA, Algérie",
      "formation.ensia.desc": "<strong>Cycle préparatoire d’élite en IA</strong> — école nationale ultra-sélective, cursus entièrement en anglais. 1ʳᵉ et 2ᵉ années validées (120 ECTS, Mention Très Bien).",
      "formation.avignon.title": "Université d’Avignon (CERI), France",
      "formation.avignon.desc": "<strong>Licence Informatique — Parcours IA :</strong> Major de promotion L2 & L3 (1ʳᵉ sur 126), moyenne > 15/20.",
      "projects.stationf.title": "Agent d’Outreach IA · Production", "projects.stationf.short": "Système d’IA autonome déployé en production.", "projects.stationf.desc": "Pipeline d’IA entièrement autonome en production : qualification des offres par LLM, génération d’emails personnalisés, envoi SMTP, suivi IMAP et classification des réponses. Sept skills LLM orchestrées sur cron. Stack : Python, Claude API, Playwright, Google Cloud VM.",
      "projects.gerag.title": "Agent RAG · GE HealthCare", "projects.gerag.short": "Recherche documentaire en langage naturel.", "projects.gerag.desc": "Agent RAG en production chez GE HealthCare : interrogation de documentations techniques complexes en langage naturel, avec réponses sourcées, réduisant des recherches de plusieurs heures à quelques secondes. Codé de bout en bout, puis ré-architecturé en système multi-agents sur Copilot Studio.",
      "projects.content.title": "Moteur de Contenu Autonome · Multi-Plateformes", "projects.content.short": "Création & publication de contenu 100% automatisées.", "projects.content.desc": "Système autonome en boucle fermée qui crée et publie sur YouTube, TikTok, Instagram et Facebook. Deux volets : musique et influence, avec lien d’affiliation. Les workflows collectent vues et likes, puis republient le meilleur titre chaque semaine. Pilotage par simple email. Stack : n8n, AWS EC2.",
      "experience.ge.title": "GE HealthCare — Stagiaire IA & MLOps", "experience.ge.detail": "Stage Ingénierie IA & MLOps — Paris (2026). Agent RAG en production : pipeline d’abord codé de bout en bout (skills modulaires), puis ré-architecturé en système multi-agents sur Microsoft Copilot Studio (workflows et sous-agents) une fois le coût en tokens du pipeline linéaire devenu le facteur limitant — prétraitement maison conservé en amont, qualité et temps de traitement améliorés.",
      "formation.bac.title": "Baccalauréat Scientifique",
      "formation.bac.desc": "<strong>Mention :</strong> Excellent — Moyenne 17,82",
      "formation.bac.cert": "Voir attestation BAC",
      "formation.bac.transcript": "Voir relevés de notes",
      "dates.paris": "Depuis septembre 2026 · en cours",
      "formation.paris.cert": "Certificat de scolarité 2026/2027", "formation.avignon.cert": "Certificat d’obtention du diplôme", "experience.ge.cert": "Attestation de stage",
      "dates.ensia": "2022 - Juin 2024",
      "dates.avignon": "Septembre 2024 — Juin 2026 · obtenue",
      "common.viewDiploma": "Voir diplôme",
      "common.viewTranscript": "Relevé des résultats",

      // PUBLICATIONS
      "publication.date": "📅 20 décembre 2024",
      "publication.location": "📍 Hugging Face",
      "publication.description": "Article technique publié sur Hugging Face : une méthode de génération d’un jeu de données appariant mots-clés et articles, par fine-tuning inversé, pensée pour entraîner des modèles de génération de tags. Il détaille la construction du corpus, le contrôle qualité et les limites de l’approche.",
      "publication.cta": "Lire l’article complet",
      "publication.tableTitle": "Exemple de base de données",
      "publication.tableHint": "14 exemples du jeu de données — cliquez sur une ligne pour lire l’article complet.", "publication.modalTitle": "Article complet",
      "pub.keywords": "Mots-clés",
      "pub.articles": "Articles",

      // SKILLS
      "competences.aiDataSkills": "IA & Data Science", "competences.techSkills": "Compétences Techniques", "competences.softSkillsTitle": "Compétences Personnelles",
      "competences.artificialIntelligence": "Intelligence Artificielle", "competences.dataScience": "Data Science", "competences.programming": "Programmation & Systèmes", "competences.web": "Full-Stack Web",
      "competences.aiModels": "Techniques", "competences.aiTools": "Frameworks & Outils", "competences.dataAnalysis": "Analyse & Visualisation", "competences.dataProjects": "Concepts Clés",
      "competences.languages": "Langages", "competences.tools": "DevOps & Outils", "competences.backend": "Backend", "competences.frontend": "Frontend",
      "competences.writing": "Rédaction Scientifique", "competences.writingDesc": "Publication d’articles techniques (Hugging Face), documentation structurée.",
      "competences.teamwork": "Leadership & Teamwork", "competences.teamworkDesc": "Expérience GDSC, mentorat, gestion de projets agiles.",
      "competences.problemSolving": "Résolution de problèmes", "competences.problemSolvingDesc": "Approche algorithmique, optimisation de performance.",
      "competences.continuousLearning": "Apprentissage continu", "competences.continuousLearningDesc": "Veille technologique active (Papers with Code, arXiv).",
      "competences.project1": "Génération de données synthétiques", "competences.project2": "Clustering & Segmentation (K-Means)", "competences.project3": "Algorithmes de Graphes (A*, Dijkstra)", "competences.project4": "Fine-tuning",

      // LANGUAGES
      "langues.french": "Français", "langues.frenchlevel": "Avancé (C1)", "langues.frenchDetail": "Années universitaires validées en France",
      "langues.english": "Anglais", "langues.englishlevel": "Bilingue (C2)",
      "langues.arabic": "Arabe", "langues.arabicLevel": "Langue maternelle",

      // CERTIFICATES
      "certs.heading": "Certifications",
      "certs.english.title": "LanguageCert C2 — ESOL International (Ofqual)",
      "certs.english.desc": "Certification d’anglais niveau C2, régulée par l’Ofqual (PeopleCert), obtenue en février 2026.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Programme d’échanges axé sur le leadership.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch",
      "certs.pytorch.desc": "Formation en ligne sur les réseaux de neurones.",
      "certs.fcc.title": "Responsive Web Design",
      "certs.fcc.desc": "Certification axée sur les fondamentaux du HTML et du CSS.",
      "certs.cta": "Voir certificat",

      // EXPERIENCE
      "experience.card1.title": "Responsable informatique", "experience.card1.detail": "Google Developer Student Club ENSIA (2023–2024) — gestion de l’infrastructure, animation d’ateliers techniques et accompagnement des membres sur leurs projets.",
      "experience.card2.title": "Participant AYLP", "experience.card2.detail": "Northern Nevada International Center (2021) — Algerian Youth Leadership Program",
      "experience.card3.title": "Organisation d’événements", "experience.card3.detail": "Organisation de hackathons et d’ateliers en IA et développement web : logistique, mentorat et animation technique.",
      "experience.card4.title": "Autres Réalisations",
      "experience.card4.item1": "Hackathon IA Avignon (24h, 2025) — Tech Lead", "experience.card4.item2": "Mentor junior – GDSC (2023)", "experience.card4.item3": "Projet tutoré G‑JOBS (2024) : tâches, Git, review",

      // PROJECTS (UPDATED SECTION)
      "projects.hover": "Survolez ou cliquez pour voir les détails", "projects.link": "Voir le code", "projects.link.modelRepo": "Dépôt du modèle", "projects.link.demoSpace": "Espace de démo", "projects.link.viewCode": "Voir le code", "projects.link.githubRepo": "Dépôt GitHub", "projects.link.liveDemo": "Démo en ligne",
      "projects.p9.title": "LeRobot PushT Trainer", "projects.p9.short": "Entraînement de politiques robotiques.", "projects.p9.desc": "Pipeline MLOps complet pour l’entraînement de politiques de manipulation robotique (PushT) à partir de modèles de Diffusion. Intégration avec Hugging Face, accélération CUDA et visualisation via Gradio. Le dépôt du modèle et l’espace de démonstration sont publics.",
      "projects.cancer.title": "Détection du Cancer du Poumon", "projects.cancer.short": "Diagnostic médical par Deep Learning.", "projects.cancer.desc": "Classification de quatre types de carcinomes pulmonaires à partir d’imagerie CT. Un réseau de neurones convolutif et un perceptron multicouche sont implémentés puis comparés, afin d’étudier comment chacun traite les caractéristiques des images médicales. Stack : Python, PyTorch, Torchvision, scikit-learn.",
      "projects.p10.title": "Robot Vision Simulator", "projects.p10.short": "Simulateur interactif de vision.", "projects.p10.desc": "Simulateur web de robotique combinant trois briques : détection d’objets en temps réel avec COCO-SSD, planification de trajectoire par l’algorithme A*, et traitement de commandes en langage naturel. Les objets s’ajoutent depuis une palette ou une image importée. Démo en ligne disponible.",
      "projects.clustering.title": "Clustering Sémantique d’Avis (NLP)", "projects.clustering.short": "Bag-of-Words vs embeddings neuronaux.", "projects.clustering.desc": "Projet NLP non supervisé sur des avis Amazon : à algorithme constant (K-Means), seule la représentation du texte change — Bag-of-Words contre embeddings de phrases — afin d’isoler son impact. Projection PCA en 2D et évaluation par score de pureté. Stack : Python, scikit-learn, Sentence-Transformers.",
      "projects.rl.title": "Q-Learning · Gymnasium", "projects.rl.short": "Apprentissage par renforcement.", "projects.rl.desc": "Implémentation de Q-Learning from scratch, entraînée sur plusieurs environnements Gymnasium : Frozen Lake (4×4 et 8×8), Taxi-v3 et Cart Pole. Boucle complète d’entraînement, sauvegarde des politiques et rejeu de l’agent. Stratégie ε-greedy décroissante. Stack : Python, Gymnasium, NumPy.",
      "projects.ams.title": "AMS · Supervision de Serveurs", "projects.ams.short": "Monitoring distribué et alertes.", "projects.ams.desc": "Système de supervision distribué : collecte des métriques (CPU, RAM, disque, processus), historisation, graphiques SVG et interface web. Détection automatique des situations critiques selon des seuils, avec alerte email. En mode distribué, un serveur récupère les logs d’un second via scp. Stack : Python, Flask, Pygal.",
      "projects.p0.title": "Générateur IA de sites web", "projects.p0.short": "Du texte au site web fonctionnel.", "projects.p0.desc": "Plateforme qui transforme une simple demande en langage naturel en site web personnalisé complet, pensée pour des personnes sans compétences techniques. L’utilisateur décrit ce qu’il veut, le système génère la structure, le contenu et la mise en page. En développement. Stack : Next.js, TypeScript, LLM.",
      "projects.p2.title": "News Wave", "projects.p2.short": "Emails d’actualité personnalisés par IA.", "projects.p2.desc": "Service d’emails d’actualité personnalisés : les titres sont reformulés selon vos centres d’intérêt et vos sources, et le service s’affine à partir de vos clics. En cours de développement : des alertes en temps réel pour les news urgentes propres à chaque utilisateur.",
      "projects.compiler.title": "Compilateur Pascal-like", "projects.compiler.short": "Architecture de compilateur complète.", "projects.compiler.desc": "Compilateur traduisant un langage impératif de type Pascal en assembleur x86 64 bits, en syntaxe AT&T. Analyse lexicale confiée à un tokeniser Flex, analyse syntaxique par descente récursive LL(k), puis génération d’un code assemblable et exécutable. Stack : C++, Flex.",
      "projects.nova.title": "NOVA", "projects.nova.short": "Co-watching vidéo temps réel.", "projects.nova.desc": "Plateforme de visionnage synchronisé en temps réel : plusieurs utilisateurs regardent une vidéo ensemble, discutent pendant la lecture et gèrent une playlist partagée. Projet IL 2025/2026, inspiré de WatchTogether, avec une architecture conçue pour passer à l’échelle.",
      "projects.cericar.title": "CERICar", "projects.cericar.short": "Covoiturage Full-Stack.", "projects.cericar.desc": "Application web construite avec le framework PHP Yii 2, en architecture MVC : contrôleurs, modèles, vues et configuration adaptée à chaque environnement. Authentification des utilisateurs, modèles validés en base et tests automatisés avec Codeception. Stack : PHP, Yii 2, MySQL.",
      "projects.p3.title": "Optimisation Agricole", "projects.p3.short": "IA pour l’agriculture durable.", "projects.p3.desc": "Optimisation de la production agricole à l’échelle des wilayas, sous contraintes de terres disponibles, de coûts et d’autosuffisance. Le problème est traité de deux façons complémentaires : recherche dans l’espace d’états et satisfaction de contraintes (CSP). Stack : Python.",
      "projects.p4.title": "G-Jobs", "projects.p4.short": "Plateforme d’emploi intelligente.", "projects.p4.desc": "Plateforme de mise en relation entre chercheurs d’emploi et employeurs en Algérie, du poste à temps plein aux missions ponctuelles. Deux rôles utilisateurs distincts, publication et recherche d’offres avec filtres par type, lieu et catégorie. Stack : PHP, MySQL.",
      "projects.p5.title": "Moteur de Recherche", "projects.p5.short": "Indexation et recherche textuelle.", "projects.p5.desc": "Moteur de recherche en Java qui indexe un corpus de textes et classe les documents face à une requête selon les modèles TF-IDF et BM25. Prétraitement complet : normalisation de la casse, racinisation de Porter (Snowball) et suppression des mots vides. Modélisation du vocabulaire et des documents.",
      "projects.p6.title": "Chaîne de Restaurants", "projects.p6.short": "Gestion multisites.", "projects.p6.desc": "Application C++ de gestion d’une chaîne de restaurants, conçue pour comparer des structures d’arbres : les mêmes données sont implémentées en ABR et en AVL afin de mesurer l’écart de performance. CRUD complet sur les fiches, restaurants organisés par région.",
      "projects.p7.title": "Mon Supermarché Numérique", "projects.p7.short": "Gestion stock CLI.", "projects.p7.desc": "Application en ligne de commande qui digitalise la gestion d’un supermarché : fournisseurs, produits et niveaux de stock, ventes et clients, avec génération de rapports. L’ensemble est piloté depuis une interface textuelle structurée. Stack : Java.",
      "projects.p8.title": "Analyse Réseau Routier", "projects.p8.short": "Algorithmes de graphes avancés.", "projects.p8.desc": "Modélisation du réseau routier d’Avignon et de ses environs sous forme de graphe, chargé depuis des fichiers CSV de nœuds et d’arcs. L’algorithme de Dijkstra et des mesures de connectivité en extraient la structure et les plus courts chemins. Stack : C++.",
      
      "chat.title": "Assistant Portfolio", "chat.placeholder": "Posez une question...", "chat.send": "Envoyer",
      "chat.greeting": "Bonjour ! Posez-moi vos questions sur mon parcours, mes projets ou mes compétences.",
      "chat.thinking": "…",
      "chat.unavailable": "L’assistant est momentanément indisponible. Écrivez-moi à zineb.meftah36@gmail.com — je réponds vite.",
      "footer.copy": "© 2025–2026 Zineb MEFTAH. Tous droits réservés."
    },
    en: {
      "page.title": "Portfolio - Zineb MEFTAH",
      "nav.title": "Zineb MEFTAH",
      "header.title": "Zineb MEFTAH",
      "header.subtitle": "I build autonomous AI systems that run in production.",
      "header.tagline": "Software engineering + AI · MLOps · Deep Learning",
      "hero.chip0": "Dual profile: Engineering + AI", "hero.chip1": "Top of class · 1st/126", "hero.chip2": "Production AI @ GE HealthCare", "hero.chip3": "English C2 · LanguageCert",
      "hero.ctaCV": "⬇ Download my CV", "hero.ctaLetter": "⬇ Cover letter", "hero.ctaProjects": "View my projects", "hero.ctaContact": "Get in touch",
      "stat.rank": "Top of class · L2 & L3", "stat.avg": "Overall average", "stat.english": "English · LanguageCert (Ofqual)", "stat.prod": "AI systems @ GE HealthCare",
      "badge.production": "Production",
      
      "nav.contact": "Contact", "nav.profil": "About", "nav.formation": "Education",
      "nav.publications": "Publications", "nav.projects": "Projects", "nav.competences": "Skills",
      "nav.langues": "Languages", "nav.experience": "Experience", "nav.skip": "Skip to content",

      "info.telephone": "☎ Phone", "info.location": "📍 Location", "info.email": "✉ Email", "info.linkedin": "🔗 LinkedIn", "info.portfolio": "🌐 Portfolio", "info.github": "🐙 GitHub", "info.huggingface": "🤖 Hugging Face",
      "info.alternance": "🎯 For recruiters", "info.alternanceLink": "Dedicated page: work-study / permanent / fixed-term",

      "formation.heading": "Education & Certificates", "publications.heading": "Publications", "projects.heading": "Projects & Experience", "experience.heading": "Experience & Leadership", "competences.heading": "Skills", "langues.heading": "Languages", "contact.heading": "Contact",

      "profile.heading": "About Me", "profile.greeting": "Hi, I’m Zineb MEFTAH.",
      "profile.text1": "Top of my class in both L2 and L3 at the University of Avignon (1st of 126, average above 15/20), after an elite preparatory programme at ENSIA in Algiers. As an AI and MLOps engineer I build RAG agents, LLM pipelines and autonomous systems, and I take them all the way to production.",
      "profile.text2": "At GE HealthCare I shipped a RAG agent that answers in seconds questions that used to take hours of document searching. I had coded it end to end; when token cost became the limiting factor, I re-architected it as a multi-agent system. That step — from a prototype that works to a system that holds — is what I want to keep doing. Currently in the Master 1 MLSD at Université Paris Cité, available on a permanent, fixed-term or work-study contract.",
      "profile.highlight": "What sets me apart: genuine engineering rigour — code, backend, complex systems — put to work for AI, to deliver solutions that hold up once deployed.",

      // FORMATION
      "formation.paris.title": "Université Paris Cité, France",
      "formation.paris.desc": "<strong>Master 1 MLSD</strong> — Machine Learning for Data Science, available as a work-study track. One of the most recognized AI programs.",
      "formation.ensia.title": "ENSIA, Algeria",
      "formation.ensia.desc": "<strong>Elite AI preparatory program</strong> — ultra-selective national school, taught entirely in English. 1st & 2nd years completed (120 ECTS, High Honors).",
      "formation.avignon.title": "Avignon University (CERI), France",
      "formation.avignon.desc": "<strong>BSc Computer Science — AI track:</strong> Ranked 1st in L2 & L3 (1st of 126), average > 15/20.",
      "projects.stationf.title": "AI Outreach Agent · Production", "projects.stationf.short": "Fully autonomous AI system in production.", "projects.stationf.desc": "A fully autonomous AI pipeline running in production: LLM qualification of job posts, personalised email generation, SMTP sending, IMAP follow-up and reply classification. Seven LLM skills orchestrated on cron. Stack: Python, Claude API, Playwright, Google Cloud VM.",
      "projects.gerag.title": "RAG Agent · GE HealthCare", "projects.gerag.short": "Natural-language document retrieval.", "projects.gerag.desc": "A production RAG agent at GE HealthCare: complex technical documentation queried in natural language, with sourced answers, cutting multi-hour searches down to seconds. Coded end to end, then re-architected as a multi-agent system on Copilot Studio.",
      "projects.content.title": "Autonomous Content Engine · Multi-Platform", "projects.content.short": "Fully automated content creation & publishing.", "projects.content.desc": "A closed-loop autonomous system that creates and publishes on YouTube, TikTok, Instagram and Facebook. Two strands: music and influence, with affiliate links. Workflows collect views and likes, then republish the best track weekly. Driven by a single email. Stack: n8n, AWS EC2.",
      "experience.ge.title": "GE HealthCare — AI & MLOps Intern", "experience.ge.detail": "AI & MLOps Engineering internship — Paris (2026). Production RAG agent: pipeline first coded end to end (modular skills), then re-architected into a multi-agent system on Microsoft Copilot Studio (workflows and subagents) once the linear pipeline's token cost became the bottleneck — custom preprocessing kept upstream, better answer quality and processing time.",
      "formation.bac.title": "Scientific Baccalaureate",
      "formation.bac.desc": "<strong>Honors:</strong> Excellent — Average 17.82",
      "formation.bac.cert": "View BAC certificate",
      "formation.bac.transcript": "View grade transcripts",
      "dates.paris": "Since September 2026 · in progress",
      "formation.paris.cert": "Enrolment certificate 2026/2027", "formation.avignon.cert": "Degree certificate", "experience.ge.cert": "Internship certificate",
      "dates.ensia": "2022 - June 2024",
      "dates.avignon": "Sept 2024 — June 2026 · completed",
      "common.viewDiploma": "View Diploma",
      "common.viewTranscript": "Transcript of Records",

      // PUBLICATIONS
      "publication.date": "📅 December 20, 2024",
      "publication.location": "📍 Hugging Face",
      "publication.description": "A technical article published on Hugging Face: a method for generating a keyword-to-article dataset through reverse fine-tuning, designed to train tag-generation models. It covers how the corpus was built, how quality was checked, and where the approach falls short.",
      "publication.cta": "Read Full Article",
      "publication.tableTitle": "Sample Database",
      "publication.tableHint": "14 samples from the dataset — click a row to read the full article.", "publication.modalTitle": "Full article",
      "pub.keywords": "Keywords", "pub.articles": "Articles",

      // SKILLS
      "competences.aiDataSkills": "AI & Data Science", "competences.techSkills": "Technical Skills", "competences.softSkillsTitle": "Personal Skills",
      "competences.artificialIntelligence": "Artificial Intelligence", "competences.dataScience": "Data Science", "competences.programming": "Programming & Systems", "competences.web": "Full-Stack Web",
      "competences.aiModels": "Techniques", "competences.aiTools": "Frameworks & Tools", "competences.dataAnalysis": "Analysis & Visualization", "competences.dataProjects": "Key Concepts",
      "competences.languages": "Languages", "competences.tools": "DevOps & Tools", "competences.backend": "Backend", "competences.frontend": "Frontend",
      "competences.writing": "Scientific Writing", "competences.writingDesc": "Technical blog publishing, structured documentation.",
      "competences.teamwork": "Leadership & Teamwork", "competences.teamworkDesc": "GDSC experience, mentoring, agile project management.",
      "competences.problemSolving": "Problem Solving", "competences.problemSolvingDesc": "Algorithmic thinking, performance optimization.",
      "competences.continuousLearning": "Continuous Learning", "competences.continuousLearningDesc": "Active tech watch (Papers with Code, arXiv).",
      "competences.project1": "Synthetic Data Generation", "competences.project2": "Clustering & Segmentation (K-Means)", "competences.project3": "Graph Algorithms (A*, Dijkstra)", "competences.project4": "Fine-tuning",

      // LANGUAGES
      "langues.french": "French", "langues.frenchlevel": "Advanced (C1)", "langues.frenchDetail": "Academic years completed in France",
      "langues.english": "English", "langues.englishlevel": "Bilingual (C2)",
      "langues.arabic": "Arabic", "langues.arabicLevel": "Native",

      // CERTIFICATES
      "certs.heading": "Certificates",
      "certs.english.title": "LanguageCert C2 — ESOL International (Ofqual)",
      "certs.english.desc": "Ofqual-regulated C2 English certification (PeopleCert), awarded February 2026.",
      "certs.aylp.title": "Algerian Youth Leadership Program – NNIC",
      "certs.aylp.desc": "Exchange program focused on leadership and innovation.",
      "certs.pytorch.title": "Introduction to Deep Learning with PyTorch",
      "certs.pytorch.desc": "Online training on neural networks.",
      "certs.fcc.title": "Responsive Web Design",
      "certs.fcc.desc": "Certificate covering HTML, CSS, Flexbox.",
      "certs.cta": "View Certificate",

      // EXPERIENCE
      "experience.card1.title": "IT Manager", "experience.card1.detail": "Google Developer Student Club ENSIA (2023–2024) — managed infrastructure, ran technical workshops, and supported members on their projects.",
      "experience.card2.title": "AYLP Participant", "experience.card2.detail": "Northern Nevada International Center (2021) — Algerian Youth Leadership Program",
      "experience.card3.title": "Event Organizer", "experience.card3.detail": "Organized AI and web-development hackathons and workshops: logistics, mentoring, and technical facilitation.",
      "experience.card4.title": "Other Achievements",
      "experience.card4.item1": "AI Hackathon Avignon (24h, 2025) — Tech Lead", "experience.card4.item2": "Junior Mentor – GDSC (2023)", "experience.card4.item3": "Supervised project G‑JOBS (2024): tickets, Git, reviews",

      // PROJECTS (UPDATED SECTION)
      "projects.hover": "Hover or click for details", "projects.link": "View Code", "projects.link.modelRepo": "Model Repo", "projects.link.demoSpace": "Demo Space", "projects.link.viewCode": "View Code", "projects.link.githubRepo": "GitHub Repo", "projects.link.liveDemo": "Live Demo",
      "projects.p9.title": "LeRobot PushT Trainer", "projects.p9.short": "Robotic Policy Training.", "projects.p9.desc": "A full MLOps pipeline for training robotic manipulation policies (PushT) from Diffusion models. Hugging Face integration, CUDA acceleration and Gradio visualisation. Both the model repository and the demo space are public.",
      "projects.cancer.title": "Lung Cancer Detection", "projects.cancer.short": "Medical Diagnosis via Deep Learning.", "projects.cancer.desc": "Classification of four lung carcinoma types from CT-scan imagery. A convolutional neural network and a multi-layer perceptron are implemented and compared, to study how each handles medical image features. Stack: Python, PyTorch, Torchvision, scikit-learn.",
      "projects.p10.title": "Robot Vision Simulator", "projects.p10.short": "Interactive Vision Simulator.", "projects.p10.desc": "A web robotics simulator combining three parts: real-time object detection with COCO-SSD, path planning through the A* algorithm, and natural-language command processing. Objects are added from a palette or an uploaded image. A live demo is available.",
      "projects.clustering.title": "Semantic Review Clustering (NLP)", "projects.clustering.short": "Bag-of-Words vs neural embeddings.", "projects.clustering.desc": "An unsupervised NLP project on Amazon reviews: with the algorithm held constant (K-Means), only the text representation changes — Bag-of-Words against sentence embeddings — to isolate its impact. 2D PCA projection and purity scoring. Stack: Python, scikit-learn, Sentence-Transformers.",
      "projects.rl.title": "Q-Learning · Gymnasium", "projects.rl.short": "Reinforcement learning.", "projects.rl.desc": "A from-scratch Q-Learning implementation trained on several Gymnasium environments: Frozen Lake (4×4 and 8×8), Taxi-v3 and Cart Pole. Full training loop, policy persistence and agent replay, with a decaying ε-greedy strategy. Stack: Python, Gymnasium, NumPy.",
      "projects.ams.title": "AMS · Server Monitoring", "projects.ams.short": "Distributed monitoring and alerting.", "projects.ams.desc": "A distributed monitoring system: metric collection (CPU, RAM, disk, processes), history, SVG charts and a web interface. Automatic threshold-based detection of critical states, with email alerting. In distributed mode one server pulls another's logs over scp. Stack: Python, Flask, Pygal.",
      "projects.p0.title": "AI Website Generator", "projects.p0.short": "Text to Functional Website.", "projects.p0.desc": "A platform that turns a plain natural-language request into a complete personalised website, built for people with no technical background. The user describes what they want; the system generates the structure, content and layout. In development. Stack: Next.js, TypeScript, LLM.",
      "projects.p2.title": "News Wave", "projects.p2.short": "AI-personalized news emails.", "projects.p2.desc": "A personalised news email service: headlines are rewritten around your interests and your sources, and the service refines itself from your clicks. In development: real-time alerts for breaking news specific to each individual user.",
      "projects.compiler.title": "Pascal-like Compiler", "projects.compiler.short": "Full Compiler Architecture.", "projects.compiler.desc": "A compiler translating a Pascal-like imperative language into 64-bit x86 assembly, in AT&T syntax. Lexical analysis is handled by a Flex tokeniser, parsing by a recursive-descent LL(k) parser, then code generation emits assembly that can be assembled and run. Stack: C++, Flex.",
      "projects.nova.title": "NOVA", "projects.nova.short": "Real-time Video Co-watching.", "projects.nova.desc": "A real-time synchronised viewing platform: several users watch a video together, chat during playback and manage a shared playlist. Built for Projet IL 2025/2026, inspired by WatchTogether, with an architecture designed to scale.",
      "projects.cericar.title": "CERICar", "projects.cericar.short": "Full-Stack Carpooling.", "projects.cericar.desc": "A web application built on the Yii 2 PHP framework in a clean MVC architecture: controllers, models, views and environment-aware configuration. User authentication, database-backed models with validation rules, and automated tests with Codeception. Stack: PHP, Yii 2, MySQL.",
      "projects.p3.title": "Agricultural Optimization", "projects.p3.short": "AI for Sustainable Farming.", "projects.p3.desc": "Optimisation of agricultural production across regions, under constraints of available land, cost and self-sufficiency. The problem is tackled two complementary ways: state-space search, and constraint satisfaction (CSP). Stack: Python.",
      "projects.p4.title": "G-Jobs", "projects.p4.short": "Smart Job Platform.", "projects.p4.desc": "A job-matching platform connecting job seekers and employers in Algeria, from full-time careers to one-off gigs. Two distinct user roles, job posting and search with filtering by type, location and category. Stack: PHP, MySQL.",
      "projects.p5.title": "Search Engine", "projects.p5.short": "Text Indexing and Search.", "projects.p5.desc": "A Java search engine that indexes a text corpus and ranks documents against a query using the TF-IDF and BM25 relevance models. Full preprocessing: lowercasing, Porter stemming (Snowball) and stop-word removal, over a modelled vocabulary and document collection.",
      "projects.p6.title": "Restaurant Chain", "projects.p6.short": "Multi-location Management.", "projects.p6.desc": "A C++ application for managing a restaurant chain, built to benchmark tree data structures: the same records are implemented over both a BST and an AVL tree to measure the performance gap. Full CRUD on restaurant records, organised by region.",
      "projects.p7.title": "My Online Supermarket", "projects.p7.short": "CLI Inventory Management.", "projects.p7.desc": "A command-line application that digitalises supermarket management: suppliers, products and stock levels, sales and customers, with report generation. Everything is driven from a structured text interface. Stack: Java.",
      "projects.p8.title": "Road Network Analysis", "projects.p8.short": "Advanced Graph Algorithms.", "projects.p8.desc": "The road network of Avignon and its surroundings modelled as a graph, loaded from CSV files of nodes and arcs. Dijkstra's algorithm and connectivity measures extract the network's structure and its shortest paths. Stack: C++.",
      
      "chat.title": "Portfolio Assistant", "chat.placeholder": "Ask a question...", "chat.send": "Send",
      "chat.greeting": "Hi! Ask me anything about my background, my projects or my skills.",
      "chat.thinking": "…",
      "chat.unavailable": "The assistant is temporarily unavailable. Email me at zineb.meftah36@gmail.com — I reply quickly.",
      "footer.copy": "© 2025–2026 Zineb MEFTAH. All rights reserved."
    },
    ar: {
      "page.title": "المعرض - زينب مفتاح",
      "nav.title": "زينب مفتاح",
      "header.title": "زينب مفتاح",
      "header.subtitle": "أُصمّم أنظمة ذكاء اصطناعي مستقلة، منشورة في الإنتاج.",
      "header.tagline": "كفاءة مزدوجة: هندسة برمجيات + ذكاء اصطناعي · MLOps · تعلّم عميق",
      "hero.chip0": "ملف مزدوج: هندسة + ذكاء اصطناعي", "hero.chip1": "الأولى على الدفعة · 1/126", "hero.chip2": "ذكاء اصطناعي في الإنتاج @ GE HealthCare", "hero.chip3": "إنجليزية C2 · LanguageCert",
      "hero.ctaCV": "⬇ تحميل سيرتي الذاتية", "hero.ctaLetter": "⬇ رسالة الدافع", "hero.ctaProjects": "مشاريعي", "hero.ctaContact": "تواصل معي",
      "stat.rank": "الأولى على الدفعة · L2 و L3", "stat.avg": "المعدّل العام", "stat.english": "الإنجليزية · LanguageCert (Ofqual)", "stat.prod": "أنظمة ذكاء اصطناعي @ GE HealthCare",
      "badge.production": "الإنتاج",
      "nav.contact": "اتصل", "nav.profil": "نبذة", "nav.formation": "التعليم",
      "nav.publications": "المنشورات", "nav.projects": "المشاريع", "nav.competences": "المهارات",
      "nav.langues": "اللغات", "nav.experience": "الخبرة", "nav.skip": "تخطي إلى المحتوى",

      "info.telephone": "☎ الهاتف", "info.location": "📍 الموقع", "info.email": "✉ البريد", "info.linkedin": "🔗 لينكد إن", "info.portfolio": "🌐 المعرض", "info.github": "🐙 جيتهاب", "info.huggingface": "🤖 هاجينغ فايس",
      "info.alternance": "🎯 للمشغّلين", "info.alternanceLink": "صفحة مخصّصة: بالتناوب / عقد دائم / عقد محدّد",

      "formation.heading": "التعليم والشهادات", "publications.heading": "المنشورات", "projects.heading": "المشاريع والخبرة", "experience.heading": "الخبرة والقيادة", "competences.heading": "المهارات", "langues.heading": "اللغات", "contact.heading": "اتصل",

      "profile.heading": "نبذة عني", "profile.greeting": "مرحبًا، أنا زينب مفتاح.",
      "profile.text1": "الأولى على دفعتها في السنتين الثانية والثالثة بجامعة أفينيون (1 من 126، بمعدّل يفوق 15/20)، بعد طور تحضيري نخبوي بمدرسة ENSIA في الجزائر. مهندسة ذكاء اصطناعي وMLOps، أُصمّم وكلاء RAG وخطوط معالجة LLM وأنظمة مستقلة، وأرافقها حتى الإنتاج.",
      "profile.text2": "لدى GE HealthCare أنجزت وكيل RAG يجيب في ثوانٍ عن أسئلة كانت تتطلّب ساعات من البحث في الوثائق. كتبته أولًا من البداية إلى النهاية، ولمّا صارت كلفة الرموز هي العامل المُقيِّد أعدت هندسته كنظام متعدّد الوكلاء. هذا الانتقال من نموذج يعمل إلى نظام يصمد هو ما أريد الاستمرار فيه. حاليًا في ماجستير M1 MLSD بجامعة باريس سيتي، ومتاحة بعقد دائم أو محدّد المدة أو بالتناوب.",
      "profile.highlight": "ما يميّزني: صرامة هندسية حقيقية — البرمجة، الواجهة الخلفية، الأنظمة المعقّدة — موضوعة في خدمة الذكاء الاصطناعي، لتقديم حلول تصمد بعد النشر.",

      // FORMATION
      "formation.paris.title": "جامعة باريس سيتي، فرنسا",
      "formation.paris.desc": "<strong>ماجستير M1 MLSD</strong> — تعلّم الآلة لعلوم البيانات، يمكن متابعته بالتناوب. من أبرز برامج الذكاء الاصطناعي.",
      "formation.ensia.title": "ENSIA، الجزائر",
      "formation.ensia.desc": "<strong>الطور التحضيري النخبوي في الذكاء الاصطناعي</strong> — مدرسة وطنية انتقائية للغاية، دراسة كاملة بالإنجليزية. أُنجزت السنتان الأولى والثانية (120 ECTS، تقدير مشرّف جدًا).",
      "formation.avignon.title": "جامعة أفينيون (CERI)، فرنسا",
      "formation.avignon.desc": "<strong>إجازة في الإعلام الآلي — تخصص الذكاء الاصطناعي:</strong> الأولى على الدفعة في السنتين الثانية والثالثة (1 من 126)، معدل > 15/20.",
      "formation.bac.title": "بكالوريا علمية",
      "formation.bac.desc": "<strong>التقدير:</strong> ممتاز — معدل 17.82",
      "formation.bac.cert": "عرض شهادة البكالوريا",
      "formation.bac.transcript": "عرض كشف النقاط",
      "dates.paris": "منذ سبتمبر 2026 · جارٍ",
      "formation.paris.cert": "شهادة تسجيل 2026/2027", "formation.avignon.cert": "شهادة الحصول على الدبلوم", "experience.ge.cert": "شهادة تربّص",
      "dates.ensia": "2022 - يونيو 2024",
      "dates.avignon": "سبتمبر 2024 — يونيو 2026 · مُنجزة",
      "common.viewDiploma": "عرض الشهادة",
      "common.viewTranscript": "كشف النقاط",

      // PUBLICATIONS
      "publication.date": "📅 20 ديسمبر 2024",
      "publication.location": "📍 Hugging Face",
      "publication.description": "مقال تقني منشور على Hugging Face: طريقة لتوليد مجموعة بيانات تربط الكلمات المفتاحية بالمقالات عبر الضبط العكسي، لتدريب نماذج توليد الوسوم. يشرح بناء المتن وضبط الجودة وحدود الطريقة.",
      "publication.cta": "اقرأ المقال الكامل",
      "publication.tableTitle": "عينة قاعدة البيانات",
      "publication.tableHint": "14 عيّنة من مجموعة البيانات — انقر على سطر لقراءة المقال كاملًا.", "publication.modalTitle": "المقال كاملًا",
      "pub.keywords": "الكلمات المفتاحية", "pub.articles": "المقالات",

      // SKILLS
      "competences.aiDataSkills": "الذكاء الاصطناعي وعلوم البيانات", "competences.techSkills": "المهارات التقنية", "competences.softSkillsTitle": "المهارات الشخصية",
      "competences.artificialIntelligence": "الذكاء الاصطناعي", "competences.dataScience": "علوم البيانات", "competences.programming": "البرمجة والأنظمة", "competences.web": "تطوير الويب",
      "competences.aiModels": "التقنيات", "competences.aiTools": "الأطر والأدوات", "competences.dataAnalysis": "التحليل", "competences.dataProjects": "المفاهيم",
      "competences.languages": "اللغات", "competences.tools": "DevOps والأدوات", "competences.backend": "الخلفية", "competences.frontend": "الواجهة الأمامية",
      "competences.writing": "الكتابة العلمية", "competences.writingDesc": "نشر مقالات تقنية (Hugging Face)، وتوثيق منظّم.",
      "competences.teamwork": "القيادة والعمل الجماعي", "competences.teamworkDesc": "خبرة GDSC، الإرشاد، وإدارة مشاريع رشيقة.",
      "competences.problemSolving": "حل المشكلات", "competences.problemSolvingDesc": "تفكير خوارزمي وتحسين الأداء.",
      "competences.continuousLearning": "التعلم المستمر", "competences.continuousLearningDesc": "متابعة تقنية نشطة (Papers with Code، arXiv).",
      "competences.project1": "توليد البيانات الاصطناعية", "competences.project2": "التجميع والتجزئة (K-Means)", "competences.project3": "خوارزميات الرسوم البيانية (A*, Dijkstra)", "competences.project4": "الضبط الدقيق (Fine-tuning)",

      // LANGUAGES
      "langues.french": "الفرنسية", "langues.frenchlevel": "متقدم (C1)", "langues.frenchDetail": "سنوات جامعية مصادق عليها في فرنسا",
      "langues.english": "الإنجليزية", "langues.englishlevel": "ثنائي اللغة (C2)",
      "langues.arabic": "العربية", "langues.arabicLevel": "اللغة الأم",

      // CERTIFICATES
      "certs.heading": "الشهادات",
      "certs.english.title": "شهادة LanguageCert للغة الإنجليزية (C2) — معتمدة من Ofqual",
      "certs.english.desc": "شهادة إنجليزية بمستوى C2 معتمدة من Ofqual (PeopleCert)، فبراير 2026.",
      "certs.aylp.title": "برنامج القيادة الشبابية الجزائري",
      "certs.aylp.desc": "برنامج تبادل يركز على القيادة والابتكار.",
      "certs.pytorch.title": "مقدمة في التعلم العميق (PyTorch)",
      "certs.pytorch.desc": "تدريب عبر الإنترنت حول الشبكات العصبية.",
      "certs.fcc.title": "تصميم الويب المتجاوب",
      "certs.fcc.desc": "شهادة تركز على أساسيات HTML و CSS.",
      "certs.cta": "عرض الشهادة",

      // EXPERIENCE
      "experience.ge.title": "GE HealthCare — متدربة في الذكاء الاصطناعي وMLOps", "experience.ge.detail": "تدريب في هندسة الذكاء الاصطناعي وMLOps — باريس (2026). وكيل RAG في الإنتاج: خط معالجة كامل مكتوب برمجيًا أولًا (skills معيارية)، ثم أُعيدت هندسته كنظام متعدد الوكلاء على Microsoft Copilot Studio (workflows ووكلاء فرعيون) بعدما أصبحت تكلفة الـ tokens في الخط الخطّي هي العائق — مع الإبقاء على طبقة المعالجة المسبقة المكتوبة يدويًا، وتحسّن الجودة وزمن المعالجة.",
      "experience.card1.title": "مسؤولة تقنية المعلومات", "experience.card1.detail": "نادي مطوري Google – ENSIA (2023–2024) — إدارة البنية التحتية، وتقديم ورش تقنية، ودعم الأعضاء في مشاريعهم.",
      "experience.card2.title": "مشاركة في AYLP", "experience.card2.detail": "المركز الدولي لشمال نيفادا (2021) — برنامج القيادة للشباب الجزائري",
      "experience.card3.title": "منظِّمة فعاليات", "experience.card3.detail": "تنظيم هاكاثونات وورش في الذكاء الاصطناعي وتطوير الويب: اللوجستيك، والإرشاد، والتأطير التقني.",
      "experience.card4.title": "إنجازات أخرى",
      "experience.card4.item1": "هاكاثون الذكاء الاصطناعي أفينيون (24 ساعة، 2025) — قائدة تقنية", "experience.card4.item2": "مرشدة مبتدئة – GDSC (2023)", "experience.card4.item3": "مشروع مؤطر G‑JOBS (2024): المهام، Git، المراجعة",

      // PROJECTS (UPDATED SECTION)
      "projects.stationf.title": "وكيل تواصل بالذكاء الاصطناعي · في الإنتاج",
      "projects.stationf.short": "نظام ذكاء اصطناعي مستقل منشور في الإنتاج.",
      "projects.stationf.desc": "منظومة ذكاء اصطناعي مستقلة بالكامل في الإنتاج: تصفية العروض بنموذج لغوي، وصياغة رسائل مخصّصة، والإرسال عبر SMTP، والمتابعة عبر IMAP وتصنيف الردود. سبع مهارات LLM منسّقة عبر cron. التقنيات: Python وClaude API وPlaywright وGoogle Cloud VM.",
      "projects.gerag.title": "وكيل RAG · GE HealthCare",
      "projects.gerag.short": "بحث في الوثائق بلغة طبيعية.",
      "projects.gerag.desc": "وكيل RAG في الإنتاج لدى GE HealthCare: استجواب وثائق تقنية معقّدة بلغة طبيعية مع إجابات موثّقة المصدر، يختصر بحثًا يستغرق ساعات إلى ثوانٍ. كُتب من البداية إلى النهاية ثم أُعيدت هندسته كنظام متعدّد الوكلاء على Copilot Studio.",
      "projects.hover": "مرّر أو انقر لعرض التفاصيل", "projects.link": "عرض الكود", "projects.link.modelRepo": "مستودع النموذج", "projects.link.demoSpace": "مساحة العرض", "projects.link.viewCode": "عرض الكود", "projects.link.githubRepo": "مستودع GitHub", "projects.link.liveDemo": "عرض مباشر",
      "projects.p9.title": "مدرب LeRobot PushT", "projects.p9.short": "تدريب السياسات.", "projects.p9.desc": "منظومة MLOps كاملة لتدريب سياسات المناولة الروبوتية (PushT) انطلاقًا من نماذج الانتشار. تكامل مع Hugging Face وتسريع CUDA وعرض عبر Gradio. مستودع النموذج ومساحة العرض متاحان للعموم.",
      "projects.cancer.title": "كشف سرطان الرئة", "projects.cancer.short": "تشخيص الأورام (CT).", "projects.cancer.desc": "تصنيف أربعة أنواع من سرطانات الرئة انطلاقًا من صور الأشعة المقطعية. تُنفَّذ شبكة عصبية التفافية ومدرك متعدّد الطبقات ثم تُقارَنان لدراسة تعامل كلٍّ منهما مع سمات الصور الطبية. التقنيات: Python وPyTorch وTorchvision.",

      "projects.p10.title": "محاكي رؤية الروبوت", "projects.p10.short": "محاكي تفاعلي.", "projects.p10.desc": "محاكي روبوتات على الويب يجمع ثلاثة عناصر: كشف الأجسام آنيًا عبر COCO-SSD، وتخطيط المسار بخوارزمية A*، ومعالجة الأوامر بلغة طبيعية. تُضاف الأجسام من لوحة أو من صورة مرفوعة. يتوفّر عرض مباشر.",
      "projects.clustering.title": "التجميع الدلالي للمراجعات (NLP)", "projects.clustering.short": "Bag-of-Words مقابل التضمينات العصبية.", "projects.clustering.desc": "مشروع معالجة لغة غير خاضع للإشراف على مراجعات أمازون: مع تثبيت الخوارزمية، يتغيّر تمثيل النص وحده — Bag-of-Words مقابل تضمينات الجُمل — لعزل أثره. إسقاط PCA وتقييم بدرجة النقاء. التقنيات: Python وscikit-learn.",
      "projects.rl.title": "Q-Learning · Gymnasium", "projects.rl.short": "التعلّم المعزّز.", "projects.rl.desc": "تنفيذ خوارزمية Q-Learning من الصفر، مدرَّبة على بيئات Gymnasium: Frozen Lake بحجميه وTaxi-v3 وCart Pole. دورة تدريب كاملة وحفظ السياسات وإعادة تشغيل الوكيل، باستراتيجية ε-greedy متناقصة. التقنيات: Python وGymnasium وNumPy.",
      "projects.ams.title": "AMS · مراقبة الخوادم", "projects.ams.short": "مراقبة موزّعة وتنبيهات.", "projects.ams.desc": "نظام مراقبة موزّع: جمع المقاييس (المعالج، الذاكرة، القرص، العمليات)، وحفظ السجل، ورسوم SVG، وواجهة ويب. كشف تلقائي للحالات الحرجة وفق عتبات مع تنبيه بالبريد. في الوضع الموزّع يسحب خادم سجلات آخر عبر scp.",
      "projects.p0.title": "مولد مواقع الويب", "projects.p0.short": "من نص إلى موقع.", "projects.p0.desc": "منصّة تحوّل طلبًا بسيطًا بلغة طبيعية إلى موقع ويب مخصّص كامل، موجّهة لمن لا خبرة تقنية لديهم. يصف المستخدم ما يريد، فيولّد النظام البنية والمحتوى والتخطيط. قيد التطوير. التقنيات: Next.js وTypeScript وLLM.",
      "projects.p2.title": "News Wave", "projects.p2.short": "رسائل أخبار مخصّصة بالذكاء الاصطناعي.", "projects.p2.desc": "خدمة بريد إخباري مخصّص: تُعاد صياغة العناوين حسب اهتماماتك ومصادرك، وتتحسّن الخدمة من نقراتك. قيد التطوير: تنبيهات فورية للأخبار العاجلة الخاصة بكل مستخدم على حدة.",
      "projects.content.title": "محرّك محتوى مستقل · متعدّد المنصّات", "projects.content.short": "إنشاء ونشر المحتوى بشكل آلي بالكامل.", "projects.content.desc": "نظام مستقل بحلقة مغلقة يُنشئ وينشر على يوتيوب وتيك توك وإنستغرام وفيسبوك. مساران: الموسيقى والتأثير مع روابط تسويق بالعمولة. تجمع سير العمل المشاهدات والإعجابات ثم تعيد نشر الأفضل أسبوعيًا. التحكّم برسالة بريد واحدة. التقنيات: n8n وAWS EC2.",
      "projects.compiler.title": "مترجم Pascal", "projects.compiler.short": "هندسة مترجم.", "projects.compiler.desc": "مترجم يحوّل لغة أمرية شبيهة بـPascal إلى أسمبلي x86 بـ64 بت بصيغة AT&T. التحليل المعجمي عبر مُرمِّز Flex، والتحليل النحوي بنزول تعاودي LL(k)، ثم توليد شيفرة قابلة للتجميع والتنفيذ. التقنيات: C++ وFlex.",
      "projects.nova.title": "نوفا (NOVA)", "projects.nova.short": "مشاهدة متزامنة.", "projects.nova.desc": "منصّة مشاهدة متزامنة آنيًا: يشاهد عدّة مستخدمين مقطعًا معًا، ويتحادثون أثناء التشغيل، ويديرون قائمة تشغيل مشتركة. مشروع IL لعام 2025/2026 مستوحى من WatchTogether ببنية مصمّمة للتوسّع.",
      "projects.cericar.title": "سيري-كار", "projects.cericar.short": "نقل تشاركي.", "projects.cericar.desc": "تطبيق ويب مبني على إطار Yii 2 بلغة PHP بمعمارية MVC: متحكّمات ونماذج وواجهات وإعداد يتكيّف مع كل بيئة. مصادقة المستخدمين، ونماذج مرتبطة بقاعدة بيانات مع قواعد تحقّق، واختبارات آلية عبر Codeception.",
      "projects.p3.title": "تحسين الزراعة", "projects.p3.short": "زراعة ذكية.", "projects.p3.desc": "تحسين الإنتاج الزراعي على مستوى الولايات، تحت قيود الأراضي المتاحة والتكلفة والاكتفاء الذاتي. تُعالَج المسألة بطريقتين متكاملتين: البحث في فضاء الحالات، وإرضاء القيود (CSP). التقنيات: Python.",
      "projects.p4.title": "G-Jobs", "projects.p4.short": "منصة توظيف.", "projects.p4.desc": "منصّة تربط الباحثين عن عمل بأصحاب العمل في الجزائر، من الوظائف الدائمة إلى المهام الظرفية. دوران مختلفان للمستخدمين، ونشر العروض والبحث فيها مع تصفية حسب النوع والمكان والفئة. التقنيات: PHP وMySQL.",
      "projects.p5.title": "محرك بحث", "projects.p5.short": "فهرسة وبحث.", "projects.p5.desc": "محرّك بحث بلغة Java يفهرس متنًا نصيًا ويرتّب الوثائق أمام الاستعلام وفق نموذجَي TF-IDF وBM25. معالجة مسبقة كاملة: توحيد الحالة، وتجذير Porter، وحذف كلمات التوقف، مع نمذجة المفردات والوثائق.",
      "projects.p6.title": "سلسلة مطاعم", "projects.p6.short": "إدارة مواقع.", "projects.p6.desc": "تطبيق C++ لإدارة سلسلة مطاعم، مصمَّم لمقارنة بنى الأشجار: تُنفَّذ البيانات نفسها بشجرة بحث ثنائية وبشجرة AVL لقياس فارق الأداء. عمليات إنشاء وقراءة وتعديل وحذف كاملة، مع تنظيم حسب المنطقة.",
      "projects.p7.title": "سوبرماركت الإنترنت", "projects.p7.short": "نظام CLI.", "projects.p7.desc": "تطبيق بسطر الأوامر يرقمن إدارة متجر كبير: المورّدون والمنتجات ومستويات المخزون والمبيعات والزبائن، مع توليد التقارير. تُدار العمليات كلّها من واجهة نصية منظّمة. التقنيات: Java.",
      "projects.p8.title": "تحليل الطرق", "projects.p8.short": "خوارزميات.", "projects.p8.desc": "نمذجة شبكة طرق أفينيون ومحيطها على شكل رسم بياني، تُحمَّل من ملفات CSV للعقد والأقواس. خوارزمية Dijkstra ومقاييس الترابط تستخرج بنية الشبكة وأقصر المسارات فيها. التقنيات: C++.",

      "chat.title": "مساعد المعرض", "chat.placeholder": "اطرح سؤالاً...", "chat.send": "إرسال",
      "chat.greeting": "مرحبًا! اسألني عن مساري أو مشاريعي أو مهاراتي.",
      "chat.thinking": "…",
      "chat.unavailable": "المساعد غير متاح مؤقتًا. راسلني على zineb.meftah36@gmail.com — أردّ بسرعة.",
      "footer.copy": "© 2025–2026 زينب مفتاح. جميع الحقوق محفوظة."
    }
  };
  
  // 6. Translation Function
  function translatePage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
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
    // --- SAFARI FIX END ---    // The projects row is a grid now, so there is no horizontal scroll to reset.

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

    // Serve the CV and the cover letter in the language being read.
    // Arabic readers get the English documents — there is no Arabic version.
    const docLang = lang === "fr" ? "fr" : "en";
    document.querySelectorAll("a[data-doc]").forEach((a) => {
      const href = a.getAttribute("data-doc-" + docLang);
      if (href) a.setAttribute("href", href);
    });

    // Update buttons state
    document.querySelectorAll('.lang-switcher button[data-lang]').forEach(b => {
      const active = b.getAttribute('data-lang') === lang;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('is-active', active);
    });

    refreshChatGreeting();

    // Persist
    try { localStorage.setItem('lang', lang); } catch {}
  }

  // 7. Initialization
  const savedLang = (() => {
    try { return localStorage.getItem('lang'); } catch { return null; }
  })();
  translatePage(savedLang || DEFAULT_LANG);
  greetOnce();

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
        firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // 10. Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const rootEl = document.documentElement;

  // The inline <head> script sets .pre-light before first paint; mirror it onto <body>,
  // which is what the stylesheet keys off once the page is interactive.
  const applyTheme = (theme) => {
    const light = theme === "light";
    document.body.classList.toggle("light-theme", light);
    rootEl.classList.toggle("pre-light", light);
    if (themeToggle) {
      // The icon shows what clicking will do, not the current state.
      themeToggle.textContent = light ? "🌙" : "☀️";
      themeToggle.setAttribute(
        "aria-label",
        light ? "Activer le thème sombre / Switch to dark theme" : "Activer le thème clair / Switch to light theme"
      );
      themeToggle.setAttribute("aria-pressed", String(light));
    }
  };

  const storedTheme = (() => {
    try { return localStorage.getItem("theme"); } catch { return null; }
  })();
  applyTheme(storedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = document.body.classList.contains("light-theme") ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch {}
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
    // No role="button" here: these cards contain links, and a widget role
    // wrapping focusable children breaks screen-reader navigation.
    card.setAttribute('tabindex', '0');

    const toggle = () => {
      card.classList.toggle('flipped');
    };

    // The hint says "hover or click", so click has to work everywhere -
    // not only on coarse-pointer devices.
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      toggle();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // 14. Publication Samples — full article in a reading dialog
  const pubModal = document.getElementById("pub-modal");
  const pubTbody = document.getElementById("pub-tbody");
  if (pubModal && pubTbody) {
    const pubBody = document.getElementById("pub-modal-body");
    const pubKw = document.getElementById("pub-modal-kw");
    const pubClose = document.getElementById("pub-modal-close");
    let samples = [];
    let lastFocused = null;

    fetch("assets/publication-samples.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { samples = Array.isArray(data) ? data : []; })
      .catch(() => { samples = []; });

    const closePub = () => {
      pubModal.classList.add("hidden");
      if (lastFocused) lastFocused.focus();
    };

    const openPub = (index, trigger) => {
      const row = samples[index];
      if (!row) return;
      lastFocused = trigger || null;
      pubKw.textContent = row.k;
      pubBody.textContent = row.a;
      pubBody.scrollTop = 0;
      pubModal.classList.remove("hidden");
      pubBody.focus();
    };

    pubTbody.addEventListener("click", (e) => {
      const tr = e.target.closest(".pub-row");
      if (tr) openPub(Number(tr.dataset.index), tr);
    });
    pubTbody.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const tr = e.target.closest(".pub-row");
      if (!tr) return;
      e.preventDefault();
      openPub(Number(tr.dataset.index), tr);
    });

    pubClose.addEventListener("click", closePub);
    pubModal.addEventListener("click", (e) => { if (e.target === pubModal) closePub(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !pubModal.classList.contains("hidden")) closePub();
    });
  }

  // 15. Experience Card Interactions
  // Same reasoning: the detail overlay was hover-only, so touch and keyboard
  // visitors could never read it.
  // A card back that overflows is a scrollable region, so it needs its own
  // focus stop for keyboard users.
  const markScrollableBacks = () => {
    document.querySelectorAll('.flip-card-back').forEach((back) => {
      const scrolls = back.scrollHeight - back.clientHeight > 2;
      if (scrolls) back.setAttribute('tabindex', '0');
      else back.removeAttribute('tabindex');
    });
  };
  markScrollableBacks();
  window.addEventListener('resize', markScrollableBacks);

  document.querySelectorAll('.experience-card').forEach(card => {
    const toggle = () => {
      card.classList.toggle('revealed');
    };
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      toggle();
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});
