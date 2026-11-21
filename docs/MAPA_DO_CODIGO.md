# Mapa de código e pontos de extensão — v2.7.1

**Arquivo**: `index.html`. Em vez de confiar em números de linha, busque pelo **nome da função** (os deslocamentos mudam a cada release).

| Recurso | Entradas / funções | Efeito / aviso |
|---|---|---|
| Modal e appbar | `openExportModal`, `closeExportModal`, `updateExportScope` | Preservar botões/IDs, inclusive `btnExportSingle` |
| Importação | `handleFileSelect`, `processUploadedFiles` | Vários arquivos, até 25 MiB por arquivo, primeira aba; processar erros individualmente |
| Consolidação | `importedRowKey`, `mergeImportedRows`, `renderImportedSources`, `resetImportedFiles` | Dedup por 13 campos; não remover duplicados apenas por matrícula/data |
| Normalização | `parseBrDate`, `getCompetence`, `processDataset` | `selectedCompetence` é rótulo da competência **única** |
| Esquecimento | `isForgottenPunch`, `getInclusionClassification`, `forgottenRankingRows` | Tipo inclusão != indício textual de esquecimento |
| Filtros | `populateFilterOptions`, `resetFilters`, `resetGlobalFilters`, `applyFilters` | Mesmo recorte em cards e tabelas; cuidado com indicadores baseados no conjunto todo |
| Navegação | `switchTab`, `applyLocationRoute`, `openAllUnits`, `openUnitEmployees`, `openEmployeeAnalysis` | `#/unidades` → `#/unidades/<codigo>` → `#/empregados/<matricula>` |
| UI | `updateKpis`, `generateInsights`, `renderCharts`, `renderDashboardAdvanced`, `renderPunchDashboard` | Verificar TODOS os IDs usados pelo JS |
| Ficha | `monthHistoryForEmployee`, `drawEmployeeAnalysis`, `renderEmployeeTab` | Histórico individual da sessão atual |
| Norma e achados | `getConformityFindings`, `renderConformityReport`, `addConformitySheet` | Indícios, nunca conclusão disciplinar; observar prazo Norma vs Manual |
| Ranking esquecimentos | `renderForgottenRanking`, `exportForgottenRanking` | Ranking consolidado sem separar por mês civil |
| Excel parcial | `exportFilteredRecordsExcel`, `exportFilteredEmployeesExcel`, `exportDashboardExcel`, `exportConformityReport` | Exportações próprias podem usar filtros ativos |
| Seleção/ZIP | `exportUnitsFromDataset`, `getExportRows`, `confirmExportSelection`, `exportUnitsZip` | Uma planilha por unidade, sem dados cruzados |
| Cálculos de XLSX | **`buildExportScopeData`**, `buildBaseTratadaSheet`, `buildRankingEmpregadosSheet`, `exportStyledExcel` | **PONTO CRÍTICO:** recalcular empregados por departamento + matrícula a partir de `exportRows` |
| ExcelJS | `getExcelStyleHelpers`, `downloadWorkbook`, `safeExportFilename`, `saveBlob` | Preservar 8 abas, formatação e nomes de arquivos |
| Proteção HTML | `escapeHtml`, `showToast` | Entrada Ahgora não confiável; evitar XSS |

## Alterações típicas com impacto
1. **Nova coluna de importação**: atualizar `EXPECTED_COLUMNS`, cabeçalhos essenciais se aplicável, normalização, testes, `FORMATO_AHGORA.md` e dedup se alterar contrato.
2. **Novo card**: criar ID no HTML, calcular com escopo apropriado e testar `renderDashboardAdvanced` (erro anterior: `textContent` em ID inexistente).
3. **Nova aba de XLSX**: adicionar em `exportStyledExcel` usando apenas seus `processedDataset`/`exportScope.employees` **locais**, atualizar contrato de oito abas se número mudar, ZIP, testes e README.
4. **Nova regra normativa**: registrar hipótese, fonte, vigência, limites da evidência, testes com casos positivos/negativos.
5. **Nova rota**: adicionar botão, controle de painel, hash e Voltar/Avançar; não quebrar a hierarquia.
