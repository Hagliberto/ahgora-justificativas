# Regras de negócio — fotografia do código 2.0.1

> **Status: implementadas no código, NÃO homologadas juridicamente/normativamente nesta entrega.** Antes de decidir efeitos funcionais, confirmar o ato normativo, a janela de apuração, o ACT aplicável e as exceções com o gestor responsável.

| ID | Implementação atual | Observação |
| --- | --- | --- |
| R01 | Extrai os últimos 6 algarismos da matrícula de origem, ou completa com zeros à esquerda | Matrículas sem números viram `000000`; risco de agregação indevida |
| R02 | Localização: 1º token = filial; 2º token numérico = centro de custo; restante = grupo/regime | Depende do layout textual do Ahgora |
| R03 | Departamento no padrão `código - nome` é separado em código e nome | Caso contrário, preserva descrição |
| R04 | Tipo contendo `inclusão`/`inclusao` é inclusão de batida; tipo contendo `abono` é abono | Comparação parcial, sem catálogo de tipos |
| R05 | Inclusões por empregado: 0 regular; 1–4 dentro do limite; 5–6 reincidente; 7+ crítico | **Quantidade calculada sobre toda a base importada**, não por mês |
| R06 | Pedido anterior à ocorrência é antecipado; no dia, normal; depois, retroativo | Diferença de dias corridos, sem calendário de úteis |
| R07 | Atraso >5 dias sinaliza atenção; >7 dias, crítico | Limiar administrativo do código, confirmar fundamento |
| R08 | Texto de justificativa inferior a 5 caracteres ou igual a `act`, `ok`, `ponto`, `batida`, `ajuste`, `teste` gera atenção | Detecção heurística |
| R09 | Texto/motivo cita 12x36 e localização não reconhece revezamento/12x36: alerta crítico | A inferência de escala é textual, não comprova divergência |
| R10 | Abono `Dia Todo` recebe duração estimada fixa de 480 min; intervalo hora inicial/final calcula diferença, com virada de dia | Não equivale necessariamente à carga real do empregado |
| R11 | Empregado é agregado por matrícula padronizada e, se vazia, nome | Ver risco R01 |
| R12 | Dados ausentes podem receber valores padrão (ex.: status `Pendente`, diferença 0) | Distinguir ausência de dado real é melhoria necessária |

**Regra de apresentação:** alertas não são reprovação nem punição automática; são indicadores para conferência humana.

## Mudanças de regra
Registrar origem normativa (cláusula/artigo), vigência, interpretação aprovada, exemplos positivos e negativos, teste e nova versão. Não modificar limiares diretamente sem essa trilha.
