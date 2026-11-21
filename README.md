# Ahgora Justificativas — v2.7.0

## Novo: importação múltipla e ranking por competência única

- Selecione várias planilhas `.xlsx`, `.xls` ou `.csv` em um só upload ou clique em **Adicionar planilhas** após processar a primeira. Também suporta soltar vários arquivos.
- O sistema valida as colunas de cada arquivo e consolida os registros em uma **única competência**, identificada na appbar (padrão: `Consolidada`). Datas de meses diferentes são preservadas, sem separar o ranking por mês.
- Arquivos repetidos (nome, tamanho e data de modificação idênticos) são ignorados; linhas **exatamente iguais nas colunas reconhecidas** são contabilizadas apenas uma vez. Alterações em qualquer campo podem produzir registros distintos; duplicidades semânticas exigem conferência.
- O Dashboard apresenta o ranking de inclusões (tratadas operacionalmente como possíveis esquecimentos) e esquecimentos com texto explícito por empregado, a distribuição de 0, 1, 2, 3, 4 e 5+ casos, e exportação do ranking com filtros ativos.
- A mesma base consolidada alimenta as abas, o relatório de inconformidades, as exportações por unidade e o ZIP. É possível limpar toda a base e começar novamente.
- **Ressalva normativa:** a Norma art. 7º, §3º, trata de até quatro validações **por mês**. Um total de cinco ou mais na competência consolidada (que pode durar vários meses) **não comprova** infração mensal. A análise normativa exige verificação no sistema de origem das datas e das efetivas validações. Inclusões genéricas não são automaticamente esquecimentos comprovados.
- Dados importados ficam em memória no navegador; recarregar a página remove a sessão. Evite compartilhar planilhas contendo dados pessoais.

---

# Ahgora Justificativas — Auditoria e Análise (CAERN / NUPNN)

Aplicação web estática para importar planilhas de justificativas do Ahgora, normalizar registros, oferecer análise gerencial e gerar relatórios Excel. **Versão do aplicativo: 2.7.0.** Dashboard gerencial com filtros globais, análise integrada e exportação dedicada, preservando a competência e a triagem normativa.

## Como executar

1. Baixe/descompacte o projeto e abra `index.html` em um navegador atualizado conectado à internet para carregar as bibliotecas externas.
2. Importe um `.xlsx`, `.xls` ou `.csv` do Ahgora (primeira aba) ou use a demonstração em **Configurações**.
3. A competência é **única e consolidada**, podendo abranger registros de vários meses; altere seu identificador na appbar conforme a apuração. Não há segmentação automática por mês.
4. No **Dashboard & Insights**, selecione filtros globais de período, empregado, gestor, filial, regime e auditoria. Os filtros complementares da aba **Base Tratada** também afetam os gráficos, KPIs e demais abas.
5. Explore **Base Tratada**, **Empregados**, **Unidades** e **Alertas**. Use **Limpar globais** para limpar apenas filtros globais ou **Limpar filtros** na base tratada para limpar os filtros complementares.
6. Exporte o **Dashboard XLSX** (resumo, gestores, registros filtrados), os registros filtrados, o ranking ou o relatório analítico completo em `.xlsx`. O botão de exportação analítica completa não segue necessariamente o recorte global: use o botão dedicado do Dashboard para exportar a seleção.

Alternativamente, para servir localmente: `python -m http.server 8000` e acesse `http://localhost:8000`.

**Atenção:** a análise dos arquivos acontece no navegador, mas as dependências são baixadas de CDNs; portanto, **100% local não significa funcionamento offline nem ausência de requisições de rede**. Não publique arquivos reais de pessoal em repositórios ou hospedagem pública.

## Estrutura

```text
index.html                      Aplicação original (HTML, CSS e JS em arquivo único)
README.md                       Orientações de instalação e operação
AGENTS.md                       Convenções para manutenção por pessoas e agentes
CHANGELOG.md                    Histórico das alterações
SECURITY.md                     Cuidados e limites de segurança
.editorconfig                   Padrão de formatação
.gitignore                      Exclusão de arquivos pessoais e temporários
package.json                    Scripts de verificação, sem dependências de build
docs/ARQUITETURA.md             Visão técnica, fluxo e bibliotecas
docs/REGRAS_DE_NEGOCIO.md      Regras IMPLEMENTADAS e pontos para homologação
docs/FORMATO_AHGORA.md          Campos esperados e exemplos de entrada
docs/ROADMAP.md                Evolução recomendada por prioridade
docs/HOMOLOGACAO.md            Roteiro de conferência e aceitação
tests/smoke.test.cjs           Testes estáticos sem dados pessoais
```

## Requisitos e tecnologias

- Navegador atualizado com JavaScript, FileReader e suporte a downloads.
- **SheetJS 0.20.2** para leitura; **ExcelJS 4.4.0** para geração de `.xlsx`; **Chart.js 4.4.3** para gráficos.
- Tailwind CSS via CDN, Font Awesome 6.5.2 via CDN e fonte Inter via Google Fonts.
- Node.js 20+ **opcional**, apenas para `npm test` / `npm run check`.

## Desenvolvimento

```powershell
npm test
npm run check
```

Não há `npm install` obrigatório para executar a aplicação. O arquivo HTML permanece a entrada única, preservando o formato inicial do projeto.

## Fluxo Git sugerido

```powershell
git checkout -b feature/analise-hierarquica-v2.6.0
# copie os arquivos desta entrega sobre o repositório e confira o diff
git status
git add .
git commit -m "chore: documenta e padroniza auditoria de justificativas"
git push -u origin feature/analise-hierarquica-v2.6.0
```

A versão original estava na `main` com a árvore limpa; esta entrega **não alterou seu repositório local nem fez push**. Homologue antes de mesclar na `main`.

## Limites

O sistema **sinaliza** registros para conferência e não decide automaticamente a validade jurídica ou administrativa de uma justificativa. Os parâmetros atuais de 4 inclusões, 5/7 dias e escala 12x36 vêm do código recebido; precisam de confirmação formal na norma aplicável e no período de apuração. Consulte [regras](docs/REGRAS_DE_NEGOCIO.md) e [homologação](docs/HOMOLOGACAO.md).

## Mudanças das versões anteriores (histórico)
- Navegação por botões discretos na appbar e competência em seletor compacto.
- Aviso normativo recolhido em ícone informativo acessível.
- Navegação hierárquica: Unidades → Empregados → Ficha individual.
- Histórico mensal do empregado baseado em todos os meses presentes no arquivo importado.
- Perfil de motivos, aprovação média, evolução textual dos esquecimentos e comparação com unidade.
- Nome da exportação analítica: `justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx`.
- Versão de interface, README, pacote e changelog sincronizada.

## Mudanças da versão 2.2.0

- Filtros globais de datas de ocorrência, matrícula/empregado, gestor, filial, grupo de regra e tipo de sinalização; cruzamento com filtros já existentes.
- Indicadores de aprovação, tempo de decisão, decisões com mais de 24h, reprovações, esquecimentos textualmente identificados e gestores.
- Quatro novos gráficos (status, gestores, empregados, dias da semana), quatro novos insights e painel com volume, pendências, decisões e alertas por gestor.
- Exportação do recorte do Dashboard para XLSX em três abas; reorganização de análises por empregado/unidade/alerta para respeitar filtros ativos.
- **Atenção:** estatísticas individuais da coluna de esquecimentos preservam a competência inteira; filtros não reclassificam o limite mensal. Contagens por gestor são volumes absolutos, sem normalização pela lotação da equipe.
- Nenhuma classificação automática implica sanção; sinais de prazo exigem conferência frente à Norma e Manual.

## Mudanças da versão 2.1.0

- Competência por **data da justificativa** (ocorrência), com totalização e reapuração dos indicadores ao alternar mês.
- Não considera todas as inclusões como “esquecimento”: triagem mensal somente quando o texto indica explicitamente esquecimento. O limite da Norma art. 7º §3º é específico para validação desses casos. A exportação continua trazendo volume total de inclusões como indicador, **não como conclusão de infração**.
- Sinalização de solicitações posteriores à ocorrência para conferência do art. 12, sem condenação automática; aprovação acima de 24h sinalizada com ressalva de conflito entre Norma e Manual.
- Rejeita importações sem campos essenciais e arquivos maiores que 25MB; valida datas com rejeição de valores impossíveis; ausência de matrícula não vira `000000`.
- Todas as avaliações são preventivas; exceções, calendário de dias úteis, razão efetiva do ajuste e aprovação normativa demandam validação humana.

**Limitação da origem:** não há campo estruturado que confirme “esqueci de bater ponto”. A heurística textual pode deixar de reconhecer situações. Consulte `docs/CONCILIACAO_NORMATIVA.md`.

## Rotas e exportação (v2.6.0)

A navegação usa rotas hash, compatíveis com GitHub Pages e Cloudflare Pages sem configuração de fallback: `#/dashboard`, `#/base`, `#/empregados`, `#/unidades`, `#/alertas` e `#/inconformidades`. A exploração de unidade usa `#/unidades/CODIGO` e a ficha individual `#/empregados/MATRICULA`. **Os dados não são persistidos entre recarregamentos:** importe a planilha novamente ao abrir um link numa nova sessão.

Na appbar, o ícone Excel abre o modal **Completa / Por unidade**. Em *Por unidade*, marque uma ou várias unidades, use a busca ou selecione todas as visíveis. As 8 abas do arquivo analítico são calculadas somente com as linhas das unidades escolhidas, respeitando a competência selecionada (que inicia em **Todas as competências**). O modo Completa ignora filtros visuais do dashboard. O nome permanece `justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx`.


### Histórico do hotfix 2.4.1
A v2.4.1 corrigiu um erro de renderização no dashboard que impedia o acesso às abas após a importação. O aviso `cdn.tailwindcss.com should not be used in production` é independente desse erro. A migração para CSS Tailwind compilado é recomendada antes da publicação definitiva (não incluída neste hotfix, pois requer dependências de build).


## Relatório de Inconformidades (v2.6.0)

A rota `#/inconformidades` apresenta indícios por empregado, competência, unidade e gestor. É uma **triagem preventiva**, não declaração de infração. Os filtros do Dashboard/Base influenciam o relatório; filtros internos permitem escolher unidade, assunto, prioridade e buscar empregado/gestor. Há exportação XLSX específica e uma oitava aba `Inconformidades` na planilha analítica geral (inclusive seleção de várias unidades).

Classificações: (1) possível excesso de **esquecimentos** identificados textualmente, computado por matrícula e competência com referência ao art. 7º, §§ 3º-4º (a contagem não prova validações efetivas); (2) solicitação posterior a ocorrência, com exceções do art. 12; (3) aprovação acima de 24h, **apenas informativa** devido à divergência documental com o Manual p. 4 (dois dias úteis); (4) descrição insuficiente, como triagem da fundamentação; (5) eventual incompatibilidade textual 12x36, a confirmar com escala oficial; (6) datas inconsistentes.

Dados ausentes no XLSX, como justificativa contextual, documento comprobatório, validação efetiva, batidas originais, escala oficial e decisão final do gestor, **não podem ser inferidos**. O arquivo exportado oferece coluna vazia `Análise do gestor (preencher)`; não há armazenamento de decisões na aplicação. Consulte `docs/RELATORIO_INCONFORMIDADES.md`.

## Dashboard de inclusões e ZIP por unidade (v2.6.0)

A análise global inclui filtro por Unidade e classificação visual entre todas as inclusões, possíveis esquecimentos identificados pelo texto e outras inclusões. O modal **Exportar análise** aceita ZIP com um XLSX formatado de oito abas para cada unidade. Detalhes e checklist: [`docs/INCLUSOES_E_EXPORTACAO_ZIP.md`](docs/INCLUSOES_E_EXPORTACAO_ZIP.md).
