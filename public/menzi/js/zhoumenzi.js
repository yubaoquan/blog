//==============================创建闷子角色==================================
var zhoumenzi = (function () {

	//闷子的台词;
	var menziWords = [
		'什么心态',
		'...',
		'你一脸!'
	];

	//闷子的说话方式;
	var say = function (whatUSay) {
		var words = menziWords;
		var wordIndex = rdm(words.length);
		var peiliaoWord = words[wordIndex];
		if (wordIndex == 2) {
			if (whatUSay.length >=2 && whatUSay.substr(whatUSay.length - 2).indexOf(">") == -1) {
				peiliaoWord = whatUSay.substr(whatUSay.length - 2)+ peiliaoWord;
			} else {
				peiliaoWord = "额";
			}
		}
		return peiliaoWord;
	};

	return {
		name : '周闷子',
		desc : '无聊的闷子',
		hello : '你好,我是周闷子 ⊙ˍ⊙ 很高兴陪你聊天',
		say : say
	};
})();