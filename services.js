const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

const servicesEl = document.getElementById("services");

/* Copy locale (ok per ora, poi spostabile in Xano) */
const SERVICES_COPY = [
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
];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach((item, index) => {
      /* 🔒 guardia: niente blocchi rotti */
      if (!item.Image || !item.Image.url) return;

      const copy = SERVICES_COPY[index] || {};

      const section = document.createElement("section");
      section.className = "service";

      section.innerHTML = `
        <div
          class="service__image"
          style="background-image:url('${item.Image.url}')">
        </div>

        <div class="service__content">
          <h2>${copy.title || "Servizio"}</h2>
          <p>${copy.text || ""}</p>
          <a href="${copy.link || "#"}" class="btn">Leggi di più</a>
        </div>
      `;

      servicesEl.appendChild(section);
    });
  })
  .catch(err => {
    console.error("Errore fetch Xano:", err);
  });

