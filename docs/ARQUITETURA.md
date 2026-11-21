# Arquitetura atual

**Modelo:** aplicação single-page sem backend e sem build obrigatório, com CSS e JavaScript embutidos em `index.html`.

```text
Arquivo Ahgora (.xlsx/.xls/.csv)
    -> FileReader -> SheetJS (primeira aba)
    -> validação parcial de cabeçalhos
    -> normalização por registro
    -> agregação por matrícula / empregado
    -> aplicação de alertas de auditoria
    -> estado JS em memória
    -> filtros / indicadores / gráficos / tabelas
    -> ExcelJS -> download .xlsx
```

## Componentes lógicos
- Entrada: `handleFileSelect`, `processUploadedFile`, `EXPECTED_COLUMNS`.
- Tratamento: `parseBrDate`, `processDataset`, `getInclusionClassification`.
- Estado: `rawDataset`, `processedDataset`, `filteredDataset`, `employeeStatsMap`.
- UI: `switchTab`, `applyFilters`, `render*`, `openDetailModal`.
- Saída: `exportStyledExcel`, `exportFilteredRecordsExcel`, `exportFilteredEmployeesExcel`, `downloadWorkbook`.

## Abas
Visão Geral & Gráficos; Base Tratada & Filtros; Análise por Empregado; Análise por Unidade; Alertas de Auditoria.

## Dependências
Tailwind CDN (script de navegador, sem versão travada na URL), SheetJS 0.20.2, ExcelJS 4.4.0, Chart.js 4.4.3, Font Awesome 6.5.2, Google Fonts (Inter). Um navegador com internet é necessário para carregar os recursos externos, salvo se já estiverem disponíveis em cache.

## Débitos técnicos
- Acoplamento de interface e regras em arquivo único de ~168 KB.
- Dependências remotas e scripts inline dificultam política CSP.
- `EXPECTED_COLUMNS` aceita importação mesmo com até 4 colunas faltantes: a validação é permissiva e deve ser revista.
- `parseBrDate` e os cálculos de dias precisam de casos de teste de fuso, data inválida e planilhas com datas numéricas.
- Dados embutidos de demonstração devem ser substituídos por fixtures fictícias.

**Evolução proposta**, não implementada: separar `src/core`, `src/import`, `src/export`, `src/ui`, criar testes unitários e automatizados e adotar build leve somente após homologação da versão atual.


## Evolução 2.6.0

Relatório de Inconformidades por empregado, competência, unidade e gestor. Rota `#/inconformidades` e geração XLSX com aba de evidências e providências. A lógica permanece no HTML monolítico; futura separação em módulos continua recomendada. Ver `RELATORIO_INCONFORMIDADES.md`.
