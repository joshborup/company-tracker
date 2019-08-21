update companies
set notes = notes::jsonb || $1
where id = $2;
select *
from companies
where id = $2;