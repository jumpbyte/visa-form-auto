 
function  Constants(){}
Constants.ADD="add";
Constants.UPDATE="modify";
Constants.VIEW="view";
Constants.COMPLETED="completed";
Constants.CHECK="checking";

  var visaCommon = {
     attachChangeEvent: function() {
         $(document).on("change", "input[type='checkbox']", function() {
             var input = $(this).siblings("input")
             var checked = $(this).prop("checked");
             if (input) {
                 if (checked) {
                     $(input).prop("disabled", true);
                     $(input).val("");
                     $(this).siblings("label.error").remove();
                     $(this).siblings("span").find("label.error").remove();
                     $(this).siblings("span").find("input.text-date-input").val("").prop("disabled", true);
                 } else {
                     $(input).prop("disabled", false);
                     $(this).siblings("span").find("input.text-date-input").prop("disabled", false);
                 }
             }
         });
         $(document).on("change", "input[type='radio'][data-tpl-id]", function() {
             var infoArea = $(this).siblings("div.area"),
                 $controlMenu = infoArea.children("div.control-menu"),
                 $counter = infoArea.children("input[type='hidden'][counter]"),
                 templateId = $(this).data("tpl-id"),
                 count = Number.parseInt($counter.val());
             if (count == 0) {
                 var $clone = visaCommon.repeat(templateId, count);
                 visaCommon.appendDelBtn($clone,count);
                 $clone.insertBefore($controlMenu);
                 autoComplete();
                 $counter.val(1);
             }
         });
         $(document).on("change", "select[data-show-condition]", function() {

             var $option = $(this).find("option:selected");
             var showAreaId = $option.data("show-area");
             
             if(showAreaId != undefined && showAreaId!=''){
            	 showAreaId=showAreaId.indexOf("#")>-1?showAreaId:"#"+showAreaId;
             }
             if (showAreaId) {
                 var $showArea = $(showAreaId);
                 $showArea.show(300) && $showArea.siblings("div.area").not($showArea).hide(300);
             } else {
                 $(this).siblings("div.area").hide(300);
             }
         })
         $(document).on("change", "input[type='radio']", function() {
             var infoArea = $(this).siblings("div.area");
             var checked = $(this).prop("checked");
             var isYes = utils.isYes($(this));
             var isShow = utils.isShow($(this));
             if (infoArea.length > 1) { //有多个同级info-area，表示为互斥填写区域
                 if (checked && isYes) {
                     $(infoArea[0]).show(300);
                     $(infoArea[1]).hide();
                 } else {
                     $(infoArea[1]).show(300);
                     $(infoArea[0]).hide();
                 }
             } else if (checked) {
                 isShow ? infoArea.show(300) : infoArea.hide(300);
             }
         });
     },
     attachAddDelEvent: function() {
         $("div.control-menu").each(function(index) {
             var $controlMenu = $(this),
                 $container = $controlMenu.parent(),
                 $counter = $controlMenu.siblings("input[counter]");

             $controlMenu.on("click", "a:eq(0)", function() {
                 var count = Number.parseInt($counter.val() || 0),
                     expr = "input[type='radio'][data-tpl-id]",
                     templateId = $container.parent().children(expr).data("tpl-id");
                 var $clone = visaCommon.repeat(templateId, count);
                 visaCommon.appendDelBtn($clone,count);
                 $clone.hide().insertBefore($controlMenu);
                 autoComplete();
                 $clone.show(300);
                 $counter.val(count + 1);
             });
             $controlMenu.on("click", "a:eq(1)", function() {
                 var count = Number.parseInt($counter.val() || 0);
                 if (count > 1) {
                     $(this).parent().prev().hide(300, function() {
                         $(this).remove();
                         $counter.val(count - 1);
                     });
                 }
             });
         });
         $(document).on("click","div.repeat a.op-delete",function(){
            var $delItem=$(this).parent();
            var $counter=$delItem.siblings("input[counter]");
            var count = Number.parseInt($counter.val() || 0);
            var index=Number.parseInt($(this).attr("item-index"));
            if(count>1){
                $delItem.parent().children("div.repeat").slice(index+1).each(function(i){
                    var newIndex= i==0 ? index:++index;
                    $(this).find("[id],a.op-delete").each(function(){
                        if(!$(this).attr("item-index")){
                            $(this).attr("id",$(this).attr("id") && $(this).attr("id").replace(/_\d+/g,"_"+newIndex));
                            $(this).attr("name",$(this).attr("name") && $(this).attr("name").replace(/_\d+/g,"_"+newIndex));
                        }else{
                           $(this).attr("item-index",newIndex);
                        }
                    });
                });
                $delItem.hide(300,function(){$(this).remove()}) && $counter.val(count - 1);
            }
         })
     },
     appendDelBtn:function($repeat,count){
         var delBtnHtml="<a href=\"javascript:void(0)\" class=\"op-delete\">删除</a>";
         if($repeat.find("a.op-delete").length==0){
            $repeat.prepend($(delBtnHtml).attr("item-index",count));
         }
     },
     repeat: function(templateId, count) {

         var htmlSource = template(templateId, $(window).data());
         var $clone = $(htmlSource);
         $clone.find("input[type!='radio'],select,textarea").attr("id", function(index, id) {
             return id + "_" + count;
         }).attr("name", function(index, name) {
             return name + "_" + count;
         }).end();
         $clone.find("input[type='radio']").attr("id", function(index, id) {
             if (utils.isYes($(this))) {
                 return id + "Yes_" + count;
             } else if (utils.isNo($(this))) {
                 return id + "No_" + count;
             }
             return id;
         }).attr("name", function(index, name) {
             if (utils.isYes($(this))) {
                 return name + "_" + count;
             } else if (utils.isNo($(this))) {
                 return name + "_" + count;
             }
             return name;
         }).end();
         return $clone;

     },
     render: function(bindId, data) {
         var html = template(bindId, $(window).data());
         return html;
     },
     renderSelect: function(settings, listOptions) {
         var selectSource =
             "<select id=\"{{id}}\" name=\"{{name}}\" title=\"{{title}}\" style='{{style}}' {{autoCompleted &&  'class=auto-completed' }} {{conditioned && 'data-show-condition'}} {{if required}} required {{/if}}>" +
             "<option value='' {{!defaultValue && 'selected=\"selected\"'}} >--请选择--</option>" +
             "{{each list as op index}}" +
             "  {{if  defaultValue==op.value }}" +
             "    <option value=\"{{op.value}}\" {{if op.pinyin}} data-alternative-spellings='{{op.pinyin}}' {{/if}} {{if op.showArea}}  data-show-area='{{op.showArea}}' {{/if}} selected=\"selected\">{{op.text}}</option>" +
             "  {{else}}" +
             "     <option value=\"{{op.value}}\" {{if op.pinyin}} data-alternative-spellings='{{op.pinyin}}' {{/if}} {{if op.showArea}}  data-show-area='{{op.showArea}}' {{/if}} >{{op.text}}</option>" +
             "    {{/if}}" +
             "{{/each}}" +
             "</select>";
         settings.list = listOptions;
         var render = template.compile(selectSource);
         return render(settings);
     },
     fillAllHiddenDate:function(){
         $("input[data-input-type='date']").each(function(){
             var $year=$(this).siblings("span").find("input.date-year");
             var $month=$(this).siblings("span").find("input.date-month");
             var $day=$(this).siblings("span").find("input.date-day");
             var dateValue="";
             if($year.val()){
                 dateValue=$year.val();
             }
            if($month.val()){
                 dateValue+="-"+$month.val();
             }
            if($month.val() && $day.val()){
                  dateValue+="-"+$day.val();
             }
             $(this).val(dateValue||"---");
         })
     },
     createLayer:function(layerId,tipId){
       var layerHtml="<div id=\""+layerId+"\" class=\"loading-shown hidden\">"+
                        "<div class=\"loading-spinner\"></div>"+
                        "<div id=\""+tipId+"\" class=\"loading-tip\" >加载中...</div>"+
                     "</div>";
        return $(layerHtml);
     },
     layer:function(msg){
        msg && $("#loading-tip").html(msg);
        $("body").loading("toggle");
     },
     showInfo:function(msg,delay,callback){
        ZENG.msgbox.show(msg,1,delay,callback);
     },
     showSuccess:function(msg,delay,callback){
        ZENG.msgbox.show(msg,4,delay,callback);
     },
     showError:function(msg,delay,callback){
        ZENG.msgbox.show(msg,5,delay,callback);
     },
     showLoading:function(msg,delay,callback){
         ZENG.msgbox.show(msg,6,delay,callback);
     },
     hideTip:function(timeout,callback){
         ZENG.msgbox.hide(timeout,callback);
     }
 }
 function autoComplete(){
    $("select.auto-completed").selectToAutocomplete();
    $("select.auto-completed").css("display","none")
    utils.setFormDefault(document.forms[0]);
 }

 template.helper("select", function(listOptions, settings) {
     return visaCommon.renderSelect(settings, listOptions);
 });
 template.helper("join",function(array){
   return array.join(",");
 })

 template.helper("renderDate",function(date,options){
     var data={ name:"",
                date:{
                    year:{value:"",required:true},
                    month:{value:"",required:false},
                    day:{value:"",required:false}
                },
                fullDate:""
            };
      data.name = options.name;
      if(date && typeof date==="string"){
            var arr=date.split("-");
            data.date.year = {value:arr[0] ||"",required:options.year || true};
            data.date.month = {value:arr[1] ||"",required:options.month || false};
            data.date.day = {value:arr[2] ||"",required:options.day || false};
            data.fullDate=date;
     }
     var dateSource="<input id=\"{{name}}\" name=\"{{name}}\" value=\"{{fullDate && fullDate}}\" data-input-type=\"date\" type=\"hidden\"  />"+
                    "<span><input id=\"{{name}}-year\" value=\"{{date.year.value}}\" class=\"text-date-input date-year\" {{date.year.required && 'required'}}/><span>年</span></span>"+
                    "<span><input id=\"{{name}}-month\" value=\"{{date.month.value}}\" class=\"text-date-input date-month\" {{date.month.required && 'required'}}/><span>月</span></span>"+
                    "<span><input id=\"{{name}}-day\" value=\"{{date.day.value}}\" class=\"text-date-input date-day\" {{date.day.required && 'required'}}/><span>日</span></span>";
     var render = template.compile(dateSource);
     return render(data);
 });

 var utils = {
     isYes: function(e) {
         return $(e).val().toUpperCase() == "Y" || $(e).val() == "1";
     },
     isNo: function(e) {
         return $(e).val().toUpperCase() == "N" || $(e).val() == "0";
     },
     hasTemplate: function(e) {
         return $(e).data("tpl-id") != undefined && $(e).data("tpl-id") != "";
     },
     isShow: function(e) {
         var showVal = $(e).data("is-show");
         var isYes = utils.isYes($(e));
         var isNo = utils.isNo($(e));
         if (showVal != undefined) {
             return showVal.toUpperCase() == "Y" || showVal == "0";
         }
         if (isYes) {
             return true;
         }
         if (isNo) {
             return false;
         }
         return false;
     },
     getQuery: function(q, url) {
         if (!url) url = window.location + '';
         else url += '';
         var reg = new RegExp("[?&](" + q + ")=([^#&]+)", "i");
         var re = reg.exec(url);
         if (re) return unescape(re[2]);
         else return "";
     },
     formIsDirty:function(form){
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            var type = element.type;
            if (type == "checkbox" || type == "radio") {
                if (element.checked != element.defaultChecked) {
                    return true;
                }
             }   
            else if (type == "hidden" || type == "password" ||
                    type == "text" || type == "textarea") {
                if (element.value != element.defaultValue) {
                    return true;
                }
             }
            else if (type == "select-one" || type == "select-multiple") {
                for (var j = 0; j < element.options.length; j++) {
                    if (element.options[j].selected != element.options[j].defaultSelected) {
                    return true;
                    }
                }
            }
        }
        return false;
     },
     setFormDefault:function(form){
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            var type = element.type;
            if (type == "checkbox" || type == "radio") {
                if(element.checked) element.defaultChecked=element.checked;
             }   
            else if (type == "hidden" || type == "password" ||
                    type == "text" || type == "textarea") {
                element.defaultValue=element.value
             }
            else if (type == "select-one" || type == "select-multiple") {
                for (var j = 0; j < element.options.length; j++) {
                    if (element.options[j].selected) {
                        element.options[j].defaultSelected =element.options[j].selected
                    }
                }
            }
        }
     }
 };

 function VisaFormHelper(options) {
     this.settings = $.extend(true, {}, VisaFormHelper.defaults, options);
 }
 VisaFormHelper.defaults = {
     visaForm: "#visa-form",
     nav:"#tab-nav",
     postUrl: "collect",
     loadDataUrl:"ajaxLoadVisaFormData",
     saveBtn: "#saveBtn",
     nextBtn: "#nextBtn",
     preBtn: "#preBtn",
     checkBtn: "#checkBtn",
     saveTipMessage: "当前页面数据已修改，是否要保存当前页面数据?\n\n\点击\“是\”保存,\“取消\”放弃保存",
     curPage:null,
     pages:[],
     validateOptions: {}
 }

 VisaFormHelper.prototype = {
     init: function() {

         var formId = utils.getQuery("formId");
         formId && $("#para-form-id").val(formId);
         var operation = utils.getQuery("op");
         operation && $("#para-op").val(operation);
         this.curProgress= utils.getQuery("progress");
         this.completed=this.curProgress==Constants.COMPLETED;
         var cfgId=utils.getQuery("cfgId");
         cfgId && $("#para-cfgId").val(cfgId);
         this.visaForm=$(this.settings.visaForm);
         this.saved=false;
         this.checking=utils.getQuery("checking")=="true";
         this.isLastStep=$("#para-lastStep").length>0 && $("#para-lastStep").val()=="true";
         this.curPage=this.settings.curPage;
         this.pages=this.settings.pages;
         this.data = {};
         this.nextUrl = $(this.settings.nextBtn).data("next-url");
         this.preUrl = $(this.settings.preBtn).data("pre-url");
         this.validator = $(this.settings.visaForm).validate(this.settings.validateOptions);
         this.basePara = {
             country: $("#para-country").val(),
             op: $("#para-op").val(),
             formId: $("#para-form-id").val(),
             serialNum: $("#para-form-num").val(),
             progress: $("#para-progress").val(),
             cfgId:$("#para-cfgId").val(cfgId)
         }
         this.ajaxSetting();
         if(this.checking && this.isLastStep){
             $(this.settings.checkBtn).parent().show();
         }
         var curIndex=this.pages.indexOf(this.curPage);
         this.activeTap(curIndex);
         if(this.completed){
             $("div.step-indicator ol li").addClass("step-done");
         }else if(this.checking){
             $("div.step-indicator ol li:last").addClass("step-active")
             .prevAll().addClass("step-done");
             $(this.settings.nav).text("已进入表单检查模式").removeClass().addClass("check-mode-title").children().remove()
        }
         else{
            this.activeStep(curIndex);
         }
         if(this.isViewAction()){
             $("div.operate-menu-area").remove();
         }
     },
     activeTap:function(curIndex){
        var menu=$(".nav > ul > li:eq("+curIndex+")");
        menu.addClass("active").siblings().removeClass("active");
     },
     activeStep:function(curIndex){
        var curIndicator=$("div.step-indicator ol li:eq("+curIndex+")");
        curIndicator.addClass("step-active");
        curIndicator.prevAll().addClass("step-done");
     },
     ajaxSetting:function(){
         $(document).ajaxStart(function(){
        	 
          }).ajaxSuccess(function(){
              //visaCommon.hideTip(600);
         }).ajaxError(function(){
             visaCommon.showError("请求发生错误！",3000);
         });
     },
     bindEvents: function() {
         var _self = this;
         $(this.settings.saveBtn).click(function() {
             _self.save();
         })
         $(this.settings.nextBtn) && $(this.settings.nextBtn).click(function() {
             _self.goNext();
         })
         $(this.settings.preBtn) && $(this.settings.preBtn).click(function() {
             _self.goPre();
         })
         $(this.settings.nav+" ul li a").click(function(){
            _self.onSwitchTab($(this));
         })
        $(this.settings.checkBtn) && $(this.settings.checkBtn).click(function() {
             _self.completeCheck();
         })
     },
     fullChecked: function() {
         return this.validator.form();
     },
     loadFormData: function(formId) {
         var _self = this;
         var result = { success: false, code: "-1", data: {}, message: null };
         var formId = formId || this.basePara.formId;
         !_self.isAddAction() && visaCommon.showLoading("数据拉取中，请稍后...");
         $.ajax({
             type: "POST",
             url: this.settings.loadDataUrl,
             data:"formId=" + formId + "&time=" + new Date().toTimeString(),
             dataType: "JSON",
             async: false,
             success: function(response) {

                 $.extend(result, response);
                 if (result.success) {
                     _self.data = $.parseJSON(result.data);
                     $(window).data("form", _self.data);
                     visaCommon.hideTip(600);
                 } else {
                     visaCommon.showError("获取签证资料表单数据错误！",1500);
                 }
             }
         });
     },
     bindFormData:function(){
         var _self=this;
         $("script[id*='-v-bind']").each(function(){
             var bindId=$(this).attr("id");
             var $area = $(visaCommon.render(bindId, $(window).data()));
             $(_self.settings.visaForm).append($area);
         }) 
         autoComplete();
     },
     submit: function() {
         var _self = this;
         visaCommon.fillAllHiddenDate();
         if (!_self.fullChecked()) {
             visaCommon.showInfo("页面数据填写未校验通过，请根据提示完善信息！",1400);
             return null;
         }
         var formData = $(_self.settings.visaForm).serialize();
         var result = { success: false, code: "-1", data: { formId: 0 }, message: null };
         visaCommon.showLoading("数据保存中，请稍后...");
         $.ajax({
             type: "POST",
             url: _self.settings.postUrl,
             data: formData,
             async: false,
             success: function(response) {
                 $.extend(result, $.parseJSON(response));
                 if (result.success) {
                	 if (_self.isAddAction()) { //添加操作成功后修改基础参数
                        $("#para-op").val("modify");
                        $("#para-form-id").val(result.data.formId);
                        _self.basePara.op =Constants.UPDATE;
                        _self.basePara.formId = result.data.formId;
                        _self.saved=true;
                    }
                    utils.setFormDefault(_self.visaForm.get(0));
                    visaCommon.hideTip();
                 }
             }
         })
         return result;
     },
     save: function() {
         if(this.saved && !utils.formIsDirty(this.visaForm.get(0))){
             visaCommon.showInfo("当前没有做任何修改",1400);
             return;
         }
         var result = this.submit();
         if (!result) return;
         if (result.success) {
             if(!this.isLastStep){
                visaCommon.showSuccess("保存成功！",1200);
             }else if(this.isLastStep && !this.checking){
                if(confirm("保存成功，是否开始检查？\n\n点击“是”进入检查模式，“取消”则跳过检查完成提交!")){
                    var params={
                            formId:this.basePara.formId,
                            progress:this.basePara.progress,
                            op:Constants.UPDATE,
                            checking:true
                        }
                    location.href="loadPersonalInfo?"+$.param(params);
                }else{
                    this.completeCheck();
                }
            }
         } else {
             visaCommon.showError("当前页面数据保存失败！",1200);
         }
     },
     goPre: function() {
        var _self=this;
        var redirect=function(){
            var params={
                    formId:_self.basePara.formId,
                    progress: _self.completed?Constants.COMPLETED:_self.basePara.progress,
                    op:Constants.UPDATE,
                    checking:_self.checking
                }
             location.href=_self.preUrl +"?"+$.param(params);
        }
        if(utils.formIsDirty(_self.visaForm.get(0))){
            var result = this.submit();
            if (!result) return;
            if(result.success){
               visaCommon.showSuccess("保存成功！",1200,redirect);
               return;
            }else{
                visaCommon.showError("当前页面数据保存失败，无法进入上一步！",1200);
                return;
            }
        }else{
            redirect();
        }
     },
     goNext: function() {
         var _self=this;
         var redirect=function(){
             var params={
                 formId:_self.basePara.formId,
                 progress: _self.completed?Constants.COMPLETED:_self.basePara.progress,
                 op:_self.getNextOp(),
                 checking:_self.checking
             }
             location.href=_self.nextUrl +"?"+$.param(params);
         }
         if(utils.formIsDirty(_self.visaForm.get(0))){
            var result = this.submit();
            if (!result) return;
            if (result.success) {
                visaCommon.showSuccess("保存成功！",1200,redirect);
                return;
            } else {
                visaCommon.showError("当前页面数据保存失败，无法进入下一步！",1200);
                return;
            }
         }else{
             redirect();
         }
     },
     onSwitchTab: function(tab) {
         var _self = this;
         var tabUrl = $(tab).parents("li[data-tab-url]").data("tab-url");
         var page=$(tab).parents("li[data-tab-url]").data("page");
         var scrollId=$(tab).data("scroll-id");
         if(this.settings.curPage==page) return;
         if(this.checking) {
             visaCommon.showInfo("您已经进入检查模式,无法切换页面，请通过【上/下】一步顺序检查！",1200);
             return;
         }
         var tabOp=this.getTabOp(page);
         if(!tabOp) {
             visaCommon.showInfo("不能切换到此页面，请点击下一步顺序填写！",1200);
             return;
         }
         var redirect=function(){
            var params={
                formId: _self.basePara.formId,
                progress: _self.completed?Constants.COMPLETED:_self.basePara.progress,
                op:_self.isViewAction()?Constants.VIEW:tabOp
            }
           location.href = tabUrl + "?"+$.param(params)+(scrollId?"#"+scrollId:"");
         }
         if(!this.isViewAction() && utils.formIsDirty(this.visaForm.get(0))){
             if(confirm(this.settings.saveTipMessage)){
                var result = this.submit();
                if (!result) return;
                if (result.success){
                    visaCommon.showSuccess("保存成功！",1200,redirect);
                }else{
                    visaCommon.showError("当前页面数据保存失败，无法切换页面！",1200);
                    return;
                }
             }else{
                 redirect();
             }
         }else{
             redirect();
         }
     },
     completeCheck: function() {
         var _self=this;
         if(!_self.completed){
            var result = { success: false, code: "-1", data: { formId: 0 }, message: null };
            visaCommon.showInfo("正在提交中...");
            $.ajax({
                type: "POST",
                url: "completeFillCheck",
                data: {formId:_self.basePara.formId,time:new Date().toTimeString()},
                async: false,
                success: function(response) {
                    $.extend(result, $.parseJSON(response));
                    if (result.success) {
                        visaCommon.showSuccess("完成填写提交成功！",1200,function(){
                            location.href="loadVisaFormDataList";
                        });
                    }else{
                        visaCommon.showError("更新检查状态失败，请稍后重试！",1200);
                    }
                }
            })
        }else{
        	location.href="loadVisaFormDataList";
        }
     },
     isAddAction: function() {
         return this.basePara.op && this.basePara.op == Constants.ADD;
     },
     isUpdateAction: function() {
         return this.basePara.op && this.basePara.op == Constants.UPDATE && this.basePara.formId;
     },
     isViewAction:function(){
        return this.basePara.op && this.basePara.op == Constants.VIEW ;
     },
     havaPreSetp: function() {
         return $(this.settings.preBtn) && $(this.settings.preBtn).length == 1;
     },
     havaNextStep: function() {
         return $(this.settings.nextBtn) && $(this.settings.nextBtn).length == 1;
     },
     getNextOp:function(){
         return Constants.ADD;
     },
     getTabOp:function(page){
        return null;
     }
 };

 (function($) {
     $(document).ready(function() {
         visaCommon.attachChangeEvent();
         visaCommon.attachAddDelEvent();
         //动态加入验证函数
         $.validator.addMethod("phone", function(value) {
             return /^[\d]+$/.test(value);
         }, '请输入正确的电话号码');
         $.validator.addMethod("idCardNum", function(value) {
             return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
         }, '请输入正确的身份证号');
         $.validator.addMethod("passport", function(value) {
             return /(^1[45][0-9]{7}|[GE][0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$)/.test(value);
         }, '请输入正确的护照号');
         $.validator.addMethod("english", function(value) {
             return /^([A-Za-z-0-9]+(\s)?([A-Za-z-0-9])?[^\s].)+$/.test(value);
         }, '请输入英文,单词之间空格不能多于1个!');

         $.validator.addMethod("year", function(value) {
             return /^\d{4}$/.test(value);
         }, '年份格式不正确!');
         $.validator.addMethod("month", function(value) {
             return /^0?[1-9]$|^[1][0-2]$/.test(value);
         }, '月份格式不正确!');
         $.validator.addMethod("day", function(value) {
             return /^0?[1-9]$|^[1-2][0-9]$|^[3][0-1]$/.test(value);
         }, '格式不正确!');

         $.validator.addClassRules("passport", {
             required: true,
         });
         $.validator.addClassRules("english", {
             required: true,
             english: true
         });
         $.validator.addClassRules("phone", {
             required: true,
             phone: true
         });
         $.validator.addClassRules("address", {
             required: true,
             maxlength: 88
         });

         $.validator.addClassRules("date-year", {
             required: true,
             year: true
         });
         $.validator.addClassRules("date-month", {
             month: true
         });
         $.validator.addClassRules("date-day", {
             day: true
         });
         autoComplete();
     })
 })(jQuery);