// Expandir/cerrar cursos
document.querySelectorAll(".curso-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const list = btn.nextElementSibling;
    list.style.display = list.style.display === "block" ? "none" : "block";
  });
});

// Cargar lecciones y renderizar Markdown
document.querySelectorAll(".lecciones li").forEach((item) => {
  item.addEventListener("click", async () => {
    const path = item.dataset.path;

    const response = await fetch(path);
    const markdown = await response.text();

    const html = marked.parse(markdown);

    document.getElementById("content").innerHTML = html;

    // re-aplicar highlight en cada carga
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  });
});
