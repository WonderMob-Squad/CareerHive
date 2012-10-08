console.log('RUNNING Results JAVASCRIPT');

$('#results').bind('pageshow', function() {
    			$('#companylist').children().remove('li');
    			var data = localStorage.getItem('companies');
    			//alert(data);
    			data = JSON.parse(data);
    			
    			var elements = data.length;
    			
    			for (var i = 0; i < elements; i ++) {
    				if(data[i].name != null) {
    					//alert(data[i].name);
    					$('#companylist').append("<li id=\"" + i + "\"><a href=\"#companyinfo\"><h3>" + data[i].name + "</h3><p>Location</p></li>");
    				}
    			}
    			$('#companylist').listview("refresh");
    			
 
});

$('#companyinfo').bind('pageshow', function() {
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
	data = JSON.parse(data);
	data = data[eventID];
	data = JSON.stringify(data);
	//alert(data);
	localStorage.setItem('info', data);
	//var companyData = data[eventID].name;
	
	//alert(companyData);

});  

function starClicked() {
	//alert("Clicked!");
	
	$.ajax({
		url: api/favorites,
		dataType: "json",
		data: {
			user_id:1
		},
		success: (function() {
		
		})
}