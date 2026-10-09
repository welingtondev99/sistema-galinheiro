create tablet ovos (
    id uuid primary key default gen_random_uuid(),
    lote_id uuid not null references lotes(id) on delete cascade,
    data_coleta date not null,
    quantidade integer not null check (quantidade >= 0),
    observacao text,
    criando_em timestamptz not null default now(),
    unique (lote_id, data_coleta)
);
