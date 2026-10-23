// Pequenas interações da página inicial.
document.addEventListener("DOMContentLoaded", function () {
  // Os links de navegação já funcionam por meio de âncoras e páginas HTML.
  document.querySelectorAll('a[href="#solicitar"]').forEach(function (link) {
    link.addEventListener("click", function () {
      const secao = document.getElementById("solicitar");
      if (secao) secao.setAttribute("tabindex", "-1");
    });
  });
});
