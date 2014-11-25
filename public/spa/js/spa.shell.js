/*
* spa.shell.js
* Shell module for SPA
*/
/*jslint
  browser : true, continue : true,
  devel : true, indent : 2, maxerr : 50,
  newcap : true, nomen : true, plusplus : true,
  regexp : true, sloppy : true, vars : false,
  white : true
*/
/*global $, spa*/

spa.shell = (function () {
  'use strict';

  //------------------------------begin module scope variables------------------------
  var configMap = {
    main_html : String() 
    + '<div class="spa-shell-head">'
      + '<div class="spa-shell-head-logo">'
        + '<h1>SPA </h1>'
        + '<p>javascript end to end</p>'
      + '</div>'
      +'<div class="spa-shell-head-acct"></div>'
    // +'<div class="spa-shell-head-search"></div>'
    +'</div>'
    +'<div class="spa-shell-main">'
      +'<div class="spa-shell-main-nav"></div>'
      +'<div class="spa-shell-main-content"></div>'
    +'</div>'
    +'<div class="spa-shell-foot"></div>'
    +'<div class="spa-shell-modal"></div>',

    chat_extend_time  :300,
    chat_retract_time  :300,
    chat_extend_height  :450,
    chat_retract_height  :15,
    resize_interval : 200,
    chat_extended_title  :'Click to retract.',
    chat_retracted_title:'Click to extend.',
    anchor_schema_map   : {
      chat : {
        opened  :true,
        closed   :true
      }
    }
  };
  var stateMap = {
    $container : undefined,
    anchor_map   : {},
    resize_idto : undefined
  };
  var jqueryMap = {};

  var copyAnchorMap, setJqueryMap, toggleChat, 
    changeAnchorPart, onHashchange, onClickChat, 
    onTapAcct, onLogin, onLogout,
    setChatAnchor, onResize, initModule;
//------------------------------End module scope variables------------------------

//------------------------------Begin utility methods------------------------
//Returns copy of stored anchor map; minimizes overhead
  copyAnchorMap = function () {
    // console.log('copyAnchorMap');
    return $.extend(true, {}, stateMap.anchor_map);
  };
//------------------------------End utility methods------------------------
  
  onResize = function () {
    if (stateMap.resize_idto) {
      return true;
    }
    spa.chat.handleResize();
    stateMap.resize_idto = setTimeout(
      function () {
        stateMap.resize_idto = undefined;
      },
      configMap.resize_interval
    );
    return true;
  };

//------------------------------Begin dom methods------------------------

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = { 
      $container  : $container,
      $acct : $container.find('.spa-shell-head-acct'),
      $nav : $container.find('.spa-shell-main-nav')
    };
    // alert($container.find('.spa-shell-chat').height());
  };

  onTapAcct = function ( event ) {
    var acct_text, user_name, user = spa.model.people.get_user();
    if ( user.get_is_anon() ) {
      user_name = prompt( 'Please sign-in' );
      spa.model.people.login( user_name );
      jqueryMap.$acct.text('... processing ...');
    } else {
      spa.model.people.logout();
    }
    return false;
  };

  onLogin = function (event, login_user) {
    jqueryMap.$acct.text(login_user.name);
  };

  onLogout = function (event, logout_user) {
    jqueryMap.$acct.text('Please sign-in');
  };

  changeAnchorPart = function (arg_map) {
// console.log('changeAnchorPart');
// alert('changeAnchorPart');
    var anchor_map_revise = copyAnchorMap();
    var bool_return = true;
    var key_name, key_name_dep;
// console.log('after copyAnchorMap');
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
      s_chat_proposed,
      is_ok = true;

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
          case 'opened' :
// alert('opened');
            is_ok = spa.chat.setSliderPosition('opened');
          break;
        
          case 'closed' :
// alert('closed');
            is_ok = spa.chat.setSliderPosition('closed');
          break;
          default :
            spa.chat.setSliderPosition('closed');
            delete anchor_map_proposed.chat;
            $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
        }
      }
      if (!is_ok) {
        if (anchor_map_previous) {
          $.uriAnchor.setAnchor(anchor_map_previous, null, true);
          stateMap.anchor_map = anchor_map_previous;
        } else {
          delete anchor_map_proposed.chat;
          $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
        }
      }
      return false;
  };
  //End event handler /onHashchange/

  setChatAnchor = function (position_type) {
// alert(position_type);
    return changeAnchorPart({chat : position_type});
  };
  //Begin event handler /onClickChat/

  onClickChat = function (event) {
// alert(stateMap.is_chat_retracted);
console.log('click');
// if (stateMap.is_chat_retracted) {
//   alert('open');
// } else {
//   alert('close');
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

    $.uriAnchor.configModule(
      {
        schema_map : configMap.anchor_schema_map
      }
    );

    spa.chat.configModule({
      set_chat_anchor : setChatAnchor,
      chat_model : spa.model.chat,
      people_model : spa.model.people
    });
    spa.chat.initModule(jqueryMap.$container);

    $(window)
      .bind('resize', onResize)
      .bind('hashchange', onHashchange)
      .trigger('hashchange');

    $.gevent.subscribe( $container, 'spa-login', onLogin);
    $.gevent.subscribe( $container, 'spa-logout', onLogout);

    jqueryMap.$acct
      .text('Please sign-in')
      .bind('utap', onTapAcct);
  };
  return {
    initModule : initModule
  };
  //---------------------------End public methods------------------------
}());
