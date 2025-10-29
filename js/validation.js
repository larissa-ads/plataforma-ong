// validation.js — validação + feedback elegante
function validarFormulario(form) {
  const campos = form.querySelectorAll('[required]');
  let valido = true;

  campos.forEach(campo => {
    if (!campo.nextElementSibling || !campo.nextElementSibling.classList.contains('erro-msg')) {
      const span = document.createElement('span');
      span.className = 'erro-msg';
      campo.insertAdjacentElement('afterend', span);
    }
    const erro = campo.nextElementSibling;

    if (!campo.checkValidity()) {
      campo.classList.add('erro');
      erro.textContent = 'Preencha corretamente este campo.';
      valido = false;
    } else {
      campo.classList.remove('erro');
      erro.textContent = '';
    }
  });

  return valido;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form-cadastro');
  const feedback = document.querySelector('#feedback');
  if (!form) return;

  function showFeedback(msg, ok = false) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.classList.toggle('ok', ok);
    feedback.classList.toggle('err', !ok);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormulario(form)) {
      salvarCadastro(form);
      showFeedback('✅ Cadastro enviado com sucesso!', true);
      form.reset();
    } else {
      showFeedback('⚠️ Por favor, corrija os campos destacados.', false);
    }
  });
});
