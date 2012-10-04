//console.log('RUNNING FAVORITE JAVASCRIPT');
//console.log($('#list_favorites_page'));
//console.log($('#add_favorites_page'));
//console.log($('#edit_favorites_page'));

$(function() {
 // Handler for .ready() called.
	//console.log('ready');

	//Bind to the create so the page gets updated with the listing
	$('#list_favorites_page').bind('pagebeforeshow',function(event, ui){
		//console.log('pagebeforeshow');
	
		//Remove the old rows
		$( ".favorites_list_row" ).remove();
		
		//JQuery Fetch The New Ones
		$.ajax({
			url: "api/favorites",
			dataType: "json",
			data: {
				user_id:1
			},
	      success: function(data, textStatus, jqXHR) {
				//console.log(data);
	        	//Create The New Rows From Template
	        	$( "#favorites_list_row_template" ).tmpl( data ).appendTo( "#favorites_list" );
				$('#favorites_list').listview('refresh');
	        },
	        error: ajaxError
		});
		
	
	});
	
	//Bind the add page clear text
	$('#add_favorites_page').bind('pagebeforeshow', function() {
		//console.log("Add Favorite Page");
		$('#add_favorite_text')[0].value = "";
	});
		
	//Bind the add page button
	$('#add_button').bind('click', function() {
		//console.log("Add Button");
		$.ajax({
			url: "api/favorite",
			dataType: "json",
	        async: false,
			data: {'favoriteText': $('#add_favorite_text')[0].value},
			type: 'POST',
	        error: ajaxError
		});
	});
		
	//Bind the edit page init text
	$('#edit_favorites_page').bind('pagebeforeshow', function() {
		//console.log("Edit Favorite Page");
		var favorite_id = $.url().fparam("favorite_id");
		
		//Instead of passing around in JS I am doing AJAX so direct links work
		//JQuery Fetch The Favorite
		$.ajax({
			url: "api/favorites/"+favorite_id,
			dataType: "json",
	        success: function(favorite, textStatus, jqXHR) {
				//console.log(favorite);
	       		$('#edit_favorite_text')[0].value = favorite.notes;
	        },
	        error: ajaxError
		});
	});
	
	//Bind the edit page save button
	$('#save_button').bind('click', function() {
		//console.log("Save Button");
		var favorite_id = $.url().fparam("favorite_id");
		$.ajax({
			url: "api/favorites/"+favorite_id,
			dataType: "json",
			data: {'favoriteText': $('#edit_favorite_text')[0].value},
			headers: {'X-HTTP-Method-Override': 'PUT'},
			type: 'POST',
	        error: ajaxError
		});
	});
	
	//Bind the edit page remove button
	$('#remove_button').bind('click', function() {
		//console.log("Remove Button");
		var favorite_id = $.url().fparam("favorite_id");
		$.ajax({
			url: "api/favorites/"+favorite_id,
			dataType: "json",
			type: 'DELETE',
	        error: ajaxError
		});
	});
	
	//Cleanup of URL so we can have better client URL support
	$('#edit_favorites_page').bind('pagehide', function() {
		$(this).attr("data-url",$(this).attr("id"));
		delete $(this).data()['url'];
	});

});

/******************************************************************************/

function ajaxError(jqXHR, textStatus, errorThrown){
	//console.log('ajaxError '+textStatus+' '+errorThrown);
	$('#error_message').remove();
	$("#error_message_template").tmpl( {errorName: textStatus, errorDescription: errorThrown} ).appendTo( "#error_dialog_content" );
	$.mobile.changePage($('#error_dialog'), {
		transition: "pop",
		reverse: false,
		changeHash: false
	});
}