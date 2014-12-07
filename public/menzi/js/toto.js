//==============================创建2TO角色==================================
var toto = (function () {
  //2TO的台词;
  var hehedaImgFilePath = "../images/heheda.png";
  var totoWords = [
    "呵呵哒" + "<img id=\"a\" src=\" " + hehedaImgFilePath + "\"/>",
    '哦',
    '哦呵呵'
  ];

  say = function (whatUSay) {
    return getASentence(totoWords);
  };

  return {
    name : '2TO',
    desc : '呵呵党,生性凉薄,行尸走肉',
    hello : '→_→你们真的是够了好么',
    say : say
  };
}());