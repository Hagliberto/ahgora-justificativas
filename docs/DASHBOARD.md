# Dashboard e ranking de esquecimentos — v2.7.1

## Escopo e filtros
- A competência **inicia `Consolidada`** e abrange todos os registros importados na sessão, ainda que tenham datas de vários meses; não é automaticamente um seletor mensal.
- Filtros globais incluem unidade, intervalo, empregado, gestor, filial, regime e situação (conforme controles existentes no `index.html`). Os filtros de tabela podem complementar o recorte. Cards/gráficos devem indicar corretamente se usam `filteredDataset` ou estatísticas integrais.
- A navegação Unidades → Empregados → Ficha individual é complementar, com histórico obtido da base importada na sessão e não de um banco permanente.

## Inclusões e esquecimentos
1. **Inclusões de batida**: registros cujo tipo foi classificado como inclusão; volume operacional, não confirmação de esquecimento.
2. **Possíveis esquecimentos**: subconjunto com texto indicativo (`isForgottenPunch` pesquisa Informação/Motivo por termos como `esqueci`, `esquecimento`, `esqueceu`). Uma falha biométrica ou defeito de equipamento exige análise diferente.
3. **Outras inclusões**: inclusões que não apresentam indício textual de esquecimento.
4. **Ranking consolidado**: soma por empregado de todo o lote identificado por uma única competência, sem dividir por meses. Deve manter acesso à ficha individual e filtros relevantes.

## Cuidado essencial de interpretação
A Norma art. 7º §3º limita a quatro **validações mensais por esquecimento**, enquanto o ranking consolida uma competência que pode conter muitos meses e tipos de ajustes. **NUNCA** transformar `5+` no ranking em conclusão automática de infração. Para conclusão seriam necessários motivo oficial, validação efetiva, mês aplicável e conferência humana.

## Outros indicadores
Taxa de aprovação, decisão em horas, aprovações acima de 24h, concentração e recortes por gestor/unidade são indicadores descritivos. Não são medidas de produtividade, culpa ou cumprimento normativo. Divergência Norma/Manual quanto ao prazo de aprovação requer ressalva explícita.

## Exportações
Exportações específicas do dashboard/ranking podem utilizar recorte visual. A exportação analítica **completa**, escolhida no modal, usa a base da competência consolidada, não necessariamente os filtros da tela; exportações por unidade/ZIP usam o escopo explicitamente selecionado. Ver `EXPORTACOES_E_ISOLAMENTO.md`.
