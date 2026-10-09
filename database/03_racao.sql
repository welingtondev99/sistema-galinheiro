create table racao_movimentos(
    id uuid primary key default gen_random_uuid(),
    lote_id uuid references lotes(id) on delete set null,
    tipo text not null check (tipo in ('entrada', 'saida')),
    data_movimento date not null,
    quantidade_kg numeric(10,2) not null check (quantidade_kg > 0),
    valor_total numeric(10,2) check (valor_total >= 0),
    observacao text,
    criado_em timestamptz not null default now()
)