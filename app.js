console.log("APP Notion Style cargada");

// =============================================
// 1. Sidebar desplegable
// =============================================
document.querySelectorAll(".curso-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    target.style.display = target.style.display === "block" ? "none" : "block";
  });
});

// =============================================
// 2. Cargar markdown + generar TOC Notion
// =============================================
const contentBox = document.getElementById("markdown-container");
const tocList = document.getElementById("toc-list");

async function loadLesson(path) {
  contentBox.innerHTML = "<p><i>Cargando...</i></p>";

  const res = await fetch(path);
  const md = await res.text();

  contentBox.innerHTML = marked.parse(md);

  hljs.highlightAll();

  generateTOC();
  observeSections();
  document.getElementById("content").scrollTo({ top: 0, behavior: "smooth" });
}

// =============================================
// 3. Click en lecciones (sidebar)
// =============================================
document.querySelectorAll(".lecciones li").forEach((li) => {
  li.addEventListener("click", () => {
    document
      .querySelectorAll(".lecciones li")
      .forEach((x) => x.classList.remove("active"));
    li.classList.add("active");
    loadLesson(li.dataset.path);
  });
});

// =============================================
// 4. TOC DINÁMICO estilo NOTION
// =============================================
function generateTOC() {
  tocList.innerHTML = "";

  const headers = contentBox.querySelectorAll("h1, h2, h3");
  headers.forEach((h) => {
    const li = document.createElement("li");
    li.textContent = h.textContent;

    li.addEventListener("click", () => {
      h.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    tocList.appendChild(li);
  });
}

// =============================================
// 5. Scroll-sync para resaltar la sección activa
// =============================================
function observeSections() {
  const headers = contentBox.querySelectorAll("h1, h2, h3");
  const tocItems = [...tocList.querySelectorAll("li")];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocItems.forEach((i) => i.classList.remove("active"));
          const active = tocItems.find(
            (i) => i.textContent === entry.target.textContent
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { root: document.getElementById("content"), threshold: 0.3 }
  );

  headers.forEach((h) => observer.observe(h));
}
