/**
 * Created by KingWang on 2017/3/10.
 */
var  GLOBAL= GLOBAL||{};
$(function(){
    //整屏轮播开始
    //$(window).width();
    complateSize();
    setTimeout(complateSize,1)
    function complateSize() {
        GLOBAL.width=($(window).width());
        $(".main_wrap,.main_slide,.wrap_block").width($(window).width());
        GLOBAL.height=$(window).height() - 50;
        $(".main_wrap,.wrap_block").height($(window).height() - 50);
        $(".welcome_warp").width($(window).width());
        $(".welcome_warp").height($(window).height()-50);
        $(".big").width($(window).width()*3);
        $(".big .banner").width($(window).width());
        $(".big .banner").height(GLOBAL.height);
    }
    //resize 事件    窗口大小被改变
    $(window).resize(function(){
        complateSize()
        setTimeout(complateSize,1)
        mouseScrollMove()
    });

    window.onmousewheel=mouseScroll;//ie  chorme
    window.addEventListener("DOMMouseScroll",mouseScroll);//    firefox

    GLOBAL.mouseScrollIndex=0;
    var aWarpBlock=$(".wrap_block");
    var oMainSlide=$(".main_slide");
    //控制每两秒能切换一个页面
    GLOBAL.slidingTimer=null;
    GLOBAL.slidingDalay=1000;
    GLOBAL.slidingGoing=false;
    //滚轮第一次动作  不允许滚动  false 不是第一次允许翻页
    GLOBAL.isFirstSlide=true;
    GLOBAL.isFirstSlideTimer=null;
    //  向上滚动
        function mouseScrollUP(){
            //控制每两秒能切换一个页面  开始
            if(!GLOBAL.slidingGoing){
                GLOBAL.slidingGoing=true;
                GLOBAL.slidingTimer=setTimeout(function(){
                    GLOBAL.slidingGoing=false
                },GLOBAL.slidingDalay)
            }else {
                return;
            }
            //控制每两秒能切换一个页面   结束
            //滚轮第一次动作  不允许滚动  false 不是第一次允许翻页  开始
            if(GLOBAL.isFirstSlide){
                if(!GLOBAL.isFirstSlideTimer) {
                    GLOBAL.isFirstSlideTimer = setTimeout(function () {
                        GLOBAL.isFirstSlide = false;
                        GLOBAL.isFirstSlideTimer=null;
                    }, 20);
                }
                return;
            }
            GLOBAL.isFirstSlide=true;
            //滚轮第一次动作  不允许滚动  false 不是第一次允许翻页   结束

           GLOBAL.mouseScrollIndex --;
            if(GLOBAL.mouseScrollIndex<0){
                GLOBAL.mouseScrollIndex=0  ;
            }
            mouseScrollMove()
        }
    //    向下滚动
        function mouseScrollDown(){
            if (!GLOBAL.welcomeAnimateOver){
                return;
            }
            //控制每两秒能切换一个页面  开始
            if(!GLOBAL.slidingGoing){
                GLOBAL.slidingGoing=true;
                GLOBAL.slidingTimer=setTimeout(function(){
                    GLOBAL.slidingGoing=false
                },GLOBAL.slidingDalay)
            }else {
                return;
            }
            //控制每两秒能切换一个页面   结束
            //滚轮第一次动作  不允许滚动  false 不是第一次允许翻页  开始
            if(GLOBAL.isFirstSlide){
                if(!GLOBAL.isFirstSlideTimer) {
                    GLOBAL.isFirstSlideTimer = setTimeout(function () {
                        GLOBAL.isFirstSlide = false;
                        GLOBAL.isFirstSlideTimer=null;
                    }, 20);
                }
                return;
            }
            GLOBAL.isFirstSlide=true;
            //滚轮第一次动作  不允许滚动  false 不是第一次允许翻页   结束
            GLOBAL.mouseScrollIndex ++;
            if(GLOBAL.mouseScrollIndex>aWarpBlock.length){
                GLOBAL.mouseScrollIndex=aWarpBlock.length-1  ;
            }
            mouseScrollMove()
        }
    function mouseScrollMove(){
        oMainSlide.animate({top:GLOBAL.mouseScrollIndex*-GLOBAL.height})
        if(GLOBAL.mouseScrollIndex==0||GLOBAL.mouseScrollIndex==1){
            $(".nar li").removeClass("now").eq(0).addClass("now");
        }else if(GLOBAL.mouseScrollIndex==4){
            $(".nar li").removeClass("now");
            $(".nar li").eq(3).addClass("now");
            $(".nar li").eq(4).addClass("now");
        }else {
            $(".nar li").removeClass("now").eq(GLOBAL.mouseScrollIndex-1).addClass("now");
        }

    }
    //判断滚轴滚动方向
    function mouseScroll(ev){
            //判断滚轴滚动方向     //事件对象兼容
            var oEvent=ev||window.event;
            // 兼容性问题  判断方向  ie/chrome  wheelDelta         firefox   detail
            if(oEvent.wheelDelta){
                if(oEvent.wheelDelta<0){
                //    向下滚动
                    mouseScrollDown()
                }else {
                //    向上滚动
                    mouseScrollUP()
                }
            }else {
                if(oEvent.detail>0){
                    //    向下滚动
                    mouseScrollDown()
                }else {
                    //    向上滚动
                    mouseScrollUP()
                }
            }
        }
    $(".nar li").click(function(){
        var index=$(this).index();
        if(index==4||index==3){
            GLOBAL.mouseScrollIndex=4;
            $(".nar li").removeClass("now").eq(3).addClass("now");
            $(".nar li").eq(4).addClass("now")
        }else if(index==5){
            return;
        }else {
            $(".nar li").removeClass("now").eq(index).addClass("now");
            GLOBAL.mouseScrollIndex = index + 1;
        }

        mouseScrollMove()
    });
    //整屏轮播结束
//    欢迎页
// 1 图片在4S后上移
// 2文字按照顺序依此出现
//    3 蓝色欢迎页收起 slidingUp

    GLOBAL.welcomeAnimateOver=false;
    doWelcomeAnimate();
    function doWelcomeAnimate(){
        setTimeout(function(){
            $(".welcome_warp .gif").animate({top:"30%"},600,function(){
                $(".welcome_warp .welcome_animate").each(function(index){
                    var $this=$(this);
                    setTimeout(function(){
                        $this.show().addClass("animated fadeInUp")
                    },200*index);
                });
            });
        },4000);
        setTimeout(function(){
            $(".welcome_warp").slideUp();
            GLOBAL.welcomeAnimateOver=true;
        },6000)
    }
    $(".welcome_warp").dblclick(function(){
        $(".welcome_warp").slideUp();
        GLOBAL.welcomeAnimateOver=true;
    });
//    1.动画结束前  滚轴操纵轮播图
//    2.当屏幕放大或缩小时，能够修正到正确位置
//    3. 导航
//    双击

//概述
    (function(){
        var timer=null;
        var index=0;
    $(".next").click(function() {
        $(".prev").removeClass("now");
        if (index >= $(".banner").length-1) {
            $(".next").addClass("now");
            return
        };
        index++;

        if (index<=$(".banner").length-1) {
            $("#bannerBox .big").stop().animate({"left":-GLOBAL.width*(index)})
        }
    });
    $(".prev").click(function(){
            $(".next").removeClass("now");
           if(index<=0){
               $(".prev").addClass("now");
               return
           };
            index--;
            if(index>=0){
                $("#bannerBox .big").stop().animate({"left":-GLOBAL.width*(index)})
            }
        }
    );
    })();
//  公司价值
    (function(){
        var timer=null;
        timer= setInterval(function(){
            $(".jiazhi .action").fadeToggle();
        },1000)
    })();
//    小鸟掌云
    (function(){
        $(".zhangxue .span1").hover(function(){

            $(".zhangxue .em1").animate({"left":0},300)
            $(".zhangxue .em2").animate({"left":-78},300)
            $(".box2").removeClass("now").eq(0).addClass("now");
        })
        $(".zhangxue .span2").hover(function(){
            $(".zhangxue .em2").animate({"left":0},300)
            $(".zhangxue .em1").animate({"left":78},300)
            $(".box2").removeClass("now").eq(1).addClass("now");
        })
    })();

    (function(){
        //1.确定连接到那一页
        var index=location.hash.substr(1);
        //2.如果存在页码  跳过欢迎页
        if (index){
            $(".welcome_warp").hide();
            GLOBAL.welcomeAnimateOver=true;
            GLOBAL.mouseScrollIndex=index;
            mouseScrollMove();
        }
    })();



});