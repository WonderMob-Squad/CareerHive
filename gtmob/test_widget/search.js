function queryResult(){
/*	$.ajax({
		url: "/developer/wondermob/api/test_widget/simple/",
		context: document.body,
		success: function(data){
			$('#major').html(data);
		}
	});*/

 /*	$('<div>').simpledialog2({
    	mode: 'blank',
    	headerText: 'Loading...',
    	headerClose: false,
    	blankContent:"<div style='text-align:center'><br>Please wait...<br><br></div><img style='display:block;margin-left:auto;margin-right:auto' src='../gtmob/results_widget/images/spinner.gif' /><br>"
  });
*/
	
	
	$.ajax({
               type: "GET",
               url: "/developer/wondermob/api/test_widget/simple/",
               data: {
			   'major': encodeURIComponent($('#major').val()),
			   'degree_level': encodeURIComponent($('#degree_level').val()),
			   'job_type': encodeURIComponent($('#job_type').val()),
			   'work_auth': encodeURIComponent($('#work_auth').val())
			   },
               dataType: "json",
               success: function(data) {
               console.log(data);
				 localStorage.setItem('companies', data);
				 alert(data);
				 
				 //Now, close the blocking popup:
				 //$.mobile.sdCurrentDialog.close();
				 	
				 //Finally, force the navigation to the desired page:
				// $.mobile.changePage(<insert path here>);
           		}
           	});
}

$(document).bind('mobileinit',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});

