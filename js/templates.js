// ---- templates.js (com fetch + fallback) --------------------------
const PROJETOS = [
  { titulo: "Cesta Solidária", descricao: "Distribuição mensal de alimentos.", categoria: "Assistência", imagem: "imagens/cesta.svg" },
  { titulo: "Educa Jairo", descricao: "Reforço escolar e inclusão digital.", categoria: "Educação", imagem: "imagens/educa.svg" },
  { titulo: "Eco Comunidade", descricao: "Mutirões de limpeza e reciclagem.", categoria: "Meio Ambiente", imagem: "imagens/eco.svg" }
];

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

function bindProjetosUI(base = PROJETOS) {
  const busca = document.querySelector("#busca-projetos");
  if (!busca) return;
  busca.addEventListener("input", (e) => {
    const t = (e.target.value || "").toLowerCase();
    const filtrados = base.filter(p =>
      [p.titulo, p.descricao, p.categoria].join(" ").toLowerCase().includes(t)
    );
    renderProjetos(filtrados);
  });
}

async function carregarProjetos() {
  try {
    const r = await fetch("data/projetos.json", { cache: "no-store" });
    if (!r.ok) throw new Error("Falha ao carregar dados");
    const lista = await r.json();
    renderProjetos(lista);
    bindProjetosUI(lista);
  } catch (e) {
    console.warn("Usando fallback local:", e.message);
    renderProjetos(PROJETOS);
    bindProjetosUI(PROJETOS);
  }
}

document.addEventListener("DOMContentLoaded", carregarProjetos);
