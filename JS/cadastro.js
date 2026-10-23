// Validação básica dos formulários. Não salva dados nem cria contas ainda.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".register-grid form").forEach(function (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      const campos = formulario.querySelectorAll("input, select");
      for (const campo of campos) {
        if (!campo.value.trim()) {
          mensagemSite("Preencha todos os campos antes de continuar.", "error");
          campo.focus();
          return;
        }
      }
      //quando tiver o banco de dados só mudar aqui :P
      mensagemSite("Formulário preenchido! Para concluir o cadastro, ainda é necessário conectar o sistema a um servidor e banco de dados.", "success");
    });
  });
});
