export type Locale = "en" | "nl" | "de" | "fr"

export const locales: Locale[] = ["en", "nl", "de", "fr"]

export const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
  fr: "Français",
}

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Log In",
    "nav.signup": "Sign Up",
    "nav.careerAutopilot": "Career Autopilot",
    "nav.companies": "Companies",
    "nav.salaryIntelligence": "Salary Intelligence",
    "nav.alerts": "Job Alerts",
    "nav.applications": "Applications",

    // Hero
    "hero.title": "Your AI Co-Pilot for Career Success",
    "hero.subtitle":
      "Navigate your career journey with AI-powered insights, personalized recommendations, and real-time job market intelligence across Europe.",
    "hero.cta": "Start Your Journey",
    "hero.learnMore": "Learn More",

    // Features
    "features.title": "Everything You Need to Land Your Dream Job",
    "features.subtitle": "Powered by AI, designed for the European job market",

    // Footer
    "footer.tagline": "Your AI-powered career navigation system",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.gdpr": "GDPR Compliance",
    "footer.rights": "All rights reserved.",

    // GDPR
    "gdpr.title": "We value your privacy",
    "gdpr.message":
      "We use cookies and similar technologies to enhance your experience, analyze site traffic, and personalize content. By clicking 'Accept All', you consent to our use of cookies.",
    "gdpr.acceptAll": "Accept All",
    "gdpr.rejectAll": "Reject All",
    "gdpr.customize": "Customize",
  },
  nl: {
    // Navigation
    "nav.features": "Functies",
    "nav.pricing": "Prijzen",
    "nav.about": "Over Ons",
    "nav.contact": "Contact",
    "nav.login": "Inloggen",
    "nav.signup": "Aanmelden",
    "nav.careerAutopilot": "Carrière Autopilot",
    "nav.companies": "Bedrijven",
    "nav.salaryIntelligence": "Salaris Intelligentie",
    "nav.alerts": "Vacature Alerts",
    "nav.applications": "Sollicitaties",

    // Hero
    "hero.title": "Jouw AI Co-Piloot voor Carrière Succes",
    "hero.subtitle":
      "Navigeer je carrière met AI-aangedreven inzichten, gepersonaliseerde aanbevelingen en real-time arbeidsmarkt intelligentie in Europa.",
    "hero.cta": "Start Je Reis",
    "hero.learnMore": "Meer Informatie",

    // Features
    "features.title": "Alles Wat Je Nodig Hebt Voor Je Droombaan",
    "features.subtitle": "Aangedreven door AI, ontworpen voor de Europese arbeidsmarkt",

    // Footer
    "footer.tagline": "Jouw AI-aangedreven carrière navigatiesysteem",
    "footer.product": "Product",
    "footer.company": "Bedrijf",
    "footer.legal": "Juridisch",
    "footer.privacy": "Privacybeleid",
    "footer.terms": "Servicevoorwaarden",
    "footer.gdpr": "GDPR Naleving",
    "footer.rights": "Alle rechten voorbehouden.",

    // GDPR
    "gdpr.title": "We waarderen je privacy",
    "gdpr.message":
      "We gebruiken cookies en vergelijkbare technologieën om je ervaring te verbeteren, siteverkeer te analyseren en inhoud te personaliseren. Door op 'Alles Accepteren' te klikken, stem je in met ons gebruik van cookies.",
    "gdpr.acceptAll": "Alles Accepteren",
    "gdpr.rejectAll": "Alles Afwijzen",
    "gdpr.customize": "Aanpassen",
  },
  de: {
    // Navigation
    "nav.features": "Funktionen",
    "nav.pricing": "Preise",
    "nav.about": "Über Uns",
    "nav.contact": "Kontakt",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "nav.careerAutopilot": "Karriere Autopilot",
    "nav.companies": "Unternehmen",
    "nav.salaryIntelligence": "Gehalts-Intelligenz",
    "nav.alerts": "Job-Benachrichtigungen",
    "nav.applications": "Bewerbungen",

    // Hero
    "hero.title": "Dein KI Co-Pilot für Karriere-Erfolg",
    "hero.subtitle":
      "Navigiere deine Karriere mit KI-gestützten Einblicken, personalisierten Empfehlungen und Echtzeit-Arbeitsmarkt-Intelligenz in Europa.",
    "hero.cta": "Starte Deine Reise",
    "hero.learnMore": "Mehr Erfahren",

    // Features
    "features.title": "Alles Was Du Für Deinen Traumjob Brauchst",
    "features.subtitle": "Angetrieben von KI, entwickelt für den europäischen Arbeitsmarkt",

    // Footer
    "footer.tagline": "Dein KI-gestütztes Karriere-Navigationssystem",
    "footer.product": "Produkt",
    "footer.company": "Unternehmen",
    "footer.legal": "Rechtliches",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Nutzungsbedingungen",
    "footer.gdpr": "DSGVO-Konformität",
    "footer.rights": "Alle Rechte vorbehalten.",

    // GDPR
    "gdpr.title": "Wir schätzen deine Privatsphäre",
    "gdpr.message":
      "Wir verwenden Cookies und ähnliche Technologien, um deine Erfahrung zu verbessern, den Website-Verkehr zu analysieren und Inhalte zu personalisieren. Durch Klicken auf 'Alle Akzeptieren' stimmst du unserer Verwendung von Cookies zu.",
    "gdpr.acceptAll": "Alle Akzeptieren",
    "gdpr.rejectAll": "Alle Ablehnen",
    "gdpr.customize": "Anpassen",
  },
  fr: {
    // Navigation
    "nav.features": "Fonctionnalités",
    "nav.pricing": "Tarifs",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.careerAutopilot": "Autopilote Carrière",
    "nav.companies": "Entreprises",
    "nav.salaryIntelligence": "Intelligence Salariale",
    "nav.alerts": "Alertes Emploi",
    "nav.applications": "Candidatures",

    // Hero
    "hero.title": "Votre Co-Pilote IA pour le Succès Professionnel",
    "hero.subtitle":
      "Naviguez votre parcours professionnel avec des insights alimentés par l'IA, des recommandations personnalisées et une intelligence du marché du travail en temps réel en Europe.",
    "hero.cta": "Commencez Votre Voyage",
    "hero.learnMore": "En Savoir Plus",

    // Features
    "features.title": "Tout Ce Dont Vous Avez Besoin Pour Votre Emploi de Rêve",
    "features.subtitle": "Propulsé par l'IA, conçu pour le marché du travail européen",

    // Footer
    "footer.tagline": "Votre système de navigation de carrière alimenté par l'IA",
    "footer.product": "Produit",
    "footer.company": "Entreprise",
    "footer.legal": "Légal",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation",
    "footer.gdpr": "Conformité RGPD",
    "footer.rights": "Tous droits réservés.",

    // GDPR
    "gdpr.title": "Nous valorisons votre vie privée",
    "gdpr.message":
      "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, analyser le trafic du site et personnaliser le contenu. En cliquant sur 'Tout Accepter', vous consentez à notre utilisation des cookies.",
    "gdpr.acceptAll": "Tout Accepter",
    "gdpr.rejectAll": "Tout Rejeter",
    "gdpr.customize": "Personnaliser",
  },
}

export function getTranslation(locale: Locale, key: string): string {
  return translations[locale]?.[key] || translations.en[key] || key
}
