
/* =========================
   CONFIG
   ========================= */
const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

/* =========================
   MULTI-LANGUAGE COPY
   ========================= */
const COPY = {
  it: {
    pageTitle: "Servizi – Antica Cascina del Medico",
    cta: "Leggi di più",
    services: [
      {
        title: "Matrimoni ed eventi",
        text: "Dove il paesaggio diventa scenografia e ogni dettaglio diventa emozione.",
        link: "#"
      },
      {
        title: "Social Eating",
        text: "Cene a tema su richiesta con cucina vegana, vegetariana e piemontese.",
        link: "#"
      },
      {
        title: "Yoga, meditazione e trattamenti",
        text: "Lezioni personalizzate e trattamenti detossificanti.",
        link: "#"
      },
      {
        title: "Digital detox",
        text: "Un weekend per staccare davvero e ricaricare le energie.",
        link: "#"
      },
      {
        title: "Escursioni e noleggio E-bike",
        text: "Alla scoperta del territorio biellese in E-bike.",
        link: "#"
      },
      {
        title: "Abbonamento brunch domenicale",
        text: "Un rituale domenicale di gusto e benessere, su richiesta.",
        link: "#"
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
        link: "#"
      },
      {
        title: "Social Eating",
        text: "Themed dinners on request with vegan, vegetarian and local cuisine.",
        link: "#"
      },
      {
        title: "Yoga, Meditation & Treatments",
        text: "Personalized sessions and detox treatments.",
        link: "#"
      },
      {
        title: "Digital Detox",
        text: "A weekend to truly disconnect and recharge.",
        link: "#"
      },
      {
        title: "E-bike Tours & Rental",
        text: "Discover the Biella area by E-bike.",
        link: "#"
      },
      {
        title: "Sunday Brunch Membership",
        text: "A weekly ritual of taste and well-being, on request.",
        link: "#"
      }
    ]
  },

  fr: {
    pageTitle: "Services – Antica Cascina del Medico",
    cta: "En savoir plus",
    services: [
      {
        title: "Mariages & Événements",
        text: "Quand le paysage devient décor et chaque détail émotion.",
        link: "#"
      },
      {
        title: "Social Eating",
        text: "Dîners à thème sur demande avec cuisine végane, végétarienne et locale.",
        link: "#"
      },
      {
        title: "Yoga, Méditation & Soins",
        text: "Séances personnalisées et soins détoxifiants.",
        link: "#"
      },
      {
        title: "Digital Detox",
        text: "Un week-end pour se déconnecter et se ressourcer.",
        link: "#"
      },
      {
        title: "Excursions & Location E-bike",
        text: "Découvrez le territoire de Biella en E-bike.",
        link: "#"
      },
      {
        title: "Abonnement Brunch du Dimanche",
        text: "Un rituel dominical de goût et de bien-être, sur demande.",
        link: "#"
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

/* =========================
   MAIN
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const servicesEl = document.getElementById("services");

  if (!servicesEl) {
    console.error("❌ #services container not found");
    return;
  }

  const lang = getLang();
  const copy = COPY[lang];

  /* aggiorna title */
  document.title = copy.pageTitle;

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) return;

      data.forEach((item, index) => {
        if (!item?.Image?.url) return;

        const textCopy = copy.services[index];
        if (!textCopy) return;

        const section = document.createElement("section");
        section.className = "service";

        section.innerHTML = `
          <div
            class="service__image"
            style="background-image:url('${item.Image.url}')">
          </div>

          <div class="service__content">
            <h2
