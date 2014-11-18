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
	setSliderPosition = function (position_type, callback) {
		var
			height_px, animate_time, slider_title, toggle_text;
		//return true if slider already in requested position
		if (stateMap.position_type === position_type) {
			return true;
		}

		//prepare animate parameters
		switch (position_type) {
			case 'opened' : 
			height_px = stateMap.slider_opened_px;
			animate_time = configModule.slider_open_time;
			slider_title = configMap.slider_opened_title;
			toggle_text = '=';
		break;

		case 'hidden' :
			height_px = 0;
			animate_time = configMap.slider_open_time;
			slider_title = '';
			toggle_text = '+';
		break;

		case 'closed' :
			height_px = stateMap.slider_closed_time;
			animate_time = configMap.slider_close_time;
			slider_title = configMap.slider_closed_title;
			toggle_text = '+';
		break;
		//bail for unknown position_type
		default : return false;
		}
		//animate slider position change
		stateMap.position_type = '';
		jqueryMap.$slider.animate(
			{
				height : height_px
			},
			animate_time,
			function () {
				jqueryMap.$toggle.prop('title', slider_title);
				jqueryMap.$toggle.text(toggle_text);
				stateMap.position_type = position_type;
				if (callback) {
					callback(jqueryMap.$slider);
				}
			}
		);
		return true;
	};

	onClickToggle = function (event) {
		var set_chat_anchor = configMap.set_chat_anchor;
		if (stateMap.position_type === 'opened') {
			set_chat_anchor('closed');
		}
		else if (stateMap.position_type === 'closed') {
			set_chat_anchor('opened');
		}
		return false;
	};

	configModule = function (input_map) {
		spa.util.setConfigMap({
			input_map		: input_map,
			settable_map 	: configModule.settable_map,
			config_map 		: configMap
		});
		return true;
	};

	initModule = function ($append_target) {
		// $container.html(configMap.main_html);
		// stateMap.$container = $container;
		$append_target.append(configMap.main_html);
		stateMap.$append_target = $append_target;

		setJqueryMap();
		setPxSizes();

		jqueryMap.$toggle.prop('title', configMap.slider_closed_title);
		jqueryMap.$head.click( onClickToggle );
		stateMap.position_type = 'closed';
		return true;
	};

	return {
		setSliderPosition : setSliderPosition,
		configModule 	: configModule,
		initModule 		: initModule
	};
}());