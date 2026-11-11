
document.addEventListener("DOMContentLoaded", function () {

    // Campo de seleção do perfil
    const seletorPerfil = document.getElementById("perfil");

    // Referências dos formulários
    const formularios = {
        cidadao: document.getElementById("form-cidadao"),
        coletor: document.getElementById("form-coletor"),
        empresa: document.getElementById("form-empresa")
    };

    // Esconde todos os formulários
    function ocultarFormularios() {

        Object.values(formularios).forEach(function (formulario) {

            formulario.hidden = true;

        });

    }

    // Exibe o formulário correspondente ao perfil escolhido
    function exibirFormulario() {

        ocultarFormularios();

        const perfilSelecionado = seletorPerfil.value;

        if (formularios[perfilSelecionado]) {

            formularios[perfilSelecionado].hidden = false;

        }

    }

    // Verifica se os elementos existem
    if (!seletorPerfil) {
        console.error("Campo de seleção de perfil não encontrado.");
        return;
    }

    // Inicializa a página sem formulários abertos
    ocultarFormularios();

    // Detecta a mudança de perfil
    seletorPerfil.addEventListener("change", exibirFormulario);

});
