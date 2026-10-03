# database

Arquivos `.sql` que criam e alteram as tabelas do banco no Supabase. O que está aqui é a "receita" do banco: com esses arquivos dá para recriar tudo do zero em outro projeto.

## Como usar

1. Escrever o comando no arquivo `.sql`, no VS Code.
2. Copiar e rodar no **SQL Editor** do Supabase, **primeiro no projeto de teste**.
3. Conferir o resultado (tabela criada, consulta funcionando).
4. Só então fazer o commit do arquivo.

## Nome dos arquivos

Um arquivo por tabela ou por mudança, com número na frente para mostrar a ordem:

```
001_lotes.sql
002_pesos_referencia.sql
003_pesagens.sql
```

Se os dois criarem arquivos ao mesmo tempo, o número pode repetir. Por isso, combinar antes quem cria o próximo, ou usar a data no nome (`2026-10-05_pesagens.sql`).

## Regras

- **A ordem importa.** Uma tabela que tem chave estrangeira só pode ser criada depois da tabela a que ela se refere (`lotes` antes de `pesagens`).
- **Não reescrever um arquivo que já foi executado.** Se precisar mudar uma tabela existente, criar um arquivo novo com a alteração.
- **RLS junto com a tabela.** Todo arquivo que cria uma tabela já ativa o RLS e cria as políticas de acesso. Tabelas criadas por SQL não vêm com RLS ativado.
- **Avisar o outro** sempre que rodar algo novo no banco compartilhado.
- **Só dados fictícios.** Dados de teste vão em arquivos com o nome começando por `seed_`. Dados reais do cliente nunca entram no repositório.
- **Backups não ficam aqui.** Eles vão para a pasta `backups/`, que está no `.gitignore`.

## Tabelas planejadas

Marcar quando o arquivo estiver criado e rodado.

- [ ] `lotes`
- [ ] `pesos_referencia`
- [ ] `pesagens`
- [ ] `mortalidade`
- [ ] `estoque_itens`
- [ ] `movimentacoes_estoque`
- [ ] `sanidade_eventos`
- [ ] `lancamentos_financeiros`
- [ ] `producao_ovos`
- [ ] `clientes`
- [ ] `vendas`
- [ ] `perfis`

A lista pode mudar conforme conversarmos com o cliente. Alterações entram no registro de decisões, em `docs/decisoes.md`.
