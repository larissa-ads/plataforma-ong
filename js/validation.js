// Função para validar o formulário de cadastro
function validarFormulario(form) {
  const campos = form.querySelectorAll('[required]');
  let valido = true;

  campos.forEach(campo => {
    const mensagemErro = campo.nextElementSibling;

    // cria elemento <span> se não existir
    if (!mensagemErro || !mensagemErro.classList.contains('erro-msg')) {
      const span = document.createElement('span');
      span.classList.add('erro-msg');
      campo.insertAdjacentElement('afterend', span);
    }

    const erro = campo.nextElementSibling;

    // valida se o campo está correto
    if (!campo.checkValidity()) {
      campo.classList.add('erro');
      erro.textContent = '⚠️ Preencha este campo corretamente.';
      valido = false;
    } else {
      campo.classList.remove('erro');
      erro.textContent = '';
    }
  });

  return valido;
}

// Captura o formulário e aplica a validação
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form-cadastro');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validarFormulario(form)) {
      salvarCadastro(form);
      alert('✅ Cadastro enviado com sucesso!');
      form.reset();
    } else {
      alert('Por favor, verifique os campos destacados.');
    }
  });
});
