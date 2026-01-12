/* ===============================
   CONFIG
================================ */

const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

const servicesEl = document.getElementById("services");

/* ===============================
   LANGUAGE DETECTION
================================ */

const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") || "it";

/* ===============================
   TRANSLATIONS
================================ */

const I18N = {
  it: {
    pageTitle: "Servizi – Antica Cascina del Medico",
    button: "Leggi di più",
    services: [
      {
        title: "Matrimoni ed eventi",
        text:
          "Dove il paesaggio diventa scenografia e ogni dettaglio diventa emozione."
      },
      {
        title: "Social Eating",
        text:
          "Cene a tema su richiesta con cucina vegana, vegetariana e piemontese."
      },
      {
        title: "Yoga, meditazione e trattamenti",
        text:
          "Lezioni personalizzate e trattamenti detossificanti."
      },
      {
        title: "Digital detox",
        text:
          "Un weekend per staccare davvero e ricaricare le energie."
      },
      {
        title: "Escursioni e noleggio E-bike",
        text:
          "Alla scoperta del territorio biellese in E-bike."
      },
      {
        title: "Abbonamento brunch domenicale",
        text:
          "Un rituale domenicale di gusto e benessere, su richiesta."
      }
    ]
  },

  en: {
    pageTitle: "Services – Antica Cascina del Medico",
    button: "Read more",
    services: [
      {
        title: "Weddings & Events",
        text:
          "Where the landscape becomes a stage and every detail turns into emotion."
      },
      {
        title: "Social Eating",
        text:
          "Themed dinners on request with vegan, vegetarian and local cuisine."
      },
      {
        title: "Yoga, meditation & treatments",
        text:
          "Personalized lessons and detox treatments."
      },
      {
        title: "Digital detox",
        text:
          "A weekend to truly disconnect and recharge."
      },
      {
        title: "E-bike tours & rental",
        text:
          "Discovering the Biella area by E-bike."
      },
      {
        title: "Sunday brunch subscription",
        text:
          "A Sunday ritual of taste and wellbeing, on request."
      }
    ]
  },

  fr: {
    pageTitle: "Services – Antica Cascina del Medico",
    button: "En savoir plus",
    services: [
      {
        title: "Mariages et événements",
        text:
          "Quand le paysage devient décor et chaque détail une émotion."
      },
      {
        title: "Social Eating",
        text:
          "Dîners à thème sur demande avec cuisine végane, végétarienne et locale."
      },
      {
        title: "Yoga, méditation et soins",
        text:
          "Cours personnalisés et soins détoxifiants."
      },
      {
        title: "Digital detox",
        text:
          "Un week-end pour vraiment déconnecter et se ressourcer."
      },
      {
        title: "Excursions et location de vélos électriques",
        text:
          "À la découverte du territoire de Biella en vélo électrique."
      },
      {
        title: "Abonnement brunch du dimanche",
        text:
          "Un rituel dominical de goût et de bien-être, sur demande."
      }
    ]
  }
};

const COPY = I18N[lang] || I18N.it;

/* ===============================
   APPLY PAGE TITLE
================================ */

document.title = COPY.pageTitle;

/* ===============================
   FETCH & RENDER
================================ */

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach((item, index) => {
      if (!item.Image || !item.Image.url) return;

      const copy = COPY.services[index];
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
          <a href="#" class="btn">${COPY.button}</a>
        </div>
      `;

      servicesEl.appendChild(section);
    });
  })
  .catch(err => {
    console.error("Errore fetch Xano:", err);
  });

