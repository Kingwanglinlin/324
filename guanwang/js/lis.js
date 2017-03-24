/**
 * Created by KingWang on 2017/3/10.
 */
//GLOBAL存储全局变量
var GLOBAL=GLOBAL||{};
$(function(){
    $("#header").load("header.html");


    (function(){
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

    });
    })();
/*==========返回顶部结束============*/
/*============列表线=================*/
    (function(){
        $(".pen").click(function(){

            $(".biao").css({"width":"120px","background-position-x":"-1000px"}).stop()
                .animate({"width":"1100px","background-position-x":"0px"},1000)
        })
    })();

    $("#footer").load("footer.html");
    /*========================================*/



    loadArticleList();


    $("#listmore").click(function(){
        if(GLOBAL.pageStart<GLOBAL.pageCount){
            loadArticleList();
            $(".bottom .more").show();
        }
        else {
            $(".bottom .more").hide();
            $(".bottom .none").show();
        }

    });


    /*==========点击跳转========*/
    $("#articleList").delegate(".box","click",function(){
        var articleId=$(this).attr("articleid");
        window.open("article.html?articleid="+articleId+"&type=xiaoniaoNews");
    });
//  事件绑定
//    事件流分为3个阶段     1.事件捕获  2.事件目标阶段   3.事件冒泡
//   事件委托 delegate()     将子元素发生的事件交由父元素执行
//
//


    /*==========点击跳转=结束=======*/
});


/*====================加载数据==========================*/

function loadArticleList(){

//    清除假数据

    if(!GLOBAL.pageStart){
        GLOBAL.pageStart=0;
        $("#articleList").html("")
    }

    //$.ajax({
    //    url:"http://192.168.3.153//listData.php", //连接localhost下的listData.php文件。
    //    type:"GET",  //请求方式
    //    data:{
    //        page:GLOBAL.pageStart  //页数
    //    },
    //    success:function(data){  //成功之后
    //        //    string-->json
    //        //json.parse(data),
    //        //alert(JSON.stringify(JSON.parse(data)));
    //        showData(JSON.parse(data));
    //    }
    //});


    $.ajax({
        url:"http://localhost//listData.php", //连接localhost下的listData.php文件。
        type:"GET",  //请求方式
        data:{
            page:GLOBAL.pageStart   //页数
        },
        success:function(data){  //成功之后
            showData(JSON.parse(data));
        }
    });

}
function showData(data){
    var list=data.data.list;
    for(var i=0;i<list.length;i++){
    //    获取模版
    //    更改模版内容
        var model=$("#itemHTML").html();
        var updateTime=list[i].creatAt||list[i].updateTime;
        model=model.replace("$articleId$",list[i].sysId)
            .replace("$articleCover$",list[i].coverImg)
            .replace("$articleTitle$",list[i].title)
            .replace("$updateTime$",updateTime)
            .replace("$descride$",list[i].describe);
            $("#articleList").append(model);
    }

    //判断是否有数据可以进行加载
    var count=data.data.count;
    GLOBAL.pageStart++;
    GLOBAL.pageCount=Math.ceil(count/data.data.pageSize);

//    没有数据加载

    if(GLOBAL.pageStart>=GLOBAL.pageCount){
        $("#listmore").fadeTo(100,0.3);
    }
}




//function loadArticleList(){
////    1.第一次加载
////pageStart  数据开始位置
//    if(!GLOBAL.pageStart){
//        GLOBAL.pageStart=0;
//        $("#articleList").html("");
//    }
//
////   2.请求到数据
//    var result=listData["listData0"+GLOBAL.pageStart];
//    var list=result.data.list;
//
////    3.模版
////<div id="#itemHTM" style="display: none;">
////        <div class="box" acticleid="$acticleId$">
////        <img src="$articleCover$" alt="">
////        <div class="text">
////        <h5>$articleTitle$</h5>
////        <span>$updateTime$</span>
////        <p>$descride$</p>
////        </div>
////        <div class="sanjiao"></div>
////        </div>
//// </div>
//
//if(!list||!list.length){
//    $("#articleList").html("没有可加载的数据");
//}else {
//    for(var i=0;i<list.length;i++){
//        var model=$("#itemHTML").html();
//        var updateTime=list[i].creatAt||list[i].updateTime;
//        model=model.replace("$articleId$",list[i].sysId)
//            .replace("$articleCover$",list[i].coverImg)
//            .replace("$articleTitle$",list[i].title)
//            .replace("$updateTime$",updateTime)
//            .replace("$descride$",list[i].describe);
//            $("#articleList").append(model);
//    }
//    GLOBAL.pageStart++;
//    //判断是否有数据可以进行加载
//    var count=result.data.count;
//    GLOBAL.pageCount=Math.ceil(count/result.data.pageSize);
////    没有数据加载
//    if(GLOBAL.pageStart>=GLOBAL.pageCount){
//        $("#listmore").fadeTo(100,0.3);
//    }
//}
//
//}