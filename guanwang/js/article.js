/**
 * Created by KingWang on 2017/3/10.
 */
var GLOBAL=GLOBAL||{};
$(function(){
    $("#header").load("header.html");
        //alert(getUrlParams("articleid"));
        //alert(getUrlParams("type"));
        //GLOBAL避免资源冲突？
    (function(){
        GLOBAL.articleid=getUrlParams("articleid");
        GLOBAL.type=getUrlParams("type");
        LoadArticlData()
    })();



/*========收藏======*/
    (function() {
        var arrayRanSkip=["终于等到你啦~","么么哒~","对你爱不完呢","再点有惊喜~"];
        GLOBAL.firstClick=true;//表示第一次点击
        $(".tu").click(function () {
            if (GLOBAL.firstClick) {
                GLOBAL.firstClick=false;
                var index=Math.floor(Math.random()*arrayRanSkip.length);
                var content=arrayRanSkip[index];
                $(".like_tips").html(content);
                doMOve()
            } else if ($(".like_tips").html()=="再点有惊喜~") {
                $(".like_tips").html("还真有人点耶！");
                doMOve()
            }

        });
        function  doMOve(){
        //    小块移动
            $(".like_tips").animate({top:0,opacity:1},600,"elasticOut")
                .delay(600)
                .animate({left:-400,opacity:0},600,"backIn",function(){

                    $(".like_tips").css({"left":0,"top":300});
                    $(".tu").css("background-position", "0 -73px");

                })



        }
        $(".tu").hover(function () {
                $(".tu").addClass("active");
                $(".biao").css("width", "135px");

            }
            , function () {
                $(".tu").removeClass("active");
                $(".biao").css("width", "0px");
            });





    })();
    /*====================收藏结束=============================*/

    /*模版*/
    //<div class="neirong" style="display: none">
    //    <div class="text">
    //    <h5>$typeTitle$</h5>
    //    <span>$updateAt$ <em>$creatByFullName$</em></span>
    //
    //    </div>
    //    <div class="pic">
    //    <img src="$coverImg$" alt="">
    //    </div>


/*==========back===============*/
    $(window).scroll(function(){

        /*大于一屏高度显示返回顶部按钮*/
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>$(window).height()){
            $(".back").fadeIn();
        }else {
            $(".back").fadeOut(0);
        }
    });
    $(".back .img2").click(function() {
        $(this).parent().animate({"bottom": 1000, "opacity": 0}, 400, function () {

            $(".back").css("opacity", 1).fadeOut(0).css("bottom", 200);

        });
        $("body,html").animate({scrollTop: 0}, 400);



    });
    /*======back结束=============*/
    $("#footer").load("footer.html");

});
function LoadArticlData(){
    if(GLOBAL.type){
        //可以将ajax文件转换为php文件 通过ajax请求
        var articleData1=articleData[GLOBAL.type+GLOBAL.articleid];
        //alert(JSON.stringify(articleData[GLOBAL.type+GLOBAL.articleid]));
        $(".title-big").html(articleData1.data.typeTitle);
        $(".title-small").html(articleData1.data.typeEntitle);
        $(".title").html(articleData1.data.title);
        $(".auther").html(articleData1.data.creatByFullName);
        $(".creatAt").html(articleData1.data.creatAt);
        $("#cover").attr("src",articleData1.data.coverImg);
        $("#content").html(articleData1.data.content);
    }



}

//获取页面url传过来的参数
function getUrlParams(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  r[2];
    else
        return "";
}

//   创建方式1   /a/;  缺点是不够灵活
//   创建方式2    newRegExp()  缺点是繁琐

/*加载数据*/
function loadArticleList() {

//    清除假数据

    if (!GLOBAL.pageStart) {
        GLOBAL.pageStart = 0;
        $("#articleList").html("")
    }
}