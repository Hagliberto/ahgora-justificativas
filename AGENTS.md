# AGENTS.md — contrato de manutenção para agentes de IA

> **Leia este arquivo ANTES de editar.** Fonte analisada: `index.html` / `package.json` da **v2.7.1**. A documentação descreve o comportamento observado no código, não uma arquitetura futura desejada. Consulte `docs/INDICE_TECNICO.md` para navegação.

## 0. Objetivo e inegociáveis
- Aplicação web estática, local no navegador, de triagem gerencial de justificativas exportadas do Ahgora; **não é um sistema disciplinar**, homologador de faltas nem um validador automático do ACT.
- **Uma competência lógica consolidada por sessão**, ainda que as ocorrências atravessem meses. Não repartir o ranking da competência por mês automaticamente. **Separadamente**, o limite normativo de quatro validações por esquecimento é **mensal**: nunca declarar infração com base no total da competência consolidada.
- Uma sessão aceita **várias planilhas** e novos uploads subsequentes; deduplicação ocorre por igualdade normalizada das **13 colunas de origem**. Não deduplicar por matrícula/data isoladamente. Não persistir dados funcionais por padrão.
- **Isolamento de exportação é crítico**: Excel por departamento e cada XLSX do ZIP devem conter exclusivamente registros e agregados de seu departamento, **inclusive `Ranking_Empregados`, `Base_Tratada`, `Inconformidades` e todas as oito abas**. Não consultar `employeeStatsMap` global ao construir agregados exportados; usar `buildExportScopeData(exportRows)` e o escopo derivado. Empregado transferido pode constar em dois departamentos com contagens independentes.
- A nomenclatura principal de XLSX é `justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx`. O modal chama-se **Exportar análise** e suporta completa, seleção múltipla de unidades e ZIP (uma planilha de oito abas por unidade). Alterar esses contratos só com pedido explícito.
- Preservar as rotas com hash e a navegação **Unidades → Empregados → Ficha individual**; aba de inconformidades `#/inconformidades` e ranking de esquecimentos permanecem operacionais.
- Nunca inferir inconformidade confirmada de heurística textual; toda sinalização requer conferência do gestor. Há divergência entre Norma art. 12 (24 horas) e Manual (dois dias úteis): manter ressalva até orientação institucional expressa.

## 1. Leitura mínima antes de qualquer alteração
1. `README.md` e `docs/INDICE_TECNICO.md` — visão geral e localização da informação.
2. `docs/ARQUITETURA.md`, `docs/CONTRATOS_DE_DADOS.md` e `docs/MAPA_DO_CODIGO.md` — fluxo real, objetos e funções.
3. `docs/REGRAS_DE_NEGOCIO.md` e `docs/CONCILIACAO_NORMATIVA.md` — separar regra implementada, heurística e fonte normativa.
4. `docs/EXPORTACOES_E_ISOLAMENTO.md` e `docs/ROTAS_E_EXPORTACOES.md` — contratos de saída e navegação.
5. `docs/HOMOLOGACAO.md` e `tests/` — casos de regressão. Leia a implementação relevante **antes** de modificá-la.

## 2. Arquitetura real e dependências
- `index.html` concentra marcação, estilos, scripts, dados de demonstração e funções globais. **Não refatore tudo de uma vez**: mudanças locais pequenas com testes de comportamento antes de separar módulos.
- `package.json`: Node >=20; `npm test` e `npm run check` executam `node --test tests/*.test.cjs`. Não pressupor bundler, framework, backend, banco ou testes E2E já configurados.
- Bibliotecas do navegador: SheetJS (leitura), ExcelJS (XLSX), JSZip (ZIP), Chart.js (gráficos), Tailwind CDN (estilos), Font Awesome e fonte Inter. O Tailwind CDN de desenvolvimento gera aviso em produção; migrar para CSS compilado exige projeto específico de regressão visual.
- `localStorage` é usado para **preferência de tema**, não para persistência da base importada. Recarregar exige nova importação.

## 3. Procedimento obrigatório em cada mudança
1. Documentar intenção, escopo e possíveis regressões: importação, processamento, filtros, rotas, gráficos, exportação, privacidade.
2. Localizar funções exatas em `docs/MAPA_DO_CODIGO.md`; verificar suas chamadas e IDs no HTML. Nunca remover um ID sem revisar `getElementById`, seletores e testes; bug de ID ausente já interrompeu todo o Dashboard.
3. Criar/ajustar teste com **pessoas fictícias** que falhe antes da correção. Testar tanto o caminho normal quanto dados ausentes, múltiplas unidades, duplicidade e mesmo empregado em unidades diferentes.
4. Preservar as 13 colunas Ahgora e o contrato de normalização; validação dos campos essenciais. Não aceitar mudança silenciosa em limiares, contagem, chaves ou interpretação de prazos.
5. Reexecutar `npm run check` e `node --check` sobre o JavaScript inline extraído; validar manualmente importação múltipla, navegação, filtros, todas as abas e exportações Excel/ZIP em navegador real. **Testes estáticos isolados não demonstram a integridade de um XLSX ou o funcionamento visual.**
6. Inspecionar ao menos dois XLSX de departamentos distintos: cada uma das 8 abas, totais, fórmulas/formatos/estilos, ausência de registros cruzados; usar Excel desktop e/ou Excel para Web quando aplicável. Não anunciar homologação SharePoint sem teste real.
7. Atualizar **todos os pontos de versão** (`package.json`, título/etiquetas HTML, `README.md`, `CHANGELOG.md`, documentação cuja versão está escrita, testes com versão literal). Não alterar a versão só na interface.
8. Explicitar no relatório de entrega quais testes foram executados e quais ficaram pendentes; nunca afirmar que um E2E passou sem executá-lo.

## 4. Regras práticas de implementação
- `processUploadedFiles` faz a leitura e valida cada arquivo; `mergeImportedRows` elimina duplicidades **exatas**; `processDataset` normaliza e calcula; `applyFilters` seleciona o recorte da interface; funções `render*` desenham; `exportStyledExcel` gera a saída de escopo independente. **Não reutilize `filteredDataset` como fonte padrão da exportação completa**.
- Em ZIP, `exportUnitsZip` seleciona subconjunto por unidade e passa a `exportStyledExcel(subset, {returnBuffer:true})`; não mutar variáveis globais por iteração.
- IDs e classes de roteamento (incluindo `#/unidades`, `#/empregados`, `#/dashboard`) são contratos de UI. Preservar botão Unidades e Voltar/Avançar.
- Matrícula ausente não pode virar matrícula genérica `000000` que una empregados distintos; atenção à chave de departamento + matrícula em agregações.
- Diferenciar **inclusão de batida** (tipo) de **possível esquecimento** (texto em Informação/Motivo); exceções como falha de relógio não são automaticamente esquecimento.
- Conteúdo de planilha é entrada **não confiável**. Para HTML usar `textContent`/`escapeHtml`; Excel precisa sanitizar valores que possam ser interpretados como fórmulas quando provenham de texto livre (ver `SECURITY.md`). Nunca registrar dados pessoais reais em logs, testes, issues ou respostas.
- Não mascarar falha de renderização como erro de arquivo com senha: leitura e processamento têm mensagens distintas.
- Mudanças normativas: adicionar referência (documento, artigo, data, vigência), interpretação pendente/homologada, casos de teste, atualização de `docs/REGRAS_DE_NEGOCIO.md` e `docs/CONCILIACAO_NORMATIVA.md`.

## 5. Antes de abrir PR ou realizar push
- Confirmar `git status`, `git diff --check`, `npm run check`, JS check e todos os testes aplicáveis (incluindo `tests/isolamento-exportacao.test.cjs`).
- Testar com massa sintética de **duas unidades**, empregado com mesma matrícula presente em ambas, múltiplos meses em **uma competência**, fontes sobrepostas e indícios de esquecimento diferentes de simples inclusão.
- Documentar alterações em `CHANGELOG.md` como versão proposta/lançada de forma consistente. Preferir commits `fix:`, `feat:`, `docs:`, `test:`, `refactor:`, `chore:`.
- **Não publicar, excluir branches, fazer deploy ou modificar dados externos sem autorização explícita**. Proteção da `main` e autorização do mantenedor prevalecem.

## 6. Padrão de resposta de outro agente
Relatar: arquivos modificados; comportamento antes/depois; testes executados e seus resultados; limitações/pendências; instruções de instalação/publicação. Não prometer zero bugs nem alegar que 'a norma foi homologada' sem validação institucional.
