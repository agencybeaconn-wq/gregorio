/* Home: herói, localizador de inicial (assinatura), filhos e vitrine com filtro. */
(function () {
  'use strict';
  const S = window.Site, G = S.G;
  const $ = (s, r = document) => r.querySelector(s);

  // herói: a máscara sobe assim que a página pinta
  const hero = $('.hero');
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-in')));

  // faixa rotativa: 3 cópias (a animação anda 1/3); leitor de tela lê só a original
  const faixa = $('.faixa');
  const selos = faixa.querySelector('.faixa__lista');
  for (let i = 0; i < 2; i++) {
    const copia = selos.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    selos.parentNode.append(copia);
  }
  faixa.classList.add('is-rolando');

  // entrada escalonada ao trocar o conteúdo de uma grade
  function animarGrade(el) {
    el.querySelectorAll('.card').forEach((c, i) => c.style.setProperty('--i', i));
    el.classList.remove('is-trocando'); void el.offsetWidth; el.classList.add('is-trocando');
  }

  // aviso de estoque real: só quando a peça está acabando
  const restam = (n) => (n === 1 ? 'última unidade' : `restam ${n}`);

  /* ---------- localizador de inicial ---------- */
  const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const indice = {}; // letra -> Map(ref -> { p, ops: [{ op, preco, est }] })
  const incluir = (l, p, o) => {
    const m = (indice[l] = indice[l] || new Map());
    if (!m.has(p.ref)) m.set(p.ref, { p, ops: [] });
    m.get(p.ref).ops.push(o);
  };
  for (const p of G.produtos) {
    if (p.seletor && p.seletor.tipo === 'letra') {
      for (const [l, op, preco, est] of p.v) if (est > 0) incluir(l, p, { op, preco, est });
    } else if (p.inicial) {
      for (const [op, preco, est] of p.v) if (est > 0) incluir(p.inicial, p, { op, preco, est });
    }
  }

  const alfa = $('[data-alfabeto]');
  const grande = $('[data-letra-grande]');
  const conta = $('[data-letra-conta]');
  const res = $('[data-letra-resultado]');

  alfa.innerHTML = LETRAS.map((l) => {
    const n = indice[l] ? indice[l].size : 0;
    const rotulo = n ? `Letra ${l}, ${n} ${n === 1 ? 'peça' : 'peças'}` : `Letra ${l}, sem peça no momento`;
    return `<button class="chip chip--letra" type="button" data-l="${l}" aria-pressed="false" aria-label="${rotulo}"${n ? '' : ' disabled'}>${l}</button>`;
  }).join('');

  function escolher(l) {
    alfa.querySelectorAll('[data-l]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.l === l)));
    const itens = [...indice[l].values()];
    grande.classList.remove('is-in'); void grande.offsetWidth;
    grande.textContent = l; grande.classList.add('is-in');
    conta.innerHTML = `<strong>${itens.length} ${itens.length === 1 ? 'peça' : 'peças'}</strong> com a letra ${l}`;
    res.innerHTML = itens.map(({ p, ops }) => {
      const ps = ops.map((o) => o.preco);
      const min = Math.min(...ps), max = Math.max(...ps);
      const est = ops.reduce((s, o) => s + o.est, 0);
      const opcoes = [...new Set(ops.map((o) => o.op))].join(' e ');
      const extra = `Letra ${l} · ${S.esc(opcoes)}${est <= 3 ? ` · <span class="estoque-baixo">${restam(est)}</span>` : ''}`;
      return S.card(p, { href: `produto.html?ref=${p.ref}&l=${l}`, preco: (max > min ? 'a partir de ' : '') + S.brl(min), extra });
    }).join('');
    animarGrade(res);
  }

  const doHash = (location.hash.match(/^#letra-([A-Z])$/) || [])[1];
  const maisPecas = LETRAS.filter((l) => indice[l]).sort((a, b) => indice[b].size - indice[a].size)[0];
  escolher(doHash && indice[doHash] ? doHash : maisPecas);
  alfa.addEventListener('click', (e) => {
    const b = e.target.closest('[data-l]');
    if (b && !b.disabled) escolher(b.dataset.l);
  });

  /* ---------- filhos ---------- */
  const filhos = $('[data-lista="filhos"]');
  filhos.innerHTML = ['CLF043', 'CLF045', 'CLF042', 'PUL030'].map((r) => {
    const p = S.produto(r);
    return S.card(p, { extra: p.v.map((v) => v[0]).slice(0, 3).join(' · ') + (p.v.length > 3 ? ' · …' : '') });
  }).join('');

  /* ---------- vitrine ---------- */
  const vitrine = $('[data-vitrine]');
  const extraVitrine = (p) => {
    const est = p.v.reduce((s, v) => s + S.estoque(v, p), 0);
    return est <= 3 ? `<span class="estoque-baixo">${restam(est)}</span>` : '';
  };
  function filtrar(f) {
    const lista = f === 'destaques' ? G.destaques.map(S.produto) : G.produtos.filter((p) => p.tipo === f);
    vitrine.innerHTML = lista.map((p) => S.card(p, { extra: extraVitrine(p) })).join('');
    document.querySelectorAll('[data-filtros] [data-filtro]').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filtro === f)));
    animarGrade(vitrine);
  }
  // ?f=colares vem dos links de coleção da página de produto
  const doLink = new URLSearchParams(location.search).get('f');
  filtrar(G.tipos[doLink] ? doLink : 'destaques');
  // chips da vitrine, capas de coleção e links do rodapé usam o mesmo filtro
  document.addEventListener('click', (e) => {
    const alvo = e.target.closest('[data-filtro]');
    if (alvo) filtrar(alvo.dataset.filtro);
  });

  S.observar();
})();
