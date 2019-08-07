select html_css_competencies.id, student_id, passed, notes, html_css_competencies.competency_name from html_css_status
join html_css_competencies on(html_css_competencies.id = html_css_status.comp_id)
JOIN students on (students.id = html_css_status.student_id)
WHERE students.id = $1
order by id;