// Pesquisa e filtro visual de coletores. Alterações não são salvas no banco.
document.addEventListener("DOMContentLoaded", function () {
  const busca = document.getElementById("q");
  const status = document.getElementById("status");
  const linhas = document.querySelectorAll("#rows tr:not(.empty-row)");
  const contador = document.getElementById("count");
  function filtrar() {
    let total = 0;
    document.querySelectorAll("#rows tr:not(.empty-row)").forEach(function (linha) {
      const texto = linha.innerText.toLowerCase();
      const buscaOk = texto.includes((busca?.value || "").toLowerCase());
      const statusOk = !status || status.value === "all" || linha.innerText.includes(status.value);
      linha.hidden = !(buscaOk && statusOk);
      if (!linha.hidden) total++;
    });
    if (contador) contador.textContent = "Mostrando " + total + " coletor(es)";
  }
  if (busca) busca.addEventListener("input", filtrar);
  if (status) status.addEventListener("change", filtrar);
  const novo = document.getElementById("new");
  if (novo) novo.addEventListener("click", function () { mensagemSite("O formulário de novo coletor ainda precisa ser conectado ao sistema de dados.", "info"); });
  document.querySelectorAll(".edit").forEach(function (botao) { botao.addEventListener("click", function () { mensagemSite("A edição ainda não está conectada ao banco de dados.", "info"); }); });
});
