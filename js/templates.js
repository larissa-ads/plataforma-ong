// ---- templates.js --------------------------------------------------
// Função de template: gera o HTML de um card de projeto
function templateProjeto({ titulo, descricao, categoria = "Social", imagem = "imagens/banner.svg" }) {
  return `
    <article class="card-projeto" role="article">
      <img src="${imagem}" alt="Projeto: ${titulo}" loading="lazy" />
      <div class="card-projeto__body">
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <span class="pill">${categoria}</span>
      </div>
    </article>
  `;
}

// Dados de exemplo (você pode trocar ou complementar)
const PROJETOS = [
  {
    titulo: "Cesta Solidária",
    descricao: "Distribuição mensal de alimentos a famílias em situação de vulnerabilidade.",
    categoria: "Assistência",
    imagem: "imagens/cesta.svg"
  },
  {
    titulo: "Educa Jairo",
    descricao: "Reflexo escolar e inclusão digital para crianças e adolescentes.",
    categoria: "Educação",
    imagem: "imagens/educa.svg"
  },
  {
    titulo: "Eco Comunidade",
    descricao: "Mutirões de limpeza, reciclagem e educação ambiental no bairro.",
    categoria: "Meio Ambiente",
    imagem: "imagens/eco.svg"
  }
];

// Renderiza a lista de projetos no container
function renderProjetos(lista = PROJETOS) {
  const container = document.querySelector("#projetos-container");
  const empty = document.querySelector("#projetos-empty");

  if (!container) return;

  if (!lista || lista.length === 0) {
    container.innerHTML = "";
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  container.innerHTML = lista.map(templateProjeto).join("");
}

// Filtro por texto (opcional)
function filtrarProjetosPorTexto(texto) {
  const t = (texto || "").toLowerCase();
  return PROJETOS.filter(p =>
    p.titulo.toLowerCase().includes(t) ||
    p.descricao.toLowerCase().includes(t) ||
    (p.categoria || "").toLowerCase().includes(t)
  );
}

// Bind de eventos da UI (busca)
function bindProjetosUI() {
  const busca = document.querySelector("#busca-projetos");
  if (!busca) return;

  busca.addEventListener("input", (e) => {
    const termo = e.target.value;
    const filtrados = filtrarProjetosPorTexto(termo);
    renderProjetos(filtrados);
  });
}

// Inicializa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  renderProjetos();
  bindProjetosUI();
});
