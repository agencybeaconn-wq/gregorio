# DIREÇÃO — Gregorio Semijoias (demo de varejo)

Demo visual pra fechar o cliente: home + página de produto, sem checkout. Marca escrita como eles
escrevem: **Gregorio** (sem acento). Referência estrutural aprovada pelo JV: authentical.com.br.

---

## Tier

**T2 — COMERCIAL** (home). **PDP = T1** dentro do T2.

- Origem do tráfego: a demo é mostrada ao dono; a loja real receberá orgânico + Instagram (9,9 mil seguidoras).
- Ação única que define sucesso: na demo, o dono dizer "quero isso". Na loja, comprar depois de navegar.
- Como o sucesso será medido: fechamento do projeto. Loja real: conversão (tracking a definir).
- Orçamento de interação: 1 momento de assinatura (localizador de inicial) + micro-interações.
- Por que não T3: a demo cria expectativa. Efeito que a loja Shopify real não vai ter vira promessa
  quebrada. Acabamento sim, espetáculo não.

## Conceito

**Frase:** A loja Gregorio como a revendedora que abre a maleta na sua frente: antes da vitrine, ela
pergunta de quem é a inicial, quantos filhos você tem e pra quem é o presente. Porque a marca vendeu
20 anos de mão em mão e agora precisa vender pra quem nunca viu a maleta aberta.

**Filtro:** "a revendedora faria isso com a maleta aberta na frente da cliente?"

**Teste da troca** (vs. "joalheria minimal genérica"): muda (1) home organizada por PARA QUEM, não por
"mais vendidos/lançamentos"; (2) localizador de inicial como assinatura; (3) card com etiqueta REF +
estoque real ("restam 2"); (4) zero popup de entrada; (5) seções maleta + revenda; (6) paleta tirada da
maleta; (7) copy em segunda pessoa, conversa. = 7.

**Teste da morte:** mata (a) o popup de cadastro na entrada (a Authentical abre com ele), (b) a pilha
de 4 carrosséis iguais (Mais vendidos / Lançamentos / Mais vistos), (c) o widget de avaliações sem
avaliação real, substituído pelo #usegregorio real, (d) a faixa de newsletter.

**Rastreabilidade:**
- Etiqueta "REF CLL002" no card ← as etiquetas penduradas nas peças dentro da maleta (post de revenda).
- "Restam 2 na letra B" ← a revendedora diz o que tem na maleta; estoque vem do catálogo real.
- Preto quente do header/rodapé ← o couro croco da maleta; turquesa ← o nome gravado nela.

## Estilo

**Minimal Luxury** + tempero **Editorial** (serif display com itálico).

- Comunica: semijoia com postura de joalheria, sem esnobar o preço (R$35 a R$336).
- Densidade: arejado no editorial (herói, maleta), padrão nas vitrines.
- O site NÃO é: frio, template de plataforma, infantilizado.

## Paleta (roles)

| Role | Valor | Procedência | Uso |
| --- | --- | --- | --- |
| `--bg-base` | `#F7F4EE` | linho e mármore das fotos de produto do Instagram | fundo dominante |
| `--bg-elevated` | `#EEECE7` | parede cinza das fotos de busto do catálogo, normalizada | tile de produto |
| `--ink` | `#1C1A18` | couro croco da maleta | texto, barra, rodapé, faixa maleta |
| `--text-muted` | `#6B655E` | — | apoio (AA 5.2:1 sobre `--bg-base`) |
| `--accent` | `#1F7A72` | matiz 174° do logo (#74D3C9) escurecido até AA | CTA, ativo, foco |
| `--accent-hover` | `#17625B` | mesmo matiz | hover do CTA |
| `--border` | `#E2DDD4` | — | réguas, divisórias da vitrine |
| `--logo` | `#74D3C9` | cor medida do logo oficial | SÓ no logotipo |
| `--hero-cyan` | `#07D9F0` | fundo do banner do JV | SÓ no herói (extensão da imagem) |

Acento pode: CTA primário, letra selecionada, chip ativo, foco, sublinhado de link.
Acento não pode: corpo, headline, fundo de seção, borda de card em repouso.
Dourado não é cor de UI: o dourado da página é o das peças.

## Tipografia

- **Revisão 28/09 (pedido do JV):** trocadas pelas fontes da referência. **Display:** Montserrat 200–600,
  títulos em caixa-alta espaçada (.08em), ênfase por PESO (600), não por itálico. **Body/UI:** Mulish 400–800,
  preço 800 como na referência. Fallbacks medidos (Montserrat 107,6% / Mulish 100,9% sobre Arial).
- (Descartado: Instrument Serif + Outfit. Motivo: o JV achou a fonte fraca; decisão do cliente vence o gosto.)
- **Logotipo:** Libre Baskerville, subset `text=Gregorio` (≈3 KB). É o logo, não entra na escala.
- **Escala:** duas razões, 1.200 @390 → 1.333 @1440 (tokens `--fs-0..6` de `layout-composicao.md` §9).
- **Herói:** `clamp(2.5rem, 1.9rem + 2.4vw, 4.25rem)` (40 → 68px, painel central estreito).
- **Tracking:** display `-0.01em` (serif já é justa), label `0.18em` caixa-alta 0.72rem.

## Grade e ritmo

- Container 1280px (vitrine precisa de 4 colunas), `--pad: clamp(20px,4vw,40px)`.
- Vitrine: 2 col mobile / 3 @768 / 4 @1100, gap `clamp(12px,2vw,24px)`, tile 4:5.
- Seções: `clamp(72px,9vw,128px)`; capítulo novo (maleta) com o dobro no topo.
- Proximidade: título↔texto 16, bloco↔bloco 48, seção↔seção ≥96. Sim.

## Motion

- **Curva única:** `cubic-bezier(.22,1,.36,1)`
- **Macro:** `.7s` (Minimal Luxury pede mais lento que o padrão) | **Micro:** `.2s`
- **Lib:** nenhuma. CSS + IntersectionObserver. Sem narrativa de scroll, GSAP não se paga.
- **Reduced motion:** desliga reveal, máscara e troca de foto no hover; mantém estados de cor.

## Padrões de interação

| Padrão | Onde | Custo | Por que serve ao conceito |
| --- | --- | --- | --- |
| Localizador de inicial (assinatura) | home | médio | é a pergunta nº1 da revendedora: "qual a sua letra?" |
| Masked line reveal | título do herói | trivial | a maleta abrindo: o conteúdo sobe de dentro |
| Troca de foto no hover do card | vitrines | trivial | a revendedora vira a peça na mão pra mostrar o outro lado |
| Sticky header com estado | site | trivial | navegação sempre à mão sem ocupar a vitrine |
| Sticky columns | PDP | trivial | a peça fica à vista enquanto se escolhe letra/banho |
| Accordion | PDP | trivial | medidas, banho, garantia: o que a cliente pergunta depois |
| Sacola em gaveta | site | médio | "separei pra você": mostra a loja funcionando sem checkout |
| CTA sticky bar | PDP mobile | trivial | T1: comprar sempre ao alcance do polegar |

## Wireframe — home

1. **Header = a maleta** (ink) — nav esq. (Letras · Filhos · Vitrine · Revenda) · logo turquesa no
   centro · sacola dir. | sticky com estado. Motivo medido: logo #74D3C9 sobre `--bg-base` = 1.61:1
   (some); sobre `--ink` = 9.84:1, exatamente como gravado na maleta física. Barra de aviso cortada:
   a frase dela vai pra faixa de confiança.
2. **Herói** — 3 painéis: foto da modelo | ciano com título + CTA | peças no ciano. Mobile: foto 4:5 + painel. | masked reveal
3. **Faixa rotativa** (ink, pedido do JV) — 7 selos reais com ícone duotone 30px: 20+ anos · garantia · personalizadas ·
   banho · zircônias e pérolas · revenda 40% · WhatsApp. Marquee de 3 cópias (sem vão até 2560px), 49px/s, pausa no
   hover, parada e sem cópias em reduced-motion. Container geral subiu de 1280 para 1600px; capas de coleção de ponta a ponta.
4. **Coleções** — as 4 capas do JV (Colares, Brincos, Anéis, Pulseiras), cada uma filtra a vitrine. Substituiu
   o "Para quem é?": o JV produziu as capas por categoria. O "por quem" segue vivo no localizador e em Filhos. | reveal
5. **Qual é a sua letra?** (assinatura) — A–Z em serif; escolhida → peças daquela letra com estoque real | reveal
6. **Um pingente para cada filho** — split: foto grande + 4 peças com combinações reais | reveal
7. **Direto da maleta** — vitrine 8 peças com filtro (Todas · Presentes · Infantil) | reveal
8. **A maleta Gregorio** (ink, capítulo) — foto da maleta + história + 3 números reais | clip reveal
9. **#usegregorio** — 5 posts reais + tile "seguir" | reveal
10. **Seja revendedora** — "sem investimento, até 40% de comissão" (bio real) + WhatsApp real
11. **Rodapé** (ink) — logo, links que funcionam, Instagram, WhatsApp. SEM endereço (eles ocultam no catálogo).

## Wireframe — PDP (`produto.html?ref=XXX&v=variação`)

1. Breadcrumb · 2. Galeria 4:5 (sticky desktop; trilho com snap no mobile) | Etiqueta REF · H1 ·
preço + parcelas · seletor (letra A–Z com esgotadas riscadas / banho / combinação de filhos) ·
estoque real · "Adicionar à sacola" · 3 garantias · acordeões (Detalhes, Banho e cuidados, Garantia)
· 3. "Complete com" (4 peças) · barra fixa mobile.

## Performance

- 1º viewport ≤ 600 KB: 2 recortes do herói em WebP (~70 KB cada), 3 arquivos de fonte + subset do logo.
- LCP: foto da modelo, `fetchpriority="high"`, sem lazy. Resto `loading="lazy"`.
- Fotos de produto: 720×900 e 400×500 WebP, fundo normalizado pro `--bg-elevated`.
- Degrada primeiro: troca de foto no hover e reveal. Conteúdo existe sem JS, exceto o localizador
  (que renderiza fallback com todas as letras em links).

## Pendências (dados que não existem na fonte)

- Parcelamento: exibido "até 3x sem juros" (parcela mín. R$20). **Política a confirmar com o cliente.**
- Preço: o do catálogo ConectaVenda. No consignado (até 40% de comissão) ele é o preço ao consumidor. **Confirmar.**
- Garantia: existe (destaque no Instagram), prazo desconhecido. Texto sem número.
- Logotipo horizontal recriado em tipografia pra demo. Pedir o vetor oficial.
- Banner do herói: derivado do banner do JV SEM o texto (que citava a Catbird).

## Regra de verdade das fotos (aprendida no build)

Foto só troca com a variação quando o mapa foi CONFERIDO no olho (CLF043, CLF045, CLF042, PULI001,
PULI018, CL002, CJ001). Duas peças caíram por foto ≠ estoque: PULI002 (foto com pedras coloridas, à
venda só "pedra branca") e CLF007 (foto menino+menina, à venda só "2 meninos"). Foto de cor fora de
venda sai da galeria (CLF045 foto 2). Só 1 peça diz "ouro 18k" no cadastro (PING001): o site não
promete 18k no geral.

## Estado verificado (28/09/2026)

- 21 peças reais, 129+ variações conferidas contra o catálogo por script (preço e estoque idênticos).
- Home e PDP: 0 erro de console, 0 request falho, 0 overflow em 390 e 1440, todas as seções revelam.
- CPU 4x: LCP home 0,64 s (desktop) / 0,73 s (celular), PDP celular 1,1 s. CLS ≤ 0,004. 1ª dobra 408–494 KB.
- Fallback de fonte MEDIDO (Instrument 80,1% sobre Times; Outfit 96,8% sobre Arial). O chute inicial (92%) estava errado.
- Bug pego: `clip-path` total no alvo do IntersectionObserver = área visível zero = nunca revela. Recorte vai na imagem.
- Logo novo do JV (PNG preto) veio com letras derretidas pela IA: não usado. Rodapé usa o logo oficial do catálogo com alfa pela cor.

## Decisões descartadas

- Carrosséis múltiplos estilo Authentical — cortados pelo teste da morte.
- View Transitions card→PDP — PDP é T1, transição de página é proibida lá.
- Remoção de fundo por IA nas fotos — corrente fina quebra no recorte; normalização de tom resolve sem risco.
- Busca no header — em 16 peças seria controle morto. Sai.
- Selo "mais vendidos" — não há dado de venda. Sairia inventado.
