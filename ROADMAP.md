Que ótimo! O projeto já tem uma base sólida e agora vai ganhar profundidade com conteúdo real e funcionalidades mais avançadas. 

Vou organizar um **Roadmap Estratégico** dividido em **Fases**, priorizando o que vai gerar mais impacto visual e utilidade para a comunidade, ao mesmo tempo que te dá uma estrutura clara para executar sem se perder.

Aqui está o plano:

---

## 🗺️ Roadmap de Desenvolvimento - Portal Nin Online BR

---

### 🏗️ FASE 0 – FUNDAÇÃO E PÁGINAS "EM CONSTRUÇÃO" (Prioridade Alta)
*Objetivo: Garantir que todas as rotas existam e tenham uma cara bonita, mesmo sem conteúdo final.*

- [X] **Criar placeholders "Em Construção":** Para as páginas `Wiki`, `Médicos` e `Mapa Interativo`.
- [X] **Gerar imagem temática:** Use o prompt abaixo no Gemini para criar uma imagem de "ninjas trabalhando/construindo" para colocar como fundo dessas páginas.
- [X] **Criar componente `UnderConstruction`:** Um componente reutilizável (com a imagem de fundo, título "🚧 Em Construção" e um texto motivacional) para usar nessas páginas.
- [X] **Adicionar rota `/mapa-interativo`** no Header e no `App.jsx`.

**🎨 Prompt para imagem "Em Construção":**
> "Ilustração digital estilo anime, mostrando dois ninjas da Vila da Folha (com uniformes verdes ou coletes) sentados em um telhado, um segurando um pergaminho e um pincel, e o outro segurando uma planta baixa ou mapa. Ao fundo, a vila está sendo reconstruída ou expandida com andaimes de madeira. Céu azul claro com nuvens. Estilo alegre e produtivo, arte promocional de Naruto. Deixe espaço central vazio para sobreposição de textos."

---

### 📄 FASE 1 – PÁGINA DA POLÍCIA (Conteúdo Real e Avançado)
*Objetivo: Transformar a página da Polícia em uma enciclopédia prática para os jogadores.*

- [ ] **1.1 Glossário de Territórios (Mapa):**
  - Criar um arquivo `src/data/territories.js` com um array de objetos: `{ name: "Floresta da Morte", sigla: "FM", description: "Área densa..." }`.
  - Adicionar uma nova seção/accordion na página da Polícia chamada "🗺️ Glossário do Mapa", exibindo essa lista de forma organizada (tabela ou cards pequenos).
  - **Extra:** Adicionar uma imagem estática do mapa do jogo (baixada do jogo) com marcações sobrepostas (pode ser feito com CSS posicionando divs com `position: absolute` ou apenas exibir a imagem e a legenda ao lado).

- [ ] **1.2 Guia de Raids e Combinações de Maestrias:**
  - Criar uma nova seção chamada "⚡ Esquadrões Táticos".
  - Conteúdo sugerido: Cards descrevendo "Esquadrão Terra", "Esquadrão Fogo/Vento" (Sinergia), explicando vantagens e desvantagens, e a formação recomendada (ex: 2 DPS, 1 Suporte, 1 Médico).

- [ ] **1.3 Seção de Combate com Vídeos (Combos e Cancels):**
  - Substituir os textos atuais de "Combos" e "Cancels" por um layout de **Cards de Mídia** (similar ao que usamos no Tournament, mas com vídeo e descrição).
  - Criar estrutura de dados: `{ id, title, type: 'combo' | 'cancel', videoUrl: '/videos/combo_x.mp4', description: 'Texto explicativo', tags: ['Em Grupo', 'Reação'] }`.
  - Exibir os vídeos em loop (autoPlay muted loop) dentro dos cards expandidos.

- [ ] **1.4 Mecânicas Detalhadas (Algemas e Prisão):**
  - Manter a seção atual, mas adicionar imagens ilustrativas da algema ou da tela da prisão Hyoketsu (prints do jogo).

---

### 📚 FASE 2 – WIKI: MAESTRIAS (Base de Dados e Visualização)
*Objetivo: Criar a página de Wiki focada nas maestrias, com dados técnicos e visuais.*

- [ ] **2.1 Estrutura de Dados das Maestrias:**
  - Criar `src/data/masteriesData.js` (ou uma pasta `data/skills/`).
  - Mapear cada maestria: `Fogo`, `Água`, `Vento`, `Raio`, `Terra`, `Taijutsu`, `Médico`, `Mestre de Armas`.
  - Para cada maestria, listar as habilidades (Jutsus) com: `nome`, `nível_requerido`, `dano_base`, `descricao`, `cooldown`, `alcance`, `tipo` (ataque, defesa, suporte).
  - **Dica:** Use um arquivo `.json` ou `.js` com arrays bem estruturados.

- [ ] **2.2 Interface da Wiki:**
  - Criar página `/wiki`.
  - Exibir um menu lateral ou abas (Tabs) para selecionar a Maestria.
  - Ao clicar em uma maestria, exibir uma grade de cards com todas as habilidades.
  - Cada card deve mostrar: Nome da habilidade, Nível, Dano, uma imagem ilustrativa (você pode usar os ícones de elemento que já temos) e um botão para expandir e ver a descrição completa.

- [ ] **2.3 Vídeos e Animações:**
  - Dentro do card expandido, permitir a inclusão de um vídeo curto (MP4) demonstrando a habilidade em ação (você mencionou que tem acesso aos arquivos do jogo).

---

### 🗺️ FASE 3 – MAPA INTERATIVO (Frontend Avançado)
*Objetivo: Criar uma ferramenta visual para localização.*

- [ ] **3.1 Configurar o Mapa:**
  - Usar `react-leaflet` ou um simples `canvas`/`div` com a imagem do mapa de fundo (você já tem a imagem do jogo?).
  - **Recomendação:** Instalar `react-draggable` ou `react-leaflet` com `CRS.Simple` para permitir navegação (arrastar e zoom).

- [ ] **3.2 Pins e Popups:**
  - Sobrepor os pontos de interesse (Portão Sul, Floresta, etc.) usando as coordenadas (em porcentagem ou pixels).
  - Ao clicar em um pin, exibir um popup com: Nome do local, Inimigos comuns, Dicas de patrulha (integrando com o conteúdo da Polícia).

---

### 🩺 FASE 4 – PÁGINA DOS MÉDICOS
*Objetivo: Criar conteúdo para suporte e curas.*

- [ ] **4.1 Conteúdo Base:**
  - Títulos: "Guia do Médico da Folha", "Prioridades em Raid", "Combos de Cura", "Equipamentos".
  - Reutilizar o estilo de Accordion da página da Polícia para organizar o conteúdo.

---

### 🚀 FASE 5 – REFINAMENTOS E INTEGRAÇÃO (Bônus)
*Objetivo: Deixar o projeto redondo.*

- [ ] **Persistência:** Salvar o estado dos accordions (se o usuário expandiu ou não) no `localStorage` para melhor UX.
- [ ] **Páginação/Scroll Infinito:** Para a Wiki, se houver muitas skills, adicionar paginação.
- [ ] **Responsividade:** Ajustar todos os componentes para mobile (já estão bons, mas vale uma revisão).

---

## 📋 Checklist de Atividades Imediatas (Para você começar HOJE)

| Ordem | Atividade | Onde fazer |
| :--- | :--- | :--- |
| 1 | Criar a pasta `src/data/` e o arquivo `territories.js` com a lista de territórios. | `src/data/territories.js` |
| 2 | Adicionar a seção "Glossário do Mapa" na página da Polícia. | `Police.jsx` |
| 3 | Baixar/recortar a imagem do mapa do jogo e colocar em `public/assets/map/`. | `public/assets/map/` |
| 4 | Criar a rota `/mapa-interativo` e adicionar o placeholder "Em construção". | `App.jsx`, `pages/Map.jsx` |
| 5 | Gerar a imagem de "Em construção" e colocar em `public/assets/backgrounds/`. | `public/assets/backgrounds/` |

---

**O que você quer fazer primeiro? Posso começar te entregando o código:**

- **Opção A:** O componente de **Glossário do Mapa** para integrar na página da Polícia.
- **Opção B:** A página placeholder "Em Construção" com a imagem e o texto.
- **Opção C:** A estrutura de dados (JSON) das **Maestrias** para a Wiki.

Me diga qual, e já começo a escrever o código para você! 🍃