//==============================创建2TO角色==================================
var toto = {};

//2TO的名字;
toto.name = "2TO";

//2TO的欢迎语;
toto.hello = "→_→你们真的是够了好么";

//2TO的台词;
var totoWords = [];
var hehedaImgFilePath = "../images/heheda.png";
totoWords[0] = "呵呵哒" + "<img id=\"a\" src=\" "+ hehedaImgFilePath+"\"/>";
totoWords[1] = "哦";
toto.words = totoWords;

//2TO的说话方式;
function totoSay(whatUSay) {
	return getASentence(totoWords);
}
toto.say = totoSay;