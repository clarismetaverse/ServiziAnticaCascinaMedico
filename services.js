/* =========================
   CONFIG
   ========================= */
const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

const WIX_BASE = "https://caldrovandi.wixsite.com";

/* =========================
   MULTI-LANGUAGE COPY + LINKS
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
        link: "/website-2/social-eating"
      },
      {
        title: "Yoga, meditazione e trattamenti",
        text: "Lezioni personalizzate e trattamenti detossificanti.",
        link: "/website-2/yoga-meditazione-e-trattamenti"
      },
      {
        title: "Digital detox",
        text: "Un weekend per staccare davvero e ricaricare le energie.",
        link: "/website-2/digital-detox"
      },
      {
        title: "Escursioni e noleggio E-bike",
        text: "Alla scoperta del territorio biellese in E-bike.",
        link: "/website-2/escursioni"
      },
      {
        title: "Organizza eventi e cerimonie",
        text: "Esperienze su misura per eventi privati e aziendali.",
        link: "/website-2/organizza-eventi-o-cerimonie"
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
        link: "/website-2/matrimoni"
      },
      {
        title: "Social Eating",
        text: "Themed dinners on request with vegan, vegetarian and local cuisine.",
        link: "/website-2/social-eating"
      },
      {
        title: "Yoga, Meditation & Treatments",
        text: "Personalized sessions and detox treatments.",
        link: "/website-2/yoga-meditazione-e-trattamenti"
      },
      {
        title: "Digital Detox",
        text: "A weekend to truly disconnect and recharge.",
        link: "/website-2/digital-detox"
      },
      {
        title: "E-bike Tours & Rental",
        text: "Discover the Biella area by E-bike.",
        link: "/website-2/escursioni"
      },
      {
        title: "Events & Ceremonies",
        text: "Tailor-made experiences for private and corporate events.",
        link: "/website-2/organizza-eventi-o-cerimonie"
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
        link: "/website-2/matrimoni"
      },
      {
        title: "Social Eating",
        text: "Dîners à thème sur demande avec cuisine locale.",
        link: "/website-2/social-eating"
      },
      {
        title: "Yoga, Méditation & Soins",
        text: "Séances personnalisées et soins détoxifiants.",
        link: "/website-2/yoga-meditazione-e-trattamenti"
      },
      {
        title: "Digital Detox",
        text: "Un week-end pour se déconnecter et se ressourcer.",
        link: "/website-2/digital-detox"
      },
      {
        title: "Excursions E-bike",
        text: "Découvrez le territoire de Biella en E-bike.",
        link: "/website-2/escursioni"
      },
      {
        title: "Événements & Cérémonies",
        text: "Expériences sur mesure pour événements privés.",
        link: "/website-2/organizza-eventi-o-cerimonie"
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

  document.title = copy.pageTitle;

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
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
            <a href="${WIX_BASE + c.link}" target="_top" class="btn">
              ${copy.cta}
            </a>
          </div>
        `;

        servicesEl.appendChild(section);
      });

      setTimeout(notifyWixHeight, 150);
    });
});
