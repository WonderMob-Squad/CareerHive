function checklistClicked(id) {
  // NOTE: The selector can be whatever you like, so long as it is an HTML element.
  //       If you prefer, it can be a member of the current page, or an anonymous div
  //       like shown.
  $('#page1').simpledialog2({
    mode: 'blank',
    headerText: 'Added!',
    headerClose: true,
    blankContent : 
      "<h5 align=\"CENTER\">This company has been added to your checklist.<h5>"+
      // NOTE: the use of rel="close" causes this button to close the dialog.
      "<a rel='close' data-role='button' href='#'>Close</a>"
  })

//insert additional actions here.	
}

function starClicked(id) {
  // NOTE: The selector can be whatever you like, so long as it is an HTML element.
  //       If you prefer, it can be a member of the current page, or an anonymous div
  //       like shown.
  $('<div>').simpledialog2({
    mode: 'blank',
    headerText: 'Favorited!',
    headerClose: true,
    blankContent : 
      "<h5 align=\"CENTER\">This company has been added to your favorites.<h5>"+
      // NOTE: the use of rel="close" causes this button to close the dialog.
      "<a rel='close' data-role='button' href='#'>Close</a>"
  })

	
//insert additional actions here.	
}

function noThanksClicked(id) {
  // NOTE: The selector can be whatever you like, so long as it is an HTML element.
  //       If you prefer, it can be a member of the current page, or an anonymous div
  //       like shown.
  $('<div>').simpledialog2({
    mode: 'blank',
    headerText: 'We heard you!',
    headerClose: true,
    blankContent : 
      "<h5 align=\"CENTER\">This company will not be shown to you for the remainder of this career fair.<h5>"+
      // NOTE: the use of rel="close" causes this button to close the dialog.
      "<a rel='close' data-role='button' href='#'>Close</a>"
  })


//insert additional actions here.	
}
