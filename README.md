# Sistema de Gestão para Galinheiro

Sistema web para registrar e acompanhar a rotina de um galinheiro: lotes, peso das aves, mortalidade, ração e estoque, produção de ovos, vacinas, vendas e finanças. Pensado para ser usado principalmente pelo celular.

## Tecnologias

- **Front-end:** React, Vite e Tailwind
- **Banco de dados e login:** Supabase (PostgreSQL)
- **Tarefas automáticas (backup, avisos):** Python
- **Código:** Git e GitHub

## Estrutura do repositório

```
sistema-galinheiro/
|-- README.md       este arquivo
|-- docs/           decisões, desenho do sistema e anotações
|-- database/       arquivos .sql, na ordem de criação
|-- frontend/       projeto React (telas)
|-- scripts/        scripts em Python (backup, avisos)
```

Cada pasta tem o seu próprio README explicando como usá-la.

## Como rodar o front-end

(Vale depois que o projeto React for criado dentro de `frontend`.)

1. Entrar na pasta: `cd frontend`
2. Instalar as dependências: `npm install`
3. Criar o arquivo `.env` (veja abaixo)
4. Rodar: `npm run dev`

## Variáveis de ambiente

O arquivo `.env` guarda as chaves do Supabase e **nunca vai para o GitHub** (está no `.gitignore`). Cada pessoa cria o seu. As chaves são passadas entre nós por um meio seguro, nunca pelo repositório.

Nomes combinados (podem ser ajustados):

- `VITE_SUPABASE_URL`: endereço do projeto no Supabase
- `VITE_SUPABASE_KEY`: chave pública do projeto

Um arquivo `.env.example`, só com os nomes e sem os valores, pode ser enviado ao GitHub para servir de modelo.

## Como trabalhamos em dupla

- A branch `main` sempre tem a versão que funciona. Ninguém programa direto nela.
- Cada tarefa fica em uma branch própria, com nome claro (`login`, `pesagem`...).
- O trabalho entra na `main` por Pull Request, revisado pelo outro.
- Antes de começar uma tarefa: `git switch main` e `git pull`.
- Dividimos o trabalho por módulo para não mexer nos mesmos arquivos.

## Etapas do projeto

- [ ] Etapa 0: preparar o ambiente
- [ ] Etapa 1: banco de dados (SQL)
- [ ] Etapa 2: telas e navegação
- [ ] Etapa 3: login
- [ ] Etapa 4: lotes
- [ ] Etapa 5: primeiro backup (Python)
- [ ] Etapa 6: pesagem
- [ ] Etapa 7: mortalidade e ração
- [ ] Etapa 8: vacinas e financeiro básico
- [ ] Etapa 9: tela inicial
- [ ] Etapa 10: ovos, clientes e vendas
- [ ] Etapa 11: avisos e relatórios
- [ ] Etapa 12: publicação e testes reais

## Segurança, em resumo

- Nunca enviar ao GitHub: `.env`, chaves secretas, backups do banco e dados reais do cliente.
- A chave `service_role` do Supabase nunca é usada no front-end.
- Toda tabela nova nasce com RLS ativado e com políticas de acesso.
