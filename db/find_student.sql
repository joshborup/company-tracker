select count(case when absent = 'U' then 1 end) as unexcusedAbsences, count(case when tardy = 'U' then 1 end) as unexcusedTardies, count(case when left_early = 'U' then 1 end) as unexcusedLeaves, count(case when absent = 'E' then 1 end) as excusedAbsences, count(case when tardy = 'E' then 1 end) as excusedTardies, count(case when left_early = 'E' then 1 end) as excusedLeaves, active, email, name, students.id, students.cohort
from students
    left join attendance on (student_id = students.id)
where students.email = $1
group by students.cohort, students.id
ORDER BY students.active DESC, students.name;