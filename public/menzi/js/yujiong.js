//=========================创建玉扃角色=======================================
var yujiong = (function () {
	//玉扃的台词;//deprecated
	var yujiongWords = [
		'摸摸头',
		'老娘抽死你丫的!',
		'→_→'
	];

	//玉扃对男性说的台词;
	var words2Male = [
		'老娘抽死你丫的!',
		'你皮痒啊!',
		'啊，这样啊，你要原谅我，我是金牛座',
		'哈哈哈哈!',
		'橘是我的！！！'
	];

	//玉扃对女性说的台词;
	var words2Female = [
		'摸摸头~',
		'掐脸~"',
		'抱住!',
		'昨天那个剧，我听到第三遍终于明白了',
		'哈哈哈哈'];

	//玉扃对不男不女说的台词;
	var words2WTF = [
		'→_→',
		'我要去熬中药了',
		'我要去洗脸了',
		'我要去睡觉了',
		'哈哈哈哈',
		'o(╯□╰)o'
	];

	//玉扃的说话方式;
	var say = function(whatUSay) {
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

	return {
		name : '玉扃',
		desc : '晚期性别歧视者',
		hello : '我就是热情如火的玉扃!(╯‵□′)╯︵┻━┻',
		say : say
	};
})();