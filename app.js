console.log("APP Notion cargada correctamente");

/* =====================================================
   1. Sidebar — desplegar cursos
===================================================== */
document.querySelectorAll(".curso-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    target.style.display = target.style.display === "block" ? "none" : "block";
  });
});

/* =====================================================
   2. Cargar Markdown con Marked
===================================================== */
const contentBox = document.getElementById("markdown-container");
const tocList = document.getElementById("toc-list");

async function loadLesson(path) {
  contentBox.innerHTML = "<p><i>Cargando...</i></p>";

  const res = await fetch(path);
  const md = await res.text();

  const html = marked.parse(md);
  contentBox.innerHTML = html;

  enhanceCodeBlocks();
  generateTOC();
  observeSections();

  document.getElementById("content").scrollTo({ top: 0, behavior: "smooth" });
}

/* =====================================================
   3. Click en lecciones sidebar
===================================================== */
document.querySelectorAll(".lecciones li").forEach((li) => {
  li.addEventListener("click", () => {
    document
      .querySelectorAll(".lecciones li")
      .forEach((x) => x.classList.remove("active"));
    li.classList.add("active");
    loadLesson(li.dataset.path);
  });
});

/* =====================================================
   4. TOC dinámico
===================================================== */
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

/* =====================================================
   5. Scroll Sync TOC
===================================================== */
function observeSections() {
  const headers = contentBox.querySelectorAll("h1, h2, h3");
  const tocItems = [...tocList.querySelectorAll("li")];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocItems.forEach((i) => i.classList.remove("active"));

          const found = tocItems.find(
            (i) => i.textContent === entry.target.textContent
          );
          if (found) found.classList.add("active");
        }
      });
    },
    { root: document.getElementById("content"), threshold: 0.25 }
  );

  headers.forEach((h) => observer.observe(h));
}

/* =====================================================
   6. Código mejorado + Botón "Copiar"
===================================================== */
function enhanceCodeBlocks() {
  document.querySelectorAll("pre code").forEach((block) => {
    // Highlight
    hljs.highlightElement(block);

    // Botón copiar
    const btn = document.createElement("button");
    btn.textContent = "Copiar";
    btn.className = "copy-btn";

    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(block.textContent.trim());
      btn.textContent = "Copiado ✔";
      setTimeout(() => (btn.textContent = "Copiar"), 1500);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "code-wrapper";

    block.parentNode.replaceWith(wrapper);
    wrapper.appendChild(btn);

    const pre = document.createElement("pre");
    pre.appendChild(block);
    wrapper.appendChild(pre);
  });
}
