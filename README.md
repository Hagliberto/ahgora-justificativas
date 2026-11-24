# Ahgora Justificativas — CAERN / NUPNN

**Versão do projeto: 2.7.2** · aplicação web de auditoria **preventiva** de justificativas do Ahgora, com processamento local no navegador e exportação Excel formatada.

## Início rápido
1. Abra `index.html` em navegador com acesso às bibliotecas CDN (ou hospede o diretório em servidor estático, inclusive Cloudflare Pages).
2. Importe **uma ou várias** planilhas `.xlsx`, `.xls` ou `.csv` de justificativas do Ahgora. É possível acrescentar mais arquivos depois.
3. Confira a **competência consolidada** na appbar: é **um lote lógico único**, mesmo quando as ocorrências são de meses distintos.
4. Use Dashboard, Base Tratada, Empregados, Unidades, Alertas e Inconformidades; clique em uma unidade e depois em um empregado para abrir a análise individual.
5. No ícone de exportar da appbar, escolha **Completa**, **Por unidade(s)** ou **ZIP por unidade**.

> **Importante:** a aplicação apresenta **indícios**; não determina automaticamente irregularidade ou responsabilidade. A Norma art. 7º §3º trata de quatro validações **mensais por esquecimento**, não de toda inclusão. O ranking de toda a competência consolidada não é prova de descumprimento do limite mensal. Há divergência entre a Norma (24h) e o Manual (dois dias úteis) quanto à análise do gestor.

## Funcionalidades existentes
- Upload múltiplo de arquivos; concatenação, validação por arquivo, deduplicação de linhas idênticas considerando as 13 colunas originais e resumo das fontes.
- Dashboards com filtros globais por unidade e outras dimensões; destaque de todas as inclusões, possíveis esquecimentos textuais e demais inclusões.
- Ranking consolidado de inclusões/esquecimentos por empregado, **sem divisão por mês da ocorrência**.
- Navegação por hash: `#/dashboard`, `#/base`, `#/empregados`, `#/unidades`, `#/alertas`, `#/inconformidades`, além de rotas de unidade e empregado.
- Análise por unidade → empregados → ficha individual com histórico dos dados disponíveis na sessão.
- Relatório de inconformidades e alertas para conferência humana, inclusive indícios de prazo, fundamentação, escala e dados incompletos.
- XLSX analítico de oito abas: `Base_Tratada`, `Inconformidades`, `Resumo_Executivo`, `Analise_Por_Unidade`, `Ranking_Empregados`, `Analise_Motivos_ACT`, `Distribuicao_Temporal`, `Alertas_Auditoria`.
- Exportação completa, escopo de uma/várias unidades e ZIP com um XLSX por unidade, **recalculando** agregados exclusivamente para os registros daquela unidade.

## Nomes e formatos de saída
Planilha principal: `justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx`. Planilhas individuais no ZIP incluem a identificação da unidade. O ZIP usa `.xlsx` reais — não CSV — para preservar estilos OOXML gerados pelo ExcelJS. A equivalência visual no SharePoint/Excel para Web deve ser verificada com arquivos reais.

## Tecnologias e arquitetura
HTML/CSS/JavaScript em **`index.html`** (SPA estática, sem backend), SheetJS, ExcelJS, JSZip, Chart.js, Tailwind CSS via CDN, Font Awesome e Google Fonts. Os dados importados permanecem na memória da página; não há persistência de análises entre recargas. `localStorage` guarda preferência de tema. Dependências CDN exigem acesso inicial à rede; o aviso Tailwind CDN em produção é débito técnico conhecido.

## Desenvolver e testar
Requer **Node >=20** para os testes. Não há etapa de compilação obrigatória.

```powershell
npm run check
# ou
npm test
```

Os testes `node:test` abrangem regras e regressões, incluindo `tests/isolamento-exportacao.test.cjs`. **Não equivalem a homologação em navegador ou no SharePoint**. Para um ciclo completo, siga `docs/HOMOLOGACAO.md`.

## Guia para mantenedores e outras IAs
**Antes de alterar código, leia [`AGENTS.md`](AGENTS.md).** Consulte [`docs/INDICE_TECNICO.md`](docs/INDICE_TECNICO.md) para arquitetura, mapa de funções, contratos de dados, regras de negócio e exportações. A documentação foi sincronizada com a **v2.7.2** e diferencia comportamento atual de melhorias propostas.

## Segurança e governança
Não usar dados pessoais reais em fixtures/commits. Não presumir que heurísticas equivalem a infrações. Não publicar projeto ou dados sem autorização. Ver [`SECURITY.md`](SECURITY.md) e [`docs/CONCILIACAO_NORMATIVA.md`](docs/CONCILIACAO_NORMATIVA.md).
