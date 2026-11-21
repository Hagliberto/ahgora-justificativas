# Rotas e exportações — v2.4.1

## Rotas

| Rota | Visão |
| --- | --- |
| `#/dashboard` | Visão geral e gráficos |
| `#/base` | Base tratada |
| `#/empregados` | Lista de empregados |
| `#/unidades` | Todas as unidades visíveis no recorte global |
| `#/alertas` | Alertas para revisão |
| `#/unidades/<código>` | Empregados da unidade escolhida |
| `#/empregados/<matrícula>` | Ficha individual |

A aplicação é SPA estática e usa **hash routing**. Abas têm URL própria e navegação Voltar/Avançar sem requests para páginas inexistentes. Após atualizar a página, o usuário precisa importar a planilha outra vez. Não incluir dados sensíveis como nomes ou descrições no URL.

## Exportação

- **Completa:** todos os registros da competência ativa; não obedece aos filtros de visualização da interface.
- **Por unidade:** uma ou diversas unidades selecionadas via checkbox; pode-se pesquisar, marcar todas as visíveis ou limpar as visíveis.
- A exportação mantém 7 abas, todos os agregados do arquivo usam o mesmo subconjunto de registros.
- Competência inicial: **Todas as competências**. Nesse modo, os indicadores mensais de esquecimento não afirmam violação do limite sem delimitação de competência.
- Nome: `justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx`.

## Homologação no navegador

1. Importar base com múltiplas unidades e competências; confirmar opção padrão “Todas as competências”.
2. Exportar Completa e conferir total da aba Base_Tratada.
3. Exportar somente uma unidade; conferir totais de todas as abas e a exclusão das demais unidades.
4. Exportar duas unidades e confirmar ambas no arquivo.
5. Navegar Unidades → empregados → ficha e usar voltar/avançar; confirmar URL.
6. Recarregar e importar novamente; conferir retomada da rota.
