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
		chat_extended_title	:'Click to retract.',
		chat_retracted_title:'Click to extend.',
		anchor_schema_map 	: {
			chat : {
				open	:true,
				closed 	:true
			}
		}
	};
	var stateMap = {
		$container 			: null,
		anchor_map 			: {},
		is_chat_retracted	: true
	};
	var jqueryMap = {};

	var copyAnchorMap, setJqueryMap, toggleChat, 
		changeAnchorPart, onHashchange, onClickChat, 
		initModule;
//------------------------------End module scope variables------------------------

//------------------------------Begin utility methods------------------------
//Returns copy of stored anchor map; minimizes overhead
	copyAnchorMap = function () {
		// console.log('copyAnchorMap');
		return $.extend(true, {}, stateMap.anchor_map);
	};
//------------------------------End utility methods------------------------

//------------------------------Begin dom methods------------------------

	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = { 
			$container	: $container,
			$chat		: $container.find('.spa-shell-chat')
		};
		// alert($container.find('.spa-shell-chat').height());
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
						jqueryMap.$chat.attr(
							'title', configMap.chat_extended_title
						);
						stateMap.is_chat_retracted = false;
						if (callback) {
							callback(jqueryMap.$chat);
						}
					}
				);
// alert('after extend');
				return true;
			}
			//End extend chat slider
// alert('do_retract');
			//Begin retract chat slider
			jqueryMap.$chat.animate(
				{ height : configMap.chat_retract_height},
				configMap.chat_retract_time,
				function() {
					jqueryMap.$chat.attr(
						'title', configMap.chat_retracted_title
					);
					stateMap.is_chat_retracted = true;
					if (callback) {
						callback(jqueryMap.$chat);
					}
				}
			);
			return true;
			//end retract chat slider
	};

	changeAnchorPart = function (arg_map) {
		console.log('changeAnchorPart');
// alert('changeAnchorPart');
		var anchor_map_revise = copyAnchorMap();
		var bool_return = true;
		var key_name, key_name_dep;
console.log('after copyAnchorMap');
// alert('after copyAnchorMap');
		//Begin merge change into anchor map
		KEYVAL:
		for (key_name in arg_map) {
// alert(key_name);
			if (arg_map.hasOwnProperty(key_name)) {
// alert('own ' + key_name);
				//skip dependent keys during iteration
				if (key_name.indexOf('_') === 0) {
					continue KEYVAL;
				}

				//update independent key value
// alert('anchor_map_revise[' + key_name + ']:' + anchor_map_revise[key_name] + '\narg_map[' + key_name + ']:' + arg_map[key_name]);
				anchor_map_revise[key_name] = arg_map[key_name];
// alert('anchor_map_revise[' + key_name + ']:' + anchor_map_revise[key_name]);
				//update matching dependent key
				key_name_dep = '_' + key_name;
				if (arg_map[key_name_dep]) {
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				} else {
					delete anchor_map_revise[key_name_dep];
					delete anchor_map_revise['_s' + key_name_dep];
				}
			}
		}
// alert('after loop:anchor_map_revise[chat]:' + anchor_map_revise.chat);
		//End merge changes into anchor map

		//Begin attempt to update URI ; revert if not successful
		try {
			$.uriAnchor.setAnchor(anchor_map_revise);
			
		} catch (error) {
			alert('error:' + error);
			//replace URI with existing state
			$.uriAnchor.setAnchor(stateMap.anchor_Map, null, true);
			bool_return = false;
		}
		//End attempt to update URI...
		return bool_return;
	};
	//
//------------------------------End dom methods------------------------

//------------------------------Begin event handlers------------------------
	onHashchange = function (event) {
		// alert('here');
		var anchor_map_previous = copyAnchorMap(),
			anchor_map_proposed,
			_s_chat_previous, _s_chat_proposed,
			s_chat_proposed;

			// attempt to parse anchor
			try {
				anchor_map_proposed = $.uriAnchor.makeAnchorMap();
			} catch (error) {
				console.log('error');
				$.uriAnchor.setAnchor(anchor_map_previous, null, true);
				return false;
			}
			stateMap.anchor_map = anchor_map_proposed;
			// convenience vars
	// console.log('anchor_map_previous' + anchor_map_previous);
			_s_chat_previous = anchor_map_previous._s_chat;
			_s_chat_proposed = anchor_map_proposed._s_chat;
//alert('here2');
			//Begin adjust chat component if changed
	// console.log('caonima');
	// console.log('anchor_map_previous:' + anchor_map_previous);
	// console.log('_s_chat_previous:' + _s_chat_previous);
	// console.log('_s_chat_proposed:' + _s_chat_proposed);
			if (!anchor_map_previous || _s_chat_previous !== _s_chat_proposed) {
	// alert('if');
				s_chat_proposed = anchor_map_proposed.chat;
				switch (s_chat_proposed) {
					case 'open' :
	// alert('open');
						toggleChat(true);
					break;
				
					case 'closed' :
	// alert('closed');
						toggleChat(false);
					break;
					default :
	// alert('default');
						toggleChat(false);
						delete anchor_map_proposed.chat;
						$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
				}
			}
			return false;
	};
	//End event handler /onHashchange/

	//Begin event handler /onClickChat/

	onClickChat = function (event) {
// alert(stateMap.is_chat_retracted);
console.log('click');
// if (stateMap.is_chat_retracted) {
// 	alert('open');
// } else {
// 	alert('close');
// }
		changeAnchorPart(
			{
				chat : (stateMap.is_chat_retracted ? 'open' : 'closed')
			}
		);
console.log('after changeAnchorPart');
		return false;
	}
//------------------------------End event handlers------------------------

//------------------------------Begin public methods------------------------
	initModule = function ($container) {
		//configure uriAnchor to use our schema 
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();
		stateMap.is_chat_retracted = true;

		jqueryMap.$chat
		.attr('title', configMap.chat_retracted_title)
		.click(onClickChat);

		$.uriAnchor.configModule(
			{
				schema_map : configMap.anchor_schema_map
			}
		);

		spa.chat.configModule({});
		spa.chat.initModule(jqueryMap.$chat);

		$(window)
			.bind('hashchange', onHashchange)
			.trigger('hashchange');
	};
	return {
		initModule : initModule
	};
	//---------------------------End public methods------------------------
}());
