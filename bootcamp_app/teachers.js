const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

pool
  .query(
    `
SELECT distinct cohorts.name as cohort, teachers.name as teacher
FROM teachers
	JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
	JOIN students ON assistance_requests.student_id = students.id
	JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
ORDER BY teachers.name;
`
  )
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  })
  .catch(err => console.error("query error", err.stack));
