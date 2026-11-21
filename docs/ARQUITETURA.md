# Arquitetura implementada — v2.7.1

## Visão geral
Aplicação web estática (SPA) com **um `index.html` monolítico** contendo UI, CSS e JavaScript. Não utiliza servidor de aplicação nem base de dados. Bibliotecas de terceiros são baixadas por CDN em tempo de execução (necessária conexão inicial). Interface WIDE e hash routes; arquivos importados e registros vivem na memória da guia do navegador.

```text
arquivos múltiplos XLSX/XLS/CSV
  -> processUploadedFiles (validação e leitura SheetJS, primeira aba)
  -> importedFiles + mergeImportedRows (dedup 13 colunas)
  -> processDataset (normalização, chaves, flags, estatísticas)
  -> processedDataset / employeeStatsMap
  -> applyFilters (recorte de visualização)
  -> renderDashboardAdvanced / render* (DOM + Chart.js)
  -> modalidade de exportação
      * Completa -> exportStyledExcel(processedDataset)
      * Unidades -> getExportRows -> exportStyledExcel(subset)
      * ZIP -> exportUnitsZip -> exportStyledExcel(subset, returnBuffer:true) por unidade
           -> buildExportScopeData(subset) -> oito abas estilizadas ExcelJS
           -> JSZip
```

## Fronteiras e diferenças de escopo
- **Base carregada**: toda a competência consolidada da sessão, independentemente do mês civil das ocorrências.
- **Recorte de interface**: filtros globais + filtros de tabela, `filteredDataset`; não significa que exportação completa será filtrada.
- **Escopo da exportação**: `exportRows` escolhido no modal; todas as abas e contadores precisam resultar do **mesmo** subconjunto, independente das variáveis de interface.
- **Histórico**: fichas individuais usam registros importados na sessão. Não há histórico persistente entre recargas.

## Estado principal
`importedFiles`, `duplicateImportRows`, `fullImportedDataset`, `rawDataset`, `processedDataset`, `filteredDataset`, `employeeStatsMap`, `selectedCompetence`, `currentSourceName` e estado de navegação/seleção. Variáveis são globais dentro do script de `index.html`, portanto mudanças de efeito colateral exigem cautela.

## Dependências observadas
Tailwind por CDN (aviso de uso em produção), SheetJS v0.20.2, ExcelJS v4.4.0, Chart.js v4.4.3, JSZip v3.10.1, Font Awesome v6.5.2 e Inter do Google Fonts. Congelar/hospedar os assets localmente é trabalho futuro; **não** declarar operação offline garantida. Processamento de planilhas é local, mas dependências CDN causam requisições a terceiros.

## Riscos conhecidos
Monólito JS; DOM acessado por IDs; acoplamento entre renderização e processamento; exceções de navegador/Excel Web que testes de texto não identificam; dados de demonstração com nomes de aparência real; ausência de persistência; regras de auditoria dependentes de texto e fonte normativa. Evitar mudanças gerais em um único commit.
