// ============================================================
//  💕 ARQUIVO DE CONFIGURAÇÃO — EDITE TUDO AQUI 💕
//  Substitua os textos, datas, fotos e mensagens conforme
//  seu relacionamento. Não precisa mexer em mais nenhum arquivo!
// ============================================================

const CONFIG = {

  // ── CASAL ──────────────────────────────────────────────────
  names: {
    mine: "Karaya",          // Seu nome
    hers: "Asheley, Meu Amor",     // Nome da sua namorada
  },

  // ── DATAS ─────────────────────────────────────────────────
  dates: {
    metDate: "2025-02-18",   // Data em que se conheceram  (AAAA-MM-DD)
    togetherDate: "2025-08-30",   // Data oficial do namoro      (AAAA-MM-DD)
    firstDateDate: "2025-04-17",   // Primeiro encontro           (AAAA-MM-DD)
    firstKissDate: "2025-04-26",   // Primeiro beijo              (AAAA-MM-DD)
  },

  // ── TELA 2 — NOSSA JORNADA ────────────────────────────────
  journey: {
    photo: "assets/images/foto6.jpg",   // Foto principal (substitua o arquivo)
    message: "Esse foi o momento, o dia em que você me disse sim, ou que eu te disse sim, bem, não importa, foi o momento que nós decidimos que estavamos prontas para assumir um relacionamento, o momento que eu parei, pensei e tive certeza. \n\"É você a pessoa com quem eu quero estar, hoje, amanhã e sempre, eu tenho certeza\".\nEu te amo, Asheley",
  },

  // ── TELA 3 — MELHORES MOMENTOS (Carrossel) ────────────────
  moments: [
    { photo: "assets/images/foto2.jpg", caption: "Eu i vc lindas no BK" },
    { photo: "assets/images/foto3.jpg", caption: "Eu parecendo uma assombração sua pqp ps: amo essa foto" },
    { photo: "assets/images/foto4.jpg", caption: "Eu acho que você gosta bastante dessa foto né? Eu gosto bastante também, a gente muito risonha" },
    { photo: "assets/images/foto5.jpg", caption: "Você sempre, sempre, sempre ilumina meu mundo 🌟" },
    { photo: "assets/images/foto1.jpg", caption: "Eu i vc muito perfeitas muito no nosso pedido mútuo de namoro 🥰" },
    { photo: "assets/images/foto7.jpg", caption: "A primeira vez que você veio aqui na minha casaaaaaaaaaaaaa" },
  ],

  // ── TELA 4 — ESTATÍSTICAS ─────────────────────────────────
  stats: {
    photos: "Uma caralhada",   // Fotos tiradas juntos
    calls: "Muitas e muitas",   // Ligações / chamadas de vídeo
    specials: "Todos",   // Momentos especiais / datas marcantes
    // dias juntos são calculados automaticamente pela data acima
    funFacts: [
      "Eu tenho mais fotos com você do que com qualquer outra pessoa",
      "Eu cansei de dividir pirulito, agr quero dividir minha cama com você",
      "Você me completa em coisas que eu sou 1% até no que eu já sou uns 100%",
      "Eu te amo mil milhões de vezes mais do que eu amo chocolate, e olha que eu amo chocolate",
    ],
  },

  // ── TELA 5 — COISAS QUE EU AMO EM VOCÊ ───────────────────
  loves: [
    { emoji: "😊", title: "Seu Abraço", desc: "Que me aconchega muito muito." },
    { emoji: "🤗", title: "Seu Jeito", desc: "Uiiii, me deixa bobinhaa." },
    { emoji: "💝", title: "Seu Carinho", desc: "Caramba, eu gosto bastante de todos os seus carinhos." },
    { emoji: "✨", title: "Sua Personalidade", desc: "Forte, linda, incrível e principalmente, minha." },
    { emoji: "🤝", title: "Seu Apoio", desc: "Você é a melhor pessoa para contar quando eu tô com medo, sempre me ajuda" },
    { emoji: "😂", title: "Seu Riso", desc: "Preciso falar alguma coisa?" },
  ],

  // ── TELA 6 — LINHA DO TEMPO ───────────────────────────────
  timeline: [
    {
      date: "Fevereiro 2025",
      title: "Quando Nos Conhecemos",
      desc: "A gente não tirou foto eu i vc, mas ó, imagina duas boba jogando UNOOOOO",
      photo: "assets/images/Imagine.jpg",
      emoji: "🃏",
    },
    {
      date: "Abril 2025",
      title: "Primeiro Beijo",
      desc: "Tava eu aí, 2 dias depois de te beijar, 2 da manhã ainda sem conseguir dormir querendo replay do seu kiss na minha boca",
      photo: "assets/images/Eu.jpeg",
      emoji: "💋",
    },
    {
      date: "Junho 2025",
      title: "Primeira Foto que você mandou pra mim sem visualização única no Whatsapp",
      desc: "Caramba, isso foi histórico, eu fiquei muito feliz muito pq vc só me mandava em visu única e eu queria ver mais de você",
      photo: "assets/images/1Foto.jpeg",
      emoji: "📸",
    },
    {
      date: "Junho 2025",
      title: "Eu i vc",
      desc: "A minha primeira foto que eu tirei com você, faz um anooooo",
      photo: "assets/images/Primeira.jpeg",
      emoji: "💖",
    },
    {
      date: "Augusto 2025",
      title: "💍",
      desc: "Roubei mesmo, tô nem aí tá?",
      photo: "assets/images/foto6.jpg",
      emoji: "💖",
    },
    {
      date: "Setembrouuuu 2025",
      title: "Minha casa",
      desc: "Você vindo coinhecer sua sogrinha e sua cunhada, que fofis",
      photo: "assets/images/foto7.jpg",
      emoji: "💖",
    },
    {
      date: "Junho 2026",
      title: "Aqui e Agora",
      desc: "Minha namorada ontem eu amo muito, menina espertinha linda da minha vida",
      photo: "assets/images/now.jpeg",
      emoji: "❤️",
    },
  ],

  // ── TELA 7 — CARTA ROMÂNTICA ──────────────────────────────
  letter: {
    greeting: "Meu amor,",
    body: `Como você bem sabe, eu não sou muito boa com palavras, mas quando estou com você minha língua que não quer parar de se mexer, pra falar? Talvez... 
    Bem, eu lembro como se fosse ontem nosso primeiro dia dos namorados como namoradinhas que não namoram, eu ficando totalmente sem graça por ter recebido esse puta presente de mãos vazias, mas isso definitivamente não vai acontecer de novo, juro juradinho.
    As vezes me pego pensando em "Caralho, como que eu podia viver sem você na minha vida antes?" Isso não faz sentido, você faz mais parte de mim que eu, eu não consigo me imaginar sem você, a distância dói, a saudade dói, tudo dói, mas matar a saudade, a vontade de você é tão bom, é uma mistura de sentimentos que me deixa eufórica e eu gosto muito disso, é único, é especial, é o nosso amor.
    Meu pão com requeijão, meu strogonoff, meu hambúrguer, meu suquinho de melancia, meu sorvete de creme, minha coxinha, minha pizza, meu sorvete de chocolate, meu café, meu ecstasy, minha água, meu suco de goiaba, meu chocolate, minha pipoca, meu brigadeiro, minha torta de limão, meu bolo de cenoura com cobertura de chocolate, meu bolo de chocolate com cobertura de chocolate e granulado de chocolate por cima do brigadeiro de chocolate comendo com a minha chocolate. Enfim... Eu te amo demais.`,
    signature: "Ps: A mulher mais sortuda // Kyara.",
  },

  // ── TELA 8 ────────────────────────────────
  ending: {
    message: "Piriroupoupou",
    sub: "Acabou",
  },

  // ── MÚSICA ───────────────────────────────────────────────
  music: {
    file: "assets/music/those-eyes.mp3",
  },

};
