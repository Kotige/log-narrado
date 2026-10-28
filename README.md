# Log Narrado

Blog pessoal sobre ciência, tecnologia e experiências pessoais, com crônicas,
posts e os contos do **Fabulário**.

Feito com React 19, Vite, Tailwind CSS 4 e React Router. O conteúdo é escrito
em Markdown, dentro do próprio repositório.

## Rodando localmente

Requer Node.js 20.19 ou mais recente.

```bash
npm install
npm run dev       # servidor de desenvolvimento em http://localhost:5173
```

| Script                 | O que faz                                              |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento (mostra também rascunhos)  |
| `npm run build`        | Build de produção em `dist/`                           |
| `npm run preview`      | Serve o build localmente                               |
| `npm run lint`         | ESLint                                                 |
| `npm run format`       | Formata o código com Prettier                          |
| `npm test`             | Testes (Vitest)                                        |
| `npm run check`        | Lint, formatação, testes e build — o mesmo que o CI    |

## Publicando um texto

Crie um arquivo `.md` na pasta da coleção. O nome do arquivo vira o endereço
da página (`sobre-simetria.md` → `/posts/sobre-simetria`).

### Posts — `src/content/posts/`

```markdown
---
title: Sobre simetria e dentes de leite
date: 2026-09-23
category: crônicas
tags: [física, simetria, memória]
excerpt: Se nem o Universo é simétrico, por que eu precisaria ser?
draft: true
---

Texto do post em Markdown…
```

| Campo      | Obrigatório | Descrição                                                         |
| ---------- | ----------- | ----------------------------------------------------------------- |
| `title`    | sim         | Título do post                                                    |
| `date`     | sim         | Data de publicação, no formato `AAAA-MM-DD`                       |
| `category` | sim         | Categoria, em minúsculas (`crônicas`, `ciência`…)                 |
| `tags`     | não         | Lista em uma linha: `[tag1, tag2]`                                |
| `excerpt`  | sim         | Resumo curto — aparece nas listagens, no RSS e nas prévias de link |
| `draft`    | não         | `true` esconde o texto do site publicado (continua visível no dev) |

### Contos do Fabulário — `src/content/fabulario/`

Mesmos campos `title`, `date`, `excerpt` e `draft`, mais:

| Campo            | Descrição                                                     |
| ---------------- | ------------------------------------------------------------- |
| `genre`          | `fantasia`, `terror` ou `ficcao-cientifica`                   |
| `cover`          | Caminho da capa (de preferência uma imagem em `public/`)      |
| `contentWarning` | Aviso de conteúdo exibido antes do texto                      |
| `series`, `part` | Nome da série e número da parte, se o conto fizer parte de uma |

### Changelog — `src/content/changelog/`

Campos `title`, `date`, `description` e `type` (`novo`, `corrigido` ou
`alterado`).

> O frontmatter aceita apenas pares `chave: valor` de uma linha, listas em
> uma linha (`[a, b]`) e `true`/`false`. Valores com `:` podem ficar entre aspas.

## Estrutura

```
src/
  components/   componentes reutilizáveis (Header, Footer, Layout, cards…)
  routes/       páginas
  hooks/        preferências de leitura, modo leitura, meta tags
  lib/          leitura do conteúdo, datas, parser de frontmatter
  data/         dados do site, do autor e das categorias de projetos
  content/      textos em Markdown
build/
  staticPages.js  gera HTML por página, sitemap.xml, rss.xml e robots.txt
```

## Publicação

O site é publicado na [Vercel](https://vercel.com): importe o repositório e
use as configurações do `vercel.json` (já inclui as URLs limpas, os cabeçalhos
de segurança e o cache dos arquivos estáticos).

No build, cada página ganha seu próprio HTML com título, descrição e Open
Graph, para que buscadores e prévias de links mostrem as informações certas.
O endereço público do site fica em `SITE_URL`, em
[`src/data/site.js`](src/data/site.js). Ajuste se usar outro domínio.
