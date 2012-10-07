console.log('RUNNING Results JAVASCRIPT');

$('#results').bind('pageshow', function() {
    			
    			var data = localStorage.getItem('companies');
    			data = JSON.parse(data);
    			
    			var elements = data.length;
    			
    			for (var i = 0; i < elements; i ++) {
    				if(data[i].name != null) {
    					//alert(data[i].name);
    					$('#companylist').append("<li><a id=\"company" + i + "\" href=\"companyinfo.html\"><h3>" + data[i].name + "</h3><p>Location</p></li>");
    				}
    			}
    			$('#companylist').listview("refresh");
    			
 
});