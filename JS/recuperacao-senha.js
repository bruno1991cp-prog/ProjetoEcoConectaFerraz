// Exibe uma confirmação demonstrativa; não envia e-mail de recuperação.
// preciso repetir que precisa de um servidor e banco de dados pra funcionar direito? :P
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form");
  const conta = document.getElementById("account");
  const sucesso = document.getElementById("success");
  if (formulario) formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!conta.value.trim()) { mensagemSite("Informe seu e-mail ou CPF.", "error"); return; }
    if (sucesso) sucesso.classList.add("show");
  });
});
