# Homologação / aceite

Usar **exclusivamente dados fictícios** durante testes automatizados e demonstrações públicas.

- [ ] Abrir a aplicação e carregar as bibliotecas sem erros no console.
- [ ] Importar XLSX, XLS e CSV com colunas válidas; testar arquivo vazio e extensão inválida.
- [ ] Validar matrícula com prefixo alfanumérico e comparação com documento de origem.
- [ ] Conferir datas no mesmo dia, retroativas, antecipadas, virada de mês/ano, data Excel e fuso.
- [ ] Conferir inclusão de batida (0, 1, 4, 5, 6, 7) para cada empregado.
- [ ] Conferir critérios de alerta: >5 e >7 dias, justificativa genérica e indicação de 12x36.
- [ ] Conferir abono `Dia Todo`, intervalos simples, horários noturnos e ausência de horário.
- [ ] Aplicar filtros, limpar filtros, alternar abas, paginar e abrir/fechar modais.
- [ ] Conferir indicadores/gráficos contra totalização independente.
- [ ] Exportar planilha analítica de 7 abas, registros filtrados e ranking por empregado.
- [ ] Testar importação contendo texto literal `<img src=x onerror=alert(1)>` e garantir que ele apareça como texto, sem execução.
- [ ] Testar acessibilidade básica por teclado, mobile e tema claro/escuro.
- [ ] Confirmar formalmente fundamento/competência das regras com RH/jurídico.

**Critério de aceite:** nenhuma mudança não autorizada nos resultados do motor; divergências documentadas em issue e corrigidas antes da publicação.

## Checklist 2.1.0
- [ ] Base de duas competências: a mais recente aparece por padrão; alternar mês recarrega KPIs, tabelas, alertas e Excel.
- [ ] “Todas” mostra dados exploratórios sem afirmar excesso mensal de esquecimentos.
- [ ] Cinco ajustes com motivo textual explícito de esquecimento sinalizam conferência; cinco inclusões sem tal texto NÃO disparam a regra de quatro.
- [ ] Aprovação após 24h sinaliza alerta **sem decisão de infração**; registrar divergência entre Norma e Manual.
- [ ] Datas impossíveis e matrículas ausentes não geram agrupamento fraudulento.
- [ ] Arquivo sem campos essenciais não substitui base já carregada; arquivo >25MB é recusado.
- [ ] Conferir funcionamento de todas as cinco abas, gráficos e exportações no navegador (não automatizado nos testes unitários).

## Checklist 2.4.1
- [ ] Interface e documentação exibem versão 2.4.1.
- [ ] Appbar exibe cinco abas compactas e seletor de competência.
- [ ] Ícone (i) abre e fecha aviso normativo, sem card persistente.
- [ ] Clique na unidade filtra empregados; clique no empregado abre ficha.
- [ ] Ficha mostra todos os meses disponíveis da importação, inclusive fora da competência atual.
- [ ] Filtros e ausência de resultados não quebram detalhamento.
- [ ] Arquivo exportado: justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx.


### Regressão v2.4.1
- [ ] Importar planilha real: sucesso sem toast falso de arquivo protegido.
- [ ] Carregar demonstração: Dashboard e indicadores visíveis.
- [ ] Appbar > Unidades: todas as unidades abrem, sem exceção JS.
- [ ] Unidade > Empregados > ficha individual: fluxo completo.
- [ ] Trocar competência e filtros após importar, sem erro `textContent` de null.
- [ ] Exportar a planilha e validar todas as abas.
- [ ] Avaliar migração do Tailwind Play CDN para build CSS local.
