# Changelog

Formato inspirado em Keep a Changelog. Versões do aplicativo são distintas das tags Git.

## [2.0.1] — 2026-11-20

### Adicionado
- README operacional, documentação de arquitetura, esquema da planilha, regras de negócio, checklist de homologação, roadmap, segurança e convenções.
- `.editorconfig`, `.gitignore`, `package.json` com testes estáticos e `AGENTS.md`.
- Região de avisos com `aria-live` e descrição acessível para navegação e upload.

### Corrigido
- Avisos toast passam a inserir mensagens como texto, não HTML.
- Dados textuais dinâmicos nas renderizações principais passam por escape HTML, reduzindo a exposição a injeção de marcação oriunda da planilha.

### Mantido
- Motor de cálculo, importação, estrutura de abas, visual original e exportações Excel; sem mudança deliberada nas regras administrativas.

## [2.0.0] — versão identificada no HTML recebido
- Versão-base anterior à padronização. O repositório compartilhado não apresentava tags Git.
