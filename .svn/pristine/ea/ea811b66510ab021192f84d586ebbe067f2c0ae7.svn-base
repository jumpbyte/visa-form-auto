/**
 * 表格行操作工具类
 * 使用方法:
 * <table id="rowTable">
 * 		<tbody id="rowElements">
 * 			<tr>
 * 				<th width="5%">序号</th>
 * 				<th width="95%">数据1</th>
 * 				<th width="95%">数据2</th>
 * 			</tr>
 * 			<tr>
 * 				<td>1</td>
 * 				<td><input type="text" name="data1"></td>
 * 				<td><input type="text" name="data2"></td>
 * 			</tr>
 * 		</tbody>
 * </table>
 * 
 * 在TABLE属性加入ID，设置为rowTable
 * 在tr集合外，加入tbody，ID设置为rowElements
 * 序号列，需要设置
 * 加入按钮：
 * <input type="button" onclick="Row.addRow(1);" value="增加1项">
 * <input type="button" onclick="Row.addRow(5);" value="增加5项">
 * <input type="button" onclick="Row.deleteLastRows(1,'data1');" value="删除项"> 此功能为删除最后一项
 * <input type="button" onclick="Row.deleteBlankRows(0,'data1');" value="删除空项">
 * 删除空项功能，需要指定判断列，根据指定的列ID，来判断是否有值，如果值为空，将删除。
 */
var Row = {
	
	maxRow : 1,
		
	// 获取数据表
	getRowTable : function() {
		return document.getElementById('rowTable');
	},

	// 获取数据行
	getRowElements : function() {
		return document.getElementById('rowElements');
	},

	// 以哪列判断，如果为空将认定为空项
	getRowPrimaryElements : function(fieldName) {
		if (fieldName == null || fieldName == '') {
			fieldName = 'fieldName';
		}
		return document.getElementsByName(fieldName);
	},

	// 重置行数据
	resetRow : function(newRowNode) {
		var rowElements = Row.getRowElements();
		var frameRowElement = rowElements.rows[1];
		var selects = newRowNode.getElementsByTagName('select');
		var oldSelects = frameRowElement.getElementsByTagName('select');
		for ( var i = 0; i < selects.length; i++) {
			var objOpts = selects[i].options;
			for ( var j = 0; j < objOpts.length; j++) {
				if (objOpts[j].getAttribute("value") == oldSelects[i][oldSelects[i].selectedIndex].value){
					objOpts[j].setAttribute("selected", "selected");
				}
			}
		}
		newRowNode.cells[0].innerText = newRowNode.rowIndex;//++Row.maxRow;
		newRowNode.className = '';
	},

	// 增加项目
	addRow : function(rows) {
		var rowElements = Row.getRowElements();
		var frameRowElement = rowElements.rows[1];
		if (rows == null) rows = 1;
		for ( var i = 0; i < rows; i++) {
			var newRow = frameRowElement.cloneNode(true);
			rowElements.appendChild(newRow);
			Row.resetRow(newRow);
		}
	},

	/**
	 * 删除项
	 * rows 可指定删除几项，写0为全删除，只保留第一项
	 */
	deleteLastRows : function(rows) {
		Row.deleteRows(rows, false);
	},

	/**
	 * 删除空项目
	 * rows 删除几项，写0为全删除，只保留第一项
	 * primaryFieldName 指定标识列，根据此列来判断值是否为空，如果为空将删除
	 */
	deleteBlankRows : function(rows, primaryFieldName) {
		Row.deleteRows(rows, true, primaryFieldName);
	},

	deleteRow : function(element) {
		if (element.rowIndex > 1) {
			Row.getRowElements().removeChild(element);
		} else {
			alert('[提示] 首行不可删除!');
			return false;
		}
	},

	deleteRows : function(rows, isBlank, primaryFieldName) {
		var t = Row.getRowTable();
		var primaryElements = Row.getRowPrimaryElements(primaryFieldName);
		var tRows = t.rows.length;
		var cutRow = tRows - rows;

		if (cutRow <= 2) rows = 0;
		if (rows == 0) rows = tRows - 2;

		for ( var i = tRows - 1; i >= tRows - rows; i--) {
			if (!isBlank) {
				t.deleteRow(i);
				//Row.maxRow--;
			} else {
				if (primaryElements[i - 1].value == '' || primaryElements[i - 1].value == null) {
					t.deleteRow(i);
					//Row.maxRow--;
				}
			}
		}
	},

	// 选择列表首项
	setSelectFirstOption : function(selectElement) {
		selectElement.options[0].selected = true;
	}
};