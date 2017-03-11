/**
 * 查询全部 默认查询本表单的ACTION
 * 
 * @param formName
 *            表单名称
 */
function searchAll(formName) {
	window.location = document.getElementById(formName).action;
}
