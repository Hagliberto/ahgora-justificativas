# Exportações e isolamento por departamento — contrato crítico v2.7.2

## Modal Exportar análise
1. **Completa**: um XLSX com a base da sessão.
2. **Por unidade**: uma ou várias unidades selecionadas, um XLSX comum.
3. **ZIP por unidade**: para cada unidade, um XLSX formatado; ZIP agregado via JSZip.

Principal: `justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx`. No ZIP os nomes por unidade incluem identificador/código e nome normalizados. A exportação específica do Dashboard, ranking e inconformidades possui nomenclatura própria; não confundir com a principal.

## Oito abas no XLSX analítico
`Base_Tratada`, `Inconformidades`, `Resumo_Executivo`, `Analise_Por_Unidade`, `Ranking_Empregados`, `Analise_Motivos_ACT`, `Distribuicao_Temporal`, `Alertas_Auditoria`.

**Contrato de integridade:** cada aba recebe somente linhas ou agregados derivados do mesmo `exportRows`, jamais empregados de toda a base. Mesmo empregados com matrícula idêntica em unidades diferentes não podem compartilhar contadores. Não é suficiente ocultar as linhas de outras unidades — também é necessário recomputar cartões, rankings, taxas, percentuais e motivos.

## Funções a manter alinhadas
- `getExportRows()`: define o escopo de unidade(s).
- `exportUnitsZip(rows)`: faz subconjunto por unidade e chama `exportStyledExcel(subset,{returnBuffer:true})`.
- `buildExportScopeData(exportRows)`: recalcula `rows` e `employees` sem `employeeStatsMap`; chave inclui `deptCodigo`, `deptNome` e matrícula.
- `exportStyledExcel(exportRows, options)`: utiliza `const processedDataset = exportScope.rows` e `const allEmpSorted = exportScope.employees` (variáveis LOCAIS); constrói todas as oito abas.
- `buildBaseTratadaSheet` e `buildRankingEmpregadosSheet`: dependem dos contadores locais.

## Regressão mínima (obrigatória)
- Massa com departamentos A e B, matrícula 001 nos dois, matrícula 002 só em A, matrícula 003 só em B.
- Exportar A: somente empregados de A; matrícula 001 com contagem APENAS de A, inclusive `Base_Tratada`, `Ranking_Empregados` e `Inconformidades`.
- Exportar B: situação inversa.
- Exportar A+B: permitir empregado 001 separado por unidade nos rankings associados a departamento.
- ZIP A+B: abrir ambos os XLSX; cada uma das oito abas deve respeitar sua unidade; comparar totais e nomes do arquivo.
- Execução automática atual: `node --test tests/isolamento-exportacao.test.cjs`; complementar com leitura binária de XLSX/ZIP no navegador e, se possível, inspeção com ExcelJS.

## Estilo / SharePoint
A geração com ExcelJS escreve cores, bordas, formatos, filtros e congelamentos atribuídos às células. ZIP conserva os `.xlsx` individuais; **não** converte para CSV. SharePoint/Excel para Web tende a preservar as propriedades OOXML, mas apenas uma homologação com arquivos produzidos pelo navegador comprova equivalência visual e operacional.
