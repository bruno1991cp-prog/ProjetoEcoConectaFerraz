// Geração de token demonstrativa. O token não é persistido em servidor.
document.addEventListener("DOMContentLoaded", function () {
  let tokenAtual = "";
  const validade = document.getElementById("validade");
  if (validade) validade.value = new Date().toISOString().slice(0, 10);
  const form = document.getElementById("form");
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const coletor = document.getElementById("coletor").value;
    const operacao = document.getElementById("operacao").value;
    const residuo = document.getElementById("residuo").value;
    const dataValidade = validade.value;
    const parte = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    tokenAtual = "ECO-" + parte() + "-" + parte() + "-" + parte();
    document.getElementById("state").textContent = "Token gerado";
    document.getElementById("code").textContent = tokenAtual;
    document.getElementById("details").textContent = coletor + " • " + operacao + " • " + residuo + " • Validade: " + dataValidade;
    document.getElementById("copy").disabled = false;
    const tabela = document.getElementById("rows");
    if (tabela.querySelector("[colspan]")) tabela.innerHTML = "";
    const linha = document.createElement("tr");
    [new Date().toLocaleDateString("pt-BR"), coletor, operacao, residuo, tokenAtual, "Ativo (demo)"].forEach(function (valor, i) {
      const td = document.createElement("td");
      if (i === 5) { const span = document.createElement("span"); span.className = "status"; span.textContent = valor; td.append(span); } else td.textContent = valor;
      linha.append(td);
    });
    tabela.prepend(linha);
  });
  document.getElementById("copy").addEventListener("click", async function () {
    try { await navigator.clipboard.writeText(tokenAtual); this.textContent = "Copiado!"; mensagemSite("Token copiado com sucesso.", "success"); }
    catch { mensagemSite("Não foi possível copiar automaticamente. Seu token é: " + tokenAtual, "info"); }
  });
});
