/**
 * @author Fraina
 */
jQuery.noConflict();

jQuery(document).ready(function() {
    
    /*
     * 頁面滾動軸套用 niceScroll
     */
    
    jQuery('body').niceScroll({
        cursorwidth: '5',
        cursorcolor: '#666',
        cursorborder: '#666'
    });
    
    /*
     * code 套用 MyCustomScrollbar
     */
    
    jQuery('pre').mCustomScrollbar({
        horizontalScroll:true,
        theme: 'dark-thick',
        scrollInertia: 100
    });
    
   
    /*
     * 隱藏列表中的「目錄表」字樣
     */
    
    jQuery('#dw__toc .toggle').hide();
    
    /*
     * 點擊頁面其他位置時，指定元素收起
     */
   
    jQuery(document).click(function(){
       jQuery('.menu li div').slideUp();
       jQuery('.Mmenu').slideUp();
       jQuery('.page').animate({'margin-left':'0'},500);
       jQuery('.Mlist').animate({'right':'-260px'},500);
    });
    
    /*
     * 點擊指定元素時，停止偵聽 event (用於不希望觸發 click on document 事件)
     */
   
    jQuery('.menu li').click(function(event) {
        event.stopPropagation();
    });
    
    jQuery('header').click(function(event) {
        event.stopPropagation();
    });
    
    jQuery('.Mlist').click(function(event) {
        event.stopPropagation();
    });
    
    jQuery('#show_list .list').click(function(event){
        event.stopPropagation();
    });
    
    /*
     * 功能選單
     */
   
    jQuery('.menu li a').click(function(){
        jQuery(this).next('div').slideToggle();
        jQuery(this).parent().siblings().find('div').slideUp();
        jQuery('#show_list .list').slideUp();
    });
    
    /*
     * 手機板功能選單
     */
   
    jQuery('.options .forMobile a').click(function(){
        jQuery('header .main').toggleClass('active');
        jQuery('.Mmenu').slideToggle();
    });
    
    jQuery('.forMobile.Mmenu .opt').each(function(){
        jQuery(this).find('span').css('display','none');
        var getHref = jQuery(this).next('a').attr('href');
        jQuery(this).attr('href',getHref);
        
        if ( !(jQuery(this).next('a')).length > 0 ) {
            jQuery(this).find('img').addClass('opa');
            jQuery(this).find('span').css('display','block');
        }
    });
    
    jQuery('.mCustomScrollBox').css('font-size','12px');
    
    /*
     * Searchbar setting
     * 當滑鼠點擊頁面其他位置時，Searchbar會收起
     */
    
    jQuery('.searchbox.mobileElse #qsearch__in').animate({opacity:0}, 0);
    jQuery('.searchbox .click_area').click(function(){
        jQuery('.searchbox.mobileElse').stop().animate({width:'180px'}, 500);
        jQuery('.searchbox.mobileElse').find('#qsearch__in').animate({opacity:1}, 1000).attr('placeholder','Search!');
        jQuery(this).hide();
    });
   
    jQuery(document).bind("click",function(e){ 
        var target = jQuery(e.target); 
        if(target.closest(".searchbox.mobileElse").length == 0) {
            jQuery('.searchbox.mobileElse #qsearch__in').stop().animate({opacity:0}, 200);
            jQuery(".searchbox.mobileElse").animate({width:'26px'}, 500);
            jQuery('.searchbox.mobileElse').find('.button').unbind('click');
            jQuery('.searchbox .click_area').show();
        }
    });
    
    /*
     * 手機版 Searchbar setting
     */
   
    jQuery('.Mmenu .searchbox').find('#qsearch__in').attr('placeholder','Search!');
    
    
    jQuery(document).bind('swipeleft', function(){
        if (jQuery(window).width() < 768) {
            jQuery('.page').animate({'margin-left':'-260px'},500);
            jQuery('.Mlist').animate({'right':'0px'},500);
            jQuery('.Mmenu').slideUp();
        }
    });
    
    jQuery(document).bind('swiperight', function(){
        if (jQuery(window).width() < 768) {
            jQuery('.page').animate({'margin-left':'0'},500);
            jQuery('nav').animate({'margin-left':'0'},500);
            jQuery('.Mlist').animate({'right':'-260px'},500);
            jQuery('.Mmenu').slideUp();
        }
    });
   
   jQuery(document).bind('swipeleft', function(){
        if (jQuery(window).width() < 768) {
            jQuery('.page').animate({'margin-left':'-260px'},500);
            jQuery('.Mlist').animate({'right':'0px'},500);
            jQuery('.Mmenu').slideUp();
        }
   
    });
            
    jQuery(document).bind('swiperight', function(){
        if (jQuery(window).width() < 768) {
            jQuery('.page').animate({'margin-left':'0'},500);
            jQuery('nav').animate({'margin-left':'0'},500);
            jQuery('.Mlist').animate({'right':'-260px'},500);
            jQuery('.Mmenu').slideUp();
        }
    });
    
    
    jQuery('#show_list').click(function(){
       jQuery(this).find('.list').slideToggle(); 
    });
    
    // 先取得 #cart 及其 top 值
    var $cart = jQuery('nav'),
        _top = $cart.offset().top;
 
    // 當網頁捲軸捲動時
    
    var $win = jQuery(window).scroll(function(){
        if (jQuery(window).width() > 768) {
            // 如果現在的 scrollTop 大於原本 #cart 的 top 時
            if($win.scrollTop() >= _top){
                // 如果 $cart 的座標系統不是 fixed 的話
                if($cart.css('position')!='fixed'){
                    // 設定 #cart 的座標系統為 fixed
                    $cart.css({
                        position: 'fixed',
                        top: 0
                    });
                }
            }else{
                // 還原 #cart 的座標系統為 absolute
                $cart.css({
                    position: 'relative'
                });
            }
        }
        
        if (jQuery(window).width() < 768) {
            $cart.css({
                position: 'relative'
            });
        } else {
            jQuery('.page').animate({'margin-left':'0'},500);
            jQuery('nav').animate({'right':'0'},500);
            jQuery('.Mlist').animate({'right':'-260px'},500);
            jQuery('.Mmenu').slideUp();
            jQuery(document).unbind("swipeleft");
            jQuery(document).unbind("swiperight");
        }
    });
    
});