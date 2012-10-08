<?php
	include 'db_helper.php';
	
	function listFavorites($user_id) {
		$dbQuery = sprintf("select fav.*, att.booth, att.start_date, att.end_date, c.id as company_id, c.name as name from favorites fav inner join attendants att on fav.`attendant_id`=att.`id` inner join companies c on c.`id`=att.`company_id` where fav.`user_id`=%s",mysql_real_escape_string($user_id));
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
    
	
	function getFavorite($id) {
		$dbQuery = sprintf("SELECT * FROM favorites WHERE id = %s",
			mysql_real_escape_string($id));
		$result=getDBResultRecord($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	function addFavorite($attendant_id, $user_id) {
		$dbQuery = sprintf("INSERT INTO favorites (attendant_id,user_id) VALUES (%s, %s)",
			mysql_real_escape_string($attendant_id),
			mysql_real_escape_string($user_id));
		$result = getDBResultInserted($dbQuery,'favoriteId');
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	function updateFavorite($id,$favoriteText) {
		$dbQuery = sprintf("UPDATE favorites SET notes = '%s' WHERE id = %s",
			mysql_real_escape_string($favoriteText),
			mysql_real_escape_string($id));
		
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	function deleteFavorite($id) {
		$dbQuery = sprintf("DELETE FROM favorites WHERE id = %s",
			mysql_real_escape_string($id));												
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
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
									attendants.end_date
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

?>
