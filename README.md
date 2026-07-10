Aqui está um `README.md` completo e bem estruturado para o projeto, cobrindo a instalação, as funcionalidades, a estrutura de pastas e os requisitos de assets.

---

```markdown
# 🍃 Nin Online BR - Portal da Vila da Folha

Portal interativo desenvolvido para a comunidade de **Nin Online (Servidor Brasil)**. O projeto centraliza informações, ferramentas e manuais para os jogadores, com foco especial em um sistema completo de **chaveamento de torneios** (single-elimination) para a vila.

## ✨ Funcionalidades

- **🏠 Página Inicial**: Apresentação visual com fundo temático da Vila da Folha.
- **🧭 Navegação Global**: Header fixo com logo clicável (volta para Home) e links para as principais seções.
- **⚔️ Sistema de Torneios (Chaveamento)**:
  - Cadastro de participantes com **Nome, Level, Vila (Folha/Areia/Névoa) e até 2 Maestrias** (Fogo, Água, Vento, Raio, Terra, Mestre de Armas, Médico, Taijutsu).
  - Geração automática de bracket com **balanceamento por nível (Snake Seeding)**.
  - Exige número de participantes **potência de 2** (2, 4, 8, 16, etc.) para chaveamento perfeito.
  - **Interação via modal**: Clique em uma partida para escolher o vencedor.
  - **Propagação automática**: Os vencedores avançam automaticamente para a próxima rodada.
  - **Estatísticas Finais**: Ao final do torneio, exibe modal com **Campeão, Vice-campeão e Semifinalistas**.
  - **Cards temáticos**: Exibe ícones da vila e das maestrias, com cores de fundo personalizadas para cada vila.
  - **Botão "+4 Mock"**: Adiciona 4 participantes aleatórios para testes rápidos.

## 🛠️ Tecnologias Utilizadas

- **[Vite](https://vitejs.dev/)** - Build tool e servidor de desenvolvimento.
- **[React 18+](https://reactjs.org/)** - Biblioteca para construção de interfaces.
- **[Styled Components](https://styled-components.com/)** - Estilização CSS-in-JS.
- **[React Router DOM](https://reactrouter.com/)** - Gerenciamento de rotas.
- **[@g-loot/react-tournament-brackets](https://www.npmjs.com/package/@g-loot/react-tournament-brackets)** - Renderização visual do chaveamento (bracket).
- **[react-svg-pan-zoom](https://www.npmjs.com/package/react-svg-pan-zoom)** - Navegação (zoom/pan) no bracket.

## 📦 Instalação e Execução

**Pré-requisitos**: Node.js (v18+), npm ou yarn.

```bash
# 1. Clone o repositório
git clone https://github.com/PedroSantos42/nin-online-br.git
cd nin-online-br

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

**Build para produção**:
```bash
npm run build
```

## 📁 Estrutura de Pastas e Assets

### Estrutura Principal
```text
public/
└── assets/
    ├── backgrounds/          # Imagens de fundo
    │   └── nin-leaf-background.png
    ├── icons/                # Ícones do jogo
    │   ├── nin-fire-icon.webp
    │   ├── nin-water-icon.webp
    │   ├── nin-wind-icon.webp
    │   ├── nin-earth-icon.webp
    │   ├── nin-light-icon.webp
    │   ├── nin-medical-icon.webp
    │   ├── nin-taijutsu-icon.webp
    │   ├── nin-weapon-icon.webp
    │   ├── nin-leaf-icon.webp   # (Opcional - Vila Folha)
    │   ├── nin-sand-icon.webp   # (Opcional - Vila Areia)
    │   └── nin-mist-icon.webp   # (Opcional - Vila Névoa)
    └── logo/
        └── nin-logo.png         # Logo do projeto
src/
├── components/
│   └── Header/              # Header global com navegação
├── pages/
│   ├── Home.jsx             # Página inicial
│   └── Tournament/          # Módulo de Torneios
│       ├── Tournament.jsx
│       └── Tournament.styles.js
├── App.jsx
└── main.jsx
```

### 📌 Configuração de Assets

Para o pleno funcionamento visual dos torneios, os ícones devem estar disponíveis nos seguintes caminhos:

| Tipo | Caminho Esperado | Observação |
| :--- | :--- | :--- |
| **Logo** | `/assets/logo/nin-logo.png` | Exibida no Header. |
| **Background Home** | `/assets/backgrounds/nin-leaf-background.png` | Fundo da página inicial. |
| **Ícones Maestrias** | `/assets/icons/nin-[nome].webp` | Ex: `nin-fire-icon.webp`. Mapeados para Fogo, Água, Vento, Raio, Terra, Mestre de Armas, Médico, Taijutsu. |
| **Ícones Vilas** | `/assets/icons/nin-[vila]-icon.webp` | Ex: `nin-leaf-icon.webp` (Folha), `nin-sand-icon.webp` (Areia), `nin-mist-icon.webp` (Névoa). *Se não encontrados, o sistema usa o ícone do elemento correspondente (Ex: Folha usa Vento) como fallback.* |

## 🧪 Como Usar o Sistema de Torneios

1. Acesse a rota **`/torneios`**.
2. **Cadastre os participantes**:
   - Preencha Nome, Level, Vila e Maestrias (a segunda é opcional).
   - Clique em "Adicionar".
   - Para testes rápidos, use o botão **"+4 Mock"**.
3. **Gere o chaveamento**: Certifique-se de que o número total de participantes seja uma potência de 2 (2, 4, 8, 16...). Clique em **"Gerar Chaveamento"**.
4. **Interaja com o bracket**:
   - Clique em qualquer partida (match) da primeira rodada.
   - No modal que aparecer, clique no nome do participante que venceu a luta.
5. **Acompanhe a evolução**: Os vencedores avançam automaticamente para a próxima rodada. O bracket mantém a posição de navegação (zoom/pan).
6. **Veja o resultado**: Quando a última partida (Final) for concluída, um modal será exibido com o **Campeão (🥇), Vice (🥈) e Semifinalistas (🥉)**, exibindo Nível, Maestrias e o ícone da Vila de cada um.

## 🔜 Próximas Etapas (Planejado)

- [ ] Implementar seção **Wiki** (Itens, Maestrias, Consumíveis).
- [ ] Implementar seção **Polícia** com manuais, códigos de conduta e combos.
- [ ] Implementar seção **Médicos** com guias de cura e suporte.
- [ ] Persistência de dados no localStorage (para manter o torneio após refresh).
- [ ] Integração com bots do Discord.

## 🤝 Contribuição

Sinta-se à vontade para abrir *issues* ou enviar *pull requests* para melhorias e correções.

## 📜 Licença

Este projeto é de uso educacional e comunitário para o jogo Nin Online.
```

---

Sinta-se à vontade para ajustar o link do repositório e adicionar screenshots se quiser! 🍃