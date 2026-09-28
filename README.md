# Gregorio Semijoias: demo de loja

Demonstração visual de loja de varejo para a Gregorio Semijoias, sem checkout. Proposta da NODE.

## Rodar local

```
py -m http.server 5500
```

Abrir http://localhost:5500

## Estrutura

- `index.html`: home (coleções, localizador de inicial, filhos, vitrine, maleta, revenda)
- `produto.html?ref=CLL002&l=N`: página de produto, serve qualquer `ref` de `assets/produtos.js`
- `assets/produtos.js`: 21 peças reais do catálogo, com preço e estoque lidos em 28/09/2026
- `assets/site.css` e `assets/site.js`: tokens, componentes, header, menu e sacola
- `assets/home.js` e `assets/produto.js`: comportamento de cada página
- `DIRECAO.md`: direção de arte, decisões e medições

## Publicar

Site estático: importar este repositório na Vercel, sem build e sem framework.
