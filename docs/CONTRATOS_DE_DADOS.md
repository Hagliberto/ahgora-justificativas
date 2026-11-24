# Contratos de dados — v2.7.2

## Fontes e leitura
- Extensões aceitas: `.xlsx`, `.xls`, `.csv`. `processUploadedFiles` usa `file.arrayBuffer()` e SheetJS, lê **a primeira planilha** de cada arquivo e normaliza espaços nos nomes das colunas.
- **Colunas essenciais**: conferir `ESSENTIAL_COLUMNS` no `index.html`; as 13 esperadas constam de `FORMATO_AHGORA.md`. Arquivo vazio/sem essenciais é recusado; limite de 25 MiB por arquivo.
- É possível adicionar fontes na mesma sessão. Assinatura para ignorar reimportação do mesmo arquivo: `nome::tamanho::lastModified`; isso **não** substitui a deduplicação de linhas.

## Deduplicação e identidade
- `importedRowKey`: JSON das 13 colunas esperadas, convertidas para texto, aparadas nas pontas e normalizadas para Unicode NFC; `mergeImportedRows` remove **duplicatas exatas após esse tratamento**, preservando a primeira ocorrência. Linhas distintas de alterações de status/horário não são necessariamente duplicatas.
- Matrícula pode ser derivada da coluna Ahgora, mas ausências não devem fundir pessoas diferentes; nunca substituir por matrícula genérica compartilhada.
- **Chave de agrupamento para exportação**: `deptCodigo::deptNome::matricula`, com fallback separado se matrícula ausente. Mesma matrícula em departamentos distintos resulta em agregados separados; isso é intencional.

## Competência e datas
- `selectedCompetence` inicia como `Consolidada` e identifica **um lote**, mesmo com registros de várias datas/meses. `getCompetence` pode extrair `AAAA-MM` de uma ocorrência para cálculos específicos, mas **não** deve segmentar o ranking consolidado automaticamente.
- `formatCompetenceBR` é usado na apresentação `MM/AAAA` quando aplicável; não confundir rótulo consolidado com mês da ocorrência.
- O limite normativo de quatro *validações por esquecimento* é **por mês**; números da competência consolidada são apenas métricas de acompanhamento, não prova de descumprimento desse limite.

## Estado e filtros
- `processedDataset`: conjunto normalizado e auditado da sessão; `filteredDataset`: recorte visual; `employeeStatsMap`: agregação global para telas. **Não empregar `employeeStatsMap` para gerar ranking de uma exportação por departamento**.
- `exportStyledExcel(exportRows)` deve chamar `buildExportScopeData(exportRows)` e usar `exportScope.rows` / `exportScope.employees` para cálculos locais em todas as abas.
- Alteração no estado global deve ser comprovada com testes de regressão na importação, filtros, rotas e exportações.

## Evidências
Campos texto importados como `Informação`, `Motivo` e `Detalhes` são declarações do sistema origem, não comprovação externa. Preservá-los na exportação, proteger a exibição e evitar propagação indevida de dados pessoais.
