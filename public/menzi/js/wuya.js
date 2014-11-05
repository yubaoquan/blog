//=========================创建乌鸦角色=======================================
var wuya = {};

//乌鸦的名字:
wuya.name = "乌小六";

//乌鸦的欢迎语;
wuya.hello = "卧槽!卧槽!hhhhuuuooo!";

//乌鸦的台词;
var wuyaWords = [];
wuyaWords[0] = "卧槽!";
wuyaWords[1] = "我勒个去!";
wuyaWords[2] = "想吃烤肉!";
wuyaWords[3] = "咱喝酒去吧!";
wuyaWords[4] = "咱们结婚吧";
wuyaWords[5] = "我不喜欢男人";
wuyaWords[6] = "没人这么给面子还调戏我老人家了";
wuya.words = wuyaWords;

//乌鸦早安语;
var wuyaMorning = [];
wuyaMorning[0] = "好个屁";
wuyaMorning[1] = "好个蛋";
wuyaMorning[2] = "好个屌";
wuyaMorning[3] = "好你妹";
wuya.morningWords = wuyaMorning;

//乌鸦讲的笑话
wuya.joke = joke;

//乌鸦的说话方式;
function wuyaSay(whatUSay) {
	if (whatUSay.indexOf("早上好") != -1)  {
		return getASentence(wuyaMorning);
	} 
	if (whatUSay.indexOf("个笑话") != -1) {
		return getASentence(wuya.joke);
	}
	else {
		return getASentence(wuyaWords);
	}
}
wuya.say = wuyaSay;
