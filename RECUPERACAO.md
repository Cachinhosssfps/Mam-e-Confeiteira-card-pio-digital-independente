# Recuperação do projeto Mamãe Confeiteira

Fonte: https://mamae-confeiteira.pages.dev/

Recuperados: index.html, painel.html (também acessível em /painel), balcao.html, bio.html, products.js e 75 imagens/ícones referenciados nas páginas e no catálogo público.
O catálogo publicado está preservado em recovery/catalogo-publicado.json.
Os arquivos HTML/JS foram preservados sem alterações.

## Limites da recuperação
O repositório original contém apenas README.md em seus dois commits.
Não foram recuperados Cloudflare Pages Functions, KV (pedidos, caixa, configurações privadas), segredos, wrangler.toml ou o print-agent. Esses componentes não são disponibilizados pelo site público. Esta cópia não constitui uma restauração completa do sistema de pedidos.
Para recuperar esses componentes, procurar a pasta original, backups, a conversa onde o código foi criado ou os artefatos disponíveis na conta Cloudflare. Não substituir o deploy ativo por esta cópia incompleta.

## Visualização local
Na pasta deste projeto, execute: python3 -m http.server 8080
Abra http://localhost:8080/. As chamadas /api/ dependem do backend que ainda não foi recuperado.
