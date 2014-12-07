//=========================创建乌鸦角色=======================================

var wuya = (function () {
  //乌鸦早安语;
  var wuyaMorning = [
    '好个屁',
    '好个蛋',
    '好个屌',
    '好你妹'
  ];

  //乌鸦的台词;
  var wuyaWords = [
    '卧槽!',
    '我勒个去!',
    '想吃烤肉!',
    '咱喝酒去吧!',
    '咱们结婚吧',
    '我不喜欢男人',
    '没人这么给面子还调戏我老人家了'
  ];

  var say = function (whatUSay) {
    if (whatUSay.indexOf("早上好") !== -1) {
      return getASentence(wuyaMorning);
    }
    if (whatUSay.indexOf("个笑话") !== -1) {
      return getASentence(joke);
    }
    return getASentence(wuyaWords);
  };

  return {
    name : '乌小六',
    desc : '铁汉⑥',
    hello : '卧槽!卧槽!hhhhuuuooo!',
    say : say,
    joke : joke,
    morningWords : wuyaMorning
  };
})();