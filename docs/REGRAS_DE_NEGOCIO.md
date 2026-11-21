# Regras de negócio implementadas — v2.7.1

**Natureza:** auditoria preventiva, baseada em declarações extraídas do Ahgora. Indícios demandam conferência e nunca geram conclusão disciplinar automática.

| ID | Comportamento e âmbito | Base ou ressalva |
|---|---|---|
| R01 | Competência **única** `Consolidada` por lote/sessão, mesmo cruzando meses | Rótulo gerencial, não mês calendário |
| R02 | Várias planilhas aceitas; união e eliminação de linhas exatamente duplicadas após normalização de 13 campos | Duplicidade não é inferida só por matrícula/data |
| R03 | Classifica todas as inclusões como volume; identifica possíveis esquecimentos apenas por termos em Informação/Motivo | Norma art. 7º §3º limita validações por **esquecimento**, não todas inclusões |
| R04 | Ranking de inclusões/esquecimentos por empregado na **competência consolidada** | Não classifica 5+ no lote multimensal como excesso mensal comprovado |
| R05 | Possível esquecimento e prazo de aprovação acima de 24h produzem triagem para conferência | Norma art. 12 vs Manual p. 4 divergentes; dias úteis não foram reconciliados |
| R06 | Solicitação posterior à data do fato pode ser marcada para revisão | Norma art. 12 permite situações imprevisíveis e inadiáveis; não é infração automática |
| R07 | Informação genérica/curta e indício de divergência de escala podem virar alerta | Heurísticas, sem comprovação de ocorrência ou escala real |
| R08 | Colunas essenciais e formatos são verificados antes de cada importação | Ver `CONTRATOS_DE_DADOS.md` e `FORMATO_AHGORA.md` |
| R09 | Matrícula inválida/ausente não deve fundir pessoas distintas; datas impossíveis não podem ser aceitas como válidas | Integridade de dados |
| R10 | Excel por departamento e ZIP isolam linhas e agregados por unidade, inclusive ranking | `buildExportScopeData` é a fonte local para exportações; regressão v2.7.1 |
| R11 | Filtros de interface, exportação completa e exportação por unidade têm **escopos diferentes** | Não misturar `filteredDataset` e `exportRows` silenciosamente |

**Não verificado por esta base isolada**: registro efetivo dos horários e intervalos, perícia de escala, faltas, documentos comprobatórios, feriados, análise de mês civil para aplicação conclusiva do limite, autoria/validação de batidas, versões do ACT e aplicação disciplinar. Isso requer outras fontes e homologação.

Fontes: Norma CAERN NN.DD.P.A.06.0008.05 (31/12/2024), art. 7º §§3º-4º e art. 12; Manual da Norma de Controle de Jornada (páginas impressas 4 e 6). Ver `CONCILIACAO_NORMATIVA.md` para localizar as referências.
