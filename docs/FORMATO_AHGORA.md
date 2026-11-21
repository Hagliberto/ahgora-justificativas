# Formato de importação Ahgora

## Entrada aceita
`.xlsx`, `.xls`, `.csv`. O leitor utiliza **a primeira aba** e a primeira linha como cabeçalho. A validação atual rejeita quando faltam **mais de quatro** dos cabeçalhos esperados; com até quatro ausências prossegue com defaults — isso não significa que a planilha esteja correta.

## Colunas esperadas (grafia exata)

1. `Data solicitação`
2. `Data da justificativa`
3. `Matrícula`
4. `Funcionário`
5. `Localização`
6. `Departamento`
7. `Tipo`
8. `Status`
9. `Gestor Responsável`
10. `Informação`
11. `Motivo`
12. `Data e hora da aprovação`
13. `Detalhes`

## Exemplo inteiramente fictício

```csv
Data solicitação;Data da justificativa;Matrícula;Funcionário;Localização;Departamento;Tipo;Status;Gestor Responsável;Informação;Motivo;Data e hora da aprovação;Detalhes
10/11/2026 09:00;09/11/2026;01CAENTL0208000123;PESSOA EXEMPLO;CAENTL0208 620204000 Escalas de Revezamento;20204000 - UNIDADE EXEMPLO;Inclusão de batida;Pendente;GESTOR EXEMPLO;Esquecimento de marcação;; ;07:30
```

O exemplo é apenas esquemático; confirme delimitador/codificação no arquivo real. Datas numéricas de Excel são interpretadas pelo motor. Os tipos e nomes de colunas podem variar por exportação do Ahgora e precisam ser homologados.
