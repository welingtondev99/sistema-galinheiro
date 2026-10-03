# scripts

Scripts em Python que rodam por conta própria, em horários marcados, sem passar pelas telas.

## O que vai aqui

| Pasta ou arquivo | Para quê |
|---|---|
| `backup/` | Exporta os dados do Supabase e guarda a cópia fora dele |
| `manter_ativo/` | Acessa o banco de tempos em tempos, para o projeto gratuito não ser pausado por inatividade |
| `alertas/` | Confere ração, vacinas e postura e envia o aviso |
| `requirements.txt` | Lista das bibliotecas usadas |

## Preparar o ambiente (uma vez por pessoa)

No terminal, dentro da pasta `scripts`:

```
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

O segundo comando é o do PowerShell, no Windows. A pasta `venv` é recriada em cada computador e não vai para o GitHub.

## Regras

- **Segredos ficam no `.env`**, nunca escritos no código.
- **Backups vão para a pasta `backups/`** (ela está no `.gitignore`) e também para uma cópia fora do computador, como um serviço de nuvem. Backup guardado só no mesmo lugar do banco não protege.
- **Testar a restauração** do backup em um projeto de teste, pelo menos uma vez.
- **Registrar o resultado de cada execução** (deu certo ou deu erro) e avisar quando um backup falhar. Um backup que falha em silêncio é pior do que não ter.
- Cada script faz uma coisa só.
- Dados reais do cliente nunca entram no repositório.

## Andamento

- [ ] Script de backup
- [ ] Teste de restauração
- [ ] Script para manter o projeto ativo
- [ ] Agendamento dos scripts
- [ ] Alertas (ração, vacinas, postura)
