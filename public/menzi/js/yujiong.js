//=========================创建玉扃角色=======================================
var yujiong = {};

//玉扃的名字;
yujiong.name = "玉扃";

//玉扃的名片;
yujiong.desc = '晚期性别歧视者';

//玉扃的欢迎语;
yujiong.hello = "我就是热情如火的玉扃!(╯‵□′)╯︵┻━┻";

//玉扃的台词;//deprecated
var yujiongWords = [];
yujiongWords[0] = "摸摸头";
yujiongWords[1] = "老娘抽死你丫的!";
yujiongWords[2] = "→_→";
yujiong.words = yujiongWords;

//玉扃对男性说的台词;
var words2Male = [];
words2Male[0] = "老娘抽死你丫的!";
words2Male[1] = "你皮痒啊!";
words2Male[2] = "啊，这样啊，你要原谅我，我是金牛座";
words2Male[3] = "哈哈哈哈!";
words2Male[4] = "橘是我的！！！";

//玉扃对女性说的台词;
var words2Female = [];
words2Female[0] = "摸摸头~";
words2Female[1] = "掐脸~";
words2Female[2] = "抱住!";
words2Female[3] = "昨天那个剧，我听到第三遍终于明白了";
words2Female[4] = "哈哈哈哈";

//玉扃对不男不女说的台词;
var words2WTF = [];
words2WTF[0] = "→_→";
words2WTF[1] = "我要去熬中药了";
words2WTF[2] = "我要去洗脸了";
words2WTF[3] = "我要去睡觉了";
words2WTF[4] = "哈哈哈哈";
words2WTF[5] = " o(╯□╰)o";

//玉扃的说话方式;
yujiong.say = function(whatUSay) {
	if (userGender == "male") {
		return getASentence(words2Male);
	}
	if (userGender == "female") {
		return getASentence(words2Female);
	}
	if (userGender == "wtf") {
		return getASentence(words2WTF);
	}
	return "error";
};