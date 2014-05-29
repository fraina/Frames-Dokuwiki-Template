/**
 * @author Fraina
 */
jQuery.noConflict();

jQuery(document).ready(function() {
    
      /*
          options = PC 版選單
        searchbar = PC 版搜索列
              nav = PC 版導航列
         showList = PC 版目錄
             page = 頁面本體
            mMenu = 手機版選單
            mList = 手機版目錄 (右邊滑入)
       */
    var   options = jQuery('.menu li'),
        searchbar = jQuery('.searchbox.mobileElse'),
              nav = jQuery('nav'),
         showList = jQuery('#show_list .list'),
             page = jQuery('.page'),
            mMenu = jQuery('.Mmenu'),
            mList = jQuery('.Mlist');
    
    /*
     * 頁面滾動軸套用 niceScroll
     */
    
    jQuery('body').niceScroll({
        zindex: 99999,
        styler: "fb",
        cursorcolor: '#2F7096',
        cursorborder: '#2F7096'
    });
    
    
    mList.find('.box').niceScroll({
        zindex: -999,
        cursorcolor: 'rgba(0,0,0,0)',
        cursorborder: 'rgba(0,0,0,0)',
        railalign: 'left'
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
       options.find('div').slideUp();
       mMenu.slideUp();
       page.animate({'margin-left':'0'},500);
       mList.animate({'right':'-260px'},500);
    });
    
    /*
     * 點擊指定元素時，停止偵聽 event (用於不希望觸發 click on document 事件)
     */
   
    options.click(function(event) {
        event.stopPropagation();
    });
    
    jQuery('header').click(function(event) {
        event.stopPropagation();
    });
    
    mList.click(function(event) {
        event.stopPropagation();
    });
    
    showList.click(function(event){
        event.stopPropagation();
    });
    
    /*
     * 功能選單
     */
   
    options.find('a').click(function(){
        jQuery(this).next('div').slideToggle().parent().siblings().find('div').slideUp();
        showList.slideUp();
    });
    
    /*
     * 手機板功能選單
     */
   
    jQuery('.options .forMobile a').click(function(){
        jQuery('header .main').toggleClass('active');
        mMenu.slideToggle();
    });
    
    jQuery('.forMobile.Mmenu .opt').each(function(){
        jQuery(this).find('span').css('display','none');
        var getHref = jQuery(this).next('a').attr('href'),
            getText = jQuery(this).next('a').html();
        jQuery(this).attr('href',getHref).attr('title',getText).find('img').attr('alt',getText).find('span').html(getText);
        
        if ( !(jQuery(this).next('a')).length > 0 ) {
            jQuery(this).find('img').addClass('opa').find('span').css('display','block');
        }
    });
    
    /*
     * Searchbar setting
     * 當滑鼠點擊頁面其他位置時，Searchbar會收起
     */
    
    jQuery('.searchbox .click_area').click(function(){
        searchbar.stop().animate({width:'180px'}, 500).find('#qsearch__in').animate({opacity:1}, 1000).attr('placeholder','Search!');
        jQuery(this).hide();
    });
   
    jQuery(document).bind("click",function(e){ 
        var target = jQuery(e.target); 
        if(target.closest(".searchbox.mobileElse").length == 0) {
            searchbar.find('#qsearch__in').stop().animate({opacity:0}, 200).val('');
            searchbar.animate({width:'26px'}, 500).find('.button').unbind('click');
            jQuery('.searchbox .click_area').show();
        }
    });
    
    /*
     * 手機版 Searchbar setting
     */
   
    jQuery('.Mmenu .searchbox').find('#qsearch__in').attr('placeholder','Search!');
    
    
    jQuery(document).bind('swipeleft', function(){
        if (jQuery(window).width() < 768) {
            page.animate({'margin-left':'-260px'},500);
            mList.animate({'right':'0px'},500);
            mMenu.slideUp();
        }
    });
    
    jQuery(document).bind('swiperight', function(){
        if (jQuery(window).width() < 768) {
            page.animate({'margin-left':'0'},500);
            nav.animate({'margin-left':'0'},500);
            mList.animate({'right':'-260px'},500);
            mMenu.slideUp();
        }
    });
    
    /*
     * 目錄列
     */
    
    jQuery('#show_list').click(function(){
       jQuery(this).find('.list').slideToggle(); 
    });
    
    // 先取得 #cart 及其 top 值
    var $cart = nav,
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
            page.animate({'margin-left':'0'},500);
            nav.animate({'right':'0'},500);
            mList.animate({'right':'-260px'},500);
            mMenu.slideUp();
            jQuery('a[href^="#"]').click(function () {
                var temp = jQuery(this).attr('href');
                jQuery('html, body').stop().animate({'scrollTop': jQuery(temp).offset().top-20});
            });
            jQuery(document).unbind('swipeleft').unbind('swiperight');
        }
    });
    
});