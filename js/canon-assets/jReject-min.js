/*
* jReject (jQuery Browser Rejection Plugin)
* Version 1.1.0
* URL: http://jreject.turnwheel.com/
* Description: jReject is a easy method of rejecting specific browsers on your site
* Author: Steven Bower (TurnWheel Designs) http://turnwheel.com/
* Copyright: Copyright (c) 2009-2014 Steven Bower under dual MIT/GPLv2 license.
*/
(function($){$.reject=function(options){var opts=$.extend(true,{reject:{all:false,safari: 6, chrome: 29, firefox: 23, msie: 9, unknown: true},display:[],browserShow:true,browserInfo:{chrome:{text:'Chrome 30+',url:'http://www.google.com/chrome/',},firefox:{text:'Firefox 24+',url:'http://www.mozilla.com/firefox/'},safari:{text:'Safari 6+',url:'http://www.apple.com/safari/download/'},msie:{text:'Internet Explorer 10+',url:'http://www.microsoft.com/windows/Internet-explorer/'}},header:'Did you know that your internet browser is out of date?',paragraph1:'To get the best possible experience using our website we recommend that you upgrade '+'to a newer version of the web browser. Download links for the most popular web browsers are below.',paragraph2:'Just click an icon below to view the download page:',close:true,closeMessage:'By closing this window you acknowledge that your experience '+'on this website may be degraded.',closeLink:'X  Close',closeURL:'#',closeESC:true,closeCookie:true,cookieSettings:{path:'/',expires:0},imagePath:'../../images/browsers/',overlayBgColor:'#000',overlayOpacity:0.8,fadeInTime:'fast',fadeOutTime:'fast',analytics:false},options);if(opts.display.length<1){opts.display=['chrome','firefox','safari','msie'];}if($.isFunction(opts.beforeReject)){opts.beforeReject();}if(!opts.close){opts.closeESC=false;}var browserCheck=function(settings){var layout=settings[$.layout.name],browser=settings[$.browser.name];return!!(settings['all']||(browser&&(browser===true||$.browser.versionNumber<=browser))||settings[$.browser.className]||(layout&&(layout===true||$.layout.versionNumber<=layout))||settings[$.os.name]);};if(!browserCheck(opts.reject)){if($.isFunction(opts.onFail)){opts.onFail();}return false;}if(opts.close&&opts.closeCookie){var COOKIE_NAME='jreject-close';var _cookie=function(name,value){if(typeof value!='undefined'){var expires='';if(opts.cookieSettings.expires!==0){var date=new Date();date.setTime(date.getTime()+(opts.cookieSettings.expires*1000));expires="; expires="+date.toGMTString();}var path=opts.cookieSettings.path||'/';document.cookie=name+'='+encodeURIComponent((!value)?'':value)+expires+'; path='+path;return true;}else{var cookie,val=null;if(document.cookie&&document.cookie!==''){var cookies=document.cookie.split(';');var clen=cookies.length;for(var i=0;i<clen;++i){cookie=$.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){var len=name.length;val=decodeURIComponent(cookie.substring(len+1));break;}}}return val;}};if(_cookie(COOKIE_NAME)){return false;}}var html='<div id="jr_overlay"></div><div id="jr_wrap"><div id="jr_inner">'+'<h1 id="jr_header">'+opts.header+'</h1>'+(opts.paragraph1===''?'':'<p>'+opts.paragraph1+'</p>')+(opts.paragraph2===''?'':'<p>'+opts.paragraph2+'</p>');var displayNum=0;if(opts.browserShow){html+='<ul>';for(var x in opts.display){var browser=opts.display[x];var info=opts.browserInfo[browser]||false;if(!info||(info['allow']!=undefined&&!browserCheck(info['allow']))){continue;}var url=info.url||'#';html+='<li id="jr_'+browser+'"><div class="jr_icon"></div>'+'<div><a href="'+url+'">'+(info.text||'Unknown')+'</a>'+'</div></li>';++displayNum;}html+='</ul>';}html+='<div id="jr_close">'+(opts.close?'<a href="'+opts.closeURL+'">'+opts.closeLink+'</a>'+'<p>'+opts.closeMessage+'</p>':'')+'</div>'+'</div></div>';var element=$('<div>'+html+'</div>');var size=_pageSize();var scroll=_scrollSize();element.bind('closejr',function(){if(!opts.close){return false;}if($.isFunction(opts.beforeClose)){opts.beforeClose();}$(this).unbind('closejr');$('#jr_overlay,#jr_wrap').fadeOut(opts.fadeOutTime,function(){$(this).remove();if($.isFunction(opts.afterClose)){opts.afterClose();}});var elmhide='embed.jr_hidden, object.jr_hidden, select.jr_hidden, applet.jr_hidden';$(elmhide).show().removeClass('jr_hidden');if(opts.closeCookie){_cookie(COOKIE_NAME,'true');}return true;});var analytics=function(url){if(!opts.analytics){return false;}var host=url.split(/\/+/g)[1];try{ga('send','event','External','Click',host,url);}catch(e){try{_gaq.push(['_trackEvent','External Links',host,url]);}catch(e){}}};var openBrowserLinks=function(url){analytics(url);window.open(url,'jr_'+Math.round(Math.random()*11));return false;};element.find('#jr_overlay').css({width:size[0],height:size[1],background:opts.overlayBgColor,opacity:opts.overlayOpacity});element.find('#jr_wrap').css({top:scroll[1]+(size[3]/4),left:scroll[0]});element.find('#jr_inner').css({minWidth:400,maxWidth:displayNum*140,width:$.layout.name=='trident'?displayNum*155:'auto'});element.find('#jr_inner li').css({background:'transparent url("'+opts.imagePath+'background_browser.gif")'+'no-repeat scroll left top'});element.find('#jr_inner li .jr_icon').each(function(){var self=$(this);self.css('background','transparent url('+opts.imagePath+'browser_'+(self.parent('li').attr('id').replace(/jr_/,''))+'.gif)'+' no-repeat scroll left top');self.click(function(){var url=$(this).next('div').children('a').attr('href');openBrowserLinks(url);});});element.find('#jr_inner li a').click(function(){openBrowserLinks($(this).attr('href'));return false;});element.find('#jr_close a').click(function(){$(this).trigger('closejr');if(opts.closeURL==='#'){return false;}});$('#jr_overlay').focus();$('embed, object, select, applet').each(function(){if($(this).is(':visible')){$(this).hide().addClass('jr_hidden');}});$('body').append(element.hide().fadeIn(opts.fadeInTime));$(window).bind('resize scroll',function(){var size=_pageSize();$('#jr_overlay').css({width:size[0],height:size[1]});var scroll=_scrollSize();$('#jr_wrap').css({top:scroll[1]+(size[3]/4),left:scroll[0]});});if(opts.closeESC){$(document).bind('keydown',function(event){if(event.keyCode==27){element.trigger('closejr');}});}if($.isFunction(opts.afterReject)){opts.afterReject();}return true;};var _pageSize=function(){var xScroll=window.innerWidth&&window.scrollMaxX?window.innerWidth+window.scrollMaxX:(document.body.scrollWidth>document.body.offsetWidth?document.body.scrollWidth:document.body.offsetWidth);var yScroll=window.innerHeight&&window.scrollMaxY?window.innerHeight+window.scrollMaxY:(document.body.scrollHeight>document.body.offsetHeight?document.body.scrollHeight:document.body.offsetHeight);var windowWidth=window.innerWidth?window.innerWidth:(document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth);var windowHeight=window.innerHeight?window.innerHeight:(document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight);return[xScroll<windowWidth?xScroll:windowWidth,yScroll<windowHeight?windowHeight:yScroll,windowWidth,windowHeight];};var _scrollSize=function(){return[window.pageXOffset?window.pageXOffset:(document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollLeft:document.body.scrollLeft),window.pageYOffset?window.pageYOffset:(document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)];};})(jQuery);(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;if(!r.opera){r.version=(c.exec(i)||[x,x,x,x])[3];}else{r.version=window.opera.version();}if(/safari/.test(r.name)){var safariversion=/(safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/;var res=safariversion.exec(i);if(res&&res[3]&&res[3]<400){r.version='2.0';}}else if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}if(/msie/.test(r.name)&&r.version===x){var ieVersion=/rv:(\d+\.\d+)/.exec(i);r.version=ieVersion[1];}r.versionNumber=parseFloat(r.version,10)||0;var minorStart=1;if(r.versionNumber<100&&r.versionNumber>9){minorStart=2;}r.versionX=(r.version!==x)?r.version.substr(0,minorStart):x;r.className=r.name+r.versionX;return r;};a=(/Opera|Navigator|Minefield|KHTML|Chrome|CriOS/.test(a)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['CriOS','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|crios|firefox|netscape|konqueror|lynx|msie|trident|opera|safari)/,[['trident','msie']],/(camino|chrome|crios|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|rv|safari)(:|\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|trident|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone|ipad)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);}(jQuery));
