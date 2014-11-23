/*jslint
  browser : true, continue : true,
  devel : true, indent : 2, maxerr : 50,
  newcap : true, nomen : true, plusplus : true,
  regexp : true, sloppy : true, vars : true,
  white : true
*/
/*global $, spa*/

spa.util = (function () {
  var makeError, setConfigMap;

  makeError = function (name_text, msg_text, data) {
    var error = new Error();
    error.name = name_text;
    error.messaage = msg_text;
    if (date) {
      error.date = data;
    }
    return error;
  };

  setConfigMap = function (arg_map) {
    var 
      input_map = arg_map.input_map,
      settable_map = arg_map.settable_map,
      config_map = arg_map.config_map,
      key_name, error;

    for (key_name in input_map) {
      if (input_map.hasOwnProperty(key_name)) {
        if (settable_map.hasOwnProperty(key_name)) {
          config_map[key_name] = input_map[key_name];
        } else {
          error = makeError(
            'Bad Input',
            'Setting config key |' + key_name + '| is not supported'
          );
          throw error;
        }
      }
    }
  };

  return {
    makeError     : makeError,
    setConfigMap   : setConfigMap
  };
}());