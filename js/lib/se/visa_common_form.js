 
function  Constants(){}
Constants.ADD="add";
Constants.UPDATE="update";
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
                 } else {
                     $(input).prop("disabled", false);
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
                 $clone.insertBefore($controlMenu);
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
                 $clone.hide().insertBefore($controlMenu);
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
             "<select id=\"{{id}}\" name=\"{{name}}\" title=\"{{title}}\" style='{{style}}'  {{conditioned && 'data-show-condition'}} {{if required}} required {{/if}}>" +
             "<option value=''>--请选择--</option>" +
             "{{each list as op index}}" +
             "  {{if  defaultValue==op.value }}" +
             "    <option value=\"{{op.value}}\"  data-show-area='{{op.showArea}}' selected=\"selected\">{{op.text}}</option>" +
             "  {{else}}" +
             "     <option value=\"{{op.value}}\" data-show-area='{{op.showArea}}' >{{op.text}}</option>" +
             "    {{/if}}" +
             "{{/each}}" +
             "</select>";
         settings.list = listOptions;
         var render = template.compile(selectSource);
         return render(settings);
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
     }
 }

 template.helper("select", function(listOptions, settings) {
     return visaCommon.renderSelect(settings, listOptions);
 });
 template.helper("join",function(array){
   return array.join(",");
 })

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
         var reg = new RegExp("[#?&](" + q + ")=([^&]+)", "i");
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
     }
 };

 function VisaFormHelper(options) {
     this.settings = $.extend(true, {}, VisaFormHelper.defaults, options);
 }
 VisaFormHelper.defaults = {
     visaForm: "#visa-form",
     nav:"#tab-nav",
     postUrl: "collect",
     loadDataUrl:"http://localhost:9615/result.json",//"ajaxLoadVisaFormData",
     saveBtn: "#saveBtn",
     nextBtn: "#nextBtn",
     preBtn: "#preBtn",
     checkBtn: "#checkBtn",
     saveTipMessage: "当前页面数据已修改，是否要保存当前页面数据?\n\点击\"是\"保存,\"取消\"则不保存",
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
         var progress= utils.getQuery("op");
         progress==Constants.COMPLETED && $("#para-progress").val(progress);
         var cfgId=utils.getQuery("cfgId");
         cfgId && $("#para-cfgId").val(cfgId);
         this.visaForm=$(this.settings.visaForm);
         this.saved=false;
         this.isInCheck=utils.getQuery("checking")=="true";
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
         this.completed=this.basePara.progress==Constants.COMPLETED;
         if(this.isInCheck && this.isLastStep){
             $(this.settings.checkBtn).parent().show();
         }
         if(this.completed){
             $("div.step-indicator ol li").addClass("step-done");
         }else if(this.isInCheck){
             $("div.step-indicator ol li:last").addClass("step-active")
             .prevAll().addClass("step-done");
             $(this.settings.nav).text("已进入表单检查模式").removeClass().addClass("check-mode-title").children().remove()
         }
         else{
             var curIndex=this.pages.indexOf(this.curPage);
             var curIndicator=$("div.step-indicator ol li:eq("+curIndex+")");
             curIndicator.addClass("step-active");
             curIndicator.prevAll().addClass("step-done");
         }
     },
     ajaxSetting:function(){
         $(document).ajaxStart(function(){
             visaCommon.layer("请求处理中...");
          }).ajaxComplete(function(){
              visaCommon.layer();
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
        $(this.settings.checkBtn) && $(this.settings.preBtn).click(function() {
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
         $.ajax({
             type: "GET",
             url: this.settings.loadDataUrl,
             data: null,//"formId=" + formId + "&time=" + new Date().toTimeString(),
             dataType: "JSON",
             async: false,
             success: function(response) {
                 $.extend(result, response);
                 if (result.success) {
                     _self.data = $.parseJSON(result.data);
                     $(window).data("form", _self.data);
                 } else {
                     alert("获取签证资料表单数据错误！");
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
     },
     submit: function() {
         var _self = this;
         if (!_self.fullChecked()) {
             alert("页面数据填写未校验通过，请根据提示完善信息！");
             return null;
         }
         var formData = $(_self.settings.visaForm).serialize();
         var result = { success: false, code: "-1", data: { formId: 0 }, message: null };
         $.ajax({
             type: "POST",
             url: _self.settings.postUrl,
             data: formData,
             async: false,
             success: function(response) {
                 $.extend(result, $.parseJSON(response));
                 if (result.success) {
                     _self.saved=true;
                 }
             }
         })
         return result;
     },
     save: function() {
         var result = this.submit();
         if (!result) return;
         if (result.success) {
             if (this.isAddAction()) { //添加操作成功后修改基础参数
                 $("#para-op").val("update");
                 $("#para-form-id").val(result.data.formId);
                 this.basePara.op =Constants.UPDATE;
                 this.basePara.formId = result.data.formId;
             }
             if(!this.isLastStep){
                 alert("保存成功！");
             }else if(this.isLastStep && !this.isInCheck){
                if(confirm("保存成功，是否开始检查?")){
                    var params={
                            formId:this.basePara.formId,
                            progress:this.basePara.progress,
                            op:Constants.UPDATE,
                            checking:true
                        }
                    location.href="loadPersonalInfo?"+$.param(params);
                }
            }
         } else {
             alert("当前页面数据保存失败！");
         }
     },
     goPre: function() {
         var result = this.submit();
         if (!result) return;
         if (result.success) {
             var params={
                 formId:this.basePara.formId,
                 progress:this.basePara.progress,
                 op:Constants.UPDATE,
                 checking:this.isInCheck
             }
             location.href=this.preUrl +"?"+$.param(params);
         } else {
             alert("当前页面数据保存失败，无法进入上一步！");
         }
     },
     goNext: function() {
         var result = this.submit();
         if (!result) return;
         if (result.success) {
             var params={
                 formId:result.data.formId || this.basePara.formId,
                 progress:this.basePara.progress,
                 op:this.getNextOp(),
                 checking:this.isInCheck
             }
             location.href = this.nextUrl +"?"+$.param(params);
         } else {
             alert("当前页面数据保存失败，无法进入下一步！");
         }
     },
     onSwitchTab: function(tab) {

         var tabUrl = $(tab).parents("li[data-tab-url]").data("tab-url");
         var page=$(tab).parents("li[data-tab-url]").data("page");
         var scrollId=$(tab).data("scroll-id");
         if(this.settings.curPage==page) return;
         if(this.isInCheck) {
             alert("您已经进入检查模式,无法切换页面，请通过【上/下】一步顺序检查！");
             return;
         }
         var tabOp=this.getTabOp(page);
         if(!tabOp) {
             alert("不能切换到此页面，请点击下一步顺序填写");
             return;
         }
         if(!this.saved && utils.formIsDirty(this.visaForm.get(0))){
             if(confirm(this.settings.saveTipMessage)){
                var result = this.submit();
                if (!result) return;
                if (!result.success){
                    alert("当前页面数据保存失败，无法切换页面！");
                    return;
                }
             }
         }
         var params={
            formId: this.basePara.formId,
            progress: this.basePara.progress,
            op:tabOp
         }
         location.href = tabUrl + "?"+$.param(params)+(scrollId?"#"+scrollId:"");
     },
     completeCheck: function() {
         var _self=this;
         if(!_self.completed){
            var result = { success: false, code: "-1", data: { formId: 0 }, message: null };
            $.ajax({
                type: "POST",
                url: "completeFillCheck",
                data: {formId:_self.basePara.formId,time:new Date().toTimeString()},
                async: true,
                success: function(response) {
                    $.extend(result, $.parseJSON(response));
                    if (result.success) {
                        alert("完成检查提交成功！");
                        location.href="loadVisaFormDataList";
                    }else{
                        alert("更新检查状态失败，请稍后重试！");
                    }
                }
            })
        }
     },
     isAddAction: function() {
         return this.basePara.op && this.basePara.op == Constants.ADD;
     },
     isUpdateAction: function() {
         return this.basePara.op && this.basePara.op == Constants.UPDATE && this.basePara.formId;
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
     },
     isCompelted:function(){
         return this.basePara.progress==Constants.COMPLETED
     }
 };

 (function() {
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
             return /(^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$)/.test(value);
         }, '请输入正确的护照号');
         $.validator.addMethod("english", function(value) {
             return /^([A-Za-z]+(\s)?[A-Za-z]+)+$/.test(value);
         }, '请输入英文,单词之间空格不能多于1个!');

         $.validator.addClassRules("passport", {
             required: true,
             passport: true
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
         visaCommon.createLayer("custom-overlay","loading-tip").appendTo($("body"));
         $.Loading.setDefaults({
             overlay: $("#custom-overlay"),
             onStop: function(loading) {
                    loading.overlay.hide()
                }
            })
     })
 })();