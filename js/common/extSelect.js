/*
 * html下拉列表转ext的combox
 * Ext JS Library 3.4.0 
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com 
 * http://www.sencha.com/license
 * @author liuyandong
 */
var TravelSelect = {
	/**
	 * html下拉列表转ext的combox
	 * 
	 * 1.需要修改以前下拉列表的id和name，2.在jsp中新加div用来显示ext的下拉列表，3.TravelSelect.createCombox('', '', '');参数请参照方法说明
	 * 
	 * @param selectId 以前的下拉列表的id值（修改后的id），用来从该下拉列表读取数据
	 * @param comboxDivId 对应页面盛放input的div的id，表示ext下拉列表显示到id为comboxDivId的div上
	 * @param hiddenName form表单提交时，往后台action传的参数名称，对应action中的变量
	 * @param emptyText 下拉列表数据为空时，下拉列表显示的文字
	 * @param inputSize 下拉列表的size属性值，必须是数字
	 * @author liuyandong
	 * @time 2016-07-25
	 */
	createCombox : function(selectId, comboxDivId, hiddenName, emptyText, inputSize) {
		$("#"+selectId).hide(); // 隐藏下拉框
		//创建input标签元素,并添加到id为comboxDivId的div中
		var inputId = comboxDivId + "Input";
		var inputObj = createInputTag("text",inputId,inputId, inputSize);
		$("#"+comboxDivId).append(inputObj); 
		//extjs的下拉列表数据构造
		var comboxDataArray = [];
		var selectedValue = $("#"+selectId).val() == null ? "" : $("#"+selectId).val();
		var i = 0;
		$("#"+selectId+" option").each(function(){
			comboxDataArray[i]=[$(this).text(),$(this).attr("value")];
			i++;
		});
		
		//extjs的下拉列表创建
		// simple array store
	    var store = new Ext.data.ArrayStore({
	        fields: ['comText', 'comValue'],
	        data : comboxDataArray //
	    });
		var comboxId = comboxDivId + "Combox";
	    var combo = new Ext.form.ComboBox({
	    	id: comboxId,
	        store: store,
	        displayField: 'comText',
	        valueField: 'comValue',
	        typeAhead: true,//模糊查询
	        mode: 'local',
	        forceSelection: true,
	        triggerAction: 'all',
	        value: selectedValue,
	        selectOnFocus:true,
	        applyTo: inputId,
	        hiddenName: hiddenName,
	        hiddenValue: selectedValue,
	        emptyText: emptyText,
	        autoWidth: true,
	        listeners:{//模糊查询
	            beforequery : function(e){
	        	    var combo = e.combo;
	        	    if(!e.forceAll){
	        		    var value = e.query;
	        		    combo.store.filterBy(function(record,id){
	        			    var text = record.get(combo.displayField);
	        			    return (text.indexOf(value)!=-1);
	        	    	});
	        		    this.onLoad();
	        		    return false;
	            	}
	        	}
	        }
	    });
	},
	/**
	 * json数组构建ext下拉列表
	 * 
	 * 1.action通过setRequestAttribute()传参到jsp; 2.在jsp中新加div用来显示ext的下拉列表 
	 * 3.TravelSelect.createComboxJson('${struDataJson}', 'schStruIdCombox', 'schStruId', '全部公司或组织', 'struId', 'abbrCn', '${struSelectedValue}');
	 * 
	 * @param comData json数组，下拉列表数据源 格式：'[{"abbrCn":"北京众信","struId":3},{"abbrCn":"上海分公司","struId":4}]'
	 * @param comboxDivId 对应页面盛放input的div的id，表示ext下拉列表显示到id为comboxDivId的div上
	 * @param hiddenName 表单提交的参数名称
	 * @param emptyText 下拉列表数据为空时，下拉列表显示的文字
	 * @param comValue 下拉列表的真实值，
	 * @param comText 下拉列表的显示值
	 * @param selectedValue 下拉列表的选中值
	 * @param inputSize 下拉列表的size属性值，必须是数字
	 * @author liuyandong
	 * @time 2016-07-25
	 */
	createComboxJson : function(comData, comboxDivId, hiddenName, emptyText, comValue, comText, selectedValue, inputSize) {
		//创建input标签元素,并添加到id为comboxDivId的div中
		var inputId = comboxDivId + "Input";
		var inputObj = createInputTag("text",inputId,inputId, inputSize);
		$("#"+comboxDivId).append(inputObj); 
		//extjs的下拉列表数据构造
		if (comData == null || comData == "") {
			comData = "[]";
		};
		var comboxDataJson = eval('({results:'+ comData +'})');
		//extjs的下拉列表创建
		// simple Json store
	    var store = new Ext.data.JsonStore({
	    	root: 'results',
	        fields: [{name:'comText',mapping:comText},{name:'comValue',mapping:comValue}],
	        data: comboxDataJson //
	    });

		var comboxId = comboxDivId + "Combox";
	    var combo = new Ext.form.ComboBox({
	    	id: comboxId,
	        store: store,
	        displayField: 'comText',
	        valueField: 'comValue',
	        typeAhead: true,//模糊查询
	        mode: 'local',
	        forceSelection: true,
	        triggerAction: 'all',
	        value: selectedValue,
	        selectOnFocus:true,
	        applyTo: inputId,
	        hiddenName: hiddenName,
	        hiddenValue: selectedValue,
	        emptyText: emptyText,
	        autoWidth: true,
	        listeners:{//模糊查询
	            beforequery : function(e){
	        	    var combo = e.combo;
	        	    if(!e.forceAll){
	        		    var value = e.query;
	        		    combo.store.filterBy(function(record,id){
	        			    var text = record.get(combo.displayField);
	        			    return (text.indexOf(value)!=-1);
	        	    	});
	        		    this.onLoad();
	        		    return true;
	            	}
	        	}
	        }
	    });
	},

	/**
	 * 给下拉列表添加onChange事件
	 * 
	 * @param fn 方法
	 * @author liuyandong
	 */
	addSelectValueChangeEvent : function(divId, fn) {
		var comboxId = divId + "Combox";
		var comboxObj = Ext.getCmp(comboxId);
		comboxObj.addListener('select', fn);
	},

	/**
	 * 获取下拉列表的真实值value
	 * 
	 * @author liuyandong
	 */
	getSelectValue : function(divId) {
		var comboxId = divId + "Combox";
		return Ext.getCmp(comboxId).getValue();
	},

	/**
	 * 获取下拉列表的显示值text
	 * 
	 * @author liuyandong
	 */
	getSelectText : function(divId) {
		var comboxId = divId + "Combox";
		return Ext.getCmp(comboxId).getRawValue();;
	}
}
/**
 * 创建各种<input>标签
 * 
 * @param tagType 标签类型(可以是text、password、checkbox、radio...)
 * @param tagId 标签id
 * @param tagName 标签name
 * @param inputSize 标签size
 * @author liuyandong
 * @returns
 */
function createInputTag(tagType, tagId, tagName, inputSize){
	var objTag = document.createElement("input");
	objTag.setAttribute("id",tagId);
	objTag.setAttribute("name",tagName);
	objTag.setAttribute("type",tagType);
	if(inputSize != undefined && inputSize != null && inputSize != "") {
		objTag.setAttribute("size",inputSize);
	}
	return objTag;
}

