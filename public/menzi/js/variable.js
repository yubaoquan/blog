//=========================将以上角色添加到到陪聊列表中========================
var peiliaoList = {
	zhoumenzi : zhoumenzi,
	yujiong : yujiong,
	wuya : wuya,
	toto : toto,
	xiaolong : xiaolong,
	aming : aming
};

//=========================全局变量============================================
//发送信息是的快捷键方式;
var sendMethod = "ce";
//当前被选中的陪聊在html中的节点;
var currentPeiliaoElement;
//当前被选中的陪聊的ID;
var currentPeiliaoID;
//当前被选中的陪聊;
var currentPeiliao;
//陪聊的语句数组,后续改为陪聊的说话方法;
var words;
//用户性别
var userGender;
// //性别选择页;
// var genderSelectPage;

function getASentence (words) {
	var index = rdm(words.length);
	return words[index];
}

