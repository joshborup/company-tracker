-- from student tracker
-- CREATE TABLE students(
-- id SERIAL PRIMARY KEY NOT NULL
-- , name TEXT NOT NULL
-- , cohort TEXT NOT NULL
-- , email TEXT UNIQUE
-- , active BOOLEAN NOT NULL
-- );


-- currently writing to public folder -> dev and build folder -> prod
CREATE TABLE student_resumes(
    id SERIAL PRIMARY KEY NOT NULL,
    link text,
    student_id integer references students(id) not null
);

drop table companies;
CREATE TABLE companies(
    id SERIAL PRIMARY KEY NOT NULL,
    company text,
    email text unique not null,
    last_contact date not null default now(),
    name text not null,
    notes text,
    phone text,
    photo text
);