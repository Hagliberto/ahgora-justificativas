# Índice técnico — v2.7.1

**Leitura por ordem**: [AGENTS](../AGENTS.md) → [README](../README.md) → este índice.

| Documento | Para que serve |
|---|---|
| [ARQUITETURA](ARQUITETURA.md) | Modelo e fluxo de processamento atual |
| [MAPA_DO_CODIGO](MAPA_DO_CODIGO.md) | Onde editar cada recurso dentro do HTML monolítico |
| [CONTRATOS_DE_DADOS](CONTRATOS_DE_DADOS.md) | Entradas, estado, chaves, deduplicação, competência |
| [FORMATO_AHGORA](FORMATO_AHGORA.md) | 13 cabeçalhos Ahgora e restrições da importação |
| [REGRAS_DE_NEGOCIO](REGRAS_DE_NEGOCIO.md) | Heurísticas implementadas e suas ressalvas |
| [CONCILIACAO_NORMATIVA](CONCILIACAO_NORMATIVA.md) | Norma vs Manual: fontes e divergências |
| [DASHBOARD](DASHBOARD.md) | Cards, filtros, rankings e seus denominadores |
| [RELATORIO_INCONFORMIDADES](RELATORIO_INCONFORMIDADES.md) | Indícios e limitações de auditoria |
| [ROTAS_E_EXPORTACOES](ROTAS_E_EXPORTACOES.md) | Rotas hash e seleção do modal |
| [EXPORTACOES_E_ISOLAMENTO](EXPORTACOES_E_ISOLAMENTO.md) | Contrato das oito abas; isolamento de departamento |
| [IMPORTACAO_MULTIPLA_E_RANKING](IMPORTACAO_MULTIPLA_E_RANKING.md) | Consolidação de fontes e ranking único |
| [INCLUSOES_E_EXPORTACAO_ZIP](INCLUSOES_E_EXPORTACAO_ZIP.md) | Separação inclusão/esquecimento e ZIP |
| [HOMOLOGACAO](HOMOLOGACAO.md) | Testes e validações manuais antes de deploy |
| [SEGURANCA](../SECURITY.md) | Riscos, proteção de dados, CDNs e limitações |
| [ROADMAP](ROADMAP.md) | Melhorias propostas (não confundir com entregas) |

**Fonte do código:** `index.html`. **Testes:** `tests/*.test.cjs`. **Comandos:** `npm test`, `npm run check` (Node >=20).

**Regra geral:** antes de mudar exportações, ler `EXPORTACOES_E_ISOLAMENTO.md` e executar `tests/isolamento-exportacao.test.cjs`. Antes de mudar normas, ler `CONCILIACAO_NORMATIVA.md` e comunicar decisões pendentes.
