console.log('RUNNING FAVORITE JAVASCRIPT');
console.log($('#list_favorites_page'));
console.log($('#edit_favorites_page'));

$(function() {
 // Handler for .ready() called.
	console.log('favorites widget loading...');

	//Bind to the create so the page gets updated with the listing
	$('#landing_page').bind('pagebeforeshow',function(event, ui){
		console.log('landing_page: pagebeforeshow');
		
		//Remove the old rows
		$( ".landing_list_row" ).remove();
		
		var menus = [
      { name: "Search",linkto: "#search_companies_page" },
      { name: "Favorites", linkto: "#list_favorites_page" }
     	];
		
		$( "#landing_list_row_template" ).tmpl( menus ).appendTo( "#landing_list" );
		$('#landing_list').listview('refresh');
	});
	/////////////////////////////////////////////////////////////////
	//Bind to the create so the page gets updated with the listing
	$('#search_companies_page').bind('pagebeforeshow',function(event, ui){
		console.log('search_companies_page: pagebeforeshow');
		
	});

///////////////////////////////////////////////////////////////////////////


	$('#results').bind('pagebeforeshow', function(event,ui) {
		    console.log('results: pagebeforeshow');			
		    $('#companylist').children().remove('li');
		    var data = localStorage.getItem('companies');
			 //alert(data);
			 data = JSON.parse(data);
			 var elements = data.length;
			 for (var i = 0; i < elements; i ++) {
			     if(data[i].name != null) {
				     //alert(data[i].name);
					  $('#companylist').append('<li id="' + i + '"><a href="#companyinfo"><h3>' + data[i].name + '</h3><p>Location</p></li>');
				  }
		    }
		    $('#companylist').listview("refresh");
	});

	$('#companyinfo').bind('pagebeforeshow', function(event,ui) {
			var data = localStorage.getItem('info');
			data = JSON.parse(data);
			//alert(data);
			//alert(data.name);
			//
			$('#littlename').text(data.name);
			$('#majors').text(data.Majors);
			$('#location').text(data.Booth);
			$('#position').text(data.Job_Types);
			$('#citizenship').text(data.Work_Auth);
			$('#degree').text(data.Degree_Levels);
	});


	$('#companylist').delegate('li', 'vclick', function() {
		var eventID = this.id;
		//alert(this.id);
		//alert(eventID);
		
		var data = localStorage.getItem('companies');
		console.log(data);
		data = JSON.parse(data);
		data = data[eventID];
		data = JSON.stringify(data);
		//alert(data);
		localStorage.setItem('info', data);
		//var companyData = data[eventID].name;
		
		//alert(companyData);
	
	}); 
	
	
	//////////////////////////////////////////////////////////////////
	//Bind to the create so the page gets updated with the listing
	$('#list_favorites_page').bind('pagebeforeshow',function(event, ui){
		console.log('list_favorites_page: pagebeforeshow');
	
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
				console.log("api/favorites:", data);
	        	//Create The New Rows From Template
	        	$( "#favorites_list_row_template" ).tmpl( data ).appendTo( "#favorites_list" );
				$('#favorites_list').listview('refresh');
	        },
	        error: ajaxError
		});
		
	
	});
	
			
	//Bind the edit page init text
	$('#edit_favorites_page').bind('pagebeforeshow', function() {
		console.log("Edit Favorite Page");
		var favorite_id = $.url().fparam("favorite_id");
		
		//Instead of passing around in JS I am doing AJAX so direct links work
		//JQuery Fetch The Favorite
		$.ajax({
			url: "api/favorites/"+favorite_id,
			dataType: "json",
	        success: function(favorite, textStatus, jqXHR) {
				console.log(favorite);
	       		$('#edit_favorite_text').val(favorite.notes);
	        },
	        error: ajaxError
		});
	});
	
	//Bind the edit page save button
	$('#save_button').bind('click', function() {
		console.log("Save Button");
		var favorite_id = $.url().fparam("favorite_id");
		$.ajax({
			url: "api/favorites/"+favorite_id,
			dataType: "json",
			data: {'favoriteText': $('#edit_favorite_text').val()},
			headers: {'X-HTTP-Method-Override': 'PUT'},
			type: 'POST',
	        error: ajaxError
		});
	});
	
	//Bind the edit page remove button
	$('#remove_button').bind('click', function() {
		console.log("Remove Button");
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
	console.log('page load: done.');
});

	//bind the star button
	$('#star_button').bind('click', function() {
		console.log("Star Button");
		var attendant = localStorage.getItem('info');
		attendant = JSON.parse(attendant);

		$.ajax({
			url: "api/favorites/",
			dataType: "json",
			data: {attendant_id: attendant.Attendant_Id, user_id:1},
			type: 'POST',
			success: function(favorite) {
				$.mobile.changePage($("#list_favorites_page"));
			},
	      error: ajaxError
		});
		return false;
	});

/******************************************************************************/

function queryResult(){
	$.ajax({type: "GET",
           url: "api/simple/",
           data: {
			   'major': encodeURIComponent($('#major').val()),
			   'degree_level': encodeURIComponent($('#degree_level').val()),
			   'job_type': encodeURIComponent($('#job_type').val()),
			   'work_auth': encodeURIComponent($('#work_auth').val())
			   },
           dataType: "json",
           success: function(data) {
             console.log(data);
				 localStorage.setItem('companies', JSON.stringify(data));
				 //alert(data);
				 // console.log(data);
				 // alert(data.length);
				 
				 //Now, close the blocking popup:
				 //$.mobile.sdCurrentDialog.close();
				 	
				 //Finally, force the navigation to the desired page:
				 $.mobile.changePage($("#results"));
           }
   });
}

$(document).bind('mobileinit',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});

/******************************************************************************/
function ajaxError(jqXHR, textStatus, errorThrown){
	console.log('ajaxError '+textStatus+' '+errorThrown);
	$('#error_message').remove();
	$("#error_message_template").tmpl( {errorName: textStatus, errorDescription: errorThrown} ).appendTo( "#error_dialog_content" );
	$.mobile.changePage($('#error_dialog'), {
		transition: "pop",
		reverse: false,
		changeHash: false
	});
}