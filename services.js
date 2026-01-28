const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

const WIX_BASE = "https://caldrovandi.wixsite.com";

const COPY = {
  it: {
    pageTitle: "Servizi – Antica Cascina del Medico",
    cta: "Leggi di più",
    services: [
      { title: "Matrimoni ed eventi", text: "Dove il paesaggio diventa scenografia e ogni dettaglio diventa emozione.", link: "/website-2/matrimoni" },
      { title: "Social Eating", text: "Cene a tema su richiesta con cucina vegana, vegetariana e piemontese.", link: "/website-2/social-eating" },
      { title: "Yoga, meditazione e trattamenti", text: "Lezioni personalizzate e trattamenti detossificanti.", link: "/website-2/yoga-meditazione-e-trattamenti" },
      { title: "Digital detox", text: "Un weekend per staccare davvero e ricaricare le energie.", link: "/website-2/digital-detox" },
      { title: "Escursioni e noleggio E-bike", text: "Alla scoperta del territorio biellese in E-bike.", link: "/website-2/escursioni" },
      { title: "Organizza eventi e cerimonie", text: "Esperienze su misura per eventi privati e aziendali.", link: "/website-2/organizza-eventi-o-cerimonie" }
    ]
  }
};

function notifyWixHeight() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "resize", height }, "*");
}

document.addEventListener("DOMContentLoaded", () => {
  const servicesEl = document.getElementById("services");

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach((item, index) => {
        const c = COPY.it.services[index];
        if (!item?.Image?.url || !c) return;

        const section = document.createElement("section");
        section.className = "service";

        section.innerHTML = `
          <div class="service__image" style="background-image:url('${item.Image.url}')"></div>
          <div class="service__content">
            <h2>${c.title}</h2>
            <p>${c.text}</p>
            <a href="${WIX_BASE + c.link}" target="_top" class="btn">Leggi di più</a>
          </div>
        `;

        servicesEl.appendChild(section);
      });

      setTimeout(notifyWixHeight, 200);
    });
});
