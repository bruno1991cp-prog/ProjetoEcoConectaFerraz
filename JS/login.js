// Login demonstrativo: ainda não autentica em um servidor ou banco de dados.
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector(".login-form form");
  const login = document.getElementById("login");
  const senha = document.getElementById("senha");
  const linkRecuperacao = document.querySelector('.form-row a');
  const botaoGoogle = document.querySelector(".google-btn");

  if (linkRecuperacao) linkRecuperacao.href = "recuperacao-senha.html";

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      if (!login.value.trim() || !senha.value) {
        mensagemSite("Informe seu e-mail ou CPF e sua senha.", "error");
        return;
      }
      //quando tiver o banco de dados só mudar aqui :P
      mensagemSite("Dados preenchidos. O login ainda precisa ser conectado a um sistema de autenticação.", "info");
    });
  }
  if (botaoGoogle) {
    botaoGoogle.addEventListener("click", function () {
      mensagemSite("O acesso com Google ainda não está configurado neste protótipo.", "info");
    });
  }
});
