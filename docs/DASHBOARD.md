# Dashboard Gerencial — v2.4.0

## Filtros e escopo

A competência MM/AAAA é selecionada pela **data da ocorrência** e determina o universo de auditoria. Os filtros globais (intervalo de ocorrência, empregado, gestor, filial, grupo de regra e sinalização) são cumulativos com os filtros complementares da aba Base Tratada (unidade, tipo, status, prazo, motivo, frequência de inclusões, busca textual e somente sinalizações).

Todos os indicadores e gráficos do dashboard, as tabelas de unidade e de alertas e a lista de empregados visíveis usam o **recorte combinado**. O ranking individual apresenta as **contagens completas da competência** para empregados presentes no recorte, para não distorcer a regra de quatro esquecimentos mensais ao filtrar dias. Assim, os totais individuais podem superar o número de registros filtrados: isto é intencional.

## Indicadores

- Aprovação (%): aprovadas / todas as solicitações filtradas; não é taxa de cumprimento normativo.
- Tempo de decisão: média de horas entre solicitação e aprovação/reprovação com datas válidas, descartando períodos negativos; pendentes não entram na média.
- Acima de 24h: decisões identificadas com intervalo de mais de 24 horas; **triagem**, sujeito à divergência Norma art. 12 x Manual.
- Concentração: participação dos 20% de empregados com maior volume no recorte, arredondados para cima; não leva em conta tamanho da equipe ou dias trabalhados.
- Gráficos por gestor: registros por situação no recorte; não constituem ranking de desempenho.
- Dia da semana: dia da **ocorrência**, não da solicitação.

## Exportações

**Dashboard XLSX** contém `Dashboard`, `Gestores` e `Registros_Filtrados` para o recorte combinado. A exportação analítica completa da barra superior usa o escopo de competência carregado; não a considere uma exportação do recorte filtrado.

## Cuidados de auditoria

O limite do art. 7º, §3º, é relativo a esquecimentos de marcação, que aqui são identificados apenas por padrões textuais. O filtro não reinterpreta o motivo e o aplicativo não decide se há irregularidade. A Norma e o Manual têm orientações diferentes quanto ao prazo de aprovação; o produto apenas indica necessidade de verificação.

O dashboard utiliza **volume absoluto** e não taxas por quadro de empregados, por ausência da população-base. Não extrapolar conclusões sobre produtividade, reincidência relativa ou comportamento.


## Fluxo hierárquico 2.4.0
Na appbar, abra Unidades e clique na unidade; a lista de empregados aparece filtrada. Clique no empregado para ver ficha analítica mensal, perfil e comparações. A evolução histórica consulta todas as competências do **arquivo atual**, independentemente da competência visual. Agrega os arquivos enviados à sessão atual. Não conserva dados entre recargas. As médias da unidade usam o recorte de filtros selecionado.
