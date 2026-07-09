// src/data/policeData.js

export const policeData = {
  // 📜 Código de Conduta
  codeOfConduct: [
    {
      id: 1,
      title: "Honra Acima de Tudo",
      description: "Nunca ataque um inimigo que já se rendeu ou está desarmado. Nossa missão é prender, não executar. Uma prisão vale mais que uma kill no relatório."
    },
    {
      id: 2,
      title: "Comunicação é Vida",
      description: "Sempre avise no Discord antes de engajar um alvo. Um policial sozinho é um policial morto. Use @Policial para chamar reforços."
    },
    {
      id: 3,
      title: "Respeito à Hierarquia",
      description: "Em uma ocorrência, siga as ordens do policial mais experiente presente. Não tome decisões que coloquem o esquadrão em risco."
    }
  ],

  // 🏹 Caçadas (Hunting)
  hunting: [
    {
      id: 1,
      title: "Iniciando uma Caçada",
      description: "Use o comando `/wanted` no Discord para ver a lista de recompensas ativas da vila. Priorize alvos com maior recompensa ou que estejam perto da sua rota de patrulha."
    },
    {
      id: 2,
      title: "Solicitando Reforço",
      description: "Ao avistar um alvo de alto nível, marque `@Policial` no chat de voz/texto e informe sua localização exata (ex: 'Portão Sul, próximo à floresta'). Aguarde o grupo antes de engajar."
    },
    {
      id: 3,
      title: "Finalizando a Ocorrência",
      description: "Após a prisão, reporte no canal do Discord com o nome do preso e anexe um print da mensagem do jogo para contabilizar nos rankings do site."
    }
  ],

  // ⚔️ Combos (Técnicas Ofensivas)
  combos: [
    {
      id: 1,
      name: "Furacão Flamejante",
      description: "Use a habilidade de Vento para empurrar o inimigo contra a parede (ou contra o grupo). Imediatamente após, use a maestria de Fogo em área para causar dano massivo em todos os atingidos.",
      tags: ["Em Grupo", "Dano em Área"],
      videoUrl: "/videos/combo_furacao.mp4" // Coloque seu vídeo aqui
    },
    {
      id: 2,
      name: "Golpe Relâmpago Triplo",
      description: "Ative o modo de aceleração do Raio, dê um dash para trás (para enganar) e use o golpe perfurante três vezes seguidas em alvos diferentes para desorientar o time inimigo.",
      tags: ["1v1", "Dano Rápido"],
      videoUrl: "/videos/combo_relampago.mp4"
    }
  ],

  // 🛑 Cancels (Interrupções/Defesas)
  cancels: [
    {
      id: 1,
      name: "Cancelando o Rasengan",
      description: "Assim que ver o inimigo começar a carregar o Rasengan (animação de giro na mão), use o selo de Paralisia nos primeiros 0.5 segundos. Isso interrompe o cast, cancela o dano e deixa o inimigo vulnerável por 2 segundos.",
      tags: ["Reação", "1v1"],
      videoUrl: "/videos/cancel_rasengan.mp4"
    },
    {
      id: 2,
      name: "Quebra de Defesa (Substitution)",
      description: "Quando o inimigo usar o 'Substitution Jutsu' (troca com madeira), gire a câmera 180° rapidamente e use um ataque de curto alcance (Taijutsu). O inimigo SEMPRE aparece atrás de você, garantindo um hit grátis.",
      tags: ["Defesa", "Em Grupo"],
      videoUrl: "/videos/cancel_substitution.mp4"
    }
  ]
};