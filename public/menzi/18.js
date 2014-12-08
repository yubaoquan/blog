(function(a){
    a.fn.webwidget_menu_dropdown=function(){
        var o=a(this);
        var wholeMenu = o.children('ul');
        var parentItems = wholeMenu.children("li");

        if(wholeMenu.length==0||parentItems.length==0){
            o.append("Require menu content");
            return null
        }

        var style="background-color: #d9d0b2; margin-right: 20px; width: 120px;";
        parentItems.attr("style",style);
        parentItems.filter(".current").css("background-color",'#008748');

        var style1="background-color: #d9d0b2; width: 120px;";
        o.find("li").children("ul").attr("style",style1);

        wholeMenu.css("font-size",'13px');
        // wholeMenu.css("border-radius",'0.4em');
        parentItems.css("height",'25px');
        parentItems.children("ul").css("top",'25px');
        parentItems.children("ul").css("left","0px");

        parentItems.hover(
            function(){
                $(this).children("ul").slideDown("fast");
            },
            function(){
                $(this).children("ul").slideUp("fast");
            }
        );

        parentItems.children("ul").children("li").css("border-radius",'0.4em');
        parentItems.children("ul").children("li").hover(
            function(){
                $(this).css("background-color",'#1C232E');
                $(this).css("font-size", "2em");
                console.log('hover');
            },
            function(){
                $(this).css("font-size", "13px");
                $(this).css("background-color",'#d9d0b2');//'#63B4C9'
            }
        );
}
})(jQuery);

$(function() {
    $("#webwidget_menu_dropdown").webwidget_menu_dropdown();
});