select id, email, name, cohort, active  from students
order by NULLIF(regexp_replace(cohort, '\D', '', 'g'), '')::int