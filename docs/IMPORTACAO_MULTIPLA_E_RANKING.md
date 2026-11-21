# Importação múltipla e ranking — v2.7.1

1. Aceita seleção múltipla via seletor ou drag and drop; as fontes permanecem apenas na memória da aba.
2. Valida cada arquivo individualmente (extensão, 25 MB por arquivo, primeira aba, colunas essenciais).
3. Une as linhas de todas as fontes, elimina ocorrências com igualdade de todos os campos reconhecidos e recarrega a apuração sem separar por meses de ocorrência.
4. O campo de competência é uma etiqueta única da apuração; datas originais são mantidas para histórico e conferência individual.
5. Ranking principal: por matrícula, com totais de inclusões (volume de possíveis esquecimentos operacionais) e indicador separado dos que possuem **texto explícito** de esquecimento. Agrupamento de distribuição: 0, 1, 2, 3, 4, 5 ou mais.
6. Os filtros do Dashboard determinam quais linhas integram o ranking visual e a exportação do ranking. O indicador 5+ é **volume consolidado**, não infração do limite mensal previsto no art. 7º, §3º.
7. Conflitos semânticos, como a mesma justificativa com status diferente, não são resolvidos automaticamente; os registros serão tratados como distintos.

## Homologação

- Importar dois arquivos com meses diferentes, mesmo empregado e 2 esquecimentos em cada: ranking = 4, sem dividir por mês.
- Importar arquivos sobrepostos: linhas exatamente iguais não duplicam; linhas alteradas seguem separadas e devem ser conferidas.
- Selecionar apenas uma unidade: gráficos, ranking e exportação do ranking refletem o recorte.
- Conferir os arquivos Excel e ZIP em Excel desktop e Excel para Web.
