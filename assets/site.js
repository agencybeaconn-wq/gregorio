/* Comportamento compartilhado: formatação, card, header, menu, sacola e reveal. */
(function () {
  'use strict';
  const G = window.GREGORIO;

  /* ---------- formatação e dados ---------- */
  const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const brl = (n) => fmt.format(n).replace(/ /g, ' ');
  // Parcelamento de exibição (política a confirmar com o cliente): até 3x, parcela mínima R$ 20.
  const parcelas = (n) => {
    const x = Math.min(3, Math.floor(n / 20));
    return x >= 2 ? `ou ${x}x de ${brl(n / x)} sem juros` : '';
  };
  const produto = (ref) => G.produtos.find((p) => p.ref === ref);
  const precos = (p) => p.v.map((v) => (p.seletor && p.seletor.tipo === 'letra' ? v[2] : v[1]));
  const estoque = (v, p) => (p.seletor && p.seletor.tipo === 'letra' ? v[3] : v[2]);
  const foto = (p, pos, pequena) => `assets/img/p/${p.ref.toLowerCase()}-${p.fotos[pos]}${pequena ? '-s' : ''}.webp`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function precoTexto(p) {
    const ps = precos(p);
    const min = Math.min(...ps);
    return (Math.max(...ps) > min ? 'a partir de ' : '') + brl(min);
  }

  // card: `extra` substitui a linha de apoio (ex.: "Letra D · Ouro e Prata"); `href` permite pré-selecionar variação
  function card(p, opts = {}) {
    const href = opts.href || `produto.html?ref=${p.ref}`;
    const duas = p.fotos.length > 1;
    const img = (pos, lazy) => `<img src="${foto(p, pos, true)}" srcset="${foto(p, pos, true)} 400w, ${foto(p, pos)} 720w"
      sizes="(min-width:1100px) 280px, (min-width:768px) 30vw, 46vw" width="400" height="500" alt="${pos === 0 ? esc(p.nome) : ''}"
      ${lazy ? 'loading="lazy"' : ''} decoding="async">`;
    return `<a class="card" href="${href}">
      <div class="card__foto">${img(0, true)}${duas ? img(1, true) : ''}<span class="etiqueta">${p.ref}</span></div>
      <h3 class="card__nome">${esc(p.nome)}</h3>
      <div class="card__linha"><span class="preco">${opts.preco || precoTexto(p)}</span></div>
      ${opts.extra ? `<p class="card__extra">${opts.extra}</p>` : ''}
    </a>`;
  }

  /* ---------- foco preso em painel (menu e sacola) ---------- */
  function painel(raiz, { aoAbrir, aoFechar } = {}) {
    let origem = null;
    const focaveis = () => [...raiz.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((e) => e.offsetParent !== null);
    function abrir() {
      origem = document.activeElement;
      raiz.classList.add('is-open');
      raiz.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
      aoAbrir && aoAbrir();
      requestAnimationFrame(() => (focaveis()[0] || raiz).focus());
    }
    function fechar() {
      raiz.classList.remove('is-open');
      raiz.setAttribute('inert', '');
      document.body.style.overflow = '';
      aoFechar && aoFechar();
      origem && origem.focus();
    }
    raiz.setAttribute('inert', '');
    raiz.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') return fechar();
      if (e.key !== 'Tab') return;
      const f = focaveis(); if (!f.length) return;
      const [a, z] = [f[0], f[f.length - 1]];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    });
    raiz.querySelectorAll('[data-fechar]').forEach((b) => b.addEventListener('click', fechar));
    return { abrir, fechar, aberto: () => raiz.classList.contains('is-open') };
  }

  /* ---------- header: some ao descer, volta ao subir (com histerese) ---------- */
  const header = document.querySelector('.header');
  if (header) {
    let ultimo = window.scrollY, acumulado = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY, d = y - ultimo; ultimo = y;
      acumulado = Math.sign(d) === Math.sign(acumulado) ? acumulado + d : d;
      if (y < 120 || acumulado < -40) header.classList.remove('is-hidden');
      else if (acumulado > 80 && !header.contains(document.activeElement)) header.classList.add('is-hidden');
    }, { passive: true });
  }

  /* ---------- menu mobile ---------- */
  const menuEl = document.getElementById('menu');
  if (menuEl) {
    const btn = document.querySelector('.menu-btn');
    const m = painel(menuEl, { aoAbrir: () => btn.setAttribute('aria-expanded', 'true'), aoFechar: () => btn.setAttribute('aria-expanded', 'false') });
    btn.addEventListener('click', m.abrir);
    menuEl.querySelectorAll('.menu__links a').forEach((a) => a.addEventListener('click', m.fechar));
  }

  /* ---------- sacola (estado da sessão; é demonstração, não há checkout) ---------- */
  const CHAVE = 'gregorio-sacola';
  const ler = () => { try { return JSON.parse(sessionStorage.getItem(CHAVE)) || []; } catch { return []; } };
  const gravar = (itens) => { try { sessionStorage.setItem(CHAVE, JSON.stringify(itens)); } catch { /* modo privado: sacola vive só nesta página */ } };
  let itens = ler();
  const sacolaEl = document.getElementById('sacola');
  const lista = sacolaEl && sacolaEl.querySelector('.sacola__lista');
  const total = sacolaEl && sacolaEl.querySelector('[data-total]');
  const aviso = sacolaEl && sacolaEl.querySelector('.aviso-demo');
  const badges = document.querySelectorAll('[data-contagem]');
  const status = document.getElementById('status');

  function desenhar() {
    const qtd = itens.reduce((s, i) => s + i.qtd, 0);
    badges.forEach((b) => (b.textContent = qtd || ''));
    document.querySelectorAll('[data-abrir-sacola]').forEach((b) => b.setAttribute('aria-label', `Sacola, ${qtd} ${qtd === 1 ? 'item' : 'itens'}`));
    if (!sacolaEl) return;
    if (!itens.length) {
      lista.innerHTML = `<div class="sacola__vazia"><p>Sua sacola está vazia.</p><a class="btn btn--linha" href="index.html#letra" data-fechar-link>Encontrar minha inicial</a></div>`;
    } else {
      lista.innerHTML = itens.map((i, n) => {
        const p = produto(i.ref);
        return `<div class="item"><img src="${foto(p, i.foto || 0, true)}" alt="" width="72" height="90" loading="lazy">
          <div><p class="item__nome">${esc(p.nome)}</p>${i.var ? `<p class="item__var">${esc(i.var)}</p>` : ''}
          <button class="item__rm link" type="button" data-rm="${n}">Remover</button></div>
          <p class="preco">${brl(i.preco * i.qtd)}</p></div>`;
      }).join('');
    }
    total.textContent = brl(itens.reduce((s, i) => s + i.preco * i.qtd, 0));
    sacolaEl.querySelector('[data-finalizar]').hidden = !itens.length;
  }

  let sacola = null;
  if (sacolaEl) {
    sacola = painel(sacolaEl, { aoFechar: () => (aviso.hidden = true) });
    document.querySelectorAll('[data-abrir-sacola]').forEach((b) => b.addEventListener('click', sacola.abrir));
    lista.addEventListener('click', (e) => {
      const rm = e.target.closest('[data-rm]');
      if (rm) {
        itens.splice(+rm.dataset.rm, 1); gravar(itens); desenhar();
        sacolaEl.querySelector('.sacola__topo button').focus();
      }
      if (e.target.closest('[data-fechar-link]')) sacola.fechar();
    });
    sacolaEl.querySelector('[data-finalizar]').addEventListener('click', () => { aviso.hidden = false; });
  }

  function adicionar(item) {
    const igual = itens.find((i) => i.ref === item.ref && i.var === item.var);
    if (igual) igual.qtd += 1; else itens.push({ ...item, qtd: 1 });
    gravar(itens); desenhar();
    if (status) status.textContent = `${produto(item.ref).nome} adicionado à sacola.`;
    sacola && sacola.abrir();
  }
  desenhar();

  /* ---------- reveal: uma entrada por seção ---------- */
  const io = 'IntersectionObserver' in window && new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const observar = (raiz = document) => raiz.querySelectorAll('.reveal:not(.is-in),.reveal-clip:not(.is-in)').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));
  observar();

  window.Site = { G, brl, parcelas, produto, precos, estoque, foto, esc, precoTexto, card, adicionar, observar };
})();
