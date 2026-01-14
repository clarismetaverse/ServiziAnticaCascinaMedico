/* =========================
   CONFIG
   ========================= */
const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

/* =========================
   MULTI-LANGUAGE COPY + LINKS WIX
   ========================= */
const COPY = {
  it: {
    pageTitle: "Servizi – Antica Cascina del Medico",
    cta: "Leggi di più",
    services: [
      {
        title: "Matrimoni ed eventi",
        text: "Dove il paesaggio diventa scenografia e ogni dettaglio diventa emozione.",
        link: "/website-2/matrimoni"
      },
      {
        title: "Social Eating",
        text: "Cene a tema su richiesta con cucina vegana, vegetariana e piemontese.",
        link: "/social-eating"
      },
      {
        title: "Yoga, meditazione e trattamenti",
        text: "Lezioni personalizzate e trattamenti detossificanti.",
        link: "/yoga-meditazione-e-trattamenti"
      },
      {
        title: "Digital detox",
        text: "Un weekend per staccare davvero e ricaricare le energie.",
        link: "/digital-detox"
      },
      {
        title: "Escursioni e noleggio E-bike",
        text: "Alla scoperta del territorio biellese in E-bike.",
        link: "/escursioni"
      },
      {
        title: "Organizza eventi e cerimonie",
        text: "Esperienze su misura per eventi privati e aziendali.",
        link: "/organizza-eventi-cerimonie"
      }
    ]
  },

  en: {
    pageTitle: "Services – Antica Cascina del Medico",
    cta: "Read more",
    services: [
      {
        title: "Weddings & Events",
        text: "Where the landscape becomes a stage and every detail turns into emotion.",
        link: "/en/website-2/matrimoni"
      },
      {
        title: "Social Eating",
        text: "Themed dinners on request with vegan, vegetarian and local cuisine.",
        link: "/en/social-eating"
      },
      {
        title: "Yoga, Meditation & Treatments",
        text: "Personalized sessions and detox treatments.",
        link: "/en/yoga-meditazione-e-trattamenti"
      },
      {
        title: "Digital Detox",
        text: "A weekend to truly disconnect and recharge.",
        link: "/en/digital-detox"
      },
      {
        title: "E-bike Tours & Rental",
        text: "Discover the Biella area by E-bike.",
        link: "/en/escursioni"
      },
      {
        title: "Events & Ceremonies",
        text: "Tailor-made experiences for private and corporate events.",
        link: "/en/organizza-eventi-cerimonie"
      }
    ]
  },

  fr: {
    pageTitle: "Services – Antica Cascina del Medico",
    cta: "En savoir plus",
    services: [
      {
        title: "Mariages & Événements",
        text: "Quand le paysage devient décor et chaque détail une émotion.",
        link: "/fr/website-2/matrimoni"
      },
      {
        title: "Social Eating",
        text: "Dîners à thème sur demande avec cuisine végane, végétarienne et locale.",
        link: "/fr/social-eating"
      },
      {
        title: "Yoga, Méditation & Soins",
        text: "Séances personnalisées et soins détoxifiants.",
        link: "/fr/yoga-meditazione-e-trattamenti"
      },
      {
        title: "Digital Detox",
        text: "Un week-end pour se déconnecter et se ressourcer.",
        link: "/fr/digital-detox"
      },
      {
        title: "Excursions & Location E-bike",
        text: "Découvrez le territoire de Biella en E-bike.",
        link: "/fr/escursioni"
      },
      {
        title: "Événements & Cérémonies",
        text: "Expériences sur mesure pour événements privés et professionnels.",
        link: "/fr/organizza-eventi-cerimonie"
      }
    ]
  }
};

/* =========================
   UTILS
   ========================= */
function getLang() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return ["it", "en", "fr"].includes(lang) ? lang : "it";
}

/* comunica a Wix l'altezza reale */
function notifyWixHeight() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "resize", height }, "*");
}

/* =========================
   MAIN
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const servicesEl = document.getElementById("services");
  if (!servicesEl) return;

  const lang = getLang();
  const copy = COPY[lang];

  document.documentElement.lang = lang;
  document.title = copy.pageTitle;

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) return;

      data.forEach((item, index) => {
        if (!item?.Image?.url) return;
        const c = copy.services[index];
        if (!c) return;

        const section = document.createElement("section");
        section.className = "service";
        section.innerHTML = `
          <div class="service__image"
               style="background-image:url('${item.Image.url}')"></div>
          <div class="service__content">
            <h2>${c.title}</h2>
            <p>${c.text}</p>
            <a href="${c.link}" class="btn">${copy.cta}</a>
          </div>
        `;
        servicesEl.appendChild(section);
      });

      /* resize finale per Wix */
      setTimeout(notifyWixHeight, 150);
    })
    .catch(err => console.error("Fetch error:", err));
});
