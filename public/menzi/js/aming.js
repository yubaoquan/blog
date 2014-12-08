//=========================创建阿名角色=======================================
var aming = {};

//阿名的名字;
aming.name = "阿名";

//阿名的名片;
aming.desc = '自称聪名,酷爱做作业';

//阿名的欢迎语;
aming.hello = "Hi~ o(*￣▽￣*)ブ我是智慧的聪名";

//阿名的台词;
var amingWords = [];
amingWords[0] = 'p(#￣▽￣#)o';
amingWords[1] = 'o(*////▽////*)q';
amingWords[2] = 'o(*////▽////*)o';
amingWords[3] = '(`･ω･´)';
amingWords[4] = '（￣へ￣）';
amingWords[5] = '(￣^￣)';
amingWords[6] = 'o(´^｀)o ';
amingWords[7] = '┌(。Д。)┐';

aming.say = function (whatUSay) {
  return getASentence(amingWords);
};