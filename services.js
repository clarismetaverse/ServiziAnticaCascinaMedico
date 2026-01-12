/* =========================
   CONFIG
   ========================= */
const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

const servicesEl = document.getElementById("services");

/* =========================
   LINGUA (da Wix → URL)
   ========================= */
const params = new URLSearchParams(window.location.search);
const LANG = params.get("lang") || document.documentElement.dataset.lang || "it";

/* aggiorna attributo <html lang=""> */
document.documentElement.lang = LANG;

/* =========================
   TITLE MULTILINGUA
   ========================= */
const PAGE_TITLES = {
  it: "Servizi – Antica Cascina del Medico",
  en: "Services – Antica Cascina del Medico",
  fr: "Services – Antica Cascina del Medico"
};

document.title = PAGE_TITLES[LANG] || PAGE_TITLES.it;

/* =========================
   COPY MULTILINGUA
   ========================= */
const SERVICES_COPY = {
  it: [
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
  ],

  en: [
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
      title: "Yoga, meditation and treatments",
      text: "Personalized classes and detoxifying treatments.",
      link: "#"
    },
    {
      title: "Digital detox",
      text: "A weekend to truly disconnect and recharge.",
      link: "#"
    },
    {
      title: "E-bike tours & rentals",
      text: "Discover the Biella area with guided E-bike excursions.",
      link: "#"
    },
    {
      title: "Sunday brunch membership",
      text: "A Sunday ritual of taste and wellbeing, on request.",
      link: "#"
    }
  ],

  fr: [
    {
      title: "Mariages et événements",
      text: "Là où le paysage devient une scène et chaque détail une émotion.",
      link: "#"
    },
    {
      title: "Social Eating",
      text: "Dîners à thème sur demande avec cuisine végane, végétarienne et locale.",
      link: "#"
    },
    {
      title: "Yoga, méditation et soins",
      text: "Cours personnalisés et soins détoxifiants.",
      link: "#"
    },
    {
      title: "Détox digitale",
      text: "Un week-end pour se déconnecter vraiment et se ressourcer.",
      link: "#"
    },
    {
      title: "Excursions et location de E-bike",
      text: "À la découverte du territoire de Biella en vélo électrique.",
      link: "#"
    },
    {
      title: "Abonnement brunch du dimanche",
      text: "Un rituel dominical de goût et de bien-être, sur demande.",
      link: "#"
    }
  ]
};

/* fallback sicuro */
const COPY = SERVICES_COPY[LANG] || SERVICES_COPY.it;

/* =========================
   FETCH + RENDER
   ========================= */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach((item, index) => {
      /* guardia: niente blocchi rotti */
      if (!item.Image || !item.Image.url) return;

      const copy = COPY[index];
      if (!copy) return;

      const section = document.createElement("section");
      section.className = "service";

      section.innerHTML = `
        <div
          class="service__image"
          style="background-image:url('${item.Image.url}')">
        </div>

        <div class="service__content">
          <h2>${copy.title}</h2>
          <p>${copy.text}</p>
          <a href="${copy.link}" class="btn">Leggi di più</a>
        </div>
      `;

      servicesEl.appendChild(section);
    });
  })
  .catch(err => {
    console.error("Errore fetch Xano:", err);
  });

