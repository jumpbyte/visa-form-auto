// JavaScript Document
function toPublicPopUpMethod(objRedirectPage){
	
	if(document.getElementById('bottomDiv')){
		document.getElementById('detailedInforDiv').removeChild(objIframe);			
		document.getElementById('detailedInforDiv').removeChild(objTitle);									
		document.body.removeChild(objDetailedInfor);								 
	}else{
		var sWidth		= document.documentElement.clientWidth;						//��ǰ������Ŀ��	
		var sHeight		= 0;
			
		var checkHeight	= (document.body.offsetHeight-document.documentElement.clientHeight);

		if(checkHeight > 0){
			sHeight		= document.body.offsetHeight;								//��ǰbody�ĸ߶�
		}else{
			sHeight		= document.documentElement.clientHeight;					//��ǰ������ĸ߶�
		}	

		var bodyHeight	= sHeight;	
		var winWidth  	= sWidth * 0.51;											//�����������
		var winHeight 	= 781.2;													//��������߶�sHeight * 0.8
		var boxWidth	= 1000;														//��Ϣ��ʾ�ײ���
		var boxHeight	= (winHeight-345)											//��Ϣ��ʾ�ײ�߶�
		var titHeight	= 18;														//�����߶�	
		var ifrWidth  	= 994;														//Ƕ����ʾҳ���			
		var ifrHeight 	= (winHeight-270);											//Ƕ����ʾҳ�߶�
		var returnStateValues = '';
		
		//������ɫ͸���ײ㣨͸����0.5��
		var objBottom = document.createElement("div");	
			objBottom.id = 'bottomDiv';
			objBottom.style.position = "absolute";
			objBottom.style.top = "0px";
			objBottom.style.left = "0px";
			objBottom.style.backgroundColor = "#000000";
			objBottom.style.MozOpacity = 0.5;
			objBottom.style.opacity = 0.5;
			objBottom.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
			objBottom.style.width = "100%";
			objBottom.style.border = "0px";
			objBottom.style.height = bodyHeight+"px";
			objBottom.style.overflow = "hidden";
			objBottom.style.zIndex = "10000";
			objBottom.style.padding = "0";
			objBottom.style.margin = "0 auto";
			document.body.appendChild(objBottom);
			
		fadeIn(document.getElementById("bottomDiv"));
		
		//������ʾ��Ϣ�ײ�(�ײ�߿�)
		var objDetailedInfor = document.createElement("div");
			objDetailedInfor.id = 'detailedInforDiv';
			objDetailedInfor.align = 'center';
			objDetailedInfor.style.position = "fixed";
			objDetailedInfor.style.backgroundColor = "white";
			objDetailedInfor.style.border = "3px solid #DDD";
			objDetailedInfor.style.width = boxWidth + "px";
			objDetailedInfor.style.height = (winHeight-220) + "px";
			objDetailedInfor.style.top = (document.documentElement.clientHeight-(winHeight-220))/2+"px";							
			objDetailedInfor.style.left = (document.documentElement.scrollLeft+(document.documentElement.clientWidth-boxWidth)/2)+"px"; 
			objDetailedInfor.style.zIndex = 10001;
			document.body.appendChild(objDetailedInfor);					
		
		//�������ⰴť�㣨�رղ�����
		var objTitle = document.createElement("div"); 
			objTitle.id = 'msgTitle';
			objTitle.align = 'right';
			objTitle.style.backgroundColor = "#DDD";
			objTitle.style.border = "0px";
			objTitle.style.opacity = 0.5;
			objTitle.style.MozOpacity = 0.5;
			objTitle.style.height = titHeight + "px";
			objTitle.style.margin = "2px";
			objTitle.style.padding = "5px";
			objTitle.innerHTML = "<img src='/images/pics/style01/btn_close.png' id='titleImg' class='cur_hand' title= '�� ��' alt='Close' />";
			objTitle.onclick = removeObjDetailedInfor;
			document.getElementById("detailedInforDiv").appendChild(objTitle);					
	
		//Ƕ��ҳ����ʾ��
		var objIframe = document.createElement("iframe");			
			objIframe.id = 'dataLoading';
			objIframe.name = 'dataLoading';
			objIframe.setAttribute("src",objRedirectPage);
			objIframe.setAttribute("align","center");
			objIframe.setAttribute("frameborder", "0", 0);
			objIframe.style.backgroundColor = "white";
			objIframe.style.height = ifrHeight + "px";
			objIframe.style.width = ifrWidth + "px";
			objIframe.style.margin = "0 auto";
			
			document.getElementById("detailedInforDiv").appendChild(objIframe);
	}
	
	function scall(){
		$('detailedInforDiv').style.top = (document.documentElement.scrollTop+(document.documentElement.clientHeight-$('detailedInforDiv').offsetHeight)/2)+"px";							
		$('detailedInforDiv').style.left = (document.documentElement.scrollLeft+(document.documentElement.clientWidth-$('detailedInforDiv').offsetWidth)/2)+"px"; 
	}
	
	function removeObjDetailedInfor(){
		document.getElementById("detailedInforDiv").removeChild(objIframe);			
		document.getElementById("detailedInforDiv").removeChild(objTitle);									
		document.body.removeChild(objDetailedInfor);	
		//document.body.removeChild(document.getElementById("bottomDiv"));	
		
		fadeOut(objBottom,document.getElementById("bottomDiv"),10); 				
	}
	
	function fadeIn(elem, speed, opacity){
	    speed = speed || 20;
	    opacity = opacity || 50;
	    var val = 0;
	    (function(){
	        elem.filters ? elem.style.filter = 'alpha(opacity=' + val + ')' : elem.style.opacity = val / 100;
	        val += 4;
	        if (val <= opacity) {
	            setTimeout(arguments.callee, speed)
	        }
	    })();
	}
	
	function fadeOut(objId, elem, speed, opacity){
	    speed = speed || 20;
	    opacity = opacity || 0;
	    var val = 50;
	    (function(){	
			elem.filters ? elem.style.filter = 'alpha(opacity=' + val + ')' : elem.style.opacity = val / 100;
	        val -= 4;
	        if (val >= opacity) {
	            setTimeout(arguments.callee, speed);
	        }else if (val < 0) {
	            document.body.removeChild(objId);
	        }
	    })();
	}
}

