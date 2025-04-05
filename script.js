document.addEventListener("DOMContentLoaded", () => {
    // --- Translation Dictionary ---
    const translations = {
      fr: {
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
"profile.text1": "Architecte digital et innovatrice passionnée, je fusionne l'intelligence artificielle avec l'art du développement pour créer des solutions disruptives qui redéfinissent le futur.",
"profile.text2": "Exploratrice des algorithmes de pointe, je repousse les limites du possible en alliant expertise technique et créativité. Chaque projet est une aventure vers l'innovation.",
"profile.more": "En savoir plus sur mon parcours",
"projects.hover": "Survolez pour voir les détails",
"projects.link": "Voir le code sur GitHub",

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
        "header.subtitle": "Ingénieur en Intelligence Artificielle & Développeur Full Stack",
        "nav.contact": "Contact",
        "nav.profil": "Profil",
        "nav.formation": "Formation",
        "nav.publications": "Publications",
        "nav.projects": "Projets",
        "nav.competences": "Compétences",
        "nav.langues": "Langues",
        "nav.experience": "Expérience",
        "contact.heading": "Contact",
        "profil.heading": "À Propos de Moi",
        "profil.greeting": "Bonjour, je suis Meftah Zineb.",
        "profil.bio1": "Architecte digital et innovateur passionné, je fusionne l'intelligence artificielle avec l'art du développement pour créer des solutions disruptives qui redéfinissent le futur.",
        "profil.bio2": "Explorateur des algorithmes de pointe et toujours en quête de nouvelles idées, chaque projet est une aventure vers l'innovation.",
        "formation.heading": "Formation",
        "formation.ensia": "ENSIA, Algérie",
        "formation.ensiaDiplome": "Diplôme : Ingénierie en Intelligence Artificielle (1ʳᵉ et 2ᵉ année validées)",
        "formation.ensiaCert": "Voir diplôme",
        "formation.avignon": "Université d'Avignon (CERI), France",
        "formation.avignonDiplome": "Diplôme : Data Science (2ᵉ année en cours, excellents résultats)",
        "formation.avignonCert": "Voir diplôme",
        "publications.heading": "Publications",
        "publication.date": "📅 20 décembre 2024",
        "publication.location": "📍 Hugging Face",
        "publication.description": "Découvrez notre approche révolutionnaire qui utilise un fine-tuning inversé pour générer des données synthétiques. Conçues pour extraire des mots-clés précis, ces données servent à entraîner des modèles de génération de tags ultra-performants.",
        "publication.cta": "Lire l'article complet",
        "publication.tableTitle": "Exemple de base de données",
        "projects.heading": "Projets et Expériences",
        "competences.heading": "Compétences",
        "competences.certifications": "Certifications",
        "competences.datacamp": "Voir certificat",
        "competences.programming": "Programmation",
        "competences.web": "Développement Web",
        "competences.dataScience": "Data Science & IA",
        "competences.tools": "Outils",
        "competences.softSkills": "Soft Skills",
        "competences.leadership": "Leadership",
        "competences.teamwork": "Travail en équipe",
        "competences.communication": "Communication",
        "competences.projectManagement": "Gestion de projet",
        "langues.heading": "Langues",
        "langues.french": "Français",
        "langues.frenchCert": "Voir certificat",
        "langues.english": "Anglais",
        "langues.englishCert": "Voir certificat",
        "langues.arabic": "Arabe",
        "experience.heading": "Expérience & Leadership",
        "experience.card1.title": "Responsable informatique",
        "experience.card1.detail": "Google Developer Student Club ENSIA (2023-2024)",
        "experience.card2.title": "Participant AYLP",
        "experience.card2.detail": "Ambassade des États-Unis à Alger (2021)",
        "experience.card2.cert": "Voir certificat",
        "experience.card3.title": "Organisation d'événements",
        "experience.card3.detail": "Hackathons, IA, Développement Web",
        "experience.card4.title": "Autres Réalisations",
        "experience.card4.detail": "Participation à divers hackathons et projets collaboratifs pour innover et exceller.",
        "langues.frenchlevel": "Intermédiaire (B2)",
        "langues.englishlevel": "Avancé (B2)",
        "langues.arabiclevel": "Courant (C1)"
      },
      en: {
        "header.title": "Zineb Meftah",
"contact.heading": "Contact",
"info.telephone": "☎ Phone",
"info.email": "✉ Email",
"info.linkedin": "🔗 LinkedIn",
"info.portfolio": "🌐 Portfolio",
"info.github": "🐙 GitHub",
"info.huggingface": "🤖 Hugging Face",
        "header.subtitle": "AI Engineer & Full Stack Developer",
        "nav.contact": "Contact",
        "nav.profil": "About",
        "nav.formation": "Education",
        "nav.publications": "Publications",
        "nav.projects": "Projects",
        "nav.competences": "Skills",
        "nav.langues": "Languages",
        "nav.experience": "Experience",
        "contact.heading": "Contact",
        "profil.heading": "About Me",
        "profil.greeting": "Hi, I’m Zineb Meftah.",
        "profil.bio1": "A digital architect and passionate innovator, I blend AI with the art of development to create disruptive solutions that redefine the future.",
        "profil.bio2": "Explorer of cutting-edge algorithms and always pushing creative boundaries — each project is a journey toward innovation.",
        "formation.heading": "Education",
        "formation.ensia": "ENSIA, Algeria",
        "formation.ensiaDiplome": "Degree: Artificial Intelligence Engineering (1st & 2nd Year Completed)",
        "formation.ensiaCert": "View Certificate",
        "formation.avignon": "Université d'Avignon (CERI), France",
        "formation.avignonDiplome": "Degree: Data Science (2nd year ongoing, excellent results)",
        "formation.avignonCert": "View Certificate",
        "publications.heading": "Publications",
        "publication.date": "📅 December 20, 2024",
        "publication.location": "📍 Hugging Face",
        "publication.description": "Discover our revolutionary approach using reverse fine-tuning to generate synthetic data. Designed to extract accurate keywords and train highly efficient tag generation models.",
        "publication.cta": "Read Full Article",
        "publication.tableTitle": "Sample Database",
        "projects.heading": "Projects & Experience",
        "projects.hover": "Hover to view details",
        "projects.link": "View Code on GitHub",
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
        "profile.heading": "About Me",
        "profile.greeting": "Hello, I'm Meftah Zineb.",
        "profile.text1": "Digital architect and passionate innovator, I merge artificial intelligence with the art of development to create disruptive solutions that redefine the future.",
        "profile.text2": "Explorer of cutting-edge algorithms, I constantly push the boundaries of what's possible by blending technical expertise with creativity. Each project is an adventure toward innovation.",
        "profile.more": "Learn more about my journey",
        "langues.englishlevel" : "Fluent (B2)",
        "langues.frenchlevel" : "Advanced (B2)",
        "langues.arabiclevel" : "Native (C1)"

      },
      ar: {
        "header.title": "مفتاح زينب",
        "contact.heading": "الاتصال",
        "info.telephone": "☎ الهاتف",
        "info.email": "✉ البريد الإلكتروني",
        "info.linkedin": "🔗 لينكد إن",
        "info.portfolio": "🌐 الموقع الشخصي",
        "info.github": "🐙 جيتهاب",
        "info.huggingface": "🤖 هاجينغ فايس",
        "header.subtitle": "مهندس ذكاء اصطناعي ومطور متكامل",
        "nav.contact": "اتصل",
        "nav.profil": "نبذة",
        "nav.formation": "التعليم",
        "nav.publications": "المنشورات",
        "nav.projects": "المشاريع",
        "nav.competences": "المهارات",
        "nav.langues": "اللغات",
        "nav.experience": "الخبرة",
        "contact.heading": "اتصل",
        "profil.heading": "نبذة عني",
        "profil.greeting": "مرحبًا، أنا مفتاح زينب.",
        "profil.bio1": "أنا مهندسة رقمية ومبتكرة شغوفة أدمج الذكاء الاصطناعي مع فن التطوير لإنشاء حلول ثورية تعيد تعريف المستقبل.",
        "profil.bio2": "مستكشفة لأحدث الخوارزميات وساعية دومًا وراء أفكار جديدة، كل مشروع هو مغامرة نحو الابتكار.",
        "formation.heading": "التعليم",
        "formation.ensia": "ENSIA، الجزائر",
        "formation.ensiaDiplome": "الشهادة: هندسة الذكاء الاصطناعي (السنة الأولى والثانية)",
        "formation.ensiaCert": "عرض الشهادة",
        "formation.avignon": "جامعة أفينيون (CERI)، فرنسا",
        "formation.avignonDiplome": "الشهادة: علوم البيانات (السنة الثانية جارية، نتائج ممتازة)",
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
        "competences.heading": "المهارات",
        "competences.certifications": "الشهادات",
        "competences.datacamp": "عرض الشهادة",
        "competences.programming": "البرمجة",
        "competences.web": "تطوير الويب",
        "competences.dataScience": "علوم البيانات والذكاء الاصطناعي",
        "competences.tools": "الأدوات",
        "competences.softSkills": "المهارات الشخصية",
        "competences.leadership": "القيادة",
        "competences.teamwork": "العمل الجماعي",
        "competences.communication": "الاتصال",
        "competences.projectManagement": "إدارة المشاريع",
        "langues.heading": "اللغات",
        "langues.french": "الفرنسية",
        "langues.frenchCert": "عرض الشهادة",
        "langues.english": "الإنجليزية",
        "langues.englishCert": "عرض الشهادة",
        "langues.arabic": "العربية",
        "experience.heading": "الخبرة والقيادة",
        "experience.card1.title": "مديرة تقنية",
        "experience.card1.detail": "مجموعة طلاب مطوري جوجل ENSIA (2023-2024)",
        "experience.card2.title": "مشاركة AYLP",
        "experience.card2.detail": "السفارة الأمريكية في الجزائر (2021)",
        "experience.card2.cert": "عرض الشهادة",
        "experience.card3.title": "منظمة فعاليات",
        "experience.card3.detail": "هاكاثونات، ذكاء اصطناعي، تطوير الويب",
        "experience.card4.title": "إنجازات أخرى",
        "experience.card4.detail": "المشاركة في هاكاثونات ومشاريع تعاونية متنوعة للابتكار والتميز",
        "projects.heading": "المشاريع والخبرة",
        "projects.hover": "مرر فوق البطاقة لرؤية التفاصيل",
        "projects.link": "عرض على GitHub",

        "projects.p1.title": "تخصيص المنتجات بالذكاء الاصطناعي",
        "projects.p1.short": "حوّل أفكارك إلى منتجات فريدة.",
        "projects.p1.desc": "نظام يمكّن المستخدمين من تحويل أفكارهم إلى منتجات مخصصة باستخدام نماذج الذكاء الاصطناعي، مع إمكانية الانتقال إلى الإنتاج الواقعي.",

        "projects.p2.title": "موجة الأخبار",
        "projects.p2.short": "أخبار مخصصة مدعومة بالذكاء الاصطناعي.",
        "projects.p2.desc": "مجمّع أخبار ذكي يقدم تحديثات فورية مخصصة من أفضل المصادر العالمية، وفقًا لاهتمامات المستخدم.",

        "projects.p3.title": "تحسين الخطة الزراعية",
        "projects.p3.short": "زراعة مستدامة بالذكاء الاصطناعي.",
        "projects.p3.desc": "مشروع لتحسين الإنتاج الزراعي في الجزائر باستخدام خوارزميات البحث على الرسوم البيانية وتقنيات الإرضاء المقيد.",

        "projects.p4.title": "G-Jobs",
        "projects.p4.short": "منصة ذكية للوظائف في الجزائر.",
        "projects.p4.desc": "منصة ذكية تربط الباحثين عن عمل الجزائريين بأرباب العمل باستخدام فلاتر متقدمة ومراسلة وتتبع للوظائف.",

        "projects.p5.title": "محرك بحث متقدم",
        "projects.p5.short": "بحث نصي باستخدام TF-IDF وBM25.",
        "projects.p5.desc": "محرك بحث مبني بلغة Java يستخدم خوارزميات TF-IDF وBM25 لفهرسة وتحليل وترتيب المستندات النصية بكفاءة ودقة.",

        "projects.p6.title": "سلسلة مطاعم",
        "projects.p6.short": "إدارة متعددة الفروع للمطاعم.",
        "projects.p6.desc": "نظام لإدارة سلسلة مطاعم في عدة دول، يتضمن تنظيم الحجوزات، المخزون، وإدارة الموظفين.",

        "projects.p7.title": "سوبرماركت رقمي",
        "projects.p7.short": "نظام ذكي لإدارة السوبرماركت (CLI).",
        "projects.p7.desc": "تطبيق CLI لإدارة رقمية لسوبرماركت: الموردين، المخزون، المبيعات، والتقارير.",

        "projects.p8.title": "تحليل الشبكة الطرقية (خريطة)",
        "projects.p8.short": "خوارزميات رسوم بيانية متقدمة.",
        "projects.p8.desc": "مشروع تحليل شبكة الطرق في أفينيون باستخدام الرسوم البيانية: إيجاد المسارات القصيرة، التحقق من الاتصال وتحسين الشبكة.",
        "profile.heading": "نبذة عني",
        "profile.greeting": "مرحبًا، أنا مفتاح زينب.",
        "profile.text1": "مهندسة رقمية ومبتكرة شغوفة، أدمج الذكاء الاصطناعي مع فن التطوير لابتكار حلول مبتكرة تعيد تعريف المستقبل.",
        "profile.text2": "مستكشفة لخوارزميات متقدمة، أدفع باستمرار حدود الممكن من خلال المزج بين الخبرة التقنية والإبداع. كل مشروع هو مغامرة نحو الابتكار.",
        "profile.more": "معرفة المزيد عن مسيرتي",
        "langues.arabicLevel": "(C1) اللغة الأم",
        "langues.englishLevel": "(B2)طلِق",
        "langues.frenchLevel": "(B2)متقدم"

      }
    };  
    // --- Translation Function ---
    function translatePage(lang) {
      const translatableElements = document.querySelectorAll('[data-translate]');
      translatableElements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
  
      // Also update the <title>
      document.title = translations[lang]["page.title"] || document.title;
    }
  
    // --- Initialize translations on page load (default to French) ---
    translatePage("fr");
  
    // --- Language Switcher ---
    const langButtons = document.querySelectorAll(".lang-switcher button");
    langButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedLang = btn.getAttribute("data-lang");
        translatePage(selectedLang);
      });
    });
  
    // --- Other existing code for smooth scrolling, theme toggle, etc. ---
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: "smooth"
          });
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
    scrollIndicator.addEventListener("click", () => {
      const firstSection = document.querySelector("main section");
      if (firstSection) {
        window.scrollTo({
          top: firstSection.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
    });

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

  // Hamburger menu toggle for mobile
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  });
  