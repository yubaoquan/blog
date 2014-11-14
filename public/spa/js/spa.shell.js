/*
* spa.shell.js
* Shell module for SPA
*/
/*jslint
	browser : true, continue : true,
	devel : true, indent : 2, maxerr : 50,
	newcap : true, nomen : true, plusplus : true,
	regexp : true, sloppy : true, vars : true,
	white : true
*/
/*global $, spa*/

spa.shell = (function () {
	//------------------------------begin module scope variables------------------------
	var configMap = {
		main_html : String() 
		+'<div class="spa-shell-head">'
		+'<div class="spa-shell-head-logo"></div>'
		+'<div class="spa-shell-head-acct"></div>'
		+'<div class="spa-shell-head-search"></div>'
		+'</div>'
		+'<div class="spa-shell-main">'
		+'<div class="spa-shell-main-nav"></div>'
		+'<div class="spa-shell-main-content"></div>'
		+'</div>'
		+'<div class="spa-shell-foot"></div>'
		+'<div class="spa-shell-chat"></div>'
		+'<div class="spa-shell-modal"></div>',

		chat_extend_time	:300,
		chat_retract_time	:300,
		chat_extend_height	:450,
		chat_retract_height	:15,
	};
	var stateMap = {$container : null};
	var jqueryMap = {};
	var setJqueryMap, toggleChat, initModule;
//------------------------------end module scope variables------------------------

//------------------------------begin utility methods------------------------
//------------------------------end utility methods------------------------

//------------------------------begin dom methods------------------------

	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = { 
			$container	: $container,
			$chat		: $container.find('.spa-shell-chat')
		};
	};

	toggleChat = function ( do_extend, callback ) {
// alert('toggleChat');
		var
			px_chat_ht 	= jqueryMap.$chat.height(),

			is_open		= px_chat_ht === configMap.chat_extend_height,
			is_closed	= px_chat_ht === configMap.chat_retract_height,
			is_sliding	= ! is_open && ! is_closed;
// alert('px_chat_ht:' + px_chat_ht);
			//avoid race condition
			if (is_sliding) {
// alert('false');
				return false;
			}
// alert('here 2');
			//begin extend chat slider
			if (do_extend) {
// alert('do_extend height:' + configMap.chat_extend_height + ' time:' + configMap.chat_extend_time);
// alert(jqueryMap.$chat.animate);
				jqueryMap.$chat.animate(
					{ height : configMap.chat_extend_height },
					configMap.chat_extend_time,
					function () {
						alert('callback');
						if (callback) {
							callback(jqueryMap.$chat);
						}
					}
				);
// alert('after extend');
				return true;
			}
			//end extend chat slider
// alert('do_retract');
			jqueryMap.$chat.animate(
				{ height : configMap.chat_retract_height},
				configMap.chat_retract_time,
				function() {
					alert('callback');
					if (callback) {
						callback(jqueryMap.$chat);
					}
				}
			);
			return true;
			//end retract chat slider
	};
//------------------------------end dom methods------------------------

//------------------------------begin event handlers------------------------
//------------------------------end event handlers------------------------

//------------------------------begin public methods------------------------
	initModule = function ($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();
// alert('settime');
		setTimeout(function () {toggleChat(true);}, 3000);
		setTimeout(function () {toggleChat(false);}, 8000);
	};
	return {
		initModule : initModule
	};
	//------------------------------end public methods------------------------
}());
