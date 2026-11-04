# Registro da recuperação

## Origem e histórico

Em 4 de novembro de 2026, o repositório remoto continha somente README.md em dois commits (0ffb943 e 2b771af), apenas a branch main, sem tags, releases ou artefatos do GitHub Actions. O histórico existente foi preservado.

Foi encontrada uma cópia local na pasta de uma recuperação anterior, datada de 8 de outubro de 2026. O registro dessa cópia identifica https://mamae-confeiteira.pages.dev/ como a fonte dos arquivos públicos. A data do conteúdo online atual não foi verificada nesta restauração.

As quatro páginas, products.js, imagens e catálogo foram mantidos sem alterações. O README antigo foi arquivado em [ESCOPO-ORIGINAL.md](ESCOPO-ORIGINAL.md); ele descreve o sistema pretendido, inclusive componentes ausentes. O registro anterior continua em [RECUPERACAO.md](../RECUPERACAO.md).

## O que falta recuperar

- Cloudflare Pages Functions: functions/api/ e functions/_shared/.
- Configuração original do Cloudflare, incluindo wrangler.toml e binding KV DB.
- Dados privados do KV, como pedidos, caixa e configurações.
- Credenciais e integrações de pagamento.
- Código e configuração do print-agent.

Esses itens não podem ser extraídos de HTML público. As próximas fontes possíveis são a conta Cloudflare, backups e a conversa em que o sistema foi desenvolvido. Uma implementação nova deve ser identificada como reconstrução, sem presumir compatibilidade com dados e pagamentos existentes.

## Integridade e publicação

O manifesto recovery/sha256.json registra os hashes dos arquivos recuperados. A verificação roda com node scripts/verificar-recuperacao.mjs e pode ser ativada no GitHub Actions usando o modelo docs/github-actions.exemplo.yml. A ativação não foi feita porque a credencial disponível não tem escopo workflow. Ela verifica integridade, sintaxe do JavaScript e referências locais de imagens/scripts; não comprova o funcionamento de pedidos ou pagamentos.

Esta organização não inclui um fluxo de deploy. Não substituir o site de produção por esta cópia parcial. Se o Cloudflare estiver conectado ao repositório, revisar as configurações de deploy antes de integrar os arquivos na branch de produção.
