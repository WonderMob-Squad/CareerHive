<?php
	include 'db_helper.php';

	function getCompanies($major, $degree_level, $job_type, $work_auth) {
		
		$major = mysql_real_escape_string(urldecode($major));
		$degree_level = mysql_real_escape_string(urldecode($degree_level));
		$job_type = mysql_real_escape_string(urldecode($job_type));
		$work_auth = mysql_real_escape_string(urldecode($work_auth));
		
		//$dbQuery = sprintf("select name from companies", mysql_real_escape_string($major));
		$dbQuery = "SELECT DISTINCT companies.name, 
									work_authorization_types.name AS Work_Auth,
									job_types.name AS Job_Types,
									majors.name AS Majors,
									degree_levels.name AS Degree_Levels,
									attendants.booth AS Booth,
									attendants.start_date,
									attendants.end_date,
									attendants.id AS Attendant_Id
					FROM companies, attendants_majors, majors, degree_levels, attendants_degree_levels, job_types, attendants_job_types, work_authorization_types, attendants_work_auth_levels, attendants
					WHERE companies.id = attendants_majors.attendant_id
					AND companies.id = attendants.company_id
					AND attendants_majors.major_id = majors.id
					AND companies.id = attendants_job_types.attendant_id
					AND attendants_job_types.job_type_id = job_types.id
					AND companies.id = attendants_degree_levels.attendant_id
					AND attendants_degree_levels.degree_levels_id = degree_levels.id
					AND companies.id = attendants_work_auth_levels.attendant_id
					AND attendants_work_auth_levels.work_auth_id = work_authorization_types.id
					AND majors.name = '$major'
					AND degree_levels.name = '$degree_level'
					AND job_types.name = '$job_type'
					AND work_authorization_types.name = '$work_auth'";

		$result=getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		//$result=''+$major+' '+$degree_level+' '+$job_type+' '+$work_auth;
		echo json_encode($result);
	}
	
/*
	function getMajor() {
		$dbQuery = sprintf("select name from majors");
		$result=getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
    
	
	function getWorkAuthType() {
		$dbQuery = sprintf("select name from work_authorization_types");
		$result=getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}

	function getJobType() {
		$dbQuery = sprintf("select name from job_types");
		$result=getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}

	function getDegreeLevels() {
		$dbQuery = sprintf("select name from degree_levels");
		$result=getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	*/
	?>
