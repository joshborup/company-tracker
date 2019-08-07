SELECT assessments.id, student_id, passed, notes, assessment_name, name, email FROM assessments_status
JOIN assessments on(assessments.id = assessments_status.assess_id)
JOIN students on (students.id = assessments_status.student_id)
WHERE students.id = $1
order by id;


