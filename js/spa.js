// --------- spa.js (SPA básica por fetch + pushState) -----------------

(function () {
  const CONTAINER_SELECTOR = 'main#conteudo';
  const ACTIVE_CLASS = 'is-active';
  const NAV_LINK_SELECTOR = 'a.spa-link'; // aplique .spa-link nos links do menu

  const container = () => document.querySelector(CONTAINER_SELECTOR);

  function isInternal(url) {
    try {
      const u = new URL(url, window.location.origin);
      return u.origin === window.location.origin && u.pathname.endsWith('.html');
    } catch {
      return false;
    }
  }

  function setActiveLink(url) {
    document.querySelectorAll(NAV_LINK_SELECTOR).forEach(a => {
      const same = new URL(a.getAttribute('href'), location.origin).pathname === new URL(url, location.origin).pathname;
      a.classList.toggle(ACTIVE_CLASS, !!same);
      if (same) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  async function fetchAndSwap(url, push = true) {
    const resp = await fetch(url, { credentials: 'same-origin' });
    if (!resp.ok) throw new Error('Falha ao carregar: ' + url);

    const html = await resp.text();

    // Parseia o HTML carregado
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const newMain = doc.querySelector(CONTAINER_SELECTOR);
    const current = container();
    if (!newMain || !current) throw new Error('Estrutura sem <main id="conteudo">');

    // Atualiza título da aba
    const newTitle = doc.querySelector('title');
    if (newTitle) document.title = newTitle.textContent;

    // Troca o conteúdo do <main>
    current.innerHTML = newMain.innerHTML;

    // Opcional: foco acessível no primeiro h1
    const h1 = current.querySelector('h1, h2');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: false });
    }

    // Atualiza link ativo
    setActiveLink(url);

    // Atualiza URL sem recarregar
    if (push) history.pushState({ url }, '', url);

    // Re-inicializa comportamentos da página (se presentes)
    rehydratePage();
  }

  function rehydratePage() {
    // Estes métodos só existem se os arquivos tiverem sido carregados na página atual
    try { if (typeof bindMasks === 'function') bindMasks(); } catch {}
    try { if (typeof exibirCadastros === 'function') exibirCadastros(); } catch {}
    try { 
      // templates.js: se existir container de projetos, renderiza e liga busca
      const hasProjetos = document.querySelector('#projetos-container');
      if (hasProjetos && typeof renderProjetos === 'function') renderProjetos();
      if (hasProjetos && typeof bindProjetosUI === 'function') bindProjetosUI();
    } catch {}
  }

  function onLinkClick(e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    // só intercepta links internos .html com classe .spa-link
    if (!a.classList.contains('spa-link')) return;
    if (!isInternal(href)) return;

    e.preventDefault();
    const url = new URL(href, location.origin).pathname;
    fetchAndSwap(url).catch((err) => {
      console.error(err);
      // fallback: navega normal se der algo errado
      location.href = href;
    });
  }

  // Navegação por histórico (voltar/avançar)
  window.addEventListener('popstate', (e) => {
    const url = (e.state && e.state.url) || location.pathname;
    fetchAndSwap(url, /*push*/ false).catch(() => {});
  });

  // Delegação de clique para interceptar
  document.addEventListener('click', onLinkClick);

  // Marca link ativo inicial e hidrata a página atual
  document.addEventListener('DOMContentLoaded', () => {
    setActiveLink(location.pathname);
    rehydratePage();
  });
})();
