SELECT cohorts.name as name, AVG(completed_at-started_at) as average_assitance_time
FROM assistance_requests
	JOIN students on assistance_requests.student_id = students.id
	JOIN cohorts on students.cohort_id = cohorts.id
GROUP BY cohorts.name
ORDER BY average_assitance_time DESC
LIMIT 1;