//=========================创建小龙角色=======================================
var xiaolong = {};

//小龙的名字;
xiaolong.name = "小龙";

//小龙的名片;
xiaolong.desc = '寂寞求强奸';

//小龙的欢迎语;
xiaolong.hello = "帅么 大么 粗么 约么";

//小龙的台词;
xiaolongWords = [];
xiaolongWords[0] = '好饿呀';
xiaolongWords[1] = '好累啊';
xiaolongWords[2] = '我看看我的零食到了没';
xiaolongWords[3] = '来啊 快活啊 反正有大把时光';
xiaolongWords[4] = '来啊 爱情啊 反正有大把愚妄';
xiaolongWords[5] = '来啊 流浪啊 反正有大把方向';
xiaolongWords[6] = '来啊 造作啊 反正有大把风光';
xiaolongWords[7] = '白菜是手淫员';

xiaolong.say = function(whatUSay) {
	return getASentence(xiaolongWords);
};