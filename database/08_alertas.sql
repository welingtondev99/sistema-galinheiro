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

--2) vacinas: reforcos atrasados ou que vencem nos proximos 7 dsias
