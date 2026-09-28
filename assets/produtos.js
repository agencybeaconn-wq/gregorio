/* Catálogo da demo: 16 peças reais do catálogo Gregorio (ConectaVenda, lido em 28/09/2026).
   Preço (R$) e estoque exatamente como no catálogo. Texto descritivo só com o que está no
   cadastro ou visível na foto da própria peça.
   Variação de letra: [letra, opção, preço, estoque]. Variação de opção: [opção, preço, estoque, posição da foto?].
   `fotos` = ordem de exibição dos arquivos assets/img/p/<ref>-<n>.webp. */
window.GREGORIO = {
  whatsapp: '551935423361',
  whatsappExibicao: '(19) 3542-3361',
  instagram: 'gregoriosemijoias_',
  tipos: { colares: 'Colares', brincos: 'Brincos', aneis: 'Anéis', pulseiras: 'Pulseiras' },
  // vitrine "Destaques" da home e "Complete com" da página de produto
  destaques: ['CJ001', 'PUL022', 'CL002', 'BRIN046', 'PING001', 'PULI018', 'ANLT014', 'BRIN035'],
  categorias: {
    letras: 'Colares de letra',
    filhos: 'Filhos',
    infantil: 'Infantil',
    presentes: 'Presentes',
  },
  produtos: [
    { ref: 'CLL002', nome: 'Colar Letra Balão', cat: 'letras', tipo: 'colares', fotos: [0, 3, 1, 2],
      resumo: 'A inicial em formato balão, toda cravejada de zircônias, na corrente veneziana.',
      detalhes: ['Corrente veneziana de 45 cm + extensor de 5 cm', 'Letra balão cravejada de zircônias', 'Em ouro ou prata'],
      seletor: { tipo: 'letra', rotulo: 'Banho' },
      v: [['B','Ouro',120,1],['C','Ouro',120,2],['D','Ouro',120,2],['E','Ouro',120,1],['F','Ouro',120,3],['G','Ouro',120,1],
          ['H','Ouro',120,6],['I','Ouro',120,2],['K','Ouro',120,3],['N','Ouro',120,2],['R','Ouro',120,2],['S','Ouro',120,2],['V','Ouro',120,2],
          ['C','Prata',95,1],['D','Prata',95,1],['E','Prata',95,1],['F','Prata',95,1],['H','Prata',95,4],['I','Prata',95,3],
          ['M','Prata',95,1],['N','Prata',95,1],['S','Prata',95,3]] },

    { ref: 'CLL008', nome: 'Colar Riviera Dourado com Medalha Inicial', cat: 'letras', tipo: 'colares', fotos: [0, 1, 2, 3],
      resumo: 'Riviera dourada com medalha gravada com a sua inicial.',
      detalhes: ['Riviera de 40 cm + extensor de 10 cm', 'Medalha com a inicial em dourado ou prata', 'Preço da corrente com a medalha'],
      seletor: { tipo: 'letra', rotulo: 'Medalha' },
      v: [['A','Prata',140,3],['D','Prata',140,16],['E','Prata',140,5],['E','Dourado',140,15],['F','Prata',140,7],['F','Dourado',140,2],
          ['G','Prata',140,5],['G','Dourado',140,1],['I','Prata',140,3],['I','Dourado',140,1],['J','Prata',140,4],['J','Dourado',140,4],
          ['K','Prata',140,1],['K','Dourado',140,15],['L','Prata',140,1],['L','Dourado',140,4],['M','Prata',140,2],['M','Dourado',140,6],
          ['N','Prata',140,4],['N','Dourado',140,7],['P','Prata',140,6],['P','Dourado',140,3],['R','Prata',140,2],['R','Dourado',140,16],
          ['S','Prata',140,3],['S','Dourado',140,2],['T','Prata',140,6],['T','Dourado',140,2],['V','Dourado',140,5],['Z','Dourado',140,14]] },

    { ref: 'CLL009', nome: 'Colar Riviera Prata com Medalha Inicial', cat: 'letras', tipo: 'colares', fotos: [0, 1, 2, 3],
      resumo: 'Riviera prata com medalha gravada com a sua inicial.',
      detalhes: ['Riviera de 40 cm + extensor de 10 cm', 'Medalha com a inicial em prata ou dourado', 'Preço da corrente com a medalha'],
      seletor: { tipo: 'letra', rotulo: 'Medalha' },
      v: [['A','Dourado',97,11],['B','Prata',97,1],['D','Prata',97,9],['D','Dourado',97,19],['E','Prata',97,2],['E','Dourado',97,25],
          ['F','Prata',97,7],['F','Dourado',97,6],['J','Prata',97,1],['J','Dourado',97,17],['K','Prata',97,1],['K','Dourado',97,15],
          ['L','Dourado',97,10],['M','Prata',97,1],['M','Dourado',97,12],['N','Dourado',97,14],['P','Prata',97,1],['P','Dourado',97,8],
          ['R','Prata',97,1],['R','Dourado',97,15],['S','Dourado',97,5],['T','Prata',97,2],['T','Dourado',97,9],['V','Prata',97,6],
          ['V','Dourado',97,1],['Z','Dourado',97,13]] },

    { ref: 'CLL004', nome: 'Colar Letra Cravejada Dourada', cat: 'letras', tipo: 'colares', fotos: [1, 0],
      resumo: 'Inicial delicada cravejada de zircônias, para usar todo dia.',
      detalhes: ['Corrente de 44 cm + extensor de 5 cm', 'Letra cravejada de zircônias', 'Banhado a ouro'],
      seletor: { tipo: 'letra', rotulo: 'Banho' },
      v: [['B','Ouro',79,1],['C','Ouro',79,3],['D','Ouro',79,5],['F','Ouro',79,5],['G','Ouro',79,4],['J','Ouro',79,1],
          ['K','Ouro',79,6],['N','Ouro',79,3],['P','Ouro',79,2]] },

    { ref: 'CLL005', nome: 'Colar Letra Cravejada Prateada', cat: 'letras', tipo: 'colares', fotos: [1, 0],
      resumo: 'Inicial delicada cravejada de zircônias, em prata.',
      detalhes: ['Corrente de 44 cm + extensor de 5 cm', 'Letra cravejada de zircônias', 'Banhado a prata'],
      seletor: { tipo: 'letra', rotulo: 'Banho' },
      v: [['B','Prata',69,2],['D','Prata',69,5],['E','Prata',69,2],['F','Prata',69,1],['N','Prata',69,1]] },

    { ref: 'CLL001', nome: 'Colar Letra Diagonal', cat: 'letras', tipo: 'colares', fotos: [0],
      resumo: 'A inicial grande e lisa, usada na diagonal.',
      detalhes: ['Letra lisa, em tamanho grande', 'Em ouro ou prata'],
      seletor: { tipo: 'letra', rotulo: 'Banho' },
      v: [['C','Ouro',59,3],['L','Ouro',59,1],['R','Ouro',59,3],['U','Ouro',59,3],
          ['C','Prata',49,3],['E','Prata',49,3],['G','Prata',49,1],['R','Prata',49,2],['T','Prata',49,4],['V','Prata',49,3]] },

    // fotos 0–5 conferidas uma a uma: a ordem é a mesma das variações (cor da pedra no pingente)
    { ref: 'CLF043', nome: 'Choker Filhos em Riviera', cat: 'filhos', tipo: 'colares', fotos: [0, 1, 2, 3, 4, 5],
      resumo: 'Choker riviera com o pingente de menina ou menino, na cor de pedra que você escolher.',
      detalhes: ['Choker de 35 cm + extensor de 10 cm', 'Pingente cravejado de menina ou menino', 'Banhado a ouro'],
      seletor: { tipo: 'opcao', rotulo: 'Pingente', escolher: true },
      v: [['Menina rosa claro',250,4,0],['Menina pink',250,2,1],['Menina branca',250,6,2],['Menino azul',250,4,3],['Menino verde',250,7,4],['Menino branco',250,7,5]] },

    // foto 2 (pedra vermelha) fica de fora: essa cor não está entre as variações à venda
    { ref: 'CLF045', nome: 'Choker Filhos em Cordão Baiano', cat: 'filhos', tipo: 'colares', fotos: [0, 1, 3, 4, 5],
      resumo: 'Cordão baiano com o pingente de menina ou menino, na cor de pedra que você escolher.',
      detalhes: ['Choker de 35 cm + extensor de 10 cm', 'Pingente cravejado de menina ou menino', 'Banhado a ouro'],
      seletor: { tipo: 'opcao', rotulo: 'Pingente', escolher: true },
      v: [['Menina rosa claro',190,6,0],['Menina branca',190,3,1],['Menino azul',190,2,2],['Menino verde',190,6,3],['Menino branco',190,7,4]] },

    // foto 0 = 3 meninas, foto 1 = 3 meninos (conferido)
    { ref: 'CLF042', nome: 'Colar 3 Filhos em Pérola', cat: 'filhos', tipo: 'colares', fotos: [0, 1, 2, 3],
      resumo: 'Colar de pérolas com três pingentes, um para cada filho.',
      detalhes: ['Colar de 40 cm + extensor de 5 cm', 'Três pingentes de filhos entre as pérolas'],
      seletor: { tipo: 'opcao', rotulo: 'Combinação', escolher: true },
      v: [['3 meninas',99,3,0],['3 meninos',99,4,1]] },

    { ref: 'PUL030', nome: 'Pulseira Filhos em Pérola', cat: 'filhos', tipo: 'pulseiras', fotos: [0, 1, 2, 3],
      resumo: 'Pulseira de pérolas com os pingentes dos filhos, na combinação da sua família.',
      detalhes: ['Pulseira de 16 cm + extensor de 5 cm', 'Três pingentes de filhos', 'Banhado a ouro'],
      nota: 'Fotos ilustrativas: a combinação enviada é a que você escolher.',
      seletor: { tipo: 'opcao', rotulo: 'Combinação', escolher: true },
      v: [['3 meninas',79,7],['3 meninos',79,8],['2 meninas + 1 menino',79,3],['2 meninos + 1 menina',79,2]] },

    { ref: 'PULI001', nome: 'Pulseira Infantil Plaquinha Coração', cat: 'infantil', tipo: 'pulseiras', fotos: [1, 0],
      resumo: 'Plaquinha lisa pronta para gravar o nome, com coração cravejado.',
      detalhes: ['Pulseira de 12 cm + extensor de 3 cm', 'Plaquinha para gravação de nome', 'Coração cravejado'],
      nota: 'Após a gravação do nome na plaquinha, a peça perde a garantia.',
      seletor: { tipo: 'opcao', rotulo: 'Banho' },
      v: [['Dourado',49,14,0],['Prata',39,15,1]] },

    { ref: 'PULI018', nome: 'Pulseira Infantil Trio de Borboletas', cat: 'infantil', tipo: 'pulseiras', fotos: [0, 1],
      resumo: 'Três borboletas com pontos de luz, delicadas para pulsos pequenos.',
      detalhes: ['Três borboletas com pontos de luz', 'Em dourado ou prata'],
      seletor: { tipo: 'opcao', rotulo: 'Banho' },
      v: [['Dourado',59,21,0],['Prata',35,20,1]] },

    { ref: 'CL002', nome: 'Colar Pérolas com Coração Cravejado', cat: 'presentes', tipo: 'colares', fotos: [0, 1],
      resumo: 'Pérolas com um coração cravejado de zircônias no centro.',
      detalhes: ['Colar de pérolas', 'Coração cravejado de zircônias', 'Em dourado rosê ou ródio'],
      seletor: { tipo: 'opcao', rotulo: 'Banho' },
      v: [['Dourado rosê',97,6,0],['Ródio',97,6,1]] },

    { ref: 'CJ001', nome: 'Conjunto Riviera Rubi', cat: 'presentes', tipo: 'colares', fotos: [0, 1],
      resumo: 'Colar, pulseira e brincos riviera com pedra vermelha. O presente completo.',
      detalhes: ['Colar, pulseira e par de brincos', 'Riviera com pedra vermelha', 'Em dourado ou prata'],
      seletor: { tipo: 'opcao', rotulo: 'Banho' },
      v: [['Dourado',336,7,0],['Prata',258,7,1]] },

    { ref: 'PING001', nome: 'Pingente de Coração em Zircônia', cat: 'presentes', tipo: 'colares', fotos: [0, 1],
      resumo: 'Coração cravejado de zircônias coloridas, banhado a ouro 18k.',
      detalhes: ['Coração cravejado de zircônias coloridas', 'Banhado a ouro 18k', 'Pingente avulso, para a sua corrente'],
      seletor: null,
      v: [[null,49,1]] },

    { ref: 'BRIN035', nome: 'Brinco Coração Liso', cat: 'presentes', tipo: 'brincos', fotos: [0],
      resumo: 'Coração liso e bufante, o brinco que combina com tudo.',
      detalhes: ['Coração liso e bufante', 'Banhado a ouro'],
      seletor: null,
      v: [[null,49,8]] },

    { ref: 'BRIN030', nome: 'Brinco Coração Chapinha', cat: 'presentes', tipo: 'brincos', fotos: [0],
      resumo: 'Coração em chapa lisa, leve para usar o dia inteiro.',
      detalhes: ['Coração em chapa lisa', 'Banhado a ouro'],
      seletor: null,
      v: [[null,49,8]] },

    { ref: 'BRIN046', nome: 'Brinco Trio Esmeralda', cat: 'presentes', tipo: 'brincos', fotos: [0],
      resumo: 'Três pedras verdes em cascata. Cor que aparece de longe.',
      detalhes: ['Três pedras verdes em cascata', 'Estrutura dourada'],
      seletor: null,
      v: [[null,59,4]] },

    // letra fixa: entra no localizador pela letra N
    { ref: 'ANLT014', nome: 'Anel Letra N com Coração', cat: 'letras', tipo: 'aneis', inicial: 'N', fotos: [0],
      resumo: 'A letra N com um coração ao lado, num anel dourado e delicado.',
      detalhes: ['Letra N com coração', 'Aros 15 e 22'],
      seletor: { tipo: 'opcao', rotulo: 'Aro', escolher: true },
      v: [['Aro 15',45,1],['Aro 22',45,3]] },

    // foto 0 = rosê, foto 1 = ródio (prata)
    { ref: 'PUL022', nome: 'Pulseira Coração com Zircônia', cat: 'presentes', tipo: 'pulseiras', fotos: [0, 1],
      resumo: 'Pulseira cravejada de zircônias, em rosê ou ródio.',
      detalhes: ['Cravejada de zircônias', 'Em rosê ou ródio'],
      seletor: { tipo: 'opcao', rotulo: 'Banho' },
      v: [['Rosê',190,1,0],['Ródio',190,1,1]] },

    { ref: 'PUL041', nome: 'Pulseira Elo Baguete', cat: 'presentes', tipo: 'pulseiras', fotos: [0],
      resumo: 'Elos com pedras em corte baguete, brilho do começo ao fim.',
      detalhes: ['Elos com pedras em corte baguete', 'Tom prateado'],
      seletor: null,
      v: [[null,190,4]] },
  ],
};
