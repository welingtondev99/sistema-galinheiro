--1) racao: quantos dias ainda dura , com base no consumo dos ultimos 7 dias
create view racao_autonomia with (security_invoker = true) as select
s.saldo_kg,
coalesce (c.consumo_medio_kg_dia, 0) as consumo_medio_kg_dia,
case
when coalesce (c.consumo_medio_kg_dia,0) > 0 
then round(s.saldo_kg / c.consumo_medio_kg_dia, 1 )
end as dias_restantes
from racao_saldo s
cross join (
    select sum(quantidade_kg) / 7.0 as consumo_medio_kg_dia
    from racao_movimentos
    where tipo = 'saida'
    and data_movimento >= current_date - 7
) c;

--2) vacinas: reforcos atrasados ou que vencem nos proximos 7 dias
create view vacinas_alerta with (security_invoker = true) as select
v.id,
i.nome as lote,
v.nome_vacina,
v.proximo_dose,
v.proxima_dose -  current_date as dias_para_vencer
from vacinas v
join insumos i on v.id_insumo = i.id
where v.proximo_dose is not null
and v.proximo_dose <= current_date + 7
order by v.proximo_dose;

-- 3) Postura: % de ovos por ave viva, por lote e por dia
create view postura_diaria with (security_invoker = true) as
select
  o.lote_id,
  l.nome as lote,
  o.data_coleta,
  o.quantidade as ovos,
  a.aves_vivas,
  round(100.0 * o.quantidade / nullif(a.aves_vivas, 0), 1) as postura_pct
from ovos o
join lotes l on l.id = o.lote_id
cross join lateral (
  select l.quantidade_inicial - coalesce(sum(m.quantidade), 0) as aves_vivas
  from mortalidade m
  where m.lote_id = o.lote_id
    and m.data_ocorrencia <= o.data_coleta
) a;
