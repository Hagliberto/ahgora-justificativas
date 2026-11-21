# Dashboard de inclusões e exportação ZIP — v2.6.0

## Filtros globais

`globalUnit` filtra registros por nome da unidade (`deptNome`) em conjunto com datas, gestor, matrícula, filial, regime e auditoria. Por padrão todas as unidades. A competência inicial continua `Todas as competências`.

## Esquecimentos

- **Inclusões de batida:** todos os ajustes classificados no Ahgora como inclusão.
- **Possíveis esquecimentos:** subconjunto cuja informação ou motivo menciona esquecimento.
- **Outras inclusões:** inclusões sem evidência textual de esquecimento, que podem demandar conferência; não se conclui que sejam ou não esquecimentos.
- **Empregados com 5+ possíveis esquecimentos/mês:** conta as ocorrências na base da competência do evento por matrícula; a filtragem visual não altera a contagem mensal usada para sinalização.

Norma NN.DD.P.A.06.0008.05, art. 7º, §3º. A classificação é preventiva, nunca uma conclusão automática de infração.

## Exportações

- `Completa`: XLSX analítica única com 8 abas, todas as unidades do recorte importado.
- `Por unidade`: XLSX analítica única com as 8 abas para as unidades selecionadas.
- `ZIP por unidade`: arquivo ZIP com uma planilha analítica XLSX de 8 abas para cada unidade selecionada. Os arquivos são gerados individualmente por ExcelJS e compactados por JSZip no navegador; são binários XLSX, não CSV.
- Para não sobrescrever arquivos com nomes de unidades parecidos, os nomes incluem código e nome normalizados. Conferir identificadores duplicados em arquivos de origem.
- O XLSX grava estilos (fontes, preenchimentos, bordas, alinhamento), formatos, filtros e congelamento quando atribuídos. Ao salvar/carregar no SharePoint, o arquivo mantém as propriedades OOXML; certas apresentações e operações podem variar no Excel para Web. Testar com arquivos reais.
- A versão atual carrega bibliotecas por CDN; para execução offline e operação de produção deve-se empacotá-las localmente.

## Checklist

- [ ] Importar dados com mais de uma unidade e competência.
- [ ] Validar filtro global Unidade e alternar tipos de inclusões.
- [ ] Verificar que os cards, gráfico e tabela respondem ao mesmo recorte.
- [ ] Verificar competência `MM/AAAA` na coluna e no XLSX de inconformidades.
- [ ] Gerar ZIP e abrir dois XLSX de unidades distintas; validar que nenhum contém outra unidade.
- [ ] Abrir XLSX no Excel Web do SharePoint e conferir cores, bordas, filtros, larguras e formatos.
