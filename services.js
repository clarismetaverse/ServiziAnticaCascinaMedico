const API_URL =
  "https://xbut-eryu-hhsg.f2.xano.io/api:fXy8ZMiW/Pictures";

const servicesEl = document.getElementById("services");

/* TITOLI */
const titles = [
  "Matrimoni ed eventi",
  "Social Eating",
  "Yoga, meditazione e trattamenti",
  "Digital detox",
  "Escursioni e noleggio E-bike",
  "Abbonamento brunch domenicale"
];

/* DESCRIZIONI */
const descriptions = [
  "Dove il paesaggio diventa scenografia e ogni dettaglio diventa emozione.",
  "Cene a tema su richiesta con cucina vegana, vegetariana e piemontese.",
  "Lezioni personalizzate e trattamenti detossificanti.",
  "Un weekend per staccare davvero e ricaricare le energie.",
  "Alla scoperta del territorio biellese in E-bike.",
  "Un rituale domenicale di gusto e benessere."
];

/* LINK PAGINE WIX */
const links = [
  "https://caldrovandi.wixsite.com/website-2/matrimoni",
  "https://caldrovandi.wixsite.com/website-2/social-eating",
  "https://caldrovandi.wixsite.com/website-2/yoga-meditazione-e-trattamenti",
  "https://caldrovandi.wixsite.com/website-2/digital-detox",
  "https://caldrovandi.wixsite.com/website-2/escursioni",
  null // brunch NON collegato (per ora)
];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach((item, index) => {
      const section = document.createElement("section");
      section.className = "service";

      const link = links[index];

      section.innerHTML = `
        <div class="service__image"
          style="background-image:url('${item.Image.url}')">
        </div>

        <div class="service__content">
          <h2>${titles[index] ?? "Servizio"}</h2>
          <p>${descriptions[index] ?? ""}</p>

          ${
            link
              ? `<a href="${link}" class="btn" target="_top">Leggi di più</a>`
              : `<span class="btn disabled">In arrivo</span>`
          }
        </div>
      `;

      servicesEl.appendChild(section);
    });
  })
  .catch(err => {
    console.error("Errore caricamento Xano:", err);
  });
