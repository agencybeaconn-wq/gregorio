/* Página de produto (T1): galeria, seletor com estoque real, sacola e barra fixa no celular. */
(function () {
  'use strict';
  const S = window.Site, G = S.G;
  const $ = (s, r = document) => r.querySelector(s);
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const p = S.produto(params.get('ref'));
  const raiz = $('[data-pdp]');

  if (!p) {
    raiz.innerHTML = `<div class="vazio"><h1 class="pdp__nome">Peça não encontrada</h1>
      <p class="muted">Ela pode ter saído da maleta.</p><a class="btn" href="index.html#vitrine">Ver as peças</a></div>`;
    $('.barra').remove();
    return;
  }

  document.title = `${p.nome} · Gregorio Semijoias`;
  const ARTIGO = { Letra: 'a', Banho: 'o', Medalha: 'a', Pingente: 'o', 'Combinação': 'a', Aro: 'o' };
  const sel = p.seletor;
  const ehLetra = !!sel && sel.tipo === 'letra';
  const letras = ehLetra ? [...new Set(p.v.filter((v) => v[3] > 0).map((v) => v[0]))].sort() : [];
  const opcoes = !sel ? [] : ehLetra ? [...new Set(p.v.map((v) => v[1]))] : p.v.map((v) => v[0]);
  const obrigatoria = ehLetra || (!!sel && !!sel.escolher); // escolha pessoal: nunca pré-selecionar
  let letra = null, opcao = null;

  const varLetra = (l, o) => p.v.find((v) => v[0] === l && v[1] === o && v[3] > 0);
  const varOpcao = (o) => p.v.find((v) => v[0] === o);
  function atual() {
    if (!sel) return { preco: p.v[0][1], est: p.v[0][2], rotulo: '', foto: 0 };
    if (ehLetra) {
      const v = letra && opcao && varLetra(letra, opcao);
      return v ? { preco: v[2], est: v[3], rotulo: `Letra ${letra} · ${opcao}`, foto: 0 } : null;
    }
    const v = opcao && varOpcao(opcao);
    return v ? { preco: v[1], est: v[2], rotulo: `${sel.rotulo}: ${opcao}`, foto: v[3] || 0 } : null;
  }
  const faltando = () => (ehLetra && !letra ? 'Letra' : sel && !opcao && obrigatoria ? sel.rotulo : null);

  /* ---------- markup ---------- */
  const chip = (nome, valor) => `<label class="chip"><input type="radio" name="${nome}" value="${S.esc(valor)}">${S.esc(valor)}</label>`;
  const grupo = (nome, rotulo, conteudo, letrasGrade) => `<fieldset data-grupo="${nome}">
      <legend>${rotulo}<strong data-escolha="${nome}"></strong></legend>
      <div class="opcoes${letrasGrade ? ' opcoes--letras' : ''}">${conteudo}</div></fieldset>`;
  const banho = p.detalhes.find((d) => /^(Banhado|Em |Tom |Estrutura)/.test(d));
  const n = p.fotos.length;

  raiz.innerHTML = `
    <nav class="migalhas" aria-label="Você está em">
      <a href="index.html">Início</a><span aria-hidden="true">/</span>
      <a href="index.html?f=${p.tipo}#vitrine">${G.tipos[p.tipo]}</a><span aria-hidden="true">/</span>
      <span aria-current="page">${S.esc(p.nome)}</span>
    </nav>
    <div class="pdp__grade">
      <div>
        <div class="galeria">
          <div class="galeria__thumbs">${n > 1 ? p.fotos.map((_, i) => `<button type="button" data-foto="${i}" aria-label="Ver foto ${i + 1} de ${n}" aria-current="${i === 0}">
            <img src="${S.foto(p, i, true)}" alt="" width="72" height="90" loading="lazy" decoding="async"></button>`).join('') : ''}</div>
          <div class="galeria__trilho" tabindex="0" aria-label="Fotos de ${S.esc(p.nome)}">${p.fotos.map((_, i) => `<figure>
            <img src="${S.foto(p, i)}" srcset="${S.foto(p, i, true)} 400w, ${S.foto(p, i)} 720w" sizes="(min-width:900px) 50vw, 100vw"
              width="720" height="900" decoding="async" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} alt="${S.esc(p.nome)}, foto ${i + 1} de ${n}"></figure>`).join('')}</div>
        </div>
        ${n > 1 ? `<div class="galeria__pontos" aria-hidden="true">${p.fotos.map((_, i) => `<span${i === 0 ? ' class="is-on"' : ''}></span>`).join('')}</div>` : ''}
      </div>
      <div class="pdp__info">
        <p class="pdp__etiqueta"><span class="etiqueta">${p.ref}</span>${G.tipos[p.tipo]}</p>
        <h1 class="pdp__nome">${S.esc(p.nome)}</h1>
        <p class="pdp__resumo">${S.esc(p.resumo)}</p>
        <div class="pdp__preco"><span class="preco preco--grande" data-preco></span><span class="muted" data-parcelas></span></div>
        <form class="pdp__form" data-form novalidate>
          ${ehLetra ? grupo('letra', 'Letra', letras.map((l) => chip('letra', l)).join(''), true) : ''}
          ${sel ? grupo('opcao', sel.rotulo, opcoes.map((o) => chip('opcao', o)).join(''), false) : ''}
          <p class="pdp__estoque" data-estoque aria-live="polite"></p>
          <button class="btn btn--bloco" type="submit" data-cta>Adicionar à sacola</button>
          <p class="pdp__erro" data-erro role="alert" hidden></p>
        </form>
        <ul class="pdp__garantias">
          <li><svg class="ico ico--selo" aria-hidden="true"><use href="#i-escudo"/></svg><span><strong>Garantia Gregorio</strong> em todas as peças</span></li>
          ${banho ? `<li><svg class="ico ico--selo" aria-hidden="true"><use href="#i-gema"/></svg><span>${S.esc(banho)}</span></li>` : ''}
          <li><svg class="ico ico--selo" aria-hidden="true"><use href="#i-medalha"/></svg><span><strong>Há mais de 20 anos</strong> no mercado</span></li>
        </ul>
        <div class="acordeoes">
          <details open><summary>Detalhes da peça</summary><div class="conteudo">
            <ul>${p.detalhes.map((d) => `<li>${S.esc(d)}</li>`).join('')}</ul>${p.nota ? `<p class="nota">${S.esc(p.nota)}</p>` : ''}</div></details>
          <details><summary>Banho e cuidados</summary><div class="conteudo">
            <p>Para o banho durar mais, guarde a peça separada e em local seco. Evite contato com perfume, cremes, álcool e água de piscina ou do mar. Limpe com uma flanela macia e seca.</p></div></details>
          <details><summary>Garantia Gregorio</summary><div class="conteudo">
            <p>Todas as peças Gregorio têm garantia. Para conhecer as condições ou acionar a garantia, fale com o atendimento pelo <a class="link" href="https://wa.me/${G.whatsapp}" target="_blank" rel="noopener">WhatsApp ${G.whatsappExibicao}</a>.</p></div></details>
        </div>
      </div>
    </div>`;

  const form = $('[data-form]');
  const precoEl = $('[data-preco]'), parcelasEl = $('[data-parcelas]'), estoqueEl = $('[data-estoque]');
  const cta = $('[data-cta]'), erroEl = $('[data-erro]');
  const barra = $('[data-barra]'), barraPreco = $('[data-barra-preco]'), barraCta = $('[data-barra-cta]');
  const radio = (nome, valor) => form.querySelector(`input[name="${nome}"][value="${CSS.escape(valor)}"]`);
  let avisoTroca = '';

  /* ---------- a letra manda no banho ---------- */
  function ajustarOpcoes() {
    const disp = opcoes.filter((o) => varLetra(letra, o));
    form.querySelectorAll('input[name="opcao"]').forEach((i) => (i.disabled = !disp.includes(i.value)));
    if (!disp.includes(opcao)) {
      avisoTroca = opcao && disp.length === 1 ? `A letra ${letra} está disponível só em ${disp[0].toLowerCase()}.` : '';
      opcao = disp[0];
      radio('opcao', opcao).checked = true;
    }
  }

  function atualizar() {
    const a = atual();
    const f = faltando();
    const ps = S.precos(p), unico = Math.min(...ps) === Math.max(...ps);
    precoEl.textContent = a ? S.brl(a.preco) : S.precoTexto(p);
    parcelasEl.textContent = a ? S.parcelas(a.preco) : unico ? S.parcelas(ps[0]) : '';
    barraPreco.textContent = precoEl.textContent;
    form.querySelectorAll('[data-escolha]').forEach((el) => {
      const v = el.dataset.escolha === 'letra' ? letra : opcao;
      el.textContent = v ? `: ${v}` : '';
    });
    estoqueEl.classList.toggle('is-baixo', !!a && a.est <= 3);
    estoqueEl.textContent = avisoTroca || (a ? (a.est === 1 ? 'Última unidade' : a.est <= 3 ? `Restam ${a.est} unidades` : 'Em estoque')
      : f ? `Escolha ${ARTIGO[f]} ${f.toLowerCase()} para ver o estoque.` : '');
    const texto = f ? `Escolha ${ARTIGO[f]} ${f.toLowerCase()}` : 'Adicionar à sacola';
    // o botão segue clicável: sem escolha, ele leva até o seletor e explica o que falta
    cta.textContent = texto; barraCta.textContent = texto;
  }

  form.addEventListener('change', (e) => {
    avisoTroca = '';
    if (e.target.name === 'letra') { letra = e.target.value; ajustarOpcoes(); }
    if (e.target.name === 'opcao') { opcao = e.target.value; if (!ehLetra) irPara(atual().foto); }
    erroEl.hidden = true;
    atualizar();
  });

  function comprar() {
    const f = faltando();
    if (f) {
      erroEl.textContent = `Escolha ${ARTIGO[f]} ${f.toLowerCase()} antes de adicionar à sacola.`;
      erroEl.hidden = false;
      const g = form.querySelector(`[data-grupo="${f === 'Letra' ? 'letra' : 'opcao'}"]`);
      g.scrollIntoView({ block: 'center', behavior: reduz ? 'auto' : 'smooth' });
      const primeiro = g.querySelector('input:not(:disabled)');
      primeiro && primeiro.focus({ preventScroll: true });
      return;
    }
    const a = atual();
    S.adicionar({ ref: p.ref, var: a.rotulo, preco: a.preco, foto: a.foto });
  }
  form.addEventListener('submit', (e) => { e.preventDefault(); comprar(); });
  barraCta.addEventListener('click', comprar);

  /* ---------- galeria ---------- */
  const trilho = $('.galeria__trilho');
  const thumbs = [...document.querySelectorAll('.galeria__thumbs [data-foto]')];
  const pontos = [...document.querySelectorAll('.galeria__pontos span')];
  function marcar(i) {
    thumbs.forEach((t, k) => t.setAttribute('aria-current', String(k === i)));
    pontos.forEach((pt, k) => pt.classList.toggle('is-on', k === i));
  }
  function irPara(i) {
    trilho.scrollTo({ left: i * trilho.clientWidth, behavior: reduz ? 'auto' : 'smooth' });
    marcar(i);
  }
  thumbs.forEach((t) => t.addEventListener('click', () => irPara(+t.dataset.foto)));
  const figs = [...trilho.children];
  const ioGaleria = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && marcar(figs.indexOf(e.target))), { root: trilho, threshold: 0.6 });
  figs.forEach((f) => ioGaleria.observe(f));

  /* ---------- estado inicial ---------- */
  const l = (params.get('l') || '').toUpperCase();
  if (ehLetra && letras.includes(l)) { letra = l; radio('letra', l).checked = true; ajustarOpcoes(); }
  else if (sel && !obrigatoria) { opcao = p.v.find((v) => (ehLetra ? v[3] : v[2]) > 0)[0]; radio('opcao', opcao).checked = true; }
  atualizar();

  /* ---------- barra fixa: aparece sempre que o botão principal está fora da tela ---------- */
  new IntersectionObserver(([e]) => {
    const on = !e.isIntersecting;
    barra.classList.toggle('is-on', on);
    barra.setAttribute('aria-hidden', String(!on));
    barraCta.tabIndex = on ? 0 : -1;
  }).observe(cta);

  /* ---------- complete com: 2 do mesmo tipo + destaques ---------- */
  const rel = [...G.produtos.filter((x) => x.tipo === p.tipo && x.ref !== p.ref).slice(0, 2), ...G.destaques.map(S.produto)]
    .filter((x, i, arr) => x.ref !== p.ref && arr.findIndex((y) => y.ref === x.ref) === i).slice(0, 4);
  $('[data-rel-lista]').innerHTML = rel.map((x) => S.card(x)).join('');
  $('[data-relacionados]').hidden = false;
})();
