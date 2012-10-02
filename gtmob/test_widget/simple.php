<?php
	include 'db_helper.php';
	

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
	
	?>
