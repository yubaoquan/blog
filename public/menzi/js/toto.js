//==============================创建2TO角色==================================
var toto = {};

//2TO的名字;
toto.name = "2TO";

//2TO的名片;
toto.desc = '呵呵党,生性凉薄,行尸走肉';

//2TO的欢迎语;
toto.hello = "→_→你们真的是够了好么";

//2TO的台词;
var totoWords = [];
var hehedaImgFilePath = "../images/heheda.png";
totoWords[0] = "呵呵哒" + "<img id=\"a\" src=\" "+ hehedaImgFilePath+"\"/>";
totoWords[1] = "哦";
totoWords[2] = '哦呵呵';
toto.words = totoWords;

//2TO的说话方式;
toto.say = function (whatUSay) {
	return getASentence(totoWords);
};