// Pesquisa e filtros da tabela de transparência.
document.addEventListener("DOMContentLoaded", function () {
  function filtrar() {
    let n = 0;
    document.querySelectorAll("#rows tr:not(.empty-row)").forEach(function (linha) {
      const texto = linha.innerText.toLowerCase();
      const busca = document.getElementById("q").value.toLowerCase();
      const tipo = document.getElementById("tipo").value;
      const status = document.getElementById("st").value;
      const ok = (!busca || texto.includes(busca)) && (tipo === "all" || linha.dataset.t === tipo) && (status === "all" || linha.dataset.s === status);
      linha.hidden = !ok; if (ok) n++;
    });
    const vazia = document.querySelector("#rows .empty-row"); if (vazia) vazia.hidden = n > 0;
    document.getElementById("count").textContent = "Exibindo " + n + " registro(s)";
  }
  ["q", "tipo", "st"].forEach(function (id) { const el = document.getElementById(id); if (el) el.addEventListener(id === "q" ? "input" : "change", filtrar); });
  document.querySelectorAll(".tab").forEach(function (botao) { botao.addEventListener("click", function () { document.querySelectorAll(".tab").forEach(t => t.classList.remove("active")); botao.classList.add("active"); }); });
});
