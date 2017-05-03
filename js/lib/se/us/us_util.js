var usUtil = {
    getMarriedStatus: function(form) {
        var pInfo = form && form.personalInfo;
        if (pInfo) {
            return pInfo.maritalStatus;
        } else {
            throw "获取婚姻状态错误！personalInfo为null";
        }
    },
    isSingle: function(form) {
        var status = usUtil.getMarriedStatus(form);
        return status == "S";
    },
    isMarried: function(form) {
        var status = usUtil.getMarriedStatus(form);
        return "M,C,P,L".indexOf(status) > -1;
    },
    isDivorced: function(form) {
        var status = usUtil.getMarriedStatus(form);
        return status == "D";
    },
    isWidowed: function(form) {
        var status = usUtil.getMarriedStatus(form);
        return status == "W";
    },
    isOtherMarriedStatus: function() {
        var status = usUtil.getMarriedStatus(form);
        return status == "O";
    },
    isChild: function(form) {
        var birth = form && form.personalInfo && form.personalInfo.birth;
        if (birth) {
            var birthDate = new Date(birth.birthDate);
            var nowDate = new Date();
            return nowDate.getFullYear() - birthDate.getFullYear() < 14;
        } else {
            throw "无出生日期，无法判断是否为小孩";
        }
    },
    isWETInfoHidden:function(form){
        if(usUtil.isChild(form)){
            $("[data-page='E']").attr("class","hidden");
            $("ol li:eq(3)").remove();
            $("ol").attr("class","ui-step ui-step-5");
               for(i=0;i<$(".ui-step-cont-number").length;i++){
                    $(".ui-step-cont-number:eq("+i+")").html(i+1);
              }
            return true;
        }else{
            return false;
        }
        
    },

    getTapOp:function(form,page){
        var tapOpFns={
            "P":function(){
                if(form && form.personalInfo){
                    return Constants.UPDATE
                }else{
                    return Constants.ADD;
                }
            },
            "T":function(){
                if(form && form.travelInfo){
                    return Constants.UPDATE
                }else{
                    return Constants.ADD;
                }
            },
            "R":function(){
                if(form && form.familyInfo){
                    return Constants.UPDATE
                }else{
                    return Constants.ADD;
                }
            },
            "E":function(){
                if(form && form.wetInfo){
                    return Constants.UPDATE
                }else{
                    return Constants.ADD;
                }
            },
            "O":function(){
                if(form && form.backgroundInfo){
                    return Constants.UPDATE
                }else{
                    return Constants.ADD;
                }
            }
        };
        if(!tapOpFns[page]) throw "page参数有误，参数值必须是P,T,R,E,O中的任意一个！";
        return  tapOpFns[page]();
    }
}