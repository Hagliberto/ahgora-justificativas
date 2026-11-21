## [2.4.1] - 2026-11-20
- Corrigida renderização de indicadores e tratamento de importação.

## 2.4.1 — 20/11/2026
- Download da appbar abre modal com exportação completa ou por uma/múltiplas unidades.
- O Excel analítico continua com 7 abas e nome `justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx`.
- Todas as competências selecionadas por padrão ao importar.
- Rotas hash (`#/dashboard`, `#/base`, `#/empregados`, `#/unidades`, `#/alertas`) com histórico do navegador, sem necessidade de configuração de redirects.
- Rotas de detalhamento por unidade e matrícula na mesma sessão; seleção atual não persiste após recarregar.
- Correção do acesso à página Unidades na appbar e preservação do drill-down.
- Testes de regressão para modal, roteamento e competência.

# Histórico de alterações

## 2.3.0 — 20/11/2026
- Versão visível, README e package.json alinhados.
- Navegação compacta na appbar com competência e aviso normativo no ícone (i).
- Fluxo hierárquico unidades → empregados → detalhamento individual, incluindo perfil e histórico mensal.
- Exportação analítica com nome padronizado em data local brasileira.
- Histórico disponível somente para os períodos contidos no arquivo importado.


## 2.2.0 — 20/11/2026
- Dashboard com filtros globais cruzados e indicadores de gestão.
- Novos gráficos e insights descritivos por status, gestor, empregado e dia da semana.
- Painel de pendências e decisão por gestor; exportação filtrada em XLSX.
- Sincronização dos recortes das abas de empregados, unidades e auditoria.
- Preservados os alertas preventivos e a lógica mensal de esquecimentos.


## 2.1.0 — 20/11/2026
- Filtro por competência baseado na data da ocorrência, com reapuração mensal.
- Triagem de possíveis esquecimentos sem confundir todas as inclusões com motivo normativo.
- Alertas de prazo preventivos e conflito Norma vs Manual documentado.
- Validação de estrutura e tamanho da importação; datas estritas e matrícula ausente não substituída por zeros.
- Novos testes para competência, datas inválidas e classificação do motivo.

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
