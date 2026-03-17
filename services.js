/* =========================
   CONFIG
   ========================= */
const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

const WIX_BASE = "https://caldrovandi.wixsite.com";

/* =========================
   COPY + LINKS
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
  }
};

/* =========================
   UTILS
   ========================= */
function notifyWixHeight() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "resize", height }, "*");
}

function openWixUrl(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function createServiceSection(item, content, index, ctaLabel) {
  const fullUrl = WIX_BASE + content.link;
  const isReverse = index % 2 !== 0;

  const section = document.createElement("section");
  section.className = `service${isReverse ? " service--reverse" : ""}`;

  section.innerHTML = `
    <div class="service__media">
      <div class="service__image" style="background-image:url('${item.Image.url}')"></div>
    </div>

    <div class="service__content">
      <div class="service__content-inner">
        <h2>${content.title}</h2>
        <p>${content.text}</p>
        <a href="${fullUrl}" class="btn" rel="noopener noreferrer">
          ${ctaLabel}
        </a>
      </div>
    </div>
  `;

  const btn = section.querySelector(".btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openWixUrl(fullUrl);
  });

  return section;
}

/* =========================
   MAIN
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const servicesEl = document.getElementById("services");
  if (!servicesEl) return;

  const copy = COPY.it;
  document.title = copy.pageTitle;

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) return;

      servicesEl.innerHTML = "";

      data.forEach((item, index) => {
        const content = copy.services[index];
        if (!content || !item?.Image?.url) return;

        const section = createServiceSection(item, content, index, copy.cta);
        servicesEl.appendChild(section);
      });

      setTimeout(notifyWixHeight, 250);
      window.addEventListener("load", notifyWixHeight);
      window.addEventListener("resize", notifyWixHeight);
    })
    .catch((err) => console.error("Fetch error:", err));
});
