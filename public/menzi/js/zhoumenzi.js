//==============================创建闷子角色==================================
var zhoumenzi = {};

//闷子的名字;
zhoumenzi.name = "周闷子";

//闷子的欢迎语;
zhoumenzi.hello = "你好,我是周闷子 ⊙ˍ⊙ 很高兴陪你聊天";

//闷子的台词;
var menziWords = [];
menziWords[0] = "什么心态";
menziWords[1] = "...";
menziWords[2] = "你一脸!";
zhoumenzi.words = menziWords;

//闷子的说话方式;
function menziSay(whatUSay) {
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
}
zhoumenzi.say = menziSay;