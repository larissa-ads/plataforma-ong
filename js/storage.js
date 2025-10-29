// Chave usada no localStorage
const STORAGE_KEY = "cadastros";

// Utilitário: ler JSON com fallback seguro
function readJSON(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Utilitário: salvar JSON
function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Obtém todos os cadastros
function getCadastros() {
  return readJSON(STORAGE_KEY, []);
}

// Salva um novo cadastro
function salvarCadastro(form) {
  const dados = Object.fromEntries(new FormData(form).entries());

  // Normaliza e adiciona metadados simples
  const registro = {
    id: Date.now(),
    nome: (dados.nome || "").trim(),
    email: (dados.email || "").trim().toLowerCase(),
    telefone: (dados.telefone || "").trim(),
    cpf: (dados.cpf || "").trim(),
    cep: (dados.cep || "").trim(),
    criadoEm: new Date().toISOString()
  };

  const lista = getCadastros();
  lista.push(registro);
  writeJSON(STORAGE_KEY, lista);

  // Atualiza a listagem (se existir na página)
  exibirCadastros();
}

// Remove todos os cadastros (opcional para testes)
function limparCadastros() {
  writeJSON(STORAGE_KEY, []);
  exibirCadastros();
}

// Renderiza a listagem de cadastros, se houver um container
function exibirCadastros() {
  const container = document.querySelector("#lista-cadastros");
  if (!container) return; // nada a fazer se a página não tem a lista

  const lista = getCadastros();

  if (lista.length === 0) {
    container.innerHTML = "<li>Nenhum cadastro ainda.</li>";
    return;
  }

  container.innerHTML = lista
    .map((item, i) => {
      const data = new Date(item.criadoEm);
      const quando = data.toLocaleString();
      return `<li><strong>${i + 1}.</strong> ${item.nome} — ${item.email} <small>(${quando})</small></li>`;
    })
    .join("");
}

// Quando a página carregar, tenta renderizar a lista (se existir)
document.addEventListener("DOMContentLoaded", exibirCadastros);
