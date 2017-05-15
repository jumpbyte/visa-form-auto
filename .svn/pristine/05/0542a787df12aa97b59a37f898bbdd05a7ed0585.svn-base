/*******************************************************************************
 * 关于全国省/市的数组 ======使用说明====== 初始化省 <select name="sltProvince" id="sltProvince">
 * <option value="">-=所在地=-</option> </select> for(var iProvince = 0; iProvince <
 * arrProvince.length; iProvince++) $("sltProvince").options.add(new
 * Option(arrProvince[iProvince],arrProvince[iProvince]));
 * 
 * 级联城市 <select name="sltCities" id="sltCities"> <option value="">-=所在城市/地区=-</option>
 * </select> $("sltProvince").onchange = function(){ var idx =
 * parseInt($("sltProvince").options.selectedIndex) - 1; new
 * Nodes().removeAllChilds("sltCities"); $("sltCities").options.add(new
 * Option("-=所在城市=-",""));
 * 
 * if(idx != -1) for(var iCity = 0; iCity < arrCities[idx].length; iCity++)
 * $("sltCities").options.add(new
 * Option(arrCities[idx][iCity],arrCities[idx][iCity])); };
 ******************************************************************************/

/**
 * Jquery 调用省份并联动城市 页面加载调用此事件
 * 
 * @objPro 省份页面元素Id
 * @objCity 城市页面元素Id
 */
function getProvince(objPro, objCity, proValue, cityValue) {
	var proIdx = -1;
	if (proValue == null) {
		proValue = "";
	}
	if (cityValue == null) {
		cityValue = "";
	}
	for ( var iProvince = 0; iProvince < arrProvince.length; iProvince++) {
		if (proValue == arrProvince[iProvince]) {
			$('#' + objPro).append("<option value='" + arrProvince[iProvince] + "' selected='selected'>" + arrProvince[iProvince] + "</option>");
			proIdx = iProvince;
		} else {
			$('#' + objPro).append("<option value='" + arrProvince[iProvince] + "'>" + arrProvince[iProvince] + "</option>");
		}
		$('#' + objPro).change(function() {
			var idx = parseInt($(this).children('option:selected').index()) - 1;
			$('#' + objCity + ' option').remove();
			$('#' + objCity).append("<option value=''>选择所在城市/地区</option>");

			if (idx != -1) {
				for ( var iCity = 0; iCity < arrCities[idx].length; iCity++) {
					$('#' + objCity).append("<option value='" + arrCities[idx][iCity] + "'>" + arrCities[idx][iCity] + "</option>");
				}
			}
		});
	}
	if (proIdx >= 0) {
		for ( var iCity = 0; iCity < arrCities[proIdx].length; iCity++) {
			if (cityValue == arrCities[proIdx][iCity]) {
				$('#' + objCity).append("<option value='" + arrCities[proIdx][iCity] + "' selected='selected'>" + arrCities[proIdx][iCity] + "</option>");
			} else {
				$('#' + objCity).append("<option value='" + arrCities[proIdx][iCity] + "'>" + arrCities[proIdx][iCity] + "</option>");
			}
		}
	}
}

// 所有省
var arrProvince = new Array("北京市", "上海市", "天津市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "宁夏回族自治区", "青海省", "新疆维吾尔自治区", "中国香港", "中国澳门", "中国台湾", "境外","其它");

// 所有市
var arrCities = new Array();
arrCities[0] = new Array("北京市区", "北京市辖区");
arrCities[1] = new Array("上海市区", "上海市辖区");
arrCities[2] = new Array("天津市区", "天津市辖区");
arrCities[3] = new Array("重庆市区", "重庆市辖区");
arrCities[4] = new Array("石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "保定市", "沧州市", "衡水市", "邢台市", "邯郸市");
arrCities[5] = new Array("太原市", "大同市","阳泉市","长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "忻州市", "吕梁市");
arrCities[6] = new Array("呼和浩特市", "包头市", "乌海市", "赤峰市","通辽市", "鄂尔多斯市","呼伦贝尔盟", "巴彦淖尔盟","乌兰察布盟", "锡林郭勒盟","兴安盟","阿拉善盟");
arrCities[7] = new Array("沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市","丹东市","锦州市", "营口市", "阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市");
arrCities[8] = new Array("长春市", "吉林市","四平市","辽源市","通化市","白山市","白城市","松原市","延边朝鲜族自治州", "梅河口市","公主岭市");
arrCities[9] = new Array("哈尔滨市", "齐齐哈尔市", "牡丹江市", "佳木斯市", "大庆市", "伊春市","鸡西市","鹤岗市","双鸭山市","七台河市","绥化市","黑河市","大兴安岭地区");
arrCities[10] = new Array("南京市", "徐州市", "连云港", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市", "南通市", "镇江市", "常州市", "无锡市", "苏州市");
arrCities[11] = new Array("杭州市", "宁波市","温州市", "绍兴市","湖州市", "嘉兴市", "金华市","衢州市","舟山市", "台州市","丽水地区");
arrCities[12] = new Array("合肥市", "芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市", "黄山市","阜阳市","宿州市","滁州市","六安市","宣城地区","池州地区","毫州市");
arrCities[13] = new Array("福州市","厦门市","漳州市", "泉州市","三明市","莆田市", "南平市", "龙岩市","宁德市","平潭市");
arrCities[14] = new Array("南昌市", "九江市", "上饶地区","抚州地区","宜春地区","吉安地区","赣州市","景德镇市","萍乡市","新余市", "鹰潭市");
arrCities[15] = new Array("济南市","青岛市","淄博市","枣庄市","东营市","烟台市","潍坊市","济宁市","泰安市","威海市","日照市","滨州地区","德州市","聊城市","临沂市","菏泽地区","莱芜市");
arrCities[16] = new Array("郑州市","开封市","洛阳市", "平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三门峡市","商丘市","周口地区","驻马店地区","南阳市","信阳市", "济源市");
arrCities[17] = new Array("武汉市","黄石市", "十堰市","荆州市","宜昌市","襄阳市","鄂州市","荆门市","黄冈市","孝感市","咸宁市","随州市","省辖地区","恩施土家族苗族自治州");
arrCities[18] = new Array("长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市", "张家界市", "益阳市","娄底市","郴州市","永州市","怀化市","湘西土家族苗族自治州");
arrCities[19] = new Array("广州市","深圳市","珠海市","汕头市","佛山市","韶关市","湛江市","肇庆市","江门市","茂名市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市");
arrCities[20] = new Array("南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市", "贵港市", "玉林市", "百色地区","贺州地区", "河池地区", "来宾地区","崇左市" );
arrCities[21] = new Array("海口市", "三亚市","三沙市", "儋州市");// , "省直辖行"
arrCities[22] = new Array("成都市", "广元市","资阳市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市", "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中地区", "达州市", "资阳地区", "眉山地区", "雅安地区", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州");
arrCities[23] = new Array("贵阳市", "六盘水市", "遵义市", "毕节地区","安顺地区", "铜仁地区", "黔东南苗族侗族自治地区", "黔南布依族苗族自治区", "黔西南布依族苗族自治州");
arrCities[24] = new Array("昆明市", "曲靖市", "玉溪市","保山市", "昭通市","丽江市","普洱市", "临沧市","德宏傣族景颇族自治州","怒江僳僳族自治州","迪庆藏族自治州","大理白族自治州","楚雄彝族自治州","红河哈尼族自治州","文山壮族自治州","西双版纳傣族自治州");
arrCities[25] = new Array("拉萨市","昌都市","日喀则市","林芝市", "那曲地区","山南地区", "阿里地区");
arrCities[26] = new Array("西安市","宝鸡市","咸阳市", "渭南市", "铜川市","延安市","榆林市","安康地区","汉中市","商洛地区");
arrCities[27] = new Array("兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "酒泉地区", "张掖地区", "武威地区","定西地区","陇南地区","平凉地区","庆阳地区","临夏回族自治州", "甘南藏族自治州");
arrCities[28] = new Array("银川市", "石嘴山市", "吴忠市", "固原地区", "中卫市");
arrCities[29] = new Array("西宁市","海东地区","海北藏族自治州", "海南藏族自治州", "黄南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州");
arrCities[30] = new Array("乌鲁木齐市", "克拉玛依市","吐鲁番地区","哈密地区","昌吉回族自治州","博尔塔拉蒙古自治州","巴音郭楞蒙古自治州","阿克苏地区","克孜勒苏柯尔克孜","喀什地区","和田地区","伊犁哈萨克自治州", "自治区直辖行政单位");
arrCities[31] = new Array("中国香港");
arrCities[32] = new Array("中国澳门");
arrCities[33] = new Array("中国台湾");
arrCities[34] = new Array("境外");
arrCities[35] = new Array("其它");
// sort
for ( var i = 0; i < arrCities.length; i++) {
	arrCities[i] = arrCities[i].sort(function(x, y) {
		return x.localeCompare(y);
	});
}
