select absent, tardy, left_early, reason, TO_CHAR(calender_day :: DATE, 'Mon dd, yyyy') from attendance
where student_id = $1
group by calender_day, absent, tardy, left_early, reason;