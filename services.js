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
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  window.parent.postMessage({ type: "resize", height }, "*");
}

function openWixUrl(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function buildSection(item, content, index, ctaLabel) {
  const fullUrl = WIX_BASE + content.link;
  const isAlt = index % 2 !== 0;

  const section = document.createElement("section");
  section.className = `service${isAlt ? " service--alt" : ""}`;

  section.innerHTML = `
    <div class="service__image-wrap">
      <div class="service__image" style="background-image:url('${item.Image.url}')"></div>
    </div>

    <div class="service__content">
      <div class="service__inner">
        <h2>${content.title}</h2>
        <p>${content.text}</p>
        <a href="${fullUrl}" class="btn" rel="noopener noreferrer">${ctaLabel}</a>
      </div>
    </div>
  `;

  const btn = section.querySelector(".btn");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openWixUrl(fullUrl);
  });

  return section;
}

function setupHeightObservers() {
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => notifyWixHeight());
    ro.observe(document.body);
  }

  window.addEventListener("load", notifyWixHeight);
  window.addEventListener("resize", notifyWixHeight);

  setTimeout(notifyWixHeight, 150);
  setTimeout(notifyWixHeight, 400);
  setTimeout(notifyWixHeight, 900);
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
        if (!content || !item || !item.Image || !item.Image.url) return;

        const section = buildSection(item, content, index, copy.cta);
        servicesEl.appendChild(section);
      });

      setupHeightObservers();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setupHeightObservers();
    });
});
