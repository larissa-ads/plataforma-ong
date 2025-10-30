# 🌍 ONG Seu Jairo — Plataforma Social

Este repositório contém o desenvolvimento completo da plataforma web **ONG Seu Jairo**, criado como projeto acadêmico para a disciplina de **Desenvolvimento Web**.

---

## 🎯 Objetivo do Projeto

Promover a transparência e a participação comunitária por meio de uma plataforma digital acessível, moderna e responsiva, que permite:
- Consultar **projetos sociais ativos**;
- Realizar **cadastro de voluntários e doadores**;
- Simular **doações e participações**;
- Explorar boas práticas de **acessibilidade e versionamento**.

---

## 🧱 Estrutura do Projeto

📁 plataforma-ong/
│
├── index.html → Página inicial (sobre a ONG e missão)
├── projetos.html → Listagem dinâmica dos projetos sociais
├── cadastro.html → Formulário com máscaras e validação
│
├── css/
│ └── style.css → Estilos gerais + modo escuro (WCAG 2.1 AA)
│
├── js/
│ ├── masks.js → Máscaras de CPF, CEP e telefone
│ ├── templates.js → Renderização dinâmica de projetos via JSON
│ └── spa.js → Navegação SPA simulada (DOM)
│
├── data/
│ └── projetos.json → Banco de dados local dos projetos
│
└── imagens/
├── logo.png
├── banner.png
├── edu.svg
├── eco.svg
└── cesta.svg


---

## 💡 Tecnologias Utilizadas

- **HTML5 Semântico**
- **CSS3 (Flexbox e Grid, Mobile First)**
- **JavaScript Modular (ES6)**
- **JSON local**
- **Git e GitHub (GitFlow e versionamento semântico)**

---

## ♿ Acessibilidade (WCAG 2.1 Nível AA)

Foram implementadas as seguintes práticas:

- Navegação completa via teclado (Tab, Shift+Tab);
- Elementos com foco visível e acessível;
- “Skip Link” para pular diretamente ao conteúdo principal;
- Contraste de cores superior a 4.5:1;
- Suporte a **modo escuro automático** (`prefers-color-scheme`);
- Imagens com `alt` descritivo e estrutura semântica em todos os níveis.

---

## 🌱 Versionamento

- Estrutura de **branches** seguindo o modelo **GitFlow**:
  - `main` → produção
  - `develop` → desenvolvimento
  - `feature/acessibilidade-wcag` → implementação da Entrega IV
- Histórico de commits **semântico e organizado** (ex: `feat`, `fix`, `docs`, `style`, `refactor`);
- Pull Requests documentados;
- Issues e milestones configuráveis.

---

## 🚀 Deploy

O projeto foi publicado via **GitHub Pages**.

🔗 **Acesse online:**  
👉 [https://larissa-ads.github.io/plataforma-ong/](https://larissa-ads.github.io/plataforma-ong/)

---

## 📸 Demonstração Visual

| Página | Descrição |
|--------|------------|
| 🏠 **Início** | Apresenta a missão e valores da ONG |
| 💚 **Projetos** | Lista dinâmica de projetos com busca e filtros |
| 📝 **Cadastro** | Formulário validado e com máscaras de entrada |
| 🌗 **Modo Escuro** | Adaptação automática conforme preferências do sistema |

📷 *Adicione aqui prints das principais telas (Início, Projetos, Cadastro).*

---

## 🧾 Autor(a)

**👩‍💻 Larissa Batista**  
Estudante de Análise e Desenvolvimento de Sistemas  
🔗 [LinkedIn](https://www.linkedin.com/in/larissa-batista-96340226a)  
🔗 [GitHub](https://github.com/larissa-ads)

---

## 📚 Licença

Projeto acadêmico — uso educacional e demonstrativo.
