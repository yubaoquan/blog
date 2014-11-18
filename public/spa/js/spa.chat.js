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
/*global $, spa, getComputedStyle*/
spa.chat = (function () {
//------------------Begin model scope variables-------------------------
var 
	configMap = {
		main_html : String() 
		+ '<div class="spa-chat">'
			+ '<div class="spa-chat-head">'
				+ '<div class="spa-chat-head-toggle">+</div>'
				+ '<div class="spa-chat-head-title"'
					+ 'Chat'
				+ '</div>'
			+ '</div>'
			+ '<div class="spa-chat-closer">x</div>'
			+ '<div class="spa-chat-sizer">'
				+ '<div class="spa-chat-msgs"></div>'
				+ '<div class="spa-chat-box">'
					+ '<input type="text"/>'
					+ '<div>send</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>',


		// + '<div style="padding:1em; color:#fff;">'
		// + 'Say hello to chat'
		// + '</div>',
		settable_map : {
			slider_open_time : 	true,
			slider_close_time : true,
			slider_opened_em : 	true,
			slider_closed_em : 	true,
			slider_opened_title : true,
			slider_closed_title : true,

			chat_model : 		true,
			people_model : 		true,
			set_chat_anchor : 	true
		},

		slider_open_time : 	250,
		slider_close_time : 250;
		slider_opened_em : 	16,
		slider_closed_em : 	2,
		slider_opened_title : 'Click to close',
		slider_closed_title : 'Click to open',

		chat_model : 		null;
		people_model : 		null;
		set_chat_anchor : 	null;
	},

	stateMap = {
		// $container : null
		$append_target : 	null,
		position_type : 	'closed',
		px_per_em : 		0,
		slider_hidden_px : 	0,
		slider_closed_px : 	0,
		slider_opened_px : 	0
	},

	jqueryMap = {},

	setJqueryMap, getEmSize, setPxSizes, setSliderPosition,
	onClickToggle, configModule, initModule;
//---------------------End module scope variables------------------------------
//---------------------Begin utility methods-----------------------------------
	getEmSize = function (elem) {
		return Number (
			getComputedStyle(elem, '').fontSize.math(/\d*\.?\d*/)[0];
		);
	};
//---------------------End utility methods-------------------------------------
//---------------------Begin DOM methods---------------------------------------
	setJqueryMap = function () {
		// var $container = stateMap.$container;
		var 
			$append_target = stateMap.$append_target,
			$slider = $append_target.find('.spa-chat');
		jqueryMap = {
			// $container : $container
			$slider : $slider,
			$head : $slider.find('.spa-chat-head'),
			$toggle : $slider.find('.spa-chat-head-toggle'),
			$title : $slider.find('.spa-chat-head-title'),
			$sizer : $slider.find('.spa-chat-sizer'),
			$msgs : $slider.find('.spa-chat-msgs'),
			$box : $slider.find('.spa-chat-box'),
			$input : $slider.find('.spa-chatpinput input[type=text]')
		};
	};

	setPxSizes = function () {
		var px_per_em, opened_height_em;
		px_per_em = getEmSize(jqueryMap.$slider.get(0));
		opened_height_em = configMap.slider_open_em;

		stateMap.px_per_em = px_per_em;
		stateMap.slider_closed_px = configMap.slider_closed_em * px_per_em;
		stateMap.slider_opened_px = opened_height_em * px_per_em;
		jqueryMap.$slider.css(
			{
				height: (opened_height_em - 2) * px_per_em
			}
		);
	};
//=======================进行到这里,后续:setSliderPosition================================P117
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