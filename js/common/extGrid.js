/*
 * html表格转extjs表格的工具类
 * Ext JS Library 3.4.0 
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com 
 * http://www.sencha.com/license
 * 使用方法：
 * Ext.onReady(function() {
		//如果需要多选，将false改为true或省略参数
		TravelGrid.createGrid('deptList', false); 
	});
	window.onresize = function() {
		TravelGrid.refresh(); //刷新窗体
	}
 */
Ext.ns('Ext.ux.grid');

// 定义右键菜单插件
Ext.ux.grid.RightMenu = function(options) {
	var currRecord = false;
	var currRowIndex = false;
	var currGrid = false;
	var menuItems = Ext.each(options.items, function() {
		var item = this;
		this.handler = function() {
			item.recHandler && item.recHandler(currRecord, currRowIndex, currGrid);
		};
	});
	var menu = new Ext.menu.Menu({
		items : options.items
	});
	this.init = function(grid) {
		grid.on('rowcontextmenu', function(client, rowIndex, e) {
			e.preventDefault();
			if (rowIndex < 0) { return; }
			client.getSelectionModel().selectRow(rowIndex);
			currRowIndex = rowIndex;
			currRecord = grid.getStore().getAt(rowIndex);
			currGrid = grid;
			menu.showAt(e.getXY());
		});
	};
};

/**
 * @class Ext.ux.grid.TableGrid
 * @extends Ext.grid.GridPanel A Grid which creates itself from an existing HTML
 *          table element.
 * @history 2007-03-01 Original version by Nige "Animal" White 2007-03-10 jvs
 *          Slightly refactored to reuse existing classes *
 * @constructor
 * @param {String/HTMLElement/Ext.Element} table The table element from which
 *        this grid will be created - The table MUST have some type of size
 *        defined for the grid to fill. The container will be automatically set
 *        to position relative if it isn't already.
 * @param {Object} config A config object that sets properties on this grid and
 *        has two additional (optional) properties: fields and columns which
 *        allow for customizing data fields and columns for this grid.
 */
var myGridHeader; // 公共grid header头
Ext.ux.grid.TableGrid = function(table, config, isMulti, plugins) {
	config = config || {};
	Ext.apply(this, config);
	var cf = config.fields || [], ch = config.columns || [];
	table = Ext.get(table);
	var ct = table.insertSibling();
	var ln = new Ext.grid.RowNumberer({
		header : '<b>NO.</b>',
		width : 35
	});
	if (isMulti == 'undefined' || isMulti == null || isMulti) {
		var sm = new Ext.grid.CheckboxSelectionModel();
	} else {
		var sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			hidden : true
		});
	}
	var fields = [], cols = [ ln, sm ];
	var headers = table.query("thead th");
	myGridHeader = headers;
	for ( var i = 0, h; h = headers[i]; i++) {
		var text = h.innerHTML;
		var name = h.getAttribute('id');// 'tcol-' + i;
		var isHide = h.getAttribute('hide');
		if (isHide == 'undefined' || isHide == null || isHide == 'false') {
			isHide = false;
		} else {
			isHide = true;
		}
		var isEnableBtn = h.getAttribute('hide');
		if (isEnableBtn == 'undefined' || isEnableBtn == null || isEnableBtn == '0' || isEnableBtn == 'false') {
			isEnableBtn = false;
		} else {
			isEnableBtn = true;
		}
		var textalign = h.getAttribute('textalign');
		if (textalign == 'undefined' || textalign == null || textalign == '') {
			textalign = '';
		}
		var colType = h.getAttribute('type');
		if (colType == 'undefined' || colType == null || colType == '') {
			colType = 'auto';
		}
		fields.push(Ext.applyIf(cf[i] || {}, {
			name : name,
			mapping : 'td:nth(' + (i + 1) + ')/@innerHTML',
			type : colType
		}));

		cols.push(Ext.applyIf(ch[i] || {}, {
			'header' : '<b>' + text + '</b>',
			'dataIndex' : name,
			'width' : h.offsetWidth,
			'tooltip' : h.title,
			'sortable' : true,
			'hidden' : isHide,
			'align' : textalign
		}));
	}
	var ds = new Ext.data.Store({
		reader : new Ext.data.XmlReader({
			record : 'tbody tr'
		}, fields)
	});
	ds.loadData(table.dom);

	var cm = new Ext.grid.ColumnModel(cols, {});
	if (config.width || config.height) {
		ct.setSize(config.width || 'auto', config.height || 'auto');
	} else {
		ct.setWidth(table.getWidth());
	}
	if (config.remove !== false) {
		table.remove();
	}
	Ext.applyIf(this, {
		'ds' : ds,
		'sm' : sm,
		'cm' : cm,
		autoWidth : true,
		autoScroll : true,
		height : config.height,
		plugins : plugins
	});
	Ext.ux.grid.TableGrid.superclass.constructor.call(this, ct, {});

	// 判断是否无数据
	if (ds.getCount() == 0) {
		var gridBody = Ext.select('div.x-grid3-body').item(0);
		var parent = gridBody.parent();
		gridBody.remove();
		notDataDiv = document.createElement("div");
		notDataDiv.className = "x-grid-empty center";
		parent.appendChild(notDataDiv);
	}
};

Ext.extend(Ext.ux.grid.TableGrid, Ext.grid.GridPanel);

// backwards compat
Ext.grid.TableGrid = Ext.ux.grid.TableGrid;

// --------------------------------------------------------------------------

/**
 * 本地公共grid变量
 */
var myTravelGrid;
var notDataDiv; // 无数据时提示信息
var gridHasData = false; // 是否有数据

/**
 * 将普通表格变为EXT Grid形式
 * 
 * @author Maxin
 * @time 2015-07-26
 * @constructor
 * @param 在表格中加入列头标签<thead/>
 * @param 在表格中加入数据标签<tbody/>
 * @param 列头标签属性，作用在标签<th/>上： <br>
 *        hide 是否隐藏(true/false) <br>
 *        pk 是否主键列(true/false) <br>
 *        textalign 对齐<br>
 *        btnStatus 判断禁用启用标识列，为true表示以此列数据做为判断依据(true/false)
 */
var TravelGrid = {

	/**
	 * 创建 EXT GRID 数据表
	 * 
	 * @param tableId 数据表ID
	 * @param isMulti 是否可多选，默认[单选]
	 * @param customHeight 自定义数据控件高度，如果没有值，将根据窗口进行自适应
	 * @param emptyText 无数据时的提示信息，默认为[暂无数据]
	 * @param plugins 插件（例如：右键菜单）
	 * @param stateId grid状态id
	 * @returns void
	 */
	createGrid : function(tableId, isMulti, customHeight, emptyText, plugins, stateId) {
		// 创建数据表
		myTravelGrid = new Ext.grid.TableGrid(tableId, {
			autoScroll : true,
			loadMask : true,
			plugins : plugins,
			stateful: (Ext.isEmpty(stateId)) ? false : true,//列状态记忆功能
			stateId: stateId,//列状态记忆功能
			viewConfig : {
				forceFit : true,
				sortAscText : "升序",
				sortDescText : "降序",
				columnsText : "字段选择"
			}
		}, ((Ext.isEmpty(isMulti)) ? false : isMulti));

		// 渲染数据表
		myTravelGrid.render();
		// 无数据时
		if (!Ext.isEmpty(notDataDiv)) {
			notDataDiv.innerHTML = (Ext.isEmpty(emptyText)) ? '暂无数据' : emptyText;
			gridHasData = false;
		} else {
			gridHasData = true;
		}
		TravelGrid.refresh(customHeight);
		// 绑定窗口
		window.onresize = function() {
			TravelGrid.refresh(customHeight);
		};
	},

	// 显示隐含框架
	handleFrame : function(tableId, isHide) {
		// var frameTitle = document.getElementsByClassName('frameTitle');
		// var frmSearch = document.getElementsByName('frmSearch');
		var frameButton = document.getElementsByClassName('frameButton');
		var framePage = document.getElementsByClassName('framePage');

		/*
		 * if (!Ext.isEmpty(frameTitle) && isHide) { frameTitle[0].hide(); }
		 * else { frameTitle[0].show(); } if (!Ext.isEmpty(frmSearch) && isHide) {
		 * frmSearch[0].hide(); } else { frmSearch[0].show(); }
		 */
		if (!Ext.isEmpty(frameButton) && isHide) {
			frameButton[0].style.visibility = 'hidden';
		} else {
			frameButton[0].style.visibility = 'visible';
		}
		if (!Ext.isEmpty(framePage) && isHide) {
			framePage[0].style.visibility = 'hidden';
		} else {
			framePage[0].style.visibility = 'visible';
		}
	},

	/**
	 * 获取GRID对象
	 */
	getGrid : function() {
		return myTravelGrid;
	},

	/**
	 * 刷新数据表
	 * 
	 * @returns void
	 */
	refresh : function(customHeight) {
		var h = TravelGrid.getBodyHeight(customHeight);
		myTravelGrid.setHeight(h);
		myTravelGrid.setWidth('auto');
	},

	getBodyHeight : function(customHeight) {
		var windowHeight, frameTitleHeight, frameButtonHeight, framePageHeight, frmSearchHeight;
		var frameMargin = 35; // 框架边距高度
		var frameTitle = document.getElementsByClassName('frameTitle');
		var frmSearch = document.getElementsByName('frmSearch');
		var frameButton = document.getElementsByClassName('frameButton');
		var framePage = document.getElementsByClassName('framePage');

		windowHeight = document.documentElement.clientHeight;
		frameTitleHeight = (Ext.isEmpty(frameTitle)) ? 0 : frameTitle[0].offsetHeight;
		frameButtonHeight = (Ext.isEmpty(frameButton)) ? 0 : frameButton[0].offsetHeight;
		framePageHeight = (Ext.isEmpty(framePage)) ? 0 : framePage[0].offsetHeight;
		frmSearchHeight = (Ext.isEmpty(frmSearch) || frmSearch.length == 0) ? 0 : frmSearch[0].offsetHeight;
		customHeight = (Ext.isEmpty(customHeight)) ? 0 : customHeight; // 用户自定义高度

		if (customHeight > 0) {
			return customHeight;
		} else {
			return windowHeight - frameTitleHeight - frameButtonHeight - framePageHeight - frmSearchHeight - frameMargin;
		}
	},

	/**
	 * 设定 GRID 配置
	 */
	setConfig : function(config) {
		Ext.applyIf(myTravelGrid, config);
		myTravelGrid.render();
	},

	/**
	 * 列表操作方法，根据输入参数，拼接动作URL
	 * 
	 * @param action ACTION或URL名称，例如：loadList
	 * @param keyName 标识名称并为首个参数名称，例如：id
	 * @param keyValue 标识值，例如：
	 * @param urlOther 其他参数，例如：&a=1&b=2
	 * @param isTipWin 是否有提示框
	 * @param tipText 提示框文字
	 * @returns void
	 */
	op : function(action, keyName, urlOther, isTipWin, tipText, target) {
		var url = "", keyValue = "-1";
		keyName = getValEmpty(keyName);
		urlOther = getValEmpty(urlOther);
		keyValue = TravelGrid.getId(keyName);
		if (keyName != "" && keyValue == "-1") {
			Ext.Msg.alert('提示', '请先选择项目，再进行操作。');
			return false;
		}
		if (keyName != "") {
			url += "?" + keyName + "=" + keyValue;
			if (urlOther != "") {
				url += urlOther;
			}
		} else {
			if (urlOther != "") {
				url += "?t=0" + urlOther;
			}
		}
		url = action + url;

		// 是否增加提示框
		if (isTipWin) {
			if (tipText == null) {
				tipText = "";
			}
			Ext.MessageBox.confirm('提示', tipText + '是否继续操作？', function(btn) {
				if (btn == 'yes') {
					Ext.MessageBox.show({
						msg : "正在处理，请稍候...",
						title : "等待",
						closable : false
					});
					//window.location = url;
					toUrl(url, target);
					Ext.MessageBox.hide();
				}
			});
		} else {
			Ext.MessageBox.show({
				msg : "正在处理，请稍候...",
				title : "等待",
				closable : false
			});
			//window.location = url;
			toUrl(url, target);
			Ext.MessageBox.hide();
		}
	},

	/**
	 * 列表操作方法，根据输入参数，拼接动作URL
	 * 
	 * @param action ACTION或URL名称，例如：loadList
	 * @param keyName 标识名称并为首个参数名称，例如：id
	 * @param urlOther 其他参数，例如：&a=1&b=2
	 * @param fun 单击确定按钮调用的js方法
	 * @param funPlace js方法的位置，是子页面里的还是父页面里的
	 * @param title 弹出窗标题
	 * @param width 如：'50%' 弹出窗宽度
	 * @param height（int）如：500 弹出窗高度
	 * @returns void
	 */
	opPopWin : function(action, keyName, urlOther, fun, funPlace, title, width, height) {
		var url = "", keyValue = "-1";
		keyName = getValEmpty(keyName);
		urlOther = getValEmpty(urlOther);
		keyValue = TravelGrid.getId(keyName);
		if (keyName != "" && keyValue == "-1") {
			Ext.Msg.alert('提示', '请先选择项目，再进行操作。');
			return false;
		}
		if (keyName != "") {
			url += "?" + keyName + "=" + keyValue;
			if (urlOther != "") {
				url += urlOther;
			}
		} else {
			if (urlOther != "") {
				url += "?t=0" + urlOther;
			}
		}
		url = action + url;
		if (width == null) {
			width = '80%';
		}
		if (height == null) {
			height = 550;
		}
		showPopWin(url, fun, funPlace, title, width, height);
	},

	/**
	 * 列表操作方法，根据输入参数，拼接动作URL
	 * 
	 * @param action ACTION或URL名称，例如：loadList
	 * @param keyName 标识名称并为首个参数名称，例如：id
	 * @param urlOther 其他参数，例如：&a=1&b=2
	 * @param title 弹出窗标题
	 * @param width 如：'50%' 弹出窗宽度
	 * @param height（int）如：500 弹出窗高度
	 * @returns void
	 */
	opPopWinNoBtn : function(action, keyName, urlOther, title, width, height) {
		var url = "", keyValue = "-1";
		keyName = getValEmpty(keyName);
		urlOther = getValEmpty(urlOther);
		keyValue = TravelGrid.getId(keyName);
		if (keyName != "" && keyValue == "-1") {
			Ext.Msg.alert('提示', '请先选择项目，再进行操作。');
			return false;
		}
		if (keyName != "") {
			url += "?" + keyName + "=" + keyValue;
			if (urlOther != "") {
				url += urlOther;
			}
		} else {
			if (urlOther != "") {
				url += "?t=0" + urlOther;
			}
		}
		url = action + url;
		if (width == null) {
			width = '80%';
		}
		if (height == null) {
			height = 550;
		}
		showPopWinNoBtn(url, title, width, height);
	},

	/**
	 * 删除操作
	 * 
	 * @param action
	 * @param keyName
	 * @param urlOther
	 * @param tipText 提示信息，如果为空将设置为默认值
	 * @returns void
	 */
	del : function(action, keyName, urlOther, tipText) {
		tipText = getValEmpty(tipText, "注意：删除后不可恢复！");
		TravelGrid.op(action, keyName, urlOther, true, tipText);
	},

	/**
	 * 获取行标识 GET 隐含域的值
	 * 
	 * @param keyName 可以为多个值，以逗号分开
	 * @returns 对应keyName的多个值
	 */
	getId : function(keyName) {
		if (getValEmpty(keyName) != "") {
			var selModel = myTravelGrid.getSelectionModel();// 获取选择列
			var records = selModel.getSelections();// 根据选择列获取到所有的行
			if (records.length > 0) {
				var arrKeyName = keyName.split(",");
				var result = "";
				for ( var k = 0; k < arrKeyName.length; k++) {
					for ( var i = 0; i < records.length; i++) {
						result += records[i].get(arrKeyName[k]);
						if (i != records.length - 1) {
							result += ",";
						}
					}
					if (k != arrKeyName.length - 1) {
						result += "|";
					}
				}
				return result;
			}
		}
		return "-1";
	},

	/**
	 * 获取行标识 GET 隐含域的值，并提示
	 * 
	 * @param keyName 可以为多个值，以逗号分开
	 * @returns 对应keyName的多个值
	 */
	getVal : function(keyName) {
		var keyValue = TravelGrid.getId(keyName);
		if (keyValue == "-1") {
			Ext.Msg.alert('提示', '请先选择项目，再进行操作。');
			return "";
		} else {
			return keyValue;
		}
	},

	/**
	 * 获取extgrid选中的行数
	 */
	getSelectedRows : function() {
		var selModel = myTravelGrid.getSelectionModel();// 获取选择列
		var records = selModel.getSelections();// 根据选择列获取到所有的行
		return records.length;
	},

	/**
	 * 检测是否选中行
	 * 
	 * @param keyName 需要检测的关键字
	 * @returns boolean
	 */
	isEmpty : function(keyName) {
		var keyValue = TravelGrid.getId(keyName);
		if (keyName != "" && keyValue == "-1") {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * 该GRID是否有数据
	 * 
	 * @returns boolean
	 */
	hasData : function() {
		return gridHasData;
	},

	/**
	 * 根据字段，判断按钮状态是否可用
	 * 
	 * @param keyName 按钮标识列ID
	 * @returns true/false
	 */
	isEnableButton : function(keyName) {
		var bool = TravelGrid.getId(keyName).toString();
		if (getValEmpty(bool) == "") {
			return false;
		} else {
			bool = bool.toString();
		}
		if (bool == "1" || bool == "true") {
			return true;
		} else {
			return false;
		}

	},

	/**
	 * 内部使用，URL按钮方法
	 */
	setBtnStatusByUrl : function(handle, btn, urlTrue, urlFalse, urlOther, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip) {
		TravelGrid.setBtnStatus(handle, btn, 'url', urlTrue, urlFalse, urlOther, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip);
	},

	/**
	 * 内部使用，JS按钮方法
	 */
	setBtnStatusByJs : function(handle, btn, jsTrue, jsFalse, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip) {
		TravelGrid.setBtnStatus(handle, btn, 'js', jsTrue, jsFalse, '', btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip);
	},

	/**
	 * 根据按钮、字段，设置按钮状态（用于禁用启用按钮）
	 * 
	 * @param btn 按钮Element
	 * @param actionType URL方式或JS方式
	 * @param urlTrue 启用url
	 * @param urlFalse 禁用url
	 * @param urlOther 为其它url及参数
	 * @returns void
	 */
	setBtnStatus : function(handle, btn, actionType, urlTrue, urlFalse, urlOther, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip) {
		var keyName = "", pk = "";

		// init param
		actionType = getValEmpty(actionType, 'url');
		urlTrue = getValEmpty(urlTrue);
		urlFalse = getValEmpty(urlFalse);
		urlOther = getValEmpty(urlOther);
		btnTrueDesc = getValEmpty(btnTrueDesc, '启用');
		btnFalseDesc = getValEmpty(btnFalseDesc, '禁用');
		btnTrueCss = getValEmpty(btnTrueCss, 'btn_enable');
		btnFalseCss = getValEmpty(btnFalseCss, 'btn_disable');
		btnTrueTip = getValEmpty(btnTrueTip, '是否将当前数据标记为 [' + btnTrueDesc + '] 状态？');
		btnFalseTip = getValEmpty(btnFalseTip, '是否将当前数据标记为 [' + btnFalseDesc + '] 状态？');

		for ( var i = 0; i < myGridHeader.length; i++) {
			if (myGridHeader[i].getAttribute("btnStatus") == "true") {
				keyName = myGridHeader[i].getAttribute("id");
				break;
			}
		}
		for ( var i = 0; i < myGridHeader.length; i++) {
			if (myGridHeader[i].getAttribute("pk") == "true") {
				pk = myGridHeader[i].getAttribute("id");
				break;
			}
		}
		if (keyName == "" || pk == "") {
			return;
		} else {
			var pkValue = TravelGrid.getId(pk);
			if (pkValue == "-1") {
				btn.disabled = true;
				btn.className = "btn_unavailable";
			} else {
				btn.disabled = false;
				if (TravelGrid.isEnableButton(keyName)) {
					btn.className = btnFalseCss;
					btn.value = btnFalseDesc;
					btn.addEventListener(handle, function() {
						if (urlFalse != "") {
							Ext.MessageBox.confirm('提示', btnFalseTip, function(btn) {
								if (btn == 'yes') {
									if (actionType == 'url') {
										window.location = urlFalse + '?' + pk + '=' + pkValue + urlOther;
									} else if (actionType == 'js') {
										eval(urlFalse + "('" + pkValue + "')");
									}
								}
							});
						}
					});
				} else {
					btn.className = btnTrueCss;
					btn.value = btnTrueDesc;
					btn.addEventListener(handle, function() {
						if (urlTrue != "") {
							Ext.MessageBox.confirm('提示', btnTrueTip, function(btn) {
								if (btn == 'yes') {
									if (actionType == 'url') {
										window.location = urlTrue + '?' + pk + '=' + pkValue + urlOther;
									} else if (actionType == 'js') {
										eval(urlTrue + "('" + pkValue + "')");
									}
								}
							});
						}
					});
				}
			}
		}
	},

	/**
	 * 启用禁用按钮事件，URL方法
	 * 
	 * @param btnId 为按钮ID值
	 * @param urlTrue 为启用 url
	 * @param urlFalse 为禁用url
	 * @param urlOther 为其它url及参数
	 * @returns void
	 */
	addBtnStatusEvent : function(btnId, urlTrue, urlFalse, urlOther, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip) {
		TravelGrid.addBtnStatusEventHandle('click', btnId, urlTrue, urlFalse, urlOther, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip);
	},

	/**
	 * 按钮事件，增加自定义事件，URL方法
	 * 
	 * @param handle 事件句柄
	 */
	addBtnStatusEventHandle : function(handle, btnId, urlTrue, urlFalse, urlOther, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip) {
		var btn = document.getElementById(btnId);
		myTravelGrid.addListener(handle, function() {
			TravelGrid.setBtnStatusByUrl(handle, btn, urlTrue, urlFalse, urlOther, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip);
		})
	},

	/**
	 * 启用禁用按钮事件，JS调用
	 * 
	 * @param btnId 为按钮ID值
	 * @param jsTrue 为启用JS方法名与参数，字符串形式
	 * @param jsFalse 为禁用JS方法
	 * @returns void
	 */
	addBtnStatusByJsEvent : function(btnId, jsTrue, jsFalse, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip) {
		TravelGrid.addBtnStatusByJsEventHandle('click', btnId, jsTrue, jsFalse, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip);
	},

	/**
	 * 按钮事件，增加自定义事件，JS调用
	 * 
	 * @param handle 事件句柄
	 */
	addBtnStatusByJsEventHandle : function(handle, btnId, jsTrue, jsFalse, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip) {
		var btn = document.getElementById(btnId);
		myTravelGrid.addListener(handle, function() {
			TravelGrid.setBtnStatusByJs(handle, btn, jsTrue, jsFalse, btnTrueDesc, btnFalseDesc, btnTrueCss, btnFalseCss, btnTrueTip, btnFalseTip);
		})
	},

	/**
	 * 增加GRID行，单击事件
	 * 
	 * @param fn 方法
	 */
	addGridRowEventClick : function(fn) {
		myTravelGrid.addListener('rowclick', fn);
	},

	/**
	 * 增加GRID行，双击事件
	 * 
	 * @param fn 方法
	 */
	addGridRowEventDblclick : function(fn) {
		myTravelGrid.addListener('rowdblclick', fn);
	},

	/**
	 * 增加GRID行监听事件，自定义
	 * 
	 * @param handle 事件句柄
	 * @param fn 方法
	 */
	addGridRowEvent : function(handle, fn) {
		myTravelGrid.addListener(handle, fn);
	},

	/**
	 * 增加排序后回调方法
	 * 
	 * @param fn 方法
	 */
	addSortchangeEvent : function(fn) {
		myTravelGrid.addListener("sortchange", fn);
	}
}

/**
 * 过滤undefined、null 为字符串空值
 * 
 * @param el 元素
 * @param dv defaultValue默认值
 * @returns 元素或空字符串
 */
function getValEmpty(el, dv) {
	return (el == 'undefined' || el == null) ? ((dv == 'undefined' || dv == null) ? "" : dv) : el;
}
