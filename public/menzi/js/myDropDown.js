(function (a) {
  a.fn.my_dropdown = function () {
    var o = a(this);
    var wholeMenu = o.children('div').children('ul');
    // console.info(wholeMenu.html());
    var parentItems = wholeMenu.children("li");

    // if (wholeMenu.length === 0 || parentItems.length === 0) {
    //   console.info("Require menu content");
    //   return null;
    // }

    o.click(

      function () {
        console.info('slideDown');
        parentItems.slideDown("fast");
       }//,
      // function () {
      //   console.info('slideDown');
      //   parentItems.slideUp("fast");
      // }
    );

    $(document).click(function(event){
    alert($(event.target));
});

    o.blur(
      function () {
        console.info('blur');
      }
    );
    wholeMenu.click(
      function () {
        console.log('click');
      }
      
    );
  }
}(jQuery));

$(function () {
  $("#myDropDown").my_dropdown();
  // console.info('here');
});