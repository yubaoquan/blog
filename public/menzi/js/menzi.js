//陪聊根据用户所说的话进行回应;
function talk() {
	var whatUSayInfo = GetContents();
	var whatUSay = whatUSayInfo.text;
	var whatPeiliaoSay = currentPeiliao.say(whatUSay);
	refreshContent(whatUSayInfo.wrapper, whatPeiliaoSay);
}

//发送消息后,更新聊天记录,情况编辑界面;
function refreshContent(whatUSayWrapper, peiliaoWord) {
	//whatUSayWrapper = whatUSayWrapper.replace("<p", "<p class=\"whatUSay\"");
	var content = document.getElementById("content");
	content.innerHTML += "<p class=\"singleSentence\"><b>你:</b></p>";
	content.innerHTML += whatUSayWrapper;
	content.innerHTML += "<p class=\"peiliaoSingleSentence\"><b>" + currentPeiliao.name + "</b>:</p>";
	content.innerHTML += "<p class=\"peiliaoWord\">" + peiliaoWord +"</p>";
	content.scrollTop = content.scrollHeight;
	clearTextArea();
	console.log(whatUSayWrapper);
	//alert(document.getElementById("iSay").value.length);
}

//监听回车和ctrl+回车事件,实现使用textarea作为编辑界面时的发送和换行功能;
function BindEnter(obj){
	var button = document.getElementById('ok');
	if (sendMethod == "ce") {
		if(obj.ctrlKey&&obj.keyCode == 13){
			button.click();
		}
	} else if (sendMethod == "en"){
		if(obj.keyCode == 13){
			if (!obj.ctrlKey) {
				button.click();
				obj.preventDefault();//阻止回车事件冒泡,修正回车残留问题;
			} else {
				// alert("Enter");
				document.getElementById("iSay").value += "\n";
			}
		}
	} else {
		alert("wtf");
	}
	
}

//选择陪聊;
function selectPeiliao(element) {
	var bodyColor = document.bgColor;
	currentPeiliaoElement.style.backgroundColor=bodyColor;
	currentPeiliaoElement.className = 'aPeiliao';

	currentPeiliaoID = element.id;
	currentPeiliao = peiliaoList[element.id];
	if (currentPeiliaoID == "yujiong" && typeof(userGender) == "undefined") {
		window.open ("selectGender.html", "newwindow", "height=250, width=300, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
	}
	
	var imgFilePath = "images/" + currentPeiliaoID + ".jpg";
	var imgElem = "<img id=\"a\" src=\" "+ imgFilePath+"\"/>";

	document.getElementById("hello").innerHTML = imgElem + currentPeiliao.hello;
	element.style.backgroundColor="#1ec5e5";
	var myHeadSrc = "<img id=\"myHead\" src=\"images/" + "user" + ".jpg\"/>";
	document.getElementById("say2who").innerHTML = myHeadSrc + "对" + currentPeiliao.name + "说:";
	currentPeiliaoElement = element;
	currentPeiliaoElement.className='currentPeiliao';
}

//界面打开时的初始化工作;
function pageLoad() {
	currentPeiliaoElement = document.getElementById("zhoumenzi");
	selectPeiliao(currentPeiliaoElement);
	sendMethod = "ce";
	initTooltip();
}

//初始化陪聊名片;
function initTooltip() {
	var availablePeiliaos = $('#availablePeiliaos').children();
	console.log('totally '+ availablePeiliaos.length + 'peiliaos');
	for (var i = 0; i < availablePeiliaos.length; i++) {
		var peiliaoID = availablePeiliaos[i].id;
		console.log('init ' + peiliaoID);
		var peiliao = peiliaoList[peiliaoID];
		var peiliaoDescWrapper = '<div class = tooltip>' + peiliao.desc + '</div>'
		var selector = '#' + peiliaoID;
		$(selector).tooltip({
			content: peiliaoDescWrapper  ,
			position : {
                my: "left + 10", 
                at: "right bottom",
            },
            show: {
                effect: "slideDown",
                duration: 180,
            },
            // hide: {
            //     effect: "explode",
            //     duration: 180,
            // }
		});
	}
}

//生成[0,n)之间的随机数;
function rdm(n) {
	return Math.floor(Math.random()*n);
}

//从编辑界面中获取消息,包含消息的纯文本和带样式的文本;;
function GetContents() {
	var whatUSayInfo = new Object();
	if (sendMethod == "ck") {
		var editor = CKEDITOR.instances.iSay;
		whatUSayInfo.wrapper = editor.getData();
		whatUSayInfo.text = editor.document.getBody().getText();
	} else {
		var whatUSay=document.getElementById("iSay").value;
		whatUSayInfo.wrapper = whatUSay.replace(/[\r\n]/g,"<br>").replace(/[\n]/g,"<br>")
		whatUSayInfo.text = whatUSay;
	}
	whatUSayInfo.wrapper = "<div class=\"whatUSay\"> "+ whatUSayInfo.wrapper + "</div>";
	return whatUSayInfo;
}

//用户发送消息之后清空编辑框;
function clearTextArea() {
	if (sendMethod == "ck") {
		var editor = CKEDITOR.instances.iSay;
		editor.setData("");
	} else {
		document.getElementById("iSay").value = "";
	}
}

function getSex() {
	var sex = prompt("请输入性别");
	if (sex == "男") {
		return "male";
	}
}

//更改发送消息的快捷键方式,包含更改编辑界面,textarea和CKEditor之间互相转换;
function changeSendMethod(obj) {
	if (sendMethod == obj.value) {
		return;
	}
	var textarea = document.getElementById("iSay");
	if (obj.value == "ck") {
		var ckeditor = document.getElementById("cke_iSay");
		if (ckeditor == null) {
			CKEDITOR.replace('editor1');
		} else {
			textarea.setAttribute("style", "visibility: hidden; display: none;");
			ckeditor.setAttribute("style", "visibility: visible; display: inline;");
		}
	} else {
		if (sendMethod == "ck") {
			var ckeditor = document.getElementById("cke_iSay");
			ckeditor.setAttribute("style", "visibility: hidden; display: none;");
			textarea.setAttribute("style", "visibility: visible; display: inline;");
		}
	}
	sendMethod = obj.value;
	
}

//给子窗口调用的方法,在方法体里调用父窗口的方法;
function selectGender(obj) {
	userGender = obj.value;
	opener.setGender(obj.value);
	window.close();
	//alert("非常抱歉,我自己关不上,请把我关了,谢谢!");
}

//设置用户的性别;
function setGender(value) {
	userGender = value;
}

function sorryInfo() {
	alert("十分Sorry,这个陪聊正在被调教,无法陪你聊天;");
}