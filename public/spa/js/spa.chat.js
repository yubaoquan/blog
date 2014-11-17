/*
* spa.chat.js
* Chat feature model for SPA
*
*/

/*jslint
	browser : true, continue : true,
	devel : true, indent : 2, maxerr : 50,
	newcap : true, nomen : true, plusplus : true,
	regexp : true, sloppy : true, vars : true,
	white : true
*/
/*global $, spa*/
spa.chat = (function () {
//------------------Begin model scope variables-------------------------
var 
	configMap = {
		main_html : String() 
		+ '<div style="padding:1em; color:#fff;">'
		+ 'Say hello to chat'
		+ '</div>',
		settable_map : {}
	},
	stateMap = {$container : null},
	jqueryMap = {},

	setJqueryMap, configModule, initModule;

	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = {$container : $container}
	};

	configModule = function (input_map) {
		spa.util.setConfigMap({
			input_map		: input_map,
			settable_map 	: configModule.settable_map,
			config_map 		: configMap
		});
		return true;
	};

	initModule = function ($container) {
		$container.html(configMap.main_html);
		stateMap.$container = $container;
		setJqueryMap();
		return true;
	};

	return {
		configModule 	: configModule,
		initModule 		: initModule
	};
}());