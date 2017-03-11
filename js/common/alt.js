/**
 * 鼠标指针移动到元素上时的提示功能
 * 调用方法
 * onMouseOver="toolTip('text')" onMouseOut="toolTip()"
 * onMouseOver="toolTip('text', '#FFFF00', 'orange')" onMouseOut="toolTip()"
 */

var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var ie4 = document.all;
var offsetX = 0;
var offsetY = 20;
var toolTipSTYLE = "";
var objAltDiv;
var cssStyle = 'index_body';

function createTipsLayer() {
	objAltDiv = document.createElement("div");
	objAltDiv.setAttribute("id", "toolTipLayer");
	objAltDiv.style.position = "absolute";
	objAltDiv.style.zIndex = "999";
	objAltDiv.style.visibility = "hidden";
	document.body.appendChild(objAltDiv);
}

function initToolTips(cssStyle) {
	this.cssStyle = cssStyle;
	createTipsLayer();
	if (cssStyle == null || cssStyle == ''){
		objAltDiv.className = "index_tips";
	}
	if (ns4 || ns6 || ie4) {
		if (ns4){
			toolTipSTYLE = document.toolTipLayer;
		} else if (ns6) {
			toolTipSTYLE = document.getElementById("toolTipLayer").style;
		} else if (ie4) {
			toolTipSTYLE = document.all.toolTipLayer.style;
		}
		if (ns4){
			document.captureEvents(Event.MOUSEMOVE);
		} else {
			toolTipSTYLE.visibility = "visible";
			toolTipSTYLE.display = "none";
		}
		document.onmousemove = moveToMouseLoc;
	}
}
/**
 * 此方法可以控制弹出是否随鼠标移动，当moveToMouse=“true”时，随鼠标移动
 */
function initToolTipsMove(cssStyle, moveToMouse) {
	this.cssStyle = cssStyle;
	createTipsLayer();
	if (cssStyle == null || cssStyle == ''){
		objAltDiv.className = "index_tips";
	}
	if (ns4 || ns6 || ie4) {
		if (ns4){
			toolTipSTYLE = document.toolTipLayer;
		} else if (ns6) {
			toolTipSTYLE = document.getElementById("toolTipLayer").style;
		} else if (ie4) {
			toolTipSTYLE = document.all.toolTipLayer.style;
		}
		if (ns4){
			document.captureEvents(Event.MOUSEMOVE);
		} else {
			toolTipSTYLE.visibility = "visible";
			toolTipSTYLE.display = "none";
		}
		if (moveToMouse == 'true') {
			document.onmousemove = moveToMouseLoc;
		}
	}
}
function toolTip(msg, fg, bg) {
	if (toolTip.arguments.length < 1) {
		if (ns4){
			toolTipSTYLE.visibility = "hidden";
		} else {
			toolTipSTYLE.display = "none";
		}
	} else {
		if (cssStyle == null || cssStyle == ''){
			cssStyle = 'index_body';
			//cssStyle = 'color:#000;width:320px;background-color:#F7EFE7;border:1px solid #D0B090;padding:8px';
		}
		msgBg = "";
		//var content = '<div class="' + cssStyle + '">' + msg + '</div>';
		var content = '<div style="color:#000;width:auto;background-color:#F7EFE7;border:1px solid #D0B090;padding:8px">' + msg + '</div>';
		if (ns4) {
			toolTipSTYLE.document.write(content);
			toolTipSTYLE.document.close();
			toolTipSTYLE.visibility = "visible";
		}
		if (ns6) {
			document.getElementById("toolTipLayer").innerHTML = content;
			toolTipSTYLE.display = 'block'
		}
		if (ie4) {
			document.all("toolTipLayer").innerHTML = content;
			toolTipSTYLE.display = 'block'
		}
	}
}

function moveToMouseLoc(e) {
	if (ns4 || ns6) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = event.x + document.documentElement.scrollLeft;
		y = event.y + document.documentElement.scrollTop;
	}
	try {
		var _h = $('toolTipLayer').getHeight();
		if ((_h + y + 50) > document.body.clientHeight) {
			y = y - _h - offsetY - 5;
			x = x - 3;
		}
	} catch (ex) {
	}
	toolTipSTYLE.left = (x + offsetX) + 'px';
	toolTipSTYLE.top = (y + offsetY) + 'px';
	return true;
}
