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
		+'<div class="spa-shell-modal"></div>'
	};
	var stateMap = {$container : null};
	var jqueryMap = {};
	var setJqueryMap, initModule;
//------------------------------end module scope variables------------------------

//------------------------------begin utility methods------------------------
//------------------------------end utility methods------------------------

//------------------------------begin dom methods------------------------

	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = { $container : $container };
	};

//------------------------------end dom methods------------------------

//------------------------------begin event handlers------------------------
//------------------------------end event handlers------------------------

//------------------------------begin public methods------------------------
	initModule = function ($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();
	};
	return {
		initModule : initModule
	};
	//------------------------------end public methods------------------------
}());
