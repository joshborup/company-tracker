SELECT competencies.id, student_id, passed, notes, competency_name, name, cohort, email FROM status
JOIN competencies on(competencies.id = status.comp_id)
JOIN students on (students.id = status.student_id)
WHERE student_id = $1
order by id;