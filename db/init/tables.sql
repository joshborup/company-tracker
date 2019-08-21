-- from student tracker
-- CREATE TABLE students(
-- id SERIAL PRIMARY KEY NOT NULL
-- , name TEXT NOT NULL
-- , cohort TEXT NOT NULL
-- , email TEXT UNIQUE
-- , active BOOLEAN NOT NULL
-- );


-- currently writing to public folder -> dev and build folder -> prod
CREATE TABLE student_resumes
(
    id SERIAL PRIMARY KEY NOT NULL,
    link text,
    student_id integer references students(id) not null
);

drop table companies;
CREATE TABLE companies
(
    id SERIAL PRIMARY KEY NOT NULL,
    company text,
    email text unique not null,
    last_contact date not null default now(),
    name text not null,
    title text,
    phone text,
    photo text,
    stack text
    [],
	notes text[]
);

    insert into companies
        (company, email, name, title, notes, last_contact, phone, photo, stack)
    values
        ('INT Technologies', 'kskidmore@inttechnologies.com', 'Kyle Skidmore', 'Senior Recruiter at Int Technologies', '{Initially contacted as a reference for Jacob Bralish from wpx6\, was impressed with jacob and asked that we send more candidates his way}', '08/09/2019', '480-480-4480', 'https://media.licdn.com/dms/image/C5603AQGYpUtsa23MFw/profile-displayphoto-shrink_800_800/0?e=1571875200&v=beta&t=MiQCC0bjQZTzDmrhOgrahawgrKusPPCcFJ0xfz0UgXk', '{React, Node, Express}');