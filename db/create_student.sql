INSERT INTO students (name, cohort, email, active) VALUES (${name},${cohort},${email}, true);
SELECT * FROM students
WHERE name = ${name} AND cohort = ${cohort} AND email = ${email};