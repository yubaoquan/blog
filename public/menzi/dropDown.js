(function (a) {
  a.fn.webwidget_menu_dropdown = function () {
    var o = a(this);
    var wholeMenu = o.children('ul');
    var parentItems = wholeMenu.children("li");

    if (wholeMenu.length === 0 || parentItems.length === 0) {
      o.append("Require menu content");
      return null;
    }

    parentItems.hover(
      function () {
        $(this).children("ul").slideDown("fast");
      },
      function () {
        $(this).children("ul").slideUp("fast");
      }
    );
  };
}(jQuery));

$(function () {
  $("#webwidget_menu_dropdown").webwidget_menu_dropdown();
});