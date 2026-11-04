# Mamãe Confeiteira

Cardápio digital da Mamãe Confeiteira, com páginas para clientes, painel da loja, balcão e links das redes sociais.

> **Recuperação parcial:** este repositório preserva o front-end encontrado em um backup local. O backend, os dados de pedidos e o agente de impressão ainda não foram recuperados. Esta cópia não está pronta para substituir o sistema de produção.

## Arquivos recuperados

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Cardápio e interface de pedidos |
| `painel.html` | Interface administrativa |
| `balcao.html` | Interface de venda presencial |
| `bio.html` | Página de links da loja |
| `products.js` | Catálogo base de produtos |
| `assets/` | 75 fotos, imagens e ícones |
| `recovery/catalogo-publicado.json` | Catálogo público preservado na recuperação anterior |
| `recovery/sha256.json` | Manifesto de integridade dos arquivos recuperados |
| `docs/` | Histórico da recuperação e descrição do sistema original |
| `scripts/` | Verificação da cópia recuperada |
| `docs/github-actions.exemplo.yml` | Modelo de verificação para GitHub Actions |

As páginas, o JavaScript e as imagens foram preservados sem alterações. Preços, estoques e links refletem a cópia recuperada e precisam ser revisados antes do uso comercial.

## Visualização no computador

Requer Python 3. Na pasta do projeto, execute:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Abra [o cardápio local](http://localhost:8080/). As outras interfaces estão em `/painel.html`, `/balcao.html` e `/bio.html`.

Login, pedidos, pagamentos, caixa e demais chamadas `/api/` dependem do backend ausente e não funcionam nessa visualização. Não há instalação de dependências nem etapa de build.

## Verificar os arquivos

Requer Node.js 22 ou superior, sem pacotes adicionais:

```bash
node scripts/verificar-recuperacao.mjs
```

A verificação confere hashes, sintaxe dos scripts e caminhos locais de imagens e scripts. O modelo em `docs/github-actions.exemplo.yml` permite executar a mesma checagem no GitHub Actions. Para ativá-lo, adicione-o em `.github/workflows/verificar.yml` pelo GitHub ou com uma credencial que permita editar workflows. A credencial usada nesta recuperação não tem essa permissão; por isso o modelo está documentado e a checagem foi executada localmente. Ela não testa as operações do sistema de pedidos.

## Próximas etapas da recuperação

Faltam `functions/api/`, `functions/_shared/`, a configuração do Cloudflare/KV, os dados privados e o `print-agent/`. As fontes possíveis são backups, a conta Cloudflare e a conversa original de desenvolvimento.

Consulte o [registro da recuperação](docs/RECUPERACAO.md) e o [escopo descrito no README original](docs/ESCOPO-ORIGINAL.md). Esse escopo descreve também funcionalidades cujo código ainda não foi encontrado.

## Publicação e credenciais

O sistema original usava Cloudflare Pages Functions e KV. GitHub Pages serve somente arquivos estáticos e não executa esse backend. Este repositório não configura deploy automático. Revise qualquer integração existente no Cloudflare antes de incorporar a recuperação à branch de produção.

Não envie senhas, tokens, arquivos `.env`, `.dev.vars` ou dados de clientes ao GitHub. O `.gitignore` cobre os principais arquivos locais de credenciais.

Projeto desenvolvido para a Mamãe Confeiteira. Nenhuma licença de redistribuição foi adicionada nesta recuperação.
