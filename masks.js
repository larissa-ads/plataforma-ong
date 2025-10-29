// helpers
const onlyDigits = (v) => v.replace(/\D/g, "");

// CPF: 000.000.000-00
function maskCPF(v) {
  v = onlyDigits(v).slice(0, 11);
  return v
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// Telefone: (00) 00000-0000 ou (00) 0000-0000
function maskTelefone(v) {
  v = onlyDigits(v).slice(0, 11);
  if (v.length > 10) {
    return v
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
  return v
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

// CEP: 00000-000
function maskCEP(v) {
  v = onlyDigits(v).slice(0, 8);
  return v.replace(/(\d{5})(\d)/, "$1-$2");
}

// binding
function bindMasks() {
  const cpf = document.querySelector('#cpf');
  const tel = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');

  if (cpf) cpf.addEventListener('input', e => e.target.value = maskCPF(e.target.value));
  if (tel) tel.addEventListener('input', e => e.target.value = maskTelefone(e.target.value));
  if (cep) cep.addEventListener('input', e => e.target.value = maskCEP(e.target.value));
}

document.addEventListener('DOMContentLoaded', bindMasks);
