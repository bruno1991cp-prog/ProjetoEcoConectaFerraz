// Mensagens e caixas de diálogo personalizadas dentro do próprio site.
(function () {
  function preparar() {
    if (!document.getElementById('eco-toast-region')) {
      const region = document.createElement('div');
      region.id = 'eco-toast-region';
      region.className = 'eco-toast-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      document.body.appendChild(region);
    }
  }
  window.mensagemSite = function (mensagem, tipo = 'info') {
    preparar();
    const aviso = document.createElement('div');
    aviso.className = 'eco-toast eco-toast-' + tipo;
    const texto = document.createElement('span');
    texto.textContent = mensagem;
    const fechar = document.createElement('button');
    fechar.type = 'button'; fechar.className = 'eco-toast-close';
    fechar.setAttribute('aria-label', 'Fechar mensagem'); fechar.textContent = '×';
    fechar.addEventListener('click', () => aviso.remove());
    aviso.append(texto, fechar);
    document.getElementById('eco-toast-region').appendChild(aviso);
    window.setTimeout(() => aviso.remove(), 5000);
  };
  function dialogo({titulo, mensagem, campo, valorInicial = '', confirmar = false}) {
    return new Promise(resolve => {
      const fundo = document.createElement('div'); fundo.className = 'eco-dialog-backdrop';
      const caixa = document.createElement('section'); caixa.className = 'eco-dialog';
      caixa.setAttribute('role', 'dialog'); caixa.setAttribute('aria-modal', 'true');
      const h = document.createElement('h2'); h.textContent = titulo;
      const p = document.createElement('p'); p.textContent = mensagem;
      caixa.append(h, p);
      let input;
      if (campo) { input = document.createElement('input'); input.type = 'text'; input.placeholder = campo; input.value = valorInicial; input.className = 'eco-dialog-input'; caixa.append(input); }
      const acoes = document.createElement('div'); acoes.className = 'eco-dialog-actions';
      const cancelar = document.createElement('button'); cancelar.type = 'button'; cancelar.className = 'btn outline'; cancelar.textContent = confirmar || campo ? 'Cancelar' : 'Fechar';
      const ok = document.createElement('button'); ok.type = 'button'; ok.className = 'btn primary'; ok.textContent = campo ? 'Continuar' : (confirmar ? 'Confirmar' : 'Entendi');
      function terminar(resultado) { fundo.remove(); resolve(resultado); }
      cancelar.addEventListener('click', () => terminar(confirmar ? false : null));
      ok.addEventListener('click', () => terminar(campo ? input.value.trim() : (confirmar ? true : true)));
      fundo.addEventListener('click', e => { if (e.target === fundo) terminar(confirmar ? false : null); });
      acoes.append(cancelar, ok); caixa.append(acoes); fundo.append(caixa); document.body.append(fundo);
      if (input) { input.focus(); input.addEventListener('keydown', e => { if (e.key === 'Enter') ok.click(); }); } else ok.focus();
    });
  }
  window.confirmarSite = mensagem => dialogo({titulo:'Confirmar ação', mensagem, confirmar:true});
  window.perguntarSite = (mensagem, campo, valorInicial='') => dialogo({titulo:'Informações', mensagem, campo, valorInicial});
})();
