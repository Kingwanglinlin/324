$(function(){
	
	$("#header").load("header.html");
	
	//函数自执行
	(function(){
	var	oBanner=$(".banner_box");
	var arrBannerOne=oBanner.find(".banner_box0");
	var arrNav=oBanner.find("#ull li");
	var oNext=oBanner.find(".next");
	var oPrev=oBanner.find(".prev");
	var index=0;
		var timer=null;
	arrNav.click(function(){
		index=$(this).index();
		arrBannerOne.stop().fadeOut().eq(index).fadeIn();
		arrNav.removeClass("now");
		$(this).addClass("now");
		animate();
	});
		timer=setInterval(auto,1500);
		function auto(){
			index++;
			if(index>2){
				index=0;
			}
			arrBannerOne.stop().fadeOut().eq(index).fadeIn();
			arrNav.removeClass("now");
			arrNav.eq(index).addClass("now");
			animate();
		}
	oPrev.click(function(){
		index--;
		if(index<0){
			index=2;
		}
		arrBannerOne.stop().fadeOut().eq(index).fadeIn();
		arrNav.removeClass("now");
		arrNav.eq(index).addClass("now");
		animate();
	});

	oNext.click(auto);
	oBanner.mouseenter(function(){
		clearInterval(timer);
	});
	oBanner.mouseleave(function(){
		timer=setInterval(auto,1500)
	});

	$(window).scroll(function(){

			/*大于一屏高度显示返回顶部按钮*/
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop>100){
			clearInterval(timer);
		}

	});
	animate();
	function animate(){
		arrBannerOne.eq(index).find("img").hide();
		arrBannerOne.eq(index).find(".images01").show().addClass("animated fadeInLeft");
		setTimeout(function(){
			arrBannerOne.eq(index).find(".images02").show().addClass("animated fadeInRight");
			arrBannerOne.eq(index).find(".images03").show().addClass("animated fadeIn");
		},300);

	}



	})();


	/*主要产品开始*/
	(function(){
		var ozhuyao=$(".zhuyao");
	var oCon=ozhuyao.find(".con");
	var arrCent=oCon.find(".cent");
	var arrLis=oCon.find('li');
		var aImg=arrLis.find('img');
		var aEm=arrLis.find('em');
		var oNext=oCon.find(".next");
		var oprev=oCon.find(".prev");
		var index=0;
		var timer=null;
		arrLis.click(function(){
			index=$(this).index();
			var action="";
			if($(this).index()>index){
				action="fadeInLeft";
			}else {
				action="fadeInRight";
			}
			move(action);
		});

		function auto(){
			index++;
			if(index>=arrCent.length){
				index=0;
			}
			move("fadeInRight")
		}
		oNext.click(auto);
		oprev.click(function(){
			index--;
			if(index<0){
				index=arrCent.length-1;
			}
			move("fadeInLeft");
		});
		//oCon.mouseenter(function(){
		//	clearInterval(timer);
		//});
		//oCon.mouseleave(function(){
		//	timer=setInterval(auto,2000);
		//});

		move("fadeInRight");
		function move(action){
			arrCent.hide().eq(index).show();
			arrCent.eq(index).find("img,p,.txt-top,span").removeClass("fadeInRight fadeInLeft")
				.addClass("animated "+action);
			aImg.css("display","none").eq(index).css("display","block");
			aEm.css("display","block").eq(index).css("display","none");
		}


	})();


	/*主要产品结束*/
	/*公司简介开始*/

/*公司简介结束*/
	/*业务范围开始*/
	(function(){
		var oYewu=$(".yewu");
		var arrBox1=oYewu.find(".box1");
		var arrImg=oYewu.find(".butimg");
		var arrText2=oYewu.find(".text2");
		var arrEm=oYewu.find("em");
		var index=0;
		arrImg.hover(

			function(){
				arrImg.eq($(this).index(".butimg")).addClass("tada animated");},
			function(){

				arrImg.removeClass("tada animated");
			}

		);
		arrEm.hover(
			function(){
				arrEm.eq($(this).index(".text em")).addClass("tada animated");},
			function(){
				arrEm.removeClass("tada animated");
			}
		);



		arrImg.click(function(){
			index=$(this).index(".butimg");
			if(arrBox1.eq(index).hasClass("show")){
				arrEm.removeClass("zhankai");
				arrText2.slideUp(300);
				arrBox1.removeClass("show");

			}
			else {
				arrBox1.removeClass("show").eq(index).addClass("show");
				arrEm.removeClass("zhankai").eq(index).addClass("zhankai");
				arrText2.slideUp(300).eq(index).delay(300).slideDown();
			}

		});
		arrEm.click(function(){
			index=$(this).index(".text em");
			if(arrBox1.eq(index).hasClass("show")){
				arrEm.removeClass("zhankai");
				arrText2.slideUp(300);
				arrBox1.removeClass("show");

			}
			else {
				arrBox1.removeClass("show").eq(index).addClass("show");
				arrEm.removeClass("zhankai").eq(index).addClass("zhankai");
				arrText2.slideUp(300).eq(index).delay(300).slideDown();
			}

		});

	})();

	/*业务范围结束*/
/*=====团队介绍开始=======*/
	(function(){
			var  content=$(".content");
			var	contentbox=content.find(".content-box");
			var next=content.find(".next");
			var prev=content.find(".prev");
		var timer=null;
		var   Lis=$("#ul").find("li");
		var index=0;
		timer=setInterval(auto,2000);
		function auto(){
			index++;
			if(index>Lis.length-1){
				index=0;
			}
			Lis.removeClass("now").eq(index).addClass("now");
			contentbox.animate({left:"-1100px"},function(){
				contentbox.css("left",0);
				//将warp第一个元素放到warp最后
				contentbox.append($(".content-box .box1").first());
			})
		}
		$(".next").click(
			auto
		);
		$(".prev").click(
			function(){
				index--;
				if(index<0){
					index=Lis.length-1;
				}
				Lis.removeClass("now").eq(index).addClass("now");
				//1.将warp最后元素放到warp第一个位置
				contentbox.prepend($(".content-box .box1").last());
				contentbox.css("left",-1100);
				contentbox.animate({"left":0});

			}
		);
		contentbox.mouseenter(function(){
			clearInterval(timer);
		})
		contentbox.mouseleave(function(){
			timer=setInterval(auto,2000);
		})


	})();
	/*=======团队介绍结束===========*/
	/*=======用户=====*/
	(function(){
		$(".hezuo .box .mokuai em").hover(
			function(){
				if($(".hezuo .box .mokuai em").hasClass("zhankai")){
					$(".hezuo .box .mokuai em").removeClass("zhankai");
				}else {
					$(".hezuo .box .mokuai em").addClass("zhankai");
				}

			}
		)
	})();


	/*======back=======*/
	$(window).scroll(function(){

		/*大于一屏高度显示返回顶部按钮*/
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop>$(window).height()){
			$(".back").fadeIn();
		}else {
			$(".back").fadeOut(0);
		}
	});
	$(".back .img2").click(function(){
		$(this).parent().animate({"bottom":1000,"opacity":0},400,function(){

			$(".back").css("opacity",1).fadeOut(0).css("bottom",200);

		});
		$("body,html").animate({scrollTop:0},400);


			//var stop=null;
			//stop=setInterval(function(){
			//	document.documentElement.scrollTop-=50;
			//	document.body.scrollTop-=50;
			//	if(document.documentElement.scrollTop<=0&&document.body.scrollTop<=0){
			//		clearInterval(stop);
			//	}
			//},10);



	});


	$("#footer").load("footer.html");

});
