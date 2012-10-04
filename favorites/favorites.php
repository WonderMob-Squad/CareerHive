<?php
	include 'db_helper.php';
	
	function listFavorites($user_id) {
		$dbQuery = sprintf("select * from favorites fav inner join attendants att on fav.`attendant_id`=att.`id` inner join companies c on c.`id`=att.`company_id` where fav.`user_id`=%s",mysql_real_escape_string($user_id));
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
	
	function addComment($comment) {
		$dbQuery = sprintf("INSERT INTO comments (comment) VALUES ('%s')",
			mysql_real_escape_string($comment));
	
		$result = getDBResultInserted($dbQuery,'personId');
		
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
?>
