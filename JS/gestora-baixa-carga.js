// Gestão demonstrativa de cargas. Os dados existem apenas na página aberta.
document.addEventListener("DOMContentLoaded", function () {
  const busca = document.getElementById("q"), status = document.getElementById("status");
  const rows = document.getElementById("rows");
  function filtrar() {
    let n = 0;
    rows.querySelectorAll("tr:not(.empty-row)").forEach(function (linha) {
      const ok = linha.innerText.toLowerCase().includes(busca.value.toLowerCase()) && (status.value === "all" || linha.innerText.includes(status.value));
      linha.hidden = !ok; if (ok) n++;
    });
    document.getElementById("count").textContent = "Exibindo " + n + " carga(s)";
  }
  busca.addEventListener("input", filtrar); status.addEventListener("change", filtrar);
  rows.addEventListener("click", async function (evento) {
    const botao = evento.target.closest(".finish"); if (!botao) return;
    const linha = botao.closest("tr"), celula = linha.cells[5];
    if (celula.innerText.includes("Concluída")) { mensagemSite("Esta carga já está concluída.", "info"); return; }
    if (await confirmarSite("Deseja confirmar a baixa desta carga?")) {
      celula.innerHTML = '<span class="status">Concluída</span>'; botao.textContent = "Ver";
      const done = document.getElementById("done"); done.textContent = Number(done.textContent) + 1; filtrar();
    }
  });
  document.getElementById("new").addEventListener("click", async function () {
    const token = await perguntarSite("Informe o token da carga:", "Ex.: ECO-1234-ABCD-EF56"); if (!token) return;
    const coletor = await perguntarSite("Informe o nome do coletor:", "Nome do coletor"); if (!coletor) return;
    const residuo = await perguntarSite("Informe o tipo de resíduo:", "Tipo de resíduo"); if (!residuo) return;
    const quantidade = (await perguntarSite("Informe a quantidade:", "Quantidade", "1 carga")) || "1 carga";
    const linha = document.createElement("tr");
    [token, coletor, residuo, quantidade, new Date().toLocaleDateString("pt-BR")].forEach(function (valor) { const td = document.createElement("td"); td.textContent = valor; linha.append(td); });
    const st = document.createElement("td"); st.innerHTML = '<span class="status warn">Pendente</span>'; linha.append(st);
    const a = document.createElement("td"), b = document.createElement("button"); b.className = "btn outline finish"; b.textContent = "Dar baixa"; a.append(b); linha.append(a);
    const vazia = rows.querySelector(".empty-row"); if (vazia) vazia.remove(); rows.prepend(linha);
    const total = document.getElementById("total"); total.textContent = Number(total.textContent) + 1; filtrar();
    mensagemSite("Carga adicionada à lista desta demonstração.", "success");
  });
});
