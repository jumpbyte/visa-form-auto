/**
 * @author Maxin
 * @time 2015-07-26
 * @title Extjs消息提示框
 * @desc MsgTip.msg('消息标题', '消息内容');//不自动隐藏
 * @desc MsgTip.msg('消息标题', '消息内容',true);//默认1秒后自动隐藏
 * @desc MsgTip.msg('消息标题', '消息内容',true, 10);//3秒后自动隐藏
 * @constructor
 * @param msg 参数：
 * @param title 标题
 * @param messgae 提示内容
 * @param autoHide 是否自动隐含
 * @param pauseTime 停留时间，单位秒
 * @param isShowCloseBtn 是否显示关闭按钮
 */
MsgTip = function() {
	var msgCt;
	function createBox(t, s) {
		return [ '<div class="msg">', 
		         '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>', 
		         '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="line-height:24px;"><h3>', 
		         t, 
		         '</h3>', 
		         s, 
		         '</div></div></div>', 
		         '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>', 
		         '</div>' 
		].join('');
	}
	return {
		msg : function(title, message, autoHide, pauseTime, isShowCloseBtn) {
			if (!msgCt) {
				msgCt = Ext.DomHelper.insertFirst(document.body, {
					id : 'msg-div-travel',
					style : 'position:absolute;top:10px;width:300px;margin:0 auto;z-index:20000;'
				}, true);
			}
			msgCt.alignTo(document, 't-t');
			
			// 消息框增加关闭按钮
			if (!Ext.isEmpty(isShowCloseBtn) && isShowCloseBtn) {
				message += '<br><span style="text-align:right;font-size:12px; width:100%;">' + 
				'<font color="blank"><u style="cursor:hand;" onclick="MsgTip.hide(this);">关闭</u></font></span>';
			}
			var m = Ext.DomHelper.append(msgCt, {
				html : createBox(title, message)
			}, true);
			m.slideIn('t');
			if (Ext.isEmpty(autoHide) || autoHide) {
				if (Ext.isEmpty(pauseTime)) {
					pauseTime = 1.5;
				}
				m.pause(pauseTime).ghost("tr", {
					remove : true
				});
			}
		},
		hide : function(v) {
			var msg = Ext.get(v.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
			msg.ghost("tr", {
				remove : true
			});
		}
	};
}();
