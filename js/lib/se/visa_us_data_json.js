/**
 * 定义所有页面表单列表项数据源
 */
var Pages=["P","T","R","E","O"];
var RelationshipOptions = [{ value: "C", text: "子女" }, { value: "P", text: "父母" }]
    //婚姻状态
var MaritalStatusOptions = [
        { value: "M", text: "已婚" },
        { value: "C", text: "普通法律婚姻" },
        { value: "P", text: "民事婚姻/国内同居" },
        { value: "S", text: "单身" },
        { value: "W", text: "丧偶" },
        { value: "D", text: "离异" },
        { value: "L", text: "合法分居"},
        { value: "O", text: "其他" }
    ]
    //护照类型
var PassportTypeOptions = [
        { value: "D", text: "外交" },
        { value: "O", text: "公务" },
        { value: "T", text: "因公普通护照，其他" },
        { value: "R", text: "普通" }
    ]
    //日期类型
var DateTypeOptions = [
        { value: "D", text: "天" },
        { value: "H", text: "24小时之内" },
        { value: "M", text: "月" },
        { value: "W", text: "周" },
        { value: "Y", text: "年" }
    ]
    //谁为这次旅程付费
var PayForTravelOptions = [
        { value: "C", text: "其它公司/组织机构",showArea:"orgPayerInfo"},
        { value: "O", text: "其他人" ,showArea:"otherPayerInfo"},
        { value: "S", text: "自己" }
    ]
    //付费人与您的关系
var PayRelationshipOptions = [
        { value: "C", text: "子女" },
        { value: "P", text: "父母" },
        { value: "S", text: "配偶" },
        { value: "R", text: "其他亲属" },
        { value: "F", text: "朋友" },
        { value: "O", text: "其他" }
    ]
    //同行人与您的关系
var CompanionRelationshipOptions = [
    { value: "P", text: "父母" },
    { value: "S", text: "配偶" },
    { value: "C", text: "子女" },
    { value: "R", text: "其他亲属" },
    { value: "F", text: "朋友" },
    { value: "B", text: "商业伙伴" },
    { value: "O", text: "其他" }
]

//美国联系人与您的关系？
var RelationshipUSOptions = [
        { value: "R", text: "亲属" },
        { value: "S", text: "配偶" },
        { value: "C", text: "朋友" },
        { value: "B", text: "公司合伙方" },
        { value: "P", text: "雇主" },
        { value: "H", text: "学校官员" },
        { value: "O", text: "其他" }
    ]
    //亲属在美身份
var IidentityInUSOptions = [
        { value: "S", text: " 美国公民" },
        { value: "C", text: "美国合法永久居留者" },
        { value: "P", text: "非移民" },
        { value: "O", text: "其他/我不知道" }
    ]
    //其他直系亲属与您的关系？
var OtherRelationshipUSOptions = [
        { value: "S", text: "配偶" },
        { value: "F", text: "未婚夫/妻" },
        { value: "C", text: "子女" },
        { value: "B", text: "兄弟姐妹" }
    ]
    //配偶地址
var SpouseAddrOptions = [
    { value: "H", text: "与家庭地址相同" },
    { value: "M", text: "与邮寄地址相同" },
    { value: "U", text: "与美国联络地址相同" },
    { value: "D", text: "不知道" },
    { value: "O", text: "其他（请具体说明地址）" }
]

//赴美访问目的 
var PurposeToUSOptions = [{ value: "B", text: "临时商务及旅游（B）" }]
    //赴美访问目的 具体说明
var PurposeSpecifyOptions = [
        { value: "B1-CF", text: "商务/会议(B1)" },
        { value: "B2-TM", text: "旅游/就医(B2)" },
        { value: "B1-B2", text: "商务/个人访问(B1/B2)" }
    ]
    //州选项
var StateOptions = [
        { "value": "AK", "text": "阿拉斯加州" },
        { "value": "AL", "text": "阿拉巴马州" },
        { "value": "AR", "text": "阿肯色州" },
        { "value": "AS", "text": "美属萨摩亚群岛" },
        { "value": "AZ", "text": "亚利桑那州" },
        { "value": "CA", "text": "加利福尼亚州" },
        { "value": "CO", "text": "美国科罗拉多州" },
        { "value": "CT", "text": "康涅狄格州" },
        { "value": "DC", "text": "华盛顿哥伦比亚特区" },
        { "value": "DE", "text": "特拉华州" },
        { "value": "FL", "text": "佛罗里达州" },
        { "value": "GA", "text": "佐治亚州" },
        { "value": "GU", "text": "关岛" },
        { "value": "HI", "text": "夏威夷州" },
        { "value": "IA", "text": "艾奥瓦州" },
        { "value": "ID", "text": "爱达荷州" },
        { "value": "IL", "text": "伊利诺伊州" },
        { "value": "IN", "text": "印地安那州" },
        { "value": "KS", "text": "堪萨斯州" },
        { "value": "KY", "text": "肯塔基州" },
        { "value": "LA", "text": "路易斯安那州" },
        { "value": "MA", "text": "马萨诸塞州" },
        { "value": "MD", "text": "马里兰州" },
        { "value": "ME", "text": "缅因州" },
        { "value": "MI", "text": "密歇根州" },
        { "value": "MN", "text": "明尼苏达州" },
        { "value": "MO", "text": "密苏里州" },
        { "value": "MP", "text": "北马里亚纳群岛" },
        { "value": "MS", "text": "密西西比州" },
        { "value": "MT", "text": "蒙大拿州" },
        { "value": "NC", "text": "北卡罗来纳州" },
        { "value": "ND", "text": "北达科他州" },
        { "value": "NE", "text": "内布拉斯加州" },
        { "value": "NH", "text": "新罕布什尔州" },
        { "value": "NJ", "text": "新泽西州" },
        { "value": "NM", "text": "新墨西哥州" },
        { "value": "NV", "text": "内华达州" },
        { "value": "NY", "text": "纽约州" },
        { "value": "OH", "text": "俄亥俄州" },
        { "value": "OK", "text": "俄克拉何马州" },
        { "value": "OR", "text": "俄勒冈州" },
        { "value": "PA", "text": "宾夕法尼亚州" },
        { "value": "PR", "text": "波多黎各" },
        { "value": "RI", "text": "罗得岛州" },
        { "value": "SC", "text": "南卡罗来纳州" },
        { "value": "SC", "text": "南达科他州" },
        { "value": "TN", "text": "田纳西州" },
        { "value": "TX", "text": "得克萨斯州" },
        { "value": "UT", "text": "犹他州" },
        { "value": "VA", "text": "弗吉尼亚州" },
        { "value": "VI", "text": "维尔克群岛" },
        { "value": "VT", "text": "佛蒙特州" },
        { "value": "WA", "text": "华盛顿州" },
        { "value": "WI", "text": "威斯康星州" },
        { "value": "WV", "text": "西弗吉尼亚州" },
        { "value": "WY", "text": "怀俄明州" }
    ]
    //国家列表
var CountryOptions = [
        { "value": "AFGH", "text": "阿富汗" },
        { "value": "ALB", "text": "阿尔巴尼亚" },
        { "value": "ALGR", "text": "阿尔及利亚" },
        { "value": "ANDO", "text": "安道尔" },
        { "value": "ANGL", "text": "安哥拉" },
        { "value": "ANGU", "text": "安圭拉" },
        { "value": "ANTI", "text": "安提瓜和巴布达岛" },
        { "value": "ARB", "text": "阿鲁巴" },
        { "value": "ARG", "text": "阿根廷" },
        { "value": "ARM", "text": "亚美尼亚" },
        { "value": "ASMO", "text": "美国萨摩亚" },
        { "value": "ASTL", "text": "澳大利亚" },
        { "value": "AUST", "text": "奥地利" },
        { "value": "AZR", "text": "阿塞拜疆" },
        { "value": "BAHR", "text": "巴林" },
        { "value": "BAMA", "text": "巴哈马" },
        { "value": "BANG", "text": "孟加拉国" },
        { "value": "BELG", "text": "比利时" },
        { "value": "BENN", "text": "贝宁" },
        { "value": "BERM", "text": "百慕大群岛" },
        { "value": "BHU", "text": "不丹" },
        { "value": "BIH", "text": "波黑" },
        { "value": "BLZ", "text": "伯利兹" },
        { "value": "BOL", "text": "玻利维亚" },
        { "value": "BON", "text": "博内尔岛" },
        { "value": "BOT", "text": "博茨瓦纳" },
        { "value": "BRDO", "text": "巴巴多斯" },
        { "value": "BRND", "text": "布隆迪" },
        { "value": "BRNI", "text": "文莱" },
        { "value": "BRVI", "text": "英属维尔京群岛" },
        { "value": "BRZL", "text": "巴西" },
        { "value": "BULG", "text": "保加利亚" },
        { "value": "BURK", "text": "布基纳法索" },
        { "value": "BURM", "text": "缅甸" },
        { "value": "BYS", "text": "白俄罗斯" },
        { "value": "CAFR", "text": "中非共和国" },
        { "value": "CAN", "text": "加拿大" },
        { "value": "CAVI", "text": "佛得角" },
        { "value": "CAYI", "text": "开曼群岛" },
        { "value": "CBDA", "text": "柬埔寨" },
        { "value": "CHAD", "text": "乍得" },
        { "value": "CHIL", "text": "智利" },
        { "value": "CHIN", "text": "中国" },
        { "value": "CHRI", "text": "圣诞岛" },
        { "value": "CKIS", "text": "库克群岛" },
        { "value": "CMRN", "text": "喀麦隆" },
        { "value": "COCI", "text": "科科斯群岛" },
        { "value": "COD", "text": "刚果民主共和国" },
        { "value": "COL", "text": "哥伦比亚" },
        { "value": "COMO", "text": "科摩罗" },
        { "value": "CONB", "text": "刚果共和国" },
        { "value": "CSTR", "text": "哥斯达黎加" },
        { "value": "CUBA", "text": "古巴" },
        { "value": "CUR", "text": "库拉索岛" },
        { "value": "CYPR", "text": "塞浦路斯" },
        { "value": "CZEC", "text": "捷克共和国" },
        { "value": "DEN", "text": "丹麦" },
        { "value": "DJI", "text": "吉布提" },
        { "value": "DOMN", "text": "多米尼加" },
        { "value": "DOMR", "text": "多明尼加共和国" },
        { "value": "ECUA", "text": "厄瓜多尔" },
        { "value": "EGN", "text": "赤道几内亚" },
        { "value": "EGYP", "text": "埃及" },
        { "value": "ELSL", "text": "萨尔瓦多" },
        { "value": "ERI", "text": "厄立特里亚" },
        { "value": "EST", "text": "爱沙尼亚" },
        { "value": "ETH", "text": "埃塞俄比亚" },
        { "value": "FIJI", "text": "斐济" },
        { "value": "FIN", "text": "芬兰" },
        { "value": "FKLI", "text": "福克兰群岛" },
        { "value": "FPOL", "text": "法属波利尼西亚" },
        { "value": "FRAN", "text": "法国" },
        { "value": "FRGN", "text": "法属圭亚那" },
        { "value": "FRO", "text": "法罗群岛" },
        { "value": "FSAT", "text": "法属南部和南极领地" },
        { "value": "FSM", "text": "密克罗尼西亚" },
        { "value": "GABN", "text": "加蓬" },
        { "value": "GAM", "text": "冈比亚的" },
        { "value": "GEO", "text": "格鲁吉亚" },
        { "value": "GER", "text": "德国" },
        { "value": "GHAN", "text": "加纳" },
        { "value": "GIB", "text": "直布罗陀" },
        { "value": "GNEA", "text": "几内亚" },
        { "value": "GRBR", "text": "英国" },
        { "value": "GRC", "text": "希腊" },
        { "value": "GREN", "text": "格林纳达" },
        { "value": "GRLD", "text": "格陵兰岛" },
        { "value": "GUAD", "text": "瓜德罗普岛" },
        { "value": "GUAM", "text": "关岛" },
        { "value": "GUAT", "text": "瓜地马拉" },
        { "value": "GUIB", "text": "几内亚-比绍" },
        { "value": "GUY", "text": "圭亚那" },
        { "value": "HAT", "text": "海地" },
        { "value": "HMD", "text": "赫德和麦克唐纳群岛" },
        { "value": "HNK", "text": "香港" },
        { "value": "HOND", "text": "洪都拉斯" },
        { "value": "HRV", "text": "克罗地亚" },
        { "value": "HUNG", "text": "匈牙利" },
        { "value": "ICLD", "text": "冰岛" },
        { "value": "IDSA", "text": "印度尼西亚" },
        { "value": "IND", "text": "印度" },
        { "value": "IOT", "text": "英属印度洋领地" },
        { "value": "IRAN", "text": "伊朗" },
        { "value": "IRAQ", "text": "伊拉克" },
        { "value": "IRE", "text": "爱尔兰" },
        { "value": "ISRL", "text": "以色列" },
        { "value": "ITLY", "text": "意大利" },
        { "value": "IVCO", "text": "科特迪瓦科特迪瓦" },
        { "value": "JAM", "text": "牙买加" },
        { "value": "JORD", "text": "乔丹" },
        { "value": "JPN", "text": "日本" },
        { "value": "JRSM", "text": "耶路撒冷" },
        { "value": "KAZ", "text": "哈萨克斯坦" },
        { "value": "KENY", "text": "肯尼亚" },
        { "value": "KGZ", "text": "吉尔吉斯斯坦" },
        { "value": "KIRI", "text": "基里巴斯" },
        { "value": "KOR", "text": "韩国" },
        { "value": "KSV", "text": "科索沃" },
        { "value": "KUWT", "text": "科威特" },
        { "value": "LAOS", "text": "老挝" },
        { "value": "LATV", "text": "拉脱维亚" },
        { "value": "LBYA", "text": "利比亚" },
        { "value": "LCHT", "text": "列支敦士登" },
        { "value": "LEBN", "text": "黎巴嫩" },
        { "value": "LES", "text": "莱索托" },
        { "value": "LIBR", "text": "利比里亚" },
        { "value": "LITH", "text": "立陶宛" },
        { "value": "LXM", "text": "卢森堡" },
        { "value": "MAC", "text": "澳门" },
        { "value": "MADG", "text": "马达加斯加" },
        { "value": "MAF", "text": "圣马丁" },
        { "value": "MALI", "text": "马里" },
        { "value": "MALW", "text": "马拉维" },
        { "value": "MART", "text": "马提尼克" },
        { "value": "MAUR", "text": "毛里塔尼亚" },
        { "value": "MDWI", "text": "中途岛" },
        { "value": "MEX", "text": "墨西哥" },
        { "value": "MKD", "text": "马其顿" },
        { "value": "MLAS", "text": "马来西亚" },
        { "value": "MLD", "text": "摩尔多瓦" },
        { "value": "MLDI", "text": "摩顿岛" },
        { "value": "MLDV", "text": "马尔代夫" },
        { "value": "MLTA", "text": "马耳他" },
        { "value": "MNP", "text": "北马里亚纳群岛" },
        { "value": "MON", "text": "摩纳哥" },
        { "value": "MONG", "text": "蒙古" },
        { "value": "MONT", "text": "蒙特塞拉特岛" },
        { "value": "MORO", "text": "摩洛哥" },
        { "value": "MOZ", "text": "莫桑比克" },
        { "value": "MRTS", "text": "毛里求斯" },
        { "value": "MTG", "text": "黑山" },
        { "value": "MYT", "text": "马约特岛" },
        { "value": "NAMB", "text": "纳米比亚" },
        { "value": "NAU", "text": "瑙鲁" },
        { "value": "NCAL", "text": "新喀里多尼亚" },
        { "value": "NEP", "text": "尼泊尔" },
        { "value": "NETH", "text": "荷兰" },
        { "value": "NFK", "text": "诺福克岛" },
        { "value": "NIC", "text": "尼加拉瓜" },
        { "value": "NIR", "text": "尼日尔" },
        { "value": "NIRE", "text": "北爱尔兰" },
        { "value": "NIUE", "text": "纽埃" },
        { "value": "NORW", "text": "挪威" },
        { "value": "NRA", "text": "尼日利亚" },
        { "value": "NZLD", "text": "新西兰" },
        { "value": "OMAN", "text": "阿曼" },
        { "value": "PALA", "text": "帕劳" },
        { "value": "PAN", "text": "巴拿马" },
        { "value": "PARA", "text": "巴拉圭" },
        { "value": "PERU", "text": "秘鲁" },
        { "value": "PHIL", "text": "菲律宾" },
        { "value": "PITC", "text": "皮特开恩群岛" },
        { "value": "PKST", "text": "巴基斯坦" },
        { "value": "PLMR", "text": "帕迈拉环礁" },
        { "value": "PNG", "text": "巴布亚新几内亚" },
        { "value": "POL", "text": "波兰" },
        { "value": "PORT", "text": "葡萄牙" },
        { "value": "PR", "text": "波多黎各" },
        { "value": "PRK", "text": "朝鲜" },
        { "value": "QTAR", "text": "卡塔尔" },
        { "value": "REUN", "text": "重聚" },
        { "value": "RMI", "text": "马绍尔群岛" },
        { "value": "ROM", "text": "罗马尼亚" },
        { "value": "RUS", "text": "俄罗斯" },
        { "value": "RWND", "text": "卢旺达" },
        { "value": "SABA", "text": "萨巴岛" },
        { "value": "SAFR", "text": "南非" },
        { "value": "SARB", "text": "沙特阿拉伯" },
        { "value": "SBA", "text": "塞尔维亚" },
        { "value": "SENG", "text": "塞内加尔" },
        { "value": "SEYC", "text": "塞舌尔" },
        { "value": "SGS", "text": "南乔治亚岛和南桑威奇群岛" },
        { "value": "SHEL", "text": "圣海伦娜" },
        { "value": "SING", "text": "新加坡" },
        { "value": "SJM", "text": "斯瓦尔巴德岛" },
        { "value": "SLCA", "text": "圣露西亚" },
        { "value": "SLEO", "text": "塞拉利昂" },
        { "value": "SLMN", "text": "所罗门群岛" },
        { "value": "SMAR", "text": "圣马力诺" },
        { "value": "SOMA", "text": "索马里" },
        { "value": "SPMI", "text": "圣彼埃尔和密克隆岛" },
        { "value": "SPN", "text": "西班牙" },
        { "value": "SRL", "text": "斯里兰卡" },
        { "value": "SSAH", "text": "西撒哈拉" },
        { "value": "SSDN", "text": "南苏丹" },
        { "value": "STCN", "text": "圣基茨和尼维斯" },
        { "value": "STEU", "text": "圣圣尤斯特歇斯" },
        { "value": "STM", "text": "圣马丁" },
        { "value": "STPR", "text": "圣多美和普林西比" },
        { "value": "STVN", "text": "圣文森特和格林纳丁斯" },
        { "value": "SUDA", "text": "苏丹" },
        { "value": "SURM", "text": "苏里南" },
        { "value": "SVK", "text": "斯洛伐克" },
        { "value": "SVN", "text": "斯洛文尼亚" },
        { "value": "SWDN", "text": "瑞典" },
        { "value": "SWTZ", "text": "瑞士" },
        { "value": "SYR", "text": "叙利亚" },
        { "value": "SZLD", "text": "斯威士兰" },
        { "value": "TAZN", "text": "坦桑尼亚" },
        { "value": "TCIS", "text": "特克斯和凯科斯群岛" },
        { "value": "THAI", "text": "泰国" },
        { "value": "TJK", "text": "塔吉克斯坦" },
        { "value": "TKL", "text": "托克劳群岛" },
        { "value": "TKM", "text": "土库曼斯坦" },
        { "value": "TMOR", "text": "东帝汶" },
        { "value": "TNSA", "text": "突尼斯" },
        { "value": "TOGO", "text": "多哥" },
        { "value": "TONG", "text": "汤加" },
        { "value": "TRIN", "text": "特立尼达和多巴哥" },
        { "value": "TRKY", "text": "土耳其" },
        { "value": "TUV", "text": "图瓦卢" },
        { "value": "TWAN", "text": "台湾" },
        { "value": "UAE", "text": "阿拉伯联合酋长国" },
        { "value": "UGAN", "text": "乌干达" },
        { "value": "UKR", "text": "乌克兰" },
        { "value": "URU", "text": "乌拉圭" },
        { "value": "USA", "text": "美利坚合众国" },
        { "value": "UZB", "text": "乌兹别克斯坦" },
        { "value": "VANU", "text": "瓦努阿图" },
        { "value": "VAT", "text": "教廷（梵蒂冈城）" },
        { "value": "VENZ", "text": "委内瑞拉" },
        { "value": "VI", "text": "维尔京群岛（美国）" },
        { "value": "VTNM", "text": "越南" },
        { "value": "WAFT", "text": "沃利斯和富图纳群岛" },
        { "value": "WKI", "text": "威克岛" },
        { "value": "WSAM", "text": "萨摩亚" },
        { "value": "XGZ", "text": "加沙地带" },
        { "value": "XHI", "text": "豪兰岛" },
        { "value": "XWB", "text": "西方银行" },
        { "value": "YEM", "text": "也门" },
        { "value": "ZAMB", "text": "赞比亚" },
        { "value": "ZIMB", "text": "津巴布韦" }
    ]
    //国籍列表项
var NationalityOptions = [
    { "value": "AFGH", "text": "阿富汗" },
    { "value": "ALB", "text": "阿尔巴尼亚" },
    { "value": "ALGR", "text": "阿尔及利亚" },
    { "value": "ANDO", "text": "安道尔" },
    { "value": "ANGL", "text": "安哥拉" },
    { "value": "ANGU", "text": "安圭拉" },
    { "value": "ANTI", "text": "安提瓜和巴布达岛" },
    { "value": "ARG", "text": "阿根廷" },
    { "value": "ARM", "text": "亚美尼亚" },
    { "value": "ASTL", "text": "澳大利亚" },
    { "value": "AUST", "text": "奥地利" },
    { "value": "AZR", "text": "阿塞拜疆" },
    { "value": "BAHR", "text": "巴林" },
    { "value": "BAMA", "text": "巴哈马" },
    { "value": "BANG", "text": "孟加拉国" },
    { "value": "BELG", "text": "比利时" },
    { "value": "BENN", "text": "贝宁" },
    { "value": "BERM", "text": "百慕大群岛" },
    { "value": "BHU", "text": "不丹" },
    { "value": "BIH", "text": "波黑" },
    { "value": "BLZ", "text": "伯利兹" },
    { "value": "BOL", "text": "玻利维亚" },
    { "value": "BOT", "text": "博茨瓦纳" },
    { "value": "BRDO", "text": "巴巴多斯" },
    { "value": "BRND", "text": "布隆迪" },
    { "value": "BRNI", "text": "文莱" },
    { "value": "BRVI", "text": "英属维尔京群岛" },
    { "value": "BRZL", "text": "巴西" },
    { "value": "BULG", "text": "保加利亚" },
    { "value": "BURK", "text": "布基纳法索" },
    { "value": "BURM", "text": "缅甸" },
    { "value": "BYS", "text": "白俄罗斯" },
    { "value": "CAFR", "text": "中非共和国" },
    { "value": "CAN", "text": "加拿大" },
    { "value": "CAVI", "text": "佛得角" },
    { "value": "CAYI", "text": "开曼群岛" },
    { "value": "CBDA", "text": "柬埔寨" },
    { "value": "CHAD", "text": "乍得" },
    { "value": "CHIL", "text": "智利" },
    { "value": "CHIN", "text": "中国" },
    { "value": "CMRN", "text": "喀麦隆" },
    { "value": "COD", "text": "刚果民主共和国" },
    { "value": "COL", "text": "哥伦比亚" },
    { "value": "COMO", "text": "科摩罗" },
    { "value": "CONB", "text": "刚果共和国" },
    { "value": "CSTR", "text": "哥斯达黎加" },
    { "value": "CUBA", "text": "古巴" },
    { "value": "CYPR", "text": "塞浦路斯" },
    { "value": "CZEC", "text": "捷克共和国" },
    { "value": "DEN", "text": "丹麦" },
    { "value": "DJI", "text": "吉布提" },
    { "value": "DOMN", "text": "多米尼加" },
    { "value": "DOMR", "text": "多明尼加共和国" },
    { "value": "ECUA", "text": "厄瓜多尔" },
    { "value": "EGN", "text": "赤道几内亚" },
    { "value": "EGYP", "text": "埃及" },
    { "value": "ELSL", "text": "萨尔瓦多" },
    { "value": "ERI", "text": "厄立特里亚" },
    { "value": "EST", "text": "爱沙尼亚" },
    { "value": "ETH", "text": "埃塞俄比亚" },
    { "value": "FIJI", "text": "斐济" },
    { "value": "FIN", "text": "芬兰" },
    { "value": "FRAN", "text": "法国" },
    { "value": "FSM", "text": "密克罗尼西亚" },
    { "value": "GABN", "text": "加蓬" },
    { "value": "GAM", "text": "冈比亚的" },
    { "value": "GEO", "text": "格鲁吉亚" },
    { "value": "GER", "text": "德国" },
    { "value": "GHAN", "text": "加纳" },
    { "value": "GIB", "text": "直布罗陀" },
    { "value": "GNEA", "text": "几内亚" },
    { "value": "GRBR", "text": "联合王国" },
    { "value": "GRC", "text": "希腊" },
    { "value": "GREN", "text": "格林纳达" },
    { "value": "GUAT", "text": "瓜地马拉" },
    { "value": "GUIB", "text": "几内亚-比绍" },
    { "value": "GUY", "text": "圭亚那" },
    { "value": "HAT", "text": "海地" },
    { "value": "HNK", "text": "香港特别行政区" },
    { "value": "HOKO", "text": "香港" },
    { "value": "HOND", "text": "洪都拉斯" },
    { "value": "HRV", "text": "克罗地亚" },
    { "value": "HUNG", "text": "匈牙利" },
    { "value": "ICLD", "text": "冰岛" },
    { "value": "IDSA", "text": "印度尼西亚" },
    { "value": "IND", "text": "印度" },
    { "value": "IOT", "text": "英属印度洋领地" },
    { "value": "IRAN", "text": "伊朗" },
    { "value": "IRAQ", "text": "伊拉克" },
    { "value": "IRE", "text": "爱尔兰" },
    { "value": "ISRL", "text": "以色列" },
    { "value": "ITLY", "text": "意大利" },
    { "value": "IVCO", "text": "科特迪瓦科特迪瓦" },
    { "value": "JAM", "text": "牙买加" },
    { "value": "JORD", "text": "乔丹" },
    { "value": "JPN", "text": "日本" },
    { "value": "KAZ", "text": "哈萨克斯坦" },
    { "value": "KENY", "text": "肯尼亚" },
    { "value": "KGZ", "text": "吉尔吉斯斯坦" },
    { "value": "KIRI", "text": "基里巴斯" },
    { "value": "KOR", "text": "韩国共和国（南部）" },
    { "value": "KSV", "text": "科索沃" },
    { "value": "KUWT", "text": "科威特" },
    { "value": "LAOS", "text": "老挝" },
    { "value": "LATV", "text": "拉脱维亚" },
    { "value": "LBYA", "text": "利比亚" },
    { "value": "LCHT", "text": "列支敦士登" },
    { "value": "LEBN", "text": "黎巴嫩" },
    { "value": "LES", "text": "莱索托" },
    { "value": "LIBR", "text": "利比里亚" },
    { "value": "LITH", "text": "立陶宛" },
    { "value": "LXM", "text": "卢森堡" },
    { "value": "MAC", "text": "澳门" },
    { "value": "MADG", "text": "马达加斯加" },
    { "value": "MALI", "text": "马里" },
    { "value": "MALW", "text": "马拉维" },
    { "value": "MAUR", "text": "毛里塔尼亚" },
    { "value": "MEX", "text": "墨西哥" },
    { "value": "MKD", "text": "马其顿" },
    { "value": "MLAS", "text": "马来西亚" },
    { "value": "MLD", "text": "摩尔多瓦" },
    { "value": "MLDV", "text": "马尔代夫" },
    { "value": "MLTA", "text": "马耳他" },
    { "value": "MON", "text": "摩纳哥" },
    { "value": "MONG", "text": "蒙古" },
    { "value": "MONT", "text": "蒙特塞拉特岛" },
    { "value": "MORO", "text": "摩洛哥" },
    { "value": "MOZ", "text": "莫桑比克" },
    { "value": "MRTS", "text": "毛里求斯" },
    { "value": "MTG", "text": "黑山" },
    { "value": "NAMB", "text": "纳米比亚" },
    { "value": "NAU", "text": "瑙鲁" },
    { "value": "NEP", "text": "尼泊尔" },
    { "value": "NETH", "text": "荷兰" },
    { "value": "NIC", "text": "尼加拉瓜" },
    { "value": "NIR", "text": "尼日尔" },
    { "value": "NORW", "text": "挪威" },
    { "value": "NRA", "text": "尼日利亚" },
    { "value": "NZLD", "text": "新西兰" },
    { "value": "OMAN", "text": "阿曼" },
    { "value": "PAL", "text": "巴勒斯坦民族权力机构" },
    { "value": "PALA", "text": "帕劳" },
    { "value": "PAN", "text": "巴拿马" },
    { "value": "PARA", "text": "巴拉圭" },
    { "value": "PERU", "text": "秘鲁" },
    { "value": "PHIL", "text": "菲律宾" },
    { "value": "PITC", "text": "皮特开恩群岛" },
    { "value": "PKST", "text": "巴基斯坦" },
    { "value": "PNG", "text": "巴布亚新几内亚" },
    { "value": "POL", "text": "波兰" },
    { "value": "PORT", "text": "葡萄牙" },
    { "value": "PRK", "text": "韩国民主共和国（北）" },
    { "value": "QTAR", "text": "卡塔尔" },
    { "value": "RMI", "text": "马绍尔群岛" },
    { "value": "ROM", "text": "罗马尼亚" },
    { "value": "RUS", "text": "俄罗斯" },
    { "value": "RWND", "text": "卢旺达" },
    { "value": "SAFR", "text": "南非" },
    { "value": "SARB", "text": "沙特阿拉伯" },
    { "value": "SBA", "text": "塞尔维亚" },
    { "value": "SENG", "text": "塞内加尔" },
    { "value": "SEYC", "text": "塞舌尔" },
    { "value": "SHEL", "text": "圣海伦娜" },
    { "value": "SING", "text": "新加坡" },
    { "value": "SLCA", "text": "圣露西亚" },
    { "value": "SLEO", "text": "塞拉利昂" },
    { "value": "SLMN", "text": "所罗门群岛" },
    { "value": "SMAR", "text": "圣马力诺" },
    { "value": "SOMA", "text": "索马里" },
    { "value": "SPN", "text": "西班牙" },
    { "value": "SRL", "text": "斯里兰卡" },
    { "value": "SSAH", "text": "西撒哈拉" },
    { "value": "SSDN", "text": "南苏丹" },
    { "value": "STCN", "text": "圣基茨和尼维斯" },
    { "value": "STPR", "text": "圣多美和普林西比" },
    { "value": "STVN", "text": "圣文森特和格林纳丁斯" },
    { "value": "SUDA", "text": "苏丹" },
    { "value": "SURM", "text": "苏里南" },
    { "value": "SVK", "text": "斯洛伐克" },
    { "value": "SVN", "text": "斯洛文尼亚" },
    { "value": "SWDN", "text": "瑞典" },
    { "value": "SWTZ", "text": "瑞士" },
    { "value": "SYR", "text": "叙利亚" },
    { "value": "SZLD", "text": "斯威士兰" },
    { "value": "TAZN", "text": "坦桑尼亚" },
    { "value": "TCIS", "text": "特克斯和凯科斯群岛" },
    { "value": "THAI", "text": "泰国" },
    { "value": "TJK", "text": "塔吉克斯坦" },
    { "value": "TKM", "text": "土库曼斯坦" },
    { "value": "TMOR", "text": "东帝汶" },
    { "value": "TNSA", "text": "突尼斯" },
    { "value": "TOGO", "text": "多哥" },
    { "value": "TONG", "text": "汤加" },
    { "value": "TRIN", "text": "特立尼达和多巴哥" },
    { "value": "TRKY", "text": "土耳其" },
    { "value": "TUV", "text": "图瓦卢" },
    { "value": "TWAN", "text": "台湾" },
    { "value": "UAE", "text": "阿拉伯联合酋长国" },
    { "value": "UGAN", "text": "乌干达" },
    { "value": "UKR", "text": "乌克兰" },
    { "value": "URU", "text": "乌拉圭" },
    { "value": "UZB", "text": "乌兹别克斯坦" },
    { "value": "VANU", "text": "瓦努阿图" },
    { "value": "VAT", "text": "教廷（梵蒂冈城）" },
    { "value": "VENZ", "text": "委内瑞拉" },
    { "value": "VTNM", "text": "越南" },
    { "value": "WAFT", "text": "沃利斯和富图纳群岛" },
    { "value": "WSAM", "text": "萨摩亚" },
    { "value": "XXX", "text": "无国籍" },
    { "value": "YEM", "text": "也门" },
    { "value": "ZAMB", "text": "赞比亚" },
    { "value": "ZIMB", "text": "津巴布韦" }
]

//职业列表
var OccupationOptions = [
    { "value": "A", "text": "农业" },
    { "value": "AP", "text": "艺术家/表演家" },
    { "value": "B", "text": "商业" },
    { "value": "C", "text": "烹饪/食品服务" },
    { "value": "CM", "text": "通信" },
    { "value": "CS", "text": "计算机科学" },
    { "value": "ED", "text": "教育" },
    { "value": "EN", "text": "工程" },
    { "value": "G", "text": "政府" },
    { "value": "H", "text": "家庭主妇" },
    { "value": "LP", "text": "法律行业" },
    { "value": "M", "text": "军事" },
    { "value": "MH", "text": "医疗/健康" },
    { "value": "N", "text": "待业",showArea:"noWorkArea"},
    { "value": "NS", "text": "自然科学" },
    { "value": "O", "text": "其他" },
    { "value": "PS", "text": "物理学" },
    { "value": "R", "text": "研究" },
    { "value": "RT", "text": "退休" },
    { "value": "RV", "text": "宗教职业" },
    { "value": "S", "text": "学生" },
    { "value": "SS", "text": "社会科学" }
]

;
(function() {
    $(window).data("nationalities", NationalityOptions);
    $(window).data("countries", CountryOptions);
    $(window).data("maritalStatus", MaritalStatusOptions);
    $(window).data("companionRelations", CompanionRelationshipOptions);
    $(window).data("states", StateOptions);
    $(window).data("stayUnits", DateTypeOptions);
    $(window).data("passportTypes", PassportTypeOptions);
    $(window).data("specifies",PurposeSpecifyOptions);
    $(window).data("payTypes",PayForTravelOptions);
    $(window).data("payRelations",PayRelationshipOptions)
    $(window).data("contractRelations",RelationshipUSOptions);
    $(window).data("occupations",OccupationOptions);
    $(window).data("identities",IidentityInUSOptions);
    $(window).data("immediateRelations",OtherRelationshipUSOptions);
    $(window).data("spouseAddrTypes",SpouseAddrOptions);
})()