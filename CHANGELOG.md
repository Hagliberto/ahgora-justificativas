## [2.6.0] - 2026-11-21

### Dashboard e inclusões de batida
- Novo painel dedicado a inclusões de batida, triagem de possíveis esquecimentos, inclusões sem texto indicativo e casos com cinco ou mais possíveis esquecimentos em uma mesma competência.
- Gráficos com distribuição das inclusões e empregados com mais registros indicativos de esquecimento.
- Filtro global por Unidade atualiza todos os indicadores do Dashboard e análises que respeitam o recorte global.
- Filtro de Auditoria inclui todas as inclusões, possíveis esquecimentos, demais inclusões e reincidência mensal (para revisão humana).

### Inconformidades e relatórios
- Rótulo `Gestor ou Núcleo de Pessoal` e coluna `Departamento` no lugar de `Código`.
- Competência no formato MM/AAAA na interface e na aba Excel de Inconformidades.
- Modal `Exportar análise` sem sufixo CAERN.
- Nova exportação ZIP com uma planilha `.xlsx` formatada de oito abas por unidade selecionada.
- Os XLSX preservam as propriedades de células geradas pelo ExcelJS; exibição no Excel Online/SharePoint pode variar conforme o recurso.

### Regras
- Os indícios de esquecimento são detectados por texto, não por toda inclusão; limite de quatro validações mensais por esquecimento conforme norma, sujeito a conferência.

## [2.5.0] - 2026-11-20

- Nova aba `Inconformidades` (`#/inconformidades`), com indicadores, filtros e tabela gerencial por empregado, unidade e competência.
- Triagem rastreável fundamentada em Norma e Manual, sem conclusão disciplinar automática; tratamento mensal de possíveis esquecimentos.
- XLSX específico para o gestor e nova aba `Inconformidades` na exportação analítica completa/por unidade (total de 8 abas).
- Navegação para ficha do empregado e registro detalhado a partir do relatório.
- Testes adicionais de rotas, regras, escopo e documentação.

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
